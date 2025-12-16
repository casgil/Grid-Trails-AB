/*
 * Qualtrics Integration for Grid Trails Task
 * 
 * INSTRUCTIONS:
 * 1. Create a "Text / Graphic" question in your Qualtrics survey.
 * 2. Click the "JavaScript" option for that question.
 * 3. Delete existing code and paste this entire script.
 * 4. Ensure you have an Embedded Data field named "ParticipantID" set in your survey flow 
 *    before this block if you want to pass an ID (e.g., from a roster or random generator).
 *    If not, the task will auto-generate one.
 * 5. Create Embedded Data fields to store the results:
 *    - GridTrails_TimeA
 *    - GridTrails_ErrorsA
 *    - GridTrails_ClickHistoryA
 *    - GridTrails_CorrectPathA
 *    - GridTrails_TimeB
 *    - GridTrails_ErrorsB
 *    - GridTrails_ClickHistoryB
 *    - GridTrails_CorrectPathB
 */

Qualtrics.SurveyEngine.addOnload(function () {
    // 1. Hide the Next button so they must finish the task first
    this.hideNextButton();

    // 2. Get Participant ID (if set in Embedded Data)
    var participantID = Qualtrics.SurveyEngine.getEmbeddedData('ParticipantID');
    if (!participantID) {
        participantID = "Qualtrics_" + Math.floor(Math.random() * 1000000);
    }

    // 3. Define the Task URL (GitHub Pages)
    // We add the participant_id as a query parameter
    var taskUrl = "https://casgil.github.io/Grid-Trails-AB/?participant_id=" + encodeURIComponent(participantID);

    // 4. Create and Embed Iframe
    var iframe = document.createElement('iframe');
    iframe.src = taskUrl;
    iframe.style.width = "100%";
    iframe.style.minHeight = "800px"; // Ensure enough height for the task
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";

    // Append to the question container
    var questionContainer = this.getQuestionContainer();
    questionContainer.appendChild(iframe);

    // 5. Listen for 'Task Complete' message from the iframe
    var qThis = this; // Reference to Qualtrics object

    window.addEventListener('message', function (event) {
        // Security check: Ensure message comes from your GitHub pages
        // if (event.origin !== "https://casgil.github.io") return; 
        // Note: 'gitHub.io' origin might vary slightly, keeping it open for now or strictly matching:
        if (event.origin.indexOf("casgil.github.io") === -1) return;

        var data = event.data;

        if (data.type === 'grid_trails_complete') {
            // Task is done!
            console.log("Grid Trails finished:", data);

            // Save Data to Qualtrics Embedded Data fields
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_TimeA', data.results.time_a);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_ErrorsA', data.results.errors_a);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_ClickHistoryA', data.results.click_history_a);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_CorrectPathA', data.results.correct_path_a);

            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_TimeB', data.results.time_b);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_ErrorsB', data.results.errors_b);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_ClickHistoryB', data.results.click_history_b);
            Qualtrics.SurveyEngine.setEmbeddedData('GridTrails_CorrectPathB', data.results.correct_path_b);

            // Wait 5 seconds, THEN Show and Click Next
            setTimeout(function () {
                qThis.showNextButton();
                qThis.clickNextButton();
            }, 5000);
        }
    });

});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/
});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/
});
