/** @format */

import { useDispatch, useSelector } from "react-redux";
import AccountService from "../service/AccountService";
import { findAll } from "../redux/accountSlice";
import { useEffect } from "react";
import "../css/AdminCategory.css";

function AdminAccount() {
  const accountData = useSelector((state) => state.account?.data);
  const dispatch = useDispatch();

  async function getAccountData() {
    try {
      const res = await AccountService.getAllAccounts();
      dispatch(findAll(res.data));
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAccountData();
  }, []);

  return (
    <div className="productSession">
      <h1>ACCOUNT PAGE</h1>
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
                              color: "#FF5F1F",
                              fontWeight: "600",
                              margin: "auto",
                            }}
                          >
                            In-activated
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
                      <td colSpan={0.5}>
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
                      <td colSpan={6}>
                        <div
                          className="collapse"
                          id={`collapseExample${account.id}`}
                          style={{ padding: "5px" }}
                        >
                          ABCDEFGH
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminAccount;
