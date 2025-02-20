import request from 'supertest';
import app from '../server'; // Assuming you have an Express app instance in app.js
import { fetchData, insertData } from '../services/bigqueryService';

jest.mock('../services/bigqueryService');

describe('BigQuery Controller', () => {
  describe('GET /bigquery', () => {
    it('should fetch data from BigQuery', async () => {
      fetchData.mockResolvedValue([{ RECORD_ID: '1', FACILITY_ID: 'A', LOAN_ID: 'L1' }]);
      const response = await request(app).get('/bigquery');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ RECORD_ID: '1', FACILITY_ID: 'A', LOAN_ID: 'L1' }]);
    });

    it('should return 500 if there is an error fetching data', async () => {
      fetchData.mockRejectedValue(new Error('Error fetching data'));
      const response = await request(app).get('/bigquery');
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching data from BigQuery');
    });
  });

  describe('POST /bigquery', () => {
    it('should create a new record in BigQuery', async () => {
      insertData.mockResolvedValue();
      const response = await request(app)
        .post('/bigquery')
        .send({ RECORD_ID: '1', FACILITY_ID: 'A', LOAN_ID: 'L1' });
      expect(response.status).toBe(200);
      expect(response.text).toBe('Record created successfully');
    });

    it('should return 500 if there is an error creating record', async () => {
      insertData.mockRejectedValue(new Error('Error creating record'));
      const response = await request(app)
        .post('/bigquery')
        .send({ RECORD_ID: '1', FACILITY_ID: 'A', LOAN_ID: 'L1' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error creating record in BigQuery');
    });
  });

  describe('GET /principal', () => {
    it('should fetch principal by CUSTOMER_WWID_FACILITY', async () => {
      fetchData.mockResolvedValue([{ PRICNCIPAL: 1000 }]);
      const response = await request(app).get('/principal').query({ CUSTOMER_WWID_FACILITY: '12345' });
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{ PRICNCIPAL: 1000 }]);
    });

    it('should return 400 if CUSTOMER_WWID_FACILITY is missing', async () => {
      const response = await request(app).get('/principal');
      expect(response.status).toBe(400);
      expect(response.text).toBe('CUSTOMER_WWID_FACILITY is required');
    });

    it('should return 500 if there is an error fetching data', async () => {
      fetchData.mockRejectedValue(new Error('Error fetching data'));
      const response = await request(app).get('/principal').query({ CUSTOMER_WWID_FACILITY: '12345' });
      expect(response.status).toBe(500);
      expect(response.text).toBe('Error fetching data from BigQuery');
    });
  });
});
