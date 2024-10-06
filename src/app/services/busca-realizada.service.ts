import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuscaRealizadaService {
  private buscaRealizada = new BehaviorSubject<boolean>(false);

  buscaRealizada$ = this.buscaRealizada.asObservable();

  public atualizarResultadoBusca(realizada: boolean) {
    this.buscaRealizada.next(realizada);
  }
}
