import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletNotConnectedError, WalletSignTransactionError } from '@solana/wallet-adapter-base';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

import './Styles/Blog.css';

const Post = (props) => {

    return (
        <div className="post" id={props.index}>

        </div>
    )
}

const Blog = (props) => {

    const [posts, setPosts] = useState(undefined);
    const [loading, setLoading] = useState(false);

    const getBlog = async () => {
        setLoading(true);
        let err = true;
        while (err)
        {
            try
            {
                await fetch("https://127.0.0.1/blog")
                    .then(response => {
                        err = false;
                        return response.json();
                    })
                    .then(data => {
                        err = data.status == "failed"
                        setPosts(data);
                        setLoading(false);
                    });
            } catch { err = true; }
        }
    }

    useEffect(() => {
        getBlog();
    }, []);

    return (
        <div className="blog">
            {loading ? 
                <div>
                    <div>Loading Blog Posts...</div>
                    <img src="../../public/Resources/Status/Loading.gif" />
                </div>
                :
                <div>
                    {
                        Object.keys(posts).map(function() { return(<Post />) })
                    }
                </div>
            }
        </div>
    );
}

export { Blog };