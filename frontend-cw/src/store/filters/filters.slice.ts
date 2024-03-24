import {IFilterActionsPayload, IFilterState} from "@/store/filters/filters.types";
import {EnumEquipmentSort} from "@/services/equipment/equipment.types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IFilterState = {
    isFilterUpdated: false,
    queryParams: {
        sort: EnumEquipmentSort.NEWEST,
        searchTerm: '',
        page: 1,
        perPage: 20,
        ratings: ''
    }
}

export const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        updateQueryParam: (
            state,
            action: PayloadAction<IFilterActionsPayload>
        ) => {
            const {key, value} = action.payload
            state.queryParams[key] = value
            state.isFilterUpdated = true
        },
        resetFilterUpdate: state => {
            state.isFilterUpdated = false
        }
    }
})