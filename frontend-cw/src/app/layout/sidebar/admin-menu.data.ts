import {IMenuItem} from "@/app/layout/sidebar/menu.interface";
import {getAdminUrl} from "@/config/url.config";

export const ADMIN_MENU: IMenuItem[] = [
    {
        label: 'Dashboard',
        href: getAdminUrl('/')
    },
    {
        label: 'Equipments',
        href: getAdminUrl('/equipments')
    },
    {
        label: 'Rental points',
        href: getAdminUrl('/rental-points')
    },
    {
        label: 'Feedbacks',
        href: getAdminUrl('/feedbacks')
    },
]