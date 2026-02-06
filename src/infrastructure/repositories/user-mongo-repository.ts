import { User } from '@domain/entities/User';
import { UserRepository } from '@domain/repositories/UserRepository';
import { UserCreationQuery } from '@domain/types/user/UserCreationQuery';
import { UserModel } from '@infrastructure/models/user-model';

export class UserMongoRepository implements UserRepository {
  async createOne(query: UserCreationQuery): Promise<User> {
    const newUser = new UserModel({
      email: query.email,
      password: query.password,
    });
    const userDb = await newUser.save();

    return new User({
      email: userDb?.email,
      password: userDb?.password,
      id: userDb._id.toString(),
      createdAt: userDb.createdAt,
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDb = await UserModel.findOne({ email });

    if (!userDb) return null;

    return new User({
      email: userDb?.email,
      password: userDb?.password,
      id: userDb._id.toString(),
      createdAt: userDb.createdAt,
    });
  }

  async find(): Promise<User[]> {
    // TODO PAGINATION USER
    const usersDb = await UserModel.find();

    return usersDb.map(
      userDb =>
        new User({
          email: userDb?.email,
          password: userDb?.password,
          id: userDb._id.toString(),
          createdAt: userDb.createdAt,
        })
    );
  }
}
