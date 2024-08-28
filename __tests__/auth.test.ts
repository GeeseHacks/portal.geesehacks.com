import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../app/api/auth/signup/route"; // Adjust this path as necessary
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Test Authentication API Routes ", () => {
  describe("POST /api/auth/signup", () => {
    // success case
    it("should respond with 200 success", async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "test@example.com",
              password: "Password=123",
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: "User created successfully",
          });
          expect(res.status).toBe(200);
        },
      });
    });

    // missing email case
    it("should respond with 400 missing email", async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "",
              password: "Password=123",
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: "Email and password are required",
          });
          expect(res.status).toBe(400);
        },
      });
    });

    // missing password case
    it("should respond with 400 missing password", async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "test@example.com",
              password: "",
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: "Email and password are required",
          });
          expect(res.status).toBe(400);
        },
      });
    });

    // duplicate email case
    it("should respond with 409 user already exists", async () => {
      // Seed with initial data
      await prisma.user_auth.create({
        data: {
          email: "existing_user@example.com",
          password: "Some_Random_Password",
        },
      });

      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "existing_user@example.com",
              password: "Password=123",
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: "User already exists",
          });
          expect(res.status).toBe(409);
        },
      });
    });
  });
});
