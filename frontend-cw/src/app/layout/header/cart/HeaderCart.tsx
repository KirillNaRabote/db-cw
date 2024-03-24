'use client'

import {FC} from "react";
import {useOutside} from "@/hooks/useOutside";
import {useCart} from "@/hooks/useCart";
import {RiShoppingCartLine} from "react-icons/ri";
import cn from "clsx";
import SquareButton from "@/ui/button/SquareButton";
import {convertPrice} from "@/utils/convertPrice";
import Button from "@/ui/button/Button";
import CartItem from "@/app/layout/header/cart/cart-item/CartItem";
import {useActions} from "@/hooks/useActions";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {RentService} from "@/services/rent.service";
import Link from "next/link";
import styles from './Cart.module.scss'

const HeaderCart: FC = () => {
    const {
        isShow,
        setIsShow,
        ref}
        = useOutside(false)

    const {items, total} = useCart()

    const {reset} = useActions()

    const {push} = useRouter()

    return (
        <div className='relative' ref={ref}>
            <SquareButton
                Icon={RiShoppingCartLine}
                onClick={() => {setIsShow(!isShow)}}
                number = {items.length}
            />

            {isShow &&
            <div
                className={cn('absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-3 text-white',
                    isShow ? 'open-menu' : 'close-menu')}
                /*className={cn('cartWrapper')}*/
                /*className={styles.cartWrapper}*/
            >
                <div className='font-normal text-lg mb-5'>My cart</div>

                <div /*className={styles.cart}*/>
                    {items.length ? (
                        items.map(item => <CartItem item={item} key={item.id} />)
                    ) : (
                        <div className='font-light'>Cart is empty</div>
                    )}
                </div>

                <div className='mt-3'>
                    <div>Total:</div>
                    <div>{convertPrice(total)} <span>/мин</span> </div>
                </div>
                {!!items.length &&
                <div className='text-center mt-7 mb-5'>
                    <Link
                        className='btn btn-white'
                        href='/checkout'
                    >Place order</Link>
                </div>}
            </div>}
        </div>
    )
}

export default HeaderCart