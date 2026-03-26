"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const API_BASE = "/api";

export interface RoomTypeInput {
    type: string;
    available: number;
    price: number;
}
export interface LandmarkInput {
    name: string;
    distance: string;
}

export function useAddPgForm() {
    const router = useRouter();
    const fileRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [area, setArea] = useState("");
    const [rent, setRent] = useState("");
    const [deposit, setDeposit] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const [contactEmail, setContactEmail] = useState("");

    const [roomTypes, setRoomTypes] = useState<RoomTypeInput[]>([]);
    const [newRoom, setNewRoom] = useState({ type: "Single", available: 1, price: 0 });

    const [amenities, setAmenities] = useState<string[]>([]);
    const [newAmenity, setNewAmenity] = useState("");

    const [equipment, setEquipment] = useState<string[]>([]);
    const [newEquip, setNewEquip] = useState("");

    const [landmarks, setLandmarks] = useState<LandmarkInput[]>([]);
    const [newLandmark, setNewLandmark] = useState({ name: "", distance: "" });

    const [minMonths, setMinMonths] = useState("1");
    const [maxMonths, setMaxMonths] = useState("12");
    const [conditions, setConditions] = useState("");

    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        const total = images.length + files.length;
        if (total > 10) {
            setError("Maximum 10 images allowed");
            return;
        }
        const newImages = [...images, ...files];
        setImages(newImages);
        const newPreviews = files.map((f) => URL.createObjectURL(f));
        setPreviews([...previews, ...newPreviews]);
        setError("");
    };

    const removeImage = (idx: number) => {
        setImages(images.filter((_, i) => i !== idx));
        setPreviews(previews.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (images.length < 1) {
            setError("Please upload at least 1 image");
            return;
        }
        setSubmitting(true);
        setError("");

        try {
            let imageUrls: string[] = [];
            if (images.length > 0) {
                const formData = new FormData();
                images.forEach((img) => formData.append("files", img));

                const uploadRes = await fetch(`${API_BASE}/upload`, {
                    method: "POST",
                    body: formData,
                });

                if (!uploadRes.ok) {
                    const uploadErr = await uploadRes.json();
                    throw new Error(uploadErr.error || "Image upload failed");
                }
                const uploadData = await uploadRes.json();
                imageUrls = uploadData.urls || [];
            }

            const body = {
                Title: title,
                Description: description,
                Address: address,
                City: city,
                Area: area,
                Rent: parseFloat(rent),
                SecurityDeposit: parseFloat(deposit),
                RoomTypes: roomTypes.map((r) => ({
                    Type: r.type,
                    Available: r.available,
                    Price: r.price,
                })),
                Amenities: amenities,
                Equipment: equipment,
                NearbyLandmarks: landmarks.map((l) => ({
                    Name: l.name,
                    Distance: l.distance,
                })),
                RentAgreement: {
                    MinMonths: parseInt(minMonths),
                    MaxMonths: parseInt(maxMonths),
                    Conditions: conditions,
                },
                ContactPhone: contactPhone,
                ContactEmail: contactEmail,
                Images: imageUrls,
            };

            const res = await fetch(`${API_BASE}/pg-listings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!res.ok) throw new Error("Failed to create listing");

            setSuccess(true);
            setTimeout(() => router.push("/"), 2000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        }
        setSubmitting(false);
    };

    return {
        formState: {
            title, setTitle,
            description, setDescription,
            address, setAddress,
            city, setCity,
            area, setArea,
            rent, setRent,
            deposit, setDeposit,
            contactPhone, setContactPhone,
            contactEmail, setContactEmail,
            roomTypes, setRoomTypes,
            newRoom, setNewRoom,
            amenities, setAmenities,
            newAmenity, setNewAmenity,
            equipment, setEquipment,
            newEquip, setNewEquip,
            landmarks, setLandmarks,
            newLandmark, setNewLandmark,
            minMonths, setMinMonths,
            maxMonths, setMaxMonths,
            conditions, setConditions,
            images, setImages,
            previews, setPreviews,
            submitting, error, success
        },
        handlers: {
            handleFiles,
            removeImage,
            handleSubmit,
        },
        refs: {
            fileRef
        }
    };
}
