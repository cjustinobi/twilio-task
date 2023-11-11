// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const fs = require("fs");
const hre = require("hardhat");

async function main() {
  

  const eventHub = await hre.ethers.deployContract("EventHub");

  await eventHub.waitForDeployment();
  const contractAddress = await eventHub.getAddress()
  console.log(
    `deployed contract: ${contractAddress}`
  );

  const envFilePath = "../utils/interact.ts"; // Adjust the path as needed

  try {
    // Read the contents of the .env file
    const envFileContent = await fs.readFile(envFilePath, 'utf-8');

    // Split the contents into an array of lines
    const lines = envFileContent.split('\n');

    // Insert the contract address at line 2
    lines.splice(2, 0, `NEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);

    // Join the lines back into a string
    const updatedEnvFileContent = lines.join('\n');

    // Write the updated contents back to the .env file
    await fs.writeFile(envFilePath, updatedEnvFileContent);

    console.log(`Contract address appended to ${envFilePath}`);
  } catch (error) {
    console.error('Error appending contract address to .env:', error);
    process.exitCode = 1;
  }

  // fs.appendFileSync(envFilePath, `\nNEXT_PUBLIC_CONTRACT_ADDRESS=${contractAddress}`);
  // console.log(`Contract address appended to ${envFilePath}`);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
