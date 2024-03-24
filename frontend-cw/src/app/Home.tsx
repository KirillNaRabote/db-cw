'use client'

import {FC} from "react";
import Heading from "@/ui/Heading";
import {TypeEquipments, TypePaginationEquipments} from "@/types/equipment.interface";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import CatalogPagination from "@/ui/catalog/CatalogPagination";
import Catalog from "@/ui/catalog/Catalog";

const Home: FC<TypePaginationEquipments> = ({equipments, length}) => {
    const {user} = useAuth()
    const {logout} = useActions()

    return (
        <Catalog title='Freshed equipments' equipments={equipments}/>
    )
}

export default  Home