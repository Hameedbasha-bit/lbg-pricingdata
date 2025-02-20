import dotenv from 'dotenv';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bigqueryConfigPath = join(__dirname, 'bigquery-config.json');
const bigqueryConfig = JSON.parse(fs.readFileSync(bigqueryConfigPath, 'utf8'));

export const config = {
  port: process.env.PORT || 3000,
  projectId: bigqueryConfig.projectId,
  keyFilename: bigqueryConfig.keyFilename,
};
