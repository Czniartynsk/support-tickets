import http from "node:http"

import { jsonHandler } from "./middleware/jsonHandler.js"
import { routeHandler } from "./middleware/routeHandler.js"

async function listener(request, response){
  await jsonHandler(request, response)
  routeHandler(request, response)
}

http.createServer(listener).listen(3333)