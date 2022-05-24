const bybit = require('bybit-api');
const fs = require('fs');
const neat = require('neataptic');

bybit.DefaultLogger.silly = () => {};
bybit.DefaultLogger.info = () => {};
bybit.DefaultLogger.debug = () => {};

/*
class Trader
{
    constructor({ balance })
    {
        this.init = balance;
        this.balance = balance;
        this.net = 0;
    }

    trade(game) 
    {

        const input = [];
        const output = this.brain.activate(input).map(o => Math.round(o));

        
    }

    reset()
    {
        this.balance = this.init;
        this.net = 0;
    }
}

class Market
{
    constructor({ balance, onGameOver, maxTicks })
    {
        this.status = 'IDLE';
        this.trader = new Trader(balance);
        this.ticks = 0;
        this.onGameOver = onGameOver;
        this.maxTicks = maxTicks;
    }

    updateGameStatus()
    {
        if (this.trader.balance <= 0 || this.trader.ticks >= this.maxTicks)
        {
            this.status = 'GAME_OVER';
        }
    }

    start() 
    {
        this.ticks = 0;
        this.trader.reset();
        this.status = 'TRADING';
    }
}

class MarketSimulator
{
    constructor ({ balance, traders, onEndGeneration })
    {
        this.markets = []
        this.bankruptTraders = 0
        this.neat = neat.neat;
        this.onEndGeneration = onEndGeneration;

    }

    startGeneration()
    {
        this.bankruptTraders = 0;
        for (let i = 0; i < this.traders.length; i++)
        {
            this.traders[i].brain = this.neat.population[i];
            this.traders[i].brain.score = 0;
            this.traders[i].start()
        }
    }

    endGeneration()
    {
        if (this.bankruptTraders + 1 < this.traders.length)
        {
            this.bankruptTraders++;
            return;
        }
        this.neat.sort();
        this.onEndGeneration({
            generation: this.neat.generation,
            max: this.neat.getFittest().score,
            avg: Math.round(this.neat.getAverage()),
            min: this.neat.population[this.neat.popsize - 1].score
        });
        const newGeneration = [];
        for (let i = 0; i < this.neat.elitism; i++)
        {
            newGeneration.push(this.neat.population[i]);
        }
        for (let i = 0; i < this.neat.popsize - this.neat.elitism; i++)
        {
            newGeneration.push(this.neat.getOffspring());
        }
        this.neat.population = newGeneration;
        this.neat.mutate();
        this.neat.generation++;
        this.startGeneration();
    }
}
*/

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let orderbook = {};
let symbol = {};

//Manage Market Data
const REST = new bybit.LinearClient(
    config["bybit"]["api"],
    config["bybit"]["secret"],
    config["bybit"]["live"]
);
const Websocket = new bybit.WebsocketClient({ 
    key: config["bybit"]["api"], 
    secret: config["bybit"]["secret"],
    livenet: config["bybit"]["live"],
    market: 'linear'
}, bybit.DefaultLogger);
//Websocket.subscribe(['position', 'execution', 'trade', 'wallet']);
Websocket.subscribe(['trade.BTCUSDT', 'candle.5.BTCUSDT', 'liquidation.BTCUSDT', 'orderBookL2_25.BTCUSDT', 'instrument_info.BTCUSDT']);
Websocket.on('update', update => {
    //console.log('Update - ', update);
    let packet = update.data[0]
    switch (update.topic)
    {
        case 'orderBookL2_25.BTCUSDT':
            {
                if (update.type == 'snapshot')
                {
                    for (let i in update.data)
                    {
                        orderbook[update.data[i].price] = {};
                        for (let j in Object.keys(update.data[i]))
                        {
                            let key = Object.keys(update.data[i])[j];
                            if (key != 'price')
                            {
                                orderbook[update.data[i].price][key] = update.data[i][key];
                            }
                        }
                    }
                }
                else if (update.type == 'delta')
                {
                    for (let i in update.data.delete)
                    {
                        if (orderbook.hasOwnProperty(update.data.delete[i].price))
                        {
                            delete orderbook[update.data.delete[i].price];
                        }
                    }
                    for (let i in update.data.update)
                    {
                        if (orderbook.hasOwnProperty(update.data.update[i].price))
                        {
                            for (let j in Object.keys(update.data.update[i]))
                            {
                                let key = Object.keys(update.data.update[i]);
                                if (key != 'price')
                                {
                                    orderbook[update.data.update[i].price][key] = update.data.update[i][key];
                                }
                            }
                        }
                    }
                    for (let i in update.data.insert)
                    {
                        if (!orderbook.hasOwnProperty(update.data.insert[i]))
                        {
                            orderbook[update.data.insert[i].price] = {};
                            for (let j in Object.keys(update.data.insert[i]))
                            {
                                let key = Object.keys(update.data.insert[i]);
                                orderbook[update.data.insert[i].price][key] = update.data.insert[i][key];
                            }
                        }
                        else
                        {
                            for (let j in Object.keys(update.data.insert[i]))
                            {
                                let key = Object.keys(update.data.insert[i])[j];
                                orderbook[update.data.insert[i].price][key] = update.data.insert[i][key];
                            }
                        }
                    }
                }
            }
            break;
        case 'instrument_info.BTCUSDT':
            {
                if (update.type == 'snapshot')
                {
                    symbol = update.data;
                }
                else if (update.type == 'delta')
                {
                    for (let i in Object.keys(update.data))
                    {
                        let key = Object.keys(update.data)[i];
                        symbol[key] = update.data[key];
                    }
                }
            }
            break;
    }
});