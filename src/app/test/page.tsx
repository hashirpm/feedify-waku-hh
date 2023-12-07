"use client"
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Input } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { storeFiles } from '@/lib/helper'
import { LightNode, waku } from '@waku/sdk'
import { createNode, retrieveExistingVotes, sendBlog, subscribeToIncomingBlogs } from '@/lib/waku'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    // const [files, setFiles] = useState<any>()
    // const topic = useRef<any>()
    // const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
    // useEffect(() => {
    //     if (wakuNode) return;

    //     (async () => {
    //         console.log("starting node");
    //         const node = await createNode();
    //         console.log("node started");
    //         setWakuNode(node);
    //     })();
    // }, [wakuNode]);

    // const handleSend = async () => {
    //     if (wakuNode == null) {
    //         console.log("Waku node not stared")
    //         return
    //     }
    //     let link = await storeFiles(files)
    //     let wakuRes = await sendBlog(wakuNode, { ipfsHash: link }, topic.current.value)
    //     console.log({ wakuRes })
    // }

    // useEffect(() => {
    //     const subscribeToVotes = async () => {
    //         if (wakuNode == null) {
    //             console.log("Waku node not stared")
    //             return
    //         }
    //         console.log("Poll: Listening for votes");
    //         await retrieveExistingVotes(wakuNode, ["tech"]);
    //         await subscribeToIncomingBlogs(wakuNode, ["tech"]);
    //     };

    //     subscribeToVotes();
    // }, [wakuNode])

    return (
        <main className="flex justify-center items-center h-screen">
            <div className='max-w-[400px]'>
                {/* <Input type='file' onChange={(e) => setFiles(e.target.files)} />
                <Input type="text" placeholder="Topic" ref={topic} />
                <Button onClick={handleSend}>
                    Upload
                </Button>
                <Button onClick={() => retrieveExistingVotes(wakuNode as LightNode, ["tech"])}>
                    Retrive
                </Button>
                <Button onClick={() => subscribeToIncomingBlogs(wakuNode as LightNode, ["tech"])}>
                    test
                </Button> */}
            </div>
        </main>
    )
}
