import dataSource from "../database/dataSource";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import paginate from "../repository/pagination";

export class UserService {
    userRepository = dataSource.getRepository(User).extend(paginate)

    async createUser(user: CreateUserDto) {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser)
    }

    async getAllUser() {
        return await this.userRepository.paginate<User>();
    }

    async findUser(userId: number) {
        return await this.userRepository.findOneByOrFail({ id: userId })
    }

    async deleteUser(userId: number) {
        return await this.userRepository.delete({ id: userId })
    }

    async updateUser(userId: number, userData: CreateUserDto) {
        let user = await this.findUser(userId)
        user = this.userRepository.merge(user, userData)

        return await this.userRepository.save(user)
    }
}