const pg = require('pg')

const pool = new pg.Pool({
  user: 'psql_user',
  password: 'qwe123qwe',
  host: 'localhost',
  database: 'todolist',
  // port: '5433'
})

const queryDB = ({
  sql = '',
  param = [],
  callback = () => {}
} = {}) => {
  pool.connect((err, client, done) => {

    // console.log(err)
    if(err) {
      console.error('数据库连接失败')
      return;
    }

    client.query(sql, param, (error, response) => {
      done()
      console.log(response);

      callback(error, response);
    })
  })

}

const listItem = (cb) => {
  queryDB({
    sql: 'select * from todolist order by item_created desc',
    // param: [itemId],
    callback: (error, response) => {
      cb(error, { data: response.rows });
    }
  })
}


const insertItem = (title, cb) => {
    queryDB({
    sql: 'insert into todolist(item_title) values($1::varchar)',
    param: [title],
    callback: cb
  })
}
const updateItem = ({title = '', itemId=0 } = {}, cb) => {
  queryDB({
    sql: 'update todolist set item_title=$1 where item_id=$2',
    param: [title, itemId],
    callback: cb
  })
}


const toggleItem = ({ itemId = 0 } = {}, cb) => {
  queryDB({
    sql: 'update todolist set item_finished = NOT item_finished where item_id=$1',
    param: [itemId],
    callback: cb
  })
}


const deleteItem = (itemId, cb) => {
  queryDB({
    sql: 'delete from todolist where item_id=$1',
    param: [itemId],
    callback: cb
  })
}


module.exports = { listItem, insertItem, updateItem, toggleItem, deleteItem };
