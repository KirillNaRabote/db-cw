import {useQuery} from "@tanstack/react-query";
import {RentalPointService} from "@/services/rentalPoint.service";

export const useRentalPoints = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['get rental points'],
        queryFn: () => RentalPointService.getAll(),
        select: ({data}) => data
    })

    return {data, isLoading}
}