//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract VeganToken is ERC20 {
    uint constant _initial_supply = 100 * (10**18);
    constructor() ERC20("VeganToken", "VEG") {
        _mint(msg.sender, _initial_supply);
    }
}