import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductListUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/products`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [product]);

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = currentPage * itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  const handleDeleteUser = (products) => {
    Swal.fire({
      title: "Are you Sure",
      text: "You want to delete this " + `${products.name}` + "?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axiosSecure.delete(`/products/${products._id}`).then((res) => {
            if (res.status === 200) {
              Swal.fire({
                title: "Deleted!",
                text: `${res.data.name} has deleted!`,
                icon: "success",
              });
            }
          });
        } catch (error) {
          Swal.fire({
            title: "Deleted!",
            text: `${error} can't deleted!`,
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="flex justify-between mx-5 my-10">
        <h2 className="text-2xl"> All products</h2>
        <h2 className="text-2xl">ทั้งหมด {product.length} รายการ</h2>
      </div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* Table header */}
            <thead className="bg-red text-white text-center">
              <tr>
                <th>
                  <label>#</label>
                </th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th> Delete</th>
              </tr>
            </thead>

            <tbody className="text-center">
              {currentItems.map((products, index) => (
                <tr key={index}>
                  <th>
                    <label>{indexOfFirstItem + index + 1}</label>
                  </th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={products.image}
                            alt="Product Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{products.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>${products.price}</td>
                  <th>
                    <Link to={`/dashboard/update/${products._id}`}>
                      <button className="btn btn-ghost btn-xs">
                        <FaEdit />
                      </button>
                    </Link>
                  </th>
                  <th>
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDeleteUser(products)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center my-10">
        <button
          className="btn bg-red text-white mx-2"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Back
        </button>
        <button
          className="btn bg-red text-white mx-2"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= product.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductListUpdate;
