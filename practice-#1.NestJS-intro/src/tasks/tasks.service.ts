import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';

export interface Task {
  id: number;
  title: string;
  description?: string;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: number): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  create(dto: CreateTaskDto): Task {
    const newTaks: Task = {
      id: this.idCounter++,
      title: dto.title,
      description: dto.description,
    };
    this.tasks.push(newTaks);
    return newTaks;
  }
}
