import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filmes/filme';
import { FilmeService } from '../../services/filme.service';
import { converterParaTitleCase } from '../../util/converter-para-title-case';
import { formatDate, NgForOf, NgIf } from '@angular/common';
import { CardFilmeComponent } from './card-filme/card-filme.component';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, CardFilmeComponent, NgIf],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})

export class ListagemComponent implements OnInit{
  public filmes: Filme[];
  public carregandoListagem: boolean;
  private pagina: number;


  constructor( private filmeApiService: FilmeService )
  {
    this.filmes = [];
    this.pagina = 1;
    this.carregandoListagem = false;
  }

  ngOnInit(): void {
    this.obterFilmesPopulares();
  }

  protected obterFilmesPopulares() {
    this.carregandoListagem = true;

    this.filmeApiService
      .selecionarFilmesPopulares(this.pagina)
      .subscribe((dadosDosFilmes) => {
        const resultados = dadosDosFilmes.results as any[];
        const filmesMapeados = resultados.map(this.mapearFilme)

        this.filmes.push(...filmesMapeados);
        this.pagina++;
        this.carregandoListagem = false;

        this.filmes.sort((filme) => filme.id);
      })
  }
  private mapearFilme(obj: any): Filme {
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }
}
