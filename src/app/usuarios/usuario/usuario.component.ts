import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';

import { AppState } from '../../store/app.reducer';
import { CargarUsuario } from '../../store/actions';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  
  public user: Usuario;
  public loading: boolean;
  public error: any;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit() {
    
    this.store.select('usuario').subscribe(data => {
      this.user = data.user;
      this.loading = data.loading;
      this.error = data.error;
    });
    
    this.router.params.subscribe(params => this.store.dispatch(new CargarUsuario(params['id'])));
  }
  
}
