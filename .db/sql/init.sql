/* ユーザーに権限を与えないとマイグレーションできない */
create user local_user@localhost identified by 'password';
 grant create, alter, drop, references on *.* to local_user;
