import { DataSource, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }
}
