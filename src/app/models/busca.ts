import { Filme } from "./filme";

export interface ResultadoBusca {
  pagina: number;
  quantidadePaginas: number;
  quantidadeResultados: number;
  filmes: Filme[];
}
