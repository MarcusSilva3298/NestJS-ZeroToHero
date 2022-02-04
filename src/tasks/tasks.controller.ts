import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { GetUser } from 'src/auth/get-user.decorator'
import { User } from 'src/auth/user.entity'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto'
import { UpdateTaskStatusDTO } from './dtos/update-task-status.dto'
import { Task } from './task.entity'
import { TasksService } from './tasks.service'

@ApiTags('Tasks')
@ApiBearerAuth()
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController')
  constructor(private tasksService: TasksService) {}

  @ApiOperation({ summary: 'Get Tasks create by the User' })
  @Get()
  getTasks(
    @Query() filters: GetTasksFilterDTO,
    @GetUser() user: User
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filters
      )}`
    )
    return this.tasksService.getTasks(filters, user)
  }

  @ApiOperation({ summary: 'Get Task by id' })
  @Get(':id')
  readTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.readTask(id, user)
  }

  @ApiOperation({ summary: 'Create Task' })
  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User
  ): Promise<Task> {
    this.logger.verbose(
      `User "${user.username}" creating a new task. Data: ${JSON.stringify(
        createTaskDTO
      )}`
    )
    return this.tasksService.createTask(createTaskDTO, user)
  }

  @ApiOperation({ summary: 'Delete Task' })
  @Delete(':id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.deleteTask(id, user)
  }

  @ApiOperation({ summary: 'Update Task status' })
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateTaskStatusDTO,
    @GetUser() user: User
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(id, status, user)
  }
}
