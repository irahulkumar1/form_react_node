import React, { useState, useEffect } from "react";
import "./form.css";
import Axios from "axios";

export default function Form() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [adress, setAdress] = useState("");
  const [formDataList, setFormDataList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      // console.log(response.data);
      setFormDataList(response.data);
    });
  }, []);

  const submitForm = () => {
    Axios.post("http://localhost:3001/api/insert", {
      FName: fName,
      Lname: lName,
      email: email,
      phone: phone,
      address: adress,
    }).then(() => {
      alert("Data Inserted");
    });
  };
  // console.log(submitForm);
  return (
    <div>
      <h1>Enter Details to Submit</h1>
      <div className="formData">
        <label className="label" htmlFor="First Name">
          First Name
        </label>
        <input
          type="text"
          autoComplete="off"
          name="FName"
          placeholder="Enter Your First name"
          onChange={(e) => {
            setFName(e.target.value);
          }}
        />
        <label htmlFor="Last Name">Last Name</label>
        <input
          type="text"
          autoComplete="off"
          name="Lname"
          placeholder="Enter Your last name"
          onChange={(e) => {
            setLName(e.target.value);
          }}
        />
        <label htmlFor="Email adress">Email adress</label>
        <input
          type="email"
          autoComplete="off"
          name="email"
          placeholder="Enter Your Email adress"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label htmlFor="phone no">Phone no.</label>
        <input
          type="number"
          autoComplete="off"
          name="phone"
          placeholder="Enter Your Phone No."
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <label htmlFor="Address">Address</label>
        <input
          type="text"
          autoComplete="off"
          name="address"
          placeholder="Enter Your Address"
          onChange={(e) => {
            setAdress(e.target.value);
          }}
        />
        <button className="btn-grad" onClick={submitForm}>
          Submit
        </button>
      </div>
      <div className="formPreview">
        {formDataList.map((val) => {
          return (
            <>
              <div className="detailpreview">
                <table>
                  <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                  </tr>
                  <tr>
                    <td>{val.FName}</td>
                    <td>{val.Lname}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                    <td>{val.address}</td>
                  </tr>
                </table>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
