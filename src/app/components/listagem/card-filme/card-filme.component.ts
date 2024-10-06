import { Component, Input } from '@angular/core';
import { Filme } from '../../../models/filme';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-filme',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './card-filme.component.html',
  styleUrl: './card-filme.component.scss'
})

export class CardFilmeComponent {
  @Input({ required: true}) filme?: Filme;

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);

    if (numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if (numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if (numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }
}
