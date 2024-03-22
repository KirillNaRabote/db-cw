import {FC} from "react";
import Heading from "@/ui/Heading";
import Meta from "@/ui/Meta";
import Catalog from "@/ui/catalog/Catalog";
import {TypeEquipments, TypePaginationEquipments} from "@/types/equipment.interface";
import {useAuth} from "@/hooks/useAuth";
import {useActions} from "@/hooks/useActions";

const Home: FC<TypePaginationEquipments> = ({equipments, length}) => {
    const {user} = useAuth()
    const {logout} = useActions()

    return (
        <Meta title='Home'>
            {!!user && <button onClick={() => logout()}>Logout</button>}
            <Catalog title='Freshed equipments' equipments={equipments || []}/>
        </Meta>
    )
}

export default  Home