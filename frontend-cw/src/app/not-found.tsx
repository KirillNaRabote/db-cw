import Layout from "@/ui/layout/Layout";
import Heading from "@/ui/Heading";
import Link from "next/link";

export default function NotFound() {
    return (
        <Layout>
            <Heading>Not found</Heading>
            <p>Could not found requested resource</p>
            <p>
                View{' '}
                <Link href='/explorer' className='text-primary'>all equipments</Link>
            </p>
        </Layout>
    )
}