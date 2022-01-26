import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 } from 'uuid'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto'
import { Task, TaskStatus } from './task.model'

@Injectable()
export class TasksService {
  private tasks: Task[] = []

  getAllTasks(): Task[] {
    return this.tasks
  }

  getAllTasksWithFilter({ search, status }: GetTasksFilterDTO): Task[] {
    let tasks = this.tasks

    if (status) {
      tasks = tasks.filter((task) => task.status === status)
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.description.includes(search) || task.title.includes(search)) {
          return task
        }
      })
    }

    return tasks
  }

  readTask(id: string): Task {
    const task = this.tasks.find((task) => task.id === id)

    if (!task) {
      throw new NotFoundException('Task not found')
    }

    return task
  }

  createTask({ title, description }: CreateTaskDTO): Task {
    const task: Task = {
      id: v4(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)

    return task
  }

  deleteTask(id: string): Task {
    const index = this.tasks.findIndex((task) => task.id === id)

    if (!index) {
      throw new NotFoundException('Task not found')
    }

    const task = this.tasks.splice(index, 1)

    return task[0]
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.readTask(id)

    task.status = status

    return task
  }
}
