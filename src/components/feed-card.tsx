import { Post } from '@/lib/types'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import Image from 'next/image'



export default function FeedCard(props: Post) {
    return (
        <Card >
            <CardBody>
                <Image src={props.image} alt="" width={300} height={400} />
                <h1 className="text-xl font-semibold">
                    {props.title}
                </h1>
                <p className="text-sm">
                    {props.description}
                </p>
            </CardBody>
        </Card>
    )
}