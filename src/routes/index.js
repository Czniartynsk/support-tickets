import { parseRoutePath } from "../utils/parseRoutePath.js";
import { tickets } from "./tickets.js";

// Faz um .map() para percorrer cada rota
export const routes = [...tickets].map((route) => ({
  // Espalha o conteúdo que tem dentro de cada rota, sobrescrevendo o path com o método regex.
  ...route,
  // Sobrescreve o path com o método que que acabamos de criar com regex.
  path: parseRoutePath(route.path),
}))