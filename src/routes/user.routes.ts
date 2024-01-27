import { Router } from 'express';
import controller from '../controllers/user.controller';

const router = Router();

//* Get All users.
router.get("/users", controller.list);

//* Show User Details
router.get("/users/:userId", controller.show);

//* New User
router.post("/users", controller.store);

//* Update User
router.patch("/users/:userId", controller.update);

//* Delete User
router.delete("/users/:userId", controller.destroy);

export default router;
