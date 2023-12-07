// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChannelSubscription {
    // Struct to represent a channel
    struct Channel {
        uint256 channelId;
        string name;
        string description;
        string logoUrl;
        address owner;
        uint256 subscriptionAmount;
        uint256 totalSubscriptions;
        uint256 earnings;
    }

    // Array to store all channels
    Channel[] public channels;

    // Mapping to track channels owned by each address
    mapping(address => uint256[]) private channelsByOwner;

    // Mapping to track channels subscribed by each address
    mapping(address => uint256[]) private channelsBySubscriber;

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
        string memory _logoUrl
    ) external {
        uint256 channelId = channels.length;

        Channel memory newChannel = Channel({
            channelId: channelId,
            name: _name,
            description: _description,
            logoUrl: _logoUrl,
            owner: msg.sender,
            subscriptionAmount: _subscriptionAmount,
            totalSubscriptions: 0,
            earnings: 0
        });

        channels.push(newChannel);
        channelsByOwner[msg.sender].push(channelId);

        emit ChannelCreated(channelId, _name, msg.sender);
    }

    // Function to get channels owned by a specific address
    function getChannelsByOwner(
        address _owner
    ) external view returns (uint256[] memory) {
        return channelsByOwner[_owner];
    }

    // Function to get channels subscribed by a specific address
    function getChannelsBySubscriber(
        address _subscriber
    ) external view returns (uint256[] memory) {
        return channelsBySubscriber[_subscriber];
    }

    // Function to subscribe to a channel
    function subscribeChannel(uint256 _channelId) external payable {
        require(_channelId < channels.length, "Channel does not exist");

        Channel storage channel = channels[_channelId];

        require(
            msg.value < channel.subscriptionAmount,
            "Incorrect subscription amount"
        );

        // Update channel data
        channel.totalSubscriptions++;
        channel.earnings += msg.value;

        // Emit event
        emit ChannelSubscribed(_channelId, msg.sender);
    }
}
