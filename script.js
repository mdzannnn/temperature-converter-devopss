/**
 * DEVOPS TEMPERATURE CONVERTER - CORE LOGIC
 * Handles calculations, validation, and pipeline simulation.
 */

const ABSOLUTE_ZERO_C = -273.15;

const celsiusInput = document.getElementById('celsiusInput');
const fahrenheitVal = document.getElementById('fahrenheitVal');
const kelvinVal = document.getElementById('kelvinVal');
const errorBox = document.getElementById('validation-error');
const errorMsg = document.getElementById('error-message');
const freezingIndicator = document.getElementById('freezingIndicator');

// --- APP FUNCTIONALITY ---

function updateConversions() {
    const val = celsiusInput.value;
    
    // 1. Reset if empty
    if (val === "") {
        resetUI();
        return;
    }

    const celsius = parseFloat(val);

    // 2. Validation Check (Defensive Programming)
    if (isNaN(celsius)) {
        showError("Validation Error: Input must be a number.");
        return;
    }

    if (celsius < ABSOLUTE_ZERO_C) {
        showError("Physics Error: Below Absolute Zero (-273.15°C) is impossible.");
        return;
    }

    // 3. Calculation
    hideError();
    const fahrenheit = (celsius * 9/5) + 32;
    const kelvin = celsius + 273.15;

    // 4. Update UI
    fahrenheitVal.innerText = fahrenheit.toFixed(2) + "°F";
    kelvinVal.innerText = kelvin.toFixed(2) + "K";

    // 5. Freezing Point Logic
    if (celsius <= 0) {
        freezingIndicator.classList.remove('hidden');
    } else {
        freezingIndicator.classList.add('hidden');
    }
}

function showError(msg) {
    errorMsg.innerText = msg;
    errorBox.classList.remove('hidden');
    fahrenheitVal.innerText = "ERR";
    kelvinVal.innerText = "ERR";
    freezingIndicator.classList.add('hidden');
}

function hideError() {
    errorBox.classList.add('hidden');
}

function resetUI() {
    fahrenheitVal.innerText = "32.00°F";
    kelvinVal.innerText = "273.15K";
    freezingIndicator.classList.remove('hidden');
    hideError();
}

// Event listener for input
celsiusInput.addEventListener('input', updateConversions);


// --- PIPELINE SIMULATION ---

const terminal = document.getElementById('terminal');
const pipelineBtn = document.getElementById('pipelineBtn');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const statusDot = document.getElementById('status-dot');
const statusText = document.getElementById('status-text');

function addTerminalLog(message, type = "info") {
    const log = document.createElement('div');
    const time = new Date().toLocaleTimeString();
    
    let colorClass = "text-slate-400";
    if (type === "cmd") colorClass = "text-blue-400 font-bold";
    if (type === "success") colorClass = "text-green-400";

    log.className = `${colorClass} mb-1 opacity-0 transition-opacity duration-300`;
    log.innerHTML = `<span style="color: #475569">[${time}]</span> ${message}`;
    
    terminal.appendChild(log);
    terminal.scrollTop = terminal.scrollHeight;
    
    // Trigger fade in
    setTimeout(() => log.classList.remove('opacity-0'), 10);
}

function startPipeline() {
    // Reset Terminal and UI
    terminal.innerHTML = "";
    pipelineBtn.disabled = true;
    pipelineBtn.style.opacity = "0.5";
    
    statusDot.style.background = "#f59e0b"; // Amber
    statusDot.classList.add('pulse-dot');
    statusText.innerText = "RUNNING CI";
    statusText.style.color = "#f59e0b";

    const pipelineSteps = [
        { msg: "Loading environment from .github/workflows/main.yml...", p: 10, d: 500 },
        { msg: "Running: docker build -t temp-converter-prod .", type: "cmd", p: 25, d: 1200 },
        { msg: "Python 3.11 environment initialized successfully.", p: 40, d: 2000 },
        { msg: "Installing dependencies: pytest...", p: 55, d: 2800 },
        { msg: "Running Unit Tests: tests/test_app.py", p: 70, d: 3500 },
        { msg: "✔ Test [Happy Path: 0C to 32F] PASSED", type: "success", p: 80, d: 4200 },
        { msg: "✔ Test [Safety: Absolute Zero Check] PASSED", type: "success", p: 90, d: 4800 },
        { msg: "Deployment Complete. Status: Build Success.", type: "success", p: 100, d: 5500 }
    ];

    pipelineSteps.forEach((step) => {
        setTimeout(() => {
            addTerminalLog(step.msg, step.type || "info");
            progressBar.style.width = step.p + "%";
            progressText.innerText = step.p + "%";

            if (step.p === 100) {
                statusDot.style.background = "#10b981"; // Green
                statusDot.classList.remove('pulse-dot');
                statusText.innerText = "SUCCESS";
                statusText.style.color = "#10b981";
                pipelineBtn.disabled = false;
                pipelineBtn.style.opacity = "1";
            }
        }, step.d);
    });
}

pipelineBtn.addEventListener('click', startPipeline);

// Initialize UI
updateConversions();