import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import { BlackjackGame } from './Casino/Blackjack';

import './Styles/Casino.css';

const Casino = (props) => {

    return (
        <div className="casino">
            Casino
        </div>
    );
}

export { Casino };