FROM postgres:16

RUN apt-get update && \
    apt-get install -y postgresql-16-pgvector

COPY ./sql_scripts /docker-entrypoint-initdb.d/
RUN chmod -R 755 /docker-entrypoint-initdb.d/
