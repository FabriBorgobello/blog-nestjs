import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [AuthModule, UserModule, PostModule, CommentModule, HealthModule],
})
export class AppModule {}
