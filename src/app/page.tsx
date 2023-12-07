"use client"
import FeedCard from "@/components/feed-card";
import FeedCardSkeleton from "@/components/feed-card-skeleton";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

export default function Home() {

  const account = useAccount()

  if (!account) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ConnectButton />
      </div>
    )
  }

  return (
    <div className="px-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {
          [1, 1, 1, 1, 1, 1].map(() => (
            <FeedCardSkeleton />
          ))
        }
      </div>
    </div>

  )
}