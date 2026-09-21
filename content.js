/* ============================================================
   Lumen Learn — all curriculum / subject / lesson content.
   Plain data: CURRICULA (curriculum-specific hierarchies) and
   SUBJECTS (chapters -> lessons -> content blocks).

   Block types:
     h2, p, list, code, callout, diagram, tryit, practice, quiz, summary
   ============================================================ */

/* ---------------- CURRICULA (each with its OWN structure) ---------------- */
const CURRICULA = {
  "british": {
    name: "British",
    tagline: "The National Curriculum for England",
    desc: "The British curriculum organises school into Primary, Secondary, GCSE/IGCSE and A Level stages, with national assessments marking each transition.",
    levels: [
      {
        name: "Primary",
        desc: "Foundations in literacy, numeracy and science.",
        years: [
          { name: "Year 1–2", subjects: ["mathematics", "english", "languages"] },
          { name: "Year 3–4", subjects: ["mathematics", "english", "biology", "languages"] },
          { name: "Year 5–6", subjects: ["mathematics", "english", "biology", "computer-science", "history", "geography"] }
        ]
      },
      {
        name: "Secondary",
        desc: "Broader subjects and deeper concepts in Years 7–9.",
        years: [
          { name: "Year 7", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "languages"] },
          { name: "Year 8", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "languages"] },
          { name: "Year 9", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] }
        ]
      },
      {
        name: "GCSE / IGCSE",
        desc: "Two-year examined courses, usually Years 10–11.",
        years: [
          { name: "Year 10", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] },
          { name: "Year 11", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] }
        ]
      },
      {
        name: "A Level",
        desc: "Specialised two-year study, usually Years 12–13.",
        years: [
          { name: "Year 12", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "english", "history", "geography", "economics", "business", "languages"] },
          { name: "Year 13", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "english", "history", "geography", "economics", "business", "languages"] }
        ]
      }
    ]
  },
  "cambridge": {
    name: "Cambridge",
    tagline: "Cambridge Pathway",
    desc: "Cambridge International organises learning into Primary, Lower Secondary, IGCSE and AS & A Level stages, used by schools in over 160 countries.",
    levels: [
      {
        name: "Primary",
        desc: "Cambridge Primary builds core skills from ages 5–11.",
        years: [
          { name: "Stage 4–6", subjects: ["mathematics", "english", "biology", "languages"] }
        ]
      },
      {
        name: "Lower Secondary",
        desc: "Ages 11–14: preparation for IGCSE study.",
        years: [
          { name: "Stage 7", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "languages"] },
          { name: "Stage 8", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "languages"] },
          { name: "Stage 9", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "languages"] }
        ]
      },
      {
        name: "IGCSE",
        desc: "Two-year international GCSE programme.",
        years: [
          { name: "IGCSE Year 1", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] },
          { name: "IGCSE Year 2", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] }
        ]
      },
      {
        name: "AS / A Level",
        desc: "Advanced study for university preparation.",
        years: [
          { name: "AS Level", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "economics", "business", "english", "languages"] },
          { name: "A Level", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "economics", "business", "english", "languages"] }
        ]
      }
    ]
  },
  "american": {
    name: "American",
    tagline: "US K–12 system",
    desc: "The American system runs from Kindergarten through Grade 12: Elementary School, Middle School and High School, with standards set state by state.",
    levels: [
      {
        name: "Elementary School",
        desc: "Grades K–5: foundations across all subjects.",
        years: [
          { name: "Grades K–2", subjects: ["mathematics", "english", "languages"] },
          { name: "Grades 3–5", subjects: ["mathematics", "english", "biology", "computer-science", "history", "geography"] }
        ]
      },
      {
        name: "Middle School",
        desc: "Grades 6–8: subject specialists and deeper inquiry.",
        years: [
          { name: "Grade 6", subjects: ["mathematics", "english", "biology", "physics", "computer-science", "history", "geography", "languages"] },
          { name: "Grade 7", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "languages"] },
          { name: "Grade 8", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "languages"] }
        ]
      },
      {
        name: "High School",
        desc: "Grades 9–12: credits, electives and college preparation.",
        years: [
          { name: "Grades 9–10", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] },
          { name: "Grades 11–12", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] }
        ]
      }
    ]
  },
  "ib": {
    name: "IB",
    tagline: "International Baccalaureate",
    desc: "The IB offers three programmes — PYP, MYP and the Diploma Programme — built around inquiry, international-mindedness and the Learner Profile.",
    levels: [
      {
        name: "PYP",
        desc: "Primary Years Programme, ages 3–12: transdisciplinary inquiry.",
        years: [
          { name: "PYP Lower", subjects: ["mathematics", "english", "biology", "languages"] },
          { name: "PYP Upper", subjects: ["mathematics", "english", "biology", "computer-science", "history", "geography", "languages"] }
        ]
      },
      {
        name: "MYP",
        desc: "Middle Years Programme, ages 11–16: eight subject groups.",
        years: [
          { name: "MYP 1–2", subjects: ["mathematics", "english", "biology", "physics", "computer-science", "history", "geography", "languages"] },
          { name: "MYP 3", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "languages"] },
          { name: "MYP 4–5", subjects: ["mathematics", "english", "biology", "physics", "chemistry", "computer-science", "history", "geography", "economics", "business", "languages"] }
        ]
      },
      {
        name: "DP",
        desc: "Diploma Programme, ages 16–19: six subjects plus the core.",
        years: [
          { name: "DP Year 1", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "english", "history", "geography", "economics", "business", "languages"] },
          { name: "DP Year 2", subjects: ["mathematics", "biology", "physics", "chemistry", "computer-science", "english", "history", "geography", "economics", "business", "languages"] }
        ]
      }
    ]
  }
};

/* ---------------- SUBJECTS ---------------- */
const SUBJECTS = {
"computer-science": {
  name: "Computer Science",
  icon: "💻",
  tagline: "How computers think — and how to make them do what you want.",
  intro: "Computer Science is about solving problems precisely. You'll learn how to break problems down, write programs in Python, and understand the ideas — from variables to functions — that every piece of software is built on.",
  learn: ["Computational thinking and decomposition", "Python programming from first principles", "Variables, data types and operators", "Conditions, loops and functions", "How to plan, test and finish a small project"],
  chapters: [
    {
      id: "computational-thinking",
      title: "Computational Thinking",
      desc: "The problem-solving mindset behind every program.",
      lessons: [
        {
          id: "what-is-computational-thinking",
          title: "What is Computational Thinking?",
          lede: "Before you write a single line of code, you need to learn to think like a computer scientist.",
          blocks: [
            {t:"p", text:"Computational thinking is a way of solving problems that computers can help with. It has four parts: **decomposition** (breaking a big problem into smaller ones), **pattern recognition** (spotting similarities), **abstraction** (ignoring unimportant detail) and **algorithms** (step-by-step instructions)."},
            {t:"h2", text:"The four pillars"},
            {t:"list", items:["**Decomposition** — split a huge task into small, solvable pieces.", "**Pattern recognition** — notice what repeats, and reuse the solution.", "**Abstraction** — focus on what matters; hide the rest.", "**Algorithms** — write the steps so clearly that even a machine can follow them."]},
            {t:"callout", kind:"key", title:"Key idea", text:"You use computational thinking every day: a recipe is an algorithm, packing a bag is decomposition, and a map is an abstraction."},
            {t:"h2", text:"Example: planning a school trip"},
            {t:"p", text:"Instead of one overwhelming task — *plan the trip* — decompose it: transport, food, permission slips, schedule. Recognise patterns: last year's trip worked, so reuse its schedule format. Abstract away: you don't need to know the bus engine's mechanics, only its capacity. Then write the algorithm: the ordered checklist the organisers follow."},
            {t:"practice", items:[
              {q:"Decompose this problem: 'organise a class quiz competition'. List at least four sub-problems.", hint:"Think about teams, questions, scoring and the venue.", answer:"Possible decomposition: 1) form teams, 2) write question rounds, 3) decide scoring rules, 4) book the room and set a date, 5) appoint a quizmaster."},
              {q:"Give one example of abstraction from everyday life.", hint:"Something that hides complicated detail behind a simple interface.", answer:"Examples: a TV remote (hides electronics), a car dashboard (hides engine mechanics), an app icon (hides millions of lines of code)."}
            ]},
            {t:"quiz", questions:[
              {q:"Which pillar means breaking a problem into smaller parts?", options:["Abstraction","Decomposition","Pattern recognition","Algorithms"], answer:1, explain:"Decomposition splits big problems into small, solvable pieces."},
              {q:"A step-by-step set of instructions a computer can follow is called…", options:["an abstraction","a pattern","an algorithm","a variable"], answer:2, explain:"Algorithms are precise sequences of steps — the heart of every program."}
            ]},
            {t:"summary", items:["Computational thinking has four pillars: decomposition, pattern recognition, abstraction and algorithms.","It applies to everyday problems, not just computers.","Strong decomposition makes every later step — including coding — easier."]}
          ]
        },
        {
          id: "algorithms-first-steps",
          title: "Algorithms: First Steps",
          lede: "An algorithm is a recipe for a computer. Let's write one properly.",
          blocks: [
            {t:"p", text:"An **algorithm** is an ordered set of unambiguous steps that solves a problem or completes a task. For a computer to follow it, every step must be precise — computers do exactly what you say, not what you mean."},
            {t:"h2", text:"Writing an algorithm in plain steps"},
            {t:"p", text:"Suppose you want an algorithm that finds the largest of three numbers. In plain steps:"},
            {t:"list", items:["1. Read the three numbers into a, b and c.","2. Assume the largest is a.","3. If b is bigger than the current largest, it becomes the largest.","4. If c is bigger than the current largest, it becomes the largest.","5. Output the largest."]},
            {t:"callout", kind:"tip", title:"Precision matters", text:"'Sort of the biggest' is not a step. 'If b > largest, set largest to b' is. Every instruction must leave no room for guessing."},
            {t:"h2", text:"Pseudocode"},
            {t:"p", text:"Programmers often sketch algorithms in **pseudocode** — structured English that looks a bit like code but isn't tied to any language:"},
            {t:"code", lang:"Pseudocode", code:"SET largest TO a\nIF b > largest THEN\n    SET largest TO b\nENDIF\nIF c > largest THEN\n    SET largest TO c\nENDIF\nOUTPUT largest"},
            {t:"practice", items:[
              {q:"Write an algorithm (plain steps) for making a cup of tea.", hint:"List every step in order, including checks like 'is the kettle boiled?'.", answer:"Example: 1) Fill kettle with water. 2) Boil the kettle. 3) Place teabag in cup. 4) Pour hot water into cup. 5) Wait 2 minutes. 6) Remove teabag. 7) Add milk/sugar if wanted. 8) Stir."}
            ]},
            {t:"quiz", questions:[
              {q:"Why must algorithm steps be unambiguous?", options:["To look professional","Because computers follow instructions literally","To make them shorter","Ambiguity is fine in algorithms"], answer:1, explain:"Computers execute exactly what is written — vague steps produce wrong results."},
              {q:"Pseudocode is…", options:["a programming language","structured English describing an algorithm","machine code","a type of loop"], answer:1, explain:"Pseudocode describes logic clearly without the strict syntax of a real language."}
            ]},
            {t:"summary", items:["An algorithm is an ordered set of precise steps.","Pseudocode lets you design logic before worrying about syntax.","Test your algorithm by tracing through it with sample inputs."]}
          ]
        }
      ]
    },
    {
      id: "programming-fundamentals",
      title: "Programming Fundamentals",
      desc: "Python from zero: variables, data, logic, loops and functions.",
      lessons: [
        {
          id: "introduction",
          title: "Introduction to Programming",
          lede: "Programs are everywhere. This chapter teaches you to write your own — starting with Python.",
          blocks: [
            {t:"p", text:"A **program** is a set of instructions a computer executes. **Programming** is the act of writing those instructions in a **programming language** — a formal language both humans and computers can work with."},
            {t:"h2", text:"Why Python?"},
            {t:"p", text:"We use **Python** in this course because it reads almost like English, it is used professionally in science, web development and AI, and you can run it right here in your browser — no installation needed."},
            {t:"h2", text:"Your first program"},
            {t:"p", text:"Tradition demands it. The `print()` function displays text on the screen:"},
            {t:"code", lang:"Python", code:"print(\"Hello, world!\")"},
            {t:"p", text:"Press **Run** below to execute real Python in your browser. Try changing the message inside the quotes, then run it again."},
            {t:"tryit", title:"Try it: your first program", subtitle:"Edit the code, then press Run.", code:"print(\"Hello, world!\")\nprint(\"I am learning to program.\")"},
            {t:"callout", kind:"tip", title:"How to read code", text:"Read programs like sentences: top to bottom, one instruction at a time. The computer executes them in exactly that order."},
            {t:"practice", items:[
              {q:"Make the program print your name on one line and your favourite subject on the next.", hint:"Use two print() calls, one after the other.", answer:"print(\"Aaquib\")\nprint(\"Computer Science\")  (any two print statements work)"}
            ]},
            {t:"quiz", questions:[
              {q:"What does print(\"Hi\") do?", options:["Saves a file","Displays Hi on the screen","Deletes text","Creates a variable"], answer:1, explain:"print() outputs whatever is inside the parentheses to the screen."},
              {q:"In which order does the computer execute instructions?", options:["Random order","Bottom to top","Top to bottom","Fastest first"], answer:2, explain:"Programs execute sequentially from top to bottom unless told otherwise."}
            ]},
            {t:"summary", items:["A program is instructions a computer executes.","Python is readable, powerful and runs in your browser here.","print() displays output; change the code and run it to experiment."]}
          ]
        },
        {
          id: "variables",
          title: "Variables",
          lede: "A variable is a named box that stores a value you can reuse and change.",
          blocks: [
            {t:"h2", text:"What is a variable?"},
            {t:"p", text:"A **variable** is a named location used to store information. You give it a name, put a value in it, and use the name later wherever you need that value."},
            {t:"code", lang:"Python", code:"name = \"Aaquib\"\nage = 17\nprint(name)\nprint(age)"},
            {t:"p", text:"Here `name` and `age` are variables. The `=` sign **assigns** the value on the right to the name on the left — it does not mean 'equals' the way it does in maths."},
            {t:"h2", text:"Variables can change"},
            {t:"code", lang:"Python", code:"score = 0\nprint(score)   # 0\n\nscore = 10\nprint(score)   # 10 — the old value is replaced"},
            {t:"callout", kind:"key", title:"Key idea", text:"A variable holds one value at a time. Assigning a new value overwrites the old one."},
            {t:"h2", text:"Naming rules"},
            {t:"list", items:["Names can contain letters, digits and underscores: `player_score`, `age2`.","Names must start with a letter or underscore — not a digit.","Names are case-sensitive: `Score` and `score` are different variables.","Choose meaningful names: `total_price` beats `x`."]},
            {t:"tryit", title:"Try it: variables", subtitle:"Create variables and print them.", code:"name = \"Aaquib\"\nage = 17\nprint(\"Name:\", name)\nprint(\"Age:\", age)\n\n# Now change age and print again\nage = 18\nprint(\"Next year:\", age)"},
            {t:"practice", items:[
              {q:"Create a variable called `city` holding your city, then print it.", hint:"Text values go in quotes: city = \"...\"", answer:"city = \"Bishkek\"\nprint(city)"},
              {q:"What is wrong with this line? `2nd_place = \"Sara\"`", hint:"Check the naming rules.", answer:"Variable names cannot start with a digit. Rename it, e.g. second_place."}
            ]},
            {t:"quiz", questions:[
              {q:"What does the = sign do in `x = 5`?", options:["Checks if x equals 5","Assigns 5 to the variable x","Adds 5 to x","Nothing"], answer:1, explain:"= is the assignment operator: it stores the right-hand value in the left-hand name."},
              {q:"Which is a valid variable name?", options:["2fast","my-score","_total","my score"], answer:2, explain:"Names may start with a letter or underscore; hyphens and spaces are not allowed."},
              {q:"After `a = 3` then `a = 7`, what is a?", options:["3","10","7","37"], answer:2, explain:"The second assignment overwrites the first, so a is 7."}
            ]},
            {t:"summary", items:["Variables store values under names you choose.","= assigns; it is not mathematical equality.","Names must start with a letter or underscore and should be meaningful."]}
          ]
        },
        {
          id: "data-types",
          title: "Data Types",
          lede: "Text, whole numbers, decimals and true/false — data comes in types, and the type decides what you can do with it.",
          blocks: [
            {t:"p", text:"Every value in Python has a **data type**. The four you will use constantly:"},
            {t:"list", items:["**`str`** (string) — text in quotes: `\"hello\"`, `'Python'`","**`int`** (integer) — whole numbers: `42`, `-7`, `0`","**`float`** — decimal numbers: `3.14`, `-0.5`","**`bool`** (boolean) — `True` or `False`"]},
            {t:"code", lang:"Python", code:"name = \"Aaquib\"      # str\nage = 17            # int\nheight = 1.75       # float\nis_student = True   # bool\n\nprint(type(name))   # <class 'str'>\nprint(type(age))    # <class 'int'>"},
            {t:"h2", text:"Why types matter"},
            {t:"p", text:"Types decide which operations make sense. Adding two ints gives maths; adding two strings **concatenates** (joins) them:"},
            {t:"code", lang:"Python", code:"print(3 + 4)          # 7  (maths)\nprint(\"3\" + \"4\")      # 34 (joined text!)\nprint(\"ha\" * 3)        # hahaha"},
            {t:"callout", kind:"tip", title:"Watch out", text:"`\"17\"` (text) and `17` (number) look similar but behave differently. `type()` reveals the truth."},
            {t:"h2", text:"Converting between types"},
            {t:"code", lang:"Python", code:"age_text = \"17\"\nage_num = int(age_text)      # str -> int\nprice = float(\"9.99\")        # str -> float\nlabel = str(42)              # int -> str\nprint(age_num + 1)           # 18"},
            {t:"tryit", title:"Try it: types", subtitle:"Inspect types and convert between them.", code:"a = \"5\"\nb = 10\nprint(type(a))\nprint(type(b))\n\n# Convert a to a number, then add\ntotal = int(a) + b\nprint(total)\nprint(type(total))"},
            {t:"practice", items:[
              {q:"What is the type of each value? `\"hello\"`, `7`, `2.5`, `False`", hint:"Match each to str, int, float, bool.", answer:"\"hello\" → str, 7 → int, 2.5 → float, False → bool."},
              {q:"Predict the output of `print(\"2\" * 4)`.", hint:"* with a string repeats it.", answer:"2222 — the string \"2\" repeated four times."}
            ]},
            {t:"quiz", questions:[
              {q:"Which of these is a float?", options:["\"3.0\"","3","3.0","True"], answer:2, explain:"3.0 is a decimal number; \"3.0\" is a string."},
              {q:"What does int(\"12\") + 3 evaluate to?", options:["\"123\"","15","\"15\"","Error"], answer:1, explain:"int(\"12\") converts the text to the number 12, then 12 + 3 = 15."},
              {q:"A bool can only be…", options:["any number","True or False","text","empty"], answer:1, explain:"Booleans represent truth values: True or False."}
            ]},
            {t:"summary", items:["The core types are str, int, float and bool.","Type decides what operations do — \"3\" + \"4\" is \"34\".","Convert with int(), float() and str(); check with type()."]}
          ]
        },
        {
          id: "operators",
          title: "Operators",
          lede: "Operators are the verbs of programming: they compute, compare and combine.",
          blocks: [
            {t:"h2", text:"Arithmetic operators"},
            {t:"code", lang:"Python", code:"print(10 + 3)    # 13  addition\nprint(10 - 3)    # 7   subtraction\nprint(10 * 3)    # 30  multiplication\nprint(10 / 3)    # 3.333... division (always float)\nprint(10 // 3)   # 3   floor division\nprint(10 % 3)    # 1   remainder (modulo)\nprint(10 ** 3)   # 1000 power"},
            {t:"callout", kind:"tip", title:"Modulo is a superpower", text:"`n % 2 == 0` tests whether n is even. Modulo answers 'what's left over?' — perfect for cycles, wrapping and divisibility."},
            {t:"h2", text:"Comparison operators"},
            {t:"p", text:"Comparisons answer a yes/no question, so they always produce a **bool**:"},
            {t:"code", lang:"Python", code:"age = 17\nprint(age > 18)    # False\nprint(age >= 17)   # True\nprint(age == 17)   # True  (double = for comparison!)\nprint(age != 17)   # False"},
            {t:"callout", kind:"key", title:"Key idea", text:"`=` assigns a value. `==` compares two values. Mixing them up is the most common beginner bug in every language."},
            {t:"h2", text:"Logical operators"},
            {t:"code", lang:"Python", code:"age = 17\nhas_ticket = True\n\nprint(age >= 16 and has_ticket)  # True — both must hold\nprint(age >= 18 or has_ticket)   # True — at least one holds\nprint(not has_ticket)            # False — flips the value"},
            {t:"tryit", title:"Try it: operators", subtitle:"Experiment with arithmetic and comparisons.", code:"a = 17\nb = 5\n\nprint(\"sum:\", a + b)\nprint(\"remainder:\", a % b)\nprint(\"a is even:\", a % 2 == 0)\nprint(\"can vote:\", a >= 18)\nprint(\"teenager:\", a >= 13 and a <= 19)"},
            {t:"practice", items:[
              {q:"Write an expression that is True when `score` is between 50 and 100 (inclusive).", hint:"Combine two comparisons with `and`.", answer:"score >= 50 and score <= 100"},
              {q:"What does `7 // 2` evaluate to, and why?", hint:"Floor division rounds down.", answer:"3 — 7 / 2 is 3.5, floored to 3."}
            ]},
            {t:"quiz", questions:[
              {q:"What is 17 % 5?", options:["3","2","3.4","12"], answer:1, explain:"17 ÷ 5 = 3 remainder 2."},
              {q:"Which operator tests equality?", options:["=","==","!=","==="], answer:1, explain:"== compares; = assigns."},
              {q:"`True and False or True` evaluates to…", options:["True","False","Error","None"], answer:0, explain:"`and` binds tighter: (True and False) or True → False or True → True."}
            ]},
            {t:"summary", items:["Arithmetic: + - * / // % ** — note % gives the remainder.","Comparisons (==, !=, <, >, <=, >=) always produce booleans.","Combine conditions with and, or and not."]}
          ]
        },
        {
          id: "conditions",
          title: "Conditions",
          lede: "Conditions let your program make decisions — do this if something is true, otherwise do that.",
          blocks: [
            {t:"p", text:"So far every program ran top to bottom with no choices. **Conditions** change that: `if` runs a block only when its test is `True`."},
            {t:"code", lang:"Python", code:"age = 17\n\nif age >= 18:\n    print(\"You can vote.\")\nelse:\n    print(\"Not yet — but soon!\")"},
            {t:"p", text:"Notice the **colon** and the **indentation** (four spaces). Indentation is how Python knows which lines belong to the `if`."},
            {t:"h2", text:"elif: more than two branches"},
            {t:"code", lang:"Python", code:"score = 82\n\nif score >= 90:\n    grade = \"A\"\nelif score >= 75:\n    grade = \"B\"\nelif score >= 60:\n    grade = \"C\"\nelse:\n    grade = \"D\"\n\nprint(\"Grade:\", grade)"},
            {t:"p", text:"Python checks branches **in order** and runs only the first one whose condition is true. That ordering matters — put the strictest tests first."},
            {t:"diagram", caption:"How an if / elif / else chain flows: conditions are tested top to bottom; the first true branch runs and the rest are skipped.", svg:"<svg viewBox='0 0 560 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><rect x='200' y='10' width='160' height='44' rx='10' fill='#a3c614'/><text x='280' y='38' text-anchor='middle' font-weight='700'>score >= 90?</text><text x='280' y='80' text-anchor='middle' font-size='13' fill='#5f5f5c'>yes ↓</text><text x='400' y='80' text-anchor='middle' font-size='13' fill='#5f5f5c'>no →</text><rect x='200' y='92' width='160' height='40' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='280' y='117' text-anchor='middle' font-size='14'>grade = \"A\"</text><rect x='410' y='60' width='130' height='44' rx='10' fill='#a3c614'/><text x='475' y='88' text-anchor='middle' font-weight='700' font-size='14'>score >= 75?</text><rect x='410' y='130' width='130' height='40' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='475' y='155' text-anchor='middle' font-size='14'>grade = \"B\"</text><text x='475' y='205' text-anchor='middle' font-size='13' fill='#5f5f5c'>… else → grade = \"D\"</text><rect x='410' y='218' width='130' height='40' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='475' y='243' text-anchor='middle' font-size='14'>grade = \"D\"</text></svg>"},
            {t:"callout", kind:"tip", title:"Common mistake", text:"Forgetting the colon after `if score >= 90` or mixing tabs and spaces for indentation. Python will refuse to run — read the error, fix the line, run again."},
            {t:"tryit", title:"Try it: decisions", subtitle:"Change the score and see the grade change.", code:"score = 82\n\nif score >= 90:\n    grade = \"A\"\nelif score >= 75:\n    grade = \"B\"\nelif score >= 60:\n    grade = \"C\"\nelse:\n    grade = \"D\"\n\nprint(\"Score:\", score)\nprint(\"Grade:\", grade)"},
            {t:"practice", items:[
              {q:"Write code that prints \"Even\" if `n` is even and \"Odd\" otherwise.", hint:"Use the modulo operator: n % 2 == 0.", answer:"if n % 2 == 0:\n    print(\"Even\")\nelse:\n    print(\"Odd\")"},
              {q:"Why must `score >= 90` come before `score >= 75` in the grade chain?", hint:"What happens to a score of 95 if the order is flipped?", answer:"Branches run in order and only the first true one executes. If >= 75 came first, a 95 would wrongly get a B. Strictest conditions go first."}
            ]},
            {t:"quiz", questions:[
              {q:"What must follow the condition in `if x > 0`?", options:["A semicolon","A colon and an indented block","A comma","Nothing"], answer:1, explain:"Python uses a colon plus indentation to mark the controlled block."},
              {q:"In an if/elif/else chain, how many branches run?", options:["All true ones","Only the first true one","Only the last one","None"], answer:1, explain:"Execution enters the first branch whose condition is true, then skips the rest."},
              {q:"`else` runs when…", options:["the if condition is True","none of the earlier conditions were True","always","never"], answer:1, explain:"else is the fallback when every condition above it was false."}
            ]},
            {t:"summary", items:["if/elif/else lets programs branch on conditions.","Order branches from strictest to loosest.","Colons and consistent indentation are mandatory in Python."]}
          ]
        },
        {
          id: "loops",
          title: "Loops",
          lede: "Loops repeat work for you. A computer never gets bored — make repetition its job, not yours.",
          blocks: [
            {t:"p", text:"Imagine printing the numbers 1 to 1000 by hand — a thousand `print` statements. A **loop** does it in two lines. Loops repeat a block of code, and each repetition is called an **iteration**."},
            {t:"h2", text:"The for loop and range()"},
            {t:"p", text:"Python's `for` loop walks through a sequence. Combined with `range()`, it counts for you:"},
            {t:"code", lang:"Python", code:"for i in range(5):\n    print(i)\n# Output:\n# 0\n# 1\n# 2\n# 3\n# 4"},
            {t:"p", text:"`range(5)` produces the numbers 0–4 (it stops **before** 5). The loop variable `i` takes each value in turn, and the indented block runs once per value."},
            {t:"callout", kind:"key", title:"Key idea", text:"range(n) counts 0, 1, 2, …, n−1. It starts at 0 and stops before n — this catches every beginner once, then never again."},
            {t:"h2", text:"range() with start and step"},
            {t:"code", lang:"Python", code:"for n in range(2, 11, 2):\n    print(n)\n# 2, 4, 6, 8, 10  (start=2, stop before 11, step=2)\n\nfor n in range(10, 0, -1):\n    print(n)\n# 10 down to 1 — a countdown!"},
            {t:"h2", text:"What happens each iteration — visualised"},
            {t:"diagram", caption:"Tracing `total` through a loop that sums 1 to 4. Each iteration updates the running total.", svg:"<svg viewBox='0 0 620 210' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><text x='20' y='30' font-size='15' font-weight='700'>total = 0</text><g font-size='14'><rect x='20' y='55' width='130' height='52' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='85' y='76' text-anchor='middle'>i = 1</text><text x='85' y='96' text-anchor='middle' fill='#4c6106' font-weight='700'>total → 1</text><rect x='170' y='55' width='130' height='52' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='235' y='76' text-anchor='middle'>i = 2</text><text x='235' y='96' text-anchor='middle' fill='#4c6106' font-weight='700'>total → 3</text><rect x='320' y='55' width='130' height='52' rx='10' fill='#f7f7f5' stroke='#e9e9e4'/><text x='385' y='76' text-anchor='middle'>i = 3</text><text x='385' y='96' text-anchor='middle' fill='#4c6106' font-weight='700'>total → 6</text><rect x='470' y='55' width='130' height='52' rx='10' fill='#f3f8dc' stroke='#a3c614' stroke-width='2'/><text x='535' y='76' text-anchor='middle'>i = 4</text><text x='535' y='96' text-anchor='middle' fill='#4c6106' font-weight='700'>total → 10</text></g><text x='20' y='150' font-size='14' fill='#5f5f5c'>Code:</text><text x='20' y='175' font-family='monospace' font-size='14'>total = 0</text><text x='20' y='197' font-family='monospace' font-size='14'>for i in range(1, 5):</text><text x='40' y='219' font-family='monospace' font-size='14' display='none'>x</text></svg>"},
            {t:"p", text:"The pattern above — start a running total at 0, then add each value inside the loop — is called an **accumulator**. It appears everywhere: totals, counts, averages."},
            {t:"h2", text:"Looping over text"},
            {t:"p", text:"`for` works on strings too, visiting each character:"},
            {t:"code", lang:"Python", code:"word = \"Python\"\nfor letter in word:\n    print(letter)\n# P y t h o n, one per line"},
            {t:"h2", text:"The while loop"},
            {t:"p", text:"A `while` loop repeats **as long as** its condition stays true — ideal when you don't know the count in advance:"},
            {t:"code", lang:"Python", code:"countdown = 3\nwhile countdown > 0:\n    print(countdown)\n    countdown = countdown - 1\nprint(\"Go!\")"},
            {t:"callout", kind:"tip", title:"Avoid infinite loops", text:"A while loop whose condition never becomes false runs forever. Always make sure something inside the loop moves the condition toward false — here, `countdown` decreases each time."},
            {t:"h2", text:"break and continue"},
            {t:"code", lang:"Python", code:"for n in range(10):\n    if n == 3:\n        continue   # skip 3, keep looping\n    if n == 7:\n        break      # stop the loop entirely\n    print(n)\n# prints 0 1 2 4 5 6"},
            {t:"tryit", title:"Try it: loops in action", subtitle:"Real Python running in your browser — edit and press Run.", code:"# 1) Count with range\nfor i in range(1, 6):\n    print(\"Count:\", i)\n\nprint(\"---\")\n\n# 2) Accumulator: sum 1 to 100\ntotal = 0\nfor n in range(1, 101):\n    total = total + n\nprint(\"Sum 1..100 =\", total)\n\nprint(\"---\")\n\n# 3) Countdown with while\nc = 5\nwhile c > 0:\n    print(c)\n    c = c - 1\nprint(\"Liftoff!\")"},
            {t:"h2", text:"Quick checks"},
            {t:"practice", items:[
              {q:"Write a for loop that prints the 7-times table from 7×1 to 7×10.", hint:"Loop n from 1 to 10 and print 7 * n.", answer:"for n in range(1, 11):\n    print(\"7 x\", n, \"=\", 7 * n)"},
              {q:"This loop never ends — fix it:\n`x = 1`\n`while x < 5:`\n`    print(x)`", hint:"x never changes inside the loop.", answer:"Add x = x + 1 inside the loop so the condition eventually becomes false:\nx = 1\nwhile x < 5:\n    print(x)\n    x = x + 1"},
              {q:"Use an accumulator to count how many even numbers are between 1 and 20.", hint:"Loop 1..20, add 1 to count when n % 2 == 0.", answer:"count = 0\nfor n in range(1, 21):\n    if n % 2 == 0:\n        count = count + 1\nprint(count)  # 10"}
            ]},
            {t:"quiz", questions:[
              {q:"What does range(4) produce?", options:["1, 2, 3, 4","0, 1, 2, 3","0, 1, 2, 3, 4","4, 3, 2, 1"], answer:1, explain:"range starts at 0 and stops before its argument: 0–3."},
              {q:"How many times does this loop's body run? `for i in range(2, 10, 3):`", options:["2","3","4","8"], answer:1, explain:"Values are 2, 5, 8 — three iterations (11 would be next, but it stops before 10)."},
              {q:"A while loop is best when…", options:["you know the exact count","you want to repeat until a condition changes","you need speed","you hate for loops"], answer:1, explain:"while repeats as long as its condition holds — perfect for unknown counts."},
              {q:"What does `break` do inside a loop?", options:["Skips one iteration","Stops the loop immediately","Restarts the loop","Pauses for input"], answer:1, explain:"break exits the loop entirely; continue skips just the current iteration."},
              {q:"After this code, what is total? `total=0; for n in range(1,5): total += n`", options:["4","10","15","0"], answer:1, explain:"1+2+3+4 = 10. This is the accumulator pattern."}
            ]},
            {t:"summary", items:["for loops repeat a fixed sequence; range(n) counts 0 to n−1.","while loops repeat until a condition becomes false — guard against infinite loops.","Accumulators (running totals) are the most useful loop pattern.","break exits a loop; continue skips to the next iteration."]}
          ]
        },
        {
          id: "functions",
          title: "Functions",
          lede: "Functions package reusable logic under a name. Write once, call anywhere.",
          blocks: [
            {t:"p", text:"You've already used functions: `print()`, `range()`, `int()`. A **function** takes inputs (**arguments**), does something, and can hand back a result with `return`. Now you'll define your own with `def`."},
            {t:"code", lang:"Python", code:"def greet(name):\n    print(\"Hello,\" , name)\n\ngreet(\"Aaquib\")   # calling the function\ngreet(\"Sara\")"},
            {t:"h2", text:"Return values"},
            {t:"p", text:"`print` shows something; `return` **gives a value back** to the caller so it can be stored or reused:"},
            {t:"code", lang:"Python", code:"def square(n):\n    return n * n\n\nresult = square(7)\nprint(result)          # 49\nprint(square(3) + 1)   # 10 — the returned value behaves like a number"},
            {t:"callout", kind:"key", title:"Key idea", text:"print() is for humans to see; return is for the program to use. A function without return gives back `None`."},
            {t:"h2", text:"Why functions matter"},
            {t:"list", items:["**Reuse** — call the same logic from many places.","**Readability** — `calculate_average(scores)` explains itself.","**Testing** — small functions are easy to check in isolation.","**Decomposition** — each function solves one sub-problem."]},
            {t:"tryit", title:"Try it: functions", subtitle:"Define and call your own functions.", code:"def is_even(n):\n    return n % 2 == 0\n\ndef describe(n):\n    if is_even(n):\n        return str(n) + \" is even\"\n    else:\n        return str(n) + \" is odd\"\n\nfor n in range(1, 7):\n    print(describe(n))"},
            {t:"practice", items:[
              {q:"Write a function `celsius_to_fahrenheit(c)` that returns the Fahrenheit equivalent.", hint:"F = C × 9/5 + 32.", answer:"def celsius_to_fahrenheit(c):\n    return c * 9 / 5 + 32"},
              {q:"What's the difference between these two?\n`def f(): print(5)` vs `def f(): return 5`", hint:"One displays, the other hands a value back.", answer:"print(5) shows 5 on screen but the function returns None. return 5 gives the value 5 back to the caller, so result = f() stores 5."}
            ]},
            {t:"quiz", questions:[
              {q:"Which keyword defines a function?", options:["func","def","define","function"], answer:1, explain:"def starts a function definition in Python."},
              {q:"What does `return` do?", options:["Prints a value","Ends the function and hands a value back","Repeats the function","Deletes variables"], answer:1, explain:"return exits the function immediately, passing its value to the caller."},
              {q:"After `def add(a, b): return a + b`, what is `add(2, 3)`?", options:["5","\"23\"","None","Error"], answer:0, explain:"The arguments 2 and 3 are added and 5 is returned."}
            ]},
            {t:"summary", items:["def creates a function; call it by name with arguments.","return hands a value back to the caller.","Functions enable reuse, readability and clean decomposition."]}
          ]
        },
        {
          id: "projects",
          title: "Projects: Build Something Real",
          lede: "Time to combine everything: plan, build, test and finish a small project of your own.",
          blocks: [
            {t:"p", text:"Professional programmers don't just write snippets — they build **projects**: complete programs that solve a real problem. Your project will use variables, conditions, loops and functions together."},
            {t:"h2", text:"Project idea: number guessing game"},
            {t:"p", text:"The computer picks a secret number from 1 to 20. The player guesses; the program says 'too high' or 'too low' until they get it right, then reports the number of attempts."},
            {t:"h2", text:"Step 1 — Decompose"},
            {t:"list", items:["Pick a secret number.","Repeatedly: ask for a guess, compare it, give a hint.","Count the attempts.","Congratulate the player at the end."]},
            {t:"h2", text:"Step 2 — Build it"},
            {t:"code", lang:"Python", code:"import random\n\ndef play():\n    secret = random.randint(1, 20)\n    attempts = 0\n    guess = 0\n\n    print(\"I'm thinking of a number from 1 to 20.\")\n    while guess != secret:\n        guess = int(input(\"Your guess: \"))\n        attempts = attempts + 1\n        if guess < secret:\n            print(\"Too low!\")\n        elif guess > secret:\n            print(\"Too high!\")\n\n    print(\"Correct! You took\", attempts, \"attempts.\")\n\nplay()"},
            {t:"p", text:"Note: `input()` needs a keyboard, which the in-browser runner below can't provide — so this project is for you to run in a full Python environment (or just study here). Instead, try the automated version below, which plays against itself."},
            {t:"tryit", title:"Try it: project building blocks", subtitle:"Random numbers, loops and functions — the pieces of the game.", code:"import random\n\ndef play_auto(secret):\n    attempts = 0\n    guess = 0\n    while guess != secret:\n        guess = random.randint(1, 20)\n        attempts += 1\n    return attempts\n\nsecret = random.randint(1, 20)\ntries = play_auto(secret)\nprint(\"Secret was\", secret, \"— found in\", tries, \"tries\")"},
            {t:"h2", text:"Step 3 — Test like a programmer"},
            {t:"list", items:["**Test the edges**: guess 1 and 20 — the boundaries.","**Test wrong input**: what if someone types 'banana'? (That's your next improvement: validation.)","**Play to win**: does it always finish? The loop only exits when guess == secret, so yes."]},
            {t:"callout", kind:"tip", title:"Make it yours", text:"Improvements to try: limit the player to 6 guesses, add difficulty levels (1–50, 1–100), or keep a best-score across rounds."},
            {t:"practice", items:[
              {q:"Extend the game: tell the player 'Very close!' when their guess is within 2 of the secret.", hint:"Check abs(guess - secret) <= 2 before the too high/low messages.", answer:"if abs(guess - secret) <= 2 and guess != secret:\n    print(\"Very close!\")\nelif guess < secret:\n    print(\"Too low!\")\n..."}
            ]},
            {t:"quiz", questions:[
              {q:"What is the first step of building a project?", options:["Writing code","Decomposing the problem","Testing","Choosing colours"], answer:1, explain:"Decomposition turns one scary project into small solvable pieces."},
              {q:"Why test edge cases like 1 and 20 in the guessing game?", options:["They're lucky numbers","Boundaries are where bugs hide","It's required by law","To make the game longer"], answer:1, explain:"Bugs cluster at boundaries — the smallest and largest valid inputs."}
            ]},
            {t:"summary", items:["Projects combine variables, conditions, loops and functions.","Build in steps: decompose → build → test → improve.","Every program you admire started as a small project like this one."]}
          ]
        }
      ]
    }
  ]
}
,
"mathematics": {
  name: "Mathematics",
  icon: "📐",
  tagline: "The language of patterns — from algebra to geometry.",
  intro: "Mathematics trains you to reason precisely. Start with algebra — the art of working with unknowns — then explore geometry, where shapes and space follow strict, beautiful rules.",
  learn: ["Algebraic expressions and equations", "Solving linear equations step by step", "Working with formulae", "Angles, shapes and geometric reasoning", "Problem-solving strategies"],
  chapters: [
    {
      id: "algebra-basics",
      title: "Algebra Basics",
      desc: "Letters that stand for numbers — and the rules for working with them.",
      lessons: [
        {
          id: "what-is-algebra",
          title: "What is Algebra?",
          lede: "Algebra lets you reason about numbers you don't know yet.",
          blocks: [
            {t:"p", text:"In arithmetic you compute with known numbers: `3 + 4 = 7`. In **algebra** you also work with **unknowns** — letters like `x` that stand for numbers you haven't found yet."},
            {t:"h2", text:"Expressions vs equations"},
            {t:"p", text:"An **expression** is a mathematical phrase: `3x + 2`. It has no equals sign and no single answer — its value depends on `x`. An **equation** states that two expressions are equal: `3x + 2 = 11`. Equations can be **solved**."},
            {t:"callout", kind:"key", title:"Key idea", text:"Expression = phrase (3x + 2). Equation = sentence with '=' (3x + 2 = 11). Only equations have solutions."},
            {t:"h2", text:"Vocabulary"},
            {t:"list", items:["**Variable** — a letter representing a number, e.g. `x`.","**Coefficient** — the number multiplying the variable: in `3x`, the coefficient is 3.","**Constant** — a fixed number: in `3x + 2`, the constant is 2.","**Term** — each part separated by + or −: `3x + 2` has two terms."]},
            {t:"diagram", caption:"Anatomy of the expression 3x + 2: coefficient, variable and constant labelled.", svg:"<svg viewBox='0 0 560 170' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><text x='280' y='80' text-anchor='middle' font-size='52' font-weight='700'><tspan fill='#4c6106'>3</tspan><tspan>x</tspan><tspan fill='#8a8a86'> + </tspan><tspan fill='#1a1a1a'>2</tspan></text><text x='205' y='125' text-anchor='middle' font-size='14' fill='#4c6106' font-weight='700'>coefficient</text><text x='290' y='125' text-anchor='middle' font-size='14' fill='#5f5f5c' font-weight='700'>variable</text><text x='380' y='125' text-anchor='middle' font-size='14' fill='#5f5f5c' font-weight='700'>constant</text><line x1='205' y1='95' x2='205' y2='112' stroke='#4c6106' stroke-width='2'/><line x1='290' y1='95' x2='290' y2='112' stroke='#5f5f5c' stroke-width='2'/><line x1='380' y1='95' x2='380' y2='112' stroke='#5f5f5c' stroke-width='2'/></svg>"},
            {t:"practice", items:[
              {q:"Identify the coefficient, variable and constant in `5y − 7`.", hint:"Which number multiplies y? Which number stands alone?", answer:"Coefficient 5, variable y, constant −7."},
              {q:"Is `4a + 9 = 21` an expression or an equation? Explain.", hint:"Look for the equals sign.", answer:"An equation — it contains '=' and can be solved for a."}
            ]},
            {t:"quiz", questions:[
              {q:"In the term 7x, what is 7?", options:["Variable","Coefficient","Constant","Exponent"], answer:1, explain:"The coefficient is the number multiplying the variable."},
              {q:"Which of these is an equation?", options:["5x − 3","x + 7 = 12","2y","9 − n"], answer:1, explain:"Only x + 7 = 12 contains an equals sign."},
              {q:"How many terms does 2a + 3b − 5 have?", options:["2","3","5","1"], answer:1, explain:"Terms are separated by + and −: 2a, 3b and −5."}
            ]},
            {t:"summary", items:["Algebra uses letters to stand for unknown numbers.","Expressions have no '='; equations do — and equations can be solved.","Know your vocabulary: variable, coefficient, constant, term."]}
          ]
        },
        {
          id: "solving-linear-equations",
          title: "Solving Linear Equations",
          lede: "The golden rule: whatever you do to one side, do to the other.",
          blocks: [
            {t:"p", text:"To **solve** an equation is to find the value of the unknown that makes it true. The strategy: **isolate x** — get it alone on one side — by doing the same operation to both sides."},
            {t:"h2", text:"One-step equations"},
            {t:"p", text:"Solve `x + 5 = 12`. The `+ 5` is in the way, so undo it by subtracting 5 from **both** sides:"},
            {t:"code", lang:"Maths", code:"x + 5 = 12\nx + 5 − 5 = 12 − 5\nx = 7"},
            {t:"p", text:"Check: `7 + 5 = 12` ✓. Always substitute your answer back to verify."},
            {t:"h2", text:"Two-step equations"},
            {t:"p", text:"Solve `3x + 2 = 14`. Undo in reverse order of operations — addition/subtraction first, then multiplication/division:"},
            {t:"code", lang:"Maths", code:"3x + 2 = 14        subtract 2 from both sides\n3x = 12             divide both sides by 3\nx = 4\n\nCheck: 3(4) + 2 = 12 + 2 = 14 ✓"},
            {t:"callout", kind:"tip", title:"Undo in reverse", text:"Think of the equation as wrapping x in layers. Peel them off from the outside in: last operation applied is the first one undone."},
            {t:"h2", text:"With unknowns on both sides"},
            {t:"code", lang:"Maths", code:"5x − 3 = 2x + 9     subtract 2x from both sides\n3x − 3 = 9          add 3 to both sides\n3x = 12             divide by 3\nx = 4\n\nCheck: 5(4) − 3 = 17 and 2(4) + 9 = 17 ✓"},
            {t:"practice", items:[
              {q:"Solve: x − 8 = 15.", hint:"Add 8 to both sides.", answer:"x = 23. Check: 23 − 8 = 15 ✓"},
              {q:"Solve: 4x − 7 = 25.", hint:"Add 7, then divide by 4.", answer:"4x = 32, so x = 8. Check: 4(8) − 7 = 25 ✓"},
              {q:"Solve: 6x + 1 = 3x + 16.", hint:"Collect x-terms on one side first.", answer:"3x = 15, so x = 5. Check: 6(5)+1 = 31 = 3(5)+16 ✓"}
            ]},
            {t:"quiz", questions:[
              {q:"First step to solve 2x + 6 = 18?", options:["Divide by 2","Subtract 6 from both sides","Add 6","Multiply by 2"], answer:1, explain:"Undo addition/subtraction before multiplication/division."},
              {q:"Solve: x/3 = 9.", options:["x = 3","x = 12","x = 27","x = 6"], answer:2, explain:"Multiply both sides by 3: x = 27."},
              {q:"Why check your answer?", options:["Teachers like it","Substitution catches arithmetic slips","It's optional","To waste time"], answer:1, explain:"Substituting back verifies the solution actually satisfies the equation."}
            ]},
            {t:"summary", items:["Do the same operation to both sides to keep the equation balanced.","Undo operations in reverse order: +/− first, then ×/÷.","Collect unknowns on one side; always check by substitution."]}
          ]
        },
        {
          id: "working-with-expressions",
          title: "Simplifying Expressions",
          lede: "Collect like terms, expand brackets, tidy up — make expressions as simple as they can be.",
          blocks: [
            {t:"p", text:"**Simplifying** rewrites an expression in its neatest form without changing its value. The main tools: collecting **like terms** and **expanding brackets**."},
            {t:"h2", text:"Like terms"},
            {t:"p", text:"**Like terms** have exactly the same variable parts. `3x` and `5x` are like terms; `3x` and `3x²` are not."},
            {t:"code", lang:"Maths", code:"3x + 5x = 8x          (like terms combine)\n4a + 2b − a = 3a + 2b  (a-terms combine; b stays)\n2x + 3x² → cannot combine (different powers)"},
            {t:"h2", text:"Expanding brackets"},
            {t:"p", text:"Multiply everything inside the bracket by what's outside:"},
            {t:"code", lang:"Maths", code:"3(x + 4) = 3x + 12\n−2(5 − y) = −10 + 2y\nx(x + 3) = x² + 3x"},
            {t:"callout", kind:"tip", title:"Signs", text:"A minus outside the bracket flips every sign inside: `−(a − b) = −a + b`. Work carefully — this is where most errors happen."},
            {t:"practice", items:[
              {q:"Simplify: 7p − 2p + 4.", hint:"Combine the p-terms.", answer:"5p + 4."},
              {q:"Expand: 5(2x − 3).", hint:"Multiply both terms by 5.", answer:"10x − 15."},
              {q:"Simplify: 3(x + 2) + 2x.", hint:"Expand first, then collect like terms.", answer:"3x + 6 + 2x = 5x + 6."}
            ]},
            {t:"quiz", questions:[
              {q:"Simplify 6m + 2 − 4m.", options:["2m + 2","10m − 4m","2m − 2","12m"], answer:0, explain:"6m − 4m = 2m; the constant 2 stays: 2m + 2."},
              {q:"Expand −4(x − 5).", options:["−4x − 20","−4x + 20","4x − 20","−4x + 5"], answer:1, explain:"−4 × x = −4x; −4 × −5 = +20."},
              {q:"Are 2ab and 3ba like terms?", options:["No — different order","Yes","Only if a = b","Never"], answer:1, explain:"Multiplication commutes, so ab = ba. They are like terms: 5ab."}
            ]},
            {t:"summary", items:["Combine like terms — identical variable parts only.","Expand brackets by multiplying through; watch the signs.","Simplify before solving: tidy expressions make equations easier."]}
          ]
        }
      ]
    },
    {
      id: "geometry-foundations",
      title: "Geometry Foundations",
      desc: "Angles, triangles and the logic of shapes.",
      lessons: [
        {
          id: "angles",
          title: "Angles and Their Rules",
          lede: "A handful of angle rules unlocks hundreds of geometry problems.",
          blocks: [
            {t:"p", text:"An **angle** measures rotation between two lines, in **degrees** (°). A full turn is 360°, a straight line is 180°, and a right angle is 90°."},
            {t:"h2", text:"The essential rules"},
            {t:"list", items:["**Angles on a straight line** sum to 180°.", "**Angles around a point** sum to 360°.", "**Vertically opposite angles** are equal (opposite each other where two lines cross).", "**Angles in a triangle** sum to 180° — always."]},
            {t:"diagram", caption:"Two lines crossing: vertically opposite angles are equal, and adjacent angles on the straight line sum to 180°.", svg:"<svg viewBox='0 0 420 240' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><line x1='40' y1='190' x2='380' y2='50' stroke='#1a1a1a' stroke-width='3'/><line x1='40' y1='50' x2='380' y2='190' stroke='#1a1a1a' stroke-width='3'/><text x='205' y='105' font-size='20' font-weight='700' fill='#4c6106'>a</text><text x='205' y='165' font-size='20' font-weight='700' fill='#4c6106'>a</text><text x='120' y='140' font-size='20' font-weight='700'>b</text><text x='285' y='140' font-size='20' font-weight='700'>b</text><text x='40' y='225' font-size='13' fill='#5f5f5c'>a = a (vertically opposite) · a + b = 180° (straight line)</text></svg>"},
            {t:"h2", text:"Worked example"},
            {t:"p", text:"Two lines cross, forming one angle of 65°. Find the other three. The angle opposite is also 65° (vertically opposite). Each adjacent angle sits on a straight line with 65°, so it's 180° − 65° = 115°. The last angle is opposite that one: 115°."},
            {t:"practice", items:[
              {q:"Angles on a straight line are 90°, 35° and x. Find x.", hint:"They sum to 180°.", answer:"x = 180 − 90 − 35 = 55°."},
              {q:"A triangle has angles 50° and 70°. Find the third.", hint:"Angles in a triangle sum to 180°.", answer:"180 − 50 − 70 = 60°."}
            ]},
            {t:"quiz", questions:[
              {q:"Angles around a point sum to…", options:["180°","90°","360°","270°"], answer:2, explain:"A full turn around a point is 360°."},
              {q:"Two lines cross; one angle is 110°. The vertically opposite angle is…", options:["70°","110°","55°","250°"], answer:1, explain:"Vertically opposite angles are equal."},
              {q:"In a right-angled triangle, the two non-right angles sum to…", options:["180°","90°","45°","100°"], answer:1, explain:"Total is 180° and the right angle takes 90°, leaving 90°."}
            ]},
            {t:"summary", items:["Straight line: 180°. Around a point: 360°. Triangle: 180°.","Vertically opposite angles are equal.","Name the rule you use at each step — it earns marks and prevents mistakes."]}
          ]
        },
        {
          id: "area-perimeter",
          title: "Area and Perimeter",
          lede: "Perimeter is the fence; area is the field. Learn to compute both for the key shapes.",
          blocks: [
            {t:"p", text:"**Perimeter** is the total distance around a shape (units: cm, m). **Area** is the space inside it (units: cm², m²)."},
            {t:"h2", text:"Core formulae"},
            {t:"list", items:["**Rectangle**: perimeter = 2(l + w); area = l × w.","**Triangle**: area = ½ × base × height (height must be perpendicular to the base).","**Parallelogram**: area = base × height.","**Circle** (radius r): circumference = 2πr; area = πr²."]},
            {t:"code", lang:"Maths", code:"Rectangle 6 cm by 4 cm:\n  perimeter = 2(6 + 4) = 20 cm\n  area = 6 × 4 = 24 cm²\n\nTriangle, base 10 cm, height 6 cm:\n  area = ½ × 10 × 6 = 30 cm²"},
            {t:"callout", kind:"tip", title:"Units", text:"Perimeter uses plain units (cm); area uses square units (cm²). Writing the wrong unit is the easiest mark to lose in an exam."},
            {t:"practice", items:[
              {q:"A rectangle is 9 m by 5 m. Find its perimeter and area.", hint:"Perimeter = 2(l+w); area = l×w.", answer:"Perimeter = 28 m; area = 45 m²."},
              {q:"A circle has radius 7 cm. Find its area (use π ≈ 22/7).", hint:"Area = πr².", answer:"(22/7) × 49 = 154 cm²."}
            ]},
            {t:"quiz", questions:[
              {q:"A square has side 8 cm. Its area is…", options:["32 cm²","64 cm²","32 cm","16 cm²"], answer:1, explain:"8 × 8 = 64, in square centimetres."},
              {q:"Triangle area = ½ × base × height because…", options:["it's a rule with no reason","a triangle is half a parallelogram","triangles are small","height is hard to measure"], answer:1, explain:"Two identical triangles make a parallelogram of area base × height."},
              {q:"Which unit measures area?", options:["cm","cm²","cm³","degrees"], answer:1, explain:"Area covers two dimensions, hence square units."}
            ]},
            {t:"summary", items:["Perimeter = distance around; area = space inside.","Master the four formulae: rectangle, triangle, parallelogram, circle.","Always include correct units: cm vs cm²."]}
          ]
        }
      ]
    }
  ]
}
,
"biology": {
  name: "Biology",
  icon: "🧬",
  tagline: "The science of living things — from cells to ecosystems.",
  intro: "Biology is the study of life. You'll start where all life starts: the cell — its structure, its parts, and the differences between plant and animal cells.",
  learn: ["What cells are and why they matter", "Organelles and their jobs", "Plant vs animal cells", "How cells specialise"],
  chapters: [
    {
      id: "cell-biology",
      title: "Cell Biology",
      desc: "The building blocks of all living things.",
      lessons: [
        {
          id: "what-is-a-cell",
          title: "What is a Cell?",
          lede: "Every living thing — you included — is built from cells.",
          blocks: [
            {t:"p", text:"A **cell** is the smallest unit of life. Some organisms, like bacteria, are a single cell. You are made of around 30 trillion of them, working together."},
            {t:"h2", text:"Why cells matter"},
            {t:"p", text:"Cells carry out all the processes of life: they take in nutrients, release energy, grow, respond to their surroundings and reproduce. Understanding cells is the foundation of all biology — from how medicines work to how plants grow."},
            {t:"h2", text:"Seeing cells"},
            {t:"p", text:"Most cells are too small to see with the naked eye — a human cheek cell is about 60 micrometres across (a micrometre is a thousandth of a millimetre). Microscopes reveal their structure, and staining makes the parts visible."},
            {t:"callout", kind:"key", title:"Key idea", text:"Cell theory: 1) All living things are made of cells. 2) The cell is the basic unit of life. 3) All cells come from pre-existing cells."},
            {t:"practice", items:[
              {q:"State the three parts of cell theory.", hint:"All living things… the basic unit… new cells come from…", answer:"1) All living things are made of cells. 2) The cell is the basic unit of life. 3) All cells arise from pre-existing cells."},
              {q:"Why can't we see most cells without a microscope?", hint:"Think about their size in micrometres.", answer:"They are tens of micrometres across — far smaller than the ~0.1 mm limit of the unaided human eye."}
            ]},
            {t:"quiz", questions:[
              {q:"A cell is best described as…", options:["a type of tissue","the smallest unit of life","a microscopic animal","a chemical"], answer:1, explain:"Cells are the basic structural and functional units of all living things."},
              {q:"According to cell theory, new cells come from…", options:["thin air","non-living matter","pre-existing cells","sunlight"], answer:2, explain:"Omnis cellula e cellula — all cells from cells."},
              {q:"A cheek cell is roughly…", options:["60 cm across","60 mm across","60 micrometres across","60 nm across"], answer:2, explain:"Animal cells are typically tens of micrometres in size."}
            ]},
            {t:"summary", items:["Cells are the smallest units of life.","Cell theory underpins all of biology.","Microscopes make the invisible architecture of life visible."]}
          ]
        },
        {
          id: "cell-organelles",
          title: "Cell Organelles",
          lede: "Inside every cell is a tiny factory. Meet the departments.",
          blocks: [
            {t:"p", text:"**Organelles** are specialised structures inside a cell, each with a job — like departments in a factory."},
            {t:"h2", text:"The essential organelles"},
            {t:"list", items:["**Nucleus** — control centre; holds DNA, the instructions for the cell.","**Cell membrane** — selectively lets substances in and out.","**Cytoplasm** — jelly-like fluid where most reactions happen.","**Mitochondria** — release energy from glucose (respiration).","**Ribosomes** — build proteins.","**Chloroplasts** (plants only) — where photosynthesis happens.","**Cell wall** (plants only) — rigid outer support made of cellulose.","**Vacuole** — storage; large and permanent in plant cells."]},
            {t:"diagram", caption:"A generalised animal cell showing the nucleus, mitochondria, cell membrane, cytoplasm and ribosomes.", svg:"<svg viewBox='0 0 440 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><ellipse cx='220' cy='150' rx='190' ry='125' fill='#fbfbfa' stroke='#1a1a1a' stroke-width='3'/><circle cx='220' cy='150' r='52' fill='#f3f8dc' stroke='#7c9a0c' stroke-width='3'/><circle cx='220' cy='150' r='20' fill='#a3c614'/><text x='220' y='248' text-anchor='middle' font-size='14' font-weight='700'>nucleus</text><ellipse cx='120' cy='100' rx='34' ry='18' fill='#fff' stroke='#8a8a86' stroke-width='2'/><text x='120' y='140' text-anchor='middle' font-size='13'>mitochondrion</text><ellipse cx='330' cy='190' rx='34' ry='18' fill='#fff' stroke='#8a8a86' stroke-width='2'/><text x='330' y='228' text-anchor='middle' font-size='13'>mitochondrion</text><circle cx='150' cy='200' r='4' fill='#1a1a1a'/><circle cx='300' cy='90' r='4' fill='#1a1a1a'/><circle cx='270' cy='215' r='4' fill='#1a1a1a'/><text x='200' y='292' font-size='13' fill='#5f5f5c'>dots = ribosomes · boundary = cell membrane</text></svg>"},
            {t:"callout", kind:"tip", title:"Exam technique", text:"Learn organelles as job pairs: nucleus → instructions, mitochondria → energy, ribosomes → protein, chloroplasts → photosynthesis, membrane → transport."},
            {t:"practice", items:[
              {q:"Which organelle releases energy from glucose, and which process is it?", hint:"The powerhouse of the cell…", answer:"Mitochondria — aerobic respiration."},
              {q:"A student says ribosomes are only found in plant cells. Correct them.", hint:"What do ribosomes make, and which cells need it?", answer:"Wrong — all cells need proteins, so ribosomes are in both plant and animal cells."}
            ]},
            {t:"quiz", questions:[
              {q:"DNA is stored in the…", options:["mitochondrion","nucleus","ribosome","vacuole"], answer:1, explain:"The nucleus holds the cell's genetic instructions."},
              {q:"Which organelle builds proteins?", options:["Chloroplast","Ribosome","Cell wall","Membrane"], answer:1, explain:"Ribosomes synthesise proteins."},
              {q:"Photosynthesis happens in the…", options:["mitochondria","nucleus","chloroplasts","cytoplasm"], answer:2, explain:"Chloroplasts trap light energy for photosynthesis (plants only)."}
            ]},
            {t:"summary", items:["Organelles are specialised cell structures with specific jobs.","Nucleus, mitochondria, ribosomes and membrane are in (almost) all cells.","Chloroplasts and cell walls are plant-only features."]}
          ]
        },
        {
          id: "plant-vs-animal-cells",
          title: "Plant vs Animal Cells",
          lede: "Same basic machinery — but plants carry three extras.",
          blocks: [
            {t:"p", text:"Plant and animal cells share the core organelles: nucleus, cytoplasm, cell membrane, mitochondria and ribosomes. But plant cells have three additional structures that animal cells lack."},
            {t:"h2", text:"The three plant-only features"},
            {t:"list", items:["**Cell wall** — rigid cellulose layer outside the membrane; gives strength and support.","**Chloroplasts** — contain chlorophyll; trap light for photosynthesis.","**Permanent vacuole** — large sap-filled sac; keeps the cell rigid and stores substances."]},
            {t:"p", text:"Why the difference? Plants make their own food (photosynthesis needs chloroplasts) and can't move to find support or water — so they build rigid walls and store water in vacuoles. Animals get energy from food and move around, so flexible membranes suit them better."},
            {t:"callout", kind:"key", title:"Key idea", text:"Structure matches function: every difference between plant and animal cells exists because the two kinds of organism live differently."},
            {t:"practice", items:[
              {q:"Name three structures found in plant cells but not animal cells.", hint:"Wall, green discs, big storage sac.", answer:"Cell wall, chloroplasts, permanent vacuole."},
              {q:"Explain why plant cells need a cell wall but animal cells don't.", hint:"Plants can't move and must support themselves.", answer:"Plants are stationary and need rigid support against gravity and wind; the cellulose wall provides it. Animals move and need flexible cells, so a wall would be a disadvantage."}
            ]},
            {t:"quiz", questions:[
              {q:"Which is found in plant cells but NOT animal cells?", options:["Nucleus","Mitochondrion","Cell wall","Ribosome"], answer:2, explain:"The cellulose cell wall is plant-only."},
              {q:"Chlorophyll is found in the…", options:["vacuole","chloroplasts","nucleus","membrane"], answer:1, explain:"Chloroplasts contain the green pigment chlorophyll."},
              {q:"The permanent vacuole mainly…", options:["makes protein","stores sap and keeps the cell rigid","controls the cell","releases energy"], answer:1, explain:"The large vacuole stores cell sap and maintains turgidity."}
            ]},
            {t:"summary", items:["Plant cells have a cell wall, chloroplasts and a permanent vacuole; animal cells don't.","Both share nucleus, membrane, cytoplasm, mitochondria and ribosomes.","Differences reflect lifestyle: plants photosynthesise and stay put; animals move and eat."]}
          ]
        }
      ]
    }
  ]
},
"physics": {
  name: "Physics",
  icon: "⚛️",
  tagline: "How the universe moves — from falling apples to orbits.",
  intro: "Physics finds the mathematical rules behind motion, forces and energy. We begin with motion itself: how to describe how fast things move and how that changes.",
  learn: ["Speed, velocity and their difference", "Acceleration", "Reading distance–time graphs", "Forces and motion"],
  chapters: [
    {
      id: "motion",
      title: "Motion",
      desc: "Describing how things move: speed, velocity and acceleration.",
      lessons: [
        {
          id: "speed-and-velocity",
          title: "Speed and Velocity",
          lede: "Speed tells you how fast. Velocity tells you how fast and in which direction.",
          blocks: [
            {t:"p", text:"**Speed** is distance travelled per unit time. Its equation is one of the most used in physics:"},
            {t:"code", lang:"Physics", code:"speed = distance ÷ time        (m/s)\n\nExample: a car travels 100 m in 20 s\nspeed = 100 ÷ 20 = 5 m/s"},
            {t:"h2", text:"Speed vs velocity"},
            {t:"p", text:"**Speed** is a **scalar** — it has size only (5 m/s). **Velocity** is a **vector** — size plus direction (5 m/s east). A car driving around a roundabout at constant speed is constantly changing velocity, because its direction keeps changing."},
            {t:"callout", kind:"key", title:"Key idea", text:"Scalar = magnitude only (speed, distance). Vector = magnitude + direction (velocity, displacement). This distinction runs through all of physics."},
            {t:"h2", text:"Rearranging the equation"},
            {t:"p", text:"Cover the quantity you want in the triangle: distance = speed × time, and time = distance ÷ speed."},
            {t:"code", lang:"Physics", code:"How long to travel 1500 m at 25 m/s?\ntime = distance ÷ speed = 1500 ÷ 25 = 60 s"},
            {t:"practice", items:[
              {q:"A cyclist travels 600 m in 2 minutes. Calculate the speed in m/s.", hint:"Convert minutes to seconds first.", answer:"2 min = 120 s. speed = 600 ÷ 120 = 5 m/s."},
              {q:"Explain why a satellite in circular orbit has constant speed but changing velocity.", hint:"What is changing as it orbits?", answer:"Speed is constant (same rate), but direction changes continuously — and velocity includes direction, so velocity changes."}
            ]},
            {t:"quiz", questions:[
              {q:"A runner covers 400 m in 80 s. Speed?", options:["5 m/s","8 m/s","0.2 m/s","320 m/s"], answer:0, explain:"400 ÷ 80 = 5 m/s."},
              {q:"Which is a vector?", options:["Speed","Distance","Velocity","Time"], answer:2, explain:"Velocity has magnitude and direction."},
              {q:"Time for 900 m at 15 m/s?", options:["60 s","13500 s","45 s","90 s"], answer:0, explain:"time = 900 ÷ 15 = 60 s."}
            ]},
            {t:"summary", items:["speed = distance ÷ time; standard unit m/s.","Velocity = speed in a stated direction (a vector).","Rearrange confidently: distance = speed × time."]}
          ]
        },
        {
          id: "acceleration",
          title: "Acceleration",
          lede: "Acceleration is the rate at which velocity changes — speeding up, slowing down, or turning.",
          blocks: [
            {t:"p", text:"**Acceleration** measures how quickly velocity changes. Since velocity includes direction, turning a corner at steady speed is still acceleration."},
            {t:"code", lang:"Physics", code:"acceleration = change in velocity ÷ time taken   (m/s²)\n\na = (v − u) ÷ t\n  v = final velocity, u = starting velocity"},
            {t:"h2", text:"Worked example"},
            {t:"code", lang:"Physics", code:"A car accelerates from 10 m/s to 28 m/s in 6 s.\na = (28 − 10) ÷ 6 = 18 ÷ 6 = 3 m/s²"},
            {t:"p", text:"The unit m/s² reads 'metres per second squared' — velocity (m/s) changing each second."},
            {t:"h2", text:"Deceleration"},
            {t:"p", text:"**Deceleration** is negative acceleration — slowing down. A car braking from 20 m/s to rest in 4 s has acceleration (0 − 20) ÷ 4 = −5 m/s², i.e. a deceleration of 5 m/s²."},
            {t:"callout", kind:"tip", title:"Watch the signs", text:"Keep final minus initial in the right order: (v − u). Swapping them flips the sign of your answer."},
            {t:"practice", items:[
              {q:"A train accelerates from rest to 30 m/s in 15 s. Find the acceleration.", hint:"u = 0.", answer:"a = (30 − 0) ÷ 15 = 2 m/s²."},
              {q:"A cyclist slows from 12 m/s to 4 m/s in 8 s. Calculate the deceleration.", hint:"Compute acceleration first — it will be negative.", answer:"a = (4 − 12) ÷ 8 = −1 m/s², so deceleration = 1 m/s²."}
            ]},
            {t:"quiz", questions:[
              {q:"Unit of acceleration?", options:["m/s","m/s²","m","s²"], answer:1, explain:"Velocity change (m/s) per second gives m/s²."},
              {q:"A car rounds a bend at constant speed. Is it accelerating?", options:["No — speed is constant","Yes — direction changes","Only if it's fast","Impossible to say"], answer:1, explain:"Velocity includes direction, so turning means velocity changes."},
              {q:"v = 25 m/s, u = 5 m/s, t = 10 s. a = ?", options:["2 m/s²","3 m/s²","20 m/s²","250 m/s²"], answer:0, explain:"(25 − 5) ÷ 10 = 2 m/s²."}
            ]},
            {t:"summary", items:["a = (v − u) ÷ t, in m/s².","Any change of speed OR direction is acceleration.","Deceleration is simply negative acceleration."]}
          ]
        },
        {
          id: "distance-time-graphs",
          title: "Distance–Time Graphs",
          lede: "The slope of the line is the speed. Learn to read motion at a glance.",
          blocks: [
            {t:"p", text:"A **distance–time graph** plots distance from the start (vertical axis) against time (horizontal axis). Its shape tells the whole story of a journey."},
            {t:"h2", text:"Reading the shapes"},
            {t:"list", items:["**Flat horizontal line** — stationary (distance not changing).","**Straight diagonal line** — constant speed.","**Steeper line** — faster speed.","**Curve** — changing speed (accelerating)."]},
            {t:"diagram", caption:"A distance–time graph: OA shows fast constant speed, AB is stationary, BC is slower constant speed.", svg:"<svg viewBox='0 0 440 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><line x1='60' y1='20' x2='60' y2='250' stroke='#1a1a1a' stroke-width='2'/><line x1='60' y1='250' x2='410' y2='250' stroke='#1a1a1a' stroke-width='2'/><text x='30' y='140' font-size='13' fill='#5f5f5c' transform='rotate(-90 30 140)'>distance</text><text x='220' y='278' font-size='13' fill='#5f5f5c' text-anchor='middle'>time</text><polyline points='60,250 170,110 260,110 400,190' fill='none' stroke='#7c9a0c' stroke-width='4'/><circle cx='170' cy='110' r='6' fill='#a3c614'/><circle cx='260' cy='110' r='6' fill='#a3c614'/><text x='115' y='170' font-size='14' font-weight='700'>A</text><text x='215' y='90' font-size='14' font-weight='700'>B</text><text x='330' y='165' font-size='14' font-weight='700'>C</text><text x='70' y='290' font-size='12' fill='#5f5f5c'>O→A: fast · A→B: stopped · B→C: slower</text></svg>"},
            {t:"h2", text:"Calculating speed from the graph"},
            {t:"p", text:"Speed = gradient = rise ÷ run. Pick two points on a straight section: (change in distance) ÷ (change in time)."},
            {t:"code", lang:"Physics", code:"Section O→A: distance 0→80 m, time 0→20 s\nspeed = 80 ÷ 20 = 4 m/s\n\nSection B→C: distance 80→120 m, time 40→70 s\nspeed = 40 ÷ 30 ≈ 1.3 m/s"},
            {t:"callout", kind:"tip", title:"Exam technique", text:"Show your working: write the two coordinates you used, then the division. Even if the arithmetic slips, the method earns marks."},
            {t:"practice", items:[
              {q:"On a distance–time graph, what does a horizontal line mean?", hint:"Distance isn't changing…", answer:"The object is stationary."},
              {q:"A section rises 60 m over 30 s. What is the speed?", hint:"Gradient = rise ÷ run.", answer:"60 ÷ 30 = 2 m/s."}
            ]},
            {t:"quiz", questions:[
              {q:"On a distance–time graph, speed is found from the…", options:["area under the line","gradient of the line","intercept","colour"], answer:1, explain:"Speed = change in distance ÷ change in time = gradient."},
              {q:"A steeper distance–time line means…", options:["slower speed","greater speed","stationary object","going backwards"], answer:1, explain:"More distance per unit time = steeper gradient = faster."},
              {q:"A curve bending upwards shows…", options:["constant speed","acceleration","stopping","zero distance"], answer:1, explain:"Increasing gradient means increasing speed — acceleration."}
            ]},
            {t:"summary", items:["Distance–time graphs plot distance against time.","Gradient = speed; flat = stationary; steeper = faster.","Calculate speed from any straight section with rise ÷ run."]}
          ]
        }
      ]
    }
  ]
},
"chemistry": {
  name: "Chemistry",
  icon: "🧪",
  tagline: "What matter is made of — and how it transforms.",
  intro: "Chemistry explains the material world. We begin with the atom — the tiny particle everything is built from — and the periodic table that organises all the elements.",
  learn: ["The structure of the atom", "Protons, neutrons and electrons", "The periodic table", "Electron shells"],
  chapters: [
    {
      id: "atomic-structure",
      title: "Atomic Structure",
      desc: "Protons, neutrons, electrons — and how they're arranged.",
      lessons: [
        {
          id: "atoms-and-elements",
          title: "Atoms and Elements",
          lede: "Everything around you is made of atoms — tiny, and mostly empty space.",
          blocks: [
            {t:"p", text:"An **atom** is the smallest particle of an **element** that still has that element's properties. An **element** is a substance made of only one type of atom — like oxygen, iron or gold."},
            {t:"h2", text:"Inside the atom"},
            {t:"list", items:["**Protons** — positive charge (+1), in the nucleus. Mass 1.","**Neutrons** — no charge, in the nucleus. Mass 1.","**Electrons** — negative charge (−1), orbiting the nucleus. Mass ~1/2000 (negligible)."]},
            {t:"p", text:"The **nucleus** (protons + neutrons) holds almost all the atom's mass but is tiny — if an atom were a football stadium, the nucleus would be a marble at the centre."},
            {t:"diagram", caption:"A simple atomic model: the nucleus of protons and neutrons, with electrons in shells around it.", svg:"<svg viewBox='0 0 400 260' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><circle cx='200' cy='130' r='80' fill='none' stroke='#e9e9e4' stroke-width='2'/><circle cx='200' cy='130' r='115' fill='none' stroke='#e9e9e4' stroke-width='2'/><circle cx='200' cy='130' r='34' fill='#f3f8dc' stroke='#7c9a0c' stroke-width='3'/><text x='200' y='126' text-anchor='middle' font-size='13' font-weight='700'>6p⁺</text><text x='200' y='144' text-anchor='middle' font-size='13' font-weight='700'>6n⁰</text><circle cx='200' cy='50' r='9' fill='#1a1a1a'/><circle cx='272' cy='165' r='9' fill='#1a1a1a'/><circle cx='128' cy='165' r='9' fill='#1a1a1a'/><circle cx='200' cy='15' r='9' fill='#1a1a1a'/><circle cx='306' cy='88' r='9' fill='#1a1a1a'/><circle cx='94' cy='88' r='9' fill='#1a1a1a'/><text x='200' y='240' text-anchor='middle' font-size='14' fill='#5f5f5c'>carbon atom: 6 protons, 6 neutrons, 6 electrons</text></svg>"},
            {t:"callout", kind:"key", title:"Key idea", text:"Atoms are electrically neutral: protons = electrons. Lose or gain electrons and the atom becomes a charged ion."},
            {t:"practice", items:[
              {q:"How many protons, neutrons and electrons does a neutral carbon atom have? (Atomic number 6, mass number 12.)", hint:"Protons = atomic number; neutrons = mass − atomic number.", answer:"6 protons, 6 neutrons (12−6), 6 electrons (neutral atom)."},
              {q:"Why is most of the atom empty space?", hint:"Compare the nucleus to the electron shells.", answer:"The nucleus holds nearly all the mass but is ~10,000× smaller than the atom; electrons occupy shells far from it, so the volume is mostly empty."}
            ]},
            {t:"quiz", questions:[
              {q:"Which particles are in the nucleus?", options:["Protons and electrons","Protons and neutrons","Neutrons and electrons","Electrons only"], answer:1, explain:"The nucleus contains protons and neutrons; electrons orbit outside."},
              {q:"Charge of a neutron?", options:["+1","−1","0","It varies"], answer:2, explain:"Neutrons are neutral — hence the name."},
              {q:"A neutral atom has 8 protons. How many electrons?", options:["8","16","0","4"], answer:0, explain:"Neutral means equal protons and electrons: 8."}
            ]},
            {t:"summary", items:["Atoms = protons + neutrons (nucleus) + electrons (shells).","An element contains only one type of atom.","Neutral atoms have equal protons and electrons."]}
          ]
        },
        {
          id: "the-periodic-table",
          title: "The Periodic Table",
          lede: "All 118 elements, organised by the genius of Dmitri Mendeleev.",
          blocks: [
            {t:"p", text:"The **periodic table** arranges all known elements in order of **atomic (proton) number**. Elements with similar properties fall into the same **groups** (columns) — that's why it's called 'periodic': patterns repeat."},
            {t:"h2", text:"Groups and periods"},
            {t:"list", items:["**Groups** (vertical columns, 1–7 plus 0): elements in a group react similarly because they have the same number of outer electrons.","**Periods** (horizontal rows): tell you how many electron shells the atom has.","**Group 1** — alkali metals: soft, reactive metals.","**Group 7** — halogens: reactive non-metals.","**Group 0** — noble gases: unreactive, full outer shells."]},
            {t:"callout", kind:"tip", title:"Mendeleev's leap", text:"In 1869 Mendeleev left gaps in his table for elements nobody had discovered — and predicted their properties. When they were found, his predictions were right. A great theory predicts, not just describes."},
            {t:"h2", text:"Metals vs non-metals"},
            {t:"p", text:"A zigzag 'staircase' divides the table: **metals** (left — shiny, conductive, malleable) from **non-metals** (right — dull, poor conductors, brittle as solids)."},
            {t:"practice", items:[
              {q:"An element is in Group 1, Period 3. How many electron shells does it have, and how many outer electrons?", hint:"Period = shells; group = outer electrons.", answer:"3 shells, 1 outer electron (that's sodium, Na)."},
              {q:"Why are Group 0 elements unreactive?", hint:"Think about their outer shells.", answer:"They have full outer electron shells, which is a very stable arrangement — they have no tendency to gain, lose or share electrons."}
            ]},
            {t:"quiz", questions:[
              {q:"Elements are ordered in the periodic table by…", options:["mass","alphabet","atomic (proton) number","discovery date"], answer:2, explain:"The modern table is ordered by proton number."},
              {q:"Elements in the same group have similar…", options:["masses","colours","chemical properties","names"], answer:2, explain:"Same number of outer electrons → similar reactions."},
              {q:"Which group contains the noble gases?", options:["Group 1","Group 7","Group 0","Group 4"], answer:2, explain:"Group 0: helium, neon, argon… all unreactive."}
            ]},
            {t:"summary", items:["Ordered by proton number; groups share properties, periods count shells.","Group 1: alkali metals. Group 7: halogens. Group 0: noble gases.","Metals left, non-metals right of the staircase."]}
          ]
        },
        {
          id: "electron-shells",
          title: "Electrons and Shells",
          lede: "Where electrons sit decides how an atom behaves.",
          blocks: [
            {t:"p", text:"Electrons occupy **shells** (energy levels) around the nucleus. The first shell holds up to **2** electrons; the second and third hold up to **8** each (for the first 20 elements)."},
            {t:"h2", text:"Writing electron configurations"},
            {t:"p", text:"Fill the innermost shell first:"},
            {t:"code", lang:"Chemistry", code:"Sodium (Na), 11 electrons:  2, 8, 1\nChlorine (Cl), 17 electrons: 2, 8, 7\nNeon (Ne), 10 electrons:     2, 8      (full outer shell!)"},
            {t:"h2", text:"Why it matters: reactivity"},
            {t:"p", text:"Atoms react to achieve a **full outer shell** (usually 8 electrons — the **octet rule**). Sodium (2,8,1) loses its single outer electron easily → reactive metal. Chlorine (2,8,7) desperately wants one more → reactive non-metal. Neon (2,8) is already full → does nothing."},
            {t:"callout", kind:"key", title:"Key idea", text:"Chemistry is the quest for full outer shells. Almost every reaction you meet is atoms gaining, losing or sharing electrons to get there."},
            {t:"practice", items:[
              {q:"Write the electron configuration of magnesium (12 electrons).", hint:"Fill 2, then 8, then the rest.", answer:"2, 8, 2."},
              {q:"Oxygen is 2,6. Will it tend to gain or lose electrons, and how many?", hint:"Which is closer — 8 or 0?", answer:"Gain 2 electrons to reach a full outer shell of 8 (forming O²⁻)."}
            ]},
            {t:"quiz", questions:[
              {q:"Maximum electrons in the second shell?", options:["2","8","18","10"], answer:1, explain:"Shell capacities: 2, 8, 8 (for the first 20 elements)."},
              {q:"Calcium has 20 electrons. Its configuration is…", options:["2,8,8,2","2,8,10","2,18","2,8,8"], answer:0, explain:"Fill in order: 2, then 8, then 8, leaving 2."},
              {q:"Atoms react in order to get…", options:["more protons","a full outer shell","fewer neutrons","a bigger nucleus"], answer:1, explain:"A full outer shell (octet) is the stable arrangement atoms seek."}
            ]},
            {t:"summary", items:["Shells fill 2, 8, 8 (first 20 elements).","Outer electrons decide an element's group and reactivity.","Reactions are atoms chasing full outer shells."]}
          ]
        }
      ]
    }
  ]
}
,
"english": {
  name: "English",
  icon: "📚",
  tagline: "Read deeply, write clearly, argue persuasively.",
  intro: "English is about understanding how language works — how writers create meaning, and how you can express your own ideas with precision and power.",
  learn: ["Analysing texts and identifying themes", "Writing structured essays", "Grammar and vocabulary", "Persuasive and creative writing"],
  chapters: [
    {
      id: "reading-skills",
      title: "Reading Skills",
      desc: "How to read like a critic, not just a reader.",
      lessons: [
        {
          id: "understanding-theme",
          title: "Understanding Theme",
          lede: "The theme is what a text is really about — beneath the plot.",
          blocks: [
            {t:"p", text:"The **plot** is what happens. The **theme** is what the text is *about* underneath: love, power, identity, justice, growing up. A story about a school football match might really be about loyalty."},
            {t:"h2", text:"Finding the theme"},
            {t:"list", items:["**Ask**: what does the main character learn or struggle with?","**Look for repetition**: images, words or situations that keep returning.","**Check the ending**: what has changed, and what does that suggest?","**One sentence test**: can you state the theme as a full sentence? 'This novel shows that…'"]},
            {t:"callout", kind:"key", title:"Key idea", text:"Theme is always a statement, never a single word. 'Friendship' is a topic; 'friendship demands sacrifice' is a theme."},
            {t:"h2", text:"Example"},
            {t:"p", text:"In a story where a girl gives up her prize so her injured friend can compete, the topic is competition — but the theme is that *loyalty matters more than winning*. Notice the theme is a claim you could argue about."},
            {t:"practice", items:[
              {q:"Turn the topic 'courage' into a theme statement.", hint:"Make it a full sentence with a claim.", answer:"Example: 'Courage means acting despite fear, not without it.'"},
              {q:"A character lies to protect a friend, then confesses. Suggest a theme.", hint:"What is the story saying about honesty?", answer:"Example: 'Honesty ultimately matters more than comfort' — the confession shows truth winning out."}
            ]},
            {t:"quiz", questions:[
              {q:"Theme is best defined as…", options:["what happens in the story","the underlying message or idea","the main character","the setting"], answer:1, explain:"Theme is the deeper meaning beneath the plot."},
              {q:"Which is a theme (not just a topic)?", options:["War","Power corrupts those who seek it","Family","School"], answer:1, explain:"Only this is a full statement making a claim."},
              {q:"A good way to test a theme is…", options:["counting pages","stating it as 'this text shows that…'","asking the author","reading faster"], answer:1, explain:"If you can phrase it as a claim about the text, you've found a theme."}
            ]},
            {t:"summary", items:["Plot = what happens; theme = what it means.","State themes as full sentences, not single words.","Look for repetition, character change and the ending's message."]}
          ]
        }
      ]
    },
    { id: "writing-skills", title: "Writing Skills", desc: "Essays, stories and arguments that land.", lessons: [] },
    { id: "grammar-vocabulary", title: "Grammar & Vocabulary", desc: "The mechanics of powerful sentences.", lessons: [] }
  ]
},
"history": {
  name: "History",
  icon: "🏛️",
  tagline: "How the past made the present.",
  intro: "History is detective work with evidence. You'll learn to weigh sources, explain causes and consequences, and understand the forces that shaped the modern world.",
  learn: ["Using sources as evidence", "Causes and consequences", "Change and continuity", "Key turning points in modern history"],
  chapters: [
    {
      id: "modern-world",
      title: "The Modern World",
      desc: "Industrialisation and its consequences.",
      lessons: [
        {
          id: "industrial-revolution",
          title: "The Industrial Revolution",
          lede: "In a single lifetime, Britain went from fields to factories — and the world was never the same.",
          blocks: [
            {t:"p", text:"The **Industrial Revolution** (roughly 1760–1840) was the shift from hand production to machine production, beginning in Britain. Steam power, coal and iron transformed how goods were made — and how people lived."},
            {t:"h2", text:"Why Britain first?"},
            {t:"list", items:["**Coal and iron** — abundant raw materials close together.","**Capital** — profits from trade ready to invest.","**Labour** — enclosure had pushed workers off the land into towns.","**Ideas** — a culture of invention and scientific inquiry."]},
            {t:"h2", text:"Consequences"},
            {t:"p", text:"Cities exploded as workers crowded into factory towns — Manchester grew from 25,000 to over 300,000 people in a century. Living conditions were often appalling: overcrowding, disease, child labour. But over time, industrial wealth funded public health, education and eventually political reform."},
            {t:"callout", kind:"key", title:"Key idea", text:"Historians weigh change against continuity and short-term suffering against long-term transformation. Good history avoids simple 'good or bad' verdicts."},
            {t:"practice", items:[
              {q:"Explain two causes of the Industrial Revolution in Britain.", hint:"Think resources and people.", answer:"Any two: abundant coal/iron; capital from trade; available labour from enclosure; inventive culture."},
              {q:"Was the Industrial Revolution 'progress'? Give one argument each way.", hint:"Consider living conditions vs long-term change.", answer:"For: eventually raised living standards, funded public health and education. Against: decades of overcrowding, disease, dangerous child labour."}
            ]},
            {t:"quiz", questions:[
              {q:"The Industrial Revolution began in…", options:["France","Britain","America","Germany"], answer:1, explain:"Britain industrialised first, from around 1760."},
              {q:"Which was NOT a cause?", options:["Abundant coal","Available capital","A ban on machines","Mobile labour force"], answer:2, explain:"Britain encouraged invention; there was no ban on machines."},
              {q:"A key consequence was…", options:["everyone moved to farms","rapid urbanisation","the end of trade","fewer inventions"], answer:1, explain:"Factory towns drew huge populations from the countryside."}
            ]},
            {t:"summary", items:["1760–1840: Britain shifted from hand to machine production.","Causes: coal, iron, capital, labour, ideas.","Consequences: urbanisation, harsh conditions — and long-term transformation."]}
          ]
        }
      ]
    },
    { id: "source-skills", title: "Working with Sources", desc: "How historians use evidence.", lessons: [] },
    { id: "twentieth-century", title: "The Twentieth Century", desc: "World wars, cold war, and decolonisation.", lessons: [] }
  ]
},
"geography": {
  name: "Geography",
  icon: "🌍",
  tagline: "Understanding the planet and our place on it.",
  intro: "Geography connects the physical world — rivers, coasts, climate — with the human world: cities, migration and development.",
  learn: ["Rivers, coasts and landscapes", "Weather and climate", "Population and migration", "Reading maps and data"],
  chapters: [
    {
      id: "physical-geography",
      title: "Physical Geography",
      desc: "How rivers, ice and sea shape the land.",
      lessons: [
        {
          id: "rivers-and-erosion",
          title: "Rivers and Erosion",
          lede: "Rivers are nature's sculptors — carving valleys one grain at a time.",
          blocks: [
            {t:"p", text:"A river's journey has three stages. In the **upper course**, steep gradients give fast flow and **vertical erosion**, carving V-shaped valleys and waterfalls. In the **middle course**, the river meanders, eroding sideways. In the **lower course**, slow and wide, it **deposits** material, building floodplains and deltas."},
            {t:"h2", text:"The three processes"},
            {t:"list", items:["**Erosion** — wearing away rock and soil (by hydraulic action, abrasion, attrition, solution).","**Transportation** — carrying the material downstream (traction, saltation, suspension, solution).","**Deposition** — dropping material when the river slows, building new landforms."]},
            {t:"diagram", caption:"The long profile of a river: steep upper course with vertical erosion, gentler middle course with meanders, flat lower course with deposition.", svg:"<svg viewBox='0 0 520 220' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><path d='M30 40 C 150 60, 220 90, 300 130 S 430 180, 490 185' fill='none' stroke='#7c9a0c' stroke-width='5'/><line x1='30' y1='205' x2='490' y2='205' stroke='#e9e9e4' stroke-width='2'/><text x='90' y='120' font-size='13' font-weight='700'>upper</text><text x='82' y='138' font-size='12' fill='#5f5f5c'>V-valleys,</text><text x='82' y='154' font-size='12' fill='#5f5f5c'>waterfalls</text><text x='240' y='165' font-size='13' font-weight='700'>middle</text><text x='232' y='183' font-size='12' fill='#5f5f5c'>meanders</text><text x='400' y='165' font-size='13' font-weight='700'>lower</text><text x='388' y='183' font-size='12' fill='#5f5f5c'>floodplains,</text><text x='398' y='199' font-size='12' fill='#5f5f5c'>deltas</text></svg>"},
            {t:"callout", kind:"key", title:"Key idea", text:"Energy decides everything: fast water erodes, slow water deposits. Follow the energy and you can predict the landform."},
            {t:"practice", items:[
              {q:"Why are valleys V-shaped in the upper course but wide and flat in the lower course?", hint:"Compare vertical erosion with deposition.", answer:"Upper course: steep gradient, high energy → vertical erosion cuts down, making V-valleys. Lower course: gentle gradient, low energy → deposition builds wide floodplains."},
              {q:"Name the four types of erosion.", hint:"H, A, A, S.", answer:"Hydraulic action, abrasion, attrition, solution."}
            ]},
            {t:"quiz", questions:[
              {q:"In which course does the most deposition happen?", options:["Upper","Middle","Lower","Source"], answer:2, explain:"The slow, flat lower course drops its load."},
              {q:"A waterfall retreats upstream because of…", options:["deposition","erosion at the plunge pool","evaporation","tides"], answer:1, explain:"Hydraulic action and abrasion undercut the waterfall, collapsing the lip upstream."},
              {q:"Meanders form mainly in the…", options:["upper course","middle course","delta","estuary mouth"], answer:1, explain:"Gentler gradients allow lateral (sideways) erosion into bends."}
            ]},
            {t:"summary", items:["Rivers erode, transport and deposit — energy decides which.","Upper: V-valleys. Middle: meanders. Lower: floodplains and deltas.","Learn processes as systems: inputs, flows and outputs."]}
          ]
        }
      ]
    },
    { id: "weather-climate", title: "Weather & Climate", desc: "What drives our atmosphere.", lessons: [] },
    { id: "human-geography", title: "Human Geography", desc: "People, cities and development.", lessons: [] }
  ]
},
"economics": {
  name: "Economics",
  icon: "📈",
  tagline: "How societies choose what to make, and who gets it.",
  intro: "Economics studies choice under scarcity. You'll start with the most powerful model in the subject: supply and demand.",
  learn: ["Supply and demand", "How prices are set", "Markets and competition", "Economic decision-making"],
  chapters: [
    {
      id: "microeconomics",
      title: "Microeconomics",
      desc: "Individuals, firms and markets.",
      lessons: [
        {
          id: "supply-and-demand",
          title: "Supply and Demand",
          lede: "One diagram explains why prices move. Master it and you master microeconomics.",
          blocks: [
            {t:"p", text:"**Demand** is how much of a good buyers want at each price — it slopes **downward**: lower price, higher quantity demanded. **Supply** is how much sellers offer at each price — it slopes **upward**: higher price, higher quantity supplied."},
            {t:"h2", text:"Equilibrium"},
            {t:"p", text:"Where the curves cross is **equilibrium**: quantity demanded equals quantity supplied, at the **equilibrium price**. If price is above equilibrium, there's a **surplus** (unsold goods push price down). Below it, a **shortage** (queues push price up)."},
            {t:"diagram", caption:"Supply and demand: the curves cross at equilibrium price P* and quantity Q*.", svg:"<svg viewBox='0 0 420 300' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif'><line x1='60' y1='20' x2='60' y2='260' stroke='#1a1a1a' stroke-width='2'/><line x1='60' y1='260' x2='400' y2='260' stroke='#1a1a1a' stroke-width='2'/><text x='28' y='150' font-size='13' fill='#5f5f5c' transform='rotate(-90 28 150)'>price</text><text x='230' y='288' font-size='13' fill='#5f5f5c' text-anchor='middle'>quantity</text><line x1='90' y1='230' x2='370' y2='60' stroke='#1a1a1a' stroke-width='3'/><text x='375' y='55' font-size='14' font-weight='700'>S</text><line x1='90' y1='60' x2='370' y2='230' stroke='#7c9a0c' stroke-width='3'/><text x='375' y='245' font-size='14' font-weight='700' fill='#4c6106'>D</text><line x1='60' y1='145' x2='230' y2='145' stroke='#8a8a86' stroke-dasharray='6 5'/><line x1='230' y1='145' x2='230' y2='260' stroke='#8a8a86' stroke-dasharray='6 5'/><circle cx='230' cy='145' r='7' fill='#a3c614'/><text x='40' y='150' font-size='13' font-weight='700'>P*</text><text x='222' y='280' font-size='13' font-weight='700'>Q*</text></svg>"},
            {t:"h2", text:"Shifts vs movements"},
            {t:"p", text:"A **movement along** the curve happens when price changes. A **shift of** the whole curve happens when something else changes — consumer incomes, tastes, input costs, technology. Example: a heatwave shifts demand for ice cream right; price and quantity both rise."},
            {t:"callout", kind:"key", title:"Key idea", text:"Price changes move you along the curves. Everything else shifts the curves. Confusing the two is the classic exam trap."},
            {t:"practice", items:[
              {q:"A new factory makes phone production cheaper. What happens to supply, price and quantity?", hint:"Lower costs shift which curve, which way?", answer:"Supply shifts right; equilibrium price falls; quantity rises."},
              {q:"Why does a surplus push prices down?", hint:"What do sellers with unsold stock do?", answer:"Sellers cut prices to clear unsold stock; competition between sellers drives the price down toward equilibrium."}
            ]},
            {t:"quiz", questions:[
              {q:"The demand curve slopes downward because…", options:["sellers are generous","lower prices mean higher quantity demanded","of government rules","supply is fixed"], answer:1, explain:"The law of demand: price and quantity demanded move in opposite directions."},
              {q:"At a price above equilibrium there is a…", options:["shortage","surplus","equilibrium","shift"], answer:1, explain:"Quantity supplied exceeds quantity demanded — unsold goods."},
              {q:"Higher consumer incomes (for a normal good)…", options:["move along demand","shift demand right","shift supply left","change the price only"], answer:1, explain:"Incomes aren't price, so the whole demand curve shifts."}
            ]},
            {t:"summary", items:["Demand slopes down, supply slopes up; they cross at equilibrium.","Surplus → price falls; shortage → price rises.","Price changes cause movements; other factors cause shifts."]}
          ]
        }
      ]
    },
    { id: "macroeconomics", title: "Macroeconomics", desc: "Whole economies: growth, inflation, unemployment.", lessons: [] }
  ]
},
"business": {
  name: "Business",
  icon: "💼",
  tagline: "How organisations create value — and profit.",
  intro: "Business studies how firms start, grow and compete — from spotting an opportunity to managing money and people.",
  learn: ["What businesses do and why", "Entrepreneurship", "Marketing basics", "Finance fundamentals"],
  chapters: [
    {
      id: "business-basics",
      title: "Business Basics",
      desc: "The foundations every firm is built on.",
      lessons: [
        {
          id: "what-is-a-business",
          title: "What is a Business?",
          lede: "A business turns inputs into outputs people will pay for. Everything else is detail.",
          blocks: [
            {t:"p", text:"A **business** is an organisation that produces goods or services to meet **customer needs**, usually aiming to make a **profit**. It combines four **factors of production**: land, labour, capital and enterprise."},
            {t:"h2", text:"The factors of production"},
            {t:"list", items:["**Land** — natural resources: raw materials, premises, location.","**Labour** — human effort and skill.","**Capital** — machinery, tools, money invested.","**Enterprise** — the entrepreneur's risk-taking and organisation."]},
            {t:"h2", text:"Why do businesses exist?"},
            {t:"p", text:"Beyond profit, businesses have **objectives**: survival (year one), growth, market share, customer satisfaction, or social and ethical goals. A social enterprise, for instance, prioritises community benefit over maximising profit."},
            {t:"callout", kind:"key", title:"Key idea", text:"Profit = revenue − costs. Revenue is the money coming in; profit is what remains. A business can have huge sales and still fail if costs are higher."},
            {t:"practice", items:[
              {q:"A bakery's revenue is £60,000 and its costs are £45,000. Calculate profit.", hint:"Profit = revenue − costs.", answer:"£15,000."},
              {q:"Classify each as land, labour, capital or enterprise: ovens, bakers, flour, the founder's idea.", hint:"Tools → capital; people → labour…", answer:"Ovens: capital. Bakers: labour. Flour: land (natural resource). Founder's idea: enterprise."}
            ]},
            {t:"quiz", questions:[
              {q:"Profit is calculated as…", options:["revenue + costs","revenue − costs","costs − revenue","revenue × costs"], answer:1, explain:"Profit is what's left after costs are subtracted from revenue."},
              {q:"Which is the 'enterprise' factor?", options:["The factory","The workers","The founder's risk-taking","The raw materials"], answer:2, explain:"Enterprise is the entrepreneurial input: organising and taking risks."},
              {q:"A social enterprise mainly aims to…", options:["maximise shareholder profit","benefit the community","avoid all costs","eliminate competitors"], answer:1, explain:"Social enterprises prioritise social objectives, reinvesting surpluses."}
            ]},
            {t:"summary", items:["Businesses combine land, labour, capital and enterprise.","Profit = revenue − costs; don't confuse revenue with profit.","Objectives vary: profit, growth, survival, social impact."]}
          ]
        }
      ]
    },
    { id: "marketing", title: "Marketing", desc: "Understanding customers and reaching them.", lessons: [] },
    { id: "finance", title: "Finance", desc: "Money in, money out.", lessons: [] }
  ]
},
"languages": {
  name: "Languages",
  icon: "💬",
  tagline: "New words, new worlds.",
  intro: "Learning a language rewires how you think. Start with Spanish — the world's second most-spoken native language — with greetings, essentials and real conversation patterns.",
  learn: ["Greetings and introductions", "Essential everyday phrases", "Pronunciation foundations", "Basic grammar patterns"],
  chapters: [
    {
      id: "spanish-basics",
      title: "Spanish Basics",
      desc: "Your first steps in español.",
      lessons: [
        {
          id: "greetings-and-introductions",
          title: "Greetings and Introductions",
          lede: "¡Hola! Every conversation starts here.",
          blocks: [
            {t:"p", text:"Spanish greetings change with the time of day — and getting them right instantly makes you sound natural."},
            {t:"h2", text:"Essential greetings"},
            {t:"list", items:["**¡Hola!** — Hello!","**Buenos días** — Good morning (until midday).","**Buenas tardes** — Good afternoon/evening.","**Buenas noches** — Good night (greeting and farewell).","**¿Qué tal?** — How's it going? (informal)","**Adiós** — Goodbye. **¡Hasta luego!** — See you later!"]},
            {t:"h2", text:"Introducing yourself"},
            {t:"code", lang:"Spanish", code:"Me llamo Aaquib.       (My name is Aaquib.)\nSoy estudiante.          (I am a student.)\n¿Y tú?                   (And you?)\nEncantado. / Encantada.  (Pleased to meet you. — o if male, a if female)"},
            {t:"callout", kind:"tip", title:"Pronunciation", text:"Spanish is phonetic — letters sound the same every time. H is always silent (hola = 'ola'), and LL sounds like 'y' (me llamo = 'me yamo')."},
            {t:"h2", text:"A first conversation"},
            {t:"code", lang:"Spanish", code:"A: ¡Hola! ¿Qué tal?\nB: ¡Hola! Muy bien, gracias. ¿Y tú?\nA: Bien también. Me llamo Aaquib. ¿Cómo te llamas?\nB: Me llamo Sara. Encantada.\nA: Encantado. ¡Hasta luego!\nB: ¡Adiós!"},
            {t:"practice", items:[
              {q:"How would you greet someone at 4pm in Spanish?", hint:"Afternoon/evening greeting.", answer:"Buenas tardes."},
              {q:"Introduce yourself in two Spanish sentences.", hint:"Me llamo… Soy…", answer:"Example: Me llamo Aaquib. Soy estudiante."}
            ]},
            {t:"quiz", questions:[
              {q:"'Buenos días' is used…", options:["at night","in the morning","only on Mondays","when leaving"], answer:1, explain:"Buenos días = good morning, used until around midday."},
              {q:"'Me llamo' literally means…", options:["I am called","I like","I live","I want"], answer:0, explain:"Me llamo = 'I call myself' — the standard way to give your name."},
              {q:"The H in 'hola' is…", options:["strongly pronounced","silent","pronounced like 'j'","only pronounced abroad"], answer:1, explain:"H is always silent in Spanish."}
            ]},
            {t:"summary", items:["Match greetings to the time of day: días / tardes / noches.","Me llamo… + Soy… introduces you anywhere.","Spanish pronunciation is consistent — learn the rules once, use them forever."]}
          ]
        }
      ]
    },
    { id: "french-basics", title: "French Basics", desc: "Your first steps in français.", lessons: [] },
    { id: "grammar-foundations", title: "Grammar Foundations", desc: "Patterns that unlock the language.", lessons: [] }
  ]
}
};

/* ---------------- LEARNING PATHS (curated sequences) ---------------- */
const LEARNING_PATHS = [
  {
    id: "python-programming",
    title: "Python Programming Path",
    desc: "From your first print() to a working game: variables, data types, operators, conditions, loops, functions and a final project.",
    subject: "computer-science",
    chapter: "programming-fundamentals",
    firstLesson: "introduction",
    meta: "8 lessons · Computer Science"
  },
  {
    id: "algebra-foundations",
    title: "Algebra Foundations",
    desc: "The grammar of mathematics: what algebra is, how to solve equations, and how to simplify expressions with confidence.",
    subject: "mathematics",
    chapter: "algebra-basics",
    firstLesson: "what-is-algebra",
    meta: "3 lessons · Mathematics"
  },
  {
    id: "cell-biology",
    title: "Cell Biology Explorer",
    desc: "Meet the building blocks of life: what cells are, the organelles inside them, and how plant and animal cells differ.",
    subject: "biology",
    chapter: "cell-biology",
    firstLesson: "what-is-a-cell",
    meta: "3 lessons · Biology"
  },
  {
    id: "motion-physics",
    title: "Motion in Physics",
    desc: "Describe how things move: speed and velocity, acceleration, and reading distance–time graphs like a physicist.",
    subject: "physics",
    chapter: "motion",
    firstLesson: "speed-and-velocity",
    meta: "3 lessons · Physics"
  }
];
