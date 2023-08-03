create database IF NOT EXISTS nodedb;

use nodedb;

create table IF NOT EXISTS  people (id int primary key auto_increment, name varchar(255));