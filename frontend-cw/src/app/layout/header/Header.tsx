'use client'

import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineHeart} from "react-icons/ai";
import HeaderProfile from "@/app/layout/header/HeaderProfile";
import HeaderCart from "@/app/layout/header/cart/HeaderCart";
import {useIsAdminPanel} from "@/hooks/useIsAdminPanel";
import {useAuth} from "@/hooks/useAuth";
import {ADMIN, ID_ADMIN} from "@/constants/seo.constants";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import {UserService} from "@/services/user.service";
import Search from "@/app/layout/header/Search";

const Header: FC = () => {
    const {isAdminPanel} = useIsAdminPanel()
    const {user} = useAuth()

    return (
        <header
            className='bg-secondary w-full py-6 px-6 grid'
            style={{
                gridTemplateColumns: '1fr 3fr 1.2fr'
            }}
        >
            <Link
                className='flex items-center'
                href='/'
            >
                {isAdminPanel ? (
                    <h2 className='text-3xl text-white font-semibold'>Admin Panel</h2>
                ) : (
                    <>
                        <Image
                            priority
                            width={50}
                            height={50}
                            src='/images/logo.svg'
                            alt='course-work'
                        /></>
                )}
                <span className='text-primary text-3xl ml-4'>Название</span>
            </Link>
            <Search />
            <div className='flex items-center justify-end gap-10'>
                {user?.idRole === ID_ADMIN && !isAdminPanel && (
                    <Link
                        href='/admin'
                        className='hover:text-primary transition-colors duration-200 text-white inline-block text-lg'
                    >
                        <MdOutlineAdminPanelSettings size={29}/>
                    </Link>
                )}
                <Link href='/pages/favorites'
                      className='text-white'
                >
                    <AiOutlineHeart size={28}/>
                </Link>
                <HeaderCart />
                <HeaderProfile />
            </div>
        </header>
    )
}

export default Header