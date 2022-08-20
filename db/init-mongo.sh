#!/bin/bash
set -e

echo 'Creating mongodb user'

mongosh <<EOF
use admin
db.createUser({
  user:  '$MONGO_USERNAME',
  pwd: '$MONGO_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_DB_NAME'
  }]
})
EOF
