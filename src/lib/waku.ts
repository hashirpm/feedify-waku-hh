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
// Choose a content topic
const contentTopic = "/light-guide/1/message/proto";

// Create a message encoder and decoder
const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

export const createNode = async () => {
  // Create and start a Light Node
  const node = await createLightNode({ defaultBootstrap: true });
  await node.start();
  await waitForRemotePeer(node, [Protocols.LightPush, Protocols.Filter]); // check if 2nd params is required
  return node;
};

export const subscribeToIncomingBlogs = async (
  node: LightNode,
  callback: any
) => {
  const _callback = (blogMessage: DecodedMessage) => {
    if (!blogMessage.payload) return;
    const blogMessageObj = BlogData.decode(blogMessage.payload);
    console.log("decoded ", blogMessage);
  };

  // Create a filter subscription
  const subscription = await node.filter.createSubscription();

  // Subscribe to content topics and process new messages
  await subscription.subscribe([decoder], _callback);
};

export const sendBlog = async (node: LightNode, newBlog: IBlogData) => {
  const blogMessage = BlogData.create(newBlog);
  // Serialise the message using Protobuf
  const serialisedMessage = BlogData.encode(blogMessage).finish();

  // Send the message using Light Push
  await node.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};
