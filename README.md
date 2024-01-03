# silvercare-server-v2

this is the backend of the silvercare app
its build with NodeJS 19.4.0 using Express
to talk to the database we're using the Sequelize ORM.

## libraries

- Express
- Sequelize: ORM
- uuid
- Winston: logging
- cors

## Seeding the db

### Local

drop the db incase there is already an db  
 $sequelize db:drop  
 $sequelize db:create  
after creating the db, enable the UUID extension on the db  
$sequelize db:migrate  
$sequelize db:seed:all
