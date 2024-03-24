import {Dispatch, FC, SetStateAction} from "react";
import {EnumEquipmentSort} from "@/services/equipment/equipment.types";

interface  ISortDropdown {
    sortType: EnumEquipmentSort
    setSortType: Dispatch<SetStateAction<EnumEquipmentSort>>
}

const SortDropdown: FC<ISortDropdown> = ({setSortType, sortType}) => {
    return (
        <div className='w-full mb-5 bg'>
            <select
                value={sortType}
                onChange={e => setSortType(e.target.value as any)}
                className='appearance-none py-1 px-2 bg-secondary text-white'
            >
                {(
                    Object.keys(EnumEquipmentSort) as Array<keyof typeof EnumEquipmentSort>)
                    .map(key => {
                        return(
                            <option
                                key={key}
                                onChange={() => setSortType(EnumEquipmentSort[key])}
                                value={EnumEquipmentSort[key]}
                            >
                                {EnumEquipmentSort[key]}
                            </option>
                        )
                    })
                }
            </select>
        </div>)
}

export default SortDropdown