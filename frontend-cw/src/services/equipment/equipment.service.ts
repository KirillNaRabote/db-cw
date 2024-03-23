import {axiosClassic, instance} from "@/api/api.interceptor";
import {IRentalPoint} from "@/types/rentalPoint.inteface";
import {EQUIPMENTS, TypeEquipmentData, TypeEquipmentDataFilters} from "@/services/equipment/equipment.types";
import {IEquipment, TypePaginationEquipments} from "@/types/equipment.interface";
import {id} from "postcss-selector-parser";

export const EquipmentService = {
    async getAll(queryData= {} as TypeEquipmentDataFilters) {
        const {data} = await axiosClassic<TypePaginationEquipments>({
            url: EQUIPMENTS,
            method: 'GET',
            params: queryData
        })

        return data
    },

    async getSimilar(idEquipment: string | number) {
        return axiosClassic<IEquipment[]>({
            url: `${EQUIPMENTS}/similar/${idEquipment}`,
            method: 'GET'
        })
    },

    async getBySlug(slug: string) {
        return axiosClassic<IEquipment>({
            url: `${EQUIPMENTS}/by-slug/${slug}`,
            method: 'GET'
        })
    },

    async getByRentalPoint(slugRentalPoint: string) {
        return axiosClassic<IEquipment[]>({
            url: `${EQUIPMENTS}/by-rental-point/${slugRentalPoint}`,
            method: 'GET'
        })
    },

    async getById(idEquipment: string | number) {
        return instance<IEquipment>({
            url: `${EQUIPMENTS}/${idEquipment}`,
            method: 'GET'
        })
    },

    async create() {
        return instance<IEquipment>({
            url: EQUIPMENTS,
            method: 'POST'
        })
    },

    async update(idEquipment: string | number, data: TypeEquipmentData) {
        return instance<IEquipment>({
            url: `${EQUIPMENTS}/${idEquipment}`,
            method: 'PUT',
            data
        })
    },

    async delete(idEquipment: string | number) {
        return instance<IEquipment>({
            url: `${EQUIPMENTS}/${idEquipment}`,
            method: 'DELETE',
        })
    },
}