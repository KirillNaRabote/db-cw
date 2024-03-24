import {TypeEquipmentDataFilters} from "@/services/equipment/equipment.types";

export interface IFilterState {
    isFilterUpdated: boolean
    queryParams: TypeEquipmentDataFilters
}

export interface IFilterActionsPayload {
    key: keyof TypeEquipmentDataFilters
    value: string
}