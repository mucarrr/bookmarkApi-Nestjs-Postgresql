import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import  bcrypt from 'bcrypt';
import jwt from 'json-web-token';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {}
    async signTokens(userId: number, email: string) {
        const payload = {
            sub: userId,
            email,
        };
        // const accessToken = await this.jwt.signAsync(payload, {
        //     expiresIn: '15m',
        // });
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
            return { message: 'signup done', user: newUser };
        } catch (error) {
            console.log(error);
        }
    }

    login() {
        return 'login done';
    }
}
