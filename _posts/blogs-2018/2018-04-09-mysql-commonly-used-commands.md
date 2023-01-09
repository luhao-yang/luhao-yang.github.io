---
id: 272
title: Mysql commonly used commands
#date: 2018-04-09T17:01:39+00:00
author: Luhao
summary: Mysql commonly used commands, keep it just for convenience
layout: post
#guid: http://flywithfan.net/?p=272
#permalink: /misc/272/
categories:
  - Database
tags:
  - mysql
---
## MySQL Command-Line

**Connecting**
  
mysql -u [username] -p
  
mysql -u [username] -p[password]

**Importing**
  
mysql -u[username] -p[password] < filename

**Dumping**
  
mysqldump -u[username] -p[password] database [tables] > filename

## Basic MySQL Commands

SHOW DATABASES;
  
CREATE DATABASE database;
  
USE database;
  
DROP DATABASE database;

SHOW TABLES;
  
DESCRIBE table;
  
SHOW COLUMNS FROM table;
  
DROP TABLE table;

* * *

No doubt that, using mysql-workbench is more efficient and friendly to users!

click [this](https://dev.mysql.com/downloads/workbench/) to jump downloading page!

![](/assets/img/uploads/2018/123.png)

* * *

## Built-in Functions

MySQL Mathematical Functions

|             What             |        How         |
|:----------------------------:|:------------------:|
|     Count rows per group     | COUNT(column | *)  |
|    Average value of group    |    AVG(column)     |
|    Minumum value of group    |    MIN(column)     |
|    Maximum value of group    |    MAX(column)     |
|    Sum values in a group     |    SUM(column)     |
|        Absolute value        |    abs(number)     |
|       Rounding numbers       |   round(number)    |
| Largest integer not greater  |   floor(number)    |
| Smallest integer not smaller |  ceiling(number)   |
|         Square root          |    sqrt(number)    |
|          nth power           | pow(base,exponent) |
|   random number n, 0<n < 1   |       rand()       |
|   sin (similar cos, etc.)    |    sin(number)     |

MySQL String Functions

|                 What                 |               How               |
|:------------------------------------:|:-------------------------------:|
|           Compare strings            |     strcmp(string1,string2)     |
|        Convert to lower case         |          lower(string)          |
|        Convert to upper case         |          upper(string)          |
| Left-trim whitespace (similar right) |          ltrim(string)          |
|         Substring of string          | substring(string,index1,index2) |
|           Encrypt password           |        password(string)         |
|            Encode string             |       encode(string,key)        |
|            Decode string             |       decode(string,key)        |
|               Get date               |            curdate()            |
|               Get time               |            curtime()            |
|  Extract day name from date string   |         dayname(string)         |
| Extract day number from date string  |        dayofweek(string)        |
|    Extract month from date string    |        monthname(string)        |

## SQL

**Create table**

CREATE TABLE table (
          
column1 type [[NOT] NULL]
                  
[AUTO_INCREMENT],
          
column2 type [[NOT] NULL]
                  
[AUTO_INCREMENT],
          
&#8230;
          
other options,
          
PRIMARY KEY (column(s)) );

**Insert data**

  * INSERT INTO table VALUES
      
    (list of values);
  * INSERT INTO table SET
      
    column1=value1,
      
    column2=value2,
      
    &#8230;
      
    columnk=valuek;
  * INSERT INTO table (column1,column2,&#8230;)
      
    VALUES (value1,value2&#8230;);

**Insert/Select**

INSERT INTO table (column1,column2,&#8230;)
          
SELECT statement;
          
(See below)

**Delete data**

DELETE FROM table
          
[WHERE condition(s)];

**Updating Data**

UPDATE table SET
          
column1=value1,
          
column2=value2,
          
&#8230;
          
columnk=valuek
          
[WHERE condition(s)];

**Insert column**

ALTER TABLE table ADD COLUMN
          
column type options;

**Delete column**

ALTER TABLE table
          
DROP COLUMN column;

## Querying

SELECT * FROM table;

SELECT column1,column2,&#8230; FROM table \[WHERE condition(s)\] \[ORDER BY column(s) [DESC\]];

**No Repeats**

SELECT [DISTINCT] column(s) FROM table;

**Column Aliases**

SELECT column1 [AS alias1], column2 [AS alias2], &#8230; FROM table1;

**Grouping**

SELECT column1,column2,&#8230;
          
FROM table
          
[GROUP BY column(s)];

**Group Filtering**

SELECT column1,column2,&#8230;
          
FROM table
          
[GROUP BY column(s)]
          
[HAVING condition(s)];

**Everything**

SELECT [DISTINCT]
          
column1 [AS alias1],
          
column2 [AS alias2], &#8230;
          
FROM table1 [alias1],
          
table2 [alias2],&#8230;
          
[WHERE condition(s)]
          
[GROUP BY column(s)]
          
[HAVING condition(s)]
          
[ORDER BY column(s) [DESC]];