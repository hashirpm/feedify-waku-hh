import { Web3Storage } from "web3.storage";
import { ethers, utils } from "ethers";
import { ABI, CONTRACT_ADDRESS } from "./const";

let provider;
let contract: ethers.Contract;
let signer: string | ethers.providers.Provider | ethers.Signer;

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return process.env.WEB3_STORAGE_KEY as string;
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

export async function storeFiles(files: any) {
  console.log({ files });
  console.log("uplaod started...");
  const client = makeStorageClient();
  const cid = await client.put(files);
  console.log("stored files with cid:", cid);
  console.log(`https://ipfs.io/ipfs/${cid}/${files[0].name}`);
  return `https://ipfs.io/ipfs/${cid}/${files[0].name}`;
}

// Check if the code is running in the browser context
if (typeof window !== "undefined") {
  // This code only runs in the browser
  // Use the window.ethereum provider
  //@ts-ignore
  provider = new ethers.providers.Web3Provider(
    //@ts-ignore
    window.ethereum as ethers.providers.ExternalProvider
  );

  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  // Get the signer from the provider
  signer = provider.getSigner();
  console.log({ signer });
  console.log({ contract });
}

export const createChannel = async (
  channelName: string,
  channelDescription: string,
  subscriptionAmount: Number
) => {
  try {
    await contract
      .connect(signer)
      .createChannel(channelName, channelDescription, subscriptionAmount)
      .then(async (res: any) => {
        await res.wait();
      });
    return { status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};

export const getChannelsByOwner = async (owner: string) => {
  try {
    const channelDetails = await contract.getChannelsByOwner(owner);

    return { channels: channelDetails, status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};
export const getChannelsBySubsciber = async (user: string) => {
  try {
    const channelDetails = await contract.getChannelsBySubscriber(user);

    return { channels: channelDetails, status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};
export const subscribeChannel = async (channelId: Number, amount: string) => {
  try {
    await contract
      .connect(signer)
      .subscribeChannel(channelId, { value: utils.parseEther(amount) })
      .then(async (res: any) => {
        await res.wait();
      });
    return { status: true };
  } catch (err: any) {
    console.log(err);
    return { status: false };
  }
};


export function pushIfNotPresent<T>(arr: T[], obj: T): T[] {
  if (!arr.includes(obj)) {
    arr.push(obj);
  }
  return arr
}