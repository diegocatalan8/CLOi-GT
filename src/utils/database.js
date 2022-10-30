import {Pool} from 'pg';

let conn;


if(!conn){
   
    conn = new Pool({
        user:'postgres',
        password:'6ncjcraA11FR6l7GkBTj',
        host:'containers-us-west-25.railway.app',
        port: 6610,
        database: 'railway'
    })
}

export {conn};
