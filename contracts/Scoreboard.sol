// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Scoreboard {
    mapping(address => uint256) public highScores;
    event ScoreSubmitted(address indexed player, uint256 score);

    function submitScore(address player, uint256 score) external {
        if (score > highScores[player]) {
            highScores[player] = score;
            emit ScoreSubmitted(player, score);
        }
    }
}
