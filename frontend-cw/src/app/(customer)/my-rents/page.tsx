import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import MyRents from "@/app/(customer)/my-rents/MyRents";

export const metadata: Metadata = {
    title: 'My rents',
    ...NO_INDEX_PAGE
}

export default function MyRentsPage() {
    return <MyRents/>
}