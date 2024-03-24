'use client'

import {useQuery} from "@tanstack/react-query";
import {RentService} from "@/services/rent.service";
import Heading from "@/ui/Heading";
import {convertPrice} from "@/utils/convertPrice";

interface IMyOrders {}

export default function MyRents({}: IMyOrders) {
    const {data: rents} = useQuery({
        queryKey: ['my rents'],
        queryFn: () => RentService.getAll(),
        select: data => data.data
    })

    return <div>
        <Heading>My rents</Heading>
        <section>
            {rents?.length ? (
                rents.map(rent => (
                    <div
                        key={rent.idRent}
                        className='rounded-lg bg-white shadowflex gap-10 p-7 my-7'
                    >
                        <span>#{rent.idRent}</span>
                        <span>{
                            new Date(rent.createdAt).toLocaleDateString('ru-Ru')
                        }</span>
                        <span>{convertPrice(rent.equipment.price)}</span>
                    </div>
                ))
            ) : (
                <div>Rent not found</div>
            )}
        </section>
    </div>
}