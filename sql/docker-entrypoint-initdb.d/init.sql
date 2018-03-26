create database act;

use act;

create table suppliers (
	id int not null auto_increment,
	name text(200),
	primary key (id)
);

create table customers (
	id int not null auto_increment,
	name text(200),
	primary key (id)
);

create table revenues (
	id int not null auto_increment,
	supplier_id int, 
	customer_id int,
	revenue_pct float not null,
	start_date datetime,
	end_date datetime,
	primary key (id),
	foreign key (supplier_id) references suppliers(id)
		on delete cascade on update cascade,
	foreign key (customer_id) references customers(id)
		on delete cascade on update cascade
);

