import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ResultadoBusca } from '../../models/busca';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements AfterViewInit {
  public seletorVisivel: boolean;
  public pesquisaVisivel: boolean;
  public maximoPaginasAlcancado: boolean;
  public resultadoBusca?: ResultadoBusca;
  public mostrarMenuNavbar: boolean;

  @ViewChild('adicionar', { static: false }) adicionar!: ElementRef;
  @ViewChild('pesquisar', { static: false }) pesquisar!: ElementRef;
  @Output() onBuscar = new EventEmitter<string>();


  constructor (
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.seletorVisivel = false;
    this.pesquisaVisivel = false;
    this.maximoPaginasAlcancado = false;
    this.mostrarMenuNavbar = false;
  }

  ngAfterViewInit() {
    this.renderer.listen('document', 'click', (event: Event) => {
      const clickedBotao = this.elementRef.nativeElement.querySelector('#btn-adicionar')?.contains(event.target);
      const clickedLupa = this.elementRef.nativeElement.querySelector('#btn-pesquisar')?.contains(event.target);

      const clickedInsideDropdown = this.adicionar?.nativeElement.contains(event.target);
      const clickedInsidePesquisa = this.pesquisar?.nativeElement.contains(event.target);

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

  pesquisarFilme( busca: string ) {
    if (busca.length == 0) {
      this.toastrService.info (
        'Informe o título que deseja buscar',
        'Aviso'
      )
      return;
    }

    if (this.router.url.startsWith('/busca')) {
      this.router.navigate(['/busca', busca])
        .then(() => {
          window.location.reload();
        });
    } else {
      this.router.navigate(['/busca', busca]);
      this.mostrarMenuNavbar = false;
    }
  }
}
