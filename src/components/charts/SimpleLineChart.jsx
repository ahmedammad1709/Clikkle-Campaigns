import * as React from 'react';
import  {LineChart}  from '@mui/x-charts/LineChart';

export default function SimpleLineChart({series,xAxis,width=350,height=300}) {
  return (
         <LineChart
     // width={width}
     // height={height}
      series={series}
      xAxis={xAxis }
      slotProps={{
        legend: {
          direction: 'row',
          position: { vertical: 'bottom', horizontal: 'right' },
          padding: 0,
          labelStyle: {
            fontSize: 9,
          },
        },
      }}
    />
  );
}
