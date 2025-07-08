# Тема.NestJS

## 📦 Что такое NestJS?

**NestJS** - это фреймворк для написания серверных приложений на TypeScript (и JavaScript), построенный поверх `express` (или `fastify`), и использующий архитектуру модулей, контроллеров, сервисов и декораторов.

Его цель - сделать серверное приложение более структурированным и масштабируемым.

## ⚙️ Создание нового проекта

```bash
npm i -g @nestjs/cli
nest new project-name
```

## 📁 Структура проекта

```bash
src/
├── app.controller.ts
├── app.module.ts         # Корневой модуль
├── app.service.ts        # Общий сервис
├── main.ts               # Точка входа
```

## 🧱 Архитектура NestJS (основа)

**Модуль** (Module) - группирует функциональность, используется для организации кода по логическим блокам.

```ts
@Module({
	controllers: [TasksController],
	providers: [TasksService]
})
export class TasksModule {}
```

**Контроллер** (Controller) - отвечает за обработку HTTP-запросов (GET, POST, PUT, DELETE). Обращается к сервису.

```ts
@Controller('tasks')
export class TasksController {
	@Get()
	getAllTasks() {
		return ['task1', 'task2']
	}
}
```

**Сервис** (Service) - содержит бизнес-логику (данные, алгоритмы, взаимодействие с БД).

```ts
@Injectable()
export class TasksService {
	getTasks() {
		return ['task1', 'task2']
	}
}
```

Обращается к сервису.

| Module     | Функционал                         |
| ---------- | ---------------------------------- |
| Controller | Обрабатывает HTTP-запросы          |
| Service    | Логика и работа с данными          |
| DTO        | Типы данных (Data Transfer Object) |
| Pipe       | Обработка и валидация данных       |
| Provider   | Внедряемые зависимости             |

## ✏️ DTO - описание структуры данных

Пример: `CreateTaskDto`

```ts
export class CreateTaskDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	title: string

	@IsOptional()
	@IsString()
	@MaxLength(200)
	description?: string
}
```

**Что такое декораторы (@...)?**

Декораторы в NestJS работают как "аннотации", описывают поведение полей или методов.

Примеры:

- `@IsString()` - проверяет, что поле - строка.
- `@IsNotEmpty()` - не должно быть пустым.
- `@Body()` - извлекает тело запроса.
- `@Param()` - извлекает параметры из URL.
- `@Injectable()` - сервис, который можно внедрять в другие классы.

## 🧠 Pipes - валидация и преобразование данных

Пример `ParseIntPipe`:

```ts
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.tasksService.findOne(id);
}
```

Он превращает `string` из URL в `number` и выдаёт ошибку 400, если это не число.

## 🧩 TasksService - логика приложения

Пример с хранением в памяти:

```ts
@Injectable()
export class TasksService {
	private tasks: Task[] = []
	private idCounter = 1

	create(dto: CreateTaskDto): Task {
		const newTask: Task = {
			id: this.idCounter++,
			title: dto.title,
			description: dto.description
		}
		this.tasks.push(newTask)
		return newTask
	}

	findAll(): Task[] {
		return this.tasks
	}

	findOne(id: number): Task {
		return this.tasks.find(t => t.id === id)
	}

	update(id: number, dto: UpdateTaskDto): Task {
		const task = this.findOne(id)
		if (task) {
			task.title = dto.title ?? task.title
			task.description = dto.description ?? task.description
		}
		return task
	}

	remove(id: number): void {
		this.tasks = this.tasks.filter(t => t.id !== id)
	}
}
```

## 💡 Советы и фишки

1. Порядок декораторов имеет значение
   В `class-validator` сначала валидация по типу, потом по значениям.
2. `Pipes` можно создавать свои
   Например, валидировать UUID:

   ```ts
   import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

   @Injectable()
   export class ParseUuidPipe implements PipeTransform {
   	transform(value: string) {
   		if (!/^[0-9a-fA-F-]{36}$/.test(value)) {
   			throw new BadRequestException('Invalid UUID')
   		}
   		return value
   	}
   }
   ```

3. Можно использовать Middleware / Interceptor / Guard
   Например:

   - Middleware - логирование
   - Guard - авторизация
   - Interceptor - изменение ответа

4. `ValidationPipe` включается глобально
   В `main.ts`:

   ```ts
   import { ValidationPipe } from '@nestjs/common'

   async function bootstrap() {
   	const app = await NestFactory.create(AppModule)
   	app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
   	await app.listen(3000)
   }
   ```

   `whitelist: true` — удаляет лишние поля из тела запроса.
