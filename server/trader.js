const bybit = require('bybit-api');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const REST = new bybit.LinearClient(
    config["bybit"]["api"],
    config["bybit"]["secret"],
    config["bybit"]["live"]
);
const Websocket = new bybit.WebsocketClient({ 
    key: config["bybit"]["api"], 
    secret: config["bybit"]["secret"],
    livenet: config["bybit"]["live"],
});
Websocket.subscribe(['position', 'execution', 'trade', 'wallet']);
Websocket.on('update', data => {
    console.log('Update - ', data);
});
Websocket.on('open', ({ wsKey, event }) => {

});
Websocket.on('response', response => {

});
Websocket.on('close', () => {

});
Websocket.on('error', err => {

});

