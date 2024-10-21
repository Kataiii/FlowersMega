FROM postgres:latest
EXPOSE 5432

COPY backup.sh /usr/local/bin/backup.sh
COPY restore.sh /usr/local/bin/restore.sh

RUN chmod +x /usr/local/bin/backup.sh \
    && chmod +x /usr/local/bin/restore.sh \
    && ln -s /usr/local/bin/backup.sh /usr/local/bin/backup \
    && ln -s /usr/local/bin/restore.sh /usr/local/bin/restore



COPY init.sql /docker-entrypoint-initdb.d/