import {FC} from "react";
import {ICartItem} from "@/types/cart.interface";
import Image from "next/image";
import {convertPrice} from "@/utils/convertPrice";
import CartActions from "@/ui/layout/header/cart/cart-item/cart-action/CartActions";

const CartItem: FC<{item: ICartItem}> = ({item}) => {
    return (
        <div className='flex mt-4 items-center'>
            <Image
                className='rounded-xl'
                src={item.equipment.images[0]}
                width={100}
                height={100}
                alt={item.equipment.equipmentName.name}
            />
            <div className='ml-1'>
                <div className='text-sm font-semibold'>{item.equipment.equipmentName.name}</div>
                <div className='mt-1'>{convertPrice(item.equipment.price)}<span>/мин</span></div>
                <CartActions item={item}/>
            </div>
        </div>
    )
}

export default CartItem