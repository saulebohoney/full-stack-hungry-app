'use strict';

require('dotenv').config();

exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://pj:pass@ds153732.mlab.com:53732/hungerover';
exports.PORT = process.env.PORT || 3001;
