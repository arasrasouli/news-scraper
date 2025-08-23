import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalysisService } from './analysis.service';
import { AnalysisResolver } from './analysis.resolver';

@Module({
  imports: [ConfigModule],
  providers: [AnalysisService, AnalysisResolver],
})
export class AnalysisModule {}

