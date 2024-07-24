import { fetchCSV } from "./formAssets/csvUtils";

export const fetchCSVOptions = async () => {
  const countries = await fetchCSV("/countries.csv");
  const schools = await fetchCSV("/schools.csv");
  return {
    countryOptions: countries.map((country) => ({ label: country, value: country })),
    schoolOptions: schools.map((school) => ({ label: school, value: school })),
  };
};
