export type UserRole = "PAYING_GUEST" | "PG_OWNER" | "ADMIN";

export interface User {
    Id: string;
    Role: UserRole;
    Name: string;
    Email: string;
    Phone?: string;
    PermanentAddress: string;
    AvatarUrl?: string;
    PasswordHash?: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}
