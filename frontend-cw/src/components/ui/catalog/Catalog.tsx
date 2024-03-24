'use client'

import {FC} from "react";
import {IEquipment} from "@/types/equipment.interface";
import Loader from "@/ui/Loader";
import EquipmentItem from "@/ui/catalog/equipment-item/EquipmentItem";
import equipmentItem from "@/ui/catalog/equipment-item/EquipmentItem";
import Heading from "@/ui/Heading";
import Button from "@/ui/button/Button";
import SortDropdown from "@/ui/catalog/SortDropdown";
import EquipmentExplorer from "@/app/explorer/EquipmentExplorer";

interface ICatalog {
    equipments: IEquipment[]
    isLoading?: boolean
    title?: string
}

const Catalog: FC<ICatalog>
    = ({equipments, isLoading, title}) => {
    if (isLoading) return <Loader/>

    return (
        <section>
            {title && <Heading className='mb-5'>{title}</Heading>}
            {/*<EquipmentExplorer initialEquipments={{equipments, length}}></EquipmentExplorer>*/}
            {equipments.length ? (
                <>
                <div className='grid grid-cols-4 gap-10'>
                    {equipments.map(equipment => (
                        <EquipmentItem key={equipment.idEquipment} equipment={equipment}/>
                    ))}
                </div>
                </>
            ) : (
                <div>There are no products</div>
            )}
        </section>
    )
}
export  default Catalog