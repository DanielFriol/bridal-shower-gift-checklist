import axios from "axios";
import { Gift } from "../models/gift.model";

export const getChecklist = async (): Promise<Gift[]> => {
  try {
    const response = await axios.get<Gift[]>(
      `${import.meta.env.VITE_API_URL}/checklists`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching checklist:", error);
    throw error;
  }
};
