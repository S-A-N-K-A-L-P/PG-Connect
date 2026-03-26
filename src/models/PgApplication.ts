export interface PgApplication {
    Id: string;
    GuestId: string;
    PgId: string;
    FloorNumber?: number;
    RoomId?: string;
    Conditions: string;
    Status: "PENDING" | "APPROVED" | "REJECTED";
    CreatedAt: Date;
}
