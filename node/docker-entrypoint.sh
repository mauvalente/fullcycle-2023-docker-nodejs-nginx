#!/bin/sh

echo "executando entrypoint"

mysql -uroot -proot -hdb < ./create_database.sql

if [ ! -d "./node_modules" ];
then
npm install
fi

node index.js