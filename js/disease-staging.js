// Disease Staging Module
// Provides advanced analysis of blood parameters to determine disease stages

// Disease staging definitions with stages, criteria, and recommendations
const diseaseStages = {
    diabetes: {
        name: "Diabetes",
        stages: {
            prediabetes: {
                name: "Prediabetes",
                criteria: {
                    glucose: { min: 100, max: 125 },
                    hba1c: { min: 5.7, max: 6.4 }
                },
                description: "Blood sugar levels are higher than normal but not high enough to be classified as diabetes.",
                recommendations: [
                    "Increase physical activity (aim for 150 minutes per week)",
                    "Lose 5-7% of body weight if overweight",
                    "Follow a balanced diet with reduced simple carbohydrates",
                    "Get screened for diabetes every 1-2 years"
                ]
            },
            early: {
                name: "Early Stage Diabetes (Stage 1)",
                criteria: {
                    glucose: { min: 126, max: 180 },
                    hba1c: { min: 6.5, max: 7.5 }
                },
                description: "Diabetes is present but well controlled or recently diagnosed.",
                recommendations: [
                    "Follow a diabetic meal plan as advised by a dietitian",
                    "Regular monitoring of blood glucose levels",
                    "Start medication as prescribed by your doctor",
                    "Regular exercise of at least 150 minutes per week",
                    "Diabetes education program to learn self-management"
                ]
            },
            intermediate: {
                name: "Intermediate Diabetes (Stage 2)",
                criteria: {
                    glucose: { min: 181, max: 300 },
                    hba1c: { min: 7.6, max: 9.0 }
                },
                description: "Diabetes with suboptimal control, may start showing early complications.",
                recommendations: [
                    "Intensify medication regimen as directed by your doctor",
                    "More frequent blood glucose monitoring",
                    "Careful attention to diet and carbohydrate counting",
                    "Regular screening for complications (eyes, kidneys, feet)",
                    "Consider consulting an endocrinologist"
                ]
            },
            advanced: {
                name: "Advanced Diabetes (Stage 3)",
                criteria: {
                    glucose: { min: 301, max: 999 },
                    hba1c: { min: 9.1, max: 99 }
                },
                description: "Poorly controlled diabetes with high risk of complications or existing complications.",
                recommendations: [
                    "Urgent medical attention to adjust treatment regimen",
                    "Possible insulin therapy if not already prescribed",
                    "Comprehensive screening for all diabetes-related complications",
                    "Multidisciplinary care team approach",
                    "Frequent follow-ups with healthcare providers"
                ]
            }
        }
    },
    
    anemia: {
        name: "Anemia",
        stages: {
            mild: {
                name: "Mild Anemia",
                criteria: {
                    hemoglobin: { min: 11, max: 12.9, gender: "female" },
                    hemoglobin: { min: 11, max: 13.9, gender: "male" }
                },
                description: "Slightly reduced hemoglobin levels with minimal or no symptoms.",
                recommendations: [
                    "Dietary improvements with iron-rich foods",
                    "Consider over-the-counter iron supplements",
                    "Follow-up blood test in 2-3 months",
                    "Identify and address potential causes (e.g., menstrual bleeding)"
                ]
            },
            moderate: {
                name: "Moderate Anemia",
                criteria: {
                    hemoglobin: { min: 8, max: 10.9, gender: "female" },
                    hemoglobin: { min: 8, max: 10.9, gender: "male" }
                },
                description: "Decreased hemoglobin levels that may cause fatigue, weakness, and pale skin.",
                recommendations: [
                    "Prescribed iron supplements or other treatments",
                    "Regular monitoring of hemoglobin levels",
                    "Additional testing to determine underlying cause",
                    "Dietary counseling for iron-rich foods",
                    "Consider vitamin B12 or folate supplementation if deficient"
                ]
            },
            severe: {
                name: "Severe Anemia",
                criteria: {
                    hemoglobin: { min: 0, max: 7.9 }
                },
                description: "Critically low hemoglobin levels requiring urgent medical attention.",
                recommendations: [
                    "Immediate medical evaluation",
                    "Possible blood transfusion in severe cases",
                    "Hospitalization may be required",
                    "Comprehensive workup for underlying conditions",
                    "Aggressive treatment of the underlying cause"
                ]
            }
        }
    },
    
    kidneyDisease: {
        name: "Chronic Kidney Disease",
        stages: {
            stage1: {
                name: "Stage 1 CKD",
                criteria: {
                    creatinine: { min: 0.8, max: 1.3 }, // Normal or slightly elevated
                    gfr: { min: 90, max: 999 }  // Normal or high GFR
                },
                description: "Kidney damage with normal kidney function.",
                recommendations: [
                    "Control blood pressure and diabetes",
                    "Healthy lifestyle with proper diet and exercise",
                    "Regular monitoring of kidney function",
                    "Avoid nephrotoxic medications",
                    "Annual screening for albuminuria"
                ]
            },
            stage2: {
                name: "Stage 2 CKD",
                criteria: {
                    creatinine: { min: 1.4, max: 1.9 },
                    gfr: { min: 60, max: 89 }
                },
                description: "Mild reduction in kidney function.",
                recommendations: [
                    "Strict control of blood pressure and diabetes",
                    "Low-sodium diet (2,300 mg/day or less)",
                    "Regular monitoring of kidney function every 6 months",
                    "Medication adjustment as needed",
                    "Consider referral to nephrologist"
                ]
            },
            stage3: {
                name: "Stage 3 CKD",
                criteria: {
                    creatinine: { min: 2.0, max: 3.9 },
                    gfr: { min: 30, max: 59 }
                },
                description: "Moderate reduction in kidney function.",
                recommendations: [
                    "Nephrology consultation",
                    "Dietary restrictions (protein, potassium, phosphorus)",
                    "Medications to manage complications",
                    "Regular monitoring every 3-6 months",
                    "Screening for bone disease and anemia"
                ]
            },
            stage4: {
                name: "Stage 4 CKD",
                criteria: {
                    creatinine: { min: 4.0, max: 7.9 },
                    gfr: { min: 15, max: 29 }
                },
                description: "Severe reduction in kidney function.",
                recommendations: [
                    "Preparation for renal replacement therapy",
                    "Strict dietary management",
                    "Treatment of complications (anemia, bone disease, acidosis)",
                    "Regular monitoring every 1-3 months",
                    "Discussion about treatment options (dialysis, transplant)"
                ]
            },
            stage5: {
                name: "Stage 5 CKD",
                criteria: {
                    creatinine: { min: 8.0, max: 99 },
                    gfr: { min: 0, max: 14 }
                },
                description: "Kidney failure requiring dialysis or transplantation.",
                recommendations: [
                    "Initiation of dialysis or preparation for kidney transplant",
                    "Very strict dietary and fluid restrictions",
                    "Comprehensive management of complications",
                    "Frequent monitoring with nephrologist",
                    "Supportive care and quality of life considerations"
                ]
            }
        }
    },
    
    liverDisease: {
        name: "Liver Disease",
        stages: {
            mild: {
                name: "Mild Liver Dysfunction",
                criteria: {
                    alt: { min: 41, max: 80 },
                    ast: { min: 41, max: 80 },
                    totalBilirubin: { min: 1.3, max: 2.0 }
                },
                description: "Early liver inflammation with minimal damage.",
                recommendations: [
                    "Avoid alcohol and hepatotoxic medications",
                    "Maintain a healthy weight through diet and exercise",
                    "Follow-up liver function tests in 1-3 months",
                    "Hepatitis screening if not done previously",
                    "Consider ultrasound of the liver"
                ]
            },
            moderate: {
                name: "Moderate Liver Dysfunction",
                criteria: {
                    alt: { min: 81, max: 200 },
                    ast: { min: 81, max: 200 },
                    totalBilirubin: { min: 2.1, max: 5.0 }
                },
                description: "Significant liver inflammation with potential fibrosis.",
                recommendations: [
                    "Gastroenterology or hepatology consultation",
                    "Comprehensive workup for underlying liver disease",
                    "Strict avoidance of alcohol and hepatotoxic substances",
                    "Liver-protective medications as prescribed",
                    "Monitoring for complications like portal hypertension"
                ]
            },
            severe: {
                name: "Severe Liver Dysfunction",
                criteria: {
                    alt: { min: 201, max: 9999 },
                    ast: { min: 201, max: 9999 },
                    totalBilirubin: { min: 5.1, max: 99 }
                },
                description: "Severe liver damage with possible cirrhosis or acute liver failure.",
                recommendations: [
                    "Immediate hepatology evaluation",
                    "Possible hospitalization for monitoring",
                    "Assessment for cirrhosis and its complications",
                    "Evaluation for liver transplant if appropriate",
                    "Management of complications (ascites, encephalopathy, bleeding)"
                ]
            }
        }
    },
    
    heartDisease: {
        name: "Cardiovascular Disease",
        stages: {
            riskFactors: {
                name: "At Risk for Heart Disease",
                criteria: {
                    cholesterol: { min: 200, max: 239 },
                    ldl: { min: 100, max: 159 },
                    hdl: { min: 0, max: 40, gender: "male" },
                    hdl: { min: 0, max: 50, gender: "female" },
                    triglycerides: { min: 150, max: 199 }
                },
                description: "Elevated risk factors for heart disease without established cardiovascular disease.",
                recommendations: [
                    "Lifestyle modifications (diet, exercise, smoking cessation)",
                    "Management of risk factors like hypertension and diabetes",
                    "Consider low-dose statin therapy based on overall risk",
                    "Aspirin therapy if recommended by your doctor",
                    "Regular cardiovascular risk assessment"
                ]
            },
            earlyDisease: {
                name: "Early Cardiovascular Disease",
                criteria: {
                    cholesterol: { min: 240, max: 299 },
                    ldl: { min: 160, max: 189 },
                    triglycerides: { min: 200, max: 499 }
                },
                description: "Early signs of cardiovascular disease or established coronary artery disease.",
                recommendations: [
                    "Statin therapy and other lipid-lowering medications",
                    "Heart-healthy diet (Mediterranean or DASH diet)",
                    "Regular aerobic exercise as tolerated",
                    "Stress management techniques",
                    "Regular follow-up with cardiologist"
                ]
            },
            establishedDisease: {
                name: "Established Cardiovascular Disease",
                criteria: {
                    cholesterol: { min: 300, max: 9999 },
                    ldl: { min: 190, max: 9999 },
                    triglycerides: { min: 500, max: 9999 }
                },
                description: "Significant cardiovascular disease with multiple risk factors or prior cardiovascular events.",
                recommendations: [
                    "Intensive medical therapy with statins and other medications",
                    "Cardiac rehabilitation program if appropriate",
                    "Strict control of all cardiovascular risk factors",
                    "Regular cardiac testing as recommended",
                    "Advanced therapies or procedures as indicated"
                ]
            }
        }
    }
};

// Calculate estimated GFR from creatinine (simplified formula)
function calculateEGFR(creatinine, age, gender, isBlack = false) {
    // Modified CKD-EPI formula (simplified version)
    let gfr;
    
    const genderFactor = gender.toLowerCase() === 'female' ? 0.7 : 0.9;
    const raceFactor = isBlack ? 1.2 : 1.0;
    
    // Simplified calculation 
    gfr = 141 * Math.min(creatinine/genderFactor, 1)**-0.329 * 
          Math.max(creatinine/genderFactor, 1)**-1.209 * 
          0.993**age * raceFactor;
    
    return gfr.toFixed(1);
}

// Determine disease stage based on blood parameters
function determineDiseaseStage(bloodData, patientInfo) {
    const { age, gender, race } = patientInfo;
    const results = {};
    
    // Calculate eGFR if creatinine is available
    if (bloodData.creatinine) {
        bloodData.gfr = calculateEGFR(bloodData.creatinine, age, gender, race === 'black');
    }
    
    // Check each disease and its stages
    for (const [diseaseKey, disease] of Object.entries(diseaseStages)) {
        // Check if we have enough parameters to evaluate this disease
        const requiredParams = getRequiredParametersForDisease(diseaseKey);
        const hasRequiredParams = requiredParams.some(param => bloodData[param] !== undefined);
        
        if (!hasRequiredParams) continue;
        
        let matchedStage = null;
        let highestSeverity = -1;
        
        // Check each stage for this disease
        for (const [stageKey, stage] of Object.entries(disease.stages)) {
            let stageMatch = true;
            let stageSeverity = Object.keys(disease.stages).indexOf(stageKey);
            
            // Check each criterion for this stage
            for (const [param, range] of Object.entries(stage.criteria)) {
                // Skip if we don't have this parameter
                if (bloodData[param] === undefined) {
                    stageMatch = false;
                    break;
                }
                
                // Check if parameter value is within range for this stage
                const value = bloodData[param];
                
                // If gender-specific criteria
                if (range.gender && gender && range.gender !== gender.toLowerCase()) {
                    continue; // Skip this criterion if gender doesn't match
                }
                
                // Check if value is in range
                if (value < range.min || value > range.max) {
                    stageMatch = false;
                    break;
                }
            }
            
            // If this stage matches and is more severe than previous matches
            if (stageMatch && stageSeverity > highestSeverity) {
                matchedStage = stageKey;
                highestSeverity = stageSeverity;
            }
        }
        
        // If we found a matching stage for this disease
        if (matchedStage) {
            results[diseaseKey] = {
                disease: disease.name,
                stage: disease.stages[matchedStage].name,
                description: disease.stages[matchedStage].description,
                recommendations: disease.stages[matchedStage].recommendations,
                severity: highestSeverity
            };
        }
    }
    
    return results;
}

// Get required parameters to evaluate a specific disease
function getRequiredParametersForDisease(diseaseKey) {
    switch (diseaseKey) {
        case 'diabetes':
            return ['glucose', 'hba1c'];
        case 'anemia':
            return ['hemoglobin', 'rbc', 'hematocrit'];
        case 'kidneyDisease':
            return ['creatinine', 'bun'];
        case 'liverDisease':
            return ['alt', 'ast', 'totalBilirubin'];
        case 'heartDisease':
            return ['cholesterol', 'ldl', 'hdl', 'triglycerides'];
        default:
            return [];
    }
} 