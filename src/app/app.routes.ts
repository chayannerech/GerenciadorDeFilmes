import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: ListagemComponent },
  { path: 'filmes/:id', component: DetalhesComponent },
];
