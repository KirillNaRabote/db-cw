import {axiosClassic, instance} from "@/api/api.interceptor";
import {IRentalPoint} from "@/types/rentalPoint.inteface";
import {IFeedback} from "@/types/feedback.interface";

const FEEDBACKS = 'feedbacks'
type TypeData = {
    mark: number
    comment: string
}

export const FeedbackService = {
    async getAll() {
        return axiosClassic<IFeedback[]>({
            url: FEEDBACKS,
            method: 'GET'
        })
    },

    async create(idRent: string | number, data: TypeData) {
        return instance<IFeedback>({
            url: `${FEEDBACKS}/create/${idRent}`,
            method: 'POST',
            data
        })
    },

    async getAverageByEquipment(idEquipment: string | number) {
        return axiosClassic<number>({
            url: `${FEEDBACKS}/average-by-equipment/${idEquipment}`,
            method: 'GET',
        })
    },
}