import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filmes/filme';
import { FilmeService } from '../../services/filme.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})
export class ListagemComponent implements OnInit{
  public filmes: Filme[];

  constructor( private filmeApiService: FilmeService )
  {
    this.filmes = [];
  }

  ngOnInit(): void {
    this.obterFilmes;
  }

  private obterFilmes() {
    this.filmeApiService
      .selecionarFilmesPopulares()
      .subscribe((res) => {
        const arrayResultados = res.results as any[];

        for (let resultado of arrayResultados) {
          this.filmeApiService
            .selecionarDetalhesPorUrl(resultado.url)
            .subscribe((objDetalhes: any) => {
              const filme = this.mapearFilme(objDetalhes);

              this.filmes.push(filme);
            });
        }

        this.filmes.sort((f) => f.id);
      })
  }
  private mapearFilme(obj: any): Filme {
    return {
      id: obj.id,
      nome: converterParaTitleCase(obj.title),
      urlSprite: obj.poster_path,
    };
  }
}
