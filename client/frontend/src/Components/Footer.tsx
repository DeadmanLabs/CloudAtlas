import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

function Footer(props: any)
{
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    return (
        <div className="footer">
            <div className="footer-col contact">
                <ul role="list">
                    <li>Github</li>
                    <li>Twitter</li>
                    <li>Discord</li>
                    <li>Telegram</li>
                </ul>
            </div>
            <div className="footer-col legal">
                <ul role="list">
                    <li>Terms of Use</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
        </div>
    );
}

export { Footer };