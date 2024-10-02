import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilmeService } from './services/filme.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListagemComponent } from "./components/listagem/listagem.component";

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePtBr from '@angular/common/locales/pt';
import { FooterComponent } from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListagemComponent, FooterComponent],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private filmeService: FilmeService) {
    registerLocaleData(localePtBr);
  }
}
