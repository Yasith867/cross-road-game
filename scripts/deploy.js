async function main() {
  const Scoreboard = await ethers.getContractFactory("Scoreboard");
  const scoreboard = await Scoreboard.deploy();
  await scoreboard.waitForDeployment();
  const address = await scoreboard.getAddress();
  console.log("Scoreboard deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
