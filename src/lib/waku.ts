"use client";

import {
  createLightNode,
  createEncoder,
  createDecoder,
  waitForRemotePeer,
  Protocols,
  LightNode,
  DecodedMessage,
} from "@waku/sdk";

import { IBlogData, BlogData } from "./types";

export const createNode = async () => {
  // Create and start a Light Node
  const node = await createLightNode({ defaultBootstrap: true });
  await waitForRemotePeer(node); // check if 2nd params is required
  return node;
};

export const subscribeToIncomingBlogs = async (
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

export const sendBlog = async (
  node: LightNode,
  newBlog: IBlogData,
  contentTopic: string
) => {
  // Choose a content topic
  // const contentTopic = "/waku-hh-podcast-sub/0/" + topic;

  // Create a message encoder and decoder
  const encoder = createEncoder({ contentTopic });
  console.log({ contentTopic })
  const blogMessage = BlogData.create(newBlog);
  console.log("blogMessage", blogMessage);
  // Serialise the message using Protobuf
  const serialisedMessage = BlogData.encode(blogMessage).finish();
  console.log("serialisedMessage", serialisedMessage);

  // Send the message using Light Push
  await node.lightPush
    .send(encoder, {
      payload: serialisedMessage,
    })
    .then((res) => console.log(res));
};

export const retrieveExistingVotes = async (
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
      // callback(pollMessage);
    };
    // Query the Store peer
    let result = await waku.store.queryWithOrderedCallback([decoder], _callback);
    console.log("result", result);
  }
};