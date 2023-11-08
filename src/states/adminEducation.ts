import { PortfolioType } from "../types";
import crud from "./crud";

const useEducation = crud<PortfolioType>("education");

export default useEducation;
