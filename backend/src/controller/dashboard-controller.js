import { prismaClient } from "../application/database.js";

const index = async (req, res, next) => {
    try {
        const totalProject = await prismaClient.project.count();
        const totalService = await prismaClient.service.count();
        res.status(200).json({
            data: {
                totalProject,
                totalService
            }
        });
    } catch (e) {
        next(e);
    }
}

export default {
    index
}