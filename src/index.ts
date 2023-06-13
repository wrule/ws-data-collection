import 'global-agent/bootstrap';
import { WebsocketStream } from '@binance/connector';
import fs from 'fs';

let symbol = process.argv[process.argv.length - 1] || 'btcusdt';
let file_name = `${symbol}-${Number(new Date())}.csv`;

let cache = [NaN, NaN, NaN, NaN, NaN];
// define callbacks for different events
const callbacks = {
  open: () => console.log('Connected with Websocket server'),
  close: () => console.log('Disconnected with Websocket server'),
  message: (data: any) => {
    try {
      const obj = JSON.parse(data);
      if (obj.s) {
        const data = [Number(new Date()), Number(obj.a), Number(obj.A), Number(obj.b), Number(obj.B)];
        const list = data.map((item, index) => item === cache[index] ? '' : item);
        cache = data;
        let line = list.join(',');
        fs.appendFileSync(file_name, line + '\n');
        console.log(data.join(','));
      }
    } catch (e) {
      console.log(e);
    }
  },
}

const websocketStreamClient = new WebsocketStream({ callbacks });
// subscribe ticker stream
websocketStreamClient.bookTicker(symbol);
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 6000)
