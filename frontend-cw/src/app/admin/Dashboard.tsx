'use client'

import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {StatisticsService} from "@/services/statistics.service";
import Heading from "@/ui/Heading";
import Loader from "@/ui/Loader";
import styles from './Dashboard.module.scss'
import {convertPrice} from "@/utils/convertPrice";

const Dashboard: FC = () => {
    const {data, isFetching} = useQuery({
        queryKey: ['statistics'],
        queryFn: () => StatisticsService.getMain(),
        select: data => data.data
    })

    return (
        <>
            <Heading className='mb-8'>Dashboard</Heading>
            {isFetching ? (
                <Loader />
            ) : data?.length ? (
                <div className={styles.wrapper}>
                    {data.map((item, index) => (
                        <div
                            key={item.name}
                            className={styles.item}
                        >
                            <div>{item.name}</div>
                            <div>
                                {item.value}
                                {/*{index === data.length - 1
                                    ? convertPrice(item.value || 0)
                                    : item.value}*/}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Statistics not loaded</div>
            )}
        </>
    )
}

export default Dashboard