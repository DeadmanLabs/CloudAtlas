import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import './Styles/Lake.css';

const Lake = (props) => {

    return (
        <div className="lake">
            Lake
        </div>
    );
}

export { Lake };