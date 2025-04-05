// DOM Elements - Upload and Patient Info
const uploadSection = document.getElementById('uploadSection');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('file-info');
const fileName = document.getElementById('file-name');
const analyzeButton = document.getElementById('analyzeButton');

// DOM Elements - Loading
const loadingSection = document.getElementById('loadingSection');
const loadingMessage = document.getElementById('loadingMessage');
const loadingProgress = document.querySelector('.loading-progress');

// DOM Elements - Results
const resultsSection = document.getElementById('resultsSection');
const patientSummary = document.getElementById('patient-summary');
const reportDate = document.getElementById('report-date');
const summaryContent = document.getElementById('summary-content');
const abnormalParameters = document.getElementById('abnormalParameters');
const normalParameters = document.getElementById('normalParameters');
const potentialConditions = document.getElementById('potentialConditions');
const medicalRecommendations = document.getElementById('medicalRecommendations');
const lifestyleRecommendations = document.getElementById('lifestyleRecommendations');
const printButton = document.getElementById('printButton');
const newAnalysisButton = document.getElementById('newAnalysisButton');

// DOM Elements - Stats
const normalCount = document.getElementById('normalCount');
const abnormalCount = document.getElementById('abnormalCount');
const conditionsCount = document.getElementById('conditionsCount');

// DOM Elements - Alert
const alertOverlay = document.getElementById('alertOverlay');
const alertIcon = document.getElementById('alertIcon');
const alertTitle = document.getElementById('alertTitle');
const alertMessage = document.getElementById('alertMessage');
const alertButton = document.getElementById('alertButton');

// DOM Elements - Tabs
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

// Patient Info Form Elements
const patientInfoForm = document.getElementById('patient-info-form');
const patientName = document.getElementById('patientName');
const patientAge = document.getElementById('patientAge');
const patientGender = document.getElementById('patientGender');
const patientRace = document.getElementById('patientRace');
const patientWeight = document.getElementById('patientWeight');
const patientHeight = document.getElementById('patientHeight');

// Blood test normal ranges and potential conditions database
const bloodTestRanges = {
    hemoglobin: { min: 13.5, max: 17.5, unit: 'g/dL', description: 'Protein in red blood cells that carries oxygen' },
    hematocrit: { min: 41, max: 50, unit: '%', description: 'Percentage of blood volume composed of red blood cells' },
    wbc: { min: 4.5, max: 11.0, unit: '10³/µL', description: 'White blood cells that fight infection' },
    rbc: { min: 4.5, max: 5.9, unit: '10⁶/µL', description: 'Red blood cells that carry oxygen' },
    platelets: { min: 150, max: 450, unit: '10³/µL', description: 'Cells that help blood clot' },
    glucose: { min: 70, max: 99, unit: 'mg/dL', description: 'Blood sugar level' },
    cholesterol: { min: 125, max: 200, unit: 'mg/dL', description: 'Total cholesterol level' },
    ldl: { min: 0, max: 100, unit: 'mg/dL', description: 'Low-density lipoprotein ("bad" cholesterol)' },
    hdl: { min: 40, max: 60, unit: 'mg/dL', description: 'High-density lipoprotein ("good" cholesterol)' },
    triglycerides: { min: 0, max: 150, unit: 'mg/dL', description: 'Type of fat in the blood' },
    sodium: { min: 135, max: 145, unit: 'mEq/L', description: 'Electrolyte that regulates fluid balance' },
    potassium: { min: 3.5, max: 5.0, unit: 'mEq/L', description: 'Electrolyte important for nerve and muscle function' },
    creatinine: { min: 0.7, max: 1.3, unit: 'mg/dL', description: 'Waste product that indicates kidney function' },
    urea: { min: 7, max: 20, unit: 'mg/dL', description: 'Waste product filtered by the kidneys' },
    albumin: { min: 3.5, max: 5.0, unit: 'g/dL', description: 'Protein made by the liver' },
    bilirubin: { min: 0.1, max: 1.2, unit: 'mg/dL', description: 'Waste product from the breakdown of red blood cells' },
    alt: { min: 7, max: 55, unit: 'U/L', description: 'Enzyme found primarily in the liver' },
    ast: { min: 8, max: 48, unit: 'U/L', description: 'Enzyme found in the liver, heart, and muscles' }
};

// Health conditions and their related parameters
const healthConditions = {
    anemia: {
        parameters: ['hemoglobin', 'hematocrit', 'rbc'],
        description: 'A condition where you lack enough healthy red blood cells to carry adequate oxygen to your tissues.',
        severityLevels: {
            mild: 'Slight reduction in red blood cells, possibly causing mild fatigue.',
            moderate: 'Moderate reduction in red blood cells, often causing fatigue, weakness, and pale skin.',
            high: 'Significant reduction in red blood cells, may cause severe fatigue, weakness, shortness of breath, and dizziness.'
        },
        recommendations: [
            'Include iron-rich foods in your diet (lean meats, beans, leafy greens).',
            'Consider vitamin C with meals to improve iron absorption.',
            'Consult your doctor about potential supplements.',
            'Follow up with additional testing to determine the cause of anemia.'
        ]
    },
    diabetes: {
        parameters: ['glucose'],
        description: 'A chronic condition affecting how your body processes blood sugar (glucose).',
        severityLevels: {
            mild: 'Slightly elevated blood glucose levels, indicating prediabetes or well-controlled diabetes.',
            moderate: 'Moderately elevated blood glucose levels, requiring attention to diet, exercise, and possibly medication.',
            high: 'Significantly elevated blood glucose levels, suggesting poorly controlled diabetes with increased risk of complications.'
        },
        recommendations: [
            'Monitor blood glucose levels regularly.',
            'Follow a balanced diet low in simple carbohydrates.',
            'Engage in regular physical activity.',
            'Take medications as prescribed by your healthcare provider.'
        ]
    },
    kidneyDisease: {
        parameters: ['creatinine', 'urea', 'albumin'],
        description: 'A condition where your kidneys are damaged and cannot filter blood properly.',
        severityLevels: {
            mild: 'Early kidney damage with normal or mildly reduced kidney function.',
            moderate: 'Moderately reduced kidney function requiring medical management.',
            high: 'Severely reduced kidney function, approaching kidney failure and possibly requiring dialysis or transplant.'
        },
        recommendations: [
            'Control blood pressure and diabetes if present.',
            'Follow a kidney-friendly diet low in sodium, potassium, and phosphorus.',
            'Avoid nephrotoxic medications like NSAIDs when possible.',
            'Regular follow-up with a nephrologist or healthcare provider.'
        ]
    },
    liverDisease: {
        parameters: ['alt', 'ast', 'bilirubin', 'albumin'],
        description: 'A condition affecting liver function, which can impact digestion, metabolism, and detoxification.',
        severityLevels: {
            mild: 'Mild elevation in liver enzymes, indicating minor liver stress or inflammation.',
            moderate: 'Moderate elevation in liver enzymes and possible changes in other liver markers, suggesting ongoing liver damage.',
            high: 'Significant abnormalities in liver function tests, indicating severe liver damage or dysfunction.'
        },
        recommendations: [
            'Avoid alcohol and medications that can harm the liver.',
            'Maintain a healthy weight and follow a balanced diet.',
            'Consider hepatitis testing and vaccination if not already done.',
            'Follow up with a hepatologist or gastroenterologist.'
        ]
    },
    heartDisease: {
        parameters: ['cholesterol', 'ldl', 'hdl', 'triglycerides'],
        description: 'A range of conditions affecting heart function and blood vessel health.',
        severityLevels: {
            mild: 'Slight elevation in cardiovascular risk factors like cholesterol or blood pressure.',
            moderate: 'Moderate elevation in multiple risk factors, suggesting increased cardiovascular risk.',
            high: 'Significant abnormalities in lipid profile and other markers, indicating high cardiovascular risk.'
        },
        recommendations: [
            'Follow a heart-healthy diet low in saturated fats and sodium.',
            'Engage in regular aerobic exercise (150 minutes per week).',
            'Consider medication as prescribed by your healthcare provider.',
            'Monitor blood pressure and cholesterol levels regularly.'
        ]
    },
    electrolytesImbalance: {
        parameters: ['sodium', 'potassium'],
        description: 'An imbalance in the essential minerals that maintain fluid balance and support nerve and muscle function.',
        severityLevels: {
            mild: 'Slight deviation from normal electrolyte levels, usually not causing symptoms.',
            moderate: 'Moderate electrolyte imbalance that may cause mild symptoms like muscle weakness or cramping.',
            high: 'Severe electrolyte imbalance that can cause serious symptoms including irregular heartbeat or confusion.'
        },
        recommendations: [
            'Stay properly hydrated, especially during physical activity.',
            'Consume a balanced diet rich in fruits and vegetables.',
            'Be cautious with sports drinks, which can sometimes worsen imbalances.',
            'Follow up with your healthcare provider, especially if taking medications that affect electrolytes.'
        ]
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add debugging
    console.log("DOM Content Loaded");
    console.log("fileInput element:", fileInput);
    console.log("uploadArea element:", uploadArea);
    
    // Check if fileInput is properly hidden
    if (fileInput && getComputedStyle(fileInput).display === 'none') {
        console.log("fileInput is hidden by CSS, which is correct");
    } else {
        console.warn("fileInput visibility issue - should be hidden");
    }
    
    initializeApp();
});

// Initialize the application
function init() {
    // This function is no longer used - all initialization is now in initializeApp
    console.log("Using newer initialization function instead");
}

// Set up all event listeners
function setupEventListeners() {
    // This function is no longer used - all event listeners are set up in initializeApp
    console.log("Using newer event listener setup in initializeApp");
}

// Initialize tabs
function initializeTabs() {
    // This function is no longer used - tab initialization is now in initializeApp
    console.log("Using newer tab initialization in initializeApp");
}

// Show upload view
function showUploadView() {
    uploadSection.classList.remove('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
}

// Show loading view
function showLoadingView() {
    uploadSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    // Reset loading animation and step indicators
    loadingProgress.style.width = '0%';
    
    // Reset all step indicators
    const stepIcons = [
        document.getElementById('step1Icon'),
        document.getElementById('step2Icon'),
        document.getElementById('step3Icon'), 
        document.getElementById('step4Icon')
    ];
    
    stepIcons.forEach((icon, index) => {
        if (icon) {
            // Reset to default state
            icon.className = 'loading-step-icon';
            
            // Reset the inner icon
            const iconElement = icon.querySelector('i');
            if (iconElement) {
                iconElement.className = 'fas fa-circle';
            }
        }
    });
    
    // Set initial loading message
    updateLoadingStatus('Preparing your report for analysis...', 'Initializing the analysis process');
    
    // Start with a small progress to indicate the process has begun
    updateLoadingProgress(5);
}

// Show results view
function showResultsView() {
    uploadSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
}

/**
 * Shows an alert with the given title, message, and type
 * @param {string} title - The alert title
 * @param {string} message - The alert message
 * @param {string} type - The alert type (error, success, warning, info)
 */
function showAlert(title, message, type = 'info') {
    console.log(`Showing alert: ${type} - ${title}`);
    
    const alertOverlay = document.getElementById('alertOverlay');
    const alertTitle = document.getElementById('alertTitle');
    const alertMessage = document.getElementById('alertMessage');
    const alertIcon = document.getElementById('alertIcon');
    
    if (!alertOverlay || !alertTitle || !alertMessage || !alertIcon) {
        console.error('Alert elements not found in the DOM');
        return;
    }
    
    // Set alert content
    alertTitle.textContent = title;
    alertMessage.textContent = message;
    
    // Set icon based on alert type
    alertIcon.className = 'fas';
    switch (type) {
        case 'error':
            alertIcon.classList.add('fa-exclamation-circle');
            alertIcon.style.color = 'var(--error-color, #e74c3c)';
            break;
        case 'success':
            alertIcon.classList.add('fa-check-circle');
            alertIcon.style.color = 'var(--success-color, #2ecc71)';
            break;
        case 'warning':
            alertIcon.classList.add('fa-exclamation-triangle');
            alertIcon.style.color = 'var(--warning-color, #f39c12)';
            break;
        case 'info':
        default:
            alertIcon.classList.add('fa-info-circle');
            alertIcon.style.color = 'var(--primary-color, #3498db)';
            break;
    }
    
    // Show the alert
    alertOverlay.classList.remove('hidden');
    
    // Use setTimeout to ensure the transition happens
    setTimeout(() => {
        alertOverlay.classList.add('visible');
    }, 10);
    
    // Auto-hide non-error alerts after 4 seconds
    if (type !== 'error') {
        setTimeout(() => {
            closeAlert();
        }, 4000);
    }
}

/**
 * Closes the alert dialog
 */
function closeAlert() {
    const alertOverlay = document.getElementById('alertOverlay');
    if (alertOverlay) {
        alertOverlay.classList.remove('visible');
        setTimeout(() => {
            alertOverlay.classList.add('hidden');
        }, 300); // Match the CSS transition duration
    }
}

/**
 * Initializes the alert button with an event listener
 */
function initAlertButton() {
    const alertButton = document.getElementById('alertButton');
    if (alertButton) {
        alertButton.addEventListener('click', closeAlert);
    }
}

// Update loading message with enhanced UI feedback
function updateLoadingStatus(message, detail = '', step = 0) {
    // Update main loading message
    loadingMessage.textContent = message;
    
    // Update processing detail if provided
    const processingDetail = document.getElementById('processingDetail');
    if (processingDetail && detail) {
        processingDetail.textContent = detail;
    }
    
    // Update step icons if step is specified
    if (step > 0) {
        // Reset all icons
        const stepIcons = [
            document.getElementById('step1Icon'),
            document.getElementById('step2Icon'),
            document.getElementById('step3Icon'), 
            document.getElementById('step4Icon')
        ];
        
        stepIcons.forEach((icon, index) => {
            if (icon) {
                // Remove all classes
                icon.className = 'loading-step-icon';
                
                // Add appropriate class based on current step
                if (index + 1 < step) {
                    icon.className = 'loading-step-icon completed';
                } else if (index + 1 === step) {
                    icon.className = 'loading-step-icon active';
                }
                
                // Update icon
                const iconElement = icon.querySelector('i');
                if (iconElement) {
                    iconElement.className = 'fas';
                    
                    if (index + 1 < step) {
                        iconElement.classList.add('fa-check');
                    } else if (index + 1 === step) {
                        iconElement.classList.add('fa-spinner', 'fa-spin');
                    } else {
                        iconElement.classList.add('fa-circle');
                    }
                }
            }
        });
    }
    
    console.log("Loading status:", message, detail ? `(${detail})` : '');
}

// Function to print results
function printResults() {
    window.print();
}

// Function to reset application
function resetApplication() {
    showUploadView();
    fileInput.value = '';
}

// Loading animation functions
function updateLoadingStep(step) {
    // This function is no longer used
    console.log("Loading step:", step);
}

function updateLoadingProgress(percent) {
    // Ensure percent is a valid number between 0 and 100
    percent = Math.max(0, Math.min(100, percent));
    percent = Math.round(percent); // Round to nearest integer for display
    
    // Update loading progress bar
    loadingProgress.style.width = `${percent}%`;
    
    // Update the progress percentage text if it exists
    const progressPercentText = document.getElementById('progressPercent');
    if (progressPercentText) {
        progressPercentText.textContent = `${percent}%`;
    }
    
    // Log progress to console for debugging
    if (percent % 10 === 0) {  // Only log at 10% increments to avoid flooding console
        console.log(`Loading progress: ${percent}%`);
    }
}

// Animate progress bar
function animateProgress(start, end, duration, callback) {
    const startTime = performance.now();
    
    function updateProgress(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(start + (end - start) * (elapsedTime / duration), end);
        
        updateLoadingProgress(progress);
        
        if (progress < end) {
            requestAnimationFrame(updateProgress);
        } else if (callback) {
            callback();
        }
    }
    
    requestAnimationFrame(updateProgress);
}

// Analysis functions
async function analyzeReport() {
    // This function is deprecated and has been replaced by processBloodReport
    processBloodReport();
}

// Clean up resources
async function cleanupResources(file) {
    // No longer needed as we're using mock data
    console.log("Cleanup complete");
}

function validatePatientInfo() {
    if (!patientAge.value) {
        showAlert('error', 'Error', 'Please enter patient age.');
        patientAge.focus();
        return false;
    }
    
    const age = parseInt(patientAge.value);
    if (isNaN(age) || age < 0 || age > 120) {
        showAlert('error', 'Error', 'Please enter a valid age between 0 and 120.');
        patientAge.focus();
        return false;
    }
    
    if (!patientGender.value) {
        showAlert('error', 'Error', 'Please select patient gender.');
        patientGender.focus();
        return false;
    }
    
    return true;
}

/**
 * Generate mock blood data for testing purposes
 * @returns {Object} Mock blood parameters
 */
function generateMockBloodData() {
    console.log("Generating basic mock blood data");
    return {
        hemoglobin: 14.5,
        hematocrit: 42,
        wbc: 7.5,
        rbc: 5.0,
        platelets: 250,
        glucose: 95,
        cholesterol: 180,
        ldl: 110,
        hdl: 50,
        triglycerides: 120,
        sodium: 140,
        potassium: 4.2,
        chloride: 101,
        calcium: 9.5,
        creatinine: 0.9,
        urea: 15,
        uricAcid: 5.5,
        alt: 25,
        ast: 28,
        alp: 80,
        bilirubin: 0.8
    };
}

function analyzeBloodData(bloodData, patientInfo) {
    // Identify abnormal values
    const abnormalValues = {};
    const normalValues = {};
    
    for (const param in bloodData) {
        const value = bloodData[param];
        if (!bloodTestRanges[param]) continue;
        
        const { min, max } = bloodTestRanges[param];
        
        if (value < min) {
            abnormalValues[param] = { 
                value, 
                normalRange: `${min} - ${max}`, 
                status: 'low',
                unit: bloodTestRanges[param].unit,
                description: bloodTestRanges[param].description
            };
        } else if (value > max) {
            abnormalValues[param] = { 
                value, 
                normalRange: `${min} - ${max}`, 
                status: 'high',
                unit: bloodTestRanges[param].unit,
                description: bloodTestRanges[param].description
            };
        } else {
            normalValues[param] = {
                value,
                normalRange: `${min} - ${max}`,
                status: 'normal',
                unit: bloodTestRanges[param].unit,
                description: bloodTestRanges[param].description
            };
        }
    }
    
    // Determine disease stages
    const diseaseStages = determineDiseaseStage(bloodData, patientInfo);
    
    // Traditional potential conditions (for compatibility)
    const potentialConditions = {};
    
    for (const condition in healthConditions) {
        const { parameters } = healthConditions[condition];
        let matchCount = 0;
        let totalRelevantParams = 0;
        
        for (const param of parameters) {
            if (bloodData[param] !== undefined) {
                totalRelevantParams++;
                if (abnormalValues[param]) {
                    matchCount++;
                }
            }
        }
        
        // Only calculate probability if we have relevant parameters
        if (totalRelevantParams > 0) {
            // Calculate probability based on match count
            const probability = matchCount / totalRelevantParams;
            
            // Only include conditions with at least 30% probability
            if (probability >= 0.3) {
                // Determine severity
                let severity;
                if (probability < 0.5) {
                    severity = 'mild';
                } else if (probability < 0.8) {
                    severity = 'moderate';
                } else {
                    severity = 'high';
                }
                
                potentialConditions[condition] = {
                    probability: (probability * 100).toFixed(0),
                    severity,
                    description: healthConditions[condition].description,
                    severityText: healthConditions[condition].severityLevels[severity],
                    recommendations: healthConditions[condition].recommendations
                };
            }
        }
    }
    
    // Merge disease stages with potential conditions
    const mergedConditions = { ...potentialConditions };
    
    for (const [diseaseKey, stageInfo] of Object.entries(diseaseStages)) {
        // If we have a more accurate staging, replace the general condition
        if (mergedConditions[diseaseKey]) {
            mergedConditions[diseaseKey] = {
                ...mergedConditions[diseaseKey],
                stageInfo: stageInfo,
                hasStaging: true
            };
        } else {
            // Add as a new condition with 100% probability since it's based on actual values
            mergedConditions[diseaseKey] = {
                probability: 100,
                severity: ['mild', 'moderate', 'high'][Math.min(stageInfo.severity, 2)],
                description: stageInfo.disease,
                stageInfo: stageInfo,
                hasStaging: true,
                recommendations: stageInfo.recommendations
            };
        }
    }
    
    // Generate recommendations
    const recommendations = generateRecommendations(mergedConditions, abnormalValues, patientInfo);
    
    // Generate lifestyle recommendations
    const lifestyleRecs = generateLifestyleRecommendations(mergedConditions, patientInfo);
    
    return {
        bloodData,
        abnormalValues,
        normalValues,
        potentialConditions: mergedConditions,
        recommendations,
        lifestyleRecommendations: lifestyleRecs
    };
}

function generateRecommendations(potentialConditions, abnormalValues, patientInfo) {
    const generalRecommendations = [
        'Schedule a follow-up appointment with your healthcare provider to discuss these results.',
        'Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.',
        'Stay hydrated by drinking enough water throughout the day.',
        'Get regular physical activity appropriate for your health status.',
        'Ensure you get adequate sleep (7-9 hours for most adults).',
        'Manage stress through relaxation techniques, exercise, or counseling if needed.'
    ];
    
    const specificRecommendations = [];
    
    // Add condition-specific recommendations for top conditions
    for (const condition in potentialConditions) {
        if (potentialConditions[condition].probability > 50) {
            // If has staging, use stage-specific recommendations
            if (potentialConditions[condition].hasStaging && potentialConditions[condition].stageInfo.recommendations) {
                specificRecommendations.push(
                    ...potentialConditions[condition].stageInfo.recommendations.slice(0, 3)
                );
            } else if (potentialConditions[condition].recommendations) {
                specificRecommendations.push(
                    ...potentialConditions[condition].recommendations.slice(0, 2)
                );
            }
        }
    }
    
    // Add parameter-specific recommendations
    if (abnormalValues['hemoglobin'] && abnormalValues['hemoglobin'].status === 'low') {
        specificRecommendations.push('Consider iron-rich foods like spinach, beans, and lean meats to improve hemoglobin levels.');
    }
    
    if (abnormalValues['cholesterol'] && abnormalValues['cholesterol'].status === 'high') {
        specificRecommendations.push('Reduce intake of saturated fats and increase consumption of omega-3 rich foods to help manage cholesterol.');
    }
    
    if (abnormalValues['glucose'] && abnormalValues['glucose'].status === 'high') {
        specificRecommendations.push('Limit consumption of refined carbohydrates and sugars to help manage blood glucose levels.');
    }
    
    // Add age-specific recommendations
    const age = patientInfo.age;
    if (age >= 50) {
        specificRecommendations.push('Consider regular screenings for colorectal cancer as recommended for adults over 50.');
    }
    
    // Add gender-specific recommendations
    if (patientInfo.gender === 'female' && age >= 40) {
        specificRecommendations.push('Schedule regular mammograms as recommended for breast cancer screening.');
    } else if (patientInfo.gender === 'male' && age >= 50) {
        specificRecommendations.push('Discuss prostate health and PSA testing with your healthcare provider.');
    }
    
    // Remove duplicates
    const uniqueRecommendations = [...new Set([...specificRecommendations, ...generalRecommendations])];
    
    return uniqueRecommendations;
}

function generateLifestyleRecommendations(potentialConditions, patientInfo) {
    const recommendations = [];
    
    // Check if there are any conditions requiring dietary changes
    const dietaryConditions = ['diabetes', 'heartDisease', 'kidneyDisease', 'liverDisease'];
    const hasDietaryCondition = Object.keys(potentialConditions).some(condition => dietaryConditions.includes(condition));
    
    if (hasDietaryCondition) {
        recommendations.push(
            'Consider consulting with a registered dietitian for a personalized nutrition plan',
            'Focus on eating a balanced diet with plenty of vegetables, fruits, and whole grains',
            'Limit processed foods, added sugars, and foods high in sodium'
        );
    }
    
    // Check for exercise recommendations
    const exerciseConditions = ['diabetes', 'heartDisease'];
    const hasExerciseCondition = Object.keys(potentialConditions).some(condition => exerciseConditions.includes(condition));
    
    if (hasExerciseCondition) {
        recommendations.push(
            'Aim for at least 150 minutes of moderate-intensity exercise per week',
            'Include both aerobic exercise and strength training in your routine',
            'Start slowly and gradually increase intensity if you haven\'t been active'
        );
    }
    
    // Check BMI if weight and height are provided
    if (patientInfo.weight && patientInfo.height) {
        const heightInMeters = patientInfo.height / 100;
        const bmi = patientInfo.weight / (heightInMeters * heightInMeters);
        
        if (bmi >= 25) {
            recommendations.push(
                'Consider working with a healthcare provider on a weight management plan',
                'Focus on sustainable lifestyle changes rather than crash diets',
                'Set realistic goals for gradual weight loss (1-2 pounds per week)'
            );
        }
    }
    
    // Add general wellness recommendations
    recommendations.push(
        'Practice stress management techniques such as meditation, deep breathing, or yoga',
        'Ensure you get 7-9 hours of quality sleep each night',
        'Stay socially connected with friends, family, and community'
    );
    
    // If we have diabetes or pre-diabetes
    if (potentialConditions.diabetes) {
        recommendations.push(
            'Monitor your blood glucose levels as recommended by your healthcare provider',
            'Be aware of the symptoms of high and low blood sugar',
            'Maintain a consistent eating schedule'
        );
    }
    
    return recommendations;
}

// UI Display functions
function displayResults(bloodData, ocrText) {
    try {
        console.log("Displaying analysis results with:", bloodData);
        if (!bloodData || Object.keys(bloodData).filter(key => bloodData[key] > 0).length === 0) {
            console.error("No valid blood data available to display");
            showAlert("Error", "Failed to extract blood data for analysis. Please try a different report.", "error");
            return false;
        }

        // Process patient information
        let patientInfo = {};
        try {
            patientInfo = typeof extractPatientInfo === 'function' ? 
                         extractPatientInfo(ocrText) : 
                         {
                             name: document.getElementById('patientName')?.value || 'Anonymous Patient',
                             age: parseInt(document.getElementById('patientAge')?.value) || 35,
                             gender: document.getElementById('patientGender')?.value || 'male',
                             height: parseFloat(document.getElementById('patientHeight')?.value) || 170,
                             weight: parseFloat(document.getElementById('patientWeight')?.value) || 70
                         };
            console.log("Extracted patient info:", patientInfo);
            
            // Update patient info display
            const patientSummary = document.getElementById('patient-summary');
            if (patientSummary) {
                patientSummary.innerHTML = `
                    <p><strong>Name:</strong> ${patientInfo.name}</p>
                    <p><strong>Age:</strong> ${patientInfo.age} years</p>
                    <p><strong>Gender:</strong> ${patientInfo.gender?.charAt(0).toUpperCase() + patientInfo.gender?.slice(1) || 'Not specified'}</p>
                    ${patientInfo.height ? `<p><strong>Height:</strong> ${patientInfo.height} cm</p>` : ''}
                    ${patientInfo.weight ? `<p><strong>Weight:</strong> ${patientInfo.weight} kg</p>` : ''}
                `;
            }
            
            // Update date
            const reportDate = document.getElementById('report-date');
            if (reportDate) {
                reportDate.textContent = new Date().toLocaleDateString();
            }
        } catch (patientInfoError) {
            console.error("Error processing patient info:", patientInfoError);
        }
        
        // Use disease staging algorithm if available
        let diseaseStages = {};
        try {
            if (typeof determineDiseaseStage === 'function') {
                diseaseStages = determineDiseaseStage(bloodData, patientInfo);
                console.log("Disease staging complete:", diseaseStages);
            } else {
                console.warn("Disease staging function not available");
            }
        } catch (diseaseStagingError) {
            console.error("Error in disease staging:", diseaseStagingError);
        }
        
        // Perform health analysis if available
        let healthAnalysis = null;
        try {
            if (typeof performMultiFactorHealthAnalysis === 'function') {
                healthAnalysis = performMultiFactorHealthAnalysis(bloodData, patientInfo, diseaseStages);
                console.log("Health analysis complete:", healthAnalysis);
            }
        } catch (analysisError) {
            console.error("Error in health analysis:", analysisError);
        }
        
        // Prepare blood data for display
        let processedData = bloodData;
        try {
            if (typeof prepareBloodDataForDisplay === 'function') {
                processedData = prepareBloodDataForDisplay(bloodData);
                console.log("Processed data for display:", processedData);
            } else {
                console.warn("prepareBloodDataForDisplay function not available");
                // Basic processing as fallback
                processedData = Object.entries(bloodData).map(([key, value]) => {
                    return {
                        name: key,
                        value: value,
                        isAbnormal: false // Default to not abnormal without reference ranges
                    };
                });
            }
        } catch (processError) {
            console.error("Error processing blood data:", processError);
        }
        
        // Update the results UI
        try {
            if (typeof updateResultsDisplay === 'function') {
                updateResultsDisplay(processedData, diseaseStages, healthAnalysis);
            } else {
                // Basic display as fallback
                displayBasicResults(processedData);
            }
        } catch (displayError) {
            console.error("Error updating results display:", displayError);
        }
        
        // Create visualizations
        try {
            if (typeof createVisualizations === 'function') {
                createVisualizations(processedData, diseaseStages, healthAnalysis);
            } else {
                console.warn("createVisualizations function not available");
                // Try to create individual charts if available
                if (typeof createAbnormalParametersChart === 'function') {
                    try {
                        createAbnormalParametersChart(processedData);
                    } catch(chartErr) {
                        console.error("Error creating abnormal parameters chart:", chartErr);
                    }
                }
                
                if (typeof createDiseaseRiskChart === 'function') {
                    try {
                        createDiseaseRiskChart(diseaseStages);
                    } catch(chartErr) {
                        console.error("Error creating disease risk chart:", chartErr);
                    }
                }
            }
        } catch (chartError) {
            console.error("Error creating visualizations:", chartError);
            showAlert("Warning", "Analysis completed, but there was an error creating some visualizations.", "warning");
        }
        
        // Show disease risk information if available
        try {
            if (typeof displayDiseaseRisks === 'function') {
                displayDiseaseRisks(diseaseStages);
            }
        } catch (riskDisplayError) {
            console.error("Error displaying disease risks:", riskDisplayError);
        }
        
        // Display ML insights if available
        try {
            if (healthAnalysis && typeof displayMlInsights === 'function') {
                displayMlInsights(healthAnalysis);
            }
        } catch (insightsError) {
            console.error("Error displaying ML insights:", insightsError);
        }
        
        // Update the blood count statistics
        try {
            updateBloodCountStats(processedData);
        } catch (statsError) {
            console.error("Error updating statistics:", statsError);
        }
        
        // Hide loading and show results sections
        const loadingSection = document.getElementById('loadingSection');
        const resultsSection = document.getElementById('resultsSection');
        
        if (loadingSection) loadingSection.classList.add('hidden');
        if (resultsSection) resultsSection.classList.remove('hidden');
        
        // Scroll to results if available
        if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Show success alert
        showAlert("Analysis Complete", "Your blood report has been successfully analyzed.", "success");
        
        return true;
    } catch (error) {
        console.error("Error displaying results:", error);
        const loadingSection = document.getElementById('loadingSection');
        if (loadingSection) loadingSection.classList.add('hidden');
        showAlert("Error", "An error occurred while displaying the results: " + error.message, "error");
        return false;
    }
}

/**
 * Updates the blood count statistics in the UI
 * @param {Object} processedData - The processed blood data
 */
function updateBloodCountStats(processedData) {
    const normalCount = document.getElementById('normalCount');
    const abnormalCount = document.getElementById('abnormalCount');
    const conditionsCount = document.getElementById('conditionsCount');
    
    if (!processedData) return;
    
    let normal = 0;
    let abnormal = 0;
    
    // Count normal and abnormal parameters
    if (Array.isArray(processedData)) {
        processedData.forEach(param => {
            if (param.isAbnormal) {
                abnormal++;
            } else {
                normal++;
            }
        });
    } else if (typeof processedData === 'object') {
        Object.values(processedData).forEach(param => {
            if (typeof param === 'object' && param.isAbnormal) {
                abnormal++;
            } else {
                normal++;
            }
        });
    }
    
    // Update the count displays
    if (normalCount) normalCount.textContent = normal;
    if (abnormalCount) abnormalCount.textContent = abnormal;
    
    // Update conditions count if we have disease stages
    const diseaseStages = document.querySelectorAll('#potentialConditions .condition-card');
    if (conditionsCount && diseaseStages) {
        conditionsCount.textContent = diseaseStages.length;
    }
}

/**
 * Basic fallback display function when updateResultsDisplay is not available
 * @param {Object} processedData - The processed blood data
 */
function displayBasicResults(processedData) {
    console.log("Using basic results display fallback");
    
    // Get container elements
    const abnormalParamsContainer = document.getElementById('abnormalParameters');
    const normalParamsContainer = document.getElementById('normalParameters');
    
    // Clear containers if they exist
    if (abnormalParamsContainer) abnormalParamsContainer.innerHTML = '';
    if (normalParamsContainer) normalParamsContainer.innerHTML = '';
    
    // Display all parameters in the normal parameters section
    if (normalParamsContainer && Array.isArray(processedData)) {
        processedData.forEach(param => {
            const paramElement = document.createElement('div');
            paramElement.className = 'parameter';
            paramElement.innerHTML = `
                <h4>${formatParameterName(param.name)}</h4>
                <div class="parameter-value">${param.value}</div>
            `;
            normalParamsContainer.appendChild(paramElement);
        });
    } else if (normalParamsContainer && typeof processedData === 'object') {
        // Handle case where processedData is an object
        Object.entries(processedData).forEach(([name, value]) => {
            const paramElement = document.createElement('div');
            paramElement.className = 'parameter';
            paramElement.innerHTML = `
                <h4>${formatParameterName(name)}</h4>
                <div class="parameter-value">${typeof value === 'object' ? value.value || value : value}</div>
            `;
            normalParamsContainer.appendChild(paramElement);
        });
    }
    
    // Update count displays
    updateBloodCountStats(processedData);
}

/**
 * Helper function to format parameter names
 * @param {string} param - The parameter name to format
 * @returns {string} - Formatted parameter name
 */
function formatParameterName(param) {
    if (!param) return 'Unknown Parameter';
    
    // Handle camelCase
    const spacedParam = param.replace(/([A-Z])/g, ' $1');
    
    // Capitalize first letter and known abbreviations
    const formattedParam = spacedParam.replace(/\b\w/g, c => c.toUpperCase());
    
    // Replace common abbreviations
    return formattedParam
        .replace(/\bWbc\b/g, 'WBC')
        .replace(/\bRbc\b/g, 'RBC')
        .replace(/\bHdl\b/g, 'HDL')
        .replace(/\bLdl\b/g, 'LDL')
        .replace(/\bAlt\b/g, 'ALT')
        .replace(/\bAst\b/g, 'AST')
        .replace(/\bHba1c\b/g, 'HbA1c')
        .replace(/\bMcv\b/g, 'MCV')
        .replace(/\bMch\b/g, 'MCH')
        .replace(/\bMchc\b/g, 'MCHC');
}

function formatParameterName(param) {
    // Special cases
    const specialCases = {
        'wbc': 'White Blood Cells (WBC)',
        'rbc': 'Red Blood Cells (RBC)',
        'ldl': 'LDL Cholesterol',
        'hdl': 'HDL Cholesterol',
        'alt': 'Alanine Transaminase (ALT)',
        'ast': 'Aspartate Transaminase (AST)'
    };
    
    if (specialCases[param]) return specialCases[param];
    
    // General formatting
    return param
        .replace(/([A-Z])/g, ' $1') // Add space before capital letters
        .replace(/^./, match => match.toUpperCase()); // Capitalize first letter
}

function downloadAnalysis() {
    // In a real app, this would generate a PDF of the analysis
    alert('In a production environment, this would download a PDF of your analysis results.');
}

function resetApplication() {
    showUploadView();
    fileInput.value = '';
}

// Function to check if Chart.js is loaded
function isChartJsLoaded() {
    return typeof Chart !== 'undefined';
}

/**
 * Create visualizations for the results with error handling
 * @param {Array} processedData - The processed blood data
 * @param {Object} diseaseStages - Disease staging results
 * @param {Object} healthAnalysis - Comprehensive health analysis results
 */
function createVisualizations(processedData, diseaseStages, healthAnalysis) {
    // Check if Chart.js is loaded
    if (!isChartJsLoaded()) {
        console.error("Chart.js is not loaded. Visualizations cannot be created.");
        return;
    }
    
    console.log("Creating visualizations for analysis results", { processedData, diseaseStages, healthAnalysis });
    
    try {
        // Create chart for abnormal parameters
        if (document.getElementById('abnormalParametersChart')) {
            try {
                const abnormalParams = Array.isArray(processedData) ? 
                    processedData.filter(param => param.isAbnormal) : [];
                createAbnormalParametersChart(abnormalParams);
            } catch (error) {
                console.error("Error creating abnormal parameters chart:", error);
            }
        } else {
            console.warn("abnormalParametersChart element not found, skipping chart creation");
        }
        
        // Create chart for potential conditions
        if (document.getElementById('diseaseRiskChart') && diseaseStages) {
            try {
                createDiseaseRiskChart(diseaseStages);
            } catch (error) {
                console.error("Error creating disease risk chart:", error);
            }
        } else {
            console.warn("diseaseRiskChart element not found or no disease stages available");
        }
        
        // Create health score visualization
        if (document.getElementById('healthScoreChart') && healthAnalysis) {
            try {
                createHealthScoreChart(healthAnalysis);
            } catch (error) {
                console.error("Error creating health score chart:", error);
            }
        }
        
        // Create insights visualization if we have health analysis data
        if (document.getElementById('insightsChart') && healthAnalysis && healthAnalysis.insights) {
            try {
                createInsightsVisualization(healthAnalysis.insights);
            } catch (error) {
                console.error("Error creating insights visualization:", error);
            }
        }
        
        console.log("Visualizations created successfully");
    } catch (error) {
        console.error("Error creating visualizations:", error);
        // Don't throw the error as this is non-critical functionality
    }
}

function determineDiseaseStage(bloodData, patientInfo) {
    console.log("Analyzing blood data with ML-enhanced algorithms...");
    console.log("Patient info:", patientInfo);
    console.log("Blood data:", bloodData);
    
    const stages = {};
    const riskScores = {};
    
    // Extract patient demographics for risk calculations
    const age = patientInfo.age || 50;
    const gender = patientInfo.gender || 'male';
    const isMale = gender.toLowerCase() === 'male';
    const height = patientInfo.height || 170; // in cm
    const weight = patientInfo.weight || 70; // in kg
    
    // Calculate BMI for risk assessment
    const bmi = weight / Math.pow(height/100, 2);
    
    // ML-inspired risk scoring - multifactorial analysis with weighted factors
    
    // DIABETES RISK ASSESSMENT - Enhanced algorithm
    if (bloodData.glucose || bloodData.hba1c) {
        const glucose = bloodData.glucose || 0;
        const hba1c = bloodData.hba1c || 0;
        let diabetesStage = null;
        let diabetesRiskScore = 0;
        
        // Primary indicators with higher weights
        if (glucose >= 126) {
            diabetesRiskScore += 50;
        } else if (glucose >= 100 && glucose < 126) {
            diabetesRiskScore += 25;
        }
        
        if (hba1c >= 6.5) {
            diabetesRiskScore += 50;
        } else if (hba1c >= 5.7 && hba1c < 6.5) {
            diabetesRiskScore += 25;
        }
        
        // Secondary risk factors with lower weights
        if (bmi >= 30) {
            diabetesRiskScore += 15;
        } else if (bmi >= 25) {
            diabetesRiskScore += 10;
        }
        
        if (age >= 45) {
            diabetesRiskScore += 10;
        }
        
        // Risk classification based on total score
        if (diabetesRiskScore >= 50) {
            diabetesStage = {
                disease: "Diabetes Mellitus",
                stage: "Type 2 Diabetes",
                severity: 2,
                riskScore: diabetesRiskScore,
                confidence: Math.min(diabetesRiskScore / 100, 0.95),
                primaryIndicators: {
                    glucose: glucose > 0 ? glucose : "Not available",
                    hba1c: hba1c > 0 ? hba1c : "Not available"
                },
                interpretation: glucose >= 126 ? 
                    "Fasting glucose ≥ 126 mg/dL indicates diabetes" : 
                    hba1c >= 6.5 ? 
                        "HbA1c ≥ 6.5% indicates diabetes" : 
                        "Multiple risk factors suggest diabetes",
                recommendations: [
                    "Consult with an endocrinologist for diabetes management",
                    "Monitor blood glucose levels regularly",
                    "Consider medication as prescribed by your doctor",
                    "Follow a diabetic diet low in simple carbohydrates",
                    "Regular physical activity of at least 150 minutes per week"
                ]
            };
        } else if (diabetesRiskScore >= 25) {
            diabetesStage = {
                disease: "Pre-Diabetes",
                stage: "Impaired Glucose Metabolism",
                severity: 1,
                riskScore: diabetesRiskScore,
                confidence: Math.min(diabetesRiskScore / 100, 0.9),
                primaryIndicators: {
                    glucose: glucose > 0 ? glucose : "Not available",
                    hba1c: hba1c > 0 ? hba1c : "Not available"
                },
                interpretation: glucose >= 100 && glucose < 126 ? 
                    "Fasting glucose between 100-125 mg/dL indicates prediabetes" : 
                    hba1c >= 5.7 && hba1c < 6.5 ? 
                        "HbA1c between 5.7-6.4% indicates prediabetes" : 
                        "Risk factors suggest prediabetic state",
                recommendations: [
                    "Follow up with your healthcare provider within 3-6 months",
                    "Consider lifestyle modifications to prevent progression to diabetes",
                    "Reduce intake of refined carbohydrates and sugars",
                    "Aim for 150 minutes of moderate-intensity physical activity weekly",
                    "Consider meeting with a dietitian for personalized meal planning"
                ]
            };
        }
        
        if (diabetesStage) {
            stages.diabetes = diabetesStage;
            riskScores.diabetes = diabetesRiskScore;
        }
    }
    
    // ANEMIA ASSESSMENT - Enhanced with multiple parameters and risk factors
    if (bloodData.hemoglobin || bloodData.hematocrit || bloodData.rbc) {
        const hgb = bloodData.hemoglobin || 0;
        const hct = bloodData.hematocrit || 0;
        const rbc = bloodData.rbc || 0;
        const mcv = bloodData.mcv || 0;
        const mch = bloodData.mch || 0;
        const mchc = bloodData.mchc || 0;
        
        let anemiaRiskScore = 0;
        let anemiaStage = null;
        
        // Define reference ranges by gender
        const hgbLowCutoff = isMale ? 13.5 : 12.0;
        const hgbSevereCutoff = isMale ? 10.0 : 9.0;
        const hctLowCutoff = isMale ? 41.0 : 36.0;
        const rbcLowCutoff = isMale ? 4.5 : 4.0;
        
        // Primary indicators
        if (hgb > 0 && hgb < hgbLowCutoff) {
            anemiaRiskScore += hgb < hgbSevereCutoff ? 50 : 30;
        }
        
        if (hct > 0 && hct < hctLowCutoff) {
            anemiaRiskScore += 20;
        }
        
        if (rbc > 0 && rbc < rbcLowCutoff) {
            anemiaRiskScore += 15;
        }
        
        // Add additional indicators for anemia classification
        let anemiaType = "Unspecified";
        let anemiaClassification = "";
        
        // MCV-based classification
        if (mcv > 0) {
            if (mcv < 80) {
                anemiaType = "Microcytic Anemia";
                anemiaClassification += "Low MCV suggests possible iron deficiency, thalassemia, or chronic disease. ";
            } else if (mcv > 100) {
                anemiaType = "Macrocytic Anemia";
                anemiaClassification += "High MCV suggests possible B12/folate deficiency or liver disease. ";
            } else {
                anemiaType = "Normocytic Anemia";
                anemiaClassification += "Normal MCV suggests possible chronic disease, blood loss, or hemolysis. ";
            }
        }
        
        // Classify severity
        if (anemiaRiskScore >= 40) {
            anemiaStage = {
                disease: "Anemia",
                stage: "Moderate to Severe " + anemiaType,
                severity: 2,
                riskScore: anemiaRiskScore,
                confidence: Math.min(anemiaRiskScore / 100, 0.95),
                primaryIndicators: {
                    hemoglobin: hgb > 0 ? hgb : "Not available",
                    hematocrit: hct > 0 ? hct : "Not available",
                    rbc: rbc > 0 ? rbc : "Not available",
                    mcv: mcv > 0 ? mcv : "Not available"
                },
                interpretation: anemiaClassification + 
                    `Hemoglobin of ${hgb} g/dL is significantly below the normal range for ${gender}.`,
                recommendations: [
                    "Urgent consultation with a hematologist or healthcare provider",
                    "Additional tests like iron studies, B12, folate may be needed",
                    "Iron supplementation after consulting with your doctor",
                    "Include iron-rich foods in your diet (lean meats, beans, spinach)",
                    "Investigate underlying causes of anemia"
                ]
            };
        } else if (anemiaRiskScore >= 20) {
            anemiaStage = {
                disease: "Anemia",
                stage: "Mild " + anemiaType,
                severity: 1,
                riskScore: anemiaRiskScore,
                confidence: Math.min(anemiaRiskScore / 100, 0.9),
                primaryIndicators: {
                    hemoglobin: hgb > 0 ? hgb : "Not available",
                    hematocrit: hct > 0 ? hct : "Not available",
                    rbc: rbc > 0 ? rbc : "Not available",
                    mcv: mcv > 0 ? mcv : "Not available"
                },
                interpretation: anemiaClassification + 
                    `Hemoglobin of ${hgb} g/dL is below the normal range for ${gender}.`,
                recommendations: [
                    "Consult with a healthcare provider for further evaluation",
                    "Consider dietary changes to increase iron intake",
                    "Follow up with additional testing to determine the cause of anemia",
                    "Regular monitoring of blood counts recommended"
                ]
            };
        }
        
        if (anemiaStage) {
            stages.anemia = anemiaStage;
            riskScores.anemia = anemiaRiskScore;
        }
    }
    
    // CARDIOVASCULAR RISK ASSESSMENT - Enhanced Framingham-inspired algorithm
    if (bloodData.cholesterol || bloodData.ldl || bloodData.hdl || bloodData.triglycerides) {
        const totalChol = bloodData.cholesterol || 0;
        const ldl = bloodData.ldl || 0;
        const hdl = bloodData.hdl || 0;
        const tg = bloodData.triglycerides || 0;
        
        let cvdRiskScore = 0;
        let lipidStage = null;
        
        // Primary lipid indicators
        if (totalChol >= 240) {
            cvdRiskScore += 20;
        } else if (totalChol >= 200) {
            cvdRiskScore += 10;
        }
        
        if (ldl >= 160) {
            cvdRiskScore += 20;
        } else if (ldl >= 130) {
            cvdRiskScore += 10;
        }
        
        if (hdl < 40) {
            cvdRiskScore += 20;
        } else if (hdl < 50) {
            cvdRiskScore += 5;
        } else if (hdl > 60) {
            cvdRiskScore -= 5; // Protective factor
        }
        
        if (tg >= 200) {
            cvdRiskScore += 10;
        } else if (tg >= 150) {
            cvdRiskScore += 5;
        }
        
        // Additional risk factors
        if (age > 45 && isMale) cvdRiskScore += 10;
        if (age > 55 && !isMale) cvdRiskScore += 10;
        if (bmi >= 30) cvdRiskScore += 10;
        
        // Classify cardiovascular risk
        if (cvdRiskScore >= 40) {
            lipidStage = {
                disease: "Dyslipidemia",
                stage: "High Cardiovascular Risk",
                severity: 3,
                riskScore: cvdRiskScore,
                confidence: Math.min(cvdRiskScore / 100, 0.95),
                primaryIndicators: {
                    totalCholesterol: totalChol > 0 ? totalChol : "Not available",
                    ldl: ldl > 0 ? ldl : "Not available",
                    hdl: hdl > 0 ? hdl : "Not available",
                    triglycerides: tg > 0 ? tg : "Not available"
                },
                interpretation: "Multiple lipid abnormalities and risk factors indicate high cardiovascular risk.",
                recommendations: [
                    "Consult with a cardiologist for cardiovascular risk management",
                    "Consider lipid-lowering medication as prescribed by your doctor",
                    "Adopt a heart-healthy diet low in saturated and trans fats",
                    "Engage in regular aerobic exercise (at least 150 minutes per week)",
                    "Consider stress management techniques"
                ]
            };
        } else if (cvdRiskScore >= 20) {
            lipidStage = {
                disease: "Dyslipidemia",
                stage: "Moderate Cardiovascular Risk",
                severity: 2,
                riskScore: cvdRiskScore,
                confidence: Math.min(cvdRiskScore / 100, 0.9),
                primaryIndicators: {
                    totalCholesterol: totalChol > 0 ? totalChol : "Not available",
                    ldl: ldl > 0 ? ldl : "Not available",
                    hdl: hdl > 0 ? hdl : "Not available",
                    triglycerides: tg > 0 ? tg : "Not available"
                },
                interpretation: "Lipid abnormalities suggest moderate cardiovascular risk.",
                recommendations: [
                    "Follow up with your healthcare provider for lipid management",
                    "Consider dietary changes such as reducing saturated fats",
                    "Increase physical activity to help improve cholesterol levels",
                    "Regular monitoring of lipid levels every 6-12 months"
                ]
            };
        } else if (cvdRiskScore >= 10) {
            lipidStage = {
                disease: "Dyslipidemia",
                stage: "Mild Cardiovascular Risk",
                severity: 1,
                riskScore: cvdRiskScore,
                confidence: Math.min(cvdRiskScore / 100, 0.85),
                primaryIndicators: {
                    totalCholesterol: totalChol > 0 ? totalChol : "Not available",
                    ldl: ldl > 0 ? ldl : "Not available",
                    hdl: hdl > 0 ? hdl : "Not available",
                    triglycerides: tg > 0 ? tg : "Not available"
                },
                interpretation: "Some lipid parameters outside optimal range suggesting mild cardiovascular risk.",
                recommendations: [
                    "Consider heart-healthy diet rich in fruits, vegetables, and whole grains",
                    "Regular physical activity of at least 150 minutes per week",
                    "Monitor lipid levels annually",
                    "Discuss with healthcare provider at your next visit"
                ]
            };
        }
        
        if (lipidStage) {
            stages.dyslipidemia = lipidStage;
            riskScores.dyslipidemia = cvdRiskScore;
        }
    }
    
    // KIDNEY FUNCTION ASSESSMENT - Enhanced with eGFR calculation and more parameters
    if (bloodData.creatinine || bloodData.urea) {
        const creatinine = bloodData.creatinine || 0;
        const urea = bloodData.urea || 0;
        const albumin = bloodData.albumin || 0;
        
        // Enhanced eGFR calculation (CKD-EPI equation simplified)
        let eGFR = 0;
        if (creatinine > 0) {
            // Simple version of CKD-EPI equation
            let genderFactor = isMale ? 1 : 0.742;
            let raceFactor = patientInfo.race === 'black' ? 1.212 : 1;
            
            // Simplified CKD-EPI formula
            if (isMale) {
                eGFR = 141 * Math.min(creatinine/0.9, 1) ** -0.411 * Math.max(creatinine/0.9, 1) ** -1.209 * 0.993 ** age * genderFactor * raceFactor;
            } else {
                eGFR = 141 * Math.min(creatinine/0.7, 1) ** -0.329 * Math.max(creatinine/0.7, 1) ** -1.209 * 0.993 ** age * genderFactor * raceFactor;
            }
        }
        
        let kidneyRiskScore = 0;
        let kidneyStage = null;
        
        // eGFR scoring
        if (eGFR > 0 && eGFR < 15) {
            kidneyRiskScore += 60; // Stage 5 CKD (Kidney Failure)
        } else if (eGFR >= 15 && eGFR < 30) {
            kidneyRiskScore += 50; // Stage 4 CKD (Severe)
        } else if (eGFR >= 30 && eGFR < 45) {
            kidneyRiskScore += 40; // Stage 3b CKD (Moderate to Severe)
        } else if (eGFR >= 45 && eGFR < 60) {
            kidneyRiskScore += 30; // Stage 3a CKD (Moderate)
        } else if (eGFR >= 60 && eGFR < 90) {
            kidneyRiskScore += 15; // Stage 2 CKD (Mild)
        }
        
        // Additional indicators
        if (creatinine > (isMale ? 1.3 : 1.1)) {
            kidneyRiskScore += 20;
        }
        
        if (urea > 20) {
            kidneyRiskScore += 10;
        }
        
        if (albumin < 3.5) {
            kidneyRiskScore += 10; // Hypoalbuminemia can be associated with kidney disease
        }
        
        // CKD Staging based on risk score
        if (kidneyRiskScore >= 50) {
            kidneyStage = {
                disease: "Chronic Kidney Disease",
                stage: eGFR < 15 ? "Stage 5 CKD (Kidney Failure)" : 
                       eGFR < 30 ? "Stage 4 CKD (Severe)" : "Stage 3b CKD (Moderate to Severe)",
                severity: 3,
                riskScore: kidneyRiskScore,
                confidence: Math.min(kidneyRiskScore / 100, 0.95),
                primaryIndicators: {
                    creatinine: creatinine > 0 ? creatinine : "Not available",
                    eGFR: eGFR > 0 ? eGFR.toFixed(1) : "Not available",
                    urea: urea > 0 ? urea : "Not available"
                },
                interpretation: `eGFR of ${eGFR.toFixed(1)} mL/min/1.73m² indicates significant kidney function impairment.`,
                recommendations: [
                    "Urgent consultation with a nephrologist is recommended",
                    "Discuss management options for chronic kidney disease",
                    "Strict adherence to medication and dietary restrictions",
                    "Monitor blood pressure and electrolyte levels regularly",
                    "Limit protein, sodium, and potassium intake as advised by your doctor"
                ]
            };
        } else if (kidneyRiskScore >= 30) {
            kidneyStage = {
                disease: "Chronic Kidney Disease",
                stage: eGFR < 45 ? "Stage 3b CKD (Moderate)" : 
                       eGFR < 60 ? "Stage 3a CKD (Mild to Moderate)" : "Stage 2 CKD (Mild)",
                severity: 2,
                riskScore: kidneyRiskScore,
                confidence: Math.min(kidneyRiskScore / 100, 0.9),
                primaryIndicators: {
                    creatinine: creatinine > 0 ? creatinine : "Not available",
                    eGFR: eGFR > 0 ? eGFR.toFixed(1) : "Not available",
                    urea: urea > 0 ? urea : "Not available"
                },
                interpretation: `eGFR of ${eGFR.toFixed(1)} mL/min/1.73m² indicates moderate kidney function impairment.`,
                recommendations: [
                    "Consultation with a nephrologist is recommended",
                    "Monitor kidney function with regular lab tests",
                    "Control blood pressure and diabetes if present",
                    "Consider dietary modifications to support kidney health",
                    "Avoid nephrotoxic medications when possible"
                ]
            };
        } else if (kidneyRiskScore >= 15) {
            kidneyStage = {
                disease: "Chronic Kidney Disease",
                stage: "Early Stage CKD",
                severity: 1,
                riskScore: kidneyRiskScore,
                confidence: Math.min(kidneyRiskScore / 100, 0.85),
                primaryIndicators: {
                    creatinine: creatinine > 0 ? creatinine : "Not available",
                    eGFR: eGFR > 0 ? eGFR.toFixed(1) : "Not available",
                    urea: urea > 0 ? urea : "Not available"
                },
                interpretation: `eGFR of ${eGFR.toFixed(1)} mL/min/1.73m² indicates mild kidney function impairment.`,
                recommendations: [
                    "Follow up with your healthcare provider",
                    "Regular monitoring of kidney function",
                    "Control risk factors like hypertension and diabetes",
                    "Maintain adequate hydration",
                    "Consider reducing sodium intake"
                ]
            };
        }
        
        if (kidneyStage) {
            stages.kidneyDisease = kidneyStage;
            riskScores.kidneyDisease = kidneyRiskScore;
        }
    }
    
    // LIVER FUNCTION ASSESSMENT - Enhanced with multiple parameters
    if (bloodData.alt || bloodData.ast || bloodData.alp || bloodData.bilirubin) {
        const alt = bloodData.alt || 0;
        const ast = bloodData.ast || 0;
        const alp = bloodData.alp || 0;
        const ggt = bloodData.ggt || 0;
        const bilirubin = bloodData.bilirubin || 0;
        const albumin = bloodData.albumin || 0;
        
        let liverRiskScore = 0;
        let liverStage = null;
        
        // Enzyme elevations
        if (alt > 55) {
            liverRiskScore += alt > 200 ? 30 : (alt > 100 ? 20 : 10);
        }
        
        if (ast > 48) {
            liverRiskScore += ast > 200 ? 30 : (ast > 100 ? 20 : 10);
        }
        
        if (alp > 150) {
            liverRiskScore += alp > 300 ? 20 : 10;
        }
        
        if (ggt > 55) {
            liverRiskScore += ggt > 200 ? 20 : 10;
        }
        
        // Bilirubin elevation
        if (bilirubin > 1.2) {
            liverRiskScore += bilirubin > 3 ? 30 : (bilirubin > 2 ? 20 : 10);
        }
        
        // Low albumin (sign of impaired liver function)
        if (albumin < 3.5) {
            liverRiskScore += albumin < 2.8 ? 20 : 10;
        }
        
        // AST/ALT ratio (De Ritis ratio) - >2 may suggest alcoholic liver disease
        let astAltRatio = 0;
        if (alt > 0 && ast > 0) {
            astAltRatio = ast / alt;
            if (astAltRatio > 2) {
                liverRiskScore += 15;
            } else if (astAltRatio > 1) {
                liverRiskScore += 5;
            }
        }
        
        // Liver disease staging
        if (liverRiskScore >= 50) {
            liverStage = {
                disease: "Liver Disease",
                stage: "Severe Liver Dysfunction",
                severity: 3,
                riskScore: liverRiskScore,
                confidence: Math.min(liverRiskScore / 100, 0.9),
                primaryIndicators: {
                    alt: alt > 0 ? alt : "Not available",
                    ast: ast > 0 ? ast : "Not available",
                    bilirubin: bilirubin > 0 ? bilirubin : "Not available",
                    albumin: albumin > 0 ? albumin : "Not available",
                    astAltRatio: astAltRatio > 0 ? astAltRatio.toFixed(1) : "Not available"
                },
                interpretation: "Multiple liver function tests show significant abnormalities suggestive of severe liver dysfunction.",
                recommendations: [
                    "Urgent consultation with a hepatologist/gastroenterologist is recommended",
                    "Further diagnostic tests like liver ultrasound may be needed",
                    "Avoid alcohol and medications that can harm the liver",
                    "Discuss management options with your healthcare provider",
                    "Consider screening for viral hepatitis and other liver diseases"
                ]
            };
        } else if (liverRiskScore >= 30) {
            liverStage = {
                disease: "Liver Disease",
                stage: "Moderate Liver Dysfunction",
                severity: 2,
                riskScore: liverRiskScore,
                confidence: Math.min(liverRiskScore / 100, 0.85),
                primaryIndicators: {
                    alt: alt > 0 ? alt : "Not available",
                    ast: ast > 0 ? ast : "Not available",
                    bilirubin: bilirubin > 0 ? bilirubin : "Not available",
                    albumin: albumin > 0 ? albumin : "Not available"
                },
                interpretation: "Liver function tests show moderate abnormalities suggestive of liver dysfunction.",
                recommendations: [
                    "Consultation with a healthcare provider is recommended",
                    "Consider liver function monitoring every 3-6 months",
                    "Avoid alcohol and hepatotoxic medications",
                    "Consider lifestyle changes including diet modifications",
                    "Follow up with additional diagnostic tests as recommended"
                ]
            };
        } else if (liverRiskScore >= 15) {
            liverStage = {
                disease: "Liver Disease",
                stage: "Mild Liver Dysfunction",
                severity: 1,
                riskScore: liverRiskScore,
                confidence: Math.min(liverRiskScore / 100, 0.8),
                primaryIndicators: {
                    alt: alt > 0 ? alt : "Not available",
                    ast: ast > 0 ? ast : "Not available",
                    bilirubin: bilirubin > 0 ? bilirubin : "Not available"
                },
                interpretation: "Liver function tests show mild abnormalities that may indicate early liver dysfunction.",
                recommendations: [
                    "Follow up with your healthcare provider",
                    "Consider liver function monitoring every 6-12 months",
                    "Limit alcohol consumption",
                    "Maintain a healthy weight and balanced diet",
                    "Review medications with your doctor"
                ]
            };
        }
        
        if (liverStage) {
            stages.liverDisease = liverStage;
            riskScores.liverDisease = liverRiskScore;
        }
    }
    
    // Convert risk scores to percentages for display
    for (const disease in riskScores) {
        const normalizedScore = Math.min(riskScores[disease] / 100, 1) * 100;
        if (stages[disease]) {
            stages[disease].riskPercentage = Math.round(normalizedScore);
        }
    }
    
    console.log("ML Analysis Complete - Disease Stages:", stages);
    return stages;
}

/**
 * Creates a chart displaying abnormal blood parameters and their deviation from normal range
 * @param {Array} abnormalParams - Array of abnormal parameter objects
 */
function createAbnormalParametersChart(abnormalParams) {
    console.log("Creating abnormal parameters chart with:", abnormalParams);
    
    // Handle both array and object formats for backward compatibility
    let formattedParams = [];
    
    if (Array.isArray(abnormalParams)) {
        formattedParams = abnormalParams;
    } else if (abnormalParams && typeof abnormalParams === 'object') {
        // Convert old format (object) to array format
        formattedParams = Object.entries(abnormalParams).map(([key, value]) => {
            if (typeof value === 'number') {
                return {
                    name: key,
                    value: value,
                    isAbnormal: true
                };
            } else if (value && typeof value === 'object') {
                return {
                    name: key,
                    ...value,
                    isAbnormal: true
                };
            }
            return null;
        }).filter(param => param !== null);
    }
    
    if (!formattedParams || formattedParams.length === 0) {
        console.log("No abnormal values to display in chart");
        return;
    }
    
    const ctx = document.getElementById('abnormalParametersChart');
    
    // Check if chart element exists
    if (!ctx) {
        console.error("Error: Cannot find abnormalParametersChart element");
        return;
    }
    
    // Make sure bloodTestRanges is available
    if (typeof bloodTestRanges === 'undefined' || !bloodTestRanges) {
        console.error("Blood test ranges are not defined");
        
        // Add error message to the chart container
        const chartContainer = ctx.closest('.chart-container');
        if (chartContainer) {
            // Clear any existing content
            chartContainer.innerHTML = '';
            
            const errorMessage = document.createElement('div');
            errorMessage.className = 'no-data-message';
            errorMessage.textContent = 'Reference ranges not available for chart creation.';
            chartContainer.appendChild(errorMessage);
        }
        return;
    }
    
    try {
        const data = [];
        const backgroundColors = [];
        const borderColors = [];
        const formattedLabels = [];
        const tooltipData = [];
        
        // Process each parameter with error handling
        for (const param of formattedParams) {
            try {
                if (!param.isAbnormal) continue;
                
                const paramName = param.name;
                const paramValue = param.value;
                
                if (typeof paramValue !== 'number' || isNaN(paramValue)) {
                    console.warn(`Invalid value for parameter ${paramName}:`, paramValue);
                    continue;
                }
                
                // Get reference range either from the parameter or from global ranges
                let min, max, unit;
                if (param.min !== undefined && param.max !== undefined) {
                    min = param.min;
                    max = param.max;
                    unit = param.unit || '';
                } else if (bloodTestRanges[paramName]) {
                    min = bloodTestRanges[paramName].min;
                    max = bloodTestRanges[paramName].max;
                    unit = bloodTestRanges[paramName].unit || '';
                } else {
                    console.warn(`No reference range for parameter: ${paramName}`);
                    continue;
                }
                
                // Determine if value is low or high
                const status = param.status || (paramValue < min ? 'low' : 'high');
                
                // Calculate percentage deviation from normal range
                let percentage;
                if (status.toLowerCase() === 'low') {
                    percentage = ((min - paramValue) / min) * 100;
                } else {
                    percentage = ((paramValue - max) / max) * 100;
                }
                
                // Limit to a reasonable range for visualization
                percentage = Math.min(Math.abs(percentage), 100);
                
                // Add data for chart
                data.push(percentage);
                backgroundColors.push(status.toLowerCase() === 'low' ? 'rgba(54, 162, 235, 0.6)' : 'rgba(255, 99, 132, 0.6)');
                borderColors.push(status.toLowerCase() === 'low' ? 'rgba(54, 162, 235, 1)' : 'rgba(255, 99, 132, 1)');
                
                // Use formatted name if available, otherwise format the parameter name
                const displayName = param.formattedName || formatParameterName(paramName);
                formattedLabels.push(displayName);
                
                // Store data for tooltip
                tooltipData.push({
                    name: displayName,
                    value: paramValue,
                    unit: unit,
                    normalRange: param.normalRange || `${min}-${max}`,
                    status: status.charAt(0).toUpperCase() + status.slice(1),
                    deviation: percentage.toFixed(1)
                });
            } catch (paramError) {
                console.warn(`Error processing parameter:`, paramError);
                // Skip this parameter
            }
        }
        
        // If we have no valid data points after filtering, show a message
        if (data.length === 0) {
            console.warn("No valid data points for chart after filtering");
            
            const chartContainer = ctx.closest('.chart-container');
            if (chartContainer) {
                // Clear any existing content
                chartContainer.innerHTML = '';
                
                const noDataMessage = document.createElement('div');
                noDataMessage.className = 'no-data-message';
                noDataMessage.textContent = 'No abnormal parameters to display';
                chartContainer.appendChild(noDataMessage);
            }
            
            return;
        }
        
        // Clean up any existing chart
        if (window.abnormalParamsChart instanceof Chart) {
            window.abnormalParamsChart.destroy();
        }
        
        // Create the chart
        if (typeof Chart !== 'undefined') {
            window.abnormalParamsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: formattedLabels,
                    datasets: [{
                        label: 'Abnormal Parameters (% Deviation)',
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: borderColors,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: '% Deviation from Normal Range'
                            },
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Blood Parameters'
                            },
                            ticks: {
                                maxRotation: 45,
                                minRotation: 45
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    const index = context[0].dataIndex;
                                    return index >= 0 && index < tooltipData.length ? tooltipData[index].name : '';
                                },
                                label: function(context) {
                                    const index = context.dataIndex;
                                    if (index < 0 || index >= tooltipData.length) return [];
                                    
                                    const data = tooltipData[index];
                                    return [
                                        `Value: ${data.value} ${data.unit}`,
                                        `Normal Range: ${data.normalRange} ${data.unit}`,
                                        `Status: ${data.status}`,
                                        `Deviation: ${data.deviation}%`
                                    ];
                                }
                            }
                        }
                    }
                }
            });
            
            console.log("Abnormal parameters chart created successfully");
        } else {
            console.error("Chart.js is not available");
        }
    } catch (error) {
        console.error("Error creating abnormal parameters chart:", error);
    }
}

/**
 * Creates a chart visualizing disease risks from the analysis
 * @param {Object} diseaseStages - The disease staging data
 */
function createDiseaseRiskChart(diseaseStages) {
    console.log("Creating disease risk chart with:", diseaseStages);
    
    if (!diseaseStages || Object.keys(diseaseStages).length === 0) {
        console.warn("No disease stages to display in chart");
        return;
    }
    
    const ctx = document.getElementById('diseaseRiskChart');
    if (!ctx) {
        console.error("Disease risk chart element not found");
        return;
    }
    
    try {
        // Clean up any existing chart
        if (window.diseaseRiskChart instanceof Chart) {
            window.diseaseRiskChart.destroy();
        }
        
        // Process disease data for the chart
        const diseases = [];
        const riskScores = [];
        const backgroundColors = [];
        const confidenceValues = [];
        
        for (const [diseaseId, data] of Object.entries(diseaseStages)) {
            // Extract the display name or format the disease id
            const displayName = data.disease || formatConditionName(diseaseId);
            diseases.push(displayName);
            
            // Extract risk score - use either riskScore or calculate from severity
            let riskScore = data.riskScore;
            if (!riskScore && data.severity !== undefined) {
                // Convert severity to risk score
                riskScore = data.severity * 25; // 1 -> 25, 2 -> 50, 3 -> 75, 4 -> 100
            }
            riskScores.push(riskScore || 50); // Default if no risk score available
            
            // Extract confidence value
            confidenceValues.push(data.confidence ? Math.round(data.confidence * 100) : 70);
            
            // Set color based on severity
            let color;
            if (data.severity >= 3 || riskScore >= 75) {
                color = 'rgba(235, 83, 88, 0.7)'; // High risk (red)
            } else if (data.severity >= 2 || riskScore >= 50) {
                color = 'rgba(249, 200, 14, 0.7)'; // Moderate risk (yellow)
            } else {
                color = 'rgba(103, 171, 159, 0.7)'; // Low risk (green)
            }
            backgroundColors.push(color);
        }
        
        if (diseases.length === 0) {
            console.warn("No disease data to display");
            return;
        }
        
        // Create the chart
        window.diseaseRiskChart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: diseases,
                datasets: [{
                    data: riskScores,
                    backgroundColor: backgroundColors,
                    borderWidth: 1,
                    borderColor: backgroundColors.map(color => color.replace('0.7', '1'))
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 25,
                            display: false
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 15,
                            padding: 15
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const index = context.dataIndex;
                                const disease = diseases[index];
                                const riskScore = riskScores[index];
                                const confidence = confidenceValues[index];
                                
                                let riskLevel = 'Low';
                                if (riskScore >= 75) {
                                    riskLevel = 'High';
                                } else if (riskScore >= 50) {
                                    riskLevel = 'Moderate';
                                }
                                
                                return [
                                    `${disease}`,
                                    `Risk Level: ${riskLevel} (${riskScore}%)`,
                                    `Confidence: ${confidence}%`
                                ];
                            }
                        }
                    },
                    title: {
                        display: true,
                        text: 'Disease Risk Assessment',
                        font: {
                            size: 16
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    }
                }
            }
        });
        
        console.log("Disease risk chart created successfully");
    } catch (error) {
        console.error("Error creating disease risk chart:", error);
    }
}

function createHealthMetricsVisualizations(patientInfo) {
    const bmiCtx = document.getElementById('bmiChart');
    
    // Check if chart element exists
    if (!bmiCtx) {
        console.error("Error: Cannot find bmiChart element");
        return;
    }
    
    // Verify that we have height and weight
    if (!patientInfo.height || !patientInfo.weight) {
        const noDataMessage = document.createElement('div');
        noDataMessage.className = 'no-data-message';
        noDataMessage.textContent = 'Height and weight are required for BMI calculation';
        const parentNode = bmiCtx.parentNode;
        if (parentNode) {
            parentNode.appendChild(noDataMessage);
        }
        return;
    }
    
    try {
        // BMI calculation and visualization
        const height = patientInfo.height / 100; // Convert cm to meters
        const weight = patientInfo.weight;
        const bmi = weight / (height * height);
        
        // Determine BMI category and color
        let bmiCategory;
        let bmiColor;
        
        if (bmi < 18.5) {
            bmiCategory = 'Underweight';
            bmiColor = 'rgba(54, 162, 235, 0.8)';
        } else if (bmi >= 18.5 && bmi < 25) {
            bmiCategory = 'Normal weight';
            bmiColor = 'rgba(75, 192, 192, 0.8)';
        } else if (bmi >= 25 && bmi < 30) {
            bmiCategory = 'Overweight';
            bmiColor = 'rgba(255, 159, 64, 0.8)';
        } else {
            bmiCategory = 'Obese';
            bmiColor = 'rgba(255, 99, 132, 0.8)';
        }
        
        // Create gauge chart for BMI
        if (window.bmiChart) {
            window.bmiChart.destroy();
        }
        
        const bmiLabels = ['Underweight', 'Normal', 'Overweight', 'Obese'];
        const bmiRanges = [
            { min: 0, max: 18.5 },
            { min: 18.5, max: 25 },
            { min: 25, max: 30 },
            { min: 30, max: 40 }
        ];
        
        // Find which range the BMI falls into
        const segmentData = [0, 0, 0, 0];
        for (let i = 0; i < bmiRanges.length; i++) {
            if (bmi >= bmiRanges[i].min && bmi < bmiRanges[i].max) {
                segmentData[i] = 1;
                break;
            }
            if (i === bmiRanges.length - 1 && bmi >= bmiRanges[i].min) {
                segmentData[i] = 1;
            }
        }
        
        window.bmiChart = new Chart(bmiCtx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: bmiLabels,
                datasets: [{
                    data: [1, 1, 1, 1], // Equal segments for the background
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderWidth: 0
                }, {
                    data: segmentData, // Highlight the current segment
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(255, 159, 64, 0.8)',
                        'rgba(255, 99, 132, 0.8)'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '70%',
                rotation: -90,
                circumference: 180,
                aspectRatio: 2,
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                if (context.datasetIndex === 1 && context.raw === 1) {
                                    return [
                                        `BMI: ${bmi.toFixed(1)}`,
                                        `Category: ${bmiCategory}`,
                                        `Height: ${height.toFixed(2)}m`,
                                        `Weight: ${weight}kg`
                                    ];
                                }
                                return null;
                            }
                        }
                    }
                }
            }
        });
        
        // Update BMI text info
        const bmiValue = document.getElementById('bmiValue');
        const bmiCategoryElement = document.getElementById('bmiCategory');
        const bmiInterpretation = document.getElementById('bmiInterpretation');
        
        if (bmiValue) bmiValue.textContent = bmi.toFixed(1);
        if (bmiCategoryElement) bmiCategoryElement.textContent = bmiCategory;
        if (bmiInterpretation) bmiInterpretation.innerHTML = getBmiInterpretation(bmi);
    } catch (error) {
        console.error("Error creating BMI chart:", error);
        const parentNode = bmiCtx.parentNode;
        if (parentNode) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'no-data-message';
            errorMessage.textContent = 'Error creating BMI chart. Please try again.';
            parentNode.appendChild(errorMessage);
        }
    }
}

function getBmiInterpretation(bmi) {
    if (bmi < 18.5) {
        return 'You are underweight. Consider consulting with a healthcare provider about healthy ways to gain weight.';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'You are at a healthy weight. Maintain your current diet and exercise habits.';
    } else if (bmi >= 25 && bmi < 30) {
        return 'You are overweight. Consider making lifestyle changes such as improving diet and increasing physical activity.';
    } else {
        return 'You are in the obese category. It is recommended to consult with a healthcare provider about weight management strategies.';
    }
}

// Utility function to format output HTML
function formatAbnormalValue(param, info) {
    if (!param || !info) {
        console.warn("Missing parameter or info in formatAbnormalValue");
        return '<div class="abnormal-parameter"><p>Invalid data</p></div>';
    }
    
    try {
        // Safety checks for properties
        const value = info.value || 'Unknown';
        const normalRange = info.normalRange || 'Not specified';
        const unit = info.unit || '';
        const status = (info.status || 'abnormal').toLowerCase();
        const description = formatParameterName(param);
        
        // Default to a moderate severity if not specified
        let severityClass = 'severity-moderate';
        if (status === 'high') {
            // Calculate severity based on how far it is from the max normal value
            // Extract max value from normalRange
            let maxNormal = 0;
            if (typeof info.normalRange === 'string') {
                const rangeParts = info.normalRange.split('-');
                if (rangeParts.length > 1) {
                    maxNormal = parseFloat(rangeParts[1]);
                }
            } else if (bloodTestRanges && bloodTestRanges[param]) {
                maxNormal = bloodTestRanges[param].max || 0;
            }
            
            const percentDeviation = maxNormal > 0 ? ((value - maxNormal) / maxNormal) * 100 : 20;
            
            if (percentDeviation > 50) {
                severityClass = 'severity-high';
            } else if (percentDeviation > 20) {
                severityClass = 'severity-moderate';
            } else {
                severityClass = 'severity-low';
            }
        } else if (status === 'low') {
            // Calculate severity based on how far it is from the min normal value
            // Extract min value from normalRange
            let minNormal = 0;
            if (typeof info.normalRange === 'string') {
                const rangeParts = info.normalRange.split('-');
                if (rangeParts.length > 0) {
                    minNormal = parseFloat(rangeParts[0]);
                }
            } else if (bloodTestRanges && bloodTestRanges[param]) {
                minNormal = bloodTestRanges[param].min || 0;
            }
            
            const percentDeviation = minNormal > 0 ? ((minNormal - value) / minNormal) * 100 : 20;
            
            if (percentDeviation > 40) {
                severityClass = 'severity-high';
            } else if (percentDeviation > 15) {
                severityClass = 'severity-moderate';
            } else {
                severityClass = 'severity-low';
            }
        }
        
        // Create HTML for the abnormal parameter
        return `
            <div class="abnormal-parameter ${status} ${severityClass}">
                <div class="abnormal-header">
                    <h4>${description}</h4>
                    <span class="status-badge">${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                </div>
                <p class="abnormal-value">${value} ${unit}</p>
                <p class="normal-range">Normal range: ${normalRange} ${unit}</p>
                <p class="deviation-note">${status === 'high' ? 'Above' : 'Below'} normal range</p>
            </div>
        `;
    } catch (error) {
        console.error("Error formatting abnormal value:", error);
        return `<div class="abnormal-parameter"><p>Error formatting ${param || 'parameter'}</p></div>`;
    }
}

function formatCondition(condition, info) {
    if (!condition || !info) {
        console.warn("Missing condition or info in formatCondition");
        return '<div class="condition-card"><p>Invalid condition data</p></div>';
    }
    
    try {
        // Safety checks for properties
        const probability = info.probability || '0';
        const severity = (info.severity || 'mild').toLowerCase();
        const relatedParameters = info.relatedParameters || [];
        const description = info.description || 'No description available';
        
        // Condition name formatting
        const formattedName = condition
            .replace(/([A-Z])/g, ' $1') // Add space before capital letters
            .replace(/^./, match => match.toUpperCase()) // Capitalize first letter
            .replace(/_/g, ' '); // Replace underscores with spaces
        
        // Set CSS class based on severity
        let severityClass = '';
        switch (severity) {
            case 'high':
                severityClass = 'severity-high';
                break;
            case 'moderate':
                severityClass = 'severity-moderate';
                break;
            case 'mild':
            default:
                severityClass = 'severity-low';
        }
        
        // Format related parameters
        let relatedParametersList = '';
        if (relatedParameters && relatedParameters.length > 0) {
            relatedParametersList = '<ul class="related-parameters">';
            relatedParameters.forEach(param => {
                if (param) {
                    relatedParametersList += `<li>${formatParameterName(param)}</li>`;
                }
            });
            relatedParametersList += '</ul>';
        } else {
            relatedParametersList = '<p>No specific parameters listed</p>';
        }
        
        // Create HTML for the condition
        return `
            <div class="condition-card ${severityClass}">
                <div class="condition-header">
                    <h4>${formattedName}</h4>
                    <span class="probability-badge">${probability}%</span>
                </div>
                <div class="severity-indicator ${severityClass}">
                    ${severity.charAt(0).toUpperCase() + severity.slice(1)} severity
                </div>
                <p class="condition-description">${description}</p>
                <div class="related-parameters-section">
                    <h5>Related Abnormal Parameters:</h5>
                    ${relatedParametersList}
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error formatting condition:", error);
        return `<div class="condition-card"><p>Error formatting ${condition || 'condition'}</p></div>`;
    }
}

// Helper function to parse and extract data from reports
function extractDataFromOCR(ocrText) {
    // Regular expressions to match common blood test parameters
    const patterns = {
        hemoglobin: /h[ae]moglobin\s*:?\s*(\d+\.?\d*)/i,
        hematocrit: /h[ae]matocrit\s*:?\s*(\d+\.?\d*)/i,
        wbc: /wbc\s*:?\s*(\d+\.?\d*)/i,
        rbc: /rbc\s*:?\s*(\d+\.?\d*)/i,
        platelets: /platelets\s*:?\s*(\d+\.?\d*)/i,
        glucose: /glucose\s*:?\s*(\d+\.?\d*)/i,
        cholesterol: /cholesterol\s*:?\s*(\d+\.?\d*)/i,
        ldl: /ldl\s*:?\s*(\d+\.?\d*)/i,
        hdl: /hdl\s*:?\s*(\d+\.?\d*)/i,
        triglycerides: /triglycerides\s*:?\s*(\d+\.?\d*)/i,
        sodium: /sodium\s*:?\s*(\d+\.?\d*)/i,
        potassium: /potassium\s*:?\s*(\d+\.?\d*)/i,
        creatinine: /creatinine\s*:?\s*(\d+\.?\d*)/i,
        urea: /urea\s*:?\s*(\d+\.?\d*)/i,
        albumin: /albumin\s*:?\s*(\d+\.?\d*)/i,
        bilirubin: /bilirubin\s*:?\s*(\d+\.?\d*)/i,
        alt: /alt\s*:?\s*(\d+\.?\d*)/i,
        ast: /ast\s*:?\s*(\d+\.?\d*)/i
    };
    
    const extractedData = {};
    
    // Extract data using patterns
    for (const [param, pattern] of Object.entries(patterns)) {
        const match = ocrText.match(pattern);
        if (match && match[1]) {
            extractedData[param] = parseFloat(match[1]);
        }
    }
    
    return extractedData;
}

/**
 * Initialize the application
 */
function initializeApp() {
    console.log("Initializing Blood Report Analyzer application...");
    
    // Get DOM elements
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const analyzeButton = document.getElementById('analyzeButton');
    const printButton = document.getElementById('printButton');
    const newAnalysisButton = document.getElementById('newAnalysisButton');
    const downloadButton = document.getElementById('downloadButton');
    
    // Verify Chart.js is loaded
    if (!window.Chart) {
        console.error("Chart.js is not loaded. Visualizations will not work.");
        const warningElement = document.getElementById('visualization-warning');
        if (warningElement) {
            warningElement.textContent = "Warning: Chart.js library is not loaded. Visualizations may not display correctly.";
        }
    } else {
        console.log("Chart.js is loaded correctly:", Chart.version);
    }
    
    // Setup upload area
    if (uploadArea && fileInput) {
        console.log("Setting up upload area");
        
        uploadArea.addEventListener('click', () => {
            console.log("Upload area clicked");
            fileInput.click();
        });
        
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('drag-over');
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('drag-over');
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('drag-over');
            
            if (e.dataTransfer.files.length) {
                console.log("Files dropped:", e.dataTransfer.files.length);
                fileInput.files = e.dataTransfer.files;
                handleFileChange(e);
            }
        });
        
        fileInput.addEventListener('change', handleFileChange);
    } else {
        console.error("Upload area or file input not found in the DOM");
    }
    
    // Setup direct upload button
    setupDirectUploadButton();
    
    // Setup analyze button
    if (analyzeButton) {
        analyzeButton.addEventListener('click', async () => {
            if (fileInput && fileInput.files.length > 0) {
                try {
                    showAlert("Analysis Started", "Processing your blood report with AI. This may take a moment...", "info");
                    await processBloodReport(fileInput.files[0]);
                } catch (error) {
                    console.error("Error processing blood report:", error);
                    showAlert("Processing Error", "Failed to analyze the blood report: " + error.message, "error");
                    const loadingSection = document.getElementById('loadingSection');
                    if (loadingSection) loadingSection.classList.add('hidden');
                }
            } else {
                showAlert("No File Selected", "Please upload a blood report image first.", "warning");
            }
        });
    }
    
    // Setup print button
    if (printButton) {
        printButton.addEventListener('click', () => {
            window.print();
        });
    }
    
    // Setup download button
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            if (typeof downloadPDFReport === 'function') {
                downloadPDFReport();
            } else {
                // Fallback if the function doesn't exist
                const element = document.getElementById('resultsSection');
                if (element && window.html2pdf) {
                    const filename = 'blood-report-analysis.pdf';
                    window.html2pdf().set({filename: filename}).from(element).save();
                } else {
                    showAlert("Download Error", "PDF generation is not available.", "error");
                }
            }
        });
    }
    
    // Setup new analysis button
    if (newAnalysisButton) {
        newAnalysisButton.addEventListener('click', () => {
            // Reset file input
            if (fileInput) {
                fileInput.value = '';
            }
            
            // Hide results section and show upload section
            const resultsSection = document.getElementById('resultsSection');
            const uploadSection = document.getElementById('uploadSection');
            
            if (resultsSection) resultsSection.classList.add('hidden');
            if (uploadSection) uploadSection.classList.remove('hidden');
            
            // Clear file indicator
            const fileIndicatorContainer = document.getElementById('file-indicator-container');
            if (fileIndicatorContainer) {
                fileIndicatorContainer.innerHTML = '';
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Setup alert button
    initAlertButton();
    
    // Setup tab switching for all tab groups
    setupTabSwitching();
    
    console.log("Blood Report Analyzer initialized successfully");
}

/**
 * Process the uploaded blood report
 * @param {File} file - The file to process
 * @returns {Promise<boolean>} - True if processing was successful
 */
async function processBloodReport(file) {
    try {
        console.log("Processing blood report with file:", file ? file.name : "None");
        
        // Show loading section, hide upload section
        const loadingSection = document.getElementById('loadingSection');
        const uploadSection = document.getElementById('uploadSection');
        const resultsSection = document.getElementById('resultsSection');
        
        if (uploadSection) uploadSection.classList.add('hidden');
        if (loadingSection) loadingSection.classList.remove('hidden');
        if (resultsSection) resultsSection.classList.add('hidden');
        
        // Update loading UI
        const loadingMessage = document.getElementById('loadingMessage');
        const processingDetail = document.getElementById('processingDetail');
        const loadingProgress = document.querySelector('.loading-progress');
        const progressPercent = document.getElementById('progressPercent');
        
        // Set up progress
        let progress = 10;
        if (loadingProgress) loadingProgress.style.width = progress + '%';
        if (progressPercent) progressPercent.textContent = progress + '%';
        
        // Function to update progress
        const updateProgress = (newProgress) => {
            progress = newProgress;
            if (loadingProgress) loadingProgress.style.width = progress + '%';
            if (progressPercent) progressPercent.textContent = progress + '%';
        };
        
        // Function to update status
        const updateStatus = (message, detail) => {
            if (loadingMessage) loadingMessage.textContent = message;
            if (processingDetail) processingDetail.textContent = detail;
            console.log(`Status: ${message} - ${detail}`);
        };
        
        // Set up step indicators
        const steps = {
            step1: document.getElementById('step1Icon'),
            step2: document.getElementById('step2Icon'),
            step3: document.getElementById('step3Icon'),
            step4: document.getElementById('step4Icon')
        };
        
        // Function to update steps
        const updateStep = (stepNum) => {
            const stepKey = `step${stepNum}`;
            if (steps[stepKey]) {
                steps[stepKey].classList.add('active');
                
                // Mark previous steps as completed
                for (let i = 1; i < stepNum; i++) {
                    const prevKey = `step${i}`;
                    if (steps[prevKey]) steps[prevKey].classList.add('completed');
                }
            }
        };
        
        // Mark step 1 as active
        updateStep(1);
        updateStatus('Extracting data from your report...', 'Initializing analysis process');
        
        // Track data source for reporting
        let dataSource = 'mock';
        let bloodData = null;
        let ocrText = '';
        
        // Step 1: Process the file to extract data
        if (file) {
            updateStatus('Processing uploaded file...', `Reading ${file.name}`);
            updateProgress(15);
            
            // Try OCR if it's an image or PDF
            if ((file.type.includes('image') || file.type.includes('pdf')) && 
                typeof window.processReportWithOCR === 'function') {
                
                try {
                    updateStatus('Analyzing with OCR...', 'Extracting text from image');
                    updateProgress(20);
                    
                    // Process with OCR
                    const ocrResult = await window.processReportWithOCR(file, (detail) => {
                        updateStatus('OCR Processing...', detail);
                    });
                    
                    if (ocrResult) {
                        if (typeof ocrResult === 'object') {
                            // Direct object returned with blood values
                            bloodData = ocrResult;
                            dataSource = 'ocr';
                            console.log("OCR extracted blood data:", bloodData);
                        } else if (typeof ocrResult === 'string') {
                            // Text extracted, need to parse for values
                            ocrText = ocrResult;
                            // Use OCR text if we have an extraction function
                            if (typeof extractBloodParametersFromText === 'function') {
                                bloodData = extractBloodParametersFromText(ocrText);
                                dataSource = 'ocr';
                                console.log("Extracted blood data from OCR text:", bloodData);
                            }
                        }
                    }
                } catch (ocrError) {
                    console.error("OCR processing error:", ocrError);
                }
            }
        }
        
        // If we don't have blood data, use mock data
        if (!bloodData || Object.keys(bloodData).length < 3) {
            updateStatus('Generating sample data...', 'OCR extraction insufficient');
            updateProgress(30);
            
            // Use appropriate mock data function
            if (typeof generateMockBloodData === 'function') {
                bloodData = generateMockBloodData();
                dataSource = 'mock';
            } else {
                // Basic fallback data
                bloodData = {
                    hemoglobin: 14.5,
                    hematocrit: 42,
                    wbc: 7.5,
                    glucose: 95,
                    cholesterol: 180
                };
                dataSource = 'mock';
            }
            
            console.log("Using mock blood data:", bloodData);
        }
        
        // Step 2: Analyze parameters
        updateStep(2);
        updateStatus('Analyzing blood parameters...', 'Evaluating against reference ranges');
        updateProgress(40);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Get patient information
        const patientInfo = {
            name: document.getElementById('patientName')?.value || 'Anonymous Patient',
            age: parseInt(document.getElementById('patientAge')?.value) || 35,
            gender: document.getElementById('patientGender')?.value || 'male',
            height: parseFloat(document.getElementById('patientHeight')?.value) || 170,
            weight: parseFloat(document.getElementById('patientWeight')?.value) || 70,
            race: document.getElementById('patientRace')?.value || 'white',
            dataSource: dataSource
        };
        
        console.log("Patient info:", patientInfo);
        updateProgress(50);
        
        // Step 3: Generate insights
        updateStep(3);
        updateStatus('Generating health insights...', 'Identifying patterns and concerns');
        updateProgress(60);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 800));
        updateProgress(70);
        
        // Step 4: Create report
        updateStep(4);
        updateStatus('Creating your health report...', 'Preparing visualizations and recommendations');
        updateProgress(80);
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 800));
        updateProgress(90);
        
        // Display results
        try {
            const displaySuccess = displayResults(bloodData, ocrText);
            
            // Complete all steps
            Object.values(steps).forEach(step => {
                if (step) {
                    step.classList.add('active');
                    step.classList.add('completed');
                }
            });
            
            // Update progress to 100%
            updateProgress(100);
            
            // Show success message
            if (displaySuccess) {
                updateStatus('Analysis complete!', 'Your results are ready');
                return true;
            } else {
                console.error("displayResults failed");
                updateStatus('Error displaying results', 'Please try again');
                showAlert("Display Error", "Failed to display the analysis results. Please try again.", "error");
                
                // Show upload section again
                if (uploadSection) uploadSection.classList.remove('hidden');
                if (loadingSection) loadingSection.classList.add('hidden');
                return false;
            }
        } catch (displayError) {
            console.error("Error displaying results:", displayError);
            updateStatus('Error displaying results', displayError.message);
            showAlert("Display Error", "Failed to display the analysis results: " + displayError.message, "error");
            
            // Show upload section again
            if (uploadSection) uploadSection.classList.remove('hidden');
            if (loadingSection) loadingSection.classList.add('hidden');
            return false;
        }
    } catch (error) {
        console.error("Error processing blood report:", error);
        showAlert("Processing Error", "An error occurred while processing your blood report: " + error.message, "error");
        
        // Show upload section again
        const uploadSection = document.getElementById('uploadSection');
        const loadingSection = document.getElementById('loadingSection');
        if (uploadSection) uploadSection.classList.remove('hidden');
        if (loadingSection) loadingSection.classList.add('hidden');
        return false;
    }
}

/**
 * Extracts patient information from OCR text using advanced pattern matching
 * @param {string} ocrText - The OCR text from the blood report
 * @returns {Object} Patient information including name, age, gender, etc.
 */
function extractPatientInfo(ocrText) {
    console.log("Extracting patient information from OCR text");
    
    if (!ocrText) {
        console.warn("No OCR text provided for patient info extraction");
        return {
            name: "Unknown",
            age: 0,
            gender: "unknown",
            reportDate: new Date().toLocaleDateString()
        };
    }
    
    const patientInfo = {
        name: "Unknown",
        age: 0,
        gender: "unknown",
        height: 0,
        weight: 0,
        reportDate: new Date().toLocaleDateString()
    };
    
    try {
        // Extract patient name
        const namePatterns = [
            /patient(?:'s)?\s*name\s*[:\-]?\s*([A-Za-z\s.]+)/i,
            /name\s*[:\-]?\s*([A-Za-z\s.]+)/i,
            /patient\s*[:\-]?\s*([A-Za-z\s.]+)/i
        ];
        
        for (const pattern of namePatterns) {
            const nameMatch = ocrText.match(pattern);
            if (nameMatch && nameMatch[1]) {
                // Clean up the name
                let name = nameMatch[1].trim();
                // Remove any trailing punctuation or numbers
                name = name.replace(/[^A-Za-z\s.]+$/, '').trim();
                
                if (name && name.length > 2 && name.length < 50) {
                    patientInfo.name = name;
                    break;
                }
            }
        }
        
        // Extract age
        const agePatterns = [
            /age\s*[:\-]?\s*(\d+)\s*(?:years|yrs|year|yr)?/i,
            /(\d+)\s*(?:years|yrs|year|yr)\s*old/i,
            /patient(?:'s)?\s*age\s*[:\-]?\s*(\d+)/i
        ];
        
        for (const pattern of agePatterns) {
            const ageMatch = ocrText.match(pattern);
            if (ageMatch && ageMatch[1]) {
                const age = parseInt(ageMatch[1]);
                if (age > 0 && age < 120) {
                    patientInfo.age = age;
                    break;
                }
            }
        }
        
        // Extract gender
        const genderPatterns = [
            /gender\s*[:\-]?\s*([a-zA-Z]+)/i,
            /sex\s*[:\-]?\s*([a-zA-Z]+)/i,
            /patient(?:'s)?\s*gender\s*[:\-]?\s*([a-zA-Z]+)/i,
            /patient(?:'s)?\s*sex\s*[:\-]?\s*([a-zA-Z]+)/i
        ];
        
        for (const pattern of genderPatterns) {
            const genderMatch = ocrText.match(pattern);
            if (genderMatch && genderMatch[1]) {
                const gender = genderMatch[1].trim().toLowerCase();
                if (gender === 'm' || gender.includes('male')) {
                    patientInfo.gender = 'male';
                    break;
                } else if (gender === 'f' || gender.includes('female')) {
                    patientInfo.gender = 'female';
                    break;
                }
            }
        }
        
        // Extract height
        const heightPatterns = [
            /height\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:cm|centimeters|centimetres)/i,
            /height\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
        ];
        
        for (const pattern of heightPatterns) {
            const heightMatch = ocrText.match(pattern);
            if (heightMatch && heightMatch[1]) {
                const height = parseFloat(heightMatch[1]);
                if (height > 50 && height < 250) {
                    patientInfo.height = height;
                    break;
                }
            }
        }
        
        // Extract weight
        const weightPatterns = [
            /weight\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(?:kg|kilograms|kilos)/i,
            /weight\s*[:\-]?\s*(\d+(?:\.\d+)?)/i
        ];
        
        for (const pattern of weightPatterns) {
            const weightMatch = ocrText.match(pattern);
            if (weightMatch && weightMatch[1]) {
                const weight = parseFloat(weightMatch[1]);
                if (weight > 20 && weight < 250) {
                    patientInfo.weight = weight;
                    break;
                }
            }
        }
        
        // Extract report date
        const datePatterns = [
            /(?:report|collection|test|sample)\s*date\s*[:\-]?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i,
            /date\s*(?:of\s*(?:report|test|sample|collection))?\s*[:\-]?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i,
            /date\s*[:\-]?\s*(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4})/i
        ];
        
        for (const pattern of datePatterns) {
            const dateMatch = ocrText.match(pattern);
            if (dateMatch && dateMatch[1]) {
                try {
                    // Try to parse the date
                    const dateStr = dateMatch[1];
                    const dateParts = dateStr.split(/[\/\-]/);
                    
                    if (dateParts.length === 3) {
                        // Determine the format of the date (MM/DD/YYYY or DD/MM/YYYY)
                        let month, day, year;
                        
                        // Assume the year is the part with 4 digits or the last part
                        if (dateParts[0].length === 4) {
                            year = dateParts[0];
                            month = dateParts[1];
                            day = dateParts[2];
                        } else if (dateParts[2].length === 4 || dateParts[2].length === 2) {
                            year = dateParts[2];
                            // Assume MM/DD format for simplicity
                            month = dateParts[0];
                            day = dateParts[1];
                        } else {
                            continue;
                        }
                        
                        // Ensure year has 4 digits
                        if (year.length === 2) {
                            year = "20" + year;
                        }
                        
                        // Create a date object
                        const date = new Date(`${year}-${month}-${day}`);
                        
                        // Check if date is valid and not in the future
                        if (!isNaN(date.getTime()) && date <= new Date()) {
                            patientInfo.reportDate = date.toLocaleDateString();
                            break;
                        }
                    }
                } catch (error) {
                    console.warn("Error parsing date:", error);
                }
            }
        }
        
    } catch (error) {
        console.error("Error extracting patient info:", error);
    }
    
    return patientInfo;
}

/**
 * Updates the patient information display in the UI
 * @param {Object} patientInfo - The extracted patient information
 */
function updatePatientInfoDisplay(patientInfo) {
    if (!patientInfo) return;
    
    try {
        // Update patient summary if it exists
        const patientSummary = document.getElementById('patient-summary');
        if (patientSummary) {
            patientSummary.innerHTML = '';
            
            // Patient name
            if (patientInfo.name && patientInfo.name !== "Unknown") {
                const nameElement = document.createElement('p');
                nameElement.innerHTML = `<strong>Patient:</strong> ${patientInfo.name}`;
                patientSummary.appendChild(nameElement);
            }
            
            // Patient age and gender
            if (patientInfo.age > 0 || patientInfo.gender !== "unknown") {
                const demographicsElement = document.createElement('p');
                let demographicsText = '<strong>Demographics:</strong> ';
                
                if (patientInfo.age > 0) {
                    demographicsText += `${patientInfo.age} years`;
                }
                
                if (patientInfo.gender !== "unknown") {
                    demographicsText += patientInfo.age > 0 ? `, ${patientInfo.gender}` : patientInfo.gender;
                }
                
                demographicsElement.innerHTML = demographicsText;
                patientSummary.appendChild(demographicsElement);
            }
            
            // Patient height and weight
            if (patientInfo.height > 0 || patientInfo.weight > 0) {
                const physicalElement = document.createElement('p');
                let physicalText = '<strong>Physical:</strong> ';
                
                if (patientInfo.height > 0) {
                    physicalText += `${patientInfo.height} cm`;
                }
                
                if (patientInfo.weight > 0) {
                    physicalText += patientInfo.height > 0 ? `, ${patientInfo.weight} kg` : `${patientInfo.weight} kg`;
                }
                
                physicalElement.innerHTML = physicalText;
                patientSummary.appendChild(physicalElement);
            }
        }
        
        // Update report date if it exists
        const reportDateElement = document.getElementById('report-date');
        if (reportDateElement && patientInfo.reportDate) {
            reportDateElement.textContent = patientInfo.reportDate;
        }
        
    } catch (error) {
        console.error("Error updating patient info display:", error);
    }
}

// Add this helper function to handle file changes
function handleFileChange(event) {
    console.log("File input change event fired");
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        // Show file information
        const file = fileInput.files[0];
        console.log("Selected file:", file.name, file.type, file.size);
        
        // Show selected file indicator
        const fileIndicatorContainer = document.getElementById('file-indicator-container');
        if (fileIndicatorContainer) {
            fileIndicatorContainer.innerHTML = `
                <div class="file-selected-indicator">
                    <div class="selected-file-info">
                        <i class="fas fa-file-medical"></i>
                        <span class="selected-file-name">${file.name}</span>
                    </div>
                    <span>File selected successfully!</span>
                </div>
            `;
        }
        
        // Test if the file type is supported
        if (!file.type.includes('image') && !file.type.includes('pdf')) {
            showAlert("Unsupported File", "Please upload an image (JPG, PNG) or PDF file.", "warning");
            // Clear the file input
            fileInput.value = '';
            if (fileIndicatorContainer) {
                fileIndicatorContainer.innerHTML = '';
            }
        }
    }
}

// Add this function for backward compatibility
function handleFiles(files) {
    if (files && files.length > 0 && fileInput) {
        // Update the file input with the files
        try {
            // Create a DataTransfer object and add the file
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(files[0]);
            fileInput.files = dataTransfer.files;
            
            // Manually trigger the change event
            const event = new Event('change');
            fileInput.dispatchEvent(event);
        } catch (error) {
            console.error("Error updating file input:", error);
            
            // Direct approach for compatibility
            if (typeof handleFileChange === 'function') {
                handleFileChange({ target: { files: files } });
            }
        }
    }
}

// Add this at the end of the file
// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded, initializing application...");
    if (typeof initializeApp === 'function') {
        console.log("Calling initializeApp function");
        initializeApp();
    } else {
        console.error("initializeApp function not found - manual initialization required");
        
        // Manual initialization as fallback
        const uploadArea = document.getElementById('uploadArea');
        const fileInput = document.getElementById('fileInput');
        const analyzeButton = document.getElementById('analyzeButton');
        
        if (uploadArea && fileInput) {
            console.log("Setting up upload area event listeners manually");
            uploadArea.addEventListener('click', () => {
                fileInput.click();
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                
                if (e.dataTransfer.files.length) {
                    fileInput.files = e.dataTransfer.files;
                    handleFileChange(e);
                }
            });
            
            fileInput.addEventListener('change', handleFileChange);
        }
        
        // Setup direct upload button
        const directUploadBtn = document.getElementById('directUploadBtn');
        if (directUploadBtn && fileInput) {
            directUploadBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event from bubbling to uploadArea
                fileInput.click();
            });
        }
        
        // Setup analyze button
        if (analyzeButton) {
            analyzeButton.addEventListener('click', async () => {
                if (fileInput && fileInput.files.length > 0) {
                    try {
                        showAlert("Analysis Started", "Processing your blood report with AI. This may take a moment...", "info");
                        if (typeof processBloodReport === 'function') {
                            await processBloodReport(fileInput.files[0]);
                        } else {
                            console.error("processBloodReport function not found");
                            showAlert("Processing Error", "Unable to process blood report. The required function is missing.", "error");
                        }
                    } catch (error) {
                        console.error("Error processing blood report:", error);
                        showAlert("Processing Error", "Failed to analyze the blood report: " + error.message, "error");
                        const loadingSection = document.getElementById('loadingSection');
                        if (loadingSection) loadingSection.classList.add('hidden');
                    }
                } else {
                    showAlert("No File Selected", "Please upload a blood report image first.", "warning");
                }
            });
        }
        
        // Set up alert button
        const alertButton = document.getElementById('alertButton');
        if (alertButton) {
            alertButton.addEventListener('click', function() {
                const alertOverlay = document.getElementById('alertOverlay');
                if (alertOverlay) {
                    alertOverlay.classList.remove('visible');
                    setTimeout(() => {
                        alertOverlay.classList.add('hidden');
                    }, 300);
                }
            });
        }
    }
});

// Setup the direct upload button functionality
function setupDirectUploadButton() {
    const directUploadBtn = document.getElementById('directUploadBtn');
    const fileInput = document.getElementById('fileInput');
    
    if (directUploadBtn && fileInput) {
        console.log("Setting up direct upload button");
        
        directUploadBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event from bubbling to uploadArea
            console.log("Direct upload button clicked");
            
            // Create a temporary input element to work around security restrictions
            // This ensures consistent behavior across browsers
            const tempFileInput = document.createElement('input');
            tempFileInput.type = 'file';
            tempFileInput.accept = '.jpg,.jpeg,.png,.pdf';
            tempFileInput.style.display = 'none';
            
            tempFileInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    console.log("File selected via direct upload button:", this.files[0].name);
                    
                    // Try to update the main file input with this file
                    try {
                        // Create a DataTransfer object and add the file
                        const dataTransfer = new DataTransfer();
                        dataTransfer.items.add(this.files[0]);
                        fileInput.files = dataTransfer.files;
                        
                        // Manually trigger the change event
                        const event = new Event('change');
                        fileInput.dispatchEvent(event);
                    } catch (error) {
                        console.error("Error updating file input:", error);
                        
                        // Fallback approach
                        handleFileChange({ target: { files: this.files } });
                    }
                    
                    // Remove the temporary input
                    document.body.removeChild(this);
                }
            });
            
            // Append the temporary input to the body and click it
            document.body.appendChild(tempFileInput);
            tempFileInput.click();
        });
    }
}

/**
 * Sets up tab switching for all tab groups in the application
 */
function setupTabSwitching() {
    console.log("Setting up tab switching functionality");
    
    try {
        // Handle the main tabs in the results section
        const mainTabs = document.querySelectorAll('.results-header .tab');
        const mainTabContents = document.querySelectorAll('.tab-content');
        
        if (mainTabs.length > 0 && mainTabContents.length > 0) {
            console.log("Found main tabs:", mainTabs.length);
            
            mainTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    // Remove active class from all tabs
                    mainTabs.forEach(t => t.classList.remove('active'));
                    
                    // Add active class to clicked tab
                    tab.classList.add('active');
                    
                    // Hide all tab content
                    mainTabContents.forEach(content => content.classList.remove('active'));
                    
                    // Show the corresponding tab content
                    const tabId = tab.getAttribute('data-tab');
                    const tabContent = document.getElementById(tabId);
                    if (tabContent) {
                        tabContent.classList.add('active');
                    } else {
                        console.error("Tab content not found for:", tabId);
                    }
                });
            });
        }
        
        // Handle the ML insights tabs
        const mlTabHeaders = document.querySelectorAll('.tab-headers .tab-header');
        const mlTabPanels = document.querySelectorAll('.tab-panel');
        
        if (mlTabHeaders.length > 0 && mlTabPanels.length > 0) {
            console.log("Found ML insights tabs:", mlTabHeaders.length);
            
            mlTabHeaders.forEach(header => {
                header.addEventListener('click', () => {
                    // Remove active class from all headers
                    mlTabHeaders.forEach(h => h.classList.remove('active'));
                    
                    // Add active class to clicked header
                    header.classList.add('active');
                    
                    // Hide all tab panels
                    mlTabPanels.forEach(panel => panel.classList.remove('active'));
                    
                    // Show the corresponding tab panel
                    const tabId = header.getAttribute('data-tab');
                    const tabPanel = document.getElementById(tabId);
                    if (tabPanel) {
                        tabPanel.classList.add('active');
                    } else {
                        console.error("Tab panel not found for:", tabId);
                    }
                });
            });
        }
        
        console.log("Tab switching setup complete");
    } catch (error) {
        console.error("Error setting up tab switching:", error);
    }
}

/**
 * Prepare the blood data for display by adding reference ranges and identifying abnormal values
 * @param {Object} bloodData - The blood data to prepare
 * @returns {Array} Processed blood data with reference ranges and abnormal flags
 */
function prepareBloodDataForDisplay(bloodData) {
    console.log("Preparing blood data for display:", bloodData);
    
    if (!bloodData || Object.keys(bloodData).length === 0) {
        console.error("No blood data to prepare");
        return [];
    }
    
    const processedData = [];
    
    // Make sure bloodTestRanges is available
    if (typeof bloodTestRanges === 'undefined' || !bloodTestRanges) {
        console.error("Reference ranges not available for blood data preparation");
        // Basic fallback processing if we don't have reference ranges
        return Object.entries(bloodData).map(([key, value]) => {
            return {
                name: key,
                value: value,
                isAbnormal: false, // Default to not abnormal without reference ranges
                status: "unknown"
            };
        });
    }
    
    // Process each parameter
    for (const [param, value] of Object.entries(bloodData)) {
        try {
            // Skip non-numeric values
            if (typeof value !== 'number' || isNaN(value)) {
                console.warn(`Skipping non-numeric parameter value: ${param} = ${value}`);
                continue;
            }
            
            // Get reference range if available
            const range = bloodTestRanges[param];
            let isAbnormal = false;
            let status = "normal";
            let deviationPercent = 0;
            
            if (range) {
                const { min, max, unit, description } = range;
                
                // Determine if abnormal
                if (value < min) {
                    isAbnormal = true;
                    status = "low";
                    deviationPercent = ((min - value) / min) * 100;
                } else if (value > max) {
                    isAbnormal = true;
                    status = "high";
                    deviationPercent = ((value - max) / max) * 100;
                }
                
                // Determine severity based on deviation
                let severity = "mild";
                if (deviationPercent > 50) {
                    severity = "high";
                } else if (deviationPercent > 20) {
                    severity = "moderate";
                }
                
                // Add to processed data
                processedData.push({
                    name: param,
                    value: value,
                    min: min,
                    max: max,
                    unit: unit || "",
                    description: description || formatParameterName(param),
                    isAbnormal: isAbnormal,
                    status: status,
                    severity: severity,
                    deviationPercent: deviationPercent.toFixed(1),
                    normalRange: `${min}-${max}`,
                    formattedName: formatParameterName(param)
                });
            } else {
                // Handle parameters without reference ranges
                console.warn(`Reference range not found for parameter: ${param}`);
                processedData.push({
                    name: param,
                    value: value,
                    isAbnormal: false, // Default to not abnormal without reference range
                    status: "unknown",
                    formattedName: formatParameterName(param)
                });
            }
        } catch (error) {
            console.error(`Error processing parameter ${param}:`, error);
        }
    }
    
    // Sort abnormal parameters first, then alphabetically
    processedData.sort((a, b) => {
        // First by abnormal status
        if (a.isAbnormal && !b.isAbnormal) return -1;
        if (!a.isAbnormal && b.isAbnormal) return 1;
        
        // Then by severity if both abnormal
        if (a.isAbnormal && b.isAbnormal) {
            const severityOrder = { high: 0, moderate: 1, mild: 2 };
            if (severityOrder[a.severity] < severityOrder[b.severity]) return -1;
            if (severityOrder[a.severity] > severityOrder[b.severity]) return 1;
        }
        
        // Lastly by name alphabetically
        return a.formattedName.localeCompare(b.formattedName);
    });
    
    console.log("Processed data:", processedData);
    return processedData;
}

/**
 * Update the results display with processed blood data
 * @param {Array} processedData - The processed blood data
 * @param {Object} diseaseStages - The disease staging information
 * @param {Object} healthAnalysis - The health analysis results
 */
function updateResultsDisplay(processedData, diseaseStages, healthAnalysis) {
    console.log("Updating results display with:", { processedData, diseaseStages, healthAnalysis });
    
    // Get container elements
    const abnormalParamsContainer = document.getElementById('abnormalParameters');
    const normalParamsContainer = document.getElementById('normalParameters');
    const potentialConditionsContainer = document.getElementById('potentialConditions');
    const medicalRecommendationsContainer = document.getElementById('medicalRecommendations');
    const lifestyleRecommendationsContainer = document.getElementById('lifestyleRecommendations');
    
    // Clear containers
    if (abnormalParamsContainer) abnormalParamsContainer.innerHTML = '';
    if (normalParamsContainer) normalParamsContainer.innerHTML = '';
    if (potentialConditionsContainer) potentialConditionsContainer.innerHTML = '';
    if (medicalRecommendationsContainer) medicalRecommendationsContainer.innerHTML = '';
    if (lifestyleRecommendationsContainer) lifestyleRecommendationsContainer.innerHTML = '';
    
    // Update the health score if available
    if (healthAnalysis && healthAnalysis.overallHealthScore) {
        const healthScoreValue = document.getElementById('healthScoreValue');
        const healthScoreMeter = document.getElementById('healthScoreMeter');
        
        if (healthScoreValue) {
            healthScoreValue.textContent = healthAnalysis.overallHealthScore;
            
            // Set color based on score
            if (healthAnalysis.overallHealthScore >= 80) {
                healthScoreValue.className = 'health-score-value good';
            } else if (healthAnalysis.overallHealthScore >= 60) {
                healthScoreValue.className = 'health-score-value moderate';
            } else {
                healthScoreValue.className = 'health-score-value poor';
            }
        }
        
        if (healthScoreMeter) {
            healthScoreMeter.style.width = `${healthAnalysis.overallHealthScore}%`;
            
            // Set color based on score
            if (healthAnalysis.overallHealthScore >= 80) {
                healthScoreMeter.className = 'score-level good';
            } else if (healthAnalysis.overallHealthScore >= 60) {
                healthScoreMeter.className = 'score-level moderate';
            } else {
                healthScoreMeter.className = 'score-level poor';
            }
        }
    }
    
    // Display abnormal parameters
    if (abnormalParamsContainer) {
        const abnormalParams = processedData.filter(param => param.isAbnormal);
        
        if (abnormalParams.length > 0) {
            abnormalParams.forEach(param => {
                abnormalParamsContainer.innerHTML += createAbnormalParameterCard(param);
            });
        } else {
            abnormalParamsContainer.innerHTML = '<p class="no-data-message">No abnormal parameters detected.</p>';
        }
    }
    
    // Display normal parameters
    if (normalParamsContainer) {
        const normalParams = processedData.filter(param => !param.isAbnormal);
        
        if (normalParams.length > 0) {
            normalParams.forEach(param => {
                normalParamsContainer.innerHTML += createNormalParameterCard(param);
            });
        } else {
            normalParamsContainer.innerHTML = '<p class="no-data-message">No normal parameters detected.</p>';
        }
    }
    
    // Display potential health conditions
    if (potentialConditionsContainer && diseaseStages) {
        if (Object.keys(diseaseStages).length > 0) {
            for (const [condition, info] of Object.entries(diseaseStages)) {
                potentialConditionsContainer.innerHTML += createConditionCard(condition, info);
            }
        } else {
            potentialConditionsContainer.innerHTML = '<p class="no-data-message">No potential health conditions detected.</p>';
        }
    }
    
    // Display recommendations
    if (medicalRecommendationsContainer || lifestyleRecommendationsContainer) {
        // Generate recommendations if needed
        let recommendations = [];
        let lifestyleRecs = [];
        
        if (healthAnalysis && healthAnalysis.recommendations) {
            // Use recommendations from health analysis if available
            recommendations = healthAnalysis.recommendations || [];
            lifestyleRecs = healthAnalysis.lifestyleRecommendations || [];
        } else {
            // Generate from disease stages and processed data
            const abnormalParams = processedData.filter(param => param.isAbnormal);
            recommendations = generateRecommendations(diseaseStages, abnormalParams, {});
            lifestyleRecs = generateLifestyleRecommendations(diseaseStages, {});
        }
        
        // Display medical recommendations
        if (medicalRecommendationsContainer) {
            if (recommendations.length > 0) {
                const recommendationsList = document.createElement('ul');
                recommendationsList.className = 'recommendations-list';
                
                recommendations.forEach(rec => {
                    const item = document.createElement('li');
                    item.className = 'recommendation-item';
                    item.innerHTML = `
                        <div class="recommendation-content">
                            <span class="recommendation-icon"><i class="fas fa-check-circle"></i></span>
                            <span class="recommendation-text">${rec}</span>
                        </div>
                    `;
                    recommendationsList.appendChild(item);
                });
                
                medicalRecommendationsContainer.appendChild(recommendationsList);
            } else {
                medicalRecommendationsContainer.innerHTML = '<p class="no-data-message">No specific medical recommendations available.</p>';
            }
        }
        
        // Display lifestyle recommendations
        if (lifestyleRecommendationsContainer) {
            if (lifestyleRecs.length > 0) {
                const recommendationsList = document.createElement('ul');
                recommendationsList.className = 'recommendations-list';
                
                lifestyleRecs.forEach(rec => {
                    const item = document.createElement('li');
                    item.className = 'recommendation-item';
                    item.innerHTML = `
                        <div class="recommendation-content">
                            <span class="recommendation-icon"><i class="fas fa-leaf"></i></span>
                            <span class="recommendation-text">${rec}</span>
                        </div>
                    `;
                    recommendationsList.appendChild(item);
                });
                
                lifestyleRecommendationsContainer.appendChild(recommendationsList);
            } else {
                lifestyleRecommendationsContainer.innerHTML = '<p class="no-data-message">No specific lifestyle recommendations available.</p>';
            }
        }
    }
    
    // Update overview statistics
    updateBloodCountStats(processedData);
    
    // Update most concerning parameter
    const mostConcerningParam = findMostConcerningParameter(processedData);
    const mostConcerningParamElement = document.getElementById('mostConcerningParam');
    if (mostConcerningParamElement && mostConcerningParam) {
        mostConcerningParamElement.textContent = mostConcerningParam.formattedName;
        mostConcerningParamElement.className = `highlight-value status-${mostConcerningParam.status}`;
    }
    
    // Update primary condition
    const primaryCondition = findPrimaryCondition(diseaseStages);
    const primaryConditionElement = document.getElementById('primaryCondition');
    if (primaryConditionElement && primaryCondition) {
        primaryConditionElement.textContent = primaryCondition.displayName;
        primaryConditionElement.className = `highlight-value severity-${primaryCondition.severity}`;
    }
    
    // Update confidence score
    const confidenceScore = document.getElementById('confidenceScore');
    if (confidenceScore) {
        const score = calculateOverallConfidence(diseaseStages);
        confidenceScore.textContent = score >= 0.8 ? 'High' : score >= 0.6 ? 'Medium' : 'Low';
    }
}

/**
 * Create a card for an abnormal parameter
 * @param {Object} param - The parameter data
 * @returns {string} HTML for the parameter card
 */
function createAbnormalParameterCard(param) {
    const severityClass = `severity-${param.severity || 'low'}`;
    const statusClass = `status-${param.status || 'abnormal'}`;
    
    return `
        <div class="parameter abnormal ${statusClass} ${severityClass}">
            <div class="parameter-header">
                <h4>${param.formattedName || formatParameterName(param.name)}</h4>
                <span class="severity-badge ${severityClass}">${param.severity ? capitalizeFirst(param.severity) : 'Abnormal'}</span>
            </div>
            <div class="parameter-value">
                <span class="value ${statusClass}">${param.value} ${param.unit || ''}</span>
                <span class="normal-range">Normal: ${param.normalRange || `${param.min}-${param.max}`} ${param.unit || ''}</span>
            </div>
            <div class="parameter-info">
                <p class="deviation">Deviation: ${param.deviationPercent || ''}%</p>
                <p class="description">${param.description || ''}</p>
            </div>
        </div>
    `;
}

/**
 * Create a card for a normal parameter
 * @param {Object} param - The parameter data
 * @returns {string} HTML for the parameter card
 */
function createNormalParameterCard(param) {
    return `
        <div class="parameter normal">
            <div class="parameter-header">
                <h4>${param.formattedName || formatParameterName(param.name)}</h4>
                <span class="status-badge normal">Normal</span>
            </div>
            <div class="parameter-value">
                <span class="value">${param.value} ${param.unit || ''}</span>
                ${param.normalRange ? `<span class="normal-range">Range: ${param.normalRange} ${param.unit || ''}</span>` : ''}
            </div>
            ${param.description ? `<p class="description">${param.description}</p>` : ''}
        </div>
    `;
}

/**
 * Create a card for a health condition
 * @param {string} condition - The condition name
 * @param {Object} info - The condition data
 * @returns {string} HTML for the condition card
 */
function createConditionCard(condition, info) {
    // Format condition name for display
    const displayName = info.disease || formatConditionName(condition);
    
    // Set severity class
    let severityClass = 'severity-low';
    if (typeof info.severity === 'number') {
        severityClass = info.severity >= 3 ? 'severity-high' : 
                       info.severity >= 2 ? 'severity-moderate' : 'severity-low';
    } else if (info.severity) {
        severityClass = `severity-${info.severity.toLowerCase()}`;
    }
    
    // Calculate confidence percentage
    const confidencePercent = info.confidence ? Math.round(info.confidence * 100) : 
                             info.riskPercentage || 
                             (info.riskScore ? Math.min(Math.round(info.riskScore), 100) : 70);
    
    // Format recommendations
    let recommendationsHtml = '';
    if (info.recommendations && info.recommendations.length > 0) {
        recommendationsHtml = '<div class="condition-recommendations"><h5>Recommendations:</h5><ul>';
        info.recommendations.slice(0, 3).forEach(rec => {
            recommendationsHtml += `<li>${rec}</li>`;
        });
        recommendationsHtml += '</ul></div>';
    }
    
    return `
        <div class="condition-card ${severityClass}">
            <div class="condition-header">
                <h4>${displayName}</h4>
                <div class="condition-confidence">
                    <span class="confidence-value">${confidencePercent}%</span>
                    <span class="confidence-label">confidence</span>
                </div>
            </div>
            <div class="condition-details">
                <div class="condition-stage">
                    <span class="stage-badge ${severityClass}">${info.stage || (info.severity === 2 ? 'Moderate' : info.severity === 3 ? 'Severe' : 'Mild')}</span>
                </div>
                <p class="condition-description">${info.interpretation || info.description || ''}</p>
            </div>
            ${recommendationsHtml}
        </div>
    `;
}

/**
 * Find the most concerning parameter from the processed data
 * @param {Array} processedData - The processed blood data
 * @returns {Object} The most concerning parameter
 */
function findMostConcerningParameter(processedData) {
    if (!processedData || processedData.length === 0) return null;
    
    // Filter to abnormal parameters
    const abnormalParams = processedData.filter(param => param.isAbnormal);
    if (abnormalParams.length === 0) return null;
    
    // Sort by severity and deviation percent
    abnormalParams.sort((a, b) => {
        // Sort by severity first
        const severityOrder = { high: 3, moderate: 2, mild: 1 };
        const aSeverity = severityOrder[a.severity] || 0;
        const bSeverity = severityOrder[b.severity] || 0;
        
        if (aSeverity !== bSeverity) {
            return bSeverity - aSeverity; // Higher severity first
        }
        
        // Then by deviation percent
        const aDeviation = parseFloat(a.deviationPercent || 0);
        const bDeviation = parseFloat(b.deviationPercent || 0);
        return bDeviation - aDeviation; // Higher deviation first
    });
    
    return abnormalParams[0];
}

/**
 * Find the primary health condition from disease stages
 * @param {Object} diseaseStages - The disease staging data
 * @returns {Object} The primary condition
 */
function findPrimaryCondition(diseaseStages) {
    if (!diseaseStages || Object.keys(diseaseStages).length === 0) return null;
    
    // Convert to array for sorting
    const conditions = Object.entries(diseaseStages).map(([key, value]) => {
        return {
            id: key,
            displayName: value.disease || formatConditionName(key),
            severity: value.severity || 1,
            confidence: value.confidence || 0.7,
            riskScore: value.riskScore || 0
        };
    });
    
    // Sort by severity and confidence
    conditions.sort((a, b) => {
        if (a.severity !== b.severity) {
            return b.severity - a.severity; // Higher severity first
        }
        return b.confidence - a.confidence; // Higher confidence first
    });
    
    return conditions[0];
}

/**
 * Calculate the overall confidence of the analysis
 * @param {Object} diseaseStages - The disease staging data
 * @returns {number} The overall confidence score (0-1)
 */
function calculateOverallConfidence(diseaseStages) {
    if (!diseaseStages || Object.keys(diseaseStages).length === 0) return 0.7;
    
    // Calculate average confidence of all conditions
    let totalConfidence = 0;
    let count = 0;
    
    for (const condition of Object.values(diseaseStages)) {
        if (condition.confidence) {
            totalConfidence += condition.confidence;
            count++;
        }
    }
    
    return count > 0 ? totalConfidence / count : 0.7;
}

/**
 * Format a condition name for display
 * @param {string} condition - The condition name
 * @returns {string} Formatted condition name
 */
function formatConditionName(condition) {
    if (!condition) return 'Unknown Condition';
    
    // Handle camelCase
    const spacedCondition = condition.replace(/([A-Z])/g, ' $1');
    
    // Capitalize first letter
    return spacedCondition.charAt(0).toUpperCase() + spacedCondition.slice(1);
}

/**
 * Capitalize the first letter of a string
 * @param {string} string - The string to capitalize
 * @returns {string} Capitalized string
 */
function capitalizeFirst(string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Perform advanced multi-factor health analysis using blood data and patient information
 * This function provides a comprehensive health analysis with AI-inspired insights
 * @param {Object} bloodData - The blood test parameters
 * @param {Object} patientInfo - The patient information (age, gender, etc.)
 * @param {Object} diseaseStages - The disease staging results
 * @returns {Object} Comprehensive health analysis with insights, predictions, and recommendations
 */
function performMultiFactorHealthAnalysis(bloodData, patientInfo, diseaseStages) {
    console.log("Performing multi-factor health analysis...");
    console.log("Patient info:", patientInfo);
    console.log("Disease stages:", diseaseStages);
    
    // Initialize the analysis results
    const analysis = {
        overallHealthScore: 0,
        confidenceLevel: 0,
        insights: [],
        correlations: [],
        predictions: [],
        recommendationPriority: [],
        recommendations: [],
        lifestyleRecommendations: []
    };
    
    try {
        // Extract key patient demographics for risk calculations
        const age = patientInfo.age || 45;
        const gender = patientInfo.gender || 'male';
        const isMale = gender.toLowerCase() === 'male';
        const height = patientInfo.height || 170; // in cm
        const weight = patientInfo.weight || 70; // in kg
        
        // Calculate BMI
        const bmi = weight / Math.pow(height/100, 2);
        const isBmiHigh = bmi >= 25;
        const isBmiVeryHigh = bmi >= 30;
        
        // Extract key blood parameters with defaults if missing
        const bloodParams = {
            // CBC
            hgb: bloodData.hemoglobin || 0,
            hct: bloodData.hematocrit || 0,
            wbc: bloodData.wbc || 0,
            rbc: bloodData.rbc || 0,
            plt: bloodData.platelets || 0,
            
            // Metabolic
            glu: bloodData.glucose || 0,
            hba1c: bloodData.hba1c || 0,
            
            // Lipids
            chol: bloodData.cholesterol || 0,
            ldl: bloodData.ldl || 0,
            hdl: bloodData.hdl || 0,
            tg: bloodData.triglycerides || 0,
            
            // Kidney
            cre: bloodData.creatinine || 0,
            urea: bloodData.urea || 0,
            ua: bloodData.uricAcid || 0,
            
            // Liver
            alt: bloodData.alt || 0,
            ast: bloodData.ast || 0,
            alp: bloodData.alp || 0,
            bilirubin: bloodData.bilirubin || 0,
            albumin: bloodData.albumin || 0,
            
            // Electrolytes
            sodium: bloodData.sodium || 0,
            potassium: bloodData.potassium || 0,
            calcium: bloodData.calcium || 0
        };
        
        // Calculate overall health score based on multiple factors
        let healthScore = 80; // Start with a baseline score of 80 (good health)
        let abnormalCount = 0;
        let totalParameterCount = 0;
        let confidencePoints = 70; // Base confidence level
        
        // Evaluate each parameter if we have a reference range
        if (typeof bloodTestRanges !== 'undefined') {
            for (const [param, value] of Object.entries(bloodData)) {
                if (bloodTestRanges[param] && typeof value === 'number') {
                    totalParameterCount++;
                    
                    const { min, max } = bloodTestRanges[param];
                    if (value < min || value > max) {
                        abnormalCount++;
                        
                        // Calculate deviation percentage
                        const deviation = value < min ? 
                            ((min - value) / min) * 100 : 
                            ((value - max) / max) * 100;
                        
                        // Reduce health score based on deviation severity
                        if (deviation > 50) {
                            healthScore -= 5; // Severe deviation
                        } else if (deviation > 20) {
                            healthScore -= 3; // Moderate deviation
                        } else {
                            healthScore -= 1; // Mild deviation
                        }
                    }
                }
            }
        }
        
        // Adjust health score based on disease stages
        if (diseaseStages) {
            const diseaseCount = Object.keys(diseaseStages).length;
            
            if (diseaseCount > 0) {
                // Reduce score based on disease count
                healthScore -= diseaseCount * 3;
                
                // Further reduction based on disease severity
                for (const disease of Object.values(diseaseStages)) {
                    if (disease.severity >= 3) {
                        healthScore -= 8; // Severe condition
                    } else if (disease.severity >= 2) {
                        healthScore -= 5; // Moderate condition
                    } else {
                        healthScore -= 2; // Mild condition
                    }
                }
            }
        }
        
        // Adjust health score based on BMI
        if (isBmiVeryHigh) {
            healthScore -= 5;
        } else if (isBmiHigh) {
            healthScore -= 2;
        }
        
        // Age adjustment (more parameters abnormal = more concerning in older patients)
        if (age > 60 && abnormalCount > 0) {
            healthScore -= abnormalCount * 0.5;
        }
        
        // Ensure health score is within 0-100 range
        analysis.overallHealthScore = Math.max(0, Math.min(100, Math.round(healthScore)));
        
        // Calculate confidence level
        if (totalParameterCount >= 15) {
            confidencePoints += 20; // High confidence with many parameters
        } else if (totalParameterCount >= 8) {
            confidencePoints += 10; // Moderate confidence
        }
        
        if (diseaseStages && Object.keys(diseaseStages).length > 0) {
            confidencePoints += 5; // Higher confidence with identified conditions
        }
        
        // Adjust for missing key parameters
        const keyParams = ['hemoglobin', 'glucose', 'creatinine', 'alt'];
        const missingKeyParams = keyParams.filter(param => !bloodData[param]).length;
        confidencePoints -= missingKeyParams * 5;
        
        // Ensure confidence is within 0-100 range
        analysis.confidenceLevel = Math.max(40, Math.min(95, confidencePoints));
        
        // Generate health insights
        if (bloodParams.glu > 0) {
            if (bloodParams.glu >= 126) {
                analysis.insights.push({
                    title: "Elevated Blood Glucose",
                    description: "Your blood glucose level is significantly elevated, which is consistent with diabetes. This requires medical attention.",
                    impactLevel: 3,
                    parameters: { glucose: bloodParams.glu }
                });
            } else if (bloodParams.glu >= 100 && bloodParams.glu < 126) {
                analysis.insights.push({
                    title: "Pre-diabetic Blood Glucose",
                    description: "Your blood glucose level is in the pre-diabetic range. This suggests increased risk for developing diabetes.",
                    impactLevel: 2,
                    parameters: { glucose: bloodParams.glu }
                });
            }
        }
        
        // Lipid insights
        if (bloodParams.ldl > 0 && bloodParams.hdl > 0) {
            if (bloodParams.ldl > 130 && bloodParams.hdl < 40) {
                analysis.insights.push({
                    title: "Unfavorable Cholesterol Profile",
                    description: "Both elevated LDL ('bad' cholesterol) and low HDL ('good' cholesterol) significantly increase cardiovascular risk.",
                    impactLevel: 3,
                    parameters: { ldl: bloodParams.ldl, hdl: bloodParams.hdl }
                });
            } else if (bloodParams.ldl > 130) {
                analysis.insights.push({
                    title: "Elevated LDL Cholesterol",
                    description: "Your LDL ('bad' cholesterol) level is above the desirable range, which may increase cardiovascular risk.",
                    impactLevel: 2,
                    parameters: { ldl: bloodParams.ldl }
                });
            } else if (bloodParams.hdl < 40) {
                analysis.insights.push({
                    title: "Low HDL Cholesterol",
                    description: "Your HDL ('good' cholesterol) level is below the recommended range. HDL helps remove other forms of cholesterol from your bloodstream.",
                    impactLevel: 2,
                    parameters: { hdl: bloodParams.hdl }
                });
            }
        }
        
        // Anemia insights
        if (bloodParams.hgb > 0) {
            const isLow = (patientInfo.gender === 'male' && bloodParams.hgb < 13.5) || 
                         (patientInfo.gender === 'female' && bloodParams.hgb < 12.0);
            
            if (isLow) {
                const severelyLow = (patientInfo.gender === 'male' && bloodParams.hgb < 10.0) || 
                                   (patientInfo.gender === 'female' && bloodParams.hgb < 9.0);
                
                analysis.insights.push({
                    title: severelyLow ? "Significant Anemia" : "Mild Anemia",
                    description: severelyLow ? 
                        "Your hemoglobin level is significantly below normal range, indicating moderate to severe anemia. This requires medical attention." : 
                        "Your hemoglobin level is slightly below normal range, suggesting mild anemia.",
                    impactLevel: severelyLow ? 3 : 2,
                    parameters: { hemoglobin: bloodParams.hgb }
                });
            }
        }
        
        // Generate typical recommendations
        analysis.recommendations = [
            "Schedule a follow-up appointment with your healthcare provider to discuss these results.",
            "Maintain a balanced diet rich in fruits, vegetables, whole grains, and lean proteins.",
            "Stay hydrated by drinking enough water throughout the day.",
            "Get regular physical activity appropriate for your health status.",
            "Ensure you get adequate sleep (7-9 hours for most adults)."
        ];
        
        // Generate lifestyle recommendations
        analysis.lifestyleRecommendations = [
            "Consider consulting with a registered dietitian for a personalized nutrition plan",
            "Aim for at least 150 minutes of moderate-intensity exercise per week",
            "Practice stress management techniques such as meditation, deep breathing, or yoga",
            "Ensure you get 7-9 hours of quality sleep each night",
            "Stay socially connected with friends, family, and community"
        ];
            
        return analysis;
    } catch (error) {
        console.error("Error performing health analysis:", error);
        
        // Return basic analysis on error
        return {
            overallHealthScore: 70,
            confidenceLevel: 60,
            insights: [{
                title: "Analysis Limited",
                description: "Some parameters couldn't be analyzed due to technical limitations.",
                impactLevel: 1
            }],
            recommendations: [
                "Consult with a healthcare provider for a complete evaluation.",
                "Consider getting comprehensive blood tests for a more accurate analysis."
            ]
        };
    }
}

/**
 * Creates a health score visualization using Chart.js
 * @param {Object} healthAnalysis - The health analysis data
 */
function createHealthScoreChart(healthAnalysis) {
    if (!healthAnalysis || typeof healthAnalysis.overallHealthScore !== 'number') {
        console.warn("Cannot create health score chart: Invalid health analysis data");
        return;
    }
    
    const chartCanvas = document.getElementById('healthScoreChart');
    if (!chartCanvas) {
        console.warn("Health score chart canvas not found");
        return;
    }
    
    // Clear any existing chart
    if (chartCanvas._chart) {
        chartCanvas._chart.destroy();
    }
    
    console.log("Creating health score chart with score:", healthAnalysis.overallHealthScore);
    
    // Create a gauge chart for health score
    const healthScore = healthAnalysis.overallHealthScore;
    const confidenceLevel = healthAnalysis.confidenceLevel || 75;
    
    // Determine color based on score
    let scoreColor = '#3AB795'; // Good (green)
    if (healthScore < 60) {
        scoreColor = '#EE6352'; // Poor (red)
    } else if (healthScore < 80) {
        scoreColor = '#F9C80E'; // Moderate (yellow)
    }
    
    try {
        chartCanvas._chart = new Chart(chartCanvas, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [healthScore, 100 - healthScore],
                    backgroundColor: [scoreColor, '#E9ECEF'],
                    borderWidth: 0
                }]
            },
            options: {
                circumference: Math.PI,
                rotation: Math.PI,
                cutoutPercentage: 70,
                responsive: true,
                maintainAspectRatio: true,
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                tooltips: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem, data) {
                            return 'Health Score: ' + healthScore + '/100';
                        }
                    }
                },
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Overall Health Score',
                    position: 'bottom',
                    fontSize: 16,
                    padding: 20
                }
            },
            plugins: [{
                beforeDraw: function(chart) {
                    const width = chart.chart.width;
                    const height = chart.chart.height;
                    const ctx = chart.chart.ctx;
                    
                    ctx.restore();
                    
                    const fontSize = (height / 10).toFixed(2);
                    ctx.font = fontSize + 'px Arial';
                    ctx.textBaseline = 'middle';
                    ctx.textAlign = 'center';
                    
                    // Draw the health score
                    const text = healthScore;
                    const textX = width / 2;
                    const textY = height - (height / 4);
                    
                    ctx.fillStyle = scoreColor;
                    ctx.fillText(text, textX, textY);
                    
                    // Draw the label
                    const labelFontSize = (height / 20).toFixed(2);
                    ctx.font = labelFontSize + 'px Arial';
                    ctx.fillStyle = '#666';
                    ctx.fillText('Confidence: ' + confidenceLevel + '%', textX, textY + parseInt(fontSize) + 5);
                    
                    ctx.save();
                }
            }]
        });
    } catch (error) {
        console.error("Error creating health score chart:", error);
    }
}

/**
 * Creates a visualization for health insights 
 * @param {Array} insights - The health insights from the analysis
 */
function createInsightsVisualization(insights) {
    if (!insights || !Array.isArray(insights) || insights.length === 0) {
        console.warn("Cannot create insights visualization: No insights data");
        return;
    }
    
    const chartCanvas = document.getElementById('insightsChart');
    if (!chartCanvas) {
        console.warn("Insights chart canvas not found");
        return;
    }
    
    // Clear any existing chart
    if (chartCanvas._chart) {
        chartCanvas._chart.destroy();
    }
    
    console.log("Creating insights visualization with insights:", insights);
    
    // Sort insights by impact level (highest first)
    const sortedInsights = [...insights].sort((a, b) => (b.impactLevel || 0) - (a.impactLevel || 0));
    
    // Take up to top 5 insights
    const topInsights = sortedInsights.slice(0, 5);
    
    // Prepare data for radar chart
    const labels = topInsights.map(insight => insight.title);
    const data = topInsights.map(insight => insight.impactLevel || 1);
    
    // Create color scale based on impact
    const colors = topInsights.map(insight => {
        const impactLevel = insight.impactLevel || 1;
        if (impactLevel >= 3) return 'rgba(238, 99, 82, 0.7)'; // High impact (red)
        if (impactLevel >= 2) return 'rgba(249, 200, 14, 0.7)'; // Moderate impact (yellow)
        return 'rgba(58, 183, 149, 0.7)'; // Low impact (green)
    });
    
    try {
        chartCanvas._chart = new Chart(chartCanvas, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Health Impact',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: colors,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: colors,
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 3,
                        stepSize: 1,
                        display: false
                    },
                    pointLabels: {
                        fontSize: 14
                    }
                },
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            const insight = topInsights[tooltipItem.index];
                            const impactText = insight.impactLevel >= 3 ? 'High Impact' : 
                                               insight.impactLevel >= 2 ? 'Moderate Impact' : 'Low Impact';
                            return [insight.title, impactText, insight.description];
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Key Health Insights',
                    fontSize: 16,
                    padding: 20
                }
            }
        });
    } catch (error) {
        console.error("Error creating insights visualization:", error);
    }
}

/**
 * Display ML-powered insights from the health analysis
 * @param {Object} healthAnalysis - The health analysis data
 */
function displayMlInsights(healthAnalysis) {
    console.log("Displaying ML insights from health analysis:", healthAnalysis);
    
    if (!healthAnalysis || !healthAnalysis.insights || !Array.isArray(healthAnalysis.insights)) {
        console.warn("No insights available in health analysis");
        return;
    }
    
    const insightsContainer = document.getElementById('mlInsights');
    if (!insightsContainer) {
        console.warn("ML insights container not found");
        return;
    }
    
    // Clear any existing content
    insightsContainer.innerHTML = '';
    
    // Add confidence indicator
    const confidenceSection = document.createElement('div');
    confidenceSection.className = 'analysis-confidence';
    confidenceSection.innerHTML = `
        <div class="confidence-header">
            <h4>Analysis Confidence</h4>
            <span class="confidence-score">${healthAnalysis.confidenceLevel}%</span>
        </div>
        <div class="confidence-bar-container">
            <div class="confidence-bar" style="width: ${healthAnalysis.confidenceLevel}%"></div>
        </div>
    `;
    insightsContainer.appendChild(confidenceSection);
    
    // Add insights header
    const insightsHeader = document.createElement('h4');
    insightsHeader.className = 'insights-header';
    insightsHeader.textContent = 'Key Health Insights';
    insightsContainer.appendChild(insightsHeader);
    
    // Sort insights by impact level (highest first)
    const sortedInsights = [...healthAnalysis.insights].sort((a, b) => 
        (b.impactLevel || 0) - (a.impactLevel || 0)
    );
    
    // Create and add insight cards
    if (sortedInsights.length > 0) {
        const insightsList = document.createElement('div');
        insightsList.className = 'insights-list';
        
        sortedInsights.forEach(insight => {
            // Determine impact level class
            let impactClass = 'impact-low';
            if (insight.impactLevel >= 3) {
                impactClass = 'impact-high'; 
            } else if (insight.impactLevel >= 2) {
                impactClass = 'impact-moderate';
            }
            
            // Create insight card
            const insightCard = document.createElement('div');
            insightCard.className = `insight-card ${impactClass}`;
            
            // Generate parameters display if available
            let parametersHTML = '';
            if (insight.parameters) {
                parametersHTML = '<div class="insight-parameters">';
                Object.entries(insight.parameters).forEach(([param, value]) => {
                    parametersHTML += `<span class="insight-parameter">${formatParameterName(param)}: ${value}</span>`;
                });
                parametersHTML += '</div>';
            }
            
            insightCard.innerHTML = `
                <div class="insight-header">
                    <h5 class="insight-title">${insight.title}</h5>
                    <span class="impact-badge ${impactClass}">${
                        insight.impactLevel >= 3 ? 'High Impact' : 
                        insight.impactLevel >= 2 ? 'Moderate Impact' : 'Low Impact'
                    }</span>
                </div>
                <p class="insight-description">${insight.description}</p>
                ${parametersHTML}
            `;
            
            insightsList.appendChild(insightCard);
        });
        
        insightsContainer.appendChild(insightsList);
    } else {
        // Display message if no insights available
        const noInsightsMessage = document.createElement('p');
        noInsightsMessage.className = 'no-data-message';
        noInsightsMessage.textContent = 'No specific insights available for this analysis.';
        insightsContainer.appendChild(noInsightsMessage);
    }
    
    // Add recommendation priorities if available
    if (healthAnalysis.recommendationPriority && healthAnalysis.recommendationPriority.length > 0) {
        const prioritiesHeader = document.createElement('h4');
        prioritiesHeader.className = 'priorities-header';
        prioritiesHeader.textContent = 'Recommendation Priorities';
        insightsContainer.appendChild(prioritiesHeader);
        
        const prioritiesList = document.createElement('ul');
        prioritiesList.className = 'priorities-list';
        
        healthAnalysis.recommendationPriority.forEach(priority => {
            const priorityItem = document.createElement('li');
            priorityItem.className = 'priority-item';
            priorityItem.innerHTML = `<span class="priority-text">${priority}</span>`;
            prioritiesList.appendChild(priorityItem);
        });
        
        insightsContainer.appendChild(prioritiesList);
    }
}