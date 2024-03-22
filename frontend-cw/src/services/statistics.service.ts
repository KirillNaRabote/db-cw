import {instance} from "@/api/api.interceptor";
import {IRentalPoint} from "@/types/rentalPoint.inteface";

const STATISTICS = 'statistics/main'

export type TypeStatisticsResponse = {
    name: string
    value: number
}[]

export const StatisticsService = {
    async getMain() {
        return instance<TypeStatisticsResponse>({
            url: STATISTICS,
            method: 'GET'
        })
    },
}