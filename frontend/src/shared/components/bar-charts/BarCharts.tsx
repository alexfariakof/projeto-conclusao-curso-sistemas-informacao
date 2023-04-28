import React from 'react';
import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { Paper, Box, useTheme, useMediaQuery, Theme } from '@mui/material';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const optionsTop = {    
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Lançamentos Ano 2022',
        },
    },
};


export const optionsRight = {    
    indexAxis: 'y' as const,
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Lançamentos Ano 2022',
        },
    },
};

const labels = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Despesas',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Receitas',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};


export const BarCharts: React.FC = () => {
    const [chartHeight, setChartHeight] = useState(0);
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const theme = useTheme();

    useEffect(() => {
        const handleResize = () => {
          setChartHeight(window.innerHeight * 0.8); // Define a altura do gráfico como 80% da altura da janela
        };
    
        window.addEventListener('resize', handleResize);
        handleResize(); // Define a altura do gráfico ao montar o componente
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        smDown ?
            <Bar height={chartHeight} options={optionsRight} data={data}  />
            :
            <Bar height={chartHeight} options={optionsTop} data={data} />
    );

};