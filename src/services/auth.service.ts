// auth.service.ts
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import dataSource from '../database/dataSource';
import { UnAuthorizedException } from '../exception/UnAuthorizedException';
import { User } from '../entities/user.entity';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserService } from '../services/user.service';
export class AuthService {
    private userRepository = dataSource.getRepository(User)

    async login(email: string, password: string): Promise<string | null> {
        const user = await this.userRepository.findOneBy( { email });

        if (!user) {
            throw new UnAuthorizedException()
        }

        const passwordMatch = await compare(password, user.password);

        if (! passwordMatch) {
            throw new UnAuthorizedException()
        }

        const token = sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: '1h', // Token expiration time
        });

        return token;
    }

    async verifyToken(token: string) {
        const decoded = verify(token, JWT_SECRET) as any;
        const userService = new UserService()
        return await userService.findUser(decoded.id);
    }
}

