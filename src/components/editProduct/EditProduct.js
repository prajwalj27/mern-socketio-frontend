import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Button, Form } from "semantic-ui-react";

import "./EditProduct.css";

const EditProduct = () => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "",
    brand: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://vast-earth-94271.herokuapp.com/products/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const product = await response.json();
      if (!product) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(product);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedProduct = {
      name: form.name,
      price: form.price,
      rating: form.rating,
      brand: form.brand,
    };
    await fetch(`https://vast-earth-94271.herokuapp.com/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  return (
    <div className="editProduct">
      <div className="createContainer">
        <Form className="createForm" onSubmit={onSubmit}>
          <h3 className="formHeading">Edit Product</h3>
          <Form.Field>
            <label htmlFor="name">Product Name</label>
            <input
              placeholder="Enter name of Product"
              id="name"
              value={form.name}
              onChange={(e) => updateForm({ name: e.target.value })}
            />
          </Form.Field>
          <Form.Field className="numberField">
            <div className="fieldPrice">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                min="0"
                placeholder="Enter the Price"
                id="price"
                value={form.price}
                onChange={(e) => updateForm({ price: e.target.value })}
              />
            </div>
            <div className="fieldRating">
              <label htmlFor="rating">Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                placeholder="Enter the Avg. Rating"
                id="rating"
                value={form.rating}
                onChange={(e) => updateForm({ rating: e.target.value })}
              />
            </div>
          </Form.Field>
          <Form.Field>
            <label htmlFor="brand">brand</label>
            <input
              placeholder="Enter the product brand"
              id="brand"
              value={form.brand}
              onChange={(e) => updateForm({ brand: e.target.value })}
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default EditProduct;
