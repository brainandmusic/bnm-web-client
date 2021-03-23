/*eslint no-undef: "off"*/
const questions = localStorage.getItem("questions");
const experiment = lab.util.fromObject(JSON.parse(questions));
// Start the experiment
experiment.run()
