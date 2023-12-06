'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { storeFiles } from '@/lib/helper'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [files, setFiles] = useState<any>()

  return (
    <main className="flex justify-center items-center h-screen">
      <div className='max-w-[400px]'>
        <Input type='file' onChange={(e) => setFiles(e.target.files)} />
        <Button onClick={() => storeFiles(files)}>
          Upload
        </Button>
      </div>
    </main>
  )
}
