const request = require('supertest');
const server = require('../index');

describe('Operaciones CRUD de cafes', () => {


    it(' 1.- Devolver codigo 200 y el tipo de dato recibido es Array con al menos un objeto en Ruta GET/cafes', async () => {
        const response = await request(server).get('/cafes').send();
        const resStatus = response.statusCode;
        const Body = response.body;
        expect(resStatus).toBe(200);
        expect(Body.length).toBeGreaterThan(0);
        expect(Body).toBeInstanceOf(Array);

    });


    it(' 2.- Obtener codigo 404 al eliminar un cafe con una id inexistente', async () => {
        const jwt = 'token';
        const response = await request(server)
            .delete('/cafes/9')
            .set('authorization', jwt)
            .send();
        const resStatus = response.statusCode;
        expect(resStatus).toBe(404);
    });



    it(' 3.- Agregar nuevo café y devolver codigo 201 en Ruta POST/cafes', async () => {
        const Prueba = { id: 13, nombre: 'Café de Prueba' };
        const response = await request(server).post('/cafes').send(Prueba);
        const resStatus = response.statusCode;
        expect(resStatus).toBe(201);

    });



    it(' 4.- Devolver codigo 400 al enviar id en parametros distinto a id en payload en ruta PUT/cafes ', async () => {
        const modificado = { id: 2, nombre: 'Americano' };
        const response = await request(server)
            .put('/cafes/7')
            .send(modificado);
        const resStatus = response.statusCode;
        expect(resStatus).toBe(400);
    });
});