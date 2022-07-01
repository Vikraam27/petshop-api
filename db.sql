--installazion 
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -

sudo apt-get update
sudo apt-get -y install postgresql
systemctl status postgresql

sudo -u postgres psql

--create user
CREATE USER developer WITH ENCRYPTED PASSWORD 'supersecretpassword';

CREATE DATABASE petshopdb;

GRANT ALL PRIVILEGES ON DATABASE petshopdb TO developer;

sudo -u developer psql --dbname companydb

--create table users

CREATE TABLE "users" (
  "id" VARCHAR(50) PRIMARY KEY,
  "email" VARCHAR(150) UNIQUE NOT NULL,
  "username" VARCHAR(50) UNIQUE NOT NULL,
  "fullname" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "is_admin" BOOL DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT current_timestamp NOT NULL
);