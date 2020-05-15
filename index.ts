import OpenAPI, { MarketInstrument, MarketInstrumentList } from '@tinkoff/invest-openapi-js-sdk';
import * as dotenv from "dotenv";
import fs from 'fs';
import * as redis from "redis";

dotenv.config();
const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
const api = new OpenAPI({ apiURL: sandboxApiURL, secretToken: sandboxToken as string, socketURL });

let writeStream = fs.createWriteStream('./secret.txt');

const round = function (value:number, decimals:number) {
    return Number.parseFloat(value.toFixed(decimals));
}

const red = redis.createClient(6379);

let printPrices = function(figi:string) { 
    api.candle({ figi,  interval: '3min' }, (x) => {
        // console.log('-------------------------');
        // console.log('time: ' + (new Date()).toString());
        // console.log(x.h);
        console.log(x.figi + '\n');
        red.set(x.figi, x.h.toString());
        if(round(x.h, 0)/x.h - 1 < 0.05){
            writeStream.write('h:' + x.h + ' l:'+ x.l + '\n');
        }

       
    });
};
!(async function run() {
    let stockList = await api.stocks() as MarketInstrumentList;
    stockList.instruments.forEach(inst => writeStream.write(inst.ticker+';'));
    writeStream.write('\n---------------------------------------------------\n');
    stockList.instruments.forEach(x => {
        printPrices(x.figi);
    });
})();  

writeStream.on('finish', () => {
    console.log('wrote all data to file');
});
