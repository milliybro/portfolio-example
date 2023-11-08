import { PortfolioType } from "../types";
import crud from "./crud";

const useSkills = crud<PortfolioType>("skills");

export default useSkills;
