import { Module } from '@nestjs/common';
import { RegisterModule } from './v1/presentation/controller/register/register.module';

@Module({
  imports: [
    RegisterModule,
  ],
})
export class AppModule {}
