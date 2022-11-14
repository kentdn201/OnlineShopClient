import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ApiURL from '../../../Share/ApiURL/ApiURL'

const GetImageURL = ({productId}) => {
    const [product, setProduct] = useState({
        id: null,
        imageURL: null,
    })

    useEffect(() => {
        axios.get(`${ApiURL.Api}/product/san-pham/${productId}`)
        .then(response => {
            setProduct(response.data)
        })
    }, [])
    
  return (
    <div><img width={100} src={`${product.imageURL}`}/></div>
  )
}

export default GetImageURL