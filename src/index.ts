import 'global-agent/bootstrap';

import { WebsocketStream } from '@binance/connector';

// define callbacks for different events
const callbacks = {
  open: () => console.log('Connected with Websocket server'),
  close: () => console.log('Disconnected with Websocket server'),
  message: (data: any) => {
    try {
      const obj = JSON.parse(data);
      if (obj.s) {
        const list = [
          Number(new Date()),
          Number(obj.b), Number(obj.B), Number(obj.a), Number(obj.A),
        ];
        console.log(JSON.stringify(list) + ',');
      }
    } catch (e) {
      console.log(e);
    }
  },
}

const websocketStreamClient = new WebsocketStream({ callbacks });
// subscribe ticker stream
websocketStreamClient.bookTicker('btcusdt');
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 6000)
