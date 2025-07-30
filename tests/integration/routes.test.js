const request = require('supertest');
const app = require('../../src/index');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const Task = require('../../src/models/task');

let taskId;

beforeEach(async () => {
  await Task.deleteMany({});
  const response = await request(app).post('/tasks').send({
    description: 'Task for test',
    state: false
  });
  taskId = response.body.id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

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

    describe('GET /tasks', () => {
        it('should retrieve all tasks', async() => {
            const response = await request(app)
                .get('/tasks')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
        });
    });

    describe('GET /tasks/completed', () => {
        it('should retrieve completed tasks', async() => {
            const response = await request(app)
                .get('/tasks/completed')
                .expect(200);

            expect(response.body).toBeInstanceOf(Array);
            response.body.forEach(task => {
                expect(task.state).toBe(true);
            });
        });
    });

    describe('GET /tasks/:id', () => {
        it('should retrieve a specific task by ID', async() => {
            const response = await request(app)
                .get(`/tasks/${taskId}`)
                .expect(200);

            expect(response.body).toHaveProperty('id', taskId);
        });

        it('should return 404 for non-existent task', async() => {
            const nonExistentId = 9999;
            await request(app)
                .get(`/tasks/${nonExistentId}`)
                .expect(404);
        });
    });

    describe('PUT /tasks/:id/complete', () => {
        it('should complete a task', async() => {
            const response = await request(app)
                .put(`/tasks/${taskId}/complete`)
                .expect(200);

            expect(response.body).toHaveProperty('id', taskId);
            expect(response.body.state).toBe(true);
        });

        it('should return 404 for non-existent task', async() => {
            const nonExistentId = 9999;
            await request(app)
                .put(`/tasks/${nonExistentId}/complete`)
                .expect(404);
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete a task', async() => {
            const response = await request(app)
                .delete(`/tasks/${taskId}`)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Task deleted successfully');
        });

        it('should return 404 for non-existent task', async() => {
            const nonExistentId = 9999;
            await request(app)
                .delete(`/tasks/${nonExistentId}`)
                .expect(404);
        });
    });
});