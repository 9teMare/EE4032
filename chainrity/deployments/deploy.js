async function main() {
    const Chainrity = await ethers.getContractFactory("Chainrity");
    const chainrity_instance = await Chainrity.deploy();
    console.log("Contract Deployed to Address:", chainrity_instance.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
