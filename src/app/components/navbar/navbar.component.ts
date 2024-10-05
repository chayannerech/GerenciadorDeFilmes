import { formatDate, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { BuscaComponent } from "../busca/busca.component";
import { ResultadoBusca } from '../../models/busca';
import { FilmeService } from '../../services/filme.service';
import { Filme } from '../../models/filme';
import { RouterLink } from '@angular/router';
import { BuscaRealizadaService } from '../../services/busca-realizada.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, BuscaComponent, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements AfterViewInit {
  public seletorVisivel = false;
  public pesquisaVisivel: boolean = false;
  public maximoPaginasAlcancado: boolean;
  public resultadoBusca?: ResultadoBusca;

  @ViewChild('adicionar', { static: false }) adicionar!: ElementRef;
  @ViewChild('pesquisar', { static: false }) pesquisar!: ElementRef;
  @Output() onBuscar = new EventEmitter<string>();


  constructor (
    private filmeService: FilmeService,
    private renderer: Renderer2,
    private cdref: ChangeDetectorRef,
    private elementRef: ElementRef,
    private buscaRealizada: BuscaRealizadaService,
  ) {
    this.maximoPaginasAlcancado = false;
  }

  ngAfterViewInit() {
    this.cdref.detectChanges();

    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedBotao = this.elementRef.nativeElement.querySelector('#btn-adicionar')?.contains(event.target);
      const clickedLupa = this.elementRef.nativeElement.querySelector('#btn-pesquisar')?.contains(event.target);

      const clickedInsideDropdown = this.adicionar?.nativeElement.contains(event.target);
      const clickedInsidePesquisa = this.pesquisar?.nativeElement.contains(event.target);

      console.log(clickedInsidePesquisa);

      if (!clickedInsideDropdown && !clickedBotao) {
        this.ocultarOpcoesDeAdicionar();
      }

      if (!clickedInsidePesquisa && !clickedLupa) {
        this.ocultarBarraPesquisa();
      }
    });
  }

  mostrarOpcoesDeAdicionar() {
    this.seletorVisivel = !this.seletorVisivel;
  }

  ocultarOpcoesDeAdicionar() {
    this.seletorVisivel = false;
  }

  mostrarBarraPesquisa() {
    this.pesquisaVisivel = !this.pesquisaVisivel;
  }

  ocultarBarraPesquisa() {
    this.pesquisaVisivel = false;
  }

  pesquisarFilme( busca: string, pagina: number = 1 ) {
    if (this.buscaRealizada != undefined) {
      this.resultadoBusca == undefined;
      console.log("oi");
    }

    this.buscaRealizada.atualizarResultadoBusca(busca.length > 1);

    if (busca.length < 1) return;

    this.maximoPaginasAlcancado = false;

    this.filmeService.pesquisarFilmes(busca, pagina).subscribe((res) => {
      const novoResultado = this.mapearResultadoBusca(res);

      if (this.resultadoBusca == undefined) {
        this.resultadoBusca = novoResultado;

        if (pagina >= novoResultado.quantidadePaginas) {
          this.maximoPaginasAlcancado = true;
        }
        this.resultadoBusca.pagina = novoResultado.pagina;
      }
      else {
        if (pagina >= this.resultadoBusca.quantidadePaginas) {
          console.log(this.resultadoBusca.quantidadePaginas);
          this.maximoPaginasAlcancado = true;
        }
        this.resultadoBusca.pagina = novoResultado.pagina;
        this.resultadoBusca.filmes.push(...novoResultado.filmes);
      }
    });

    if (busca) {
      this.onBuscar.emit(busca);
    }
  }

  public limpaPesquisa () {
    this.resultadoBusca = undefined;
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
    return {
      id: obj.id,
      titulo: obj.title,
      lancamento: formatDate(obj.release_date, 'mediumDate', 'pt-BR'),
      urlImagem: 'https://image.tmdb.org/t/p/w300/' + obj.poster_path,
      porcentagemNota: (obj.vote_average * 10).toFixed(0),
    };
  }
}
