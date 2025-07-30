const request = require('supertest');
const app = require('../../src/index');

describe('Routes', () => {
    describe('POST /tasks', () => {
        it('should create a new task', async() => {
            const newTask = {
                description: 'New task description',
                state: false
            };
            const response = await request(app)
                .post('/tasks')
                .send(newTask)
                .expect(201);

            expect(response.body).toMatchObject({
                ...newTask,
                description: expect.any(String),
                state: false
            });
        });
    });
});