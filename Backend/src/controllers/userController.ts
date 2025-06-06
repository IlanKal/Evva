import { Request, Response } from "express";
import * as userService from "../services/userService";
import { fetchUserEvents } from "../services/userService";

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.getUserById(req.params.id.trim());
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const updated = await userService.updateUser(req.params.id.trim(), req.body);
    if (!updated) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Failed to update user" });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await userService.deleteUser(req.params.id.trim());
    if (!deleted) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
};


export const getUserEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId)) {
      res.status(400).json({ error: "Invalid userId" });
      return;
    }

    const events = await fetchUserEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    console.error("❌ Error fetching user events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};