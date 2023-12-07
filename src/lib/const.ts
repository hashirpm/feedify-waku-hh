export const CONTRACT_ADDRESS = "0x324C9A3De118E72896427Bb8Fe4bAA602e08641B"

export const ABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "channelId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            }
        ],
        "name": "ChannelCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "channelId",
                "type": "uint256"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "subscriber",
                "type": "address"
            }
        ],
        "name": "ChannelSubscribed",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "channels",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "channelId",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "description",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "logoUrl",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subscriptionAmount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "totalSubscriptions",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "earnings",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_description",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_subscriptionAmount",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_logoUrl",
                "type": "string"
            }
        ],
        "name": "createChannel",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getChannelsByOwner",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_subscriber",
                "type": "address"
            }
        ],
        "name": "getChannelsBySubscriber",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_channelId",
                "type": "uint256"
            }
        ],
        "name": "subscribeChannel",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]