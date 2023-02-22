const express = require('express');
const fs = require('fs');
const app = express();
const https = require('https');
const solana = require('@solana/web3.js');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const cors = require('cors');
const sql = require('mysql');
const nodemailer = require('nodemailer');
const formidable = require('formidable');
const bybit = require('bybit-api');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({}));
const privateKey = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const creds = { key: privateKey, cert: certificate };
const server = https.createServer(creds, app);
const wss = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
const emailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config["Email"]["User"],
        pass: config["Email"]["Password"]
    } 
});


//Solana Setup
const blockchain = new solana.Connection(solana.clusterApiUrl('devnet'), 'confirmed');
const wallet = solana.Keypair.fromSecretKey(new Uint8Array(config["Solana"]["PrivateKey"]));

//SQL Setup
const database = sql.createConnection({
    host: config["SQL"]["Address"],
    user: config["SQL"]["User"],
    password: config["SQL"]["Password"],
    database: config["SQL"]["Database"]
});
database.connect(function (err) {
    if (err) throw err;
    console.log("[DBG] - SQL Database Operational!");
});


//Note that the above key is a devnet key and does not hold any Solana
//The real key will only be added before the production build

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

async function confirmPayment(signature) {
    let result = await blockchain.getSignatureStatus(signature);
    if (result.hasOwnProperty('confirmationStatus')) {
        return (result.value.confirmationStatus == 'confirmed' || result.value.confirmationStatus == 'finalized');
    }
    return false;
}

async function sendPayment(recipient, amount) {
    const transaction = new solana.Transaction().add(
        solana.SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: recipient,
            lamports: amount
        }),
    );
    const signature = await web3.sendAndConfirmTransaction(
        network,
        transaction,
        [wallet]
    );
}

app.get('/blog', function (req, res) {
    console.log("[DBG HTTPS] - Blog Posts Requested");
    database.connect(function (err) {
       if (err)
       {
            res.send(JSON.stringify({ status: "failed", endpoint: "blog", reason: err }));
       }
       else
       {
            database.query("SELECT * from blogposts", function (err, result, fields) 
            {
                if (err)
                {
                    res.send(JSON.stringify({ status: "failed", endpoint: "blog", reason: err }));
                }
                else 
                {
                    res.send(JSON.stringify({ status: "success", posts: result }));
                }
            });
       }
       res.end();
       return;
    });
    res.send(JSON.stringify({ status: "failed", action: "SQL Connect" }));
    res.end();
});

app.post('/blog', function(req, res) {
    let params = req.body.params;

    console.log("[DBG HTTPS] - New Blog Post!");
    res.send();
    res.end();
});

app.post('/contact', function(req, res) {
    let params = req.body.params;
    let mail = {
        from: params.sender,
        to: 'michael.magahey@gmail.com',
        subject: 'New Contact!',
        text: params.message
    };
    emailer.sendMail(mail, function(error, info) {
        if (error) {
            console.log(`[DBG Email] - ${error}`);
            res.send(JSON.stringify({ status: "failed", action: "email", err: error }));
        }
        else {
            console.log('[DBG Email] - Email Sent!');
            res.send(JSON.stringify({ status: "success", action: "email" }));
        }
    });
    console.log("[DBG HTTPS] - New Contact Message!");
    res.end();
});

app.post('/upload', function(req, res) {
    let form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        let oldpath = files.filetoupload.filepath;
        let newpath = 'Resources/' + files.filetoupload.originalFilename;
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            res.write(JSON.stringify({ status: "success", action: "upload" }));
            res.end();
        });
    });
});

app.get('/claw', function(req, res) {
    
    console.log("[DBG HTTPS] - Claw Queried");
    res.send();
    res.end();
});

app.get('/casino', function(req, res) {

    console.log("[DBG HTTPS] - Casino Games Queried");
    res.send();
    res.end();
});

app.get('/invest', function(req, res) {

    console.log("[DBG HTTPS] - Investments Queried!");
    res.send();
    res.end();
});

app.get('/donate', function(req, res) {

    console.log("[DBG HTTPS] - Possible Deposit Assets Requested!");
    res.send();
    res.end();
});

app.post('/donate', function(req, res) {
    let params = req.body.params;

    console.log("[DBG HTTPS] - Donation Address Requested!");
    res.send();
    res.end();
});

wss.on('connection', async (ws) => {
    let userid = uuid.v4();
    console.log(`[DBG SOCKET] - New User ${userid}!`);
    ws.on('', async (data) => {

    });
});

server.listen(443);
wss.listen(server);
console.log("[DBG] - HTTPS Server and Websockets listening on port 443!");
