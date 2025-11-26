import { getUser } from "@/services/user.service";
import { Request, Response } from "express";

export async function getUserController(req: Request, res: Response) {
  const { data } = await getUser(req.user!);

  res.status(200).json(data);
}
