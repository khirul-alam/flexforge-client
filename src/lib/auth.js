import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'flexforge_better_auth_secret_2026_xK9mP3nQ',

  baseURL: process.env.BETTER_AUTH_URL || 'https://flexforge-client.vercel.app',

  database: mongodbAdapter(client.db(process.env.DB_NAME || 'flexforgeDB')),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
      },
    },
  },
});