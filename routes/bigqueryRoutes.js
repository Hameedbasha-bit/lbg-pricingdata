import express from 'express';
import { getBigQueryData, createBigQueryRecord, getPrincipalByCustomerWWID } from '../controllers/bigqueryController.js';

const router = express.Router();

router.get('/bigquery', getBigQueryData);
router.post('/bigquery', createBigQueryRecord);
router.get('/principal', getPrincipalByCustomerWWID);

export default router;
