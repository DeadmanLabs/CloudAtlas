import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';

const Loading = (props) => {
    return (
        <div className="Loading">
            <h1>Loading Tables! Please Wait...</h1>
            <img src="../../../public/Resources/Status/Loading.gif" />
        </div>
    );
}

const Empty = (props) => {
    const { publicKey, sendTransaction } = useWallet();
    return (
        <div className="Error">
            <h1>No Tables Available! Please create a new game.</h1>
            {
                publicKey !== null ? 
                <div>
                    <a>Form to create</a>
                </div>
                :
                <div>
                    <h1>Error! Please Connect your wallet.</h1>
                </div>
            }
        </div>
    );
}

const GameTable = (props) => {
    const [entered, setEntered] = useState(undefined)
    const { publicKey, sendTransaction } = useWallet();

    const [password, setPassword] = useState(undefined);
    return (
        <div>
            {
                entered == undefined ? 
                <div>
                    <table className="Tables">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Creator</th>
                                <th>Min Bet</th>
                                <th>Private</th>
                                <th>Full</th>
                                <th>Join</th>
                            </tr>
                        </thead>
                        <tbody>
                            {

                            }
                        </tbody>
                    </table>
                    {
                        publicKey == null ? 
                        <button disabled={true}> + New (Wallet Not Connected)</button>
                        :
                        <button disabled={false}> + New</button>
                    }
                </div>
                :
                <div>
                    {
                        publicKey != null ? 
                        props.game
                        :
                        <h1>Please connect wallet to continue.</h1>
                    }
                </div>
            }
        </div>
    );
}

const Selector = (props) => {
    const [games, setGames] = useState({games: {}});
    const [loading, setLoading] = useState(false);
    const fetchData = async (game) => {
        setLoading(true);
        let err = true;
        while (err)
        {
            try
            {
                await fetch(`https://localhost/games?type=${props.type}`)
                    .then(response => {
                        err = false;
                        return response.json()
                    })
                    .then (data => {
                        setGames(data)
                        setLoading(false)
                    });
            }
            catch { err = true; }
        }
    }

    useEffect(() => {
        fetchData(props.game);
    }, []);

    if (loading == true)
    {
        return (
            <div className="select">
                <Loading />
            </div>
        )
    }
    else
    {
        console.log("[DBG] - Games: " + Object.entries(games.games).length);
        if (Object.entries(games.games).length > 0)
        {
            return (
                <div className="select">
                    <GameTable refresh={fetchData} games={games.games} type={props.type} game={props.game} />
                </div>
            )
        }
        else
        {
            return (
                <div className="select">
                    <Empty refresh={fetchData} type={props.type} />
                </div>
            )
        }
    }
}

export { Loading, Empty, GameTable, Selector }