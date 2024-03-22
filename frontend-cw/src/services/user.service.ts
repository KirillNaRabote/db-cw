import {instance} from "@/api/api.interceptor";
import {IFullUser, IUser} from "@/types/user.interface";

const USERS = 'users/profile'
type TypeData = {
    email: string
    password?: string
    name?: string
    avatarPath?: string
    phone?: string
}

export const UserService = {
    async getProfile() {
        return instance<IFullUser>({
            url: USERS,
            method: 'GET'
        })
    },

    async updateProfile(data: TypeData) {
        return instance<IUser>({
            url: USERS,
            method: 'PUT',
            data
        })
    },

    async toggleFavorites(idEquipment: string | number) {
        return instance<IUser>({
            url: `${USERS}/favorites/${idEquipment}`,
            method: 'PATCH',
        })
    },
}