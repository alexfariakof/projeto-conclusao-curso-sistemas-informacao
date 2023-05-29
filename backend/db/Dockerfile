FROM mysql:5.7.22
EXPOSE 3306
EXPOSE 3308
COPY ./backend/db/migrations/ /home/database/
COPY ./backend/db/dataset/ /home/database/
COPY ./backend/db/init_database.sh /docker-entrypoint-initdb.d/init_database.sh