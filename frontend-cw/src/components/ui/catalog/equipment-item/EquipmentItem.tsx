import React, {FC} from "react";
import {IEquipment} from "@/types/equipment.interface";
import FavoriteButton from "@/ui/catalog/equipment-item/FavoriteButton";
import AddToCartButton from "@/ui/catalog/equipment-item/AddToCartButton";
import EquipmentRating from "@/ui/catalog/equipment-item/EquipmentRating";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import {convertPrice} from "@/utils/convertPrice";

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
    ssr: false
})

const EquipmentItem: FC<{equipment: IEquipment}> = ({equipment}) => {
    return (
        <div className='shadow-xl'>
            <div className='bg-white rounded-xl relative overflow-hidden'>
                <div className='absolute top-2 right-3 z-10'>
                    <DynamicFavoriteButton idEquipment={equipment.idEquipment}/>
                    <AddToCartButton equipment={equipment}/>
                </div>
                <Link href={`/equipment/${equipment.slug}`}>
                <Image
                    width={250}
                    height={250}
                    src={equipment.images[0]}
                    alt={equipment.equipmentName.name}
                />
                </Link>
            </div>
            <Link href={`/equipment/${equipment.slug}`}><h3 className=' mt-2 font-semibold'>{equipment.equipmentName.name}</h3></Link>
            <Link
                href={`rental-point/${equipment.rentalPoint.slug}`}
                className='text-aqua text-xs mb-2'
            >
                {equipment.rentalPoint.city + ', '+ equipment.rentalPoint.street + ', ' + equipment.rentalPoint.house}
            </Link>
            <EquipmentRating equipment={equipment}/>
            <div className='text-2xl font-semibold flex'>{convertPrice(equipment.price)}<div className='text-sm align-bottom'>/мин</div> </div>
        </div>
    )
}

export default EquipmentItem