// Of course, I use ChatGPT.
export const JobData: {[position: string]: JobDataType} = {
  "ui-ux-designer": {
    title: "UI/UX Designer",
    department: "Software Development",
    semester: "Semester 1",
    positionsAvailable: "1-5 Positions Available",
    description: "As a UIUX designer, you will learn from and work closely with a team of designers, engineers, and design lead to create a fit-for-purpose, convenient, and engaging user interface for applications NUS Fintech Society would build.",  

    requirements: "You love tech and love to design!"
  },
  "software-engineer": {
    title: "Software Engineer",
    department: "Software Development",
    semester: "Semester 1",
    positionsAvailable: "5-10 Positions Available",
    description: "As a software engineer, you will be involved in the entire software development lifecycle, from requirements gathering to deployment and maintenance. You will work with a team of talented engineers to build innovative solutions for NUS Fintech Society.",
    requirements: "Strong programming skills in at least one language (e.g., Python, Java, C++)",
  },
  "data-scientist": {
    title: "Data Scientist",
    department: "Data Science",
    semester: "Semester 2",
    positionsAvailable: "2-4 Positions Available",
    description: "As a data scientist, you will leverage your data analysis and machine learning skills to extract valuable insights from large datasets. You will work on projects such as fraud detection, risk assessment, and algorithmic trading.",
    requirements: "Experience with data analysis tools (e.g., Python, R, SQL) and machine learning frameworks (e.g., TensorFlow, PyTorch)",
  },
  "financial-analyst": {
    title: "Financial Analyst",
    department: "Finance",
    semester: "Semester 2",
    positionsAvailable: "2-4 Positions Available",
    description: "As a financial analyst, you will analyze financial data, prepare financial reports, and provide insights to support decision-making. You will work on projects such as valuation, investment analysis, and portfolio management.",
    requirements: "Strong understanding of financial concepts and experience with financial modeling tools (e.g., Excel, Python)",
  },
  "marketing-specialist": {
    title: "Marketing Specialist",
    department: "Marketing",
    semester: "Semester 1",
    positionsAvailable: "2-4 Positions Available",
    description: "As a marketing specialist, you will develop and implement marketing strategies to promote NUS Fintech Society and its initiatives. You will work on projects such as social media campaigns, content creation, and event planning.",
    requirements: "Strong communication and interpersonal skills, experience with social media and digital marketing tools",
  }
};

export type JobDataType = {
    title: string,
    department: string,
    semester: string,
    positionsAvailable: string,
    description: string,
    requirements: string
};