// Helper function to pre-fill patient data when a sample is loaded
function fillSamplePatientData() {
    // Check if this is a sample file from the filename
    const fileInput = document.getElementById('fileInput');
    if (fileInput && fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name.toLowerCase();
        if (fileName.includes('sample') || fileName.includes('test')) {
            // Pre-fill sample patient data
            const patientName = document.getElementById('patientName');
            const patientAge = document.getElementById('patientAge');
            const patientGender = document.getElementById('patientGender');
            const patientRace = document.getElementById('patientRace');
            const patientWeight = document.getElementById('patientWeight');
            const patientHeight = document.getElementById('patientHeight');
            
            // Only fill if fields are empty
            if (patientName && !patientName.value) patientName.value = 'John Doe';
            if (patientAge && !patientAge.value) patientAge.value = '45';
            if (patientGender && !patientGender.value) patientGender.value = 'male';
            if (patientRace && !patientRace.value) patientRace.value = 'white';
            if (patientWeight && !patientWeight.value) patientWeight.value = '82';
            if (patientHeight && !patientHeight.value) patientHeight.value = '178';
            
            // Show a message to the user
            showAlert('info', 'Sample Data Loaded', 
                    'Sample patient data has been pre-filled. You can modify it before analysis.');
        }
    }
}

// Add event listener to the file input
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', fillSamplePatientData);
    }
    
    // Also attach to the handleFiles function
    const originalHandleFiles = window.handleFiles;
    if (typeof originalHandleFiles === 'function') {
        window.handleFiles = function(files) {
            // Call the original function
            originalHandleFiles(files);
            // Then fill sample data
            setTimeout(fillSamplePatientData, 500);
        };
    }
}); 