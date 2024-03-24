import {FC} from "react";
import Link from "next/link";
import Image from "next/image";
import {AiOutlineHeart} from "react-icons/ai";
import Search from "@/app/layout/header/search/Search";
import HeaderCart from "@/app/layout/header/cart/cart-item/HeaderCart";
import HeaderProfile from "@/app/layout/header/HeaderProfile";

const Header: FC = () => {
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
                <Image
                    priority
                    width={50}
                    height={50}
                    src='/images/logo.svg'
                    alt='course-work'
                />
                <span className='text-primary text-3xl ml-4'>Название</span>
            </Link>
            <Search />
            <div className='flex items-center justify-end gap-10'>
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