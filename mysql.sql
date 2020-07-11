-- mysql workbench export
create database school_db;

use school_db;
create table student(
	std_id int,
	gr_no int,
	first_name varchar(15),
	middle_name varchar(15),
	last_name varchar(15),
    standard int,
	city varchar(15),
	state varchar(15)
);

drop table student;
truncate table student;

insert into student values(1, 1001, 'David', 'J', 'Milan', 5, 'Chennai', 'Tamilnadu');
insert into student values(2, 1002, 'Vijay', 'Kumar', 'Prabhakar', 4, 'Mysore', 'Karnataka');
insert into student values(3, 1003, 'Venu', 'S', 'Reddy', 3,  'Vijaywada', 'Andhra Pradesh');
insert into student values(4, 1004, 'Ashish', 'K', 'Singh', 3 ,'Indore', 'Madhya Pradesh');
insert into student values(5, 1005, 'Ashwin', 'P', 'Patel', 1, 'Bhuj', 'Gujarat');

select * from student;
alter table student drop primary key;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'My@#$Password878';
flush privileges;

Select * from student where gr_no = 1008