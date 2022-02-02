import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from './dtos/payload.interface'
import { User } from './user.entity'
import { UsersRepository } from './users.repository'

@Injectable()
export class JwTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,

    private configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate({ username }: JwtPayload): Promise<User> {
    const user: User = await this.usersRepository.findOne({ username })

    if (!user) {
      console.log('test')
      throw new UnauthorizedException()
    }

    return user
  }
}
