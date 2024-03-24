import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import Dashboard from "@/app/admin/Dashboard";

export const metadata: Metadata = {
    title: 'Dashboard',
    ...NO_INDEX_PAGE
}

export default function DashboardPage() {
    return <Dashboard/>
}