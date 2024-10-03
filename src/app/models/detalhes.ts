import { MembroElenco } from "./membro-elenco";
import { VideoFilme } from "./video";

export interface DetalhesFilme {
  id: number;
  titulo: string;
  sinopse: string;
  lancamento: string;
  porcentagemNota: string;
  urlPoster: string;
  urlFundo: string;

  generos: string;

  videos: VideoFilme[];
  elencoPrincipal: MembroElenco[];
}
