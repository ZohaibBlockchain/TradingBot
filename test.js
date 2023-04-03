var UD = [];




const userData = {
    symbol: "",
    side: "",
    quantity: 0.002,
    currentTrade: false,
    leverage : 5,
  };
  



class instrument {
    constructor(symbol, side, quantity, currentTrade, leverage) {
        this.symbol = symbol;
        this.side = side;
        this.quantity = quantity;
        this.currentTrade = currentTrade;
        this.leverage = leverage;
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



instrumentData({ symbol: 'BTCUSD', side: 'long', quantity: 1, currentTrade: true, leverage: 5 });
instrumentData({ symbol: 'BTsdCUSD', side: 'long', quantity: 1, currentTrade: true, leverage: 5 });
console.log(UD.length);
