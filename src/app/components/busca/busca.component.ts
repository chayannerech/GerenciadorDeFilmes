import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ResultadoBusca } from '../../models/busca';
import { CardFilmeComponent } from "../listagem/card-filme/card-filme.component";

@Component({
  selector: 'app-busca',
  standalone: true,
  imports: [NgIf, NgForOf, NgClass, RouterLink, CardFilmeComponent],
  templateUrl: './busca.component.html',
  styleUrl: './busca.component.scss',
})
export class BuscaComponent {
  @Input({ required: true}) resultadoBusca?: ResultadoBusca;

  public mapearCorDaNota(porcentagemNota: string): string {
    const numeroNota = Number(porcentagemNota);
    if (numeroNota > 0 && numeroNota <= 30) return 'app-borda-nota-mais-baixa';
    else if (numeroNota > 30 && numeroNota <= 50) return 'app-borda-nota-baixa';
    else if (numeroNota > 50 && numeroNota <= 75) return 'app-borda-nota-media';
    else return 'app-borda-nota-alta';
  }
}
