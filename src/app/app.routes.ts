import { Routes } from '@angular/router';
import { ListagemComponent } from './components/listagem/listagem.component';
import { DetalhesComponent } from './components/detalhes/detalhes.component';
import { BuscaComponent } from './components/busca/busca.component';
import { FilmesFavoritosComponent } from './components/favoritos/favoritos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'filmes', pathMatch: 'full' },
  { path: 'filmes', component: ListagemComponent },
  { path: 'favoritos', component: FilmesFavoritosComponent },
  { path: 'filmes/:id', component: DetalhesComponent },
  { path: 'busca/:query', component: BuscaComponent },
];
