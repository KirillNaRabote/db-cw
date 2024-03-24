import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import {Metadata} from "next";
import {EquipmentService} from "@/services/equipment/equipment.service";
import {TypeEquipmentDataFilters, TypeParamsFilters} from "@/services/equipment/equipment.types";
import EquipmentExplorer from "@/app/explorer/EquipmentExplorer";

export const metadata: Metadata = {
    title: 'Explorer',
    ...NO_INDEX_PAGE
}

export const revalidate = 60

async function getEquipments(searchParams: TypeEquipmentDataFilters) {
    const data = await EquipmentService.getAll(searchParams)

    return data
}

export default async function ExplorerPage({searchParams}: TypeParamsFilters) {
    const data = await getEquipments(searchParams)

    return <EquipmentExplorer initialEquipments={data}/>
}