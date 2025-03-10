export function parseRoutePath(path){
  // :() -> Para pegar parâmetro não nomeado caso tenha.
  const routeParametersRegex = /:([a-zA-Z]+)/g

  /* () -> para criar o grupo.
    ? -> para dizer que está começando.
    <$1> -> Primeiro grupo, é o grupo de cima.
    -_ -> Informa que podem ser maiúsculas ou minúsculas.
  */
  const params = path.replaceAll(routeParametersRegex, "(?<$1>[a-z0-9-_]+)")

  /*
  Cria nova expressão regular fazendo uma interpolação.
  Cria outro grupo (?<query>\\?)
  (.*) -> Pega qualquer coisa que venha depois da interrogação.
  ?$ -> finalizando a expressão.
  */
  const pathRegex = new RegExp(`^${params}(?<query>\\?(.*))?$`)

  return pathRegex
}