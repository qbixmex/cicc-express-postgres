import { Request, Response } from "express";

const list = async (
  request: Request<{ userId: string }>,
  response: Response
) => {
  const { userId } = request.params;
  return response.json({
    userId,
    message: 'List all users 🥷'
  });
};

const show = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should show a URL 👀'
  });
};

const store = async (
  request: Request<{ userId: string }>,
  response: Response
) => {
  const { userId } = request.params;
  return response.json({
    userId,
    message: 'Should store a new URL 💾'
  });
};

const update = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should update an URL 💾'
  });
};

const destroy = async (
  request: Request<{ userId: string, urlId: string }>,
  response: Response
) => {
  const { userId, urlId } = request.params;
  return response.json({
    userId,
    urlId,
    message: 'Should delete an URL 🗑️'
  });
};

export default {
  list,
  show,
  store,
  update,
  destroy,
};