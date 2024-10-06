import { Component, Input, input } from '@angular/core';
import { MembroElenco } from '../../../models/membro-elenco';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-elenco-principal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './elenco-principal.component.html',
  styleUrl: './elenco-principal.component.scss'
})
export class ElencoPrincipalComponent {
  @Input({ required: true}) membro?: MembroElenco;
}
