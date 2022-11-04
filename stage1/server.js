require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const {
  isEnum,
  openaiConfig,
  skipEnum,
  isMultiplication,
  isAddition,
  isSubtraction,
} = require("./utils");
const port = 8080; //port
//cors
app.use(
  cors({
    origin: "*",
  })
);

//body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// AI setup
const apiKey = process.env.API_KEY,
  { Configuration, OpenAIApi } = require("openai"),
  configuration = new Configuration({ apiKey });
const AI = new OpenAIApi(configuration);
// stage1 Task
app.get("/", (req, res) => {
  res.json({
    slackUsername: "Dev.Zaks",
    backend: true,
    age: 25,
    bio: "I'm Zakariyya, a fullstack engineer, trying to up by backend skills",
  });
});

//STAGE 2 TASK
app.post("/calc", async (req, res) => {
  let expression;
  let finalResult;
  let operator;
  const { x, y, operation_type } = req.body,
    operationStr = operation_type.toString();
  if (isEnum(operationStr)) {
    operator =
      operationStr == "multiplication"
        ? "*"
        : operationStr == "addition"
        ? "+"
        : "-";
    expression = x + operator + y;
    // console.log(expression, eval(expression));
    finalResult = eval(expression);
  } else if (!skipEnum(operationStr)) {
    const response = await AI.createCompletion(openaiConfig(operationStr));
    let outputNum;
    const result = response.data.choices[0].text;
    const output = result.match(/[0-9]+$/);
    if (output) {
      outputNum = parseInt(output[0], 10);
      finalResult = outputNum;
      console.log(outputNum, "AI");
    }
  } else {
    const allNumbers = operationStr.match(/^\d+|\d+\b|\d+(?=\w)/g);
    const [first, last] = allNumbers;
    if (allNumbers.length > 2 || allNumbers.length < 2) {
      console.log("invalid operation");
      res.status(400).send("invalid input");
      return;
    }
    const firstNum = parseInt(first, 10);
    const lastNum = parseInt(last, 10);

    operator = isMultiplication(operationStr)
      ? "*"
      : isAddition(operationStr)
      ? "+"
      : isSubtraction(operationStr)
      ? "-"
      : "";
    if (!operator || operator == "") {
      res.status(404).send("No operator specified");
      return;
    }
    expression = firstNum + operator + lastNum;
    finalResult = eval(expression);
  }
  console.log(finalResult, typeof finalResult);
  const jsonObj = {
    slackUsername: "DevZaks",
    operation_type,
    result: finalResult,
  };
  res.status(200).json(jsonObj);
});

app.listen("8080", () => {
  console.log("your app is litening on port " + port);
});
