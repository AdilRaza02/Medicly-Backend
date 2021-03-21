const PARAMETER_DATA = require("../data/parameters.json");
const JOB_DATA_START_INDEX = 6;
const FLAG_HIGH = "HIGH";
const FLAG_LOW = "LOW";
const FLAG_NORMAL = "NORMAL";

let jobData = [];

function cleanOutput(output) {
  JSON.parse(output).analyzeResult.readResults.forEach((element) => {
    Object.keys(element.lines).forEach(function (key) {
      jobData.push(element.lines[key].text);
    });
  });
  return jobData.length;
}

function generateJSON(output) {
  return new Promise((resolve, reject) => {
    let resultslength = cleanOutput(output);
    let finalResults = [];
    for (let i = JOB_DATA_START_INDEX; i < resultslength; i++) {
      let entry = {};
      let foundEntry = PARAMETER_DATA.find(
        (entry) => entry.name.toLowerCase() === jobData[i].toLowerCase()
      );

      entry["id"] = foundEntry && foundEntry.id ? foundEntry.id : 0;
      entry[jobData[0]] = jobData[i];
      entry[jobData[1]] = jobData[++i];

      if (jobData[i + 1] === FLAG_HIGH || jobData[i + 1] === FLAG_LOW) {
        entry[jobData[2]] = jobData[++i];
      } else {
        entry[jobData[2]] = FLAG_NORMAL;
      }
      entry[jobData[3]] = jobData[++i];
      entry[jobData[4]] = jobData[++i];

      finalResults.push(entry);
    }
    resolve(addTestType(finalResults));
  });
}

function addTestType(finalResults) {
  return {
    test_type: jobData[5],
    results: finalResults,
  };
}

function sendResponse() {
  return new Promise((resolve, reject) => {
    let data = require("../services");
    data.then((response) => {
      generateJSON(response).then((resp) => {
        resolve(resp);
      });
    });
  });
}

module.exports = sendResponse();
