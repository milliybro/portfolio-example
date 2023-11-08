import { userInteface } from "../types";
import getData from "./data";

interface skill {
  _id: string;
  name: string;
  percent: number;
  user: null | userInteface;
  __v: number;
}

const useSkills = getData<skill>("skills");

export default useSkills;
