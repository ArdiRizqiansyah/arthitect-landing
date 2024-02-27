import testimonialService from "../service/testimonial-service.js";


const get = async (req, res, next) => {
    try {
        const testimonialId = req.params.testimonialId;
        const result = await testimonialService.get(testimonialId);

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const list = async (req, res, next) => {
    try {
        const result = await testimonialService.list();

        res.status(200).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await testimonialService.create(req);

        res.status(200).json({
            data: result,
            message: 'Testimonial berhasil ditambahkan!'
        });
    } catch (e) {
        next(e);
    }
}

const update = async (req, res, next) => {
    try {
        const request = req;
        request.body.id = req.params.testimonialId;

        const result = await testimonialService.update(request);

        res.status(200).json({
            data: result,
            message: 'Testimonial berhasil diupdate!'
        });
    } catch (e) {
        next(e);
    }
}

const remove = async (req, res, next) => {
    try {
        const testimonialId = req.params.testimonialId;
        await testimonialService.remove(testimonialId);

        res.status(200).json({
            data: "OK",
        });
    } catch (e) {
        next(e);
    }
}

export default {
    get,
    list,
    create,
    update,
    remove,
}