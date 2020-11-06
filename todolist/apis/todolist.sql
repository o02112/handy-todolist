create or replace function upd_timestamp() returns trigger as
$$
begin
    new.item_last_update = current_timestamp;
    return new;
end
$$
language plpgsql;

create table todolist (
  item_id serial PRIMARY KEY,
  item_title varchar(200) NOT NULL,
  item_finished BOOLEAN DEFAULT FALSE,
  item_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  item_last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


create trigger t_name before update on todolist for each row execute procedure upd_timestamp();