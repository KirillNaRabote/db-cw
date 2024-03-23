import {NextPage} from "next";
import {useRouter} from "next/router";
import {useQuery} from "@tanstack/react-query";
import {EquipmentService} from "@/services/equipment/equipment.service";
import Meta from "@/ui/Meta";
import Catalog from "@/ui/catalog/Catalog";
import Layout from "@/ui/layout/Layout";

const SearchPage: NextPage = () => {
    const {query} = useRouter()

    const {data} = useQuery({
        queryKey: ['search products'],
        queryFn: () => EquipmentService.getAll({searchTerm: query.term as string})
    })

    return(
        <Meta title='Поиск'>
            <Layout>
                <Catalog
                    equipments={data?.equipments || []}
                    title={`Поиск по запросу "${query.term || ''}"`}
                />
            </Layout>
        </Meta>
    )
}

export default SearchPage