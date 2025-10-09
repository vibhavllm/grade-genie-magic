// Quick demo data for all features
export const sampleData = {
  lessonPlans: [
    { topic: "Photosynthesis", grade: "Grade 8", subject: "Biology", duration: "45 minutes" },
    { topic: "Quadratic Equations", grade: "Grade 10", subject: "Mathematics", duration: "60 minutes" },
    { topic: "Newton's Laws of Motion", grade: "Grade 11", subject: "Physics", duration: "50 minutes" },
  ],
  questionPapers: [
    { 
      subject: "Mathematics", 
      grade: "Grade 10", 
      totalMarks: "100", 
      duration: "3 hours",
      books: "NCERT Mathematics Part 1 & 2",
      chapters: [
        { name: "Algebra", weight: 30 },
        { name: "Trigonometry", weight: 25 },
        { name: "Geometry", weight: 25 },
        { name: "Statistics", weight: 20 }
      ]
    },
    { 
      subject: "Physics", 
      grade: "Grade 11", 
      totalMarks: "80", 
      duration: "2.5 hours",
      books: "NCERT Physics Part 1",
      chapters: [
        { name: "Mechanics", weight: 35 },
        { name: "Thermodynamics", weight: 30 },
        { name: "Waves", weight: 35 }
      ]
    },
    { 
      subject: "Chemistry", 
      grade: "Grade 12", 
      totalMarks: "100", 
      duration: "3 hours",
      books: "NCERT Chemistry Part 1 & 2",
      chapters: [
        { name: "Organic Chemistry", weight: 40 },
        { name: "Inorganic Chemistry", weight: 30 },
        { name: "Physical Chemistry", weight: 30 }
      ]
    },
  ],
  classes: [
    { className: "Grade 10-A", subject: "Mathematics", students: 32, topic: "Quadratic Equations" },
    { className: "Grade 11-B", subject: "Physics", students: 28, topic: "Thermodynamics" },
    { className: "Grade 9-C", subject: "Biology", students: 30, topic: "Cell Division" },
  ],
  topics: [
    "Photosynthesis",
    "Newton's Laws of Motion",
    "Periodic Table",
    "Quadratic Equations",
    "Shakespearean Literature",
    "World War II"
  ],
  questions: [
    "Discuss the impact of climate change on coastal ecosystems (15 marks)",
    "Analyze the causes and effects of the Industrial Revolution (20 marks)",
    "Explain the process of cellular respiration with diagrams (10 marks)",
  ]
};

export const sampleFiles = {
  syllabus: "Sample_Syllabus_Grade10_Math.pdf",
  questionPaper: "Math_Final_Exam_2024.pdf",
  document: "Physics_Chapter5_Notes.pdf"
};
