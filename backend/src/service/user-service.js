import { validate } from "../validation/validation.js";
import { getUserValidation, loginUserValidation } from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from "uuid";

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true,
        }
    });

    if(!user){
        throw new ResponseError(401, 'Username or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
    if(!isPasswordValid) {
        throw new ResponseError(401, "Username or password is wrong");
    }

    const token = uuid().toString();
    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            email: user.email
        },
        select: {
            name: true,
            email: true,
            token: true
        }
    });
}

const get = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        },
        select: {
            email: true,
            name: true
        }
    });

    if(!user){
        throw new ResponseError(404, "user is not found");
    }

    return user;
}

const logout = async (email) => {
    email = validate(getUserValidation, email);

    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    });

    if(!user){
        throw new ResponseError(404, "user is not found");
    }

    return prismaClient.user.update({
        where: {
            email: email
        },
        data: {
            token: null
        },
        select: {
            email: true
        }
    })
}

export default {
    login,
    get,
    logout
}