import { NotFoundException } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { TaskStatus } from './task-status.enum'
import { TasksRepository } from './tasks.repository'
import { TasksService } from './tasks.service'

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn()
})

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  tasks: []
}

describe('TasksService', () => {
  let tasksServices: TasksService
  let tasksRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository }
      ]
    }).compile()

    tasksServices = module.get(TasksService)
    tasksRepository = module.get(TasksRepository)
  })

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('SomeValue')
      const result = await tasksServices.getTasks(null, mockUser)

      expect(result).toEqual('SomeValue')
    })
  })

  describe('getTaskById', () => {
    it('calls taskRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Title',
        description: 'Description',
        id: 'someId',
        status: TaskStatus.OPEN
      }

      tasksRepository.findOne.mockResolvedValue(mockTask)
      const result = await tasksServices.readTask('someId', mockUser)

      expect(result).toEqual(mockTask)
    })

    it('calls taskRepository.findOne and handles the error', async () => {
      tasksRepository.findOne.mockResolvedValue(null)

      expect(tasksServices.readTask('someId', mockUser)).rejects.toThrow(
        NotFoundException
      )
    })
  })
})
