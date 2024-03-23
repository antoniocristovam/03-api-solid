import fastify from "fastify";
import { register } from "./http/controllers/register-controller";

export const app = fastify();

app.post("/users", register);
