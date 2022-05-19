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

import { Nav } from './Components/Nav.tsx';
import { Home } from './Components/Home.tsx';
import { Blog } from './Components/Blog.tsx';
import { Claw } from './Components/Claw.tsx';
import { Invest } from './Components/Invest.tsx';
import { Casino } from './Components/Casino.tsx';
import { Lake } from './Components/Lake.tsx';
import { Contact } from './Components/Contact.tsx';
import { About } from './Components/About.tsx';


function App() {
  const [page, setPage] = useState("Home");
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
              <Nav className="mainNav" callback={setPage} page={page}/>
              {
                {
                  'Home': <Home className="main" />,
                  'Blog': <Blog className="main" />,
                  'Claw': <Claw className="main" />,
                  'Invest': <Invest className="main" />,
                  'Gamble': <Casino className="main" />,
                  'Lake': <Lake className="main" />,
                  'Contact': <Contact className="main" />,
                  'About': <About className="main" />
                }[page]
              }
            </div>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>      
    </div>
  );
}

export default App;
