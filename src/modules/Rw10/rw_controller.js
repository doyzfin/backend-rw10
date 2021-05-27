const helper = require('../../helpers/wrapper')
const rwModel = require('./rw_model')

module.exports = {
  getAllData: async (req, res) => {
    try {
      let { sort, search } = req.query
      if (!sort) {
        sort = 'rw_id ASC'
      }
      if (!search) {
        search = ''
      }
      const result = await rwModel.getAllData(search, sort)
      return helper.response(res, 200, 'success Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getDataSort: async (req, res) => {
    try {
      let { sort, sort2 } = req.query
      if (!sort) {
        sort = 'rw_id'
      }
      if (!sort2) {
        sort2 = ''
      }
      const result = await rwModel.getDataSort(sort, sort2)
      return helper.response(res, 200, 'success Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getDataId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await rwModel.getDataId(id)
      return helper.response(res, 200, 'success Get Data By Id', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postData: async (req, res) => {
    try {
      const date = new Date()
      const thn = date.getFullYear()
      const {
        nama,
        alamat,
        tanggalLahir,
        pendidikan,
        nik,
        bpjs,
        vaksin,
        tempatVaksin
      } = req.body
      const setData = {
        rw_name: nama,
        rw_alamat: alamat,
        rw_tanggal_lahir: tanggalLahir,
        rw_umur: thn - tanggalLahir.slice(0, 4) + ' tahun',
        rw_pendidikan: pendidikan,
        rw_nik: nik,
        rw_bpjs: bpjs,
        rw_vaksin: vaksin,
        rw_tempat_vaksin: tempatVaksin
      }
      console.log(setData)
      const result = await rwModel.postData(setData)
      return helper.response(res, 200, 'Success Create Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateData: async (req, res) => {
    try {
      const { id } = req.params
      const {
        nama,
        alamat,
        tanggalLahir,
        umur,
        pendidikan,
        nik,
        bpjs,
        vaksin,
        tempatVaksin
      } = req.body
      const setData = {
        rw_name: nama,
        rw_alamat: alamat,
        rw_tanggal_lahir: tanggalLahir,
        rw_umur: umur,
        rw_pendidikan: pendidikan,
        rw_nik: nik,
        rw_bpjs: bpjs,
        rw_vaksin: vaksin,
        rw_tempat_vaksin: tempatVaksin
      }

      const getDataId = await rwModel.getDataId(id)
      if (getDataId.length > 0) {
        const result = await rwModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateVaksin: async (req, res) => {
    try {
      const { id } = req.params

      const { vaksin, tempatVaksin } = req.body
      const result1 = await rwModel.getDataId(id)

      const setData = {
        rw_name: result1[0].rw_name,
        rw_alamat: result1[0].rw_alamat,
        rw_tanggal_lahir: result1[0].rw_tanggalLahir,
        rw_umur: result1[0].rw_umur,
        rw_pendidikan: result1[0].rw_pendidikan,
        rw_nik: result1[0].rw_nik,
        rw_bpjs: result1[0].rw_bpjs,
        rw_vaksin: vaksin,
        rw_tempat_vaksin: tempatVaksin
      }

      if (result1.length > 0) {
        const result = await rwModel.updateDataVaksin(setData, id)
        return helper.response(res, 200, 'Success Update Data', result)
      } else {
        return helper.response(res, 404, 'Data Not Found', null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteData: async (req, res) => {
    try {
      const { id } = req.params
      const result = await rwModel.deleteData(id)
      return helper.response(res, 200, 'Success Delete Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
