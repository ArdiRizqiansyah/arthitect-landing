import { prismaClient } from "../application/database.js";
import { createProjectValidation, getProjectValidation, updateProjectValidation } from "../validation/project-validation.js";
import { validate } from "../validation/validation.js";
import fs from "fs";

const create = async (request) => {
    const project = validate(createProjectValidation, request.body);

    let image, imagePath;

    // upload image jika ada
    if(request.files && request.files.image) {
        image = request.files.image;
        imagePath = process.cwd() + '/src/static/project/' + image.name;

        image.mv(imagePath, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    return prismaClient.project.create({
        data: {
            name: project.name,
            description: project.description,
            image: imagePath
        },
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });
}

const update = async (request) => {
    let updateDataProject = validate(updateProjectValidation, request.body);

    let image;
    let imagePath;

    // cari project
    let project = await prismaClient.project.findUnique({
        where: {
            id: parseInt(request.body.id)
        }
    });

    // cek apakah ada image
    if(request.files && request.files.image) {
        // hapus image lama
        fs.unlink(project.image, (err) => {
            if(err) {
                console.log(err)
            }
        });

        // upload image baru
        image = request.files.image;
        imagePath = process.cwd() + '/src/static/project/' + image.name;

        image.mv(imagePath, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    return prismaClient.project.update({
        where: {
            id: project.id,
        },
        data: {
            name: updateDataProject.name,
            description: updateDataProject.description,
            image: imagePath ?? project.image,
        },
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });
}

const get = async (projectId) => {
    validate(getProjectValidation, projectId);

    return prismaClient.project.findUnique({
        where: {
            id: parseInt(projectId)
        },
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });
}

const list = async () => {
    return prismaClient.project.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });
}

const remove = async (projectId) => {
    validate(getProjectValidation, projectId);

    // cari project
    let project = await prismaClient.project.findUnique({
        where: {
            id: parseInt(projectId)
        }
    });

    // hapus image lama jika ada
    if(project.image) {
        fs.unlink(project.image, (err) => {
            if(err) {
                console.log(err)
            }
        });
    }

    return prismaClient.project.delete({
        where: {
            id: parseInt(projectId)
        }
    });
}

export default {
    create,
    update,
    get,
    list,
    remove,
}