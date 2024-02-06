// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { parseEther } = require("ethers");
const hre = require("hardhat");

async function main() {
  const [user]                  = await hre.ethers.getSigners();
  const BucketAddress           = "0x873289a1aD6Cf024B927bd13bd183B264d274c68";
  const goerli_veganToken       = "0x3dE01170b468353EB3c68971C6773CA816B128DF";
  const BucketContract          = await hre.ethers.getContractAt("Bucket", BucketAddress);
  const VeganTokenContract      = await hre.ethers.getContractAt("VeganToken", goerli_veganToken);
  const bucketaddressforapprove = await BucketContract.getAddress();
  const goerli_veganTokentodrop = await VeganTokenContract.getAddress();
  
  // Signers Infos
  console.log("Signer account:", user.address);
  console.log("Signer Account balance GoerliETH:", hre.ethers.formatEther(await user.provider.getBalance(user.address)));
  console.log("Signer Account balance VEG:", hre.ethers.formatEther(await VeganTokenContract.balanceOf(user.address)));
  
  // Contracts Infos
  console.log("BucketContract @", bucketaddressforapprove);
  console.log("VeganTokenContract @", goerli_veganTokentodrop);
  
  console.log("-= AVANT ALLOWANCE =-");
  console.log("Allowance :", hre.ethers.formatEther(await VeganTokenContract.connect(user).allowance(user.address, bucketaddressforapprove)));
  console.log("Signer balance VEG :", hre.ethers.formatEther(await VeganTokenContract.balanceOf(user.address)));
  
  await VeganTokenContract.connect(user).approve(bucketaddressforapprove, parseEther("0.01"));
  let blockNumber = await user.provider.getBlockNumber();
  while(blockNumber == await user.provider.getBlockNumber());
  
  console.log("-= APRES ALLOWANCE =- (avant DROP)");
  console.log("Allowance :", hre.ethers.formatEther(await VeganTokenContract.connect(user).allowance(user.address, bucketaddressforapprove)));
  console.log("Signer balance VEG :", hre.ethers.formatEther(await VeganTokenContract.balanceOf(user.address)));
  
  await BucketContract.connect(user).drop(goerli_veganTokentodrop, parseEther("0.01"));
  blockNumber = await user.provider.getBlockNumber();
  while(blockNumber == await user.provider.getBlockNumber());

  console.log("-= APRES DROP =-");
  console.log("Allowance :", hre.ethers.formatEther(await VeganTokenContract.connect(user).allowance(user.address, bucketaddressforapprove)));  console.log("Signer balance VEG :", hre.ethers.formatEther(await VeganTokenContract.balanceOf(user.address)));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});

