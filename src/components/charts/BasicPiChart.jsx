import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function BasicPie({series}) {
  return (
    <PieChart
      series={series}
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'right' },
          padding: 3,
          labelStyle: {
            fontSize: 9,
          },
        },
      }}
      //width={400}
     // height={200}
    />
  );
}
