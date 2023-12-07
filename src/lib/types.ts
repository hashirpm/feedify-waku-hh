import { BigNumber } from "ethers";
import protobuf from "protobufjs";

export interface IBlogData {
  ipfsHash: string;
}

// Create a message structure using Protobuf
export const BlogData = new protobuf.Type("BlogData").add(
  new protobuf.Field("ipfsHash", 1, "string")
);


export type Channel = {
  name: string;
  description: string;
  subscriptionAmount: BigNumber
  logoUrl: string
  channelId: BigNumber
}