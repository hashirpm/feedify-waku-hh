import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, Skeleton } from '@chakra-ui/react'

export default function FeedCardSkeleton() {
    return (
        <Card >
            <CardBody>
                <Skeleton height='20px' className='w-1/2' />

                <Skeleton height='20px' className='mt-2' />
                <Skeleton height='20px' className='mt-2' />
                <Skeleton height='20px' className='mt-2' />

            </CardBody>
        </Card>
    )
}