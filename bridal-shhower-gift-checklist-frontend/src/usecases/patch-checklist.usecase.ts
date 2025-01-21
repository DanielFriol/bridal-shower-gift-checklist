import axios from "axios";
import { Gift } from "../models/gift.model";

export const patchChecklistItem = async (
  giftId: string,
  personName?: string
): Promise<Gift | undefined> => {
  const url = `${import.meta.env.VITE_API_URL}/checklists/gifts/${giftId}`;
  const data = { person: personName };

  try {
    const response = await axios.patch<Gift>(url, personName ?? data);
    return response.data;
  } catch (error) {
    console.error("Error patching item:", error);
  }
};
