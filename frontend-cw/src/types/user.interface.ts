import {IEquipment} from "@/types/equipment.interface";
import {IRent} from "@/types/rent.interface";

export interface IUser {
    id: number
    email: string
    name: string
    avatarPath: string
    phone: string
}

export interface IFullUser extends IUser {
    favorites: IEquipment[]
    rents: IRent[]
}