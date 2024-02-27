import { prismaClient } from "../application/database.js";
import { createTestimonialValidation, getTestimonialValidation, updateTestimonialValidation } from "../validation/testimonial-validation.js";
import { validate } from "../validation/validation.js";

const list = async () => {
    return prismaClient.testimonial.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            image: true,
            created_at: true,
        }
    });
}

const get = async (testimonialId) => {
    validate(getTestimonialValidation, testimonialId);

    return prismaClient.testimonial.findUnique({
        where: {
            id: parseInt(testimonialId)
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

const create = async (request) => {
    const testimonial = validate(createTestimonialValidation, request.body);

    let image, imagePath;

    // upload image jika ada
    if(request.files && request.files.image) {
        image = request.files.image;
        imagePath = process.cwd() + '/src/static/testimonial/' + image.name;

        image.mv(imagePath, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    return prismaClient.testimonial.create({
        data: {
            name: testimonial.name,
            description: testimonial.description,
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
    let testimonialUpdateData = validate(updateTestimonialValidation, request.body);

    let image;
    let imagePath;

    // cari testimonial
    let testimonial = await prismaClient.testimonial.findUnique({
        where: {
            id: parseInt(testimonialUpdateData.id)
        }
    });

    // cek apakah ada image
    if(request.files && request.files.image) {
        // hapus image lama
        fs.unlink(testimonial.image, (err) => {
            if(err) {
                console.log(err)
            }
        });

        // upload image baru
        image = request.files.image;
        imagePath = process.cwd() + '/src/static/testimonial/' + image.name;

        image.mv(imagePath, (err) => {
            if(err) {
                console.log(err)
            }
        })
    }

    return prismaClient.testimonial.update({
        where: {
            id: parseInt(testimonialUpdateData.id)
        },
        data: {
            name: testimonialUpdateData.name,
            description: testimonialUpdateData.description,
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

const remove = async (testimonialId) => {
    // cari testimonial
    let testimonial = await prismaClient.testimonial.findUnique({
        where: {
            id: parseInt(testimonialId)
        }
    });

    // hapus image jika ada
    if(testimonial.image) {
        fs.unlink(testimonial.image, (err) => {
            if(err) {
                console.log(err)
            }
        });
    }

    return prismaClient.testimonial.delete({
        where: {
            id: parseInt(testimonialId)
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

export default {
    list,
    get,
    create,
    update,
    remove,
}