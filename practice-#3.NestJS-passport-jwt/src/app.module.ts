import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { ProfileController } from './profile/profile.controller';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController, ProfileController, AuthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
