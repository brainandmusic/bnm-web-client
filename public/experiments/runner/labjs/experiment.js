/*eslint no-undef: "off"*/
const stringToJsonWithFunc = (str) => {
  return JSON.parse(str, function (key, value) {
    if (typeof value === "string" &&
      value.startsWith("/Function(") &&
      value.endsWith(")/")) {
      value = value.substring(10, value.length - 2);
      return (0, eval)("(" + value + ")");
    }
    return value;
  });
}
const questions = localStorage.getItem("questions");
const experiment = lab.util.fromObject(stringToJsonWithFunc(questions));
// Start the experiment
experiment.run()
