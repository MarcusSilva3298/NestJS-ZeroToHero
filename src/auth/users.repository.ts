import { ConflictException, InternalServerErrorException } from '@nestjs/common'
import { hash } from 'bcrypt'
import { EntityRepository, Repository } from 'typeorm'
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto'
import { User } from './user.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser({ username, password }: AuthCredentialsDTO): Promise<void> {
    const hashPassword = await hash(password, 6)

    const user = this.create({ username, password: hashPassword })

    try {
      await this.save(user)
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username already exists')
      }

      console.log(err)
      throw new InternalServerErrorException()
    }
  }
}
