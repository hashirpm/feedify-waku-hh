// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChannelSubscription {
    // Struct to represent a channel
    struct Channel {
        uint256 channelId;
        string name;
        string description;
        string logoUrl;
        address payable owner;
        uint256 subscriptionAmount;
        uint256 totalSubscriptions;
        uint256 earnings;
    }

    // Array to store all channels
    Channel[] public channels;


    // Mapping to track channels subscribed by each address
    mapping(address => Channel[]) private channelsBySubscriber;

    // Event triggered when a new channel is created
    event ChannelCreated(
        uint256 indexed channelId,
        string name,
        address indexed owner
    );

    // Event triggered when a channel is subscribed
    event ChannelSubscribed(
        uint256 indexed channelId,
        address indexed subscriber
    );

    // Function to create a new channel
    function createChannel(
        string memory _name,
        string memory _description,
        uint256 _subscriptionAmount,
        string memory _logoUrl,
        address payable _owner
    ) external {
        uint256 channelId = channels.length;

        Channel memory newChannel = Channel({
            channelId: channelId,
            name: _name,
            description: _description,
            logoUrl: _logoUrl,
            owner: _owner,
            subscriptionAmount: _subscriptionAmount,
            totalSubscriptions: 0,
            earnings: 0
        });

        channels.push(newChannel);

        emit ChannelCreated(channelId, _name, msg.sender);
    }

   
// Function to get channels owned by a specific address
    function getChannelsByOwner(address _owner)
        external
        view
        returns (Channel[] memory)
    {
        Channel[] memory ownerChannels = new Channel[](channels.length);
        uint256 count = 0;

        for (uint256 i = 0; i < channels.length; i++) {
            if (channels[i].owner == _owner) {
                ownerChannels[count] = channels[i];
                count++;
            }
        }

        // Resize the array to remove any empty slots
        assembly {
            mstore(ownerChannels, count)
        }

        return ownerChannels;
    }
    
    // Function to get channels subscribed by a specific address
    function getChannelsBySubscriber(
        address _subscriber
    ) external view returns (Channel[] memory) {
        return channelsBySubscriber[_subscriber];
    }

    // Function to subscribe to a channel
    function subscribeChannel(uint256 _channelId) external payable {
        require(_channelId < channels.length, "Channel does not exist");

        Channel storage channel = channels[_channelId];

        require(
            msg.value > channel.subscriptionAmount,
            "Incorrect subscription amount"
        );

        channel.owner.transfer(channel.subscriptionAmount);

        // Update channel data
        channel.totalSubscriptions++;
        channel.earnings += msg.value;

        channels[_channelId]=channel;

        channelsBySubscriber[msg.sender].push(channel);
        

        // Emit event
        emit ChannelSubscribed(_channelId, msg.sender);
    }

    // Function to get details for all channels
    function getAllChannels() external view returns (Channel[] memory) {
        return channels;
    }
}
