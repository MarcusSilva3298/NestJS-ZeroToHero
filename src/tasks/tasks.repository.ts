import { User } from 'src/auth/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDTO } from './dtos/create-task.dto'
import { GetTasksFilterDTO } from './dtos/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(
    { description, title }: CreateTaskDTO,
    user: User
  ): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user: user
    })

    await this.save(task)

    return task
  }

  async getTasks(
    { search, status }: GetTasksFilterDTO,
    user: User
  ): Promise<Task[]> {
    const query = this.createQueryBuilder('task')

    query.where({ user })

    if (status) {
      query.andWhere('task.status = :status', { status })
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` }
      )
    }

    const tasks = await query.getMany()
    return tasks
  }
}
