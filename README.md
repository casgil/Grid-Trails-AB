# Grid Trails Task

A modern, standalone implementation of the Grid Trails cognitive task (Trail Making Test variant). This tool measures visual search speed, scanning, speed of processing, and mental flexibility (executive functioning).

## Overview

The generic "Trail Making Test" consists of two parts:
- **Part A**: Connect numbers in ascending order (1 ➔ 2 ➔ 3...). Measures processing speed.
- **Part B**: Connect numbers and letters in alternating ascending order (1 ➔ A ➔ 2 ➔ B...). Measures mental flexibility and set-shifting.

This repository contains a modernize web-based version of this task (`grid_trails_modern.html`) built with pure HTML, CSS, and JavaScript.

## Features

- **Standalone**: Single HTML file with no external dependencies (no internet or local server required).
- **Responsive Design**: Modern, scientific UI that works on various screen sizes.
- **Instruction Demos**:
  - Includes **animated full-grid demonstrations** in the instructions.
  - Animations show a cursor moving 1➔2➔3 (Part A) and 1➔A➔2➔B (Part B).
  - Cells light up and reset automatically to demonstrate the rules clearly.
- **Fair Timing**:
  - The timer initializes at `0.0s`.
  - It **only starts running** when the participant makes their first interaction (click).
  - This prevents reaction time to the page load from confusing the data.
- **User Navigation**:
  - **Back Button**: Review previous instructions.
  - **Skip Instructions**: Quickly jump to the game for repeat testing.
- **Automated Data**:
  - Results are automatically downloaded as a `.csv` file upon completion.
  - Filenames include Participant ID and Timestamp: `grid_trails_P001_2023-12-13_14-30.csv`.

## Usage

1. **Open the File**: Simply double-click `grid_trails_modern.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
2. **Enter ID**: Input a Participant ID on the welcome screen.
3. **Follow Instructions**: Read the guide and watch the animated demo.
4. **Play**: Click the cells in the correct order as fast as possible.
5. **Download**: The data file will download automatically after Part B is completed.

## Data Format

The output CSV contains the following columns:

| Column | Description |
|--------|-------------|
| **ParticipantID** | The ID entered at the start of the session. |
| **Part** | The task section (`A` or `B`). |
| **Time** | Total time taken to complete the grid (seconds). |
| **Errors** | Total number of incorrect clicks. |
| **Date** | ISO 8601 timestamp of the session. |

## legacy Version

The folder also contains a `legacy` version (`grid_trail_AB_v8.html`) which relies on the jsPsych library. The new `grid_trails_modern.html` is the recommended version for simplicity and ease of use.
