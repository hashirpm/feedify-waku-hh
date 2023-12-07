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
import { useRef, useState } from "react";
import { storeFiles } from "@/lib/helper";
import { ethers } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";

export default function MyChannels() {

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const name = useRef<any>()
    const description = useRef<any>()
    const [file, setFile] = useState<any>()

    const getOrdersByGigId = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        const signer = provider.getSigner();
        // Create a transaction object for the mint function
        const orders = await contract.connect(signer).getOrdersByGigId()
    }

    const handleCreateChannel = async () => {

        toast({
            title: 'Uploading Logo to IPFS',
            status: 'loading',
            duration: 2000,
            isClosable: false,
        })
        // let link = await storeFiles(file)
        toast({
            title: 'Logo Uploaded',
            status: 'success',
            duration: 2000,
            isClosable: false,
        })
        toast({
            title: 'Creating Channel',
            status: 'loading',
            duration: 2000,
            isClosable: false,
        })
    }


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
                            <Input placeholder="Channel Name" type="text" />
                            <Input placeholder="Channel Description" type="text" className="mt-4" />
                            <Input placeholder="Subscription Price" type="number" className="mt-4" />
                            <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                <Button className="btn">Upload Logo</Button>
                                <Input type="file" name="myfile" onChange={(e) => setFile(e.target.files)} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handleCreateChannel}>Create</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </div>
        </div>
    )
}