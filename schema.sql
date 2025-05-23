-- drop table if exists users;
-- drop table if exists pdf_summaries;
-- drop table if exists payments;

create extension if not exists "uuid-ossp";

create table users (
  id UUID primary key default uuid_generate_v4(),
  email varchar(255) unique not null,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  full_name varchar(255),
  customer_id varchar(255) unique,
  price_id varchar(255),
  status varchar(50) default 'inactive'
);

create table pdf_summaries (
  id UUID primary key default uuid_generate_v4(),
  user_id varchar(255) not null,
  original_file_url text not null,
  summary_text text not null,
  status varchar(50) default 'completed',
  title text,
  file_name text,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

create table payments  (
  id UUID primary key default uuid_generate_v4(),
  amount integer not null,
  status varchar(50) not null,
  stripe_payment_id varchar(255) not null,
  price_id varchar(255) not null,
  user_email varchar(255) not null references users(email),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_created_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.created_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

create TRIGGER update_users_updated_at
  before update on users
  for each row
  execute function update_updated_at_column();

create TRIGGER update_pdf_summaries_updated_at
  before update on pdf_summaries
  for each row
  execute function update_updated_at_column();

create TRIGGER update_payments_updated_at
  before update on payments
  for each row
  execute function update_updated_at_column();
