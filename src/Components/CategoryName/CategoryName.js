import axios from "axios";
import { useState, useEffect } from "react";

const CategoryName = ({categoryId}) => {
    const [category, setCategory] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8080/category/danh-muc/${categoryId}`)
        .then(response => setCategory(response.data))
        .catch()
    }, [])

    return(
        <div>
            {category.name}
        </div>
    )
}

export default CategoryName;