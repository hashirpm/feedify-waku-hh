import { ABI, CONTRACT_ADDRESS } from '@/lib/const'
import { Channel } from '@/lib/types'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useToast } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Image from 'next/image'


export default function ChannelCard(props: Channel) {

    const toast = useToast()

    const subscribeChannel = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        const signer = provider.getSigner();
        // Create a transaction object for the mint function
        console.log(Number(props.subscriptionAmount).toString())
        console.log(ethers.utils.parseEther(Number(props.subscriptionAmount).toString()))
        await contract.connect(signer).subscribeChannel(Number(props.channelId), { value: (Number(props.subscriptionAmount) + 100000000000000).toString() }).then(async (res: any) => {
            toast({
                title: 'Subscribing Channel',
                status: 'loading',
                duration: 2000,
                isClosable: false,
            })
            await res.wait();
            toast({
                title: `${props.name} Channel Subscribed`,
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
        });
    }

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
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{props.name}</Heading>
                    <Text>
                        {props.description}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        {Number(props.subscriptionAmount) / 1e18} MATIC
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button className="bg-[#2b6cb0] text-white w-full" onClick={subscribeChannel} >
                    Subscribe
                </Button>
            </CardFooter>
        </Card>
    )
}