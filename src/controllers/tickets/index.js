/**
 * CREATE - criar
 * INDEX - listar
 * UPDATE - atualizar
 * REMOVE - remover
 * SHOW - para exibir um único registro
 */

export function index({ request, response, database }){
  const { status } = request.query

  // Se existe filtro de status, passa como objeto para os filtros, se não passa nulo
  const filters = status ? { status } : null

  const tickets = database.select("tickets", filters)

  return response.end(JSON.stringify(tickets))
}