import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function BasicBarChart({series,xAxis,dataset}) {
  return (
    <BarChart
    dataset={dataset}
      xAxis={xAxis }
      series={series?series:[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
    //  width={400}
     // height={300}
     slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'right' },
          padding: 0,
          labelStyle: {
            fontSize: 5,
          },
        },
      }}
    />
  );
}
