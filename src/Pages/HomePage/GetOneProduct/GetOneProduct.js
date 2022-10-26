import { Button } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GetOneProduct = () => {
    const [product, setProduct] = useState({});

    const slug = useParams().slug;

    useEffect(() => {
        axios.get(`http://localhost:8080/product/${slug}`)
        .then(response => setProduct(response.data))
    }, [])

    return(
        <div>
            
            <h1>{product.name}</h1>
            <img alt="example" src={`./images/${product.image}`} />
            <h2>{product.description}</h2>
            <h4>{product.price}</h4>
            {product.count <= 0 ?
                <h1>Hết Hàng</h1>
                :
                <h1>Còn Hàng</h1>
            }
            <Button>Mua Hàng</Button>
        </div>
    )
}

export default GetOneProduct;