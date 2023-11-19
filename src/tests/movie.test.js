const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test('GET /movies debe traer todas las películas', async() => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe crear una película', async() => {
    const movie = {
        name: "Película",
        image: "imagen.jpg",
        synopsis: "Sinopsis",
        releaseYear: 2023
    }
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201)
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test('PUT /movies/:id debe actualizar una película', async() => {
    const movie = {
        name: "Película actualizada"
    }
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test('POST /movies/:id/actors debe insertar un actor en una película', async() => {
    const actor = await Actor.create({
        firstName: "Nombre",
        lastName: "Apellido",
        nationality: "Nacionalidad",
        image: "image.jpg",
        birthday: "2023-01-01"
    });
    const res = await request(app)
        .post(`/movies/${id}/actors`)
        .send([actor.id]);
        await actor.destroy();
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
});

test('POST /movies/:id/directors debe insertar un director en una película', async() => {
    const director = await Director.create({
        firstName: "Nombre",
        lastName: "Apellido",
        nationality: "Nacionalidad",
        image: "image.jpg",
        birthday: "2023-01-01"
    });
    const res = await request(app)
        .post(`/movies/${id}/directors`)
        .send([director.id]);
        await director.destroy();
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
});

test('POST /movies/:id/genres debe insertar un género en una película', async() => {
    const genre = await Genre.create({
        name: "Género"
    });
    const res = await request(app)
        .post(`/movies/${id}/genres`)
        .send([genre.id]);
        await genre.destroy();
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
});

test('DELETE /movies/:id debe eliminar una película', async() => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});