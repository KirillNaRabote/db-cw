import {instance} from "@/api/api.interceptor";
import {IRent} from "@/types/rent.interface";

const RENTS = 'rents'

export const RentService = {
    async getAll() {
        return instance<IRent[]>({
            url: RENTS,
            method: 'GET'
        })
    },

    async getByUserId() {
        return instance<IRent[]>({
            url: `${RENTS}/by-user`,
            method: 'GET'
        })
    }
}