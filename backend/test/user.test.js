import supertest from "supertest";
import { createTestUser, getTestUser, removeTestUser } from "./test-util.js";
import { web } from "../src/application/web.js";


describe("POST /api/users/login", function () {
    beforeEach(async function () {
        await createTestUser();
    });

    afterEach(async function () {
        await removeTestUser();
    });

    it('should can login', async () => {
        const result = await supertest(web)
            .post('/api/users/login')
            .send({
                email: 'test@mail.com',
                password: 'rahasia',
            });

        console.log(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe('test');
    });

    it("should reject login if request is invalid", async () => {
        const result = await supertest(web).post("/api/users/login").send({
          email: "",
          password: "",
        });
    
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
      });
    
      it("should reject login if password is wrong", async () => {
        const result = await supertest(web).post("/api/users/login").send({
          email: "test@mail.com",
          password: "salah",
        });
    
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
      });
    
      it("should reject login if email is wrong", async () => {
        const result = await supertest(web).post("/api/users/login").send({
          email: "salah",
          password: "salah",
        });
    
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
      });
});

// describe('GET /api/users/current', function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it('should can get current user', async () => {
//     const result = await supertest(web)
//       .get('/api/users/current')
//       .set('Authorization', 'test');

//     expect(result.status).toBe(200);
//     expect(result.body.data.email).toBe('test@mail.com');
//     expect(result.body.data.name).toBe('test');
//   });

//   it("should reject if token is invalid", async () => {
//     const result = await supertest(web)
//       .get("/api/users/current")
//       .set("Authorization", "salah");

//     expect(result.status).toBe(401);
//     expect(result.body.errors).toBeDefined();
//   });
// });

// describe('DELETE /api/users/logout', function () {
//   beforeEach(async () => {
//     await createTestUser();
//   });

//   afterEach(async () => {
//     await removeTestUser();
//   });

//   it('should can logout', async () => {
//     const result = await supertest(web)
//       .delete('/api/users/logout')
//       .set('Authorization', 'test');

//     expect(result.status).toBe(200);
//     expect(result.body.data).toBe('OK');

//     const user = await getTestUser();
//     expect(user.token).toBeNull();
//   });

//   it('should reject logout if token is invalid', async () => {
//     const result = await supertest(web)
//       .delete('/api/users/logout')
//       .set('Authorization', 'salah');

//     expect(result.status).toBe(401);
//   });
// })