import {GetStaticPaths, GetStaticProps, NextPage} from "next";
import {IEquipment} from "@/types/equipment.interface";
import {IRentalPoint} from "@/types/rentalPoint.inteface";
import Meta from "@/ui/Meta";
import Layout from "@/ui/layout/Layout";
import Catalog from "@/ui/catalog/Catalog";
import {RentalPointService} from "@/services/rentalPoint.service";
import {EquipmentService} from "@/services/equipment/equipment.service";
import CatalogPagination from "@/ui/catalog/CatalogPagination";

const RentalPointPage: NextPage<{
    length: number
    equipments: IEquipment[]
    rentalPoint: IRentalPoint
}> = ({equipments, rentalPoint, length}) => {
    const rentalPointName = rentalPoint.city + ' '+ rentalPoint.street + ' ' + rentalPoint.house
    return (
        <Meta
            title={rentalPointName}
        >
            <Layout>
                {/*<CatalogPagination data={{equipments, length}} title={rentalPointName}/>*/}
                <Catalog equipments={equipments || []} title={rentalPointName}/>
            </Layout>
        </Meta>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const rentalPoints = await RentalPointService.getAll()

    const paths = rentalPoints.data.map(rentalPoint => {
        return {
            params: {slug: rentalPoint.slug}
        }
    })

    return {paths, fallback: 'blocking'}
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const {data: equipments} = await EquipmentService.getByRentalPoint(params?.slug as string)

    const {data: rentalPoint} = await RentalPointService.getBySlug(params?.slug as string)

    return {
        props: {
            equipments,
            rentalPoint
        }
    }
}

export default RentalPointPage