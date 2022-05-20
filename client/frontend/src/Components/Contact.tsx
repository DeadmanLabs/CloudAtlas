import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import './Styles/Contact.css';

const Contact = (props) => {

    return (
        <div className="contact">
            <form>
                <label>Email: </label>
                <input type="text" id="response" name="response" placeholder="example@domain.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" /><br />
                <label>Message: </label>
                <input type="text" id="message" name="message" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export { Contact };