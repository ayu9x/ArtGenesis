// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Treasury
 * @dev Stores protocol fees generated from the Marketplace and Auctions.
 */
contract Treasury is Ownable {
    event FundsReceived(address indexed from, uint256 amount);
    event FundsWithdrawn(address indexed to, uint256 amount);

    constructor() Ownable(msg.sender) {}

    // Allow the contract to receive ETH
    receive() external payable {
        emit FundsReceived(msg.sender, msg.value);
    }

    /**
     * @dev Withdraws all ETH to the specified address. Only callable by the owner.
     * @param to The address to send the funds to.
     */
    function withdraw(address payable to) external onlyOwner {
        require(to != address(0), "Cannot withdraw to zero address");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");

        (bool success, ) = to.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit FundsWithdrawn(to, balance);
    }

    /**
     * @dev Withdraws a specific amount of ETH. Only callable by the owner.
     * @param to The address to send the funds to.
     * @param amount The amount to withdraw.
     */
    function withdrawAmount(address payable to, uint256 amount) external onlyOwner {
        require(to != address(0), "Cannot withdraw to zero address");
        require(amount <= address(this).balance, "Insufficient funds");

        (bool success, ) = to.call{value: amount}("");
        require(success, "Withdrawal failed");

        emit FundsWithdrawn(to, amount);
    }
}
