import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.authService.singUp(authCredentials)
  }

  @Post('/signin')
  signIn(@Body() authCredentials: AuthCredentialsDTO): Promise<string> {
    return this.authService.singIn(authCredentials)
  }
}
