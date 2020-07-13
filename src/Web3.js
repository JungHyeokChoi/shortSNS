import Web3 from "web3";
import ShortSnsjson from "./shortsns.abi.json";

let web3 = {
    http: undefined,
    ws : undefined,
    shortsns : undefined
};

const wsEndpoint = "wss://ropsten.infura.io/ws/v3/2c246ce08adb43e6b777b8570bf86fd0";
const httpEndpoint = "https://ropsten.infura.io/v3/2c246ce08adb43e6b777b8570bf86fd0";

web3.ws = new Web3(wsEndpoint);

if (window.ethereum) {
    web3.http = new Web3(window.ethereum);
} else {
    web3.http = new Web3(httpEndpoint);
}

web3.shortsns = new web3.http.eth.Contract(ShortSnsjson, 0xceaec51d31d98c863710fe654e62ae95579e0b6d);

export { web3 };