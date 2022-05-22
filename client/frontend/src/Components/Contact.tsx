import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import './Styles/Contact.css';

const Contact = (props) => {

    const [response, setResponse] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const requestSendMessage = async (message, sender) => {
        setLoading(true);
        await fetch("https://127.0.0.1/contact", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: ``
        }).then(response => {
            return response.json();
        }).then(data => {
            setResponse(data);
            setLoading(false);
        });
        props.refresh();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formElements = form.elements as typeof form.elements & {
            message: HTMLInputElement,
            sender: HTMLInputElement,
        }
        requestSendMessage(formElements.message.value, formElements.sender.value);
    }

    return (
        <div className="contact">
            <div className="contact-input">
                {loading ? 
                    <div>
                        <div>Sending Message...</div>
                        <img src="../../public/Resources/Status/Loading.gif" />
                    </div>
                    :
                    <div>
                        <form onSubmit={handleSubmit}>
                            <label>Email: </label>
                            <input type="text" id="sender" name="sender" placeholder="example@domain.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" /><br />
                            <label>Message: </label>
                            <input type="text" id="message" name="message" />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                }
            </div>
        </div>
    );
}

export { Contact };