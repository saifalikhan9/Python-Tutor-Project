export const modules = {
  1: {
    title: "Welcome to the Wonderful World of Python!",
    description:
      "Discover the magic behind Python and why it's your new best friend in programming.",
    content: {
      title: "What is Python?",
      text: "Imagine a magical language that brings your ideas to life on the computer! Python is a friendly, powerful programming language that lets you create websites, games, apps, and even control robots. Its simple and readable syntax makes learning fun and intuitive. Get ready to embark on an adventure where you'll learn to speak directly to your computer in a language that opens up endless possibilities.",
      codeExample: "",
    },
  },
  2: {
    title: "Printing and Saying Hello!",
    description:
      "Learn how to make Python talk with the amazing `print()` function.",
    content: {
      title: "The `print()` Function",
      text: "One of the very first commands you'll master is the `print()` function, which is like giving your computer a voice! When you write `print(\"Hello, world!\")`, Python will display that message on your screen. You can even print numbers or mix words and numbers together. It's a fun and interactive way to see your code come to life, making it feel like you're having a conversation with your computer.",
      codeExample: 'print("Hello, world!")',
    },
  },
  3: {
    title: "Variables: Storing Information",
    description: "Learn how to save and reuse data using variables.",
    content: {
      title: "What are Variables?",
      text: 'Think of variables as little boxes or jars where you can store information—like names, numbers, or even whole sentences. You assign a value to a variable using the `=` sign. For example, you might write `name = "Alice"` or `age = 10`. Once stored, you can refer back to these values throughout your program. It’s like labeling your personal toolbox so you always know where to find what you need.',
      codeExample: 'name = "Alice"\nage = 10',
    },
  },
  4: {
    title: "Numbers and Math with Python",
    description:
      "Dive into the exciting world of numbers and basic arithmetic in Python.",
    content: {
      title: "Math Operations",
      text: "Python isn't just about words—it's a brilliant calculator too! You can perform all the basic math operations: addition with `+`, subtraction with `-`, multiplication with `*`, and division with `/`. Try simple commands like `print(5 + 3)` to see addition in action, or `print(15 / 3)` to explore division. With Python, you can experiment with numbers and unleash your inner math wizard!",
      codeExample: "print(5 + 3)\nprint(15 / 3)",
    },
  },
  5: {
    title: "Fun with Strings: Text Adventures!",
    description: "Unleash the power of text manipulation with Python strings.",
    content: {
      title: "Working with Strings",
      text: 'Strings in Python are sequences of characters enclosed in quotes, and they\'re your key to handling text. Imagine piecing together words like puzzle pieces—if you have "Hello, " and "my name is Bob!", you can join them using the `+` operator: `message = "Hello, " + "my name is Bob!"`. When you `print(message)`, Python assembles and displays the full sentence, turning simple words into engaging messages.',
      codeExample: 'message = "Hello, " + "my name is Bob!"\nprint(message)',
    },
  },
  6: {
    title: "Making Decisions with `if` Statements",
    description: "Learn how to give your code the power to make choices.",
    content: {
      title: "Conditional Statements",
      text: "Ever wonder how your programs make decisions? That's where `if` statements come into play! They let Python evaluate conditions and execute code only when certain criteria are met. For instance, you might check if `age >= 10` before letting someone play a game. If the condition is true, a block of code runs; if not, you can use `else` to handle the alternative. It's like programming your very own set of rules—turning your code into a smart decision-maker that reacts to different scenarios.",
      codeExample:
        'age = 10\nif age >= 10:\n    print("You can play the game!")\nelse:\n    print("You are too young to play the game.")',
    },
  },
};
