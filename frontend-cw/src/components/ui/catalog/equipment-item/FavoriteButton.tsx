import {FC} from "react";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {IEquipment} from "@/types/equipment.interface";
import {useActions} from "@/hooks/useActions";
import {useCart} from "@/hooks/useCart";
import {useProfile} from "@/hooks/useProfile";
import {UserService} from "@/services/user.service";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth";

const FavoriteButton: FC<{idEquipment: number}> = ({idEquipment}) => {
    const {profile} = useProfile()

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationKey: ['toggle favorite'],
        mutationFn: () => UserService.toggleFavorites(idEquipment),
        onMutate: () => queryClient.invalidateQueries({
            queryKey: ['get profile']
        })
    })

    if (!profile) {
        return null
    }

    const isExists = profile.favorites.some(
        favorite => favorite.idEquipment === idEquipment
    )

    return (
        <div>
            <button
                onClick={() =>
                    mutate()
                }
                className='text-primary'
            >
                {isExists ? <AiFillHeart/> : <AiOutlineHeart/>}
            </button>
        </div>
    )
}

export default FavoriteButton