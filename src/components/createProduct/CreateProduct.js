import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, TextArea, Form } from "semantic-ui-react";

import "./CreateProduct.css";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    rating: "",
    description: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newProduct = { ...form };

    await fetch("http://localhost:5000/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ name: "", price: "", rating: "", description: "" });
    navigate("/");
  }

  return (
    <div className="createProduct">
      <div className="createContainer">
        <Form className="createForm" onSubmit={onSubmit}>
          <h3 className="formHeading">Create Product</h3>
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
            <label htmlFor="description">Description</label>
            <TextArea
              rows={2}
              maxlength="300"
              placeholder="Give a short description of the product"
              id="description"
              value={form.description}
              onChange={(e) => updateForm({ description: e.target.value })}
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

export default CreateProduct;