import React, { useEffect } from 'react'
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getOrders } from '../features/auth/authSlice';



const columns = [
    {
        title: "SNo",
        dataIndex: "Key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },

    {
        title: "Action",
        dataIndex: "action"
    },
];

const Orders = () => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(getOrders());
  }, []);
  const orderState = useSelector((state) => state.auth.orders);
  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
      data1.push({
          key: i + 1,
          name: orderState[i].orderby.name,
          product: orderState[i].product.map((i) => {
            return (
                <>
                <ul>
                    <li>{i.product.title}</li>
                </ul>
                
                </>
            );
          }),
          amount: orderState[i].paymentIntent.amount,
          date: orderState[i].createdAt,
          action: (
              <>
              <Link to="/" className="fs-3 test-red">
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
          <h3 className='mb-4 title'>Orders</h3>
          <div>
              <Table columns={columns} dataSource={data1} />
          </div>
      </div>
  );
};

export default Orders