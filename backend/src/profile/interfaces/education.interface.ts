import { Prop } from '@nestjs/mongoose';

export class Education {
  @Prop({ required: true })
  school: string;

  @Prop({ required: true })
  degree: string;

  @Prop({ required: true })
  fieldofstudy: string;

  @Prop({ required: true })
  from: Date;

  @Prop()
  to: Date;

  @Prop({ default: false })
  current: boolean;

  @Prop()
  description: string;
}
