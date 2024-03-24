'use client'

import {IEquipment, TypePaginationEquipments} from "@/types/equipment.interface";
import {FC, useState} from "react";
import {useFilters} from "@/app/explorer/useFilters";
import {useQuery} from "@tanstack/react-query";
import {EquipmentService} from "@/services/equipment/equipment.service";
import Heading from "@/ui/Heading";
import SortDropdown from "@/ui/catalog/SortDropdown";
import Button from "@/ui/button/Button";
import cn from "clsx";
import styles from './EquipmentExplorer.module.scss'
import Catalog from "@/ui/catalog/Catalog";
import Pagination from "@/app/explorer/pagination/Pagination";

interface IEquipmentExplorer {
    initialEquipments: TypePaginationEquipments
}

const EquipmentExplorer: FC<IEquipmentExplorer> = ({initialEquipments}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const {isFilterUpdated, queryParams, updateQueryParams} = useFilters()

    const {data, isFetching} = useQuery({
        queryKey: ['equipment explorer', queryParams],
        queryFn: () => EquipmentService.getAll(queryParams),
        initialData: initialEquipments,
        enabled: isFilterUpdated
    })

    return (
        <>
            <div className='flex items-center justify-between mb-7'>
                <Heading>
                    {queryParams.searchTerm
                        ? `Search by query "${queryParams.searchTerm}"`
                        : `Explorer`}
                </Heading>
                {/*<SortDropdown/>*/}
            </div>
            <Button
                variant='white'
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className='mb-7'
            >
                {isFilterOpen ? 'Close' : 'Open'} filters
            </Button>

            <div
                className={cn(styles.explorer, {
                    [styles.filterOpened]: isFilterOpen
                })}
            >
                <aside>
                    {/*FILTERS*/}
                </aside>

                <section>
                    <Catalog equipments={data?.equipments} isLoading={isFetching}/>
                    <Pagination
                        changePage={page => updateQueryParams('page', page.toString())}
                        currentPage={queryParams.page}
                        numberPages={data?.length / +queryParams.perPage}

                    />
                </section>
            </div>
        </>
    )
}

export default EquipmentExplorer