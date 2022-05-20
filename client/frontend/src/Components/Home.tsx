import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import './Styles/Home.css';

const TradingViewWidget = (props) => {
    let symbols = 
    {
        "symbols": [
            {
                "description": "BTCUSD",
                "proName": "BINANCE:BTCUSDT"
            },
            {
            "description": "ETHUSD",
            "proName": "BINANCE:ETHUSDT"
            },
            {
            "description": "SOLUSD",
            "proName": "BINANCE:SOLUSDT"
            },
            {
            "description": "MATICUSD",
            "proName": "BINANCE:MATICUSDT"
            },
            {
            "description": "FTMUSD",
            "proName": "BINANCE:FTMUSDT"
            },
            {
            "description": "LTCUSD",
            "proName": "BINANCE:LTCUSDT"
            },
            {
            "description": "XMRUSD",
            "proName": "BINANCE:XMRUSDT"
            },
            {
            "description": "ATOMUSD",
            "proName": "BINANCE:ATOMUSDT"
            },
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
    }

    useEffect(() => {
        let script = document.createElement('script');
        script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.type = "text/javascript";
        script.id = "widget";
        script.async = true;
        script.innerHTML = JSON.stringify(symbols);
        document.getElementById("widget-container").appendChild(script);
        return () => {
            if (document.getElementById("widget-container") != null)
            {
                document.getElementById("widget-container").removeChild(script);
            }
        }
    }, [symbols]);

    return (
        <div id="widget-container">
            <div className="tradingview-widget-container">
                <div className="tradingview-widget-container__widget"></div>
                <div className="tradingview-widget-copyright"></div> 
            </div>
        </div>
    );
}

const TwitterTimeline = (props) => {

    useEffect(() => {
        let script = document.createElement('script');
        script.async = true;
        script.src = "https://platform.twitter.com/widgets.js";

        document.getElementById("twitter-container")
        document.getElementById("twitter-container").appendChild(script);
        return () => {
            document.getElementById("twitter-container").removeChild(script);
        }
    }, []);

    return (
        <div id="twitter-container">
            <a className="twitter-timeline" data-theme="dark" href="https://twitter.com/KronosKorpse?ref_src=twsrc%5Etfw">Tweets by KronosKorpse</a>
        </div>
    );
    

    //return (<div></div>);
}

const Home = (props) => {

    return (
        <div className="home">
            <TradingViewWidget />
            {
            <div className="side-display">
                <div className="left-side-display">
                    <div id="left"></div>
                </div>
                <div className="center-side-display">
                    <div id="center"></div>
                </div>
                <div className="right-side-display">
                    <div id="right"></div>
                </div>
            </div>
            }
        </div>
    );
}

export { Home };