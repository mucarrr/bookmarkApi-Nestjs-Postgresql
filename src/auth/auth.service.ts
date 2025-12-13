import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import  bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}
    async signTokens(userId: number, email: string) {
        const payload = {
            sub: userId,
            email,
        };
        const accessToken = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: process.env.JWT_ACCESS_SECRET,
        });
        const refreshToken = await this.jwt.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.JWT_REFRESH_SECRET,
        });
        return { accessToken, refreshToken };
    }
    async signup(dto: SignupDto) {
        try{
            const newUser = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash: await bcrypt.hash(dto.password, 10),
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                },
            });
            const { accessToken, refreshToken } = await this.signTokens(newUser.id, newUser.email);
            const { hash, ...user } = newUser; //*** */ New user is seperated as hash and user. In response we only send the user object.
            return { user, accessToken, refreshToken };
        } catch (error) {
            if(error.code === 'P2002'){
                throw new BadRequestException('User already exists');
            }
            throw error;
        }
    }

    async login(dto: LoginDto) {
        try{
            const user = await this.prisma.user.findUnique({
                where: {
                    email: dto.email
                }
            });
            if(!user){
                throw new ForbiddenException('User not found');
            }
            const isPasswordValid = await bcrypt.compare(dto.password, user.hash);
            if(!isPasswordValid){
                throw new ForbiddenException('Invalid credentials');
            }
            const { accessToken, refreshToken } = await this.signTokens(user.id, user.email);
            const { hash, ...userData } = user;
            return { user: userData, accessToken, refreshToken };
        } catch (error) {
            throw error;
        }
    }
    async logout(userId: number) {
        // Logout işlemi - token'lar client-side'da silinir
        // İstersen burada refresh token'ı database'de invalidate edebilirsin
        return { userId };
    }
}
