import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, IsUrl } from "class-validator";

export class CreateBookmarkDto {
    @IsNotEmpty({groups: ['create']})
    @IsOptional({groups: ['update']})
    @IsString()
    @MinLength(3)
    @MaxLength(60)
    title: string;
    @IsNotEmpty({groups: ['create']})
    @IsOptional({groups: ['update']})
    @IsString()
    @MinLength(3)
    @MaxLength(500)
    description: string;
    @IsString()
    @IsUrl()
    @IsOptional()
    link? : string | null;
}