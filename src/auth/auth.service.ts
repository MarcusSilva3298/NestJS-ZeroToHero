import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare } from 'bcrypt'
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto'
import { JwtPayload } from './dtos/payload.interface'
import { UsersRepository } from './users.repository'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private userRepository: UsersRepository,

    private jwtService: JwtService
  ) {}

  async singUp(authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.userRepository.createUser(authCredentials)
  }

  async singIn({
    username,
    password
  }: AuthCredentialsDTO): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ username })

    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = { username }
    const accessToken: string = this.jwtService.sign(payload)

    return { accessToken }
  }
}
