import {IEquipment} from "@/types/equipment.interface";
import {IUser} from "@/types/user.interface";
import {IFeedback} from "@/types/feedback.interface";

export interface IRent {
    idRent: number
    createdAt: string
    startTime: string
    endTime: string
    equipment: IEquipment
    user: IUser
    feedbacks: IFeedback[]
}