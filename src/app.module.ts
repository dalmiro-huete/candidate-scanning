import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { OpenaiService } from './openai/openai.service';
import { CandidateScanningService } from './candidate-analysis/candidate-scanning.service';
import { CandidateScanningController } from './candidate-analysis/candidate-scanning.controller';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [OpenaiModule],
  controllers: [CandidateScanningController],
  providers: [AppService, OpenaiService, CandidateScanningService],
})
export class AppModule {}
