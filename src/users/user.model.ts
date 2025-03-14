import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  telegramId: number;

  @Prop({unique:true})
  username: string;

  @Prop({})
  merchantName?:string

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ default: false })
  isAdmin: boolean;

  @Prop({ default: [] })
  walletAddresses?: string[];

  @Prop({ default: 0 })
  totalTransactions: number;

  @Prop({})
  logo_url:string
}

export const UserSchema = SchemaFactory.createForClass(User);