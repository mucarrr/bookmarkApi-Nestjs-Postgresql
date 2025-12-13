import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        const result = await this.authService.signup(dto);
        return {
            status: 'success',
            message: 'User created successfully',
            data: result,
        };
    }
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        const result = await this.authService.login(dto);
        return {
            status: 'success',
            message: 'User logged in successfully',
            data: result,
        };
        
    }
    @UseGuards(AuthGuard('jwt-access'))
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() req: any) {
        const user = req.user as {id: number; email: string};
        if(!user){
            throw new UnauthorizedException('Unauthorized');
        }
        await this.authService.logout(user.id);
        return {
            status: 'success',
            message: 'User logged out successfully',
        };
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async refresh(@Req() req: any) {
        const user = req.user as {userId: number; email:string};
        if(!user){
            throw new UnauthorizedException('Unauthorized');
        }
        const { accessToken, refreshToken } = await this.authService.signTokens(user.userId, user.email);
        return { 
            status: 'success',
            message: 'Token refreshed successfully',
            data: { accessToken, refreshToken },
        };
    }
}
