const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
});

pool.on('connect', async client => {
    const result = await client.query('SELECT inet_server_addr() AS node_ip, pg_is_in_recovery() AS is_replica');
    const nodeType = result.rows[0].is_replica ? 'REPLICA' : 'PRIMARY';
    console.log(`🔗 Connected to PostgreSQL Node: ${result.rows[0].node_ip} (${nodeType})`);
});

module.exports = pool;
