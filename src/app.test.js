const request = require('supertest');
const app = require('./app');

const END_POINT = 'http://localhost:3000';

describe('App Test', () => {
    let currentPostId = 0;
    let postsIdToDelete = [];

    afterEach(async () => {
        for (const post of postsIdToDelete)
            await request(app)
                .delete(`/posts/${post}`)
    })

    it('valida a criação de um novo post e o retorno dele na listagem de todos os posts', async () => {
        await request(app)
            .get('/posts').expect((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toStrictEqual([]);
            });

        const post = { title: 'Test title', content: 'Test content' };

        await request(app)
            .post('/posts').send(post).expect((res) => {
                expect(res.status).toBe(201);
                expect(res.body).toStrictEqual({ id: currentPostId + 1, ...post });
            });

        await request(app)
            .get('/posts').expect((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toStrictEqual([{ id: currentPostId + 1, ...post }]);
            });

        currentPostId = 1;
    });

    it('valida a atualização do título e conteúdo de um post e apenas daquele post', async () => {
        const oldPost = { id: currentPostId, title: 'Test title', content: 'Test content' };
        const newPost = { title: 'Test title 2', content: 'Test content 2' }

        await request(app)
            .post('/posts').send(newPost).expect((res) => {
                expect(res.status).toBe(201);
                expect(res.body).toStrictEqual({ id: currentPostId + 1, ...newPost });
            });

        currentPostId = 2;

        await request(app)
            .get('/posts').expect((res) => {
                expect(res.status).toBe(200);
                expect(res.body[0]).toStrictEqual(oldPost);
                expect(res.body[1]).toStrictEqual({ id: currentPostId, ...newPost });
            });

        const updatedPost = { title: 'Test title updated', content: 'Test updated' };

        await request(app)
            .put(`/posts/${currentPostId}`).send(updatedPost).expect((res) => {
                expect(res.status).toBe(200);
                expect(res.body).toStrictEqual({ id: currentPostId, ...updatedPost });
            });

        await request(app)
            .get('/posts').expect((res) => {
                expect(res.status).toBe(200);
                expect(res.body[0]).toStrictEqual(oldPost);
                expect(res.body[1]).toStrictEqual({ id: currentPostId, ...updatedPost });
            });
    });

    it('valida se os posts que retornam na rota GET /posts retornam também individualmente pelo seu id na rota GET /posts/:id', async () => {
        const { body } = await request(app)
            .get('/posts');

        const allPosts = body;

        for (const post of allPosts) {
            await request(app)
                .get(`/posts/${post.id}`).expect((res) => {
                    expect(res.status).toBe(200);
                    expect(res.body).toStrictEqual(post);
                });
        }
    });
});