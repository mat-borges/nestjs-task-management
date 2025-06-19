import { Task, TaskStatus } from './task.model';

import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid'; // Assuming uuid is used for generating unique IDs, but not shown in the original code

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description: string): Task {
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
}
