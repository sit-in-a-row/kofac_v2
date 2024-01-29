# Chatbot Interface
A simple chatbot interface built with HTML, CSS, and JavaScript. Users can interact with the chatbot by typing messages and receiving predefined responses based on a set of rules.

## Features
- Minimalistic dsign
- Predefined set of responses (can be easily extended)
- Responsive design that adapts to different screen sizes

  ## Usage
  1. Clone the repository
  2. Open `chatbot.html` in your favorite browswer
  3. Start chatting with the bot by typing messages in the input field and hitting the return (or Enter) button or the arrow.
 
## Customizing Responses
To customize the chatbot responses, modify the `rules` and/or the `questions` & `answers` object in the `chatbot.js` file. The object keys represent the user inputs, and the corresponding values are the bot's response.

For example: 
```javascript
let rules = {
"hello": "Hi there!",
"bye": "Goodbye!",
// ... add more rules as needed
};
```

License 
Apache-2.0 License
