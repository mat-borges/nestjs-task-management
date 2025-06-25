import { NotFoundException } from '@nestjs/common';
import { TaskRepository } from './tasks.repository';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from '@nestjs/testing';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  id: 'userId',
  username: 'testuser',
  password: 'testpassword',
  createdAt: new Date(),
  updatedAt: new Date(),
  tasks: [],
};

describe('TaskService', () => {
  let taskService: TasksService;
  let taskRepository: ReturnType<typeof mockTaskRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();

    taskService = module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('should call taskRepository.getTasks and return the result', async () => {
      taskRepository.getTasks.mockResolvedValue([
        { id: '1', title: 'Test Task', description: 'Test Description' },
      ]);
      const result = await taskRepository.getTasks({}, mockUser);
      expect(result).toEqual([
        { id: '1', title: 'Test Task', description: 'Test Description' },
      ]);
    });
  });

  describe('getTaskById', () => {
    it('should call taskRepository.getTaskById and return the result', async () => {
      const mockTask = {
        id: 'someId',
        title: 'Test Task',
        description: 'Test Description',
        status: TaskStatus.OPEN,
      };

      taskRepository.findOne.mockResolvedValue(mockTask);
      const result = await taskService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('should throw an error if task is not found', async () => {
      taskRepository.findOne.mockResolvedValue(null);
      await expect(
        taskService.getTaskById('nonExistentId', mockUser),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
