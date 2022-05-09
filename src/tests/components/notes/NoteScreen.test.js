import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";

const { mount } = require("enzyme");
const { Provider } = require("react-redux");
const { NoteScreen } = require("../../../components/notes/NoteScreen");
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}) );

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth:{
        uid:'1',
        name:'AG'
    },
    ui:{
        loading: false,
        msgError: null
    },
    notes:{
        notes: [],
        active: {
            id: 1234,
            title: 'Hello',
            body: 'World!',
            date: 0
        }
    }
};

let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store }>
        <NoteScreen /> 
    </Provider>
);

describe('Pruebas en el componente <NoteScreen />', () => {

    test('Debe de mostrar correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hello again'
            }
        });

        expect( activeNote ).toHaveBeenLastCalledWith( 1234, { body: 'World!', title: 'Hello again', id: 1234,date: 0 } );         
    })
})