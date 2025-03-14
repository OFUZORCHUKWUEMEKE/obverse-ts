import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './payment.model';
import { PaymentRepository } from './payment.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }])],
  providers: [PaymentService, PaymentRepository],
  controllers: [PaymentController],
  exports: [PaymentRepository]
})
export class PaymentModule { }
