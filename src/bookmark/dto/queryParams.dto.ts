import { IsInt, IsOptional, IsString, Min, MinLength } from "class-validator";
import { Type } from "class-transformer";

export class QueryParamsDto {
    @IsOptional()
    @Type(() => Number)
    @Min(1)
   @IsInt()
    page?: number=1;
    @IsOptional()
    @Type(() => Number)
    @Min(1)
    @IsInt()
    limit?: number=10;
    @IsOptional()
    @IsString()
    @MinLength(3)
    search?: string;
}                   