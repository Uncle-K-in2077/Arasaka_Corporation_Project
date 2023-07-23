import { useEffect, useState } from "react";
import ProductService from './../service/ProductService';
import CategoryService from './../service/CategoryService';
import { Link } from "react-router-dom";

function AdminProduct() {
  const [results, setResults] = useState([]);
  const [category,setCategory] = useState([]);
  const [category_id,setCategory_id] = useState(0);
  // const [newProduct,setNewProduct]= useState({
  //   name:
    
  //   })

  // async function createProduct(newProduct){


  //   setResults([...results, newProduct]);
  // }


async function getAllCategory() {
  try {
    const res = await CategoryService.findAll();
    if (res) {
      setCategory(res.data);
    }
  } catch (error) {
    console.log(error);
  }
}

  async function getAllProduct(){
    try {
      const res = await ProductService.getAllProducts();
      if(res){
        setResults(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
    getAllProduct();
  }, []);


  return (
    <div className="productSession">
      <h1>ALL CYBER WARE</h1>
      <hr />

      <div className="sort" style={{ display: "flex" }}>
        <h4>Sort</h4>
        <input
          type="text"
          name=""
          id=""
          placeholder="Finding something?"
          style={{ padding: "10px" }}
        />
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          New Product +
        </button>
      </div>

      <br />

      {/* Product Create Collapse form */}
      <div className="collapse" id="collapseExample">
        <form>
          <div
            className="card card-body"
            // style={{ backgroundColor: "#99999928" }}
          >
            <div className="row">
              <div className="col-6">
                <input
                  className="newProduct-input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div className="col-6">
                <input
                  className="newProduct-input"
                  type="number"
                  placeholder="Price"
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  className="newProduct-input"
                  type="number"
                  placeholder="Stock"
                />
              </div>
              <div className="col-4" style={{ marginTop: "15px" }}>
                <input
                  className="newProduct-input"
                  type="file"
                  placeholder="Image"
                />
              </div>

              <div className="col-4" style={{ marginTop: "15px" }}>
                <select
                  onChange={(e) => {
                    setCategory_id(e.target.value);
                    console.log(category_id);
                  }}
                  className="form-select newProduct-input"
                  aria-label="Default select example"
                >
                  <option value={0} style={{ color: "black" }}>
                    What type?
                  </option>

                  {category
                    ? category.map((item) => {
                        return (
                          <option
                            style={{ color: "black" }}
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </option>
                        );
                      })
                    : <></>}
                </select>
              </div>

              <div className="col-12" style={{ marginTop: "15px" }}>
                <textarea className="newProduct-input" />
              </div>

              <div className="col-6" style={{ marginTop: "15px" }}>
                <button type="submit" className="newProduct-input">
                  SAVE
                </button>
              </div>
              <div className="col-6" style={{ marginTop: "15px" }}>
                <button
                  type="reset"
                  className="newProduct-input"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseExample"
                  aria-expanded="false"
                  aria-controls="collapseExample"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <br />

      {/* Product Table */}
      <div className="product">
        <table
          className="table table-dark table-border"
          style={{ opacity: "80%", color: "#FFFF" }}
        >
          <thead>
            <tr>
              <th scope="col" style={{ color: "#FE5000" }}>
                ID
              </th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {results && Array.isArray(results) ? (
              results.map((product) => (
                <tr key={product.id}>
                  <th scope="row">{product.id}</th>
                  <td>
                    <Link className="product-link" to="/admin/product/detail">{product.name}</Link>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No products found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminProduct;
