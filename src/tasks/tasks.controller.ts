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
import { UpdateTaskStatusDTO } from './dtos/update-task-status.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filters: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksService.getTasks(filters)
  }

  @Get(':id')
  readTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.readTask(id)
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.deleteTask(id)
  }

  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDTO
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
