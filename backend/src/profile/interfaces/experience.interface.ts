import { Prop } from '@nestjs/mongoose';

export class Experience {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  company: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: string;

  @Prop({ default: false })
  current: boolean;

  @Prop()
  description: string;
}
