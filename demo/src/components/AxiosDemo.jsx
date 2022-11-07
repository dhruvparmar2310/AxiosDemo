import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function AxiosDemo () {
  // storing cars api data in data variable
  const [data, setData] = useState([])
  const [brand, setBrand] = useState('')
  const [models, setModels] = useState([])
  const [isEdit, setIsEdit] = useState(false)

  const getData = () => {
    Axios.get('https://6364ac837b209ece0f4b06db.mockapi.io/cars')
      .then((res) => {
        console.log('Get Data from Api :>> ', res.data)
        setData(res.data)
      })
      .catch((error) => {
        console.log('error :>> ', error)
      })
  }

  const handleSumbit = (e) => {
    if (brand === '' || models === '') {
      alert('Please provide some data in the empty fields...')
    } else {
      if (!isEdit) {
        setBrand('')
        setModels('')
        Axios.post('https://6364ac837b209ece0f4b06db.mockapi.io/cars', {
          brand,
          models
        })
          .then((res) => {
            console.log('Posting data to Api :>> ', res.data)
            alert('Data Added Successfully.')
          })
          .then(() => {
            getData()
          }
          )
          .catch((error) => {
            console.log('error :>> ', error)
          })
      }

      if (isEdit) {
        setBrand('')
        setModels('')
        const getId = localStorage.getItem('id')
        console.log('getId :>> ', getId)
        Axios.put(`https://6364ac837b209ece0f4b06db.mockapi.io/cars/${getId}`, {
          brand, models
        }).then((res) => {
          console.log('res.data', res.data)
          alert('Data Edited Successfully.')
        }).then(() => {
          getData()
        })
          .catch((error) => {
            console.log('error :>> ', error)
          })
      }
    }
    e.preventDefault()
  }

  useEffect(() => {
    getData()
  }, [])

  const handleEditButton = (e, id) => {
    // console.log('id', id)
    // console.log('index :>> ', index)
    setIsEdit(true)

    localStorage.setItem('id', id)

    data.filter((e) => {
      if (id === e.id) {
        console.log('id :>> ', id)
        console.log('e.id', e.id, 'e', e)
        setBrand(e.brand)
        setModels(e.models)
      }
      return e
    }
    )
  }

  const handleDeleteButton = (e, id) => {
    Axios.delete(`https://6364ac837b209ece0f4b06db.mockapi.io/cars/${id}`)
      .then((res) => {
        console.log('Deleted Data :>> ', res.data)
        alert('Data Deleted Successfully...')
      })
      .then(() => {
        getData()
      })
      .catch((error) => {
        console.log('error :>> ', error)
      })
  }

  return (
    <div className='container data'>
        <div className='row'>
          <div className='col-lg-6'>
            <label>Company</label>
            <input type='text' value={brand} id='brand' className='form-control' placeholder='Enter the Company' onChange={(e) => setBrand(e.target.value)} />
          </div>
          <div className='col-lg-6'>
             <label>Models</label>
            <input type='text' value={models} id='models' className='form-control' placeholder='Enter the Models' onChange={(e) => setModels(e.target.value)} />
          </div>
        </div>
        <button className='btn btn-success mt-3' onClick={(e) => handleSumbit(e)}>Add</button>
        <table className='table table-bordered table-hover mt-5 table-responsive'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Brands</th>
                    <th>Models</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {data.map((data, index) => {
                  return (
                    <tr key={index}>
                        <td>{data.id}</td>
                        <td>{data.brand}</td>
                        <td>{data.models.toString()}</td>
                        <td><button className='btn btn-sm btn-warning' onClick={(e) => handleEditButton(e, data.id)}>Edit</button></td>
                        <td><button className='btn btn-sm btn-danger' onClick={(e) => handleDeleteButton(e, data.id)}>Delete</button></td>
                    </tr>
                  )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default AxiosDemo
