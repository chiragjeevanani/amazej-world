// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {USDTMock} from "../contracts/USDTMock.sol";
import {AMZToken} from "../contracts/AMAToken.sol";
import {VIPModule} from "../contracts/VIPModule.sol";

contract CounterScript is Script {
    USDTMock public USDTMockD;
    AMZToken public AMZTokenD;
    VIPModule public VIPModuleD;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        USDTMockD = new USDTMock("USDT", "USDT", 18);
        AMZTokenD = new AMZToken(address(USDTMockD), address(0x4Ad03A48A12CD5B641E94dCCC62e9C9140A7F07A));
        VIPModuleD = new VIPModule(address(AMZTokenD));

        vm.stopBroadcast();
    }
}
