import { PrismaClient, JobStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function populate_department() {
  const ml = await prisma.department.upsert({
    where: { department_name: 'ML' },
    update: {},
    create: {
      department_name: 'ML',
    },
  });

  const sd = await prisma.department.upsert({
    where: { department_name: 'SD' },
    update: {},
    create: {
      department_name: 'SD',
    },
  });

  const internal = await prisma.department.upsert({
    where: { department_name: 'Internal' },
    update: {},
    create: {
      department_name: 'Internal',
    },
  });

  const quant = await prisma.department.upsert({
    where: { department_name: 'Quant' },
    update: {},
    create: {
      department_name: 'Quant',
    },
  });

  console.log({ ml, sd, internal, quant });
}

async function populate_admin() {
  const admin = await prisma.admin.upsert({
    where: { admin_id: 1 },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
    }
  });
  console.log({ admin });
}

async function populate_applicant() {
  const applicant = await prisma.applicant.upsert({
    where: { applicant_id: 1 },
    update: {},
    create: {
      username: 'joe',
      email: 'joe@gmail.com',
    }
  });
  console.log({ applicant });
}

async function populate_jobs() {

  const jobs = [
    {
      title: "UI/UX Designer",
      department_id: 2,
      semester: "Semester 1",
      positionsAvailable: 5,
      description: "As a UIUX designer, you will learn from and work closely with a team of designers, engineers, and design lead to create a fit-for-purpose, convenient, and engaging user interface for applications NUS Fintech Society would build.",  
      requirements: "You love tech and love to design!",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1, 
    },
    {
      title: "Software Engineer",
      department_id: 2,
      semester: "Semester 1",
      positionsAvailable: 10,
      description: "As a software engineer, you will be involved in the entire software development lifecycle, from requirements gathering to deployment and maintenance. You will work with a team of talented engineers to build innovative solutions for NUS Fintech Society.",
      requirements: "Strong programming skills in at least one language (e.g., Python, Java, C++)",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Data Scientist",
      department_id: 1,
      semester: "Semester 2",
      positionsAvailable: 4,
      description: "As a data scientist, you will leverage your data analysis and machine learning skills to extract valuable insights from large datasets. You will work on projects such as fraud detection, risk assessment, and algorithmic trading.",
      requirements: "Experience with data analysis tools (e.g., Python, R, SQL) and machine learning frameworks (e.g., TensorFlow, PyTorch)",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Financial Analyst",
      department_id: 4,
      semester: "Semester 2",
      positionsAvailable: 4,
      description: "As a financial analyst, you will analyze financial data, prepare financial reports, and provide insights to support decision-making. You will work on projects such as valuation, investment analysis, and portfolio management.",
      requirements: "Strong understanding of financial concepts and experience with financial modeling tools (e.g., Excel, Python)",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Marketing Specialist",
      department_id: 3,
      semester: "Semester 1",
      positionsAvailable: 4,
      description: "As a marketing specialist, you will develop and implement marketing strategies to promote NUS Fintech Society and its initiatives. You will work on projects such as social media campaigns, content creation, and event planning.",
      requirements: "Strong communication and interpersonal skills, experience with social media and digital marketing tools",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Blockchain Developer",
      department_id: 4,
      semester: "Semester 2",
      positionsAvailable: 2,
      description: "As a blockchain developer, you will work on developing and deploying blockchain-based applications. You will gain hands-on experience with blockchain technologies such as Ethereum, Hyperledger, and Corda.",
      requirements: "Strong programming skills in Solidity, Python, or Java, understanding of blockchain concepts and protocols",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Cybersecurity Analyst",
      department_id: 1,
      semester: "Semester 1",
      positionsAvailable: 2,
      description: "As a cybersecurity analyst, you will identify, assess, and mitigate cybersecurity risks. You will work on projects such as vulnerability assessments, penetration testing, and incident response.",
      requirements: "Understanding of cybersecurity principles, experience with security tools (e.g., Kali Linux, Metasploit), knowledge of networking concepts",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Quantitative Analyst",
      department_id: 4,
      semester: "Semester 2",
      positionsAvailable: 2,
      description: "As a quantitative analyst, you will develop quantitative models to analyze financial markets and make investment decisions. You will work on projects such as algorithmic trading, risk modeling, and portfolio optimization.",
      requirements: "Strong mathematical and statistical skills, programming skills in Python or R, knowledge of financial modeling techniques",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "Product Manager",
      department_id: 2,
      semester: "Semester 1",
      positionsAvailable: 2,
      description: "As a product manager, you will define product strategy, manage product development, and launch new products. You will work closely with engineering, design, and marketing teams to bring products to market.",
      requirements: "Strong product sense, excellent communication and leadership skills, experience with product management methodologies (e.g., Agile, Scrum)",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    },
    {
      title: "User Experience Researcher",
      department_id: 2,
      semester: "Semester 1",
      positionsAvailable: 2,
      description: "As a user experience researcher, you will conduct user research to understand user needs and behaviors. You will use qualitative and quantitative research methods to inform design decisions.",
      requirements: "Strong understanding of user research methodologies, experience with user testing and surveys, excellent communication and analytical skills",
      deadline: new Date("2024-12-31"),
      status: JobStatus.open,
      created_by: 1,
    }];

    let idCounter = 1;
    jobs.map(async (job) => {
      const jobData = await prisma.job.upsert({
        where: { job_id: idCounter++ },
        update: {},
        create: {
          title: job.title,
          department_id: job.department_id,
          semester: job.semester,
          positionsAvailable: job.positionsAvailable,
          description: job.description,
          requirements: job.requirements,
          deadline: job.deadline,
          status: job.status,
          created_by: job.created_by,
        },
      });
      return jobData;
    }); 

  console.log({ jobs });
}

async function main() {
  await populate_department();
  await populate_admin();
  await populate_jobs();
  await populate_applicant();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });