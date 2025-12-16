import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { QueryParamsDto } from './dto/queryParams.dto';

@Injectable()
export class BookmarkService {
    constructor(private readonly prisma: PrismaService) {}

    async createBookmark(userId: number, dto: CreateBookmarkDto) {
        try{
            const bookmark = await this.prisma.bookmark.create({
                data: {
                    userId: userId,
                    ...dto,
                }
            });
            return {
                ...bookmark,
            };
        } catch (error) {
            throw new BadRequestException('Failed to create bookmark');
        }
    }
    async getAllBookmarks(userId: number, query: QueryParamsDto) {
        try{
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;
            const bookmarks = await this.prisma.bookmark.findMany({
                where: {
                    userId: userId}, skip, take: limit,
                    include:{ user: {select:{firstName: true, lastName: true, email: true}} },
            });
            return {page, limit, total: bookmarks.length, data: bookmarks};
        } catch (error) {
            throw new BadRequestException('Failed to get bookmarks');
        }
    }
    async getOneBookmark(userId: number, id: number) {
        try{
            const bookmark = await this.prisma.bookmark.findUnique({
                where: { id: id, userId: userId },
                include:{ user: {omit: {hash: true}}},
            });
            if(!bookmark){
                throw new NotFoundException('Bookmark not found');
            }
            return {
               bookmark
            };
        } catch (error) {
            throw new BadRequestException('Failed to get bookmark');
        }
    }
    async updateBookmark(userId: number, id: number, dto: CreateBookmarkDto) {
        try{
            const bookmark = await this.prisma.bookmark.update({
                where: { id: id, userId: userId },
                data: dto,
            });
            if(!bookmark){
                throw new NotFoundException('Bookmark not found');
            }
            return {
                ...bookmark,
            };
        } catch (error) {
            throw new BadRequestException('Failed to update bookmark');
        }
    }
    async deleteBookmark(userId: number, id: number) {
        try{
            await this.prisma.bookmark.delete({
                where: { id: id, userId: userId },
            });
        } catch (error) {
            if(error.code === 'P2025'){
                throw new NotFoundException('Bookmark not found');
            }
            throw new BadRequestException('Failed to delete bookmark');
        }
    }
}
