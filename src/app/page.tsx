"use client"
import FeedCard from "@/components/feed-card";
import FeedCardSkeleton from "@/components/feed-card-skeleton";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { createNode, retrieveExistingVotes, subscribeToIncomingBlogs } from "@/lib/waku";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LightNode } from "@waku/sdk";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {

  const account = useAccount()
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

  if (!account) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ConnectButton />
      </div>
    )
  }

  const subscribeToVotes = async () => {
    if (wakuNode == null) {
      console.log("Waku node not stared")
      return
    }
    console.log("Poll: Listening for votes");
    await retrieveExistingVotes(wakuNode, ["tech"]);
    await subscribeToIncomingBlogs(wakuNode, ["tech"]);
  };

  const getChannelsBySubscriber = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    console.log({ contract })
    let data = await contract.getChannelsBySubscriber(account.address)
    console.log({ data })
  }

  useEffect(() => {
    getChannelsBySubscriber()
    // subscribeToVotes();
  }, [wakuNode])

  return (
    <div className="px-4 max-w-screen-xl mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {
          [1, 1, 1, 1, 1, 1].map((item, index) => (
            <FeedCardSkeleton key={index} />
          ))
        }
      </div>
    </div>

  )
}