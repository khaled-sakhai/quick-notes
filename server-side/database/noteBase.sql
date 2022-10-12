	BEGIN TRANSACTION;

DROP TABLE IF EXISTS users, notes;
DROP SEQUENCE IF EXISTS seq_user_id, seq_note_id;


CREATE SEQUENCE seq_user_id
  INCREMENT BY 1 START WITH 1001
  NO MAXVALUE NO MINVALUE CACHE 1;

CREATE SEQUENCE seq_note_id
  INCREMENT BY 1  START WITH 2001
  NO MAXVALUE NO MINVALUE CACHE 1;

Create table users (
    user_id serial,
    username VARCHAR(50) unique not null,
    password_hash VARCHAR(200) not null,
    role varchar(50) NOT NULL,
    CONSTRAINT PK_user PRIMARY KEY (user_id)
);
CREATE table notes(
    note_id serial,
    note_title VARCHAR,
    note_content VARCHAR,
    user_id int,
    CONSTRAINT PK_notes PRIMARY KEY (note_id),
    CONSTRAINT FK_users FOREIGN KEY (user_id) REFERENCES users (user_id)
);


insert into notes (note_title,note_content) values ('title note 1','content of note 1');
insert into notes (note_title,note_content) values ('title note 2','content of note 2');
insert into notes (note_title,note_content) values ('title note 3','content of note 3');
insert into notes (note_title,note_content) values ('title note 4','content of note 4');


COMMIT TRANSACTION;