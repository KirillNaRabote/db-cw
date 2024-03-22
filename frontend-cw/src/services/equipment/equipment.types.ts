import {EnumEquipmentStatus} from "@/types/equipment.interface";

export const EQUIPMENTS = 'equipments'

export type TypeEquipmentData = {
    idEquipmentName: number
    price: number
    images: string[]
    idRentalPoint: number
    status: EnumEquipmentStatus
}

export enum EnumEquipmentSort {
    HIGH_PRICE = 'high-price',
    LOW_PRICE = 'low-price',
    NEWEST = 'newest',
    OLDEST = 'oldest'

}

export type TypeEquipmentDataFilters = {
    sort?: EnumEquipmentSort,
    searchTerm?: string,
    page?: string | number,
    perPage?: string | number
}