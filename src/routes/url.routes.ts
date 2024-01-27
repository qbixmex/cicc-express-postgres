import { Router } from "express";
import controller from "../controllers/url.controller";

const router = Router();

//* Get All URLs that belongs to authenticated user.
router.get("/users/:userId/urls", controller.list);

//* Show Details of a URL
router.get("/users/:userId/urls/:urlId", controller.show);

//* New URL
router.post("/users/:userId/urls", controller.store);

//* Update URL
router.patch("/users/:userId/urls/:urlId", controller.update);

//* Delete URL
router.delete("/users/:userId/urls/:urlId", controller.destroy);

export default router;
