import {Metadata} from "next";
import {RentalPointService} from "@/services/rentalPoint.service";
import {IPageSlugParam, TypeParamSlug} from "@/types/page-params";
import {EquipmentService} from "@/services/equipment/equipment.service";
import Catalog from "@/ui/catalog/Catalog";

export const revalidate = 60

async function generateStaticParams() {
    const rentalPoints = await RentalPointService.getAll()

    const paths = rentalPoints.data.map(rentalPoint => {
        return {
            params: {slug: rentalPoint.slug}
        }
    })

    return paths
}

async function getEquipments(params: TypeParamSlug) {
    const {data: equipments} = await EquipmentService.getByRentalPoint(params?.slug as string)

    const {data: rentalPoint} = await RentalPointService.getBySlug(params?.slug as string)

    return {equipments, rentalPoint}
}

export async function generateMetadata({params} : IPageSlugParam): Promise<Metadata> {
    const {equipments, rentalPoint} = await getEquipments(params)

    return {
        title: rentalPoint.city + ', ' + rentalPoint.street + ', ' + rentalPoint.house,
        description: `Random description about ${rentalPoint.city}, ${rentalPoint.street}, ${rentalPoint.house}`,
        openGraph: {
            images: equipments[0].images,
            description: `Random description about ${rentalPoint.city}, ${rentalPoint.street}, ${rentalPoint.house}`
        }
    }
}

export default async function RentalPointPage({params} : IPageSlugParam) {
    const data = await getEquipments(params)

    return <div>
        <Catalog equipments={data.equipments || []} title={data.rentalPoint.city + ', ' + data.rentalPoint.street + ', ' + data.rentalPoint.house}/>
    </div>

    return <></>
}