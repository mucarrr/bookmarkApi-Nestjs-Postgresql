import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import UserDecorator from 'src/auth/decorator/user.decorator';
import { QueryParamsDto } from './dto/queryParams.dto';


@UseGuards(AuthGuard('jwt-access'))
@Controller('bookmark')
export class BookmarkController {
    constructor(private readonly bookmarkService: BookmarkService) {}

    @UsePipes(new ValidationPipe({groups: ['create'], always:true}))
    @Post()
    async create(@Body() dto: CreateBookmarkDto, @UserDecorator("id") userId: number) {
        
        if(!userId){
            throw new UnauthorizedException('Unauthorized');
        }
        const result = await this.bookmarkService.createBookmark(userId, dto);
        return {
            status: 'success',
            message: 'Bookmark created successfully',
            data: result,
        };
    }
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: false }))
    @Get()
    async getAll(@UserDecorator("id") userId: number, @Query() query: QueryParamsDto) {

        const result = await this.bookmarkService.getAllBookmarks(userId, query);
        return {
            status: 'success',
            message: `${result.data.length} Bookmarks fetched successfully`,
            data: result,
        };

    }
    @Get(':id')
    async getOne(@UserDecorator("id") userId: number, @Param('id') id: number) {
        const result = await this.bookmarkService.getOneBookmark(userId, id);
        return {
            status: 'success',
            message: 'Bookmark fetched successfully',
            data: result,
        };
    }
    @UsePipes(new ValidationPipe({groups: ['update'], always:true}))
    @Patch(':id')
    async update(@UserDecorator("id") userId: number, @Param('id') id: number, @Body() dto: CreateBookmarkDto) {
        if(!userId){
            throw new UnauthorizedException('Unauthorized');
        }
        const result = await this.bookmarkService.updateBookmark(userId, id, dto);
        return {
            status: 'success',
            message: 'Bookmark updated successfully',
            data: result,
        };
    }
    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    async delete(@UserDecorator("id") userId: number, @Param('id') id: number) {
        const result = await this.bookmarkService.deleteBookmark(userId, id);
        return {
            status: 'success',
            message: 'Bookmark deleted successfully',
            data: result,
        };
    }
}
