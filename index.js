"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var invest_openapi_js_sdk_1 = __importDefault(require("@tinkoff/invest-openapi-js-sdk"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var sandboxApiURL = 'https://api-invest.tinkoff.ru/openapi/sandbox/';
var socketURL = 'wss://api-invest.tinkoff.ru/openapi/md/v1/md-openapi/ws';
var sandboxToken = process.env.SANDBOX_TOKEN; // токен для сандбокса
var api = new invest_openapi_js_sdk_1.default({ apiURL: sandboxApiURL, secretToken: sandboxToken, socketURL: socketURL });
var usList = ['AAPL', 'TXN', 'NEE', 'UNH', 'LMT', 'ACN', 'HD', 'V', 'MCD', 'ROST'];
var ruList = ['SBER']; //, 'TCSG', 'TATN', 'TATNP', 'DSKY', 'LKOH', 'MOEX', 'MTSS', 'CHMF', 'PHOR', 'GAZP', 'UPRO', 'FXWO'];
// let writeStream = fs.createWriteStream('./secret.txt');
// const round = function (value:number, decimals:number) {
//     return Number.parseFloat(value.toFixed(decimals));
// }
//const red = redis.createClient(6379);
var printPrices = function (inst) {
    console.log('getting candle for:' + inst.ticker);
    var figi = inst.figi;
    api.candle({ figi: figi, interval: 'day' }, function (x) {
        console.log(inst.ticker + ' ' + x.interval +
            ' low:' + x.l +
            ' high:' + x.h +
            ' vol:' + x.v +
            '\n');
    });
};
!(function run() {
    return __awaiter(this, void 0, void 0, function () {
        var stockList;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(ruList.map(function (stock) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, api.searchOne({ ticker: stock })];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); }))];
                case 1:
                    stockList = _a.sent();
                    stockList.forEach(function (inst) { return console.log(inst.ticker + ';'); });
                    // const figi  = stockList[0].figi;
                    // const unsubFromAAPL = api.orderbook({ figi }, (ob) => { console.log(ob.bids) });
                    stockList.forEach(function (x) {
                        printPrices(x);
                    });
                    return [2 /*return*/];
            }
        });
    });
})();
// writeStream.on('finish', () => {
//     console.log('wrote all data to file');
// });
//# sourceMappingURL=index.js.map