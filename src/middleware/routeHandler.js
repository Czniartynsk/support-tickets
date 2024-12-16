import { Database } from "../database/database.js";
import { routes } from "../routes/index.js";

const database = new Database()

export function routeHandler(request, response){
  const route = routes.find((route) => {
    return route.method === request.method && route.path === request.url
  })

  if(route){
    return route.controller({ request, response })
  }

  return response.writeHead(404).end()
}