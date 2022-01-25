import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto'
import { Task, TaskStatus } from './task.model'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filters: GetTasksFilterDTO): Task[] {
    if (Object.keys(filters).length) {
      return this.tasksService.getAllTasksWithFilter(filters)
    }

    return this.tasksService.getAllTasks()
  }

  @Get(':id')
  readTask(@Param('id') id: string): Task {
    return this.tasksService.readTask(id)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Task {
    return this.tasksService.deleteTask(id)
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
