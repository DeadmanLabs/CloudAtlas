import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Loading, Empty, GameTable, Selector } from './Common';

const Blackjack = (props) =>
{

    return (
        <div>

        </div>
    );
}

const BlackjackGame = (props) =>
{
    return (
        <div>
            <Selector type="blackjack" game={<Blackjack />} />
        </div>
    );
}

export { BlackjackGame }