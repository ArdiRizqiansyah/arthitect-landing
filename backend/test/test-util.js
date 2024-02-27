import {prismaClient} from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email: "test@mail.com"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            email: "test@mail.com",
            password: await bcrypt.hash("rahasia", 10),
            name: "test",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            email: "test@mail.com"
        }
    });
}

export const removeAllTestServices = async () => {
    await prismaClient.service.deleteMany();
}

export const createTestService = async () => {
    return prismaClient.service.create({
        data: {
            name: "test",
            description: "test",
            icon: "test",
        }
    });
}

export const getTestService = async () => {
    return prismaClient.service.findFirst({
        where: {
            name: "test"
        }
    });
}