/** @format */

import { useSelector } from "react-redux";
import "../css/AdminCategory.css";
import { useState } from "react";
import { updateCategory } from "../redux/categorySlice";
import { useDispatch } from "react-redux";

function AdminCategory() {
  const categoryData = useSelector((state) => state.category.data);

  const [categoryUD, setCategoryUD] = useState();
  const dispatch = useDispatch();

  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("categoryData", JSON.stringify(categoryUD));
      dispatch(
        updateCategory({ categoryId: categoryUD.id, categoryData: formData })
      );
      console.log("update success");
    } catch (error) {
      console.log(error);
      console.log("update fail: ", error);
    }
  };

  return (
    <div className="productSession">
      <h1>CATEGORY PAGE</h1>
      <hr />
      <div className="category-main">
        {/* table start */}
        <table
          className="table table-dark table-bordered table-striped"
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
            {categoryData ? (
              categoryData.map((category) => {
                return (
                  <>
                    <tr key={category.id}>
                      <th scope="row">{category.id}</th>
                      <td>{category.name}</td>
                      <td>
                        {category.status == 1 ? <p>Online</p> : <p>Offline</p>}
                      </td>
                      <td colSpan={0.5}>
                        <button
                          className="customButton"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#collapseExample${category.id}`}
                          aria-expanded="false"
                          aria-controls={`collapseExample${category.id}`}
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
                              onChange={(e) => {
                                setCategoryUD({
                                  ...category,
                                  name: e.target.value,
                                });
                              }}
                              required
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

                            <button type="submit" className="customButton">
                              Save
                            </button>

                            <button type="reset" className="customButton">
                              Cancel
                            </button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })
            ) : (
              <>No category found</>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminCategory;
