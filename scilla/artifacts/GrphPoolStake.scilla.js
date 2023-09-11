const {Zilliqa} = require("@zilliqa-js/zilliqa");
const {readFileSync} = require("fs");
const {units, Long, BN} = require("@zilliqa-js/util");  
const {resolve} = require("path");          
function contract({privateKey, api, version, net, contractAddress}) {
  let zilliqa = new Zilliqa(api);
  zilliqa.wallet.addByPrivateKey(privateKey);
  const code = readFileSync(resolve(process.cwd(), "scilla/contracts", "GrphPoolStake.scilla"), "utf8");
  let initParams = [{"vname":"contract_owner","type":"ByStr20"},{"vname":"proxy","type":"ByStr20"},{"vname":"reward_token","type":"ByStr20"},{"vname":"token_multiplier","type":"Uint128"},{"vname":"is_mint","type":"Bool"},{"vname":"is_zil","type":"Bool"}];
  let myAddress = contractAddress;
  return {
    init({privateKey, address}) {
      myAddress = address;
      if(privateKey) {
          zilliqa = new Zilliqa(api);
          zilliqa.wallet.addByPrivateKey(privateKey);
      }
    },
    replacePrivateKey(privateKey) {
         zilliqa = new Zilliqa(api);
         zilliqa.wallet.addByPrivateKey(privateKey);
    },
    getContractAddress() {
        return myAddress;
    },
    async deploy(contract_owner, proxy, reward_token, token_multiplier, is_mint, is_zil, gasLimit = 60000) {
        const args = arguments;
        initParams = initParams.filter(({vname}) => vname !== "_scilla_version").map((param, index) => {
            param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        initParams.push({
            vname: '_scilla_version',
            type: 'Uint32',
            value: '0',
        });
        const zilliqaContract = zilliqa.contracts.new(code, initParams);
        const [deployTx, deployedContract] = await zilliqaContract.deployWithoutConfirm({
            version,
            gasPrice: units.toQa('3500', units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        }, net === "Main");
        const confirmedTxn = await deployTx.confirm(deployTx.id);
        if (confirmedTxn.receipt.success === true) {
            myAddress = "0x" + deployedContract.address;
            return this;
        } else {
            throw new Error("something went wrong by contract deployment with txId: 0x" + deployTx.id);
        }
    },
    async Init(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async Add(account, balance, totalSupply, rewardRate, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"},{"vname":"balance","type":"Uint128"},{"vname":"totalSupply","type":"Uint128"},{"vname":"rewardRate","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async Remove(account, balance, totalSupply, rewardRate, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"},{"vname":"balance","type":"Uint128"},{"vname":"totalSupply","type":"Uint128"},{"vname":"rewardRate","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async Reward(account, balance, totalSupply, rewardRate, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"account","type":"ByStr20"},{"vname":"balance","type":"Uint128"},{"vname":"totalSupply","type":"Uint128"},{"vname":"rewardRate","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RequestOwnershipTransfer(new_owner, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"new_owner","type":"ByStr20"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async ConfirmOwnershipTransfer(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async AddFunds(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async CloseRewards(gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async MintSuccessCallBack(minter, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"minter","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RecipientAcceptTransfer(sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async RecipientAcceptTransferFrom(initiator, sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"initiator","type":"ByStr20"},{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async TransferFromSuccessCallBack(initiator, sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"initiator","type":"ByStr20"},{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },async TransferSuccessCallBack(sender, recipient, amount, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"sender","type":"ByStr20"},{"vname":"recipient","type":"ByStr20"},{"vname":"amount","type":"Uint128"}].map((param, index) => {
            if (typeof args[index] === "object") {
                param.value = args[index];
            } else {
                param.value = typeof args[index] === "boolean" ? {constructor: args[index] ? "True" : "False", argtypes: [], arguments: []} : args[index].toString();
            }
            param.type = param.type.split("with")[0].trim();
            return param;
        });
        const callTx = await zilliqa.contracts.at(myAddress).callWithoutConfirm(tag, params, {
            version,
            amount: new BN(zilAmount),
            gasPrice: units.toQa(gasPrice.toString(), units.Units.Li),
            gasLimit: Long.fromNumber(gasLimit),
        });
        
        if(callback) {
            callback("0x" + callTx.id);
        }
        const confirmedTxn = await callTx.confirm(callTx.id);
        if (!confirmedTxn.receipt.success) {
            console.log(JSON.stringify(confirmedTxn, null, 2));
        }
        return confirmedTxn.receipt.success === true;
    },
    events: {"RewardClaimed":{"name":"RewardClaimed","params":[]}},
    fields: {"owner":{"owner":"owner","ByStr20":"ByStr20"},"pending_owner":{"pending_owner":"pending_owner","Option (ByStr20)":"Option (ByStr20)"},"lastUpdatedBlock":{"lastUpdatedBlock":"lastUpdatedBlock","Uint128":"Uint128"},"rewardPerTokenStored":{"rewardPerTokenStored":"rewardPerTokenStored","Uint128":"Uint128"},"userRewardsPerTokenPaid":{"userRewardsPerTokenPaid":"userRewardsPerTokenPaid","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"rewards":{"rewards":"rewards","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"is_closed":{"is_closed":"is_closed","Bool":"Bool"},"closed_block":{"closed_block":"closed_block","BNum":"BNum"},"claimedAfterClose":{"claimedAfterClose":"claimedAfterClose","Map (ByStr20) (Bool)":"Map (ByStr20) (Bool)"}}
  };  
};

module.exports = contract;