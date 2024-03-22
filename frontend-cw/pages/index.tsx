import {GetStaticProps, NextPage} from "next";
import {NextPageAuth} from "@/providers/auth-provider/auth-page.types";
import Home from "@/screens/home/Home";
import {IEquipment, TypeEquipments, TypePaginationEquipments} from "@/types/equipment.interface";
import {EquipmentService} from "@/services/equipment/equipment.service";

const HomePage: NextPage<TypePaginationEquipments> = ({length, equipments}) => {
  return <Home equipments={equipments} length={length}/>
}

export const getStaticProps: GetStaticProps<TypePaginationEquipments>
    = async () => {
  const {data} = await EquipmentService.getAll({
    page: 1,
    perPage: 50
  })

  return {
    props: data
  }
}

export default HomePage