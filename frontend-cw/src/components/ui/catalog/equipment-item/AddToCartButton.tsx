import {FC} from "react";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {IEquipment} from "@/types/equipment.interface";
import {useActions} from "@/hooks/useActions";
import {useCart} from "@/hooks/useCart";
import {RiShoppingCartFill, RiShoppingCartLine} from "react-icons/ri";

const AddToCartButton: FC<{equipment: IEquipment}> = ({
    equipment}) => {
    const {addToCart, removeFromCart} = useActions()
    const {items} = useCart()

    const currentElement = items.find(
        cartItem => cartItem.equipment.id === equipment.id
    )

    return (
        <div>
            <button
                className='text-primary'
                onClick={() =>
                    currentElement
                        ? removeFromCart({id: currentElement.id})
                        : addToCart({
                        equipment,
                        price: equipment.price
                        })
                }
            >
                {currentElement ? <RiShoppingCartFill/> : <RiShoppingCartLine/>}
            </button>
        </div>
    )
}

export default AddToCartButton