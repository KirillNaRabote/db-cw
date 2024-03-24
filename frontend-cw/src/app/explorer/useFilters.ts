import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useActions} from "@/hooks/useActions";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import {useEffect} from "react";
import {TypeEquipmentDataFilters} from "@/services/equipment/equipment.types";
import * as path from "path";

export const useFilters = () => {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const {updateQueryParam} = useActions()
    const {replace} = useRouter()

    const {queryParams, isFilterUpdated} = useTypedSelector(state => state.filters)

    useEffect(() => {
        searchParams.forEach((value, key) => {
            updateQueryParam({
                key: key as keyof TypeEquipmentDataFilters,
                value
            })
        })
    }, []);

    const updateQueryParams = (key: keyof TypeEquipmentDataFilters, value: string) => {
        const newParams = new URLSearchParams(searchParams.toString())

        if (value) {
            newParams.set(key, String(value))
        } else {
            newParams.delete(key)
        }

        replace(pathname + `?${newParams.toString().replace(/%7C/g, '|')}`)

        updateQueryParam({key, value})
    }

    return {
        updateQueryParams,
        queryParams,
        isFilterUpdated
    }
}