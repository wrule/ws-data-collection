import 'global-agent/bootstrap';

import { WebsocketStream } from '@binance/connector';

// define callbacks for different events
const callbacks = {
  open: () => console.log('Connected with Websocket server'),
  close: () => console.log('Disconnected with Websocket server'),
  message: (data: any) => {
    const obj = JSON.parse(data);
    console.log(obj.a, obj.A, obj.b, obj.B);
  },
}

const websocketStreamClient = new WebsocketStream({ callbacks });
// subscribe ticker stream
websocketStreamClient.ticker('btcusdt');
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 6000)
