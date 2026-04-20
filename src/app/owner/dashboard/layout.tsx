import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ClientDashboardShell } from "@/components/dashboard/ClientDashboardShell";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "PG_OWNER") {
        redirect("/login");
    }

    return (
        <ClientDashboardShell>
            {children}
        </ClientDashboardShell>
    );
}
