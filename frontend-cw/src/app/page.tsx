import {Metadata} from "next";
import {EquipmentService} from "@/services/equipment/equipment.service";
import Home from "@/app/Home";

export const metadata: Metadata = {
    title: '',
    description: ''
}

export const revalidate = 60

async function getEquipments() {
    const data = await EquipmentService.getAll({
        page: 1,
        perPage: 4,
        ratings: ''
    })

    return data
}

export default async function HomePage() {
    const data = await getEquipments()

    return <Home equipments={data.equipments} length={data.length}/>
}