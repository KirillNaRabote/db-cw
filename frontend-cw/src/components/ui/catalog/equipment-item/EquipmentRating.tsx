import {FC, useState} from "react";
import {IEquipment} from "@/types/equipment.interface";
import {useQuery} from "@tanstack/react-query";
import {FeedbackService} from "@/services/feedback.service";
import {Rating} from "react-simple-star-rating";

interface IEquipmentsRating {
    equipment: IEquipment
    isText?: boolean
}

const EquipmentRating: FC <IEquipmentsRating> = ({equipment, isText = false}) => {
    //TODO разобраться как рейтинг вывести
    const [rating, setRating] = useState<number>(
        Math.round(
            /*equipment.rents.map((rent, acc) => {
                rent.feedbacks.reduce((feedback) => { acc + feedback.mark})
            })*/
            equipment?.feedbacks?.reduce((acc, feedback) =>
                acc + feedback.mark, 0) / equipment?.feedbacks?.length
        ) || 0
    )

    return(
        <div className='mb-2'>
            {!!equipment.rents.some((rent) => {rent.feedbacks.length}) &&
            <span className='mr-1 inline-flex items-center'>
                <Rating
                    readonly
                    initialValue={+rating}
                    SVGstyle={{display: "inline-block"}}
                    size={20}
                    allowFraction
                    transition
                />
                <span
                    style={{color: '#FFBC0D'}}
                    className='text-sm ml-1'
                >{typeof rating === "number" && rating}</span>
            </span>}
            {isText && (<span className='text-xs'>({equipment.feedbacks ? equipment.feedbacks.length : 0} reviews)</span>)}
        </div>
    )
}

export default EquipmentRating