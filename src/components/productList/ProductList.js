import React, { useState, useEffect } from "react";
import { Header, Table, Rating, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

import "./ProductList.css";

const Product = (props) => {
  return (
    <Table.Row textAlign="center">
      <Table.Cell>
        <Header as="h4" textAlign="center">
          {props.record.name}
        </Header>
      </Table.Cell>
      <Table.Cell>
        <Rating
          icon="star"
          disabled
          defaultRating={props.record.rating}
          maxRating={5}
        />
      </Table.Cell>
      <Table.Cell singleLine textAlign="center">
        {props.record.price}
      </Table.Cell>
      <Table.Cell>{props.record.brand}</Table.Cell>
      <Table.Cell className="actionButtons" textAlign="center">
        <Link to={`/edit/${props.record._id}`}>
          <button className="actionEdit">
            <Icon title="edit product" className="editInfo" name="edit" />
          </button>
        </Link>
        <button
          className="actionDelete"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          <Icon title="delete product" className="deleteInfo" name="delete" />
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

const ProductList = () => {
  const [records, setRecords] = useState([]);
  const [socketData, setSocketData] = useState([]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("ws://localhost:5001"));
  }, []);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/products/`);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }
    console.log("change")
    getRecords();
    return;
  }, [records.length]);


  useEffect(() => {
    if (socket === null || records === null) return
    socket?.emit("send-changes", records)
    return;
  }, [socket, records]);

  useEffect(() => {
    if (socket === null || records === null) return
    socket?.emit("send-changes", records)
    return;
  }, [socket, records]);

  useEffect(() => {
    console.log(socketData)
    socket?.on("receive-changes", changedData => {
      setSocketData(changedData)
    })
    return;
  }, [socket, socketData]);


  

  async function deleteRecord(id) {
    await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  const recordList = () => {
    return socketData.map((record) => {
      return (
        <Product
          key={record._id}
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
        />
      );
    });
  };

  return (
    <div className="productList">
      <div className="productTable">
        {/* <h3>All Products</h3> */}
        <Table celled fixed singleLine size="large">
          <Table.Header>
            <Table.Row textAlign="center">
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Rating</Table.HeaderCell>
              <Table.HeaderCell>Price ( &#8377;)</Table.HeaderCell>
              <Table.HeaderCell>Brand</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{recordList()}</Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default ProductList;
