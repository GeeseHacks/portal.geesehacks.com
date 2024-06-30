import Papa from 'papaparse';

export const fetchCSV = async (url: string): Promise<string[]> => {
  const response = await fetch(url);
  const csvText = await response.text();
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      complete: (results) => {
        const data = results.data as string[][];
        const firstColumn = data.map(row => row[0]); // Extract the first column
        resolve(firstColumn.filter((item) => item));
      },
      error: (error: any) => {
        reject(error);
      }
    });
  });
};
