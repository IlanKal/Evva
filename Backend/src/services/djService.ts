import * as djRepository from "../repositories/djRepository";
import * as yup from "yup";
import { MUSIC_STYLES, MusicStyle } from "../constants/musicStyles";

// סכמת ולידציה
const djSchema = yup.object({
  price_per_hour: yup.number().min(0).nullable(),
  music_styles: yup
    .array()
    .of(yup.string().oneOf(MUSIC_STYLES))
    .nullable(),
});

// שליפה של כל ה־DJs
export const getAllDJs = async () => {
  return await djRepository.getAllDJs();
};

// שליפה לפי מזהה
export const getDJById = async (id: string) => {
  const dj = await djRepository.getDJById(id);
  if (!dj) throw new Error("DJ not found");
  return dj;
};

// עדכון DJ
export const updateDJ = async (id: string, data: any) => {
  await djSchema.validate(data, { abortEarly: false });

  const updated = await djRepository.updateDJ(id, data);
  if (!updated) throw new Error("DJ not found");
  return updated;
};

// מחיקת DJ
export const deleteDJ = async (id: string) => {
  const deleted = await djRepository.deleteDJ(id);
  if (!deleted) throw new Error("DJ not found");
  return { message: "DJ deleted successfully" };
};
