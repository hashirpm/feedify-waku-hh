'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Input } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { storeFiles } from '@/lib/helper'
import { LightNode } from '@waku/sdk'
import { createNode, retrieveExistingVotes, sendBlog, subscribeToIncomingBlogs } from '@/lib/waku'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [files, setFiles] = useState<any>()

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

  const handleSend = async () => {
    if (wakuNode == null) {
      console.log("Waku node not stared")
      return
    }
    let link = await storeFiles(files)
    let wakuRes = await sendBlog(wakuNode, { ipfsHash: link })
    console.log({ wakuRes })
  }

  useEffect(() => {
    const subscribeToVotes = async () => {
      if (wakuNode == null) {
        console.log("Waku node not stared")
        return
      }
      console.log("Poll: Listening for votes");
      await retrieveExistingVotes(wakuNode);
      await subscribeToIncomingBlogs(wakuNode);
    };

    subscribeToVotes();
  }, [])

  return (
    <main className="flex justify-center items-center h-screen">
      <div className='max-w-[400px]'>
        <Input type='file' onChange={(e) => setFiles(e.target.files)} />
        <Button onClick={handleSend}>
          Upload
        </Button>
        <Button onClick={() => retrieveExistingVotes(wakuNode as LightNode)}>
          Retrive
        </Button>
        <Button onClick={() => subscribeToIncomingBlogs(wakuNode as LightNode)}>
          test
        </Button>
      </div>
    </main>
  )
}
