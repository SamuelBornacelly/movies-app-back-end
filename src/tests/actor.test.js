const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test("GET /actors debe traer todos los actores", async() => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async() => {
    const actor = {
        firstName: "Nombre",
        lastName: "Apellido",
        nationality: "Nacionalidad",
        image: "image.jpg",
        birthday: "2023-01-01"
    }
    const res = await request(app).post('/actors').send(actor);
    // console.log(body);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(actor.name);
});

test("PUT /actors/:id debe actualizar un actor", async() =>{
    const actor = {
        firstName: "Actor actualizado"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(actor.name);
});

test("DELETE /actors/:id debe eliminar un actor", async() => {
    const res = await request(app).delete(`/actors/${id}`);
    expect(res.status).toBe(204)
});