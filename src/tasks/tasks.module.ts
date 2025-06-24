import { AuthModule } from 'src/auth/auth.module';
import { Module } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  providers: [TasksService, TaskRepository],
  controllers: [TasksController],
})
export class TasksModule {}
