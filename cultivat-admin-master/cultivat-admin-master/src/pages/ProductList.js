import React, { useEffect } from 'react'
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";

const columns = [
  {
    title: "SNo",
    dataIndex: "key,"
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
  },

];



const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  const productState = useSelector((state) => state.product.products)
  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      price: `${productState[i].price}`,
      action: (
        <>
        <Link to='/' className="fs-3 test-red">
          <BiEdit />
        </Link>
        <Link className="ms-3 fs-3 test-red" to='/'>
          <AiFillDelete />
        </Link>
        </>
      ),
      
    });
  }
  return (
    <div>
        <h3 className="mb-4 title">Products</h3>  
        <div>
            <Table columns={columns} dataSource={data1} />
        </div> 
    </div>
  );
}

export default ProductList;