import { React, useEffect, useState } from "react";
import CustomInput from "../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import Dropzone from "react-dropzone"; 
import { uploadImg } from "../features/upload/uploadSlice";
import { createProducts } from "../features/product/productSlice"; // Import createProducts action


let schema = Yup.object().shape({
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Description is Required"),
  price: Yup.number().required("Price is Required"),
  brand: Yup.string().required("Brand is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().required("Quantity is required"),
  //image: Yup.string().required("Image is required"),

});



const NewProducts = () => {
    const dispatch = useDispatch();
    const [uploadedImages, setUploadedImages] = useState([]);


    

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
        const images = uploadedImages.map(image => ({ public_id: image.public_id, url: image.url }));
        values.images = images;
        dispatch(createProducts(values)) // Dispatch the createProducts action with form values
            .then((response) => {
                // Handle success response if needed
                console.log("Product created successfully:", response);
                // Reset form after successful submission
                formik.resetForm();
                // Reset uploaded images
                setUploadedImages([]);
            })
            .catch((error) => {
                // Handle error if needed
                console.error("Error creating product:", error);
            });
    },
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

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

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    formik.handleChange("brand")(event); // Update formik state for "brand"
    formik.setFieldError("brand", ""); // Clear the error when brand is selected

  };


  const handleImageUpload = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles))
      .then((response) => {
        // Check if the response contains the expected format
        if (response && response.payload && Array.isArray(response.payload)) {
          // Extract the uploaded images from the payload
          const images = response.payload;
          // Update the state with the uploaded images
          setUploadedImages(images);
        } else {
          console.error("Invalid response format:", response);
          // Handle invalid response format (e.g., display error message)
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        // Handle error (e.g., display error message)
      });
  };

const handleRemoveImage = (publicIdToRemove) => {
  // Filter out the image with the specified public_id from the uploadedImages state
  const updatedImages = uploadedImages.filter((image) => image.public_id !== publicIdToRemove);
  // Update the state with the filtered images
  setUploadedImages(updatedImages);
};

  

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
            onCh={formik.handleChange("price")}
            onBlr={formik.handleChange("price")}
            val={formik.values.price}
          
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          <div className="form-floating mb-3">
            <select
              name="category"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleChange("category")}
              value={formik.values.category}
              className="form-control"
              // value={selectedCategory}
              // onChange={handleCategoryChange}
            >
              <option value="" disabled>Select Category</option>
              <option value="Pesticides">Pesticides</option>
              <option value="Fertilizers">Fertilizers</option>
              {/* Add more category options as needed */}
            </select>
            <div className="error">
             {formik.touched.category && formik.errors.category}
            </div>
            {/* <label>Selected Category: {selectedCategory}</label> */}
          </div>

          <div className="form-floating mb-3">
            <select
              name="brand"
              onBlur={formik.handleChange("brand")}
             // value={formik.values.brand}
              className="form-control"
              value={selectedBrand}
              onChange={handleBrandChange}
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
      
              <option value="abc">abc</option>
              <option value="bac">bac</option>

              {/* Add more brand options as needed */}
            </select>
            <div className="error">
              {formik.touched.brand && formik.errors.brand}
            </div>


   
            {/* <label>Selected Brand: {selectedBrand}</label> */}
            
          </div>


          <CustomInput
          type="number" 
          label="Enter Product Quantity" 
          name="quantity"
          onCh={formik.handleChange("quantity")}
          onBlr={formik.handleBlur("quantity")}
          val={formik.values.quantity}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          {/* Dropzone for image upload */}
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop some files here, or click to select files</p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="uploaded-images d-flex">
              {uploadedImages.map((image, index) => (
                <div key={index} className="position-relative m-2">
                  <img src={image.url} alt={`Uploaded ${index}`} width={200} height={200} />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(image.public_id)}
                    className="btn position-absolute top-0 end-0 m-2"
                    style={{ padding: '2px 6px', borderRadius: '50%', fontSize: '1rem', lineHeight: 1 }}
                  >
                    &#10006; {/* Unicode character for "X" mark */}
                  </button>
                </div>
              ))}
            </div>
          </div>
           {/* Display uploaded images */}





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
