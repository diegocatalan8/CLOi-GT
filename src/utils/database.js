import {Pool} from 'pg';

let conn;


if(!conn){
   
    conn = new Pool({
        user:'stxqkvlw',
        password:'RuKddd786yAt8j1Y2giaMIZGqJS7KNsY',
        host:'bubble.db.elephantsql.com',
        port: 5432,
        database: 'stxqkvlw'
    })
}

export {conn};
