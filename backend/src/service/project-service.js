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
        imageName = image.name;
        imagePath = '/public/' + image.name;

        image.mv(process.cwd() + imagePath, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    return prismaClient.project.create({
        data: {
            name: project.name,
            description: project.description,
            image: imageName
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
        if (project.image) {
            // hapus image lama
            fs.unlink(project.image, (err) => {
                if(err) {
                    console.log(err)
                }
            });   
        }

        // upload image baru
        image = request.files.image;
        imageName = image.name;
        imagePath = '/public/' + image.name;

        image.mv(process.cwd() + imagePath, (err) => {
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
            image: imageName ?? project.image,
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

    let project =  prismaClient.project.findUnique({
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

    return project;
}

const list = async () => {
    let projects = prismaClient.project.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });

    return projects;
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