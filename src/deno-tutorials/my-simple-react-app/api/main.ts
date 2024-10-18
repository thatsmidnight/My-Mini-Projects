import { Application, Router } from "@oak/oak"; // Importing Application and Router from oak
import { oakCors } from "@tajpouria/cors"; // Importing oakCors from @tajpouria/cors
import data from "./data.json" with { type: "json" }; // Importing data from data.json

const router = new Router(); // Creating a new Router

// Define /api/dinosaurs route to return all dinosaurs
router.get("/api/dinosaurs", (context) => {
  // Set the response body to the data
  context.response.body = data;
});

// Define /api/dinosaurs/:dinosaur route to return a single dinosaur
router.get("/api/dinosaurs/:dinosaur", (context) => {
  // Check if a dinosaur is provided
  if (!context?.params?.dinosaur) {
    // Set the response body to "No dinosaur provided."
    context.response.body = "No dinosaur provided.";
  }

  // Find the dinosaur in the data
  const dinosaur = data.find((item) =>
    // Check if the dinosaur name is the same as the provided dinosaur
    item.name.toLowerCase() === context.params.dinosaur.toLowerCase()
  );

  // Set the response body to the dinosaur or "No dinosaur found."
  context.response.body = dinosaur ?? "No dinosaur found.";
});

const app = new Application(); // Creating a new Application
app.use(oakCors()); // Using oakCors middleware
app.use(router.routes()); // Using router routes
app.use(router.allowedMethods()); // Using router allowedMethods

await app.listen({ port: 8000 }); // Listening on port 8000
