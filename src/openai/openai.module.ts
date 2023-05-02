import { Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Module({
  imports: [],
  providers: [OpenaiService],
  exports: [OpenaiService],
  controllers: [],
})
export class OpenaiModule {}
