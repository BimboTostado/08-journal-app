import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from "../../helpers/fileUpload";

cloudinary.config({ 
    cloud_name: 'dxiycspqq', 
    api_key: '837279376449761', 
    api_secret: 'dE0x8Mhd_KnDG3sktlPbGb_j5bc',
    secure: true
});

describe('Pruebas en fileUpload', () => {

    //test('Debe de agregar un archivo y retornar el URL', async(done) => {
        //const resp = await fetch('https://www.androidfreeware.net/img2/google-photos.jpg');
        //const blob = await resp.blob();

        //const file = new File([blob], 'foto.png');
        //const url = await fileUpload( file );

        //expect( typeof url ).toBe('string');
        //En el curso un flaco tiene el mismo error que yo, esta es la respuesta de un profesor:
        //El problema sucede en el server que emite bloqueo por CORS. 
        //No hay mucho que se pueda hacer en este caso, ya que "localhost" no tiene acceso al server. 
        //Puedes probar con otra URL.


        //borrar una imagen por su public id
        //const segments = url.split('/');
        //const publicId = segments[ segments.length-1 ].replace('.jpg','');

        //cloudinary.v2.api.delete_resources( publicId, {}, () => {
        //    done();
        //});
    //})

    test('Debe de retornar null', async() => {
        const file = new File([], 'foto.png');
        const url = await fileUpload( file );

        expect(  url ).toBe( null );
        
    })
})