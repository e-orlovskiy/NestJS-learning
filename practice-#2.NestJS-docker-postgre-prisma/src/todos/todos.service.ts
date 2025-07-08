import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  getAll(): Promise<any[]> {
    return this.prisma.todo.findMany();
  }

  create(title: string): Promise<any> {
    return this.prisma.todo.create({
      data: { title },
    });
  }
}
