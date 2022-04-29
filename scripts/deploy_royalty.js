// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const DarkForest_Royalty = await hre.ethers.getContractFactory("Royalties");
//   const roaylty_df_contract = await DarkForest_Royalty.deploy("0xd00ae08403b9bbb9124bb305c09058e32c39a48c", "0x6a0F6b1269660C991B11356E3907e16E526632ad", "0x0922830F62051072a8B4047466925BF96436f9c5",5000);
  const roaylty_df_contract = await DarkForest_Royalty.deploy("0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7", "0x0922830F62051072a8B4047466925BF96436f9c5", "0x5F63d1eE0Bbe104ae96029e5E4A4D874731067dd",5000);

  await roaylty_df_contract.deployed();

  console.log("DarkForestRoyaltyContract deployed to:", roaylty_df_contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
