import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import Equipments from "@/app/admin/equipments/Equipments";

export const metadata: Metadata = {
    title: 'Equipments',
    ...NO_INDEX_PAGE
}

export default function EquipmentPage() {
    return <Equipments/>
}