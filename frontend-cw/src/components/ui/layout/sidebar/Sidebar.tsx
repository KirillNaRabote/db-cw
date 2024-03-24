'use client'

import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {RentalPointService} from "@/services/rentalPoint.service";
import {useRouter} from "next/navigation";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import Loader from "@/ui/Loader";
import Link from "next/link";
import cn from "clsx";
import {FiLogOut} from "react-icons/fi";

const Sidebar: FC = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['get rental points'],
        queryFn: () => RentalPointService.getAll(),
        select: ({data}) => data
    })

    const asPath = useRouter()

    const {user} = useAuth()
    const {logout} = useActions()

    return (
        <aside
            className='bg-secondary flex flex-col justify-between'
            style={{height: 'calc(100vh - 91px)'}}
        >
            <div>
                {isLoading ? (
                    <Loader />
                ) : data ? (
                    <>
                        <div className='text-xl text-white mt-4 mb-6 ml-6'>
                            Точки проката:
                        </div>
                        <ul>
                            {data.map(rentalPoint => (
                                <li
                                    className='mt-3'
                                    key={rentalPoint.idRentalPoint}
                                >
                                    <Link
                                        className={cn('lock text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
                                        asPath === `/rental-point/${rentalPoint.slug}`
                                            ? 'text-primary'
                                            : 'text-white')}
                                        href={`/rental-point/${rentalPoint.slug}`}
                                    >
                                        {rentalPoint.city + ', ' + rentalPoint.street + ', ' + rentalPoint.house}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <div>Rental points not found</div>
                )}
            </div>

            {!!user && (
                <button
                    className='text-white flex items-center ml-10 mb-10'
                    onClick={() => logout()}
                >
                    <FiLogOut/>
                    <span className='ml-2'>Logout</span>
                </button>
            )}
        </aside>
    )
}

export default Sidebar