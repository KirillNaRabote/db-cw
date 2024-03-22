import {IRent} from "@/types/rent.interface";

export interface IFeedback {
    id: number
    createdAt: string
    mark: number
    comment: string
    rent: IRent
}