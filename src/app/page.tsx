"use client"
import FeedCard from "@/components/feed-card";
import FeedCardSkeleton from "@/components/feed-card-skeleton";
import { ABI, CONTRACT_ADDRESS } from "@/lib/const";
import { pushIfNotPresent } from "@/lib/helper";
import { BlogData, Channel, IBlogData, Post } from "@/lib/types";
import { createNode } from "@/lib/waku";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DecodedMessage, LightNode, createDecoder } from "@waku/sdk";
import { BigNumber, ethers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {

  const account = useAccount()
  const [wakuNode, setWakuNode] = useState<LightNode | null>(null);
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (wakuNode) return;

    (async () => {
      console.log("starting node");
      const node = await createNode();
      console.log("node started");
      setWakuNode(node);
    })();
  }, [wakuNode]);



  const subscribeToVotes = async () => {
    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum as ethers.providers.ExternalProvider)

    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    console.log({ contract })
    let data = await contract.getChannelsBySubscriber(account.address)

    if (wakuNode == null) {
      console.log("Waku node not stared")
      return
    }

    let channelIds: string[] = data.map((channel: Channel) => Number(channel.channelId).toString());
    console.log({ channelIds })

    await retrieveExistingVotes(wakuNode, channelIds);
    await subscribeToIncomingBlogs(wakuNode, channelIds);
  };


  const subscribeToIncomingBlogs = async (
    node: LightNode,
    topics: string[]
    // callback: any
  ) => {

    for (const topic of topics) {
      const contentTopic = "/waku-hh-podcast-sub/channel/" + topic;

      const decoder = createDecoder(contentTopic);
      console.log("subscribing to incoming blogs for topic", topic);

      const _callback = (blogMessage: DecodedMessage): void => {
        console.log(blogMessage);
        if (!blogMessage.payload) return;
        const pollMessageObj = BlogData.decode(blogMessage.payload);
        const pollMessage = pollMessageObj.toJSON() as IBlogData;
        let tempPost = posts
        tempPost.push(pollMessage)
        // tempPost = pushIfNotPresent(tempPost, pollMessage)
        setPosts([...tempPost])
        console.log("decoded ", pollMessage);
        // You can invoke the callback function if needed
        // callback(pollMessage);
      };
      // Create a filter subscription
      const subscription = await node.filter.createSubscription();

      // Subscribe to content topics and process new messages
      let message = await subscription.subscribe([decoder], _callback);
      console.log("message", message);
    }


  };


  const retrieveExistingVotes = async (
    waku: LightNode,
    topics: string[]
    // callback: (pollMessage: IBlogData) => void,
  ) => {
    for (const topic of topics) {
      const contentTopic = "/waku-hh-podcast-sub/channel/" + topic;

      const decoder = createDecoder(contentTopic);
      const _callback = (wakuMessage: DecodedMessage): void => {
        if (!wakuMessage.payload) return;
        const pollMessageObj = BlogData.decode(wakuMessage.payload);
        const pollMessage = pollMessageObj.toJSON() as IBlogData;
        console.log("decoded ", pollMessage);
        let tempPost = posts
        tempPost = pushIfNotPresent(tempPost, pollMessage)
        setPosts([...tempPost])
        // callback(pollMessage);
      };
      // Query the Store peer
      let result = await waku.store.queryWithOrderedCallback([decoder], _callback);
      console.log("result", result);
    }
  };

  useEffect(() => {
    subscribeToVotes();
  }, [wakuNode])


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
          posts.map((item, index) => (
            <FeedCard
              title={item.title}
              description={item.description}
              image={item.image}
              key={index} />
          ))
        }
      </div>
    </div>

  )
}