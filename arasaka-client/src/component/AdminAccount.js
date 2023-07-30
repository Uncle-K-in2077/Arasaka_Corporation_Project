/** @format */

import { useDispatch, useSelector } from "react-redux";
import AccountService from "../service/AccountService";
import { findAll } from "../redux/accountSlice";
import { useEffect } from "react";

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
    <>
      <h1>ACCOUNT PAGE</h1>
      <hr />
      {JSON.stringify(accountData)};
    </>
  );
}

export default AdminAccount;
