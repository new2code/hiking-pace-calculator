// JavaScript code for the hiking pace calculator app

console.log('App.js loaded'); // Verify script loads

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded'); // Verify DOM content loaded files

    const calculateButton = document.getElementById('calculateButton');
    const addPhaseButton = document.getElementById('addPhaseButton');
    const phasesList = document.getElementById('phasesList');
    const resultDisplay = document.getElementById('result');
    const dailyMileageList = document.getElementById('dailyMileageList');

    let phases = [];

    addPhaseButton.addEventListener('click', function() {
        const phaseDiv = document.createElement('div');
        phaseDiv.className = 'phase-input';
        const phaseNumber = phases.length + 1;

        phaseDiv.innerHTML = `
            <h4>Phase ${phaseNumber}</h4>
            <label>Number of Days:
                <input type="number" class="phase-days" min="1" required>
            </label>
            <label>Target Daily Mileage:
                <input type="number" class="phase-mileage" min="1" required>
            </label>
            <button type="button" class="remove-phase">Remove</button>
        `;

        phasesList.appendChild(phaseDiv);
        phases.push({ days: 0, targetMileage: 0 });

        phaseDiv.querySelector('.remove-phase').addEventListener('click', function() {
            phaseDiv.remove();
            phases = updatePhases();
        });
    });

    function updatePhases() {
        const phaseInputs = document.querySelectorAll('.phase-input');
        return Array.from(phaseInputs).map(phase => ({
            days: parseInt(phase.querySelector('.phase-days').value) || 0,
            targetMileage: parseFloat(phase.querySelector('.phase-mileage').value) || 0
        }));
    }

    calculateButton.addEventListener('click', function() {
        phases = updatePhases();
        const totalDistance = parseFloat(document.getElementById('totalDistance').value);
        const totalTime = parseFloat(document.getElementById('totalTime').value);
        const zeroMileDays = parseFloat(document.getElementById('zeroMileDays').value);

        if (!validateInputs(totalDistance, totalTime, zeroMileDays, phases)) {
            resultDisplay.textContent = 'Please enter valid numbers and phase information.';
            return;
        }

        const dailyMiles = calculatePhasedMileage(totalDistance, totalTime, zeroMileDays, phases);
        displayResults(dailyMiles, totalDistance, totalTime - zeroMileDays);
    });

    function validateInputs(distance, time, zeroDays, phases) {
        if (isNaN(distance) || isNaN(time) || isNaN(zeroDays) || time <= 0) return false;

        const totalPhaseDays = phases.reduce((sum, phase) => sum + phase.days, 0);
        const effectiveDays = time - zeroDays;

        return totalPhaseDays <= effectiveDays;
    }

    function calculatePhasedMileage(totalDistance, totalTime, zeroMileDays, phases) {
        const effectiveDays = totalTime - zeroMileDays;
        const dailyMiles = [];
        let remainingDistance = totalDistance;
        let remainingDays = effectiveDays;

        // Handle phase-specific mileage
        phases.forEach(phase => {
            const phaseDays = Math.min(phase.days, remainingDays);
            const phaseDistance = phase.targetMileage * phaseDays;

            for (let i = 0; i < phaseDays; i++) {
                dailyMiles.push(phase.targetMileage);
            }

            remainingDistance -= phaseDistance;
            remainingDays -= phaseDays;
        });

        // Distribute remaining distance over remaining days
        if (remainingDays > 0 && remainingDistance > 0) {
            const avgRemainingMileage = remainingDistance / remainingDays;
            for (let i = 0; i < remainingDays; i++) {
                dailyMiles.push(avgRemainingMileage);
            }
        }

        return dailyMiles;
    }

    function displayResults(dailyMiles, totalDistance, effectiveDays) {
        const actualTotal = dailyMiles.reduce((sum, miles) => sum + miles, 0);
        resultDisplay.textContent = `Average mileage per day: ${(actualTotal / effectiveDays).toFixed(2)} miles`;

        dailyMileageList.innerHTML = '';
        let currentPhase = 0;
        let daysInCurrentPhase = 0;

        dailyMiles.forEach((miles, index) => {
            const listItem = document.createElement('li');

            // Track which phase we're in
            if (phases[currentPhase] && daysInCurrentPhase >= phases[currentPhase].days) {
                currentPhase++;
                daysInCurrentPhase = 0;
            }

            listItem.setAttribute('data-phase', currentPhase);
            listItem.textContent = `Day ${index + 1}: ${miles.toFixed(2)} miles`;
            dailyMileageList.appendChild(listItem);
            daysInCurrentPhase++;
        });
    }
});
