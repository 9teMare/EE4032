async function main() {
    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    const campaign_factory = await CampaignFactory.deploy({
        value: ethers.utils.parseEther("0.1"),
    });
    await campaign_factory.deployed();

    console.log("Contract Deployed to Address:", campaign_factory.address);

    const Reputation = await ethers.getContractFactory("Reputation");
    const reputation = await Reputation.deploy(campaign_factory.address);
    await campaign_factory.deployed();
    console.log("Contract Deployed to Address:", reputation.address);

    await campaign_factory.setReputationAddress(reputation.address);
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
