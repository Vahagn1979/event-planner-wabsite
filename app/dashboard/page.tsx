// 'uselibpqcompat=true&sslmode=require';
// 'sslmode=verify-full';
export const dynamic = "force-dynamic";

import DashboardContent from "@/components/dashboard-content";
import { auth } from "@/lib/auth/server";


export default async function DashboardPage() {

    const session = await auth.getSession();
    const userId = session.data?.user.id;
    return (
        <DashboardContent userId={userId} />
    )
}