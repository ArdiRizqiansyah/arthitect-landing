import serviceService from "../service/service-service.js";

const create = async (req, res, next) => {
    try {
        const request = req.body;
        const result = await serviceService.create(request);

        res.status(200).json({
            data: result,
            message: "Service berhasil ditambahkan",
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId;
        const request = req.body;
        request.id = serviceId;

        const result = await serviceService.update(request);

        res.status(200).json({
            data: result,
            message: "Service berhasil diupdate",
        });
    } catch (e) {
        next(e);
    }
}

const get = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId;
        const result = await serviceService.get(serviceId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId;
        await serviceService.remove(serviceId);

        res.status(200).json({
            data: "OK",
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const result = await serviceService.list();

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
    remove,
    list,
}