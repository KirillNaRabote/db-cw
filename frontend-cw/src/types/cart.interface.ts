import {IEquipment} from "@/types/equipment.interface";

export interface ICartItem {
    id: number
    equipment: IEquipment,
    price: number
}