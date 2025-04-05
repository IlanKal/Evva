// controllers/registerSupplierController.ts
import { Request, Response } from "express";
import Supplier from "../models/Supplier";
import Photographer from "../models/Photographer";
import Catering from "../models/Catering";
import Location from "../models/Location";
import Speaker from "../models/Speaker";
import DJ from "../models/DJ";

export const registerPhotographer = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info,
      price_per_hour,
      has_magnets,
      has_stills,
      has_video
    } = req.body;

    const newSupplier = await Supplier.create({
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info
    });

    const newPhotographer = await Photographer.create({
      supplier_id: newSupplier.supplier_id,
      price_per_hour,
      has_magnets,
      has_stills,
      has_video
    });

    res.status(201).json({ message: "Photographer registered successfully", supplier: newSupplier, photographer: newPhotographer });
  } catch (error) {
    console.error("❌ Error registering photographer:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const registerCatering = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info,
      price_per_person,
      menu,
      kosher,
      vegetarian,
      vegan,
      gluten_free
    } = req.body;

    const newSupplier = await Supplier.create({ name, email, password, available_days, region, rating, image_url, additional_info, contact_info });

    const newCatering = await Catering.create({
      supplier_id: newSupplier.supplier_id,
      price_per_person,
      menu,
      kosher,
      vegetarian,
      vegan,
      gluten_free
    });

    res.status(201).json({ message: "Catering registered successfully", supplier: newSupplier, catering: newCatering });
  } catch (error) {
    console.error("❌ Error registering catering:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const registerLocation = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info,
      address,
      city,
      capacity,
      price,
      parking,
      place_type
    } = req.body;

    const newSupplier = await Supplier.create({ name, email, password, available_days, region, rating, image_url, additional_info, contact_info });

    const newLocation = await Location.create({
      supplier_id: newSupplier.supplier_id,
      address,
      city,
      capacity,
      price,
      parking,
      place_type
    });

    res.status(201).json({ message: "Location registered successfully", supplier: newSupplier, location: newLocation });
  } catch (error) {
    console.error("❌ Error registering location:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const registerSpeaker = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info,
      price_per_lecture,
      lecture_duration,
      lecture_field
    } = req.body;

    const newSupplier = await Supplier.create({ name, email, password, available_days, region, rating, image_url, additional_info, contact_info });

    const newSpeaker = await Speaker.create({
      supplier_id: newSupplier.supplier_id,
      price_per_lecture,
      lecture_duration,
      lecture_field
    });

    res.status(201).json({ message: "Speaker registered successfully", supplier: newSupplier, speaker: newSpeaker });
  } catch (error) {
    console.error("❌ Error registering speaker:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

export const registerDJ = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      password,
      available_days,
      region,
      rating,
      image_url,
      additional_info,
      contact_info,
      price_per_hour,
      music_styles
    } = req.body;

    const newSupplier = await Supplier.create({ name, email, password, available_days, region, rating, image_url, additional_info, contact_info });

    const newDJ = await DJ.create({
      supplier_id: newSupplier.supplier_id,
      price_per_hour,
      music_styles
    });

    res.status(201).json({ message: "DJ registered successfully", supplier: newSupplier, dj: newDJ });
  } catch (error) {
    console.error("❌ Error registering DJ:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};
