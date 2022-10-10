var Web3 = require("web3");
var GOERLI_WEBSOCKET =
  "wss://goerli.infura.io/ws/v3/0440eed3a40a408a9abc99b6b0d481a1";

// FOR POLYGON UNCOMMENT THE BELOW WEBSOCKET
//POLYGON_WEBSOCKET =  "wss://polygon-mumbai.g.alchemy.com/v2/_6FXWiF9w1gdPY1pwKiK7tszKzc93iAo";

var web3 = new Web3(new Web3.providers.WebsocketProvider(GOERLI_WEBSOCKET));
const account = "0x7f6cf07F0BAc59391849A08B699FC61a98371e45".toLowerCase();
const subscription = web3.eth.subscribe("pendingTransactions", (err, res) => {
  if (err) console.error(err);
});
subscription.on("data", (txHash) => {
  setTimeout(async () => {
    try {
      let tx = await web3.eth.getTransaction(txHash);
      if (tx && tx.to) {
        if (tx.to.toLowerCase() === account) {
          console.log("TX hash: ", txHash);
          console.log("TX nonce: ", tx.nonce);
          console.log("TX sender address: ", tx.from);
          console.log("TX Receiver address: ", tx.to);
          console.log(
            "TX amount(in Ether): ",
            web3.utils.fromWei(tx.value, "ether")
          );
          console.log("TX date: ", new Date());
          console.log("Transaction done Successfully");
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
});
