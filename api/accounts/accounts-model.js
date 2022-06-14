const db = require('../../data/db-config')
const getAll = () => {
  return db('accounts')// DO YOUR MAGIC
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  let [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id)
  return getById(id)
}

const deleteById = async id => {
  const result = await getById(id)
  await db('accounts').delete().where('id', id);
  return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
