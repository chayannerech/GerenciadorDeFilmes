import { formatDate, NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ResultadoBusca } from '../../models/busca';
import { CardFilmeComponent } from "../listagem/card-filme/card-filme.component";
import { BuscaRealizadaService } from '../../services/busca-realizada.service';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filme';

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink, CardFilmeComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent {
  public resultadoBusca?: ResultadoBusca;
  public maximoPaginasAlcancado: boolean;
  public buscaDesejada : string;

  @Output() onBuscar = new EventEmitter<string>();

  constructor(
    private filmeService: FilmeService,
    private route: ActivatedRoute,
    private buscaRealizada: BuscaRealizadaService,
    private router: Router,
  ) {
    this.maximoPaginasAlcancado = false;
    this.buscaDesejada = this.route.snapshot.params['query'];

    this.pesquisarFilme();
  }

  public pesquisarFilme( pagina: number = 1 ) {
    if (this.buscaRealizada != undefined)
      this.resultadoBusca == undefined;

    this.buscaRealizada.atualizarResultadoBusca(this.buscaDesejada.length > 1);
    this.maximoPaginasAlcancado = false;

    this.filmeService.pesquisarFilmes(this.buscaDesejada, pagina).subscribe((res) => {
      const novoResultado = this.mapearResultadoBusca(res);
      if (this.resultadoBusca == undefined)
        this.resultadoBusca = novoResultado;
      else
        this.resultadoBusca.filmes.push(...novoResultado.filmes);

      if (pagina >= novoResultado.quantidadePaginas)
        this.maximoPaginasAlcancado = true;

      this.resultadoBusca.pagina = novoResultado.pagina;
    });

    if (this.buscaDesejada) {
      this.onBuscar.emit(this.buscaDesejada);
    }
  }

  private mapearResultadoBusca(obj: any): ResultadoBusca {
    return {
      pagina: obj.page,
      quantidadePaginas: obj.total_pages,
      quantidadeResultados: obj.total_results,
      filmes: obj.results.map(this.mapearListagemFilme),
    };
  }

  private mapearListagemFilme(obj: any): Filme {
    let lancamento: string;

    if (obj.release_date == "")
      lancamento = "não informado";
    else
      lancamento = formatDate(obj.release_date, 'mediumDate', 'pt-BR');

    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: lancamento,
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);
    if (numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if (numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if (numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }

  public retornarPaginaPrincipal(): void {
    this.buscaRealizada.atualizarResultadoBusca(false);
    this.router.navigate(['/filmes']);
  }
}
