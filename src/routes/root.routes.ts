import { Router, Request, Response } from "express";
const router = Router();

router.get("/", (_request: Request, response: Response) => {
  response.send('Root Route is Working Fine 👍');
});

export default router;
