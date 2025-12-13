import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class SignupDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    password: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(32)
    firstName: string;
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(32)
    lastName: string;
}
export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}
