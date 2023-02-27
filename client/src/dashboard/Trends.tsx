import { useEffect, useRef } from 'react';
import {
  Chart,
  CategoryScale,
  Colors,
  BarController,
  BarElement,
  LinearScale,
  Legend,
  Filler,
  PointElement,
  Tooltip,
} from 'chart.js';
import { useSelector } from 'react-redux';

import Section from '../components/Section';
import { formatCurrency } from '../shared/utils';
import { selectTrends } from '../transactions/store/selectors';
import Filter from './Filter';

Chart.register(
  CategoryScale,
  Colors,
  Filler,
  BarController,
  BarElement,
  LinearScale,
  Legend,
  PointElement,
  Tooltip
);

interface Props {
  className?: string;
}

const Trends = ({ className }: Props) => {
  const trends = useSelector(selectTrends);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart<'bar', number[], string> | null>(null);

  useEffect(
    function init() {
      if (!canvasRef.current) return;

      const chart = new Chart(canvasRef.current, {
        type: 'bar',
        options: {
          hover: {
            mode: 'index',
            intersect: false,
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 4,
            },
          },
          plugins: {
            filler: {
              propagate: false,
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                title: item => `Date: ${item[0].label}`,
                label: line =>
                  ` ${line.dataset.label}: ₹${formatCurrency(
                    line.raw as number
                  )}`,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                maxTicksLimit: 10,
              },
            },
            y: {
              ticks: {
                // Include a rupee sign in the ticks
                callback: value => '₹' + formatCurrency(value as number),
              },
            },
          },
        },
        data: {
          labels: trends.labels,
          datasets: [
            {
              label: 'Expense',
              borderWidth: 1,
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgb(255, 99, 132, 0.5)',
              data: trends.expenseData,
            },
            {
              label: 'Income',
              borderWidth: 1,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgb(75, 192, 192, 0.5)',
              data: trends.incomeData,
            },
          ],
        },
      });

      chartRef.current = chart;
      chart.update();

      return () => {
        chart.destroy();
      };
    },
    [trends.expenseData, trends.incomeData, trends.labels]
  );

  return (
    <Section className={className} header="Trends">
      <Filter />
      <canvas ref={canvasRef} />
    </Section>
  );
};

export default Trends;
