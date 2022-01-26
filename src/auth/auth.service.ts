import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto'
import { UsersRepository } from './users.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository
  ) {}

  async singUp(authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentials)
  }

  async singIn({ username, password }: AuthCredentialsDTO): Promise<string> {
    const user = await this.userRepository.findOne({ username })

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return '123'
  }
}
