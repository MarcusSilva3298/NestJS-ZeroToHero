import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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

  getTasks(filters: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filters)
  }

  async readTask(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO)
  }

  async deleteTask(id: string): Promise<Task> {
    const task = this.readTask(id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    await this.tasksRepository.delete(id)

    return task
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.readTask(id)

    task.status = status

    await this.tasksRepository.save(task)

    return task
  }
}
