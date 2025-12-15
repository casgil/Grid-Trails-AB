var jsPsychTrails = (function (jspsych) {
  'use strict';

  const info = {
    name: "trails",
    version: "1.0.0",
    parameters: {
      grid_size: {
        type: jspsych.ParameterType.INT,
        default: 4,
        description: "Dimension of the grid (e.g., 4 for 4x4)"
      },
      trails_type: {
        type: jspsych.ParameterType.STRING,
        default: "A", // "A" (Numbers) or "B" (Numbers/Letters)
        description: "Type of trails task"
      },
      correct_order: {
        type: jspsych.ParameterType.COMPLEX,
        default: [],
        description: "Array of correct values in order"
      },
      random_order: {
        type: jspsych.ParameterType.COMPLEX,
        default: [],
        description: "Array of values defining the grid layout"
      }
    }
  };

  class TrailsPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }

    trial(display_element, trial) {
      // Styles are already loaded in main HTML (grid_trails_modern.html styles)
      // We will reuse those classes: .card, .status-bar, #game-board, .cell, .cell.correct, .cell.error-shake

      // State
      let currentIndex = 0;
      let errors = 0;
      let startTime = null;
      let timerInterval = null;

      // Render
      // We wrap everything in a .card to match the modern look
      let html = `
        <div class="card">
            <div class="status-bar" style="margin: 0 auto 1rem auto;">
                <span id="game-part">Part ${trial.trails_type}</span>
                <span>Time: <span id="timer">0.0</span>s</span>
            </div>
            <div id="game-board" style="margin: 0 auto 2rem auto;">
                ${trial.random_order.map((val, index) =>
        `<div class="cell" data-value="${val}" data-index="${index}">${val}</div>`
      ).join('')}
            </div>
            <div id="feedback-msg" style="height: 1.5rem; color: var(--error-color); font-weight: 600; opacity: 0; transition: opacity 0.2s;">Incorrect!</div>
        </div>
      `;

      display_element.innerHTML = html;

      const cells = display_element.querySelectorAll('.cell');
      const feedbackEl = display_element.querySelector('#feedback-msg');
      const timerEl = display_element.querySelector('#timer');

      // Data Logging State
      const click_events = []; // Stores manual clicks: {time, value, correct, row, col}

      // Helper: Get Grid Coordinates (1-based: Row 1-4, Col 1-4)
      const getCoords = (index) => {
        const row = Math.floor(index / trial.grid_size) + 1;
        const col = (index % trial.grid_size) + 1;
        return { row, col };
      };

      // Timer Logic
      const updateTimer = () => {
        if (!startTime) return;
        const delta = (performance.now() - startTime) / 1000;
        timerEl.textContent = delta.toFixed(1);
      };

      // Interaction
      const handleCellClick = (e) => {
        const cell = e.target;
        if (cell.classList.contains('correct')) return;

        // Start timer on first interaction
        if (startTime === null) {
          startTime = performance.now();
          timerInterval = setInterval(updateTimer, 100);
        }

        const currentTime = performance.now();
        const timeFromStart = currentTime - startTime;

        const value = cell.dataset.value;
        const index = parseInt(cell.dataset.index, 10);
        const coords = getCoords(index);
        const target = String(trial.correct_order[currentIndex]);

        const isCorrect = String(value) === target;

        // Log Event
        click_events.push({
          timestamp: Math.round(timeFromStart),
          value: value,
          correct: isCorrect,
          row: coords.row,
          col: coords.col
        });

        if (isCorrect) {
          // Correct
          cell.classList.add('correct');
          cell.classList.remove('error-shake'); // Clear any error state
          feedbackEl.classList.remove('show');
          feedbackEl.style.opacity = '0';
          currentIndex++;

          // Check completion
          if (currentIndex >= trial.correct_order.length) {
            endTrial();
          }
        } else {
          // Incorrect
          errors++;
          cell.classList.add('error-shake');

          // Feedback
          let hint = "";
          if (currentIndex === 0) {
            hint = `Start with "${target}"`;
          } else {
            const prev = trial.correct_order[currentIndex - 1];
            hint = `After ${prev}, find "${target}"`;
          }
          feedbackEl.textContent = `Incorrect! ${hint}`;
          feedbackEl.style.opacity = '1';

          setTimeout(() => {
            cell.classList.remove('error-shake');
          }, 500);
        }
      };

      // Attach listeners
      cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
      });

      const endTrial = () => {
        if (timerInterval) clearInterval(timerInterval);
        const endTime = performance.now();
        const rt = endTime - startTime;

        // Calculate functionality coordinates for the Correct Path (the order they SHOULD have clicked)
        const correct_path_coords = trial.correct_order.map(val => {
          const idx = trial.random_order.indexOf(val);
          return getCoords(idx);
        });

        const trial_data = {
          rt: rt,
          errors: errors,
          trails_type: trial.trails_type,
          grid_size: trial.grid_size,
          // Store lists as JSON strings for CSV compatibility per request
          click_history: JSON.stringify(click_events),
          correct_path: JSON.stringify(correct_path_coords)
        };

        // Clear display
        display_element.innerHTML = '';

        // Finish
        this.jsPsych.finishTrial(trial_data);
      };
    }
  }

  TrailsPlugin.info = info;

  return TrailsPlugin;

})(jsPsychModule);
