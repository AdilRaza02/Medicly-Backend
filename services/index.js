var request = require("request");
require("dotenv").config();

const imgUrl = process.env.IMAGE_URL + Date.now();
const subscriptionKey = process.env.SUBSCRIPTION_KEY;
const endPoint = process.env.AZURE_END_POINT;

function getDataFromJob(jobURI) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      let params = {
        method: "GET",
        uri: jobURI,
        headers: {
          "Content-Type": "application/json",
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
      };

      request(params, function (error, res, body) {
        console.error(Date.now() + " - error:", error);
        if (error) {
          reject("Something went wrong");
        } else {
          resolve(body);
        }
      });
    }, 5000);
  });
}

function startJob() {
  return new Promise((resolve, reject) => {
    let params = {
      method: "POST",
      uri: endPoint,
      body: '{"source": ' + '"' + imgUrl + '"}',
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey,
      },
    };

    request(params, function (error, res, body) {
      console.error(Date.now() + " - error:", error);
      if (error) {
        reject("Something went wrong");
      } else {
        resolve(res.headers["operation-location"]);
      }
    });
  });
}

module.exports = {
  f1: startJob,
  f2: getDataFromJob,
};
