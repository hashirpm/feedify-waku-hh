import { Web3Storage } from 'web3.storage'


function getAccessToken() {
    // If you're just testing, you can paste in a token
    // and uncomment the following line:
    // return 'paste-your-token-here'

    // In a real app, it's better to read an access token from an
    // environement variable or other configuration that's kept outside of
    // your code base. For this to work, you need to set the
    // WEB3STORAGE_TOKEN environment variable before you run your code.
    return process.env.WEB3_STORAGE_KEY as string
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

export async function storeFiles(files: any) {
    console.log({ files })
    console.log("uplaod started...")
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    console.log(`https://ipfs.io/ipfs/${cid}/${files[0].name}`)
    return `https://ipfs.io/ipfs/${cid}/${files[0].name}`
}
