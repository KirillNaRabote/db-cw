import {IMenuItem} from "@/app/layout/sidebar/menu.interface";
import {IRentalPoint} from "@/types/rentalPoint.inteface";

export const convertToMenuItems = (rentalPoints: IRentalPoint[]): IMenuItem[] =>
    rentalPoints.map(rentalPoint => ({
        label: `${rentalPoint.city}, ${rentalPoint.street}, ${rentalPoint.house}`,
        href: `/rental-point/${rentalPoint.slug}`
    }))