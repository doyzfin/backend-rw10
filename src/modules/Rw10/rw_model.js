const connection = require('../../config/mysql')

module.exports = {
  getAllData: (search, sort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM rw WHERE rw_name LIKE "%"?"%" ORDER BY ${sort} `,
        search,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataSort: (sortName, valueSort) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM rw WHERE ? = ?  ',
        [sortName, valueSort],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM rw WHERE rw_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  postData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query('INSERT INTO rw SET ?', setData, (error, result) => {
        !error
          ? resolve({ id: result.insertId, ...setData })
          : reject(new Error(error))
      })
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE rw SET ? WHERE rw_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  updateDataVaksin: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE rw SET ? WHERE rw_id = ?',
        [setData, id],
        (error, result) => {
          !error ? resolve({ id: id, ...setData }) : reject(new Error(error))
        }
      )
    })
  },
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM rw  WHERE rw_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  }
}
