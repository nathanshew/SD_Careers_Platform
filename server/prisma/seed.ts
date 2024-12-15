import { PrismaClient } from '@prisma/client';

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

async function main() {
  await populate_department();
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