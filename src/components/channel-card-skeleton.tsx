import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, Skeleton } from '@chakra-ui/react'
import Image from 'next/image'

export default function ChannelCardSkeleton() {
    return (
        <Card maxW='sm'>
            <CardBody>
                <Skeleton height='100px' />
                <Stack mt='6' spacing='3'>
                    <Skeleton height='20px' className='w-1/2' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                    <Skeleton height='20px' />
                </Stack>
            </CardBody>
        </Card>
    )
}