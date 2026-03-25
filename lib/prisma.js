require('dotenv').config();

// for dev
// const { PrismaPg } = require('@prisma/adapter-pg');

// for prod
const { neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { PrismaClient } = require('../generated/prisma/client.js');

neonConfig.webSocketConstructor = ws;

const connectionString = `${process.env.DATABASE_URL}`;

// for dev
// const adapter = new PrismaPg({ connectionString });

// for prod
const adapter = new PrismaNeon({ connectionString });

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
