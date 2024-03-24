import {IUser} from "@/types/user.interface";

export interface IRole {
    title: string
}

export interface IUserState {
    email: string
    idRole: number
    role: IRole
}

export interface ITokens {
    accessToken: string
    refreshToken: string
}

export interface IInitialState {
    user: IUserState | null
    isLoading: boolean
}

export interface IEmailPassword {
    email: string
    password: string
}

export interface IAuthResponse extends ITokens{
    user: IUser
}