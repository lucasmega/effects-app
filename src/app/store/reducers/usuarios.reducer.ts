import { Usuario } from '../../models/usuario.model';
import * as fromUsuarios from '../actions';

export interface UsuariosState {
    users: Usuario[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: UsuariosState = {
    users: [],
    loaded: false,
    loading: true,
    error: null
};

export function usuariosReducer(state = estadoInicial, actions: fromUsuarios.usuariosAcciones): UsuariosState {
    switch(actions.type) {
        
        case fromUsuarios.CARGAR_USUARIOS:
            return {
                ...state,
                loaded: true,
                error: null
            };
            
        case fromUsuarios.CARGAR_USUARIOS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: [...actions.usuarios]
            };
            
        case fromUsuarios.CARGAR_USUARIOS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: actions.payload.status,
                    message: actions.payload.message,
                    url: actions.payload.url
                }
            };
        
        default:
            return state;
    } 
}