import Chart from 'chart.js/auto';

const pieData = {
    labels: ['Delivered', 'Cancelled', 'Pending'],
    datasets: [
        {
            data: [300, 50, 100],
            backgroundColor: ['#45aaff', '#dc3545', '#f8b64c'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            borderColor: '#fff',
            borderWidth: 2,
        },
    ],
};

const lineData = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    datasets: [
        {
            label: 'Sales 2022',
            data: [100, 120, 150, 132, 180, 154, 250, 300, 280, 320, 400, 350],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            pointBackgroundColor: '#36A2EB',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#36A2EB',
            borderWidth: 2,
        },
        {
            label: 'Sales 2023',
            data: [200, 220, 60, 240, 300, 350, 400, 450, 200, 550, 800, 600],
            borderColor: '#FFCE56',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointBackgroundColor: '#FFCE56',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#FFCE56',
            borderWidth: 2,
        },
        {
            label: 'Sales 2021',
            data: [50, 120, 60, 740, 300, 350, 210, 150, 100, 550, 200, 600],
            borderColor: '#dc3545',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointBackgroundColor: '#dc3545',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#dc3545',
            borderWidth: 2,
        },
    ],
};

const pieOptions = {
    plugins: {
        legend: {
            labels: {
                font: {
                    family: 'Verdana',
                    weight: 'bold',
                    size: 13,
                    color: '#000 !important'
                }
            }
        }
    }, options: {
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    }
};

const lineOptions = {
    maintainAspectRatio: false, // Prevent the chart from maintaining its aspect ratio
    scales: {
        y: {
            ticks: {
                font: {
                    family: 'Verdana',
                    weight: 'bold',
                    size: 9,
                    color: '#000 !important' // Add font color
                }
            }
        },
        x: {
            ticks: {
                font: {
                    family: 'Verdana',
                    weight: 'bold',
                    size: 10,
                    color: '#000 !important'
                }
            }
        }
    },
    plugins: {
        legend: {
            labels: {
                font: {
                    family: 'Verdana',
                    weight: 'bold',
                    size: 13,
                    color: '#000'
                }
            }
        }
    },
    options: {
        animation: {
            onComplete: () => {
                delayed = true;
            },
            delay: (context) => {
                let delay = 0;
                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                }
                return delay;
            },
        },
    }
};

const ChartData = { pieData, lineData, lineOptions, pieOptions };
export default ChartData;