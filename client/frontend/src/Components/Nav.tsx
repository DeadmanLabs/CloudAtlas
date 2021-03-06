import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Popup from 'reactjs-popup';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Outlet, Link } from 'react-router-dom';

import './Styles/Nav.css';

require('@solana/wallet-adapter-react-ui/styles.css');

const Nav = (props) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const pages = [ "Home", "Blog", "Claw", "Invest", "Gamble", "Lake", "Contact", "About" ];
    const routes = [ "index", "blog", "claw", "invest", "casino", "lake", "contact", "about" ]
    const [loading, setLoading] = useState(false);
    const [tokens, setTokens] = useState("");


    let getBalance = async function() {
        try
        {
            return ((await connection.getBalance(publicKey)).valueOf() / LAMPORTS_PER_SOL).toFixed(8);
        }
        catch (e) 
        {
            console.log('[DBG] - Failed to grab balance inside of Nav');
        }
        return (0.0).toFixed(8);
    }

    useEffect(() => {
        let active = true;
        load()
        return () => { active = false }

        async function load() {
            setLoading(true);
            const res = (await getBalance()).toString();
            if (!active) { return; }
            setTokens(res);
            setLoading(false);
        }
    }, [connection, publicKey]);

    return (
        <div>
            <div className="nav">
                <div className="navLeft">
                    {
                        pages.map((route, i) => {
                            return (
                                <Link className={props.page==route?`active`:`inactive`} onClick={()=>props.callback(route)} to={routes[pages.indexOf(route)]}><span className={`icon ${route}`}></span><b className="route">{route}</b></Link>
                            );
                        })
                    }
                </div>
                <div className="navCenter">
                    <div className="balance">
                        { loading ? "Loading..." : tokens + " SOL"}
                    </div>
                </div>
                <div className='navRight'>
                    <a className="web3"><WalletMultiButton /><WalletDisconnectButton /></a>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export { Nav };