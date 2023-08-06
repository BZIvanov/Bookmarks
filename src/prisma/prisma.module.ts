import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Global decorator will make this module accessible in all other modules. In the other modules now we can just provide PrismaService as dipendency inhection
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // this will allow us to import this service in other modules
})
export class PrismaModule {}
