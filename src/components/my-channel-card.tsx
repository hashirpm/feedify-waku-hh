import { ABI, CONTRACT_ADDRESS } from '@/lib/const'
import { Channel, MyChannel } from '@/lib/types'
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text, Divider, ButtonGroup, Button, useToast, useDisclosure, Input, Textarea } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Image from 'next/image'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { createNode, sendBlog } from '@/lib/waku'
import { LightNode } from '@waku/sdk'
import { storeFiles } from '@/lib/helper'

export default function MyChannelCard(props: MyChannel) {

    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [file, setFile] = useState<any>()
    const name = useRef<any>()
    const description = useRef<any>()

    const handlePost = async () => {

        let link = await storeFiles(file)
        await sendBlog(
            wakuNode as LightNode,
            {
                title: name.current.value,
                description: description.current.value,
                image: link
            },
            "/waku-hh-podcast-sub/channel/" + props.channelId
        ).then((res) => {
            console.log({ res })
        })
    }

    const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
    useEffect(() => {
        if (wakuNode) return;

        (async () => {
            console.log("starting node");
            const node = await createNode();
            console.log("node started");
            setWakuNode(node);
        })();
    }, [wakuNode]);

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
                    Total Earnings:  {Number(props.totalSubscriptions)} $MATIC
                </Text>
                <Text color='blue.600' fontSize='sm'>
                    Subscribers: {Number(props.totalSubscriptions)}
                </Text>
            </CardBody>
            <Divider />
            <CardFooter>

                <Button className="bg-[#2b6cb0] text-white w-full" onClick={onOpen}  >
                    Post
                </Button>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder="Post Title" type="text" ref={name} />
                            <Textarea placeholder="Post Content" className="mt-4" ref={description} />
                            <div className="upload-btn-wrapper mt-4 cursor-pointer">
                                <Button className="btn">{file != null ? file[0].name : "Upload Image"}</Button>
                                <Input type="file" name="myfile" onChange={(e) => setFile(e.target.files)} />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={handlePost}>Send</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </CardFooter>
        </Card>
    )
}