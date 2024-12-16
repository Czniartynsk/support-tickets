import { create } from "../controllers/create.js";

export const tickets = [
  {
    method: "POST",
    path: "/tickets",
    controller: create,
  },
]