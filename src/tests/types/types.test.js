import { types } from "../../types/types"

describe('Pruebas con nuestros tipos', () =>{

    test('Debe de tener estos types', () =>{
        expect( types ).toEqual( {
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdate: '[Notes] Note update',
            notesFileUrl: '[Notes] Update image url',
            notesDelete: '[Notes] Deleted note',
            notesLogoutCleaning: '[Notes] Logout cleaning',
        } );
    })

})