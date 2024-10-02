import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilmeService } from './services/filme.service';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { ListagemComponent } from "./components/listagem/listagem.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ListagemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.filmeService.selecionarFilmesPopulares().subscribe(f => {
      console.log(f);
    });
  }
}
