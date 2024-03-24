'use client'

import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {RentalPointService} from "@/services/rentalPoint.service";
import {usePathname, useRouter} from "next/navigation";
import {useActions} from "@/hooks/useActions";
import {useAuth} from "@/hooks/useAuth";
import Loader from "@/ui/Loader";
import Link from "next/link";
import cn from "clsx";
import {FiLogOut} from "react-icons/fi";
import {useIsAdminPanel} from "@/hooks/useIsAdminPanel";
import {useRentalPoints} from "@/hooks/queries/useRentalPoints";
import {ADMIN_MENU} from "@/app/layout/sidebar/admin-menu.data";
import {convertToMenuItems} from "@/app/layout/sidebar/convert-to-menu-items";

const Sidebar: FC = () => {
    const {data, isLoading} = useRentalPoints()

    const {user} = useAuth()
    const {logout} = useActions()

    const {isAdminPanel, pathname} = useIsAdminPanel()

    return (
        <aside
            className='bg-secondary flex flex-col justify-between z-1'
            style={{height: 'calc(100vh - 91px)'}}
        >
            <div>
                {isLoading ? (
                    <Loader />
                ) : data ? (
                    <>
                        <div className='text-xl text-white mt-4 mb-6 ml-6'>
                            {isAdminPanel ? 'Menu:' : 'Точки проката:'}
                        </div>
                        <ul>
                            {(isAdminPanel ? ADMIN_MENU : convertToMenuItems(data)).map(item => (
                                <li
                                    className='mt-3'
                                    key={item.href}
                                >
                                    <Link
                                        className={cn('lock text-lg my-3 px-10 hover:text-primary transition-colors duration-200',
                                        pathname === item.href
                                            ? 'text-primary'
                                            : 'text-white')}
                                        href={item.href}
                                    >
                                        {item.label}
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