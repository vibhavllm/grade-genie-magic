export const dummyLessonPlan = {
  title: "Introduction to Photosynthesis",
  grade: "Grade 8",
  subject: "Biology",
  duration: "45 minutes",
  syllabusOutcomes: [
    "Understand the process of photosynthesis",
    "Identify the role of chlorophyll in plants",
    "Explain the importance of light energy"
  ],
  sections: [
    {
      phase: "Introduction (5 min)",
      activities: [
        "Quick quiz on plant structures",
        "Show time-lapse video of plant growth"
      ]
    },
    {
      phase: "Main Teaching (25 min)",
      activities: [
        "Explain the photosynthesis equation: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂",
        "Interactive diagram walkthrough",
        "Group discussion on real-world examples"
      ]
    },
    {
      phase: "Practice (10 min)",
      activities: [
        "Worksheet completion",
        "Pair-share findings"
      ]
    },
    {
      phase: "Conclusion (5 min)",
      activities: [
        "Recap key concepts",
        "Preview next lesson on cellular respiration"
      ]
    }
  ],
  resources: [
    "Whiteboard and markers",
    "Plant diagram poster",
    "Student worksheets",
    "Projector for video"
  ]
};

export const dummyQuestionPaper = {
  title: "Mathematics - Semester 1 Final Exam",
  grade: "Grade 10",
  totalMarks: 100,
  duration: "3 hours",
  sections: [
    {
      name: "Section A: Multiple Choice",
      marks: 20,
      timeAllocation: "30 minutes",
      questions: [
        {
          id: 1,
          question: "What is the value of x in the equation 2x + 5 = 15?",
          options: ["A) 3", "B) 5", "C) 7", "D) 10"],
          marks: 2,
          difficulty: "Easy"
        },
        {
          id: 2,
          question: "Which of the following is a prime number?",
          options: ["A) 15", "B) 21", "C) 29", "D) 35"],
          marks: 2,
          difficulty: "Easy"
        }
      ]
    },
    {
      name: "Section B: Short Answer",
      marks: 40,
      timeAllocation: "60 minutes",
      questions: [
        {
          id: 3,
          question: "Solve the quadratic equation: x² - 5x + 6 = 0",
          marks: 5,
          difficulty: "Medium"
        },
        {
          id: 4,
          question: "Calculate the area of a circle with radius 7cm. (Use π = 22/7)",
          marks: 5,
          difficulty: "Medium"
        }
      ]
    },
    {
      name: "Section C: Long Answer",
      marks: 40,
      timeAllocation: "90 minutes",
      questions: [
        {
          id: 5,
          question: "A train travels 240km at a certain speed. If the speed had been 10km/h more, it would have taken 2 hours less. Find the original speed.",
          marks: 10,
          difficulty: "Hard",
          rubric: [
            "Correct equation setup (3 marks)",
            "Solution steps (5 marks)",
            "Final answer with units (2 marks)"
          ]
        }
      ]
    }
  ],
  blueprint: {
    remembering: 20,
    understanding: 30,
    applying: 30,
    analyzing: 20
  }
};

export const dummyAssignment = {
  title: "Personalized Practice: Quadratic Equations",
  studentName: "Alex Johnson",
  weakTopics: ["Completing the square", "Word problems"],
  masteryLevel: "Intermediate",
  questions: [
    {
      id: 1,
      topic: "Completing the square",
      difficulty: "Medium",
      question: "Solve by completing the square: x² + 6x - 7 = 0",
      hint: "Remember to add (b/2)² to both sides"
    },
    {
      id: 2,
      topic: "Completing the square",
      difficulty: "Medium",
      question: "Express x² - 8x + 3 in the form (x - a)² + b",
      hint: "Find the value of a first"
    },
    {
      id: 3,
      topic: "Word problems",
      difficulty: "Medium",
      question: "The length of a rectangle is 3m more than its width. If the area is 40m², find the dimensions.",
      hint: "Let width = x, then length = x + 3"
    }
  ],
  estimatedTime: "30 minutes",
  dueDate: "2025-10-15"
};

export const dummyTopicSummary = {
  topic: "Newton's Laws of Motion",
  subject: "Physics",
  grade: "Grade 11",
  keyConcepts: [
    {
      law: "First Law (Inertia)",
      description: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      example: "A passenger lurches forward when a bus suddenly stops."
    },
    {
      law: "Second Law (F=ma)",
      description: "The acceleration of an object is directly proportional to the net force and inversely proportional to its mass.",
      example: "It's easier to push an empty shopping cart than a full one."
    },
    {
      law: "Third Law (Action-Reaction)",
      description: "For every action, there is an equal and opposite reaction.",
      example: "Rockets propel upward by expelling gas downward."
    }
  ],
  formulas: [
    "F = ma (Force = mass × acceleration)",
    "p = mv (Momentum = mass × velocity)"
  ],
  quickRevision: [
    "All three laws were published in 1687",
    "Forces are measured in Newtons (N)",
    "Inertia depends on mass",
    "Friction is a force that opposes motion"
  ]
};

export const dummyRubric = {
  questionTitle: "Essay: Discuss the impact of climate change on coastal ecosystems",
  totalMarks: 15,
  criteria: [
    {
      aspect: "Content & Accuracy",
      maxMarks: 6,
      levels: [
        { range: "5-6", description: "Comprehensive, scientifically accurate, multiple relevant examples" },
        { range: "3-4", description: "Good understanding, mostly accurate, some examples" },
        { range: "1-2", description: "Basic understanding, limited accuracy or examples" },
        { range: "0", description: "Insufficient or incorrect content" }
      ]
    },
    {
      aspect: "Analysis & Critical Thinking",
      maxMarks: 5,
      levels: [
        { range: "4-5", description: "Deep analysis, strong connections, evaluates multiple perspectives" },
        { range: "2-3", description: "Some analysis present, makes basic connections" },
        { range: "0-1", description: "Minimal analysis or connections" }
      ]
    },
    {
      aspect: "Organization & Clarity",
      maxMarks: 4,
      levels: [
        { range: "3-4", description: "Well-structured, clear flow, logical progression" },
        { range: "1-2", description: "Basic structure, somewhat clear" },
        { range: "0", description: "Disorganized or unclear" }
      ]
    }
  ],
  scoringNotes: "Deduct 1 mark for every 3 spelling/grammar errors beyond the first 3."
};

export const dummyValidationReport = {
  paperTitle: "Science Midterm Exam - Grade 9",
  overallScore: 87,
  status: "Good with minor improvements needed",
  syllabusAlignment: {
    score: 92,
    coverage: [
      { topic: "Cell Structure", included: true, percentage: 15 },
      { topic: "Photosynthesis", included: true, percentage: 20 },
      { topic: "Respiration", included: true, percentage: 20 },
      { topic: "Genetics", included: false, percentage: 0, warning: "Not covered" },
      { topic: "Ecology", included: true, percentage: 25 }
    ]
  },
  difficultyDistribution: {
    score: 85,
    easy: 30,
    medium: 50,
    hard: 20,
    recommendation: "Consider adding 5% more hard questions for better discrimination"
  },
  duplicateCheck: {
    score: 100,
    duplicatesFound: 0,
    message: "No duplicate questions detected"
  },
  fairnessCheck: {
    score: 78,
    issues: [
      "Question 7 uses culturally specific idiom that may disadvantage ESL students",
      "Consider simplifying language in Question 12"
    ]
  }
};

export const dummySubmissionAnalytics = {
  assignmentTitle: "Algebraic Expressions Worksheet",
  totalStudents: 30,
  submitted: 28,
  pending: 2,
  averageScore: 76,
  completionRate: 93,
  timeAnalysis: {
    averageTime: "22 minutes",
    quickestTime: "12 minutes",
    slowestTime: "45 minutes"
  },
  questionAnalysis: [
    {
      questionNumber: 1,
      averageScore: 4.2,
      maxScore: 5,
      successRate: 84,
      commonMistakes: ["Sign errors in negative terms"]
    },
    {
      questionNumber: 2,
      averageScore: 3.1,
      maxScore: 5,
      successRate: 62,
      commonMistakes: ["Incorrect order of operations", "Factoring errors"]
    }
  ],
  studentFeedback: [
    { student: "Sarah M.", rating: 5, comment: "Clear instructions and good practice" },
    { student: "Tom K.", rating: 4, comment: "Question 4 was a bit confusing" },
    { student: "Emma L.", rating: 5, comment: "Loved the step-by-step examples" }
  ],
  remedialActions: [
    "Schedule extra practice session on factoring (12 students need support)",
    "Review order of operations in next class",
    "Create supplementary worksheet for Question 2 topic"
  ]
};
