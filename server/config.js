'use strict';

require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/hungryAPP';
exports.TEST_DATABASE_URL=process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/hungryAPP-test';
exports.PORT = process.env.PORT || 3001;
