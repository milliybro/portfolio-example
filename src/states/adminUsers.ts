import { userInteface } from "../types";
import getData from "./data";

interface users {
  _id: string;
  name: string;
  level: string;
  description: string;
  startDate: string;
  endDate: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  username: string;
  user: null | userInteface;
  __v: number;

}

const useUsers = getData<users>("users")

export default useUsers