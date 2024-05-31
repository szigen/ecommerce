import { http, HttpResponse } from "msw";
import products from "../products";

export const handlers = [
  http.get("/posts", () => {
    return HttpResponse.json({ products });
  }),
  http.post("/posts", () => {
    console.log('Captured a "POST /posts" request');
  }),
  http.delete("/posts/:id", ({ params }) => {
    console.log(`Captured a "DELETE /posts/${params.id}" request`);
  }),
];
