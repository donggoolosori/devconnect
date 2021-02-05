import { User } from 'src/users/schema/User.schema';

export interface Comment {
  readonly user: User;
  text: string;
  readonly name: string;
  readonly avatart: string;
  readonly date: Date;
}
