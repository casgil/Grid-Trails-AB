# Grid Trails Task

A modernized, web-based implementation of the Grid Trails cognitive task (Trail Making Test variant). This tool measures visual search speed, scanning processing speed, and mental flexibility (executive functioning).

## 🚀 Quick Start
**[Click here to try the task on GitHub Pages](https://casgil.github.io/Grid-Trails-AB/)**

## 📂 Project Files

This repository offers multiple versions of the task to suit different deployment needs:

| File | Purpose |
|------|---------|
| **`index.html`** | The main version for **deployment** (GitHub Pages). Based on jsPsych v8. Supports Qualtrics embedding via iframe. |
| **`grid_trail_AB_v8_portable.html`** | **Mobile / Quick Share**. Single-file version with CDN links. Best for emailing to participants or testing on phones. |
| **`grid_trails_modern.html`** | **Standalone**. Pure HTML/CSS/JS version with no external dependencies (no jsPsych). Great for local offline use. |
| **`qualtrics_integration.js`** | JavaScript snippet for embedding the task inside a **Qualtrics** survey. |
| **`json_to_csv.py`** | Helper script to convert JSON output files to CSV. |

## 🧩 Qualtrics Integration

You can embed this task directly into a Qualtrics survey. The data will be saved to your Qualtrics response data, and the CSV download will be **automatically suppressed**.

### Setup Instructions
1.  **Create Embedded Data**: In your Survey Flow, add the following fields **before** the task block:
    *   `ParticipantID` (Optional: pass a specific ID)
    *   `GridTrails_TimeA`
    *   `GridTrails_ErrorsA`
    *   `GridTrails_ClickHistoryA`
    *   `GridTrails_CorrectPathA`
    *   `GridTrails_TimeB`
    *   `GridTrails_ErrorsB`
    *   `GridTrails_ClickHistoryB`
    *   `GridTrails_CorrectPathB`
2.  **Add Question**: Create a **Text/Graphic** question in your survey.
3.  **Add JavaScript**: Click the generic gear icon or "JavaScript" option for the question.
4.  **Paste Code**: Copy the entire content of [`qualtrics_integration.js`](qualtrics_integration.js) and paste it into the box.
5.  **Publish**: Defines the task URL to your GitHub Pages deployment.

**Note**: The task waits **5 seconds** after showing the results screen before automatically advancing to the next Qualtrics question.

## 📊 Data & Logging

The task generates detailed event logs. When running standalone, this downloads as a CSV. When in Qualtrics, it saves to Embedded Data.

### Output Fields

| Field | Description |
|-------|-------------|
| **PARTICIPANT** | Auto-generated ID (or passed via URL `?participant_id=`). |
| **Time (A/B)** | Total reaction time in seconds (e.g., `12.45`). |
| **Errors (A/B)** | Total number of incorrect clicks. |
| **click_history** | **JSON String**. A complete log of every tap/click. Example:<br>`[{"timestamp":1200,"value":"1","correct":true,"row":1,"col":2}, ...]` |
| **correct_path** | **JSON String**. List of optimal coordinates for the task.<br>`[{"row":1,"col":2}, {"row":3,"col":4}, ...]` |

## 📱 Mobile & Responsive Support

- **Landscape Mode**: specialized layout optimization for short screens (height < 600px).
- **Touch Optimization**: `touch-action: manipulation` enabled to remove tap delays on iOS/Android.
- **Portable**: The `_portable.html` file uses CDN links so it can be viewed on mobile without needing a local web server (loading local resources usually fails on mobile file systems).

## ✨ Features

- **Implicit Welcome**: Starts directly with instructions; Participant ID is auto-generated.
- **Animation**: Full-grid animated demonstrations in instructions.
- **Fair Timing**: Timer starts `0.0s` and only ticks **after the first click**, removing page-load latency bias.
- **Skip Button**: Prominent "Skip Instructions" button for speed testing.
- **Visual Feedback**: Card-based interface with clear hover states and "shake" animations on error.
