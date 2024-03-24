'use client'

import {FC} from "react";
import Heading from "@/ui/Heading";
import Catalog from "@/ui/catalog/Catalog";
import {TypeEquipments, TypePaginationEquipments} from "@/types/equipment.interface";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import Layout from "@/ui/layout/Layout";
import CatalogPagination from "@/ui/catalog/CatalogPagination";

const Home: FC<TypePaginationEquipments> = ({equipments, length}) => {
    const {user} = useAuth()
    const {logout} = useActions()

    return (
        <Layout>
            <CatalogPagination title='Freshed equipments' data={{equipments, length}}/>
        </Layout>
    )
}

export default  Home