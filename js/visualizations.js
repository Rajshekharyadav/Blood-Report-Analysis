// Visualizations module for Blood Report Analyzer
// Uses Chart.js to create interactive visualizations of analysis results

// Create chart for abnormal parameters
function createAbnormalParametersChart(abnormalValues) {
    const ctx = document.getElementById('abnormal-chart').getContext('2d');
    
    // Extract data from abnormal values
    const labels = [];
    const values = [];
    const normalRangeMin = [];
    const normalRangeMax = [];
    const backgroundColors = [];
    
    for (const param in abnormalValues) {
        const { value, normalRange, status, description } = abnormalValues[param];
        
        // Extract min and max from normal range string
        const [min, max] = normalRange.split(' - ').map(parseFloat);
        
        labels.push(description);
        values.push(value);
        normalRangeMin.push(min);
        normalRangeMax.push(max);
        
        // Set color based on status
        if (status === 'high') {
            backgroundColors.push('rgba(231, 76, 60, 0.7)'); // Red for high
        } else if (status === 'low') {
            backgroundColors.push('rgba(243, 156, 18, 0.7)'); // Orange for low
        }
    }
    
    // Destroy existing chart if it exists
    if (window.abnormalChart) {
        window.abnormalChart.destroy();
    }
    
    // Create new chart
    window.abnormalChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Your Values',
                    data: values,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                    borderWidth: 1
                },
                {
                    label: 'Normal Range (Min)',
                    data: normalRangeMin,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(39, 174, 96, 0.7)',
                    borderDash: [5, 5],
                    pointRadius: 0
                },
                {
                    label: 'Normal Range (Max)',
                    data: normalRangeMax,
                    type: 'line',
                    fill: false,
                    borderColor: 'rgba(39, 174, 96, 0.7)',
                    borderDash: [5, 5],
                    pointRadius: 0
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Abnormal Blood Parameters Compared to Normal Range'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const dataIndex = context.dataIndex;
                            const datasetIndex = context.datasetIndex;
                            
                            if (datasetIndex === 0) {
                                const value = context.dataset.data[dataIndex];
                                const min = normalRangeMin[dataIndex];
                                const max = normalRangeMax[dataIndex];
                                
                                return [
                                    `Value: ${value}`,
                                    `Normal Range: ${min} - ${max}`
                                ];
                            } else {
                                return context.dataset.label + ': ' + context.parsed.y;
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Blood Parameters'
                    }
                }
            }
        }
    });
    
    return window.abnormalChart;
}

// Create chart for disease risk assessment
function createDiseaseRiskChart(potentialConditions) {
    const ctx = document.getElementById('risk-chart').getContext('2d');
    
    // Extract data from potential conditions
    const labels = [];
    const probabilities = [];
    const backgroundColors = [];
    
    // Convert object to array and sort by probability
    const sortedConditions = Object.entries(potentialConditions)
        .sort((a, b) => b[1].probability - a[1].probability)
        .slice(0, 5); // Show top 5 conditions
    
    for (const [condition, data] of sortedConditions) {
        const { probability, severity } = data;
        
        labels.push(formatConditionName(condition));
        probabilities.push(probability);
        
        // Set color based on severity
        if (severity === 'high') {
            backgroundColors.push('rgba(231, 76, 60, 0.7)'); // Red for high
        } else if (severity === 'moderate') {
            backgroundColors.push('rgba(243, 156, 18, 0.7)'); // Orange for moderate
        } else {
            backgroundColors.push('rgba(39, 174, 96, 0.7)'); // Green for mild
        }
    }
    
    // Destroy existing chart if it exists
    if (window.riskChart) {
        window.riskChart.destroy();
    }
    
    // Create new chart
    window.riskChart = new Chart(ctx, {
        type: 'polarArea',
        data: {
            labels: labels,
            datasets: [{
                data: probabilities,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.7', '1')),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Disease Risk Assessment by Probability (%)'
                },
                legend: {
                    position: 'right'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.r;
                            return `Probability: ${value}%`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 100,
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
    
    return window.riskChart;
}

// Create BMI visualization if weight and height are provided
function createHealthMetricsVisualizations(patientInfo) {
    if (patientInfo.weight && patientInfo.height) {
        // Calculate BMI
        const heightInMeters = patientInfo.height / 100;
        const bmi = (patientInfo.weight / (heightInMeters * heightInMeters)).toFixed(1);
        
        // Create BMI visualization
        const bmiCard = document.createElement('div');
        bmiCard.className = 'chart-card bmi-card';
        
        // Determine BMI category and color
        let bmiCategory, bmiColor;
        if (bmi < 18.5) {
            bmiCategory = 'Underweight';
            bmiColor = 'var(--warning-color)';
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiCategory = 'Normal weight';
            bmiColor = 'var(--success-color)';
        } else if (bmi >= 25 && bmi < 30) {
            bmiCategory = 'Overweight';
            bmiColor = 'var(--warning-color)';
        } else {
            bmiCategory = 'Obese';
            bmiColor = 'var(--error-color)';
        }
        
        bmiCard.innerHTML = `
            <h3>Body Mass Index (BMI)</h3>
            <div class="bmi-display">
                <div class="bmi-value" style="color: ${bmiColor}">${bmi}</div>
                <div class="bmi-category" style="color: ${bmiColor}">${bmiCategory}</div>
            </div>
            <div class="bmi-scale">
                <div class="bmi-range underweight">Underweight</div>
                <div class="bmi-range normal">Normal</div>
                <div class="bmi-range overweight">Overweight</div>
                <div class="bmi-range obese">Obese</div>
            </div>
            <div class="bmi-info">
                <p>BMI = ${patientInfo.weight} kg / (${heightInMeters} m)²</p>
                <p>BMI is a screening tool, not a diagnostic measure.</p>
            </div>
        `;
        
        // Add to visualization tab
        document.querySelector('.chart-container').appendChild(bmiCard);
    }
}

// Helper to format condition names
function formatConditionName(condition) {
    return condition
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, match => match.toUpperCase()); // Capitalize first letter
} 