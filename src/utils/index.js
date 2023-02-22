import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constant";
import { adressBack } from "../page/adressBack";

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  //if the last prompt is the same as the new one
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const successColor =
  "linear-gradient(90deg, rgba(19,20,50,1) 0%, rgba(100,105,255,1) 100%)";
export const failureColor =
  "linear-gradient(90deg, rgba(87,87,94,1) 0%, rgba(12,12,13,1) 100%)";
