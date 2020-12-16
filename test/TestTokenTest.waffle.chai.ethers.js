const { expect } = require("chai");
const { ethers } = require("hardhat");

describe(
    "Gemini/Janus contract waffle/chai/ethers test",
    function () {

        // Wallets
        let deployer;
        let buyer1;

        // Contracts
        let JanusContract;
        let janus;

        beforeEach(
            async function () {
                [
                    deployer,
                    buyer1
                ] = await ethers.getSigners();

                TestTokenContract = await ethers.getContractFactory("TestToken");
                //Add check for events
                tt = await JanusContract.connect( deployer ).deploy();
            }
        );

        describe(
            "JanusDeployment",
            function () {
                it( 
                    "DeploymentSuccess", 
                    async function() {
                        // expect( await eris.hasRole( eris.DEFAULT_ADMIN_ROLE(), deployer.address ) ).to.equal( true );
                        console.log("Test::JanusDeployment::DeploymentSuccess: token name.");
                        expect( await tt.name() ).to.equal("TestToken");
                        console.log("Test::JanusDeployment::DeploymentSuccess: token symbol.");
                        expect( await tt.symbol() ).to.equal("TT");
                        console.log("Test::JanusDeployment::DeploymentSuccess: token decimals.");
                        expect( await tt.decimals() ).to.equal(18);
                        console.log("Test::JanusDeployment::DeploymentSuccess: owner.");
                        expect( await tt.owner() ).to.equal(deployer.address);
                        console.log("Test::JanusDeployment::DeploymentSuccess: totalSupply.");
                        expect( await tt.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 0 ), "ether" ) );
                        console.log("Test::JanusDeployment::DeploymentSuccess: owner balanceOf.");
                        expect( await tt.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
                    }
                );

                it( 
                    "Minting", 
                    async function() {
                        console.log("Test::JanusOwnership::Minting: totalSupply.");
                        expect( await tt.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 0 ), "ether" ) );
                        console.log("Test::JanusOwnership::Minting: owner balanceOf.");
                        expect( await tt.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 0 ), "ether" ) ) );
                        console.log("Test::JanusOwnership::Minting: buyer1 can't mint.");
                        await expect( tt.connect(buyer1).mint(ethers.utils.parseUnits( String( 10000 ), "ether" )) ).to.be.revertedWith("Ownable: caller is not the owner");
                        console.log("Test::JanusOwnership::Minting: only owner can mint.");
                        await tt.connect(deployer).mint(ethers.utils.parseUnits( String( 10000 ), "ether" ));
                        console.log("Test::JanusOwnership::Minting: totalSupply.");
                        expect( await tt.totalSupply() ).to.equal( ethers.utils.parseUnits( String( 10000 ), "ether" ) );
                        console.log("Test::JanusOwnership::Minting: owner balanceOf.");
                        expect( await tt.connect(deployer).balanceOf(deployer.address) ).to.equal( String( ethers.utils.parseUnits( String( 10000 ), "ether" ) ) );
                    }
                );
            }
        );
    }
);