import {FC, useState} from "react";
import {IEquipment} from "@/types/equipment.interface";
import {useQuery} from "@tanstack/react-query";
import {FeedbackService} from "@/services/feedback.service";
import {Rating} from "react-simple-star-rating";

const EquipmentRating: FC <{equipment: IEquipment}> = ({equipment}) => {
    /*Не считает рейтинг*/
    const [rating, setRating] = useState<number>(
        Math.round(
            equipment.feedbacks?.reduce((acc, feedback) =>
                acc + feedback.mark, 0) / equipment.feedbacks?.length
        ) || 0
    )

    return(
        <div className='mb-2'>
            <span className='mr-1'>
                <Rating
                    readonly
                    initialValue={+rating}
                    SVGstyle={{display: "inline-block"}}
                    size={34}
                    allowFraction
                    transition
                />
                <span
                    style={{color: '#FFBC0D'}}
                >{typeof rating === "number" && rating}</span>
            </span>
            <span>({equipment.feedbacks ? equipment.feedbacks.length : 0} reviews)</span>
        </div>
    )
}

export default EquipmentRating