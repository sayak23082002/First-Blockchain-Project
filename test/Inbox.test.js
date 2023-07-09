const assert = require('assert');
const ganache = require('ganache-cli');
const { describe } = require('mocha');
const Web3 = require('web3');//this is a constructor function that is why the initial is capital
const {interface, bytecode} = require('../compile.js');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
    //Get all possible unlocked accounts
    accounts = await web3.eth.getAccounts();
    //Deploy the contract in one of the accounts
    inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({data : bytecode, arguments : ['Hi there!']}).send({from : accounts[0], gas : '1000000'});
});

describe('Inbox', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there!');
    });

    it('can change the message', async () => {
        await inbox.methods.setMessage('Bye there').send({from : accounts[0]});
        const newMessage = await inbox.methods.message().call();
        assert.equal(newMessage, 'Bye there');
    });
    
});