import supertest from "supertest";
import { web } from "../src/application/web.js";
import { createTestService, createTestUser, getTestService, removeAllTestServices, removeTestUser } from "./test-util";


describe("POST /api/service", function () {
    beforeEach(async () => {
        await createTestUser();
    })

    afterEach(async () => {
        await removeAllTestServices();
        await removeTestUser();
    })

    it('should can create service', async function () {
        const result = await supertest(web)
            .post('/api/users/services')
            .set('Authorization', 'test')
            .send({
                name: "test",
                description: "test",
                icon: "test",
            });

        expect(result.status).toBe(200);
        expect(result.body.data).toBeDefined();
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.description).toBe("test");
        expect(result.body.data.icon).toBe("test");
    });

    it('should reject if request is not valid', async () => {
        const result = await supertest(web)
            .post('/api/users/services')
            .set('Authorization', 'test')
            .send({
                name: "",
                description: "test",
                icon: "test",
            });

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
});

describe("PUT /api/service/:serviceId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestService();
    })

    afterEach(async () => {
        await removeAllTestServices();
        await removeTestUser();
    })

    it('should can update existing contact', async function () {
        const testService = await getTestService();

        const result = await supertest(web)
            .put(`/api/users/services/${testService.id}`)
            .set('Authorization', 'test')
            .send({
                name: "service",
                description: "service",
                icon: "service",
            });

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testService.id);
        expect(result.body.data.name).toBe("service");
        expect(result.body.data.description).toBe("service");
        expect(result.body.data.icon).toBe("service");
    });

    it('should reject if request is not valid', async () => {
        const testService = await getTestService();

        const result = await supertest(web)
            .put(`/api/users/services/${testService.id}`)
            .set('Authorization', 'test')
            .send({
                name: "",
                description: "",
                icon: "",
            });

        expect(result.status).toBe(400);
    });

    it('should reject if service not found', async () => {
        const testService = await getTestService();

        const result = await supertest(web)
            .put(`/api/users/services/${testService.id + 1}`)
            .set('Authorization', 'test')
            .send({
                name: "service",
                description: "service",
                icon: "service",
            });

        expect(result.status).toBe(404);
    });
});

describe("GET /api/service/:serviceId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestService();
    })

    afterEach(async () => {
        await removeAllTestServices();
        await removeTestUser();
    })

    it('should can get existing service', async function () {
        const testService = await getTestService();

        const result = await supertest(web)
            .get(`/api/users/services/${testService.id}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.id).toBe(testService.id);
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.description).toBe("test");
        expect(result.body.data.icon).toBe("test");
    });

    it('should reject if service not found', async () => {
        const testService = await getTestService();

        const result = await supertest(web)
            .get(`/api/users/services/${testService.id + 1}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe("DELETE /api/service/:serviceId", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestService();
    })

    afterEach(async () => {
        await removeAllTestServices();
        await removeTestUser();
    })

    it('should can delete existing service', async function () {
        let testService = await getTestService();

        const result = await supertest(web)
            .delete(`/api/users/services/${testService.id}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data).toBe("OK");

        testService = await getTestService();
        expect(testService).toBeNull();
    });

    it('should reject if contact not found', async () => {
        let testContact = await getTestService();

        const result = await supertest(web)
            .delete(`/api/users/services/${testContact.id + 1}`)
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    });
});

describe("GET /api/service", function () {
    beforeEach(async () => {
        await createTestUser();
        await createTestService();
    })

    afterEach(async () => {
        await removeAllTestServices();
        await removeTestUser();
    })

    it('should can get list of services', async function () {
        const result = await supertest(web)
            .get(`/api/users/services`)
            .set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.length).toBe(1);
    });
});