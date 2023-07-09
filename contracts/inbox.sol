// SPDX-License-Identifier: MIT
pragma solidity ^0.4.26;

contract Inbox {
    string public message;

    // function Inbox(string initialMessage) public {
    //     message = initialMessage;
    // }

    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

}