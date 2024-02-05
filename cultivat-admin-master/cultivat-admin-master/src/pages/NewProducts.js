import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  
});

const NewProducts = () => {
    const dispatch = useDispatch();
    // const brandState = useSelector((state) => state.brand.brands) || [];

    // useEffect(() => {
    //     dispatch(getBrands());
    // }, [dispatch]);
    
    

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  // const [selectedBrand, setSelectedBrand] = useState("");

  const handleDescChange = (value, delta, source, editor) => {
    formik.handleChange("description")({
      target: {
        name: "description",
        value: value,
      },
    });
  };
  
  const handleDescBlur = (previousRange, source, editor) => {
    formik.handleBlur("description")({
      target: {
        name: "description",
        value: editor.getHTML(),
      },
    });
  };

  

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // const handleBrandChange = (event) => {
  //   setSelectedBrand(event.target.value);
  // };

  return (
    <div>
      <h3 className="mb-4">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="d-flex gap-3 flex-column">
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <div>
            <ReactQuill
            theme="snow"
            name="description"
            onChange={handleDescChange}
            onBlur={handleDescBlur}
            value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChange={formik.handleChange("price")}
            onBlur={formik.handleChange("price")}
            value={formik.values.price}
          
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <div className="form-floating mb-3">
            <select
              name=""
              className="form-control"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="" disabled>Select Category</option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              {/* Add more category options as needed */}
            </select>
            {/* <label>Selected Category: {selectedCategory}</label> */}
          </div>

          <div className="form-floating mb-3">
            <select
              // name=""
              // className="form-control"
              // value={selectedBrand}
              // onChange={handleBrandChange}
            >
              <option value="" disabled>Select Brand</option>
              {/* {brandState && brandState.map((brand, index) => (
              <option key={index} value={brand.title}>
                {brand.title}
              </option>
            ))} */}

              {/* Not Req  {brandState.map((brand, index) => {
                return (
                    <option key={index} value={brand.title}>
                        {brand.title}
                    </option>
                );
              })} */}
              <option value="brand1">Brand 1</option>
              <option value="brand2">Brand 2</option>
              {/* Add more brand options as needed */}
            </select>
            {/* <label>Selected Brand: {selectedBrand}</label> */}
          </div>

          <CustomInput type="number" label="Enter Product Price" />

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewProducts;
