import { formatDate, NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DetalhesFilme } from "../../models/detalhes";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FilmeService } from "../../services/filme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MembroElenco } from "../../models/membro-elenco";
import { VideoFilme } from "../../models/video";
import { GeneroFilme } from "../../models/genero";
import { ElencoPrincipalComponent } from "../elenco-principal/elenco-principal.component";
import { LocalStorageService } from "../../services/local-storage.service";
import { FilmeFavorito } from "../../models/favoritos";

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [NgIf, NgClass, NgForOf, ElencoPrincipalComponent, RouterLink],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
})
export class DetalhesComponent implements OnInit {
  public detalhes?: DetalhesFilme;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (!id) {
      throw new Error(
        'Não foi possível obter informações sobre o filme requisitado.'
      );
    }

    this.filmeService.selecionarDetalhesFilmePorId(id).subscribe((f) => {
      this.detalhes = this.mapearDetalhesFilme(f);
    });
  }

  public alterarStatusFavorito(id: number) {
    if (!this.detalhes) return;

    if (this.localStorageService.favoritoJaExiste(id)) {
      this.detalhes.favorito = false;

      this.localStorageService.removerFavorito(id);
    } else {
      this.detalhes.favorito = true;

      const novoFavorito: FilmeFavorito = {
        id: id,
        titulo: this.detalhes.titulo,
        urlImagem: this.detalhes.urlPoster,
      };

      this.localStorageService.salvarFavorito(novoFavorito);
    }
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if (numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if (numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if (numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }

  private mapearDetalhesFilme(obj: any): DetalhesFilme {
    return {
      id: obj.id,
      titulo: obj.title,
      sinopse: obj.overview,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
      urlPoster: 'https://image.tmdb.org/t/p/w300' + obj.poster_path,
      urlFundo: 'https://image.tmdb.org/t/p/original' + obj.backdrop_path,

      generos: obj.genres
        .map(this.mapearGeneroFilme)
        .map((g: GeneroFilme) => g.nome)
        .join(', '),

      videos: obj.videos.results.map((v: any) => this.mapearVideoFilme(v)),
      elencoPrincipal: obj.credits.cast.map(this.mapearElencoFilme),
      favorito: this.localStorageService.favoritoJaExiste(obj.id)
    };
  }

  private mapearGeneroFilme(obj: any): GeneroFilme {
    return {
      id: obj.id,
      nome: obj.name,
    };
  }

  private mapearVideoFilme(obj: any): VideoFilme {
    return {
      id: obj.id,
      sourceUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + obj.key
      ),
    };
  }

  private mapearElencoFilme(obj: any): MembroElenco {
    return {
      id: obj.id,
      nome: obj.name,
      papel: obj.character,
      urlImagem: 'https://image.tmdb.org/t/p/w300' + obj.profile_path,
    };
  }

  public filmePossuiElenco(detalhes: DetalhesFilme) : boolean{
    console.log(detalhes.elencoPrincipal);
    return detalhes.videos[0] != null
  }
}
