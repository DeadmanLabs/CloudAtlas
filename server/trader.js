const { throws } = require('assert');
const bybit = require('bybit-api');
const fs = require('fs');
const neataptic = require('neataptic');

bybit.DefaultLogger.silly = () => {};
bybit.DefaultLogger.info = () => {};
bybit.DefaultLogger.debug = () => {};

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

const neat = neataptic.neat;

class Trader
{
    constructor({balance, leverage})
    {
        this.init = balance;
        this.balance = balance;
        this.margin = this.balance * leverage;
        this.usedMargin = 0;
        this.positions = [];
    }   

    reset()
    {
        this.balance = this.init;
        this.positions = [];
        this.margin = this.balance * leverage;
        this.usedMargin = 0;
    }

    trade(market)
    {
        let maxPosSize = this.margin;
        const input = [];
        const output = this.brain.activate(input).map(o => Math.round(o));
           
    }
}

class Market
{
    constructor({dataset, startTime, balance, onBankrupt})
    {
        this.simulated = dataset != undefined;
        this.dataset = dataset;
        this.startTime = startTime;
        this.currentTime = startTime;
        this.balance = balance;
        this.init = balance;
        this.onBankrupt = onBankrupt;
        this.status = 'IDLE';
        this.trader = new Trader(balance);
        this.timesteps = 0;
        this.stats = {
            initial: this.init,
            current: this.balance,
            netProfit: 0,
            grossProfit: 0,
            grossLoss: 0,
            profitFactor: 0,
            balanceDrawdown: 0,
            equityDrawdown: 0,
            sharpe: 0,
            zScore: 0,
            longs: 0,
            shorts: 0,
            longWins: 0,
            shortWins: 0,
            longLosses: 0,
            shortLosses: 0,
            longPercentage: 0,
            shortPercentage: 0,
            netChange: 0,
            openPositions: [],
            closedPositions: []
        }
    }

    updateMarketStatus()
    {
        
    }

    getAvailablePositions()
    {
        //calculate range of possible moves
    }

    start()
    {
        this.timesteps = 0;
        this.trader.reset();
        this.status = 'RUNNING';
    }
}

class Runner 
{
    constructor({inputs, outputs, neatParams, markets, balance, dataset, onEndGeneration})
    {
        this.neat = new neat(inputs, outputs, null, neatParams);
        this.markets = []
        this.tradersBankrupt = 0
        this.onEndGeneration = onEndGeneration;

        for (let i = 0; i < markets; i++)
        {
            //Randomly select start time
            let startTime = "";
            this.markets.push(new Market({
                dataset,
                startTime,
                balance,
                onBankrupt: () => this.endGeneration()
            }));
        }
    }

    startGeneration()
    {
        this.tradersBankrupt = 0;
        for (let i = 0; i < this.markets.length; i++)
        {
            this.markets[i].trader.brain = this.neat.population[i];
            this.markets[i].trader.brain.score = 0;
            this.markets[i].start();
        }
    }

    endGeneration()
    {
        if (this.tradersBankrupt + 1 < this.markets.length)
        {
            this.tradersBankrupt++;
            return;
        }
        this.neat.sort()

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
            newGeneration.push(this.neat.getOffspring())
        }
        this.neat.population = newGeneration;
        this.neat.mutate();
        this.neat.generation++;
        this.startGeneration();
    }
}

const brains = new neat(6, 2, null, {
    popsize: 150,
    elitism: 1,
    mutationRate: 1,
    mutationAmount: 1
});

const history = {
    labels: [],
    datasets: [
        {
            name: 'Max',
            values: []
        },
        {
            name: 'Average',
            values: []
        },
        {
            name: 'Min',
            values: []
        }
    ]
}

//Place Chart Declare here
let highestScore = 0;

const runner = new Runner({
    maxTimesteps: 1000,
    lowestScoreAllowed: 0,
    onEndGeneration: ({generation, max, avg, min}) => {
        history.labels.push(generation.toString());
        history.datasets[0].values.push(max);
        history.datasets[1].values.push(avg);
        history.datasets[2].values.push(min);

        if (history.labels.length > 75) {
            history.labels.shift();
            history.datasets.forEach(d => d.values.shift())
        }

        //update chart here
        if (max > highestScore) {
            highestScore = max
        }

        //Replace documents
    }
})

runner.startGeneration();