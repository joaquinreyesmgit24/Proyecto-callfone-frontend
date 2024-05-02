import http from '../http/http';

export default {
      getData(url){
        return new Promise(((resolve, reject) => {
          http.get(`${url}`)
            .then((response) => resolve(response.data))
            .catch((err) => reject(err))
        }))
      },
      getDataById(url, id){
        return new Promise(((resolve, reject) => {
            http.get(`${url}/${id}`)
              .then((response) => resolve(response.data))
              .catch((err) => reject(err))
          }))
      },
      setData(url,id, form){
        return new Promise(((resolve, reject) => {
            http.put(`${url}/${id}`,form)
              .then((response) => resolve(response.data))
              .catch((err) => reject(err))
          }))
      },
      setDataBy2Id(url,id,id2 ,form){
        return new Promise(((resolve, reject) => {
            http.put(`${url}/${id}/${id2}`,form)
              .then((response) => resolve(response.data))
              .catch((err) => reject(err))
          }))
      },
      getDataBy2Id(url, id, id2){
        return new Promise(((resolve, reject) => {
          http.get(`${url}/${id}/${id2}`)
            .then((response) => resolve(response.data))
            .catch((err) => reject(err))
        }))
      },
      createData(url,form){
        return new Promise(((resolve, reject) => {
          http.post(`${url}`,form)
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        }))
      },
      createDataFile(url,form){
        return new Promise(((resolve, reject) => {
          http.post(`${url}`,form,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
            .then((response) => resolve(response))
            .catch((err) => reject(err))
        }))
      },
      deleteDataByIdAndObject(url,id, form){
        return new Promise(((resolve, reject) => {
          http.post(`${url}/${id}`, form)
          .then((response) => resolve(response.data))
          .catch((err) => reject(err))
      }))
      }
}