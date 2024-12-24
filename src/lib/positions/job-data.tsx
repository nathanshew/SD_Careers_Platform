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
  },
  "blockchain-developer": {
    title: "Blockchain Developer",
    department: "Technology",
    semester: "Semester 2",
    positionsAvailable: "1-2 Positions Available",
    description: "As a blockchain developer, you will work on developing and deploying blockchain-based applications. You will gain hands-on experience with blockchain technologies such as Ethereum, Hyperledger, and Corda.",
    requirements: "Strong programming skills in Solidity, Python, or Java, understanding of blockchain concepts and protocols"
},

"cybersecurity-analyst": {
    title: "Cybersecurity Analyst",
    department: "Technology",
    semester: "Semester 1",
    positionsAvailable: "1-2 Positions Available",
    description: "As a cybersecurity analyst, you will identify, assess, and mitigate cybersecurity risks. You will work on projects such as vulnerability assessments, penetration testing, and incident response.",
    requirements: "Understanding of cybersecurity principles, experience with security tools (e.g., Kali Linux, Metasploit), knowledge of networking concepts"
},

"quant-analyst": {
    title: "Quantitative Analyst",
    department: "Finance",
    semester: "Semester 2",
    positionsAvailable: "1-2 Positions Available",
    description: "As a quantitative analyst, you will develop quantitative models to analyze financial markets and make investment decisions. You will work on projects such as algorithmic trading, risk modeling, and portfolio optimization.",
    requirements: "Strong mathematical and statistical skills, programming skills in Python or R, knowledge of financial modeling techniques"
},

"product-manager": {
    title: "Product Manager",
    department: "Product",
    semester: "Semester 1",
    positionsAvailable: "1-2 Positions Available",
    description: "As a product manager, you will define product strategy, manage product development, and launch new products. You will work closely with engineering, design, and marketing teams to bring products to market.",
    requirements: "Strong product sense, excellent communication and leadership skills, experience with product management methodologies (e.g., Agile, Scrum)"
},

"user-experience-researcher": {
    title: "User Experience Researcher",
    department: "Design",
    semester: "Semester 1",
    positionsAvailable: "1-2 Positions Available",
    description: "As a user experience researcher, you will conduct user research to understand user needs and behaviors. You will use qualitative and quantitative research methods to inform design decisions.",
    requirements: "Strong understanding of user research methodologies, experience with user testing and surveys, excellent communication and analytical skills"
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