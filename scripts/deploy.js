// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Use the provider associated with the signer to get the balance
  const weiAmount = (await deployer.provider.getBalance(deployer.address));

  console.log("Account balance:", hre.ethers.formatEther(weiAmount));

  const Token = await hre.ethers.getContractFactory("VeganToken");
  const token = await Token.deploy();
  // const totalSupplyInWei = await token.totalSupply();
  // console.log("Raw totalSupply:", totalSupplyInWei.toHexString());
  console.log("Token address:", token.target);
  //console.log("Token totalSupply :", hre.ethers.formatEther(totalSupplyInWei), "VEG");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

