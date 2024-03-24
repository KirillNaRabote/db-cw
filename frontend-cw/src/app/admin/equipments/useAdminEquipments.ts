import {useMutation, useQuery} from "@tanstack/react-query";
import {EquipmentService} from "@/services/equipment/equipment.service";
import {IListItem} from "@/ui/admin/admin-list/admin-list.interface";
import {getAdminUrl} from "@/config/url.config";
import {formatDate} from "@/utils/format-date";

export const useAdminEquipments = () => {
    const {data, isFetching, refetch} = useQuery({
        queryKey: ['get admin equipments'],
        queryFn: () => EquipmentService.getAll(),
        select: data => data.equipments.map((equipment): IListItem => {
            return {
                id: equipment.idEquipment,
                viewUrl: `/equipment/${equipment.slug}`,
                editUrl: getAdminUrl(`/equipments/edit/${equipment.idEquipment}`),
                items: [
                    equipment.equipmentName.name,
                    equipment.rentalPoint.city + ', ' + equipment.rentalPoint.street + ', ' + equipment.rentalPoint.house,
                    formatDate(equipment.createdAt)
                ]
            }
        })
    })

    const {mutate} = useMutation({
        mutationKey: ['delete equipment'],
        mutationFn: (id: number) => EquipmentService.delete(id),
        onSuccess: () => refetch
    })

    return {
        mutate, data, isFetching
    }
}