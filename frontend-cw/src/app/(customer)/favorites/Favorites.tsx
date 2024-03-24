import {useProfile} from "@/hooks/useProfile";
import Catalog from "@/ui/catalog/Catalog";
import Layout from "@/ui/layout/Layout";

interface IFavorites {}

export default function Favorites({}: IFavorites) {
    const {profile} = useProfile()

    return (
        <Layout>
            <Catalog equipments={profile?.favorites || []} title='Favorites'/>
        </Layout>
    )
}