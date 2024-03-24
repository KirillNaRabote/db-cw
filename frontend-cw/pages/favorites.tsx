import {NextPage} from "next";
import {useProfile} from "@/hooks/useProfile";
import {NextPageAuth} from "@/providers/auth-provider/auth-page.types";
import Layout from "@/ui/layout/Layout";
import Catalog from "@/ui/catalog/Catalog";

const FavoritesPage: NextPageAuth = () => {
    const {profile} = useProfile()

    return (
        <Layout>
            <Catalog equipments={profile?.favorites || []} title='Favorites'/>
        </Layout>
    )
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage