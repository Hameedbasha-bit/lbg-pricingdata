import { BigQuery } from '@google-cloud/bigquery';
import { config } from '../config/index.js';

const bigquery = new BigQuery({ keyFilename: config.keyFilename, projectId: config.projectId });

export const fetchData = async (query, location, params = {}) => {
  const options = {
    query: query,
    location: location,
    params: params // Add params to support parameterized queries
  };

  try {
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
    const [rows] = await job.getQueryResults();
    return rows;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const insertData = async (query, location, params) => {
  try {
    const options = { query, location, params };
    const [job] = await bigquery.createQueryJob(options);
    console.log(`Job ${job.id} started.`);
    await job.getQueryResults();
  } catch (error) {
    console.error('Error inserting data:', error);
    throw error;
  }
};
