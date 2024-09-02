import { testApiHandler } from "next-test-api-route-handler";
import * as appHandler from "../app/api/auth/signup/route"; // Adjust this path as necessary
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Test Authentication API Routes", () => {
  describe("POST /api/auth/signup", () => {
    // success case
    it("should respond with 201 success", async () => {
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
          expect(res.status).toBe(201); // Updated to 201 Created
        },
      });

      // Clean up
      await prisma.user_auth.delete({
        where: {
          email: "test@example.com",
        },
      });
    });

    // missing email case
    it("should respond with 400 invalid email", async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "", // Invalid email
              password: "Password=123",
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: [
              {
                code: "invalid_string",
                message: "Invalid email address",
                path: ["email"],
                validation: "email",
              },
            ],
          });
          expect(res.status).toBe(400);
        },
      });
    });

    // missing password case
    it("should respond with 400 invalid password", async () => {
      await testApiHandler({
        appHandler,
        async test({ fetch }) {
          const res = await fetch({
            method: "POST",
            body: JSON.stringify({
              email: "test@example.com",
              password: "", // Invalid password
            }),
          });
          await expect(res.json()).resolves.toStrictEqual({
            message: [
              {
                code: "too_small",
                exact: false,
                inclusive: true,
                message: "Password must be at least 8 characters long",
                minimum: 8,
                path: ["password"],
                type: "string",
              },
              {
                code: "invalid_string",
                message: "Password must contain at least one uppercase letter",
                path: ["password"],
                validation: "regex",
              },
              {
                code: "invalid_string",
                message: "Password must contain at least one lowercase letter",
                path: ["password"],
                validation: "regex",
              },
              {
                code: "invalid_string",
                message: "Password must contain at least one digit",
                path: ["password"],
                validation: "regex",
              },
              {
                code: "invalid_string",
                message: "Password must contain at least one special character",
                path: ["password"],
                validation: "regex",
              },
            ],
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

      // Clean up
      await prisma.user_auth.delete({
        where: {
          email: "existing_user@example.com",
        },
      });
    });
  });
});
