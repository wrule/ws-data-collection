import 'global-agent/bootstrap';

import { Console } from "console"

const { WebsocketStream } = require('@binance/connector')
const logger = new Console({ stdout: process.stdout, stderr: process.stderr })

// define callbacks for different events
const callbacks = {
  open: () => logger.debug('Connected with Websocket server'),
  close: () => logger.debug('Disconnected with Websocket server'),
  message: (data: any) => {
    const obj = JSON.parse(data);
    console.log(obj.a, obj.A, obj.b, obj.B);
  },
}

const websocketStreamClient = new WebsocketStream({ logger, callbacks })
// subscribe ticker stream
websocketStreamClient.ticker('btcusdt')
// close websocket stream
// setTimeout(() => websocketStreamClient.disconnect(), 6000)
