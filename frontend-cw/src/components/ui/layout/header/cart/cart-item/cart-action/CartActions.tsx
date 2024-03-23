import {FC} from "react";
import {ICartItem} from "@/types/cart.interface";
import {useActions} from "@/hooks/useActions";
import {useCart} from "@/hooks/useCart";
import {FiTrash} from "react-icons/fi";

const CartActions: FC<{item: ICartItem}> = ({item}) => {
    const {removeFromCart} = useActions()

    const {items} = useCart()

    return (
        <div className='mt-3'>
            <div className='flex items-center gap-3'>
                <button
                    onClick={() => removeFromCart({id: item.id})}
                    className='ml-3 bg-black size-7 flex items-center justify-center rounded-xl shadow-2xl'
                >
                    <FiTrash />
                </button>
            </div>
        </div>
    )
}

export default CartActions