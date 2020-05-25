import OpenAPI, { MarketInstrument, MarketInstrumentList } from '@tinkoff/invest-openapi-js-sdk';
import * as dotenv from "dotenv";
import fs from 'fs';
import * as redis from "redis";

dotenv.config();
const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
const api = new OpenAPI({ apiURL: sandboxApiURL, secretToken: sandboxToken as string, socketURL });
const usList = ['AAPL', 'TXN', 'NEE', 'UNH', 'LMT', 'ACN', 'HD', 'V', 'MCD', 'ROST'];
const ruList = ['SBER'];//, 'TCSG', 'TATN', 'TATNP', 'DSKY', 'LKOH', 'MOEX', 'MTSS', 'CHMF', 'PHOR', 'GAZP', 'UPRO', 'FXWO'];
// let writeStream = fs.createWriteStream('./secret.txt');

// const round = function (value:number, decimals:number) {
//     return Number.parseFloat(value.toFixed(decimals));
// }

//const red = redis.createClient(6379);

let printPrices = function(inst:MarketInstrument) { 
    console.log('getting candle for:' + inst.ticker);
    const figi = inst.figi;
    
    api.candle({ figi, interval: 'day' }, (x) => {
        console.log(inst.ticker + ' ' + x.interval + 
        ' low:'+ x.l + 
        ' high:'+ x.h + 
        ' vol:'+ x.v +
        '\n');


    });
};
!(async function run() {
    let stockList = await Promise.all(ruList.map(async (stock): Promise<MarketInstrument>=> {
        return await api.searchOne({ ticker: stock }) as MarketInstrument;
    })); 
    
    stockList.forEach(inst => console.log(inst.ticker+';'));
    
    // const figi  = stockList[0].figi;
    // const unsubFromAAPL = api.orderbook({ figi }, (ob) => { console.log(ob.bids) });

    stockList.forEach(x => {
        printPrices(x);
    });
})();  

// writeStream.on('finish', () => {
//     console.log('wrote all data to file');
// });
