import { prismaClient } from "../application/database.js";
import userService from "../service/user-service.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json({
            data: result
        });
    }catch(e){
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const email = req.user.email;
        const result = await userService.get(email);
        res.status(200).json({
            data: result
        });
    } catch (e) {
        next(e);
    }
}

const logout = async (req, res, next) => {
    try {
        await userService.logout(req.user.email);
        res.status(200).json({
            data: "OK"
        });
    } catch (e) {
        next(e);
    }
}

const makeAdmin = async (req, res, next) => {
    try {
        await prismaClient.user.create({
            data: {
                email: "admin@admin.com",
                password: await bcrypt.hash("admin", 10),
                name: "admin",
                token: "admin"
            }
        })
    } catch (e) {
        next(e);
    }
}

export default {
    login,
    get,
    logout,
    makeAdmin
}