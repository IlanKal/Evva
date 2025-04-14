import * as speakerRepository from "../repositories/speakerRepository";

export const getAllSpeakers = async () => {
  return await speakerRepository.getAllSpeakers();
};

export const getSpeakerById = async (id: string) => {
  const speaker = await speakerRepository.getSpeakerById(id);
  if (!speaker) throw new Error("Speaker not found");
  return speaker;
};

export const updateSpeaker = async (id: string, data: any) => {
  const updated = await speakerRepository.updateSpeaker(id, data);
  if (!updated) throw new Error("Speaker not found");
  return updated;
};

export const deleteSpeaker = async (id: string) => {
  const deleted = await speakerRepository.deleteSpeaker(id);
  if (!deleted) throw new Error("Speaker not found");
  return { message: "Speaker deleted successfully" };
};
