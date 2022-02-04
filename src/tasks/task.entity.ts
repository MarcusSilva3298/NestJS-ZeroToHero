import { Exclude } from 'class-transformer'
import { User } from '../auth/user.entity'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TaskStatus } from './task-status.enum'
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'

@Entity()
export class Task {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TaskStatus

  @ApiHideProperty()
  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User
}
