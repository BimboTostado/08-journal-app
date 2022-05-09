import configureStore from 'redux-mock-store';
import thunk from "redux-thunk";
import { activeNote } from '../../../actions/notes';

const { mount } = require("enzyme");
const { Provider } = require("react-redux");
const { JournalEntry } = require("../../../components/journal/JournalEntry");

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore( initState );
store.dispatch = jest.fn();

const note = {
    id: 10,
    date: 0,
    title: 'Hello',
    body: 'World!',
    url: 'http://someplace.com/picture.jpg'
}

const wrapper = mount( 
    <Provider store={ store }>
        <JournalEntry { ...note } />
    </Provider>
)

describe('Pruebas en el componente <JournalEntry />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect( store.dispatch ).toHaveBeenCalledWith( activeNote( note.id, { ...note } ) );
    })
})