import { ABI, CONTRACT_ADDRESS } from '@/lib/const'
import { Channel, MyChannel } from '@/lib/types'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Image from 'next/image'


export default function MyChannelCard(props: MyChannel) {

    const toast = useToast()


    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                    src={props.logoUrl}
                    alt='Green double couch with wooden legs'
                    className='rounded-lg aspect-square'
                    width={400}
                    height={300}
                />
                <Heading size='md' className='mt-4'>{props.name}</Heading>
                <Text className='text-xs mt-2'>
                    {props.description}
                </Text>
                <Text color='blue.600' fontSize='sm'>
                    {Number(props.subscriptionAmount) / 1e18} $MATIC
                </Text>
                <Text color='blue.600' fontSize='sm'>
                    Total Earnings:  {Number(props.totalSubscriptions) / 1e18} $MATIC
                </Text>
                <Text color='blue.600' fontSize='sm'>
                    Subscribers: {Number(props.totalSubscriptions) / 1e18}
                </Text>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button className="bg-[#2b6cb0] text-white w-full"  >
                    Post
                </Button>
            </CardFooter>
        </Card>
    )
}