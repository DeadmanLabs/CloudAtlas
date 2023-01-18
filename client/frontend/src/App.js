import './App.css';

import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Nav } from './Components/Nav.tsx';
import { Home } from './Components/Home.tsx';
import { Blog } from './Components/Blog.tsx';
import { Claw } from './Components/Claw.tsx';
import { Invest } from './Components/Invest.tsx';
import { Casino } from './Components/Casino.tsx';
import { Lake } from './Components/Lake.tsx';
import { Contact } from './Components/Contact.tsx';
import { About } from './Components/About.tsx';

import { Boring } from './BoringSite/BoringSite.tsx';


function App() {
  const [page, setPage] = useState("Home");
  const [boring, setBoring] = useState(true);
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter({ network }),
    new LedgerWalletAdapter(),
    new SolletWalletAdapter({ network }),
    new SolletExtensionWalletAdapter({ network })
  ], [network]);

  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <div className="Container">
              { boring ? 
                <Boring />
                :
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Nav className="mainNav" callback={setPage} page={page} />} >
                      <Route index element={<Home className="main" />} />
                      <Route path="blog" element={<Blog className="main" />} />
                      <Route path="claw" element={<Claw className="main" />} />
                      <Route path="invest" element={<Invest className="main" />} />
                      <Route path="casino" element={<Casino className="main" />} />
                      <Route path="lake" element={<Lake className="main" />} />
                      <Route path="contact" element={<Contact className="main" />} />
                      <Route path="about" element={<About className="main" />} />
                      <Route path="*" element={<div></div>} />
                    </Route>
                  </Routes>
                </BrowserRouter>
              }
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>      
    </div>
  );
}

export default App;
