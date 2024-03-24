import {IEquipment} from "@/types/equipment.interface";
import {IRent} from "@/types/rent.interface";
import {IRole} from "@/store/user/user.interface";

export interface IUser {
    id: number
    email: string
    name: string
    avatarPath: string
    phone: string
    role: IRole
}

export interface IFullUser extends IUser {
    favorites: IEquipment[]
    rents: IRent[]
}