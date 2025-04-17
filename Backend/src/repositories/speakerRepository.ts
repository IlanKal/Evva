import Speaker from "../models/Speaker";

export const getAllSpeakers = async () => {
  return await Speaker.findAll();
};

export const getSpeakerById = async (id: string) => {
  return await Speaker.findByPk(id);
};

export const updateSpeaker = async (id: string, data: any) => {
  const speaker = await Speaker.findByPk(id);
  if (!speaker) return null;
  return await speaker.update(data);
};

export const deleteSpeaker = async (id: string) => {
  const speaker = await Speaker.findByPk(id);
  if (!speaker) return null;
  await speaker.destroy();
  return true;
};
