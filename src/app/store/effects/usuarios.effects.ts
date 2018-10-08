import { Injectable } from "@angular/core";
import { Actions, Effect } from '@ngrx/effects';
import * as usuariosActions from  '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from "rxjs/operators";
import { UsuarioService } from "../../services/usuario.service";

@Injectable()
export class usuariosEffects {
    
    constructor(private actions$: Actions, public usuarioService: UsuarioService) {}
    
    //1
    // @Effect({ dispatch: false })
    // cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS).pipe(map(action => {
    //     console.log('[effects => (actions)]', action);
    //     return action;
    // }))
    
    //2
    @Effect()
    cargarUsuarios$ = this.actions$.ofType(usuariosActions.CARGAR_USUARIOS).pipe(switchMap( () => {
        return this.usuarioService.getUsers().pipe(
            map(users => new usuariosActions.CargarUsuariosSuccess(users)), 
            catchError( error => of(new usuariosActions.CargarUsuariosFail(error))))
    }));
}