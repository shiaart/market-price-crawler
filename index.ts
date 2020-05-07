import OpenAPI, { MarketInstrument } from '@tinkoff/invest-openapi-js-sdk';
import * as dotenv from "dotenv";

dotenv.config();
const sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
const socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
const sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
const api = new OpenAPI({ apiURL: sandboxApiURL, secretToken: sandboxToken as string, socketURL });


!(async function run() {
    await api.sandboxClear(); // очищаем песочницу 
    
    //console.log(await api.searchOne({ ticker: 'AAPL' }));
    const marketInstrument = await api.searchOne({ ticker: 'AAPL' }) as MarketInstrument;
    const { figi } = marketInstrument;
    await api.setCurrenciesBalance({ currency: 'USD', balance: 1000 }); // 1000$ на счет
    await api.limitOrder({ operation: 'Buy', figi, lots: 1, price: 100 }); // Покупаем AAPL
    await api.instrumentPortfolio({ figi }); // В портфеле ничего нет
    console.log(await api.instrumentPortfolio({ figi })); // Сделка прошла моментально
  })();