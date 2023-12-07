"use client"
import ChannelCard from "@/components/channel-card";
import ChannelCardSkeleton from "@/components/channel-card-skeleton";
import { CONTRACT_ADDRESS } from "@/const/value";
import { ABI } from "@/lib/const";
import { Button } from "@chakra-ui/react";
import { ethers } from "ethers";

export default function Channels() {

    const getAllChannels = async () => {
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
        console.log({ contract })

        //@ts-ignore
        // await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Get the signer from the provider
        // Create a transaction object for the mint function
        let data = await contract.getChannelsByOwner("0x06C41df2358deD2Fd891522f9Da75eca2150c10B")
        console.log({ data })
    }



    return (
        <div className="px-4">
            <Button onClick={getAllChannels}>Get All Channels</Button>
            <div className="grid grid-cols-5 gap-4">
                {
                    [1, 1, 1, 1].map((item, index) => (
                        <ChannelCardSkeleton key={index} />
                    ))
                }
            </div>

        </div>
    )
}