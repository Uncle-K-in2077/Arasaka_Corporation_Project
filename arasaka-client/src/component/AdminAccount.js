/** @format */

import { useDispatch, useSelector } from "react-redux";
import AccountService from "../service/AccountService";
import { findAll } from "../redux/accountSlice";
import { useEffect, useState } from "react";
import "../css/AdminAccount.css";
import { updateAccount } from "../redux/accountSlice";
import Toast from "./Toast";

function AdminAccount() {
  const accountData = useSelector((state) => state.account?.data);
  const dispatch = useDispatch();
  const [accountUD, setAccountUD] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // for filter
  const [filter, setFilter] = useState({
    searchText: "",
    status: 2,
  });

  async function getAccountData() {
    try {
      const res = await AccountService.getAllAccounts();
      dispatch(findAll(res.data));
    } catch (error) {
      console.log(error);
    }
  }

  const updateAccountFunction = async (e) => {
    e.preventDefault();
    try {
      const { id, status, role, username, email, password } = accountUD;
      const res = await dispatch(
        updateAccount({
          accountId: id,
          status,
          role,
          username,
          email,
          password,
        })
      );
      console.log(res);
      console.log("update Account success");
      setToastMessage("Update account success");
      setShowToast(true);
      const btn = document.getElementById(`closeBtn${id}`);
      btn.click();
    } catch (error) {
      console.log(error);
      console.log("update Account fail");
      throw error;
    }
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;
    setFilter((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <div className="productSession">
      <div className="row filter">
        <h1 className="col-9">ACCOUNT PAGE</h1>
        <div className="col-2">
          <input
            type="text"
            className="filter-search-account"
            placeholder="Find by email"
            name="searchText"
            value={filter.searchText}
            onChange={handleChangeFilter}
          />
        </div>
        <div className="col-1" style={{ paddingLeft: "0" }}>
          <select
            defaultValue={0}
            onChange={handleChangeFilter}
            value={filter.status}
            name="status"
            className="filter-search-account"
            aria-label="Default select example"
          >
            <option
              className="category-option"
              style={{ color: "black" }}
              value={2}
            >
              Status
            </option>
            <option
              className="category-option"
              style={{ color: "black" }}
              value={1}
            >
              Online
            </option>
            <option
              className="category-option"
              style={{ color: "black" }}
              value={0}
            >
              Offline
            </option>
          </select>
        </div>
      </div>
      <hr />
      <div className="category-main">
        <table
          className="table table-dark table-bordered table-striped table-hover"
          style={{
            opacity: "90%",
            color: "#FFFF",
            verticalAlign: "middle",
            // textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {accountData === undefined ? (
              <div>Loading...</div>
            ) : accountData.length === 0 ? (
              <div>No Account found</div>
            ) : (
              accountData.map((account) => {
                if (
                  (filter.searchText === "" ||
                    account.email
                      .toLowerCase()
                      .indexOf(filter.searchText.toLowerCase()) !== -1) &&
                  (filter.status == 2 || filter.status == account.status)
                )
                  return (
                    <>
                      <tr key={account.id}>
                        <th scope="row">{account.id}</th>
                        <td>{account.username}</td>
                        <td>{account.email}</td>
                        <td style={{ alignItems: "center" }}>
                          {account.status === 1 ? (
                            <p
                              style={{
                                color: "#39ff14",
                                fontWeight: "600",
                                margin: "auto",
                              }}
                            >
                              Activated
                            </p>
                          ) : (
                            <p
                              style={{
                                color: "#FF3131",
                                fontWeight: "700",
                                margin: "auto",
                              }}
                            >
                              Locked
                            </p>
                          )}
                        </td>
                        <td style={{ alignItems: "center" }}>
                          {account.role === 1 ? (
                            <p
                              style={{
                                color: "#9D00FF",
                                fontWeight: "700",
                                margin: "auto",
                              }}
                            >
                              USER
                            </p>
                          ) : (
                            <p
                              style={{
                                color: "#FF5F1F",
                                fontWeight: "600",
                                margin: "auto",
                              }}
                            >
                              ADMIN
                            </p>
                          )}
                        </td>
                        <td>
                          <button
                            className="customButton"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseExample${account.id}`}
                            aria-expanded="false"
                            aria-controls={`collapseExample${account.id}`}
                            // onClick={(e) => {
                            //   setaccountUD({
                            //     ...account,
                            //     name: e.target.value(account.name),
                            //   });
                            // }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={4}>
                          {/* <div className="container" style={{ maxWidth: "100%" }}> */}
                          <form
                            className="collapse row"
                            id={`collapseExample${account.id}`}
                            style={{ padding: "5px" }}
                            onSubmit={updateAccountFunction}
                          >
                            <div className="editAccount col-3">
                              You can custom status and role
                            </div>

                            <div className="col-3 ">
                              <select
                                className="customAccountSelect"
                                style={{ width: "100%" }}
                                value={account.status}
                                onChange={(e) => {
                                  setAccountUD({
                                    ...account,
                                    status: Number(e.target.value),
                                  });
                                }}
                              >
                                <option className="category-option" value="1">
                                  Active
                                </option>
                                <option className="category-option" value="0">
                                  Lock
                                </option>
                              </select>
                            </div>

                            <div className="col-3">
                              <select
                                className="customAccountSelect"
                                value={account.role}
                                style={{ width: "100%" }}
                                onChange={(e) => {
                                  setAccountUD({
                                    ...account,
                                    role: Number(e.target.value),
                                  });
                                }}
                              >
                                <option className="category-option" value="1">
                                  User
                                </option>
                                <option className="category-option" value="0">
                                  ADMIN
                                </option>
                              </select>
                            </div>
                            <div className="col-3">
                              <button
                                className="customButton3"
                                style={{ width: "47%" }}
                                type="submit"
                              >
                                Save
                              </button>{" "}
                              <button
                                className="customButton3"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapseExample${account.id}`}
                                aria-expanded="false"
                                aria-controls={`collapseExample${account.id}`}
                                style={{ width: "47%" }}
                                id={"closeBtn" + account.id}
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                          {/* </div> */}
                        </td>
                        <td></td>
                      </tr>
                    </>
                  );
              })
            )}
          </tbody>
        </table>
        {/* Show Toast */}
        {showToast ? (
          <Toast
            className="bg-danger"
            title="Notification"
            message={toastMessage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default AdminAccount;
