import { Request, Response } from "express";
import { ErrorHandlingWrapper } from "../decorator/ErrorHandlingWrapper";
import { SendTo } from '../decorator/SendTo'
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";
import { CreateUserDto } from "../dto/create-user.dto";
import { ValidateBody } from "../decorator/ValidateBody";
import { NotFoundException } from "../exception/NotFoundException";

export class UserController extends BaseController {
    private userService = new UserService()

    @ErrorHandlingWrapper
    @SendTo
    async getUser() {
        return await this.userService.getAllUser()
    }

    @ErrorHandlingWrapper
    @ValidateBody(CreateUserDto)
    async createUser(user: CreateUserDto) {
        return this.userService.createUser(user)
    }

    @ErrorHandlingWrapper
    error404Page() {
        throw new NotFoundException('User not found')
    }

    @ErrorHandlingWrapper
    @SendTo
    async getUserDetail(req: Request, _: Response) {
        const userId = req.params.userId

        return await this.userService.findUser(+userId)
    }

    @ErrorHandlingWrapper
    @SendTo
    async deleteUser(req: Request, _: Response) {
        const userId = req.params.userId

        return await this.userService.deleteUser(+userId)
    }

    @ErrorHandlingWrapper
    @ValidateBody(CreateUserDto)
    async updateUser(userData: CreateUserDto, params: { userId: string }) {
        const userId = params.userId

        return await this.userService.updateUser(+userId, userData)
    }
}

export const userController = new UserController()