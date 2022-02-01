import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/auth/user.entity'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TasksRepository } from './tasks.repository'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}

  getTasks(filters: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filters, user)
  }

  async readTask(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({ id, user })

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user)
  }

  async deleteTask(id: string, user: User): Promise<Task> {
    const task = this.readTask(id, user)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    await this.tasksRepository.delete({ id, user })

    return task
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User
  ): Promise<Task> {
    const task = await this.readTask(id, user)

    task.status = status

    await this.tasksRepository.save(task)

    return task
  }
}
