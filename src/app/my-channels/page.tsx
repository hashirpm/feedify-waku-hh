"use client"

import { Button, Input, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";
import { storeFiles } from "@/lib/helper";
import { BigNumber, ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { useAccount } from "wagmi";
import ChannelCardSkeleton from "@/components/channel-card-skeleton";
import { Channel, MyChannel } from "@/lib/types";
import MyChannelCard from "@/components/my-channel-card";

export default function MyChannels() {

    const toast = useToast()
    const account = useAccount()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const name = useRef<any>()
    const description = useRef<any>()
    const amount = useRef<any>()
    const [file, setFile] = useState<any>()
    const [channels, setChannels] = useState<MyChannel[]>([])

    const createChannel = async (logoUrl: string) => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        const signer = provider.getSigner();
        // Create a transaction object for the mint function
        console.log(name.current.value)
        console.log(description.current.value)
        console.log(amount.current.value)
        await contract.connect(signer).createChannel(
            name.current.value,
            description.current.value,
            ethers.utils.parseEther(amount.current.value),
            logoUrl,
            account.address
        ).then(async (res: any) => {
            toast({
                title: 'Creating Channel',
                status: 'loading',
                duration: 2000,
                isClosable: false,
            })
            await res.wait();
            toast({
                title: 'Channel Created',
                status: 'success',
                duration: 2000,
                isClosable: false,
            })
        });
    }

    const handleCreateChannel = async () => {

        toast({
            title: 'Uploading Logo to IPFS',
            status: 'loading',
            duration: 2000,
            isClosable: false,
        })
        let link = await storeFiles(file)
        // let link = "https://ipfs.io/ipfs/bafybeiejfnkkayxccsf6bsm537qbok7i5crrmqnkdzu7iqbzgqcsqflngu/Black.png"
        toast({
            title: 'Logo Uploaded',
            status: 'success',
            duration: 2000,
            isClosable: false,
        })

        await createChannel(link)
    }

    const getChannelsByOwner = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })
        let data = await contract.getChannelsByOwner(account.address)
        setChannels(data)

        console.log({ data })
    }

    useEffect(() => {
        getChannelsByOwner()
    }, [])


    return (
        <div className="max-w-screen-xl mx-auto px-4">
            <div className="flex justify-end items-center gap-4 mt-8">
                <Button onClick={onOpen} leftIcon={<AddIcon w={3} h={3} />} colorScheme="blue" className="bg-[#2b6cb0]">
                    Create Channel
                </Button>
                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create Channel</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder="Channel Name" type="text" ref={name} />
                            <Input placeholder="Channel Description" type="text" className="mt-4" ref={description} />
                            <Input placeholder="Subscription Price in MATIC" type="number" className="mt-4" ref={amount} />
                            <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                <Button className="btn">{file != null ? file[0].name : "Upload Logo"}</Button>
                                <Input type="file" name="myfile" onChange={(e) => setFile(e.target.files)} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCreateChannel}>Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
            <div className="px-4">
                <div className="grid grid-cols-5 gap-4">
                    {
                        channels.length > 0 ?
                            channels.map((item, index) => (
                                <MyChannelCard
                                    name={item.name}
                                    description={item.description}
                                    logoUrl={item.logoUrl}
                                    subscriptionAmount={item.subscriptionAmount}
                                    channelId={item.channelId}
                                    owner={item.owner}
                                    earnings={item.earnings}
                                    totalSubscriptions={item.totalSubscriptions}
                                    key={index}
                                />
                            ))
                            :
                            [1, 1, 1, 1].map((item, index) => (
                                <ChannelCardSkeleton key={index} />
                            ))
                    }
                </div>

            </div>
        </div>
    )
}