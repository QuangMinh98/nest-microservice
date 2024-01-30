import { InjectModel } from '@nestjs/mongoose';
import { IUserRepository } from './interfaces/IUserRepository';
import { User, UserDocument } from './schema/user';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';

export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await this.userModel.create(user);
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
    };
  }

  async getAll() {
    const users = await this.userModel.find();

    return users.map((user) => {
      return {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
      };
    });
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
