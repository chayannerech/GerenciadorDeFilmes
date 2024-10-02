import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent implements AfterViewInit {
  seletorVisivel = false;
  navbarTogglerVisivel = true;
  screenWidth!: number;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.verificaTamanhoDaTela();

    this.renderer.listen('window', 'resize', () => {
      this.verificaTamanhoDaTela();
    });
  }

  verificaTamanhoDaTela() {
    this.screenWidth = window.innerWidth;
    console.log(this.screenWidth);
    if (this.screenWidth > 992) {
      this.navbarTogglerVisivel = false;
    } else {
      this.navbarTogglerVisivel = true;
    }
  }

  mostrarDropdown() {
    this.seletorVisivel = !this.seletorVisivel;
  }
  ocultarDropdown() {
    this.seletorVisivel = false;
  }
}
