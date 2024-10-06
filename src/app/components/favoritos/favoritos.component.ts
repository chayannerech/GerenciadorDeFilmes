import { NgForOf, NgIf } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilmeFavorito } from '../../models/favoritos';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink, NgForOf, NgIf],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.scss',
})

export class FilmesFavoritosComponent {
  @Input({ required: true }) filmes!: FilmeFavorito[];
  @ViewChild('carouselContainer', { static: false }) carouselContainer?: ElementRef;

  scrollLeft(): void {
    this.carouselContainer?.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.carouselContainer?.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
