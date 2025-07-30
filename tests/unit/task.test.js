const Task = require('../../src/models/task');

describe('Task Model', () => {
  describe('create', () => {
    it('should create a task with valid data', () => {
      const taskData = {
        description: 'Test description',
        state: false
      };

      const task = new Task(taskData);
      expect(task.description).toBe(taskData.description);
      expect(task.state).toBe(false);
    });
  });
});

