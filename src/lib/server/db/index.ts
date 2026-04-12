import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

export const db = drizzle(env.D1_DATABASE, { schema });
