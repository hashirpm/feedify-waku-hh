"use client"
import ChannelCard from "@/components/channel-card";
import ChannelCardSkeleton from "@/components/channel-card-skeleton";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { Channel } from "@/lib/types";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

export default function Channels() {

    const [channels, setChannels] = useState<Channel[]>([])

    const getAllChannels = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })
        let data = await contract.getAllChannels()
        setChannels(data)

        console.log({ data })
    }

    useEffect(() => {
        getAllChannels()
    }, [])

    return (
        <div className="px-4">
            <div className="grid grid-cols-5 gap-4">
                {
                    channels.length > 0 ?
                        channels.map((item, index) => (
                            <ChannelCard
                                name={item.name}
                                description={item.description}
                                logoUrl={item.logoUrl}
                                subscriptionAmount={item.subscriptionAmount}
                                channelId={item.channelId}
                                owner={item.owner}
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
    )
}