import {IEquipmentName} from "@/types/equipmentName.interface";
import {IRentalPoint} from "@/types/rentalPoint.inteface";
import {IFeedback} from "@/types/feedback.interface";
import {IRent} from "@/types/rent.interface";

export enum EnumEquipmentStatus {
    FREE = 'FREE',
    OCCUPIED = 'OCCUPIED',
    NOT_AVAILABLE = 'NOT_AVAILABLE'
}

export interface IEquipment {
    idEquipment: number
    equipmentName: IEquipmentName
    slug: string
    price: number
    images: string[]
    createdAt: string
    status: EnumEquipmentStatus
    rents: IRent[]
    rentalPoint: IRentalPoint
    feedbacks: IFeedback[]
}

export interface IEquipmentDetails {
    equipment: IEquipment
}

export type TypeEquipments = {
    equipments: IEquipment[]
}

export type TypePaginationEquipments = {
    length: number
    equipments: IEquipment[]
}