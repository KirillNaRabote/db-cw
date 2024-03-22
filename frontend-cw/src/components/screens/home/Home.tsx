import {FC} from "react";
import Heading from "@/ui/Heading";
import Meta from "@/ui/Meta";
import Catalog from "@/ui/catalog/Catalog";
import {TypeEquipments, TypePaginationEquipments} from "@/types/equipment.interface";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";
import Layout from "@/ui/layout/Layout";

const Home: FC<TypePaginationEquipments> = ({equipments, length}) => {
    const {user} = useAuth()
    const {logout} = useActions()

    return (
        <Meta title='Home'>
            <Layout>
                {!!user && <button onClick={() => logout()}>Logout</button>}
                <Catalog title='Freshed equipments' equipments={equipments || []}/>
            </Layout>
        </Meta>
    )
}

export default  Home