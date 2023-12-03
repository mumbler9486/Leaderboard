#!/bin/bash

psql -U $1 -d $2 -t -f drop_tables.sql > drop_tables_generated.sql
psql -U $1 -d $2 -f drop_tables_generated.sql