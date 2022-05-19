import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const Claw = (props) => {

    return (
        <div>
            Claw
        </div>
    );
}

export { Claw };