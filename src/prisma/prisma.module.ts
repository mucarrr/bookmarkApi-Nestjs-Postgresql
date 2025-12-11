import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// Global module is a module that is available globally in the application
@Global()
 @Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}
