import request from "supertest";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { LoginInput, LoginResponse } from "../../types/auth/login.type.js";


const mockedLoginUser =
  jest.fn<(input: LoginInput) => Promise<LoginResponse>>();
jest.unstable_mockModule("../../../modules/auth/auth.service.js", () => ({
  loginUser: mockedLoginUser,
  registerUser: jest.fn(),
  getUser: jest.fn(),
}));

const { app } = await import("../../../app.js");
describe("POST /api/auth/login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

 it("returns an access token for valid credentials", async () => {
   mockedLoginUser.mockResolvedValue({
     accessToken: "test-access-token",
     user: {
       name: "Test User",
       email: "test@example.com",
     },
   });

   const response = await request(app).post("/api/auth/login").send({
     email: "test@example.com",
     password: "password123",
   });

   expect(response.status).toBe(200);

   expect(response.body).toEqual({
     status: "success",
     message: "User logged in successfully",
     data: {
       accessToken: "test-access-token",
       user: {
         name: "Test User",
         email: "test@example.com",
       },
     },
   });

   expect(mockedLoginUser).toHaveBeenCalledWith({
     email: "test@example.com",
     password: "password123",
   });
 });

  it("rejects an invalid request body", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "not-an-email",
      password: "short",
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("validation_error");
    expect(mockedLoginUser).not.toHaveBeenCalled();
  });
});
