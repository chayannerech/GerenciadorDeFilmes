import { Component, OnInit } from '@angular/core';
import { Filme } from '../../models/filme';
import { FilmeService } from '../../services/filme.service';
import { formatDate, NgForOf, NgIf } from '@angular/common';
import { CardFilmeComponent } from './card-filme/card-filme.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { FilmesFavoritosComponent } from '../favoritos/favoritos.component';
import { FilmeFavorito } from '../../models/favoritos';
import { BuscaRealizadaService } from '../../services/busca-realizada.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [NgForOf, CardFilmeComponent, NgIf, FilmesFavoritosComponent, RouterLink],
  templateUrl: './listagem.component.html',
  styleUrl: './listagem.component.scss'
})

export class ListagemComponent implements OnInit{
  public filmes: Filme[];
  public filmesFavoritos: FilmeFavorito[];
  public carregandoListagem: boolean;
  private pagina: number;
  public buscaRealizada: boolean;

  constructor( private filmeApiService: FilmeService, private localStorageService: LocalStorageService, private buscaRealizadaService: BuscaRealizadaService )
  {
    this.filmes = [];
    this.filmesFavoritos = [];
    this.pagina = 1;
    this.carregandoListagem = false;
    this.buscaRealizada = false;
  }

  ngOnInit(): void {
    this.buscaRealizadaService.buscaRealizada$.subscribe(realizada => {
      this.buscaRealizada = realizada;
    });

    this.obterFilmesPopulares();
    this.filmesFavoritos = this.localStorageService.obterFavoritos();
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
