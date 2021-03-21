const PARAMETER_DATA = require("../data/parameters.json");
let JOB_DATA_START_INDEX = 6;
const FLAG_HIGH = "HIGH";
const FLAG_LOW = "LOW";
const FLAG_NORMAL = "NORMAL";

let jobData = [];

function cleanOutput(output) {
  jobData = [];
  return new Promise((resolve, reject) => {
    JSON.parse(output).analyzeResult.readResults.forEach((element) => {
      Object.keys(element.lines).forEach(function (key) {
        jobData.push(element.lines[key].text);
      });
    });
    resolve(jobData.length.toString());
  });
}

function generateJSON(output) {
  return new Promise((resolve, reject) => {
    cleanOutput(output).then((resultslength) => {
      resultsLength = parseInt(resultslength);
      let finalResults = [];

      let i = JOB_DATA_START_INDEX;
      for (i; i < resultslength; i++) {
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
    let report = require("../services");

    report
      .f1()
      .then((data) => {
        report
          .f2(data)
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = {
  f1: sendResponse,
  f2: generateJSON,
};
