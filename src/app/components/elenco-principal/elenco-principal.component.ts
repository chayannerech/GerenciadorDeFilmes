import { Component, Input, input } from '@angular/core';
import { MembroElenco } from '../../models/membro-elenco';

@Component({
  selector: 'app-elenco-principal',
  standalone: true,
  imports: [],
  templateUrl: './elenco-principal.component.html',
  styleUrl: './elenco-principal.component.scss'
})
export class ElencoPrincipalComponent {
  @Input({ required: true}) membro?: MembroElenco;
}
