import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface StockChartProps {
    stockItems: { id: string; name: string; quantity: number }[];
}

const StockChart: React.FC<StockChartProps> = ({ stockItems }) => {
    const data = {
        labels: stockItems.map(item => item.name),
        datasets: [
            {
                label: 'Quantity',
                data: stockItems.map(item => item.quantity),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Stock Quantities',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default StockChart;