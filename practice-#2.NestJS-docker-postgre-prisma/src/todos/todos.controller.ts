import { Body, Controller, Get, Post } from '@nestjs/common';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async getAll() {
    return this.todosService.getAll();
  }

  @Post()
  async create(@Body('title') title: string) {
    return this.todosService.create(title);
  }
}
