import ChannelCard from "@/components/channel-card";
import ChannelCardSkeleton from "@/components/channel-card-skeleton";

export default function Channels() {
    return (
        <div className="px-4">

            <div className="grid grid-cols-5 gap-4">
                {
                    [1, 1, 1, 1].map(() => (
                        <ChannelCardSkeleton />
                    ))
                }
            </div>

        </div>
    )
}