import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startUploading } from '../../actions/notes';
import { fileUpload } from '../../helpers/fileUpload';
import { db } from '../../firebase/firebase-config';

jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn( () => {
        return 'https://hola-mundo.com/cosa.jpg'
    } )
}));

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
//global.scrollTo = jest.fn(); 
let store = mockStore(initState);

describe('Pruebas en el componente notes parte 2', () => {

    beforeEach( () => {
        store = mockStore(initState)
    } );

    test('startUploading => Debe de actualizar el uploading del entry', async() => {

        /* const file = new File([], 'foto.png');

        await store.dispatch( startUploading( file ) );

        const docRef = await db.doc(`/testing/journal/notes/${ initState.notes.id }`).get();

        expect( docRef.data().url ).toBe( 'https://hola-mundo.com/cosa.jpg' ); */
    })
})