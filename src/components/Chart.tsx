import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";



export default function Charts(props: any) {

  console.log('props data', props)

  Chart.registry.getScale

  const data = {
    labels: props.data1,
    datasets: [
      {
        label: props.data3[0],
        data: props.data2, // Thời gian về đích của từng tay đua
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: props.data3[0],
          font: {
            size: 16,
            weight: "normal",
          },
        },
      },
      x: {
        title: {
          display: true,
          text: props.data3[1],
          font: {
            size: 16,
            weight: "normal",
          },
        },
      },
    },

  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>

  )
}