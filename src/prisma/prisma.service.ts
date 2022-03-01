import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      datasources: {
        db: {
          url: config.get('DATABASE_URL'), // ConfigService will get this value from the .env file
        },
      },
    });
  }

  // we will destroy all the data, while doing e2e testing
  cleanDb() {
    // we will use transaction to delete first the bookmarks and then the users, because prisma might decide to do some performance optimization and first delete the users
    return this.$transaction([
      this.bookmark.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
