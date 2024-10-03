import { formatDate, NgClass, NgForOf, NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { DetalhesFilme } from "../../models/detalhes";
import { ActivatedRoute } from "@angular/router";
import { FilmeService } from "../../services/filme.service";
import { DomSanitizer } from "@angular/platform-browser";
import { MembroElenco } from "../../models/membro-elenco";
import { VideoFilme } from "../../models/video";
import { GeneroFilme } from "../../models/genero";
import { ElencoPrincipalComponent } from "../elenco-principal/elenco-principal.component";

@Component({
  selector: 'app-detalhes',
  standalone: true,
  imports: [NgIf, NgClass, NgForOf, ElencoPrincipalComponent],
  templateUrl: './detalhes.component.html',
  styleUrl: './detalhes.component.scss',
})
export class DetalhesComponent implements OnInit {
  public detalhes?: DetalhesFilme;

  constructor(
    private route: ActivatedRoute,
    private filmeService: FilmeService,
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
}
