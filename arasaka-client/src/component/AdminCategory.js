/** @format */

import { useSelector } from "react-redux";
import "../css/AdminCategory.css";
import { useEffect, useState } from "react";
import {
  updateCategory,
  getCategories,
  createCategory,
} from "../redux/categorySlice";
import { useDispatch } from "react-redux";
import Toast from "./Toast";
// import { status } from "./../utils/dataStatus";

function AdminCategory() {
  const categoryData = useSelector((state) => state.category.data);
  const formRefs = {};
  // const [categoryData, setCategoryData] = useState();

  const [categoryUD, setCategoryUD] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", status: 1 });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();

  const getAllCategories = async () => {
    try {
      const res = await dispatch(getCategories());
      console.log("res category", res.payload);
    } catch (error) {
      throw error;
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    if (!categoryUD) {
      console.log("No category selected for update.");
      return;
    }

    try {
      const { id, name, status } = categoryUD;
      const res = await dispatch(
        updateCategory({
          categoryId: id,
          name,
          status,
        })
      );
      console.log("update success");
      console.log(res);
      setToastMessage("Update success");
      setShowToast(true);
      const formRef = formRefs[id];
      if (formRef && formRef.current) {
        formRef.current.querySelector("#cancelBtn").click();
      }
    } catch (error) {
      console.log(error);
      console.log("update fail: ", error);
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      const { name, status } = newCategory;
      const res = await dispatch(
        createCategory({
          name,
          status,
        })
      );
      console.log("create success");
      console.log(res);
      setNewCategory({ name: "", status: 1 });
      getAllCategories();
    } catch (error) {
      console.log("create fail: ", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="productSession">
      <div className="row">
        <div className="col-10">
          <h1>ALL CATEGORY</h1>
        </div>
        <div className="col-2" style={{ textAlign: "center" }}>
          {/* Button trigger modal */}
          <button
            type="button"
            className="customButton2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Create
          </button>
        </div>
      </div>
      <hr />

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <form
            className="modal-content border-3 bg-opacity-10"
            key="create"
            onSubmit={handleCreateCategory}
            style={{
              backgroundColor: "#111111",
              border: "2px solid #FF5F1F",
              borderRadius: "0",
            }}
          >
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                CREATE NEW CATEGORY
              </h1>
              <button
                type="button"
                className="btn-close btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <input
                required
                className="newProduct-input-3"
                type="text"
                placeholder="New Category Name"
                style={{ marginBottom: "10px" }}
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="customButton2">
                Save
              </button>
              <button
                type="button"
                className="customButton2"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="category-main">
        {/* table start */}
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
              <th scope="col">Status</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {categoryData === undefined ? (
              <div>Loading...</div>
            ) : categoryData.length === 0 ? (
              <div>No category found</div>
            ) : (
              categoryData.map((category) => {
                return (
                  <>
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td className="neon-effect">{category.name}</td>
                      <td>
                        {category.status === 1 ? (
                          <p style={{ color: "#39ff14", fontWeight: "600" }}>
                            Online
                          </p>
                        ) : (
                          <p style={{ color: "#FF5F1F", fontWeight: "600" }}>
                            Offline
                          </p>
                        )}
                      </td>
                      <td colSpan={0.5}>
                        <button
                          className="customButton"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseExample${category.id}`}
                          aria-expanded="false"
                          aria-controls={`collapseExample${category.id}`}
                          // onClick={(e) => {
                          //   setCategoryUD({
                          //     ...category,
                          //     name: e.target.value(category.name),
                          //   });
                          // }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4}>
                        <div
                          className="collapse"
                          id={`collapseExample${category.id}`}
                          style={{ padding: "5px" }}
                          ref={formRefs[category.id]}
                        >
                          <form
                            key={category.id}
                            onSubmit={handleUpdateCategory}
                          >
                            <input
                              className="newProduct-input-2"
                              type="text"
                              name="categoryName"
                              placeholder="New name?"
                              // value={category.name}
                              onChange={(e) => {
                                setCategoryUD({
                                  ...category,
                                  name: e.target.value,
                                });
                              }}
                            />

                            <select
                              name="categoryStatus"
                              value={category.status}
                              className="newProduct-input-2"
                              onChange={(e) => {
                                setCategoryUD({
                                  ...category,
                                  status: Number(e.target.value),
                                });
                              }}
                            >
                              <option className="category-option" value="1">
                                Activate
                              </option>
                              <option className="category-option" value="0">
                                In-activated
                              </option>
                            </select>

                            <button type="submit" className="customButton2">
                              Save
                            </button>

                            <button
                              type="reset"
                              className="customButton2"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapseExample${category.id}`}
                              aria-expanded="false"
                              aria-controls={`collapseExample${category.id}`}
                              id="cancelBtn"
                            >
                              Cancel
                            </button>
                          </form>
                        </div>
                      </td>
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

export default AdminCategory;
