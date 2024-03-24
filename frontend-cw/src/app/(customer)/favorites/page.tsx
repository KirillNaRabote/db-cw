import {Metadata} from "next";
import {NO_INDEX_PAGE} from "@/constants/seo.constants";
import Favorites from "@/app/(customer)/favorites/Favorites";

export const metadata :Metadata = {
    title: 'favorites',
    ...NO_INDEX_PAGE
}

export default function FavoritesPage() {
    return <Favorites/>
}