import { ErrorHandlingWrapper } from "../decorator/ErrorHandlingWrapper";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";
import { ValidateBody } from "../decorator/ValidateBody";
import { LoginDto } from "../dto/login.dto";
import { AuthService } from "../services/auth.service";
import { CreateUserDto } from "../dto/create-user.dto";
import { SendTo } from "../decorator/SendTo";
import { CustomRequest } from "../interface/custom.request";

export class AuthController extends BaseController {
    private readonly authService = new AuthService()
    private readonly userService = new UserService()

    @ErrorHandlingWrapper
    @ValidateBody(LoginDto)
    public async login(loginDto: LoginDto) {
        const token = await this.authService.login(loginDto.email, loginDto.password);

        return {
            token
        }
    }

    @ErrorHandlingWrapper
    @ValidateBody(CreateUserDto)
    public async register(user: CreateUserDto) {
        return await this.userService.createUser(user);
    }

    @ErrorHandlingWrapper
    @SendTo
    getProfile(req: CustomRequest) {
        return req.user
    }
}

export const authController = new AuthController()