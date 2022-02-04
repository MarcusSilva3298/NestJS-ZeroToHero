import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { AuthCredentialsDTO } from './dtos/auth-credentials.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sing Up as new User' })
  @Post('/signup')
  signUp(@Body() authCredentials: AuthCredentialsDTO): Promise<void> {
    return this.authService.singUp(authCredentials)
  }

  @ApiOperation({ summary: 'Sing In' })
  @Post('/signin')
  signIn(
    @Body() authCredentials: AuthCredentialsDTO
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(authCredentials)
  }
}
