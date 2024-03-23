import {FC} from "react";
import {useOutside} from "@/hooks/useOutside";
import {useCart} from "@/hooks/useCart";
import {RiShoppingCartLine} from "react-icons/ri";
import cn from "clsx";
import SquareButton from "@/ui/button/SquareButton";
import {convertPrice} from "@/utils/convertPrice";
import Button from "@/ui/button/Button";
import CartItem from "@/ui/layout/header/cart/cart-item/CartItem";

const HeaderCart: FC = () => {
    const {
        isShow,
        setIsShow,
        ref}
        = useOutside(false)

    const {items, total} = useCart()

    return (
        <div className='relative' ref={ref}>
            <SquareButton
                Icon={RiShoppingCartLine}
                onClick={() => {setIsShow(!isShow)}}
                number = {items.length}
            />

            <div
                className={cn('absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white',
                    isShow ? 'open-menu' : 'close-menu')}
            >
                <div className='font-normal text-lg mb-5'>My cart</div>

                <div className=''>
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
                <div className='text-center'>
                    <Button variant='white' size='sm' className='btn-link mt-5 mb-2'>
                        Place order
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeaderCart