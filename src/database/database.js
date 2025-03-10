import fs from "node:fs/promises"

const DATABASE_PATH = new URL("db.json", import.meta.url)

export class Database {
  #database = {}

  constructor(){
    fs.readFile(DATABASE_PATH, "utf8")
    .then((data) => {
      this.#database = JSON.parse(data)
    })
    .catch(() => {
      this.#persist()
    })
  }

  #persist(){
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database))
  }

  insert(table, data){
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }

    this.#persist()
  }

  // filters (lista de querys da url)
  select(table, filters){
    let data = this.#database[table] ?? []

    if (filters) {
      data = data.filter((row) => {
        // entries -> separa a chave e o valor, na primeira posição tem o filtro e na segunda o valor do filtro 
        return Object.entries(filters)
        // const test = Object.entries(filters)
        // [[ 'status', 'closed' ]]
        // some() -> Testa se pelo menos 1 dos elementos no array passa no teste
        .some(([key, value]) => {
          // Se for true, retorna o elemento
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
        // console.log(test)
        // return row
      })
    }
    return data
  }

  update(table, id, data) {
    // Recupera o index da linha para saber o registro a ser alterado
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    // Verifica se encontrou o index do registro
    if (rowIndex > -1) {
      // Então repassa os valores do registro encontrado e sobrescreve com o conteúdo do data
      this.#database[table][rowIndex] = { 
        ...this.#database[table][rowIndex],
        // Assim ele reescreve em branco, caso o parâmetro não tenha sido passado 
        ...data 
      }
    }
  }

  delete(table, id){
    const rowIndex = this.#database[table].findIndex((row) => row.id === id)

    if (rowIndex > -1) {
      // 1 -> para remover somente a linha correspondente ao rowIndex
      this.#database[table].splice(rowIndex, 1)
      // Atualiza o arquivo depois de remover o item
      this.#persist()
    }
  }
}