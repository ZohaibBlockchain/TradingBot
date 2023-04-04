import dotenv from "dotenv";
dotenv.config();
import Binance from "node-binance-api";

const binance = new Binance().options({
  APIKEY: process.env.API_KEY,
  APISECRET: process.env.API_SECRET,
});

export let UD = [];
export let tradeCounter = 0;
class instrument {
  constructor(symbol, side, quantity, leverage) {
      this.symbol = symbol;
      this.side = side;
      this.quantity = quantity;
      this.currentTrade = false;
      this.leverage = leverage;
  }
}



export async function tradeFuture(signal) {
  console.info("signal ", signal);
  let NewLeverage = await setleverage(signal);
  console.log(NewLeverage["leverage"]);
  let Instrument = getInstrumentData(signal);
  if (NewLeverage["leverage"] == leverage) {
    //Now leverage is
    if (Instrument.currentTrade) {
      if (Instrument.side == signal) {
        console.log("Same Direction");
        return;
      }
      let res = await settlePreviousTrade(Instrument);
      console.log(res);
      if (res["symbol"] == Instrument.symbol) {
        //Now create new Order
        Instrument.currentTrade = false;
        let res = await CreateNewTrade(Instrument);
        if (res["symbol"] == Instrument.symbol) {
          Instrument.currentTrade = true;
          Instrument.side = signal;
          console.log(res);
          console.log('Flipped...');
          tradeCounter++;
        } else {
          console.log("Error While putting a trade...");
        }
      }
    } else {
      let res = await CreateNewTrade(Instrument);
      console.log(res);
      if (res["symbol"] == Instrument.symbol) {
        Instrument.currentTrade = true;
        Instrument.side = signal.side;
        tradeCounter++;
      } else {
        console.log("Error While putting a trade...");
      }
    }
  }
}

async function setleverage(instrument) {
  try {
    return await binance.futuresLeverage(instrument.symbol, instrument.leverage);
  } catch (error) {
    console.log(error);
  }
}

async function settlePreviousTrade(Instrument) {
  return new Promise(async (resolve, reject) => {
    if (Instrument.side == "long") {
      resolve(
        await binance.futuresMarketSell(Instrument.symbol, Instrument.quantity)
      );
    } else {
      resolve(
        await binance.futuresMarketBuy(Instrument.symbol, Instrument.quantity)
      );
    }
  });
}

async function CreateNewTrade(Instrument) {
  return new Promise(async (resolve, reject) => {
    if (Instrument.side == "long") {
      resolve(
        await binance.futuresMarketBuy(Instrument.symbol, Instrument.quantity)
      );
    } else {
      resolve(
        await binance.futuresMarketSell(Instrument.symbol, Instrument.quantity)
        
      );
    }
  });
}


export async function close(signal) {
  if (userData.currentTrade) {
    settlePreviousTrade();
    userData.currentTrade = false;
  } else {
    console.log('No Trade to close!');
  }
}



function getInstrumentData(request) {
  for (let i = 0; i < UD.length; i++) {

      if (UD[i].symbol == request.symbol) {
          return UD[i];
      }
  }
  let newInstrument = new instrument(request.symbol, request.side, request.quantity, request.currentTrade, request.leverage);
  UD.push(newInstrument);
  return newInstrument;
}