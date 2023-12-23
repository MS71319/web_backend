import React, { useEffect } from "react";
import { Table } from "antd";
import { getMaxListeners } from "../../../../backend/models/productModel";
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
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
    },
];
const data1 = [];
for (let i = 0; i < 5; i++) {
    data1.push({
        key: i + 1,
        name: "Mahesh",
        email: "msai4100@gmail.com",
        mobile: "7894561235",
    });
}
const Customers = () => {
    return (
        <div>
            <h3 className="mb-4 title">Customers</h3>  
            <div>
                <Table columns={columns} dataSource={data1} />
            </div> 
        </div>
    );
};

export default Customers;
