import { NgForOf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilmeFavorito } from '../../models/favoritos';

@Component({
  selector: 'app-filmes-favoritos',
  standalone: true,
  imports: [RouterLink, NgForOf],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})
export class FilmesFavoritosComponent {
  @Input({ required: true }) filmes!: FilmeFavorito[];
}
