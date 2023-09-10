const {Zilliqa} = require("@zilliqa-js/zilliqa");
const {readFileSync} = require("fs");
const {units, Long, BN} = require("@zilliqa-js/util");  
const {resolve} = require("path");          
function contract({privateKey, api, version, net, contractAddress}) {
  let zilliqa = new Zilliqa(api);
  zilliqa.wallet.addByPrivateKey(privateKey);
  const code = readFileSync(resolve(process.cwd(), "scilla/contracts", "GrphPoolStakeProxy.scilla"), "utf8");
  let initParams = [{"vname":"contract_owner","type":"ByStr20"},{"vname":"grph_swap","type":"ByStr20"}];
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
    async deploy(contract_owner, grph_swap, gasLimit = 60000) {
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
    async SetRewardsToken(pool, stake_contract, reward_token, token_owner, reward_rate, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"pool","type":"ByStr20"},{"vname":"stake_contract","type":"ByStr20"},{"vname":"reward_token","type":"ByStr20"},{"vname":"token_owner","type":"ByStr20"},{"vname":"reward_rate","type":"Uint128"}].map((param, index) => {
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
    },async RemoveStakeContract(pool, stake_contract, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"pool","type":"ByStr20"},{"vname":"stake_contract","type":"ByStr20"}].map((param, index) => {
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
    },async PenndingStakeContract(stake_owner, stake_contract, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"stake_owner","type":"ByStr20"},{"vname":"stake_contract","type":"ByStr20"}].map((param, index) => {
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
    },async UpdateRewardsTokenRate(stake_contract, reward_rate, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"stake_contract","type":"ByStr20"},{"vname":"reward_rate","type":"Uint128"}].map((param, index) => {
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
    },async Stake(pool, account, amount, total_contribution, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"pool","type":"ByStr20"},{"vname":"account","type":"ByStr20"},{"vname":"amount","type":"Uint128"},{"vname":"total_contribution","type":"Uint128"}].map((param, index) => {
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
    },async Withdraw(pool, account, amount, total_contribution, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"pool","type":"ByStr20"},{"vname":"account","type":"ByStr20"},{"vname":"amount","type":"Uint128"},{"vname":"total_contribution","type":"Uint128"}].map((param, index) => {
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
    },async Reward(pool, gasPrice = 2000,gasLimit = 2000, zilAmount = 0, callback) {
        const args = arguments;
        const e = new Error();
        const frame = e.stack.split("\n")[1];
        const tag = frame.split(" ")[5].split(".")[1];
        const params = [{"vname":"pool","type":"ByStr20"}].map((param, index) => {
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
    events: {},
    fields: {"owner":{"owner":"owner","ByStr20":"ByStr20"},"pending_owner":{"pending_owner":"pending_owner","Option (ByStr20)":"Option (ByStr20)"},"pools":{"pools":"pools","Map (ByStr20) (Map (ByStr20) (ByStr20))":"Map (ByStr20) (Map (ByStr20) (ByStr20))"},"stake_owners":{"stake_owners":"stake_owners","Map (ByStr20) (ByStr20)":"Map (ByStr20) (ByStr20)"},"stake_contracts":{"stake_contracts":"stake_contracts","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"stake_contract_pool":{"stake_contract_pool":"stake_contract_pool","Map (ByStr20) (ByStr20)":"Map (ByStr20) (ByStr20)"},"balances":{"balances":"balances","Map (ByStr20) (Map (ByStr20) (Uint128))":"Map (ByStr20) (Map (ByStr20) (Uint128))"},"totalSupply":{"totalSupply":"totalSupply","Map (ByStr20) (Uint128)":"Map (ByStr20) (Uint128)"},"pending_stake_contracts":{"pending_stake_contracts":"pending_stake_contracts","Map (ByStr20) (ByStr20)":"Map (ByStr20) (ByStr20)"}}
  };  
};

module.exports = contract;