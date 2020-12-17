// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.0;

import "hardhat/console.sol";

import "./dependencies/holyzeppelin/contracts/access/Ownable.sol";
import "./dependencies/holyzeppelin/contracts/math/SafeMath.sol";
import "./dependencies/holyzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20Burnable, Ownable {

    using SafeMath for uint256;
    
    constructor () ERC20( "TestToken", "TT", 18 ) {
        console.log("TestToken::constructor: Instantiating TestToken");
        console.log("TestToken::constructor: Instantiated TestToken");
    }

    function mint(uint256 amount_) public virtual onlyOwner() {
        console.log("TestToken::mint: Minting %s JANUS tokens to %s.", amount_, owner());
        _mint(owner(), amount_);
        console.log("TestToken::mint:Minted %s JANUS tokens to %s.", amount_, owner());
    }
}