import { Module } from '@nestjs/common';
import { AboutService } from './about.service';
import { AboutResolver } from './about.resolver';

@Module({
  providers: [AboutService, AboutResolver],
})
export class AboutModule {}
