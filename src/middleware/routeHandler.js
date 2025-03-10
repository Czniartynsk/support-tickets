import { Database } from "../database/database.js";
import { routes } from "../routes/index.js";
import { extractQueryParams } from "../utils/extractQueryParams.js"

const database = new Database()

export function routeHandler(request, response){
  const route = routes.find((route) => {
    return route.method === request.method && route.path.test(request.url)
  })

  if(route){
    // Verifica se o request.url coincide com o route.path (expressão regex)
    const routeParams = request.url.match(route.path)

    // desestrutura a query que vem do routeParams.groups -> É retornado somente o parâmetro ?status=closed
    const { query, ...params } = routeParams.groups

    // Se existe parâmetro, extrai, se não retorna objeto vazio
    request.query = query ? extractQueryParams(query) : {}
    request.params = params

    return route.controller({ request, response, database })
  }

  return response.writeHead(404).end()
}
