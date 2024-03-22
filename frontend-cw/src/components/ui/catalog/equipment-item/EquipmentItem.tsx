import React, {FC} from "react";
import {IEquipment} from "@/types/equipment.interface";
import FavoriteButton from "@/ui/catalog/equipment-item/FavoriteButton";
import AddToCartButton from "@/ui/catalog/equipment-item/AddToCartButton";
import EquipmentRating from "@/ui/catalog/equipment-item/EquipmentRating";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
    ssr: false
})

const EquipmentItem: FC<{equipment: IEquipment}> = ({equipment}) => {
    return (
        <div>
            <div className='bg-white rounded-xl relative'>
                <div className='absolute top-2 right-2 z-10'>
                    <DynamicFavoriteButton idEquipment={equipment.id}/>
                    <AddToCartButton equipment={equipment}/>
                </div>
                <Link href={`/equipment/${equipment.slug}`}>
                <Image
                    width={300}
                    height={300}
                    src={equipment.images[0]}
                    alt={equipment.equipmentName.name}
                />
                </Link>
            </div>
            <Link href={`/equipment/${equipment.slug}`}><h3 className='mb-1'>{equipment.equipmentName.name}</h3></Link>
            <Link
                href={`rental-point/${equipment.rentalPoint.slug}`}
                className='text-aqua text-sm mb-2'
            >
                {equipment.rentalPoint.city + ', '+ equipment.rentalPoint.street + ', ' + equipment.rentalPoint.house}
            </Link>
            <EquipmentRating equipment={equipment}/>
            <div className='text-2xl font-semibold'>{equipment.price}</div>
        </div>
    )
}

export default EquipmentItem