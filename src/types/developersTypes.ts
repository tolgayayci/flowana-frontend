export interface IDevelopersCountModel {
    title: string;
    subtitle: string;
    count: number;
}

interface DataPoint {
    date: string; 
    value: number;
}
  
interface SeriesData {
    name: string;
    data: DataPoint[];
}
  
export interface IDevelopersChartData {
    yAxis: Record<string, any>; 
    xAxis: {
      type: string; 
    };
    series: SeriesData[];
}

interface HeaderItem {
    index: string;
    title: string;
}
  
interface DataRow {
    "1y_%": number;
    "2y_%": number;
    "3y_%": number;
    developer_type: [string, string];
    "jun-01_2023": number;
    key: string;
}
  
export interface IDevelopersDevTypeTable {
    header: HeaderItem[];
    rows: DataRow[];
}

  