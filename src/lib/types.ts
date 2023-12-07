import { BigNumber } from "ethers";
import protobuf from "protobufjs";

export interface IBlogData {
  title: string;
  description: string;
  image: string;
}

// Create a message structure using Protobuf
export const BlogData = new protobuf.Type("BlogData")
  .add(new protobuf.Field("title", 1, "string"))
  .add(new protobuf.Field("description", 2, "string"))
  .add(new protobuf.Field("image", 3, "string"));;


export type Channel = {
  name: string;
  description: string;
  subscriptionAmount: BigNumber
  logoUrl: string
  channelId: BigNumber
  owner: string
}

export type MyChannel = {
  name: string;
  description: string;
  subscriptionAmount: BigNumber
  logoUrl: string
  channelId: BigNumber
  owner: string
  earnings: BigNumber
  totalSubscriptions: BigNumber
}

export type Post = {
  title: string,
  description: string
  image: string
}