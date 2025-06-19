import { Task, TaskStatus } from './task.model';

import { CreateTaskDto } from './DTO/create-task.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; // Assuming uuid is used for generating unique IDs, but not shown in the original code

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new Error(`Task with ID "${id}" not found`);
    }
    return found;
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    task.updatedAt = new Date();
    return task;
  }
}
