import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Charts = ({ pieData, lineData }) => {
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);
    const pieChartInstance = useRef(null);
    const lineChartInstance = useRef(null);

    useEffect(() => {
        // Cleanup previous charts
        if (pieChartInstance.current) {
            pieChartInstance.current.destroy();
        }
        if (lineChartInstance.current) {
            lineChartInstance.current.destroy();
        }

        // Create new pie chart
        if (pieChartRef.current) {
            pieChartInstance.current = new Chart(pieChartRef.current, {
                type: 'pie',
                data: pieData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            });
        }

        // Create new line chart
        if (lineChartRef.current) {
            lineChartInstance.current = new Chart(lineChartRef.current, {
                type: 'line',
                data: lineData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1
                            }
                        }
                    }
                },
            });
        }

        // Cleanup on unmount
        return () => {
            if (pieChartInstance.current) {
                pieChartInstance.current.destroy();
            }
            if (lineChartInstance.current) {
                lineChartInstance.current.destroy();
            }
        };
    }, [pieData, lineData]);

    return (
        <>
            <div className="chart-card">
                <h3>Compliance Status</h3>
                <div className="chart-container">
                    <canvas ref={pieChartRef} />
                </div>
            </div>

            <div className="chart-card">
                <h3>Upcoming Tasks Timeline</h3>
                <div className="chart-container">
                    <canvas ref={lineChartRef} />
                </div>
            </div>
        </>
    );
};

export default Charts; 