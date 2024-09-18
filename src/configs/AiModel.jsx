/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export  const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate A course tutorial on following detail with field as Course name , Description, along with chapter name, about, duration: ctegory: Programming, title: python,Level:Basic, Duration: 1 hours, No of files:5, in json format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_name\": \"Python Programming Fundamentals\",\n  \"description\": \"This course provides a comprehensive introduction to Python programming for beginners. You will learn the fundamental concepts of Python syntax, data types, control flow, and functions.\",\n  \"chapters\": [\n    {\n      \"name\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the Python programming language, its history, and its applications. You will also learn how to install Python and set up your development environment.\",\n      \"duration\": \"30 minutes\"\n    },\n    {\n      \"name\": \"Basic Data Types and Variables\",\n      \"about\": \"This chapter covers the basic data types in Python, such as integers, floats, strings, and booleans. You will learn how to declare variables, assign values, and perform basic operations on them.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"name\": \"Control Flow Statements\",\n      \"about\": \"This chapter explores the control flow statements in Python, including if-else statements, loops (for and while), and conditional expressions.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"name\": \"Functions and Modules\",\n      \"about\": \"This chapter teaches you how to define and call functions in Python. You will also learn about built-in functions and how to use modules to extend Python's functionality.\",\n      \"duration\": \"10 minutes\"\n    },\n    {\n      \"name\": \"Working with Data Structures\",\n      \"about\": \"This chapter introduces the common data structures in Python, including lists, tuples, dictionaries, and sets. You will learn how to create, manipulate, and access elements in these data structures.\",\n      \"duration\": \"15 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"title\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"no_of_files\": 5\n}\n```\n"},
          ],
        },
      ],
    });
  
    //const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    //console.log(result.response.text());