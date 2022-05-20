import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import ws, { Socket } from 'socket.io-client';

import './Styles/Claw.css';

const Claw = (props) => {

    const [socket, setSocket] = useState(undefined);
    const [response, setResponse] = useState(undefined);
    const [playing, setPlaying] = useState(false);
    const [queue, setQueue] = useState([]);

    const movement = (direction) => {
        if (playing && socket != undefined)
        {
            switch (direction)
            {
                case "up":
                    socket.emit('move', 'up');
                    console.log("[DBG] - Moving Up...");
                    break;
                case "down":
                    socket.emit('move', 'down');
                    console.log("[DBG] - Moving Down...");
                    break;
                case "left":
                    socket.emit('move', 'left');
                    console.log("[DBG] - Moving Left...");
                    break;
                case "right":
                    socket.emit('move', 'right');
                    console.log("[DBG] - Moving Right...");
                    break;
                case "drop":
                    socket.emit('move', 'drop');
                    console.log("[DBG] - Dropping...");
                    setPlaying(false);
                    break;
            }
        }
    }

    const clear = () => {
        if (playing && socket != undefined)
        {
            socket.emit('move', 'clear');
            console.log('[DBG] - Cleared!');
        }
    }

    useEffect(() => {
        const sock = ws("https://127.0.0.1/");
        sock.on('connect', () => {
            setSocket(sock);
        });
        return () => {
            socket.disconnect();
        }
    }, []);

    return (
        <div className="claw">
            <div className="clawcontroller">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/QMg1hvHpJZ4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
                <div className="user-controls">
                    <div className="control-left">
                        <div className="move-up" onMouseDown={() => movement("up")} onMouseUp={() => clear()} />
                        <div className="directional">
                            <div className="move-left" onMouseDown={() => movement("left")} onMouseUp={() => clear()} />
                            <div className="move-right" onMouseDown={() => movement("right")} onMouseUp={() => clear()} />
                        </div>
                        <div className="move-down" onMouseDown={() => movement("down")} onMouseUp={() => clear()} />
                    </div>
                    <div className="control-right">
                        <div className="move-drop" onMouseDown={() => movement("drop")} onMouseUp={() => clear()} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Claw };