FROM postgres:13.4
ENV POSTGRES_DB offer-job

COPY create-app-user.sh /docker-entrypoint-initdb.d
COPY create-schema.sh /docker-entrypoint-initdb.d
