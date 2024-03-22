import {useQuery} from "@tanstack/react-query";
import {UserService} from "@/services/user.service";
import {useAuth} from "@/hooks/useAuth";
/*на 4 45 пересомтреть*/
export const useProfile = () => {
    const {user} = useAuth()
    const {data} = useQuery({
        queryKey: ['get profile'],
        queryFn: UserService.getProfile
    })

    return {profile: data?.data }
}