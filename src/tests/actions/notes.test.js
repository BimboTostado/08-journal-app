/**

* @jest-environment node

*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoadingNotes, startNewNote, startSaveNote } from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid:'testing'
    },
    notes:{
        active: {
            id: 'FPEWpsMXi2vLHOiJdCfA',
            title: 'Hello',
            body: 'World!'
        }
    }
};

let store = mockStore(initState);

describe('Pruebas en notes-actions', () => {

    beforeEach( () => {
        store = mockStore(initState)
    } );

    test('Debe de crear una nueva nota => startNewNote', async() => {
        await store.dispatch( startNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ 
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
         });
         expect( actions[1] ).toEqual({
             type: types.notesAddNew,
             payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
         });

         const docId = actions[0].payload.id;
         await db.doc(`/testing/journal/notes/${ docId }`).delete();
    });

    test('startLoadingNotes => debe cargar las notas', async() => {

        await store.dispatch( startLoadingNotes( 'testing' ) );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        }

        expect( actions[0].payload[0] ).toMatchObject( expected );
    });

    test('startSaveNote => debe de actualizar la nota', async() => {

        const note = {
            id:'HjSTbE6ihz6uLLwK4OYA',
            title: 'Un titulo',
            body: 'Un cuerpo'
        }

        await store.dispatch( startSaveNote( note ) );
        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdate );

        const docRef = await db.doc(`/testing/journal/notes/${ note.id }`).get();

        expect( docRef.data().title ).toEqual( note.title );
    });
})