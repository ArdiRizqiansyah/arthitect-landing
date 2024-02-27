import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { createServiceValidation, getServiceValidation, updateServiceValidation } from "../validation/service-validation.js"
import { validate } from "../validation/validation.js"


const create = async (request) => {
    const service = validate(createServiceValidation, request);

    return prismaClient.service.create({
        data: service,
        select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            created_at: true,
        }
    });
}

const update = async (request) => {
    const service = validate(updateServiceValidation, request);

    const totalServiceInDB = await prismaClient.service.count({
        where: {
            id: service.id
        }
    });

    if (totalServiceInDB === 0) {
        throw new ResponseError(404, "service not found");
    }

    return prismaClient.service.update({
        where: {
            id: service.id
        },
        data: {
            name: service.name,
            description: service.description,
            icon: service.icon,
        },
        select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            created_at: true,
        }
    });
}

const get = async (serviceId) => {
    serviceId = validate(getServiceValidation, serviceId);

    const service = await prismaClient.service.findUnique({
        where: {
            id: serviceId
        },
        select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            created_at: true,
        }
    });

    if (!service) {
        throw new ResponseError(404, "service not found");
    }

    return service;
}

const remove = async (serviceId) => {
    serviceId = validate(getServiceValidation, serviceId);

    const totalServiceInDB = await prismaClient.service.count({
        where: {
            id: serviceId
        }
    });

    if (totalServiceInDB === 0) {
        throw new ResponseError(404, "service not found");
    }

    return prismaClient.service.delete({
        where: {
            id: serviceId
        }
    });
}

const list = async () => {
    return prismaClient.service.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            icon: true,
            created_at: true,
        }
    });
}

export default {
    create,
    update,
    get,
    remove,
    list,
}