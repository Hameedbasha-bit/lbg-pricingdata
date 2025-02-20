import { fetchData, insertData } from '../services/bigqueryService.js';

/**
 * @swagger
 * /bigquery:
 *   get:
 *     summary: Fetch data from BigQuery
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error fetching data
 */
export const getBigQueryData = async (req, res) => {
  const query = `SELECT RECORD_ID, FACILITY_ID, LOAN_ID FROM \`playpen-122b3f.ap_edhcon_dev_01_bqd_euwe2_mspstg_01.Mortgage_loan_table\` LIMIT 100`;
  try {
    const rows = await fetchData(query, 'europe-west2');
    res.json(rows);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error fetching data from BigQuery');
  }
};

/**
 * @swagger
 * /bigquery:
 *   post:
 *     summary: Create a new record in BigQuery
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               RECORD_ID:
 *                 type: string
 *               FACILITY_ID:
 *                 type: string
 *               LOAN_ID:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Error creating record
 */
export const createBigQueryRecord = async (req, res) => {
  const { RECORD_ID, FACILITY_ID, LOAN_ID } = req.body;
  const query = `
    INSERT INTO \`playpen-122b3f.ap_edhcon_dev_01_bqd_euwe2_mspstg_01.Mortgage_record_table\` (RECORD_ID, FACILITY_ID, LOAN_ID)
    VALUES (@RECORD_ID, @FACILITY_ID, @LOAN_ID)
  `;
  try {
    await insertData(query, 'europe-west2', { RECORD_ID, FACILITY_ID, LOAN_ID });
    res.status(200).send('Record created successfully');
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error creating record in BigQuery');
  }
};

/**
 * @swagger
 * /principal:
 *   get:
 *     summary: Fetch principal from BigQuery by CUSTOMER_WWID_FACILITY
 *     parameters:
 *       - in: query
 *         name: CUSTOMER_WWID_FACILITY
 *         schema:
 *           type: string
 *         required: true
 *         description: The customer WWID facility
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Missing CUSTOMER_WWID_FACILITY parameter
 *       500:
 *         description: Error fetching data
 */
export const getPrincipalByCustomerWWID = async (req, res) => {
  const customerWWIDFacility = req.query.CUSTOMER_WWID_FACILITY;

  if (!customerWWIDFacility) {
    return res.status(400).send('CUSTOMER_WWID_FACILITY is required');
  }

  const query = `SELECT PRICNCIPAL FROM \`playpen-122b3f.ap_edhcon_dev_01_bqd_euwe2_mspstg_01.Mortgage_loan_table\` WHERE CUSTOMER_WWID_FACILITY = @customerWWIDFacility LIMIT 1`;

  try {
    const rows = await fetchData(query, 'europe-west2', { customerWWIDFacility });
    res.json(rows);
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error fetching data from BigQuery');
  }
};

