// Data parsing and transformation functions for structured data conversion

// parseDataTable function
// - Aggregates crop production data by year.
// - Identifies maximum and minimum production crops for each year.
// - Utilizes a yearMap to store max/min crop and production values.
// - parseYear extracts the numeric year from the "Year" field.

export function parseDataTable(data: RawData[]): AggregatedData[] {
  const yearMap: Record<
    number,
    {
      max: { crop: string; production: number };
      min: { crop: string; production: number };
    }
  > = {};
  const parseYear = (yearStr: string): number => {
    const match = yearStr.match(/\d{4}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Iterate over each entry to compute max and min production crops per year.
  data.forEach((entry) => {
    const year = parseYear(entry.Year);
    const crop = entry["Crop Name"];
    const production =
      parseFloat(entry["Crop Production (UOM:t(Tonnes))"] as string) || 0;

    if (!yearMap[year]) {
      yearMap[year] = {
        max: { crop, production },
        min: { crop, production },
      };
    } else {
      if (production > yearMap[year].max.production) {
        yearMap[year].max = { crop, production };
      }
      if (production < yearMap[year].min.production && production > 0) {
        yearMap[year].min = { crop, production };
      }
    }
  });

  // Transform yearMap into structured AggregatedData format.
  return Object.keys(yearMap).map((year) => ({
    year: parseInt(year, 10),
    maxCrop: yearMap[parseInt(year, 10)].max.crop,
    minCrop: yearMap[parseInt(year, 10)].min.crop,
  }));
}

// parseBarChartData function
// - Computes average yield for each crop.
// - Uses cropMap to store total yields and counts for each crop.
// - Returns structured data in BarChartData format.

export function parseBarChartData(data: RawData[]): BarChartData[] {
  const cropMap: Record<string, { totalYield: number; count: number }> = {};

  data.forEach((entry) => {
    const crop = entry["Crop Name"];
    const yieldValue =
      parseFloat(
        entry["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] as string
      ) || 0;

    if (!cropMap[crop]) {
      cropMap[crop] = { totalYield: yieldValue, count: 1 };
    } else {
      cropMap[crop].totalYield += yieldValue;
      cropMap[crop].count++;
    }
  });

  // Compute average yield for each crop.
  return Object.keys(cropMap).map((crop) => ({
    cropName: crop,
    averageYield: cropMap[crop].totalYield / cropMap[crop].count,
  }));
}
