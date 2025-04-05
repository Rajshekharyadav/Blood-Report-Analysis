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
 * Extract blood parameters from OCR text using natural language processing
 * @param {string} text - The OCR text to process
 * @returns {Object} Extracted blood parameters
 */
function extractBloodParametersFromText(text) {
    const bloodData = {};
    const lines = text.split('\n');
    
    // Define patterns to match blood parameters
    const patterns = {
        hemoglobin: /h[ae]moglobin\s*:?\s*(\d+\.?\d*)/i,
        hematocrit: /h[ae]matocrit\s*:?\s*(\d+\.?\d*)/i,
        wbc: /\b(wbc|white\s*blood\s*cells?)\s*:?\s*(\d+\.?\d*)/i,
        rbc: /\b(rbc|red\s*blood\s*cells?)\s*:?\s*(\d+\.?\d*)/i,
        platelets: /platelets\s*:?\s*(\d+\.?\d*)/i,
        glucose: /\b(glucose|blood\s*sugar)\s*:?\s*(\d+\.?\d*)/i,
        cholesterol: /\b(total\s*cholesterol|cholesterol)\s*:?\s*(\d+\.?\d*)/i,
        ldl: /\b(ldl|low\s*density\s*lipoprotein)\s*:?\s*(\d+\.?\d*)/i,
        hdl: /\b(hdl|high\s*density\s*lipoprotein)\s*:?\s*(\d+\.?\d*)/i,
        triglycerides: /triglycerides\s*:?\s*(\d+\.?\d*)/i,
        sodium: /sodium\s*:?\s*(\d+\.?\d*)/i,
        potassium: /potassium\s*:?\s*(\d+\.?\d*)/i,
        creatinine: /creatinine\s*:?\s*(\d+\.?\d*)/i,
        urea: /\b(urea|bun)\s*:?\s*(\d+\.?\d*)/i,
        albumin: /albumin\s*:?\s*(\d+\.?\d*)/i,
        bilirubin: /\b(total\s*bilirubin|bilirubin)\s*:?\s*(\d+\.?\d*)/i,
        alt: /\b(alt|alanine\s*transaminase|sgpt)\s*:?\s*(\d+\.?\d*)/i,
        ast: /\b(ast|aspartate\s*transaminase|sgot)\s*:?\s*(\d+\.?\d*)/i
    };
    
    // Advanced parameter extraction that looks at lines with parameter names and values
    for (const line of lines) {
        for (const [param, pattern] of Object.entries(patterns)) {
            const match = line.match(pattern);
            if (match) {
                // Check whether the pattern has one or two capture groups
                const valueIndex = match.length === 2 ? 1 : 2;
                const value = parseFloat(match[valueIndex]);
                if (!isNaN(value)) {
                    bloodData[param] = value;
                }
            }
        }
        
        // Also look for tabular format (parameter, value, unit, reference range)
        if (line.match(/^\s*\w+\s+\d+\.?\d*\s+[a-z/%]+\s+[\d\.\-]+\s*$/i)) {
            const parts = line.trim().split(/\s+/);
            const paramName = parts[0].toLowerCase();
            const value = parseFloat(parts[1]);
            
            // Map common parameter names
            const paramMapping = {
                'hgb': 'hemoglobin',
                'hct': 'hematocrit',
                'plt': 'platelets',
                'glu': 'glucose',
                'chol': 'cholesterol',
                'tg': 'triglycerides',
                'na': 'sodium',
                'k': 'potassium',
                'cre': 'creatinine',
                'alb': 'albumin',
                'bil': 'bilirubin'
            };
            
            const mappedParam = paramMapping[paramName] || paramName;
            
            // If we can recognize a parameter and have a valid value
            if (!isNaN(value)) {
                // Check if this parameter is one we're tracking
                if (Object.keys(patterns).includes(mappedParam)) {
                    bloodData[mappedParam] = value;
                }
            }
        }
    }
    
    return bloodData;
}

// Make functions available globally
window.processReportWithOCR = processReportWithOCR;
window.extractBloodParametersFromText = extractBloodParametersFromText; 