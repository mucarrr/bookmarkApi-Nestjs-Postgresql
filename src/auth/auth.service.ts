import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    signup(dto: SignupDto) {
        return { message: 'signup done', user: dto };
    }

    login() {
        return 'login done';
    }
}
