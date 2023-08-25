create table towns(
  town_id serial not null primary key,
  town_name text not null,
  starting_letters text not null,
)
create table reg_numbers(
  reg_id serial not null primary key,
  reg_numbers varchar(50) not null unique,
  town_id int not null,
  foreign key (town_id) references towns(town_id) on delete cascade
)

