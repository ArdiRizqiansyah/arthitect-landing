import projectService from "../service/project-service.js";

const create = async (req, res, next) => {
    try {
        const result = await projectService.create(req);

        res.status(200).json({
            data: result,
            message: 'Project berhasil ditambahkan!'
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        let request = req;
        request.body.id = req.params.projectId;

        const result = await projectService.update(request);

        res.status(200).json({
            data: result,
            message: 'Project berhasil diupdate!'
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const result = await projectService.get(projectId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const result = await projectService.list();

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const result = await projectService.remove(projectId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

export default {
    create,
    update,
    get,
    list,
    remove,
}