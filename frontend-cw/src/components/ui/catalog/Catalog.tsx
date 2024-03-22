import {FC} from "react";
import {IEquipment} from "@/types/equipment.interface";
import Loader from "@/ui/Loader";
import EquipmentItem from "@/ui/catalog/equipment-item/EquipmentItem";
import equipmentItem from "@/ui/catalog/equipment-item/EquipmentItem";
import Heading from "@/ui/Heading";

interface ICatalog {
    equipments: IEquipment[]
    isLoading?: boolean
    title?: string
}

const Catalog: FC<ICatalog>
    = ({equipments, isLoading, title}) => {
    if (isLoading) return <Loader/>

    /*console.log(equipments)*/

    return (
        <section>
            {title && <Heading>{title}</Heading>}
            {equipments.length ? (
                equipments.map(equipment => (
                    <EquipmentItem key={equipment.id} equipment={equipment}/>
                ))
            ) : (
                <div>There are no products</div>
            )}
        </section>
    )
}
export  default Catalog