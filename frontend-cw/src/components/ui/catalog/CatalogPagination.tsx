'use client'

import {FC, useState} from "react";
import {TypePaginationEquipments} from "@/types/equipment.interface";
import Loader from "@/ui/Loader";
import EquipmentItem from "@/ui/catalog/equipment-item/EquipmentItem";
import Heading from "@/ui/Heading";
import Button from "@/ui/button/Button";
import SortDropdown from "@/ui/catalog/SortDropdown";
import {EnumEquipmentSort} from "@/services/equipment/equipment.types";
import {useQuery} from "@tanstack/react-query";
import {EquipmentService} from "@/services/equipment/equipment.service";

interface ICatalogPagination {
    data: TypePaginationEquipments
    title?: string
}

const CatalogPagination: FC<ICatalogPagination>
    = ({data, title}) => {
    const [page, setPage] = useState(1)

    const [sortType, setSortType] = useState <EnumEquipmentSort>(EnumEquipmentSort.NEWEST)

    const {data: response, isLoading} = useQuery({
        queryKey: ['equipments', sortType, page],
        queryFn: () => EquipmentService.getAll({
            page,
            perPage: 4,
            sort: sortType,
            ratings: ''
        }), initialData: data
        }
    )

    if (isLoading) return <Loader/>

    return (
        <section>
            {title && <Heading className='mb-5'>{title}</Heading>}
            <SortDropdown sortType={sortType} setSortType={setSortType}/>
            {response.equipments.length ? (
                <>
                <div className='grid grid-cols-4 gap-10'>
                    {response.equipments.map(equipment => (
                        <EquipmentItem key={equipment.idEquipment} equipment={equipment}/>
                    ))}
                </div>
                    <div className='text-center mt-16'>
                        {Array.from({length: response.length / 4 }).map((_, index) => {
                            const pageNumber = index + 1
                            return (
                                <Button
                                    key={pageNumber}
                                    size='sm'
                                    variant={page === pageNumber ? 'orange' : 'white'}
                                    onClick={() => setPage(pageNumber)}
                                    className='mx-3'
                                >
                                    {pageNumber}
                                </Button>
                            )
                        })}
                    </div>
                </>
            ) : (
                <div>There are no products</div>
            )}
        </section>
    )
}
export  default CatalogPagination