#!/bin/bash
set -e

POSTGRES="psql ${DB_NAME} --username ${POSTGRES_USER}"

echo "Creating user: ${DB_APP_USER}"

$POSTGRES <<-EOSQL
CREATE USER ${DB_APP_USER} WITH PASSWORD '${DB_APP_PASS}';
EOSQL