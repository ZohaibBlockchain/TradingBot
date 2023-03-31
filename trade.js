import dotenv from 'dotenv';
dotenv.config();
import Binance from 'node-binance-api';




const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET
});


const leverage = 2;
const userData = {
  symbol: 'BTCUSDT',
  side: 'long',
  quantity: 0.001,

  currentTrade: false
};





export async function main(signal) {
  console.info('signal ', signal);
  let NewLeverage = await setleverage();
  console.log(NewLeverage['leverage']);



  // if (NewLeverage['leverage'] == leverage) {//Now leverage is
  //   if (userData.currentTrade) {
  //     if (userData.side == signal) {
  //       console.log('Same Direction');
  //       return;
  //     }

  //     let res = await settlePreviousTrade();
  //     console.log(res);
  //     if (res['symbol'] == userData.symbol) {
  //       //Now create new Order
  //       userData.currentTrade = false;
  //       let res = await CreateNewTrade(signal);
  //       if (res['symbol'] == userData.symbol) {
  //         userData.currentTrade = true;
  //         userData.side = signal;
  //         console.log(res);
  //       } else {
  //         console.log('Error While putting a trade...')
  //       }
  //     }
  //   }
  //   else {
  //     let res = await CreateNewTrade(signal);
  //     console.log(res);
  //     if (res['symbol'] == userData.symbol) {
  //       userData.currentTrade = true;
  //       userData.side = signal;
  //     } else {
  //       console.log('Error While putting a trade...')
  //     }
  //   }
  // }
}






async function setleverage() {

  try {
    return await binance.futuresLeverage(userData.symbol, leverage);
  } catch (error) {
    console.log(error);
  }

}

async function settlePreviousTrade() {
  return new Promise(async (resolve, reject) => {
    if (userData.side == 'long') {
      resolve(await binance.futuresMarketSell(userData.symbol, userData.quantity));
    } else {
      resolve(await binance.futuresMarketBuy(userData.symbol, userData.quantity));
    }
  });
}


async function CreateNewTrade(signal) {
  return new Promise(async (resolve, reject) => {
    if (signal == 'long') {
      resolve(await binance.futuresMarketBuy(userData.symbol, userData.quantity));
    } else {
      resolve(await binance.futuresMarketSell(userData.symbol, userData.quantity));
    }
  });
}

