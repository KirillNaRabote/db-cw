import {axiosClassic, instance} from "@/api/api.interceptor";
import {IRentalPoint} from "@/types/rentalPoint.inteface";

const RENTAL_POINTS = 'rental-points'

export const RentalPointService = {
    async getAll() {
        return axiosClassic<IRentalPoint[]>({
            url: RENTAL_POINTS,
            method: 'GET'
        })
    },

    async getById(idRentalPoint: string | number) {
        return instance<IRentalPoint>({
            url: `${RENTAL_POINTS}/${idRentalPoint}`,
            method: 'GET'
        })
    },

    async getBySlug(slug: string) {
        return axiosClassic<IRentalPoint>({
            url: `${RENTAL_POINTS}/by-slug/${slug}`,
            method: 'GET'
        })
    },

    async create() {
        return instance<IRentalPoint>({
            url: RENTAL_POINTS,
            method: 'POST'
        })
    },

    async update(idRentalPoint: string | number, city: string, street: string, house: string) {
        return instance<IRentalPoint>({
            url: `${RENTAL_POINTS}/${idRentalPoint}`,
            method: 'PUT',
            data: {city, street, house}
        })
    },

    async delete(idRentalPoint: string | number) {
        return instance<IRentalPoint>({
            url: `${RENTAL_POINTS}/${idRentalPoint}`,
            method: 'DELETE',
        })
    },
}