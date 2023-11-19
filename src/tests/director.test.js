const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test('GET /directors debe traer todos los directores', async() => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /directors debe crear un director', async() => {
    const director = {
        firstName: "Nombre",
        lastName: "Apellido",
        nationality: "Nacionalidad",
        image: "image.jpg",
        birthday: "2023-01-01"
    }
    const res = await request(app).post('/directors').send(director);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(director.name);
});

test('PUT /directors/:id debe actualizar un director', async() => {
    const director = {
        firstName: "Nuevo director"
    }
    const res = await request(app).put(`/directors/${id}`).send(director);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(director.name);
});

test('DELETE /directors/:id debe eliminar un actor', async() => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204);
});