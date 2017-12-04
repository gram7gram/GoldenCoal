#!/bin/bash

cp /etc/pg_hba.conf $PGDATA/pg_hba.conf

cp /etc/postgresql.conf $PGDATA/postgresql.conf

echo [+] master instance configured