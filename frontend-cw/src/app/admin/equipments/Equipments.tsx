'use client'

import {FC} from "react";
import {useAdminEquipments} from "@/app/admin/equipments/useAdminEquipments";
import Heading from "@/ui/Heading";
import AdminList from "@/ui/admin/admin-list/AdminList";

const Equipments: FC = () => {
    const {data, isFetching, mutate} = useAdminEquipments()

    return (
        <>
            <Heading className='mb-7'>Equipments</Heading>
            <AdminList
                isLoading={isFetching}
                listItems={data}
                removeHandler={mutate}
            />
        </>
    )
}

export default Equipments