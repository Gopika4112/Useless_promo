const analysisSteps = [
  { text: "Initializing quantum temporal matrix...", progress: 10 },
  { text: "Scanning 14,056,205 possible timeline trajectories...", progress: 25 },
  { text: "Calibrating chronometer arrays...", progress: 40 },
  { text: "Calculating probability matrices...", progress: 85 },
  { text: "Finalizing temporal projection algorithms...", progress: 95 },
  { text: "Analysis complete. Generating prediction...", progress: 100 }
];

let isAnalyzing = false;
let currentStep = 0;

function updateProgress(percentage) {
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = percentage + '%';
}

function typeMessage(text, callback, speed = 30) {
  const consoleElement = document.getElementById('console');
  let currentText = consoleElement.textContent.replace('█', '');
  let charIndex = 0;
  
  function typeChar() {
    if (charIndex < text.length) {
      currentText += text.charAt(charIndex);
      consoleElement.innerHTML = currentText + '<span class="cursor">█</span>';
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      consoleElement.innerHTML = currentText;
      if (callback) setTimeout(callback, 500);
    }
  }
  typeChar();
}

function startAnalysis() {
  const dateValue = document.getElementById('dateInput').value;
  const consoleElement = document.getElementById('console');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const consoleStatus = document.getElementById('consoleStatus');
  const progressBar = document.getElementById('progressBar');
  
  if (!dateValue) {
    consoleElement.innerHTML = '❌ ERROR: No target date specified. Please input a valid date.<span class="cursor">█</span>';
    return;
  }

  if (isAnalyzing) return;
  
  isAnalyzing = true;
  currentStep = 0;
  
 
  analyzeBtn.classList.add('processing');
  analyzeBtn.textContent = 'PROCESSING...';
  consoleStatus.textContent = 'ANALYZING';
  progressBar.style.display = 'block';
  updateProgress(0);
  
  // Clear console and start
  consoleElement.innerHTML = '';
  
  const inputDate = new Date(dateValue);
  inputDate.setDate(inputDate.getDate() + 1);
  const predictedDate = inputDate.toDateString();
  
  typeMessage(`🔄 TEMPORAL ANALYSIS INITIATED FOR: ${dateValue}\n\n`, () => {
    processNextStep(predictedDate);
  });
}

function processNextStep(predictedDate) {
  if (currentStep < analysisSteps.length) {
    const step = analysisSteps[currentStep];
    const consoleElement = document.getElementById('console');
    
    updateProgress(step.progress);
    
    typeMessage(`[${String(currentStep + 1).padStart(2, '0')}/06] ${step.text}\n`, () => {
      currentStep++;
      setTimeout(() => processNextStep(predictedDate), 800);
    }, 25);
  } else {
    showFinalResult(predictedDate);
  }
}

function showFinalResult(predictedDate) {
  const consoleElement = document.getElementById('console');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const consoleStatus = document.getElementById('consoleStatus');
  
  setTimeout(() => {
    typeMessage(`\n${'='.repeat(50)}\n`, () => {
      typeMessage(`🎯 TEMPORAL PREDICTION COMPLETE\n\n`, () => {
        typeMessage(`📅 PREDICTED NEXT DATE: ${predictedDate}\n`, () => {
          typeMessage(`🔬 CONFIDENCE LEVEL: 99.97%\n`, () => {
            typeMessage(`⚡ QUANTUM ACCURACY: ABSOLUTE\n`, () => {
              typeMessage(`${'='.repeat(50)}\n\n`, () => {
                typeMessage(`✅ Analysis completed successfully. System ready for next operation.`, () => {
                  // Reset UI
                  analyzeBtn.classList.remove('processing');
                  analyzeBtn.textContent = 'INITIATE ANALYSIS';
                  consoleStatus.textContent = 'STANDBY';
                  document.getElementById('progressBar').style.display = 'none';
                  isAnalyzing = false;
                });
              });
            });
          });
        });
      });
    });
  }, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
  // random flicker effect 
  setInterval(() => {
    const header = document.querySelector('.header h1');
    if (Math.random() < 0.05) {
      header.style.textShadow = '0 0 30px #00ffff';
      setTimeout(() => {
        header.style.textShadow = '0 0 20px #00ff00';
      }, 100);
    }
  }, 2000);
});
