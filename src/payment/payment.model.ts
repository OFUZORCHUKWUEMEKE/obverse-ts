import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export enum PaymentStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    FAILED = 'failed',
    EXPIRED = 'expired',
}

export enum PaymentType {
    STABLECOIN = 'stablecoin',
}

export enum StableCoin {
    USDC = 'usdc',
    USDT = 'usdt'
}

export enum Chain {
    SOLANA = 'solana',
    BASE = 'base'
}

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    currency: StableCoin;

    @Prop({ required: true, enum: PaymentType, default: PaymentType.STABLECOIN })
    type: PaymentType;

    @Prop({ required: true, enum: PaymentStatus, default: PaymentStatus.PENDING })
    status: PaymentStatus;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop()
    paymentLink: string;

    @Prop({ required: true, enum: Chain, default: Chain.SOLANA })
    chain: Chain;

    @Prop()
    transactionHash?: string;

    @Prop({})
    reference?: string;

    @Prop()
    qrCodeUrl: string;

    @Prop()
    transactionSignature: string;

    @Prop()
    expiresAt?: Date;

    @Prop({ type: Object })
    metadata: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);