import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../public/feedify-logo.png";

export default function Navbar() {

    const router = useRouter()


    return (
        <div className="px-4 my-6">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
                <Image src={Logo} alt="" className="w-[150px]" />
                <ConnectButton />
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
                <Button onClick={() => router.push('/')}>
                    Feed
                </Button>
                <Button onClick={() => router.push('/channels')}>
                    Channels
                </Button>
                <Button onClick={() => router.push('/my-channels')}>
                    My Channels
                </Button>
            </div>
        </div>
    )
}