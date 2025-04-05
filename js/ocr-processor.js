// OCR Processor for Blood Report Analysis
// Uses Tesseract.js to extract text from uploaded blood report images

/**
 * Process an image file using OCR to extract blood report data
 * @param {File} file - The image or PDF file to process
 * @param {Function} progressCallback - Callback function for progress updates
 * @returns {Promise<Object>} Extracted blood parameters
 */
async function processReportWithOCR(file, progressCallback = () => {}) {
    try {
        // Only handle images for now (PDF would require PDF.js)
        if (!file.type.includes('image')) {
            console.log('Not an image file, skipping OCR:', file.type);
            return null;
        }
        
        progressCallback('Initializing OCR engine...');
        
        // Create a URL for the file
        const imageUrl = URL.createObjectURL(file);
        
        // Initialize Tesseract worker
        const worker = await Tesseract.createWorker({
            logger: message => {
                console.log('OCR Progress:', message);
                if (message.status === 'recognizing text') {
                    const progress = message.progress * 100;
                    progressCallback(`Extracting text from image: ${progress.toFixed(0)}%`);
                }
            }
        });
        
        // Load language data
        progressCallback('Loading OCR language data...');
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        
        // Configure recognition for better results with tables
        await worker.setParameters({
            tessedit_char_whitelist: '0123456789.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ<>/:;()%', 
            preserve_interword_spaces: '1',
        });
        
        // Process the image
        progressCallback('Processing image with OCR...');
        const result = await worker.recognize(imageUrl);
        
        // Clean up
        URL.revokeObjectURL(imageUrl);
        await worker.terminate();
        
        // Extract blood parameters
        progressCallback('Extracting blood parameters from text...');
        const extractedData = extractBloodParametersFromText(result.data.text);
        
        console.log('OCR Results:', result.data.text.substring(0, 200) + '...');
        console.log('Extracted parameters:', extractedData);
        
        return extractedData;
    } catch (error) {
        console.error('OCR processing error:', error);
        return null;
    }
}

/**
 * Extract blood parameters from OCR text using enhanced NLP and ML-inspired techniques
 * @param {string} text - The OCR text to process
 * @returns {Object} Extracted blood parameters with confidence scores
 */
function extractBloodParametersFromText(text) {
    const bloodData = {};
    const confidenceScores = {};
    const lines = text.split('\n');
    
    // Enhanced patterns to match blood parameters with more variations and units
    const patterns = {
        // Basic CBC parameters
        hemoglobin: /\b(h[ae]moglobin|hgb|hb)\s*[:=]?\s*(\d+\.?\d*)\s*(g\/d[lL]|g%)?/i,
        hematocrit: /\b(h[ae]matocrit|hct|ht)\s*[:=]?\s*(\d+\.?\d*)\s*(%)?/i,
        wbc: /\b(wbc|white\s*blood\s*cells?|leukocytes?)\s*[:=]?\s*(\d+\.?\d*)\s*(k\/μ[lL]|×10\^3\/μ[lL]|10\^9\/[lL])?/i,
        rbc: /\b(rbc|red\s*blood\s*cells?|erythrocytes?)\s*[:=]?\s*(\d+\.?\d*)\s*(m\/μ[lL]|×10\^6\/μ[lL]|10\^12\/[lL])?/i,
        platelets: /\b(platelets?|plt|thrombocytes?)\s*[:=]?\s*(\d+\.?\d*)\s*(k\/μ[lL]|×10\^3\/μ[lL]|10\^9\/[lL])?/i,
        
        // Blood sugar parameters
        glucose: /\b(glucose|blood\s*sugar|glu|fbs|bs)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        hba1c: /\b(hba1c|glycated\s*h[ae]moglobin|a1c)\s*[:=]?\s*(\d+\.?\d*)\s*(%|mmol\/mol)?/i,
        
        // Lipid profile
        cholesterol: /\b(total\s*cholesterol|cholesterol|tc)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        ldl: /\b(ldl|ldl[- ]c|low\s*density\s*lipoprotein)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        hdl: /\b(hdl|hdl[- ]c|high\s*density\s*lipoprotein)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        triglycerides: /\b(triglycerides?|tg)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        
        // Electrolytes
        sodium: /\b(sodium|na\+?)\s*[:=]?\s*(\d+\.?\d*)\s*(m[eE]q\/[lL]|mmol\/[lL])?/i,
        potassium: /\b(potassium|k\+?)\s*[:=]?\s*(\d+\.?\d*)\s*(m[eE]q\/[lL]|mmol\/[lL])?/i,
        chloride: /\b(chloride|cl-?)\s*[:=]?\s*(\d+\.?\d*)\s*(m[eE]q\/[lL]|mmol\/[lL])?/i,
        calcium: /\b(calcium|ca\+?)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        
        // Kidney function
        creatinine: /\b(creatinine|cre)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|μmol\/[lL])?/i,
        urea: /\b(urea|bun|blood\s*urea\s*nitrogen)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|mmol\/[lL])?/i,
        uricAcid: /\b(uric\s*acid|ua)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|μmol\/[lL])?/i,
        
        // Liver function
        albumin: /\b(albumin|alb)\s*[:=]?\s*(\d+\.?\d*)\s*(g\/d[lL])?/i,
        globulin: /\b(globulin|glob)\s*[:=]?\s*(\d+\.?\d*)\s*(g\/d[lL])?/i,
        totalProtein: /\b(total\s*protein|tp)\s*[:=]?\s*(\d+\.?\d*)\s*(g\/d[lL])?/i,
        bilirubin: /\b(total\s*bilirubin|bilirubin|tbil)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|μmol\/[lL])?/i,
        directBilirubin: /\b(direct\s*bilirubin|dbil|conjugated\s*bilirubin)\s*[:=]?\s*(\d+\.?\d*)\s*(mg\/d[lL]|μmol\/[lL])?/i,
        alt: /\b(alt|sgpt|alanine\s*(?:amino)?transferase)\s*[:=]?\s*(\d+\.?\d*)\s*(u\/[lL]|iu\/[lL])?/i,
        ast: /\b(ast|sgot|aspartate\s*(?:amino)?transferase)\s*[:=]?\s*(\d+\.?\d*)\s*(u\/[lL]|iu\/[lL])?/i,
        alp: /\b(alp|alkaline\s*phosphatase)\s*[:=]?\s*(\d+\.?\d*)\s*(u\/[lL]|iu\/[lL])?/i,
        ggt: /\b(ggt|gamma[- ]?gt|gamma\s*glutamyl\s*transferase)\s*[:=]?\s*(\d+\.?\d*)\s*(u\/[lL]|iu\/[lL])?/i,
        
        // Additional parameters
        mch: /\b(mch|mean\s*corpuscular\s*h[ae]moglobin)\s*[:=]?\s*(\d+\.?\d*)\s*(pg)?/i,
        mchc: /\b(mchc|mean\s*corpuscular\s*h[ae]moglobin\s*concentration)\s*[:=]?\s*(\d+\.?\d*)\s*(g\/d[lL]|%)?/i,
        mcv: /\b(mcv|mean\s*corpuscular\s*volume)\s*[:=]?\s*(\d+\.?\d*)\s*(f[lL])?/i,
        rdw: /\b(rdw|red\s*cell\s*distribution\s*width)\s*[:=]?\s*(\d+\.?\d*)\s*(%)?/i,
        mpv: /\b(mpv|mean\s*platelet\s*volume)\s*[:=]?\s*(\d+\.?\d*)\s*(f[lL])?/i
    };
    
    // First pass: Look for parameters line by line with pattern matching
    for (const line of lines) {
        for (const [param, pattern] of Object.entries(patterns)) {
            const match = line.match(pattern);
            if (match) {
                // Check whether the pattern has one or two capture groups
                const valueIndex = match.length >= 3 ? 2 : 1;
                const value = parseFloat(match[valueIndex]);
                
                if (!isNaN(value)) {
                    // Calculate confidence score based on presence of parameter name, value, and unit
                    let confidence = 0.7; // Base confidence
                    
                    // Bonus for having the full parameter name
                    if (match[1] && match[1].length > 2) confidence += 0.1;
                    
                    // Bonus for having units
                    if (match.length > 3 && match[3]) confidence += 0.1;
                    
                    // Bonus for contextual positioning (parameter name, then value)
                    if (line.indexOf(match[1]) < line.indexOf(match[valueIndex])) confidence += 0.1;
                    
                    // Cap at 1.0
                    confidence = Math.min(confidence, 1.0);
                    
                    // Store only if this is a new parameter or has higher confidence
                    if (!bloodData[param] || confidenceScores[param] < confidence) {
                        bloodData[param] = value;
                        confidenceScores[param] = confidence;
                    }
                }
            }
        }
    }
    
    // Second pass: Look for tabular format (parameter, value, unit, reference range)
    for (const line of lines) {
        if (line.match(/^\s*[\w\s\-]+\s+\d+\.?\d*\s+[\w\/%]+\s+[\d\.\-\s]+\s*$/i)) {
            const parts = line.trim().split(/\s+/);
            
            // Extract the parameter name and value
            const paramParts = [];
            let valueFound = false;
            let valueIndex = -1;
            
            for (let i = 0; i < parts.length; i++) {
                const part = parts[i];
                const isNumber = !isNaN(parseFloat(part));
                
                if (!valueFound && isNumber) {
                    valueFound = true;
                    valueIndex = i;
                    break;
                } else if (!valueFound) {
                    paramParts.push(part);
                }
            }
            
            if (valueFound && valueIndex > 0) {
                const paramName = paramParts.join(' ').toLowerCase();
                const value = parseFloat(parts[valueIndex]);
                
                // Map common abbreviated parameter names
                const paramMapping = {
                    'hgb': 'hemoglobin',
                    'hct': 'hematocrit',
                    'plt': 'platelets',
                    'glu': 'glucose',
                    'chol': 'cholesterol',
                    'tg': 'triglycerides',
                    'na': 'sodium',
                    'k': 'potassium',
                    'cl': 'chloride',
                    'ca': 'calcium',
                    'cre': 'creatinine',
                    'bun': 'urea',
                    'alb': 'albumin',
                    'tp': 'totalProtein',
                    'bil': 'bilirubin',
                    'tbil': 'bilirubin',
                    'dbil': 'directBilirubin',
                    'glb': 'globulin',
                    'glob': 'globulin',
                    'ua': 'uricAcid'
                };
                
                // Find the closest matching parameter
                let bestMatch = null;
                let bestScore = 0;
                
                // Direct mapping if available
                if (paramMapping[paramName]) {
                    bestMatch = paramMapping[paramName];
                    bestScore = 0.9;
                } else {
                    // Find if the parameter name contains known parameter names
                    for (const [key, mappedParam] of Object.entries(paramMapping)) {
                        if (paramName.includes(key)) {
                            const score = key.length / paramName.length;
                            if (score > bestScore) {
                                bestScore = score;
                                bestMatch = mappedParam;
                            }
                        }
                    }
                    
                    // Alternative check against parameter patterns
                    for (const [param, pattern] of Object.entries(patterns)) {
                        const nameOnly = pattern.toString().split('[:=]')[0].replace(/\\b|\(|\)/g, '');
                        const variants = nameOnly.split('|');
                        
                        for (const variant of variants) {
                            if (paramName.includes(variant.toLowerCase())) {
                                const score = variant.length / paramName.length;
                                if (score > bestScore) {
                                    bestScore = score;
                                    bestMatch = param;
                                }
                            }
                        }
                    }
                }
                
                // If we found a match and have a valid value
                if (bestMatch && !isNaN(value) && bestScore > 0.5) {
                    // Calculate confidence based on match quality and context
                    let confidence = 0.6 + (bestScore * 0.3);
                    
                    // Add bonus for having units and reference ranges
                    if (parts.length > valueIndex + 1) confidence += 0.1;
                    
                    // Store only if this is a new parameter or has higher confidence
                    if (!bloodData[bestMatch] || confidenceScores[bestMatch] < confidence) {
                        bloodData[bestMatch] = value;
                        confidenceScores[bestMatch] = confidence;
                    }
                }
            }
        }
    }
    
    // Look for "Result: X" patterns (common in COVID-era reports)
    const resultPattern = /(?:result|finding|value|level)\s*:?\s*(\d+\.?\d*)/i;
    for (const line of lines) {
        const match = line.match(resultPattern);
        if (match && match[1]) {
            // Look for parameter names in the same line
            for (const [param, pattern] of Object.entries(patterns)) {
                const namePattern = pattern.toString().split('[:=]')[0];
                const nameRegex = new RegExp(namePattern, 'i');
                
                if (nameRegex.test(line)) {
                    const value = parseFloat(match[1]);
                    if (!isNaN(value)) {
                        // Give a moderate confidence score
                        const confidence = 0.7;
                        if (!bloodData[param] || confidenceScores[param] < confidence) {
                            bloodData[param] = value;
                            confidenceScores[param] = confidence;
                        }
                    }
                }
            }
        }
    }
    
    // Third pass: Look for parameters that might be split across multiple lines
    const combinedText = text.replace(/\n/g, ' ');
    for (const [param, pattern] of Object.entries(patterns)) {
        // Only look for parameters we haven't found yet
        if (bloodData[param]) continue;
        
        const match = combinedText.match(pattern);
        if (match) {
            const valueIndex = match.length >= 3 ? 2 : 1;
            const value = parseFloat(match[valueIndex]);
            
            if (!isNaN(value)) {
                // Give a lower confidence score since it might be less reliable
                bloodData[param] = value;
                confidenceScores[param] = 0.6;
            }
        }
    }
    
    // Add confidence scores to the output
    for (const param in bloodData) {
        // Convert to enhanced format with value and confidence
        bloodData[param] = {
            value: bloodData[param],
            confidence: confidenceScores[param] || 0.5
        };
    }
    
    // Return the extracted data with confidence scores
    console.log("Extracted blood parameters with confidence:", bloodData);
    
    // Convert back to simple format for backward compatibility
    const simpleData = {};
    for (const param in bloodData) {
        simpleData[param] = bloodData[param].value;
    }
    
    return simpleData;
}

// Make functions available globally
window.processReportWithOCR = processReportWithOCR;
window.extractBloodParametersFromText = extractBloodParametersFromText; 