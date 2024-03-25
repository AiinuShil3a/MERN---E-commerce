import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaSave } from "react-icons/fa";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { handleSubmit, register, setValue } = useForm();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure.get(`/products/${id}`);
        if (res.status === 200) {
          setValue("name", res.data.name);
          setValue("detail", res.data.description);
          setValue("category", res.data.category);
          setValue("price", res.data.price);
          setValue("imageURL", res.data.image);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    const productInfo = {
      name: data.name,
      description: data.detail,
      category: data.category,
      price: data.price,
      image: data.imageURL,
    };
    try {
      axiosSecure.put(`/products/${id}`, productInfo).then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "Update Successfully",
            icon: "success",
          }).then(() => {
            window.location.href = "/dashboard/listProduct";
          });
        }
      });
    } catch (error) {
      Swal.fire({
        title: error,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <div className=" flex my-10">
        <h2 className="text-2xl"> Update a</h2>
        <h2 className="text-2xl ml-3 text-red"> Product items</h2>
      </div>
      <div className="h-full w-[70vw]">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Name</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              required
              {...register("name")}
            />
          </div>
          <div className="flex justify-between">
            <div className="w-full">
              <label className="label">
                <span className="label-text">Type of product</span>
              </label>
              <select
                className="input input-bordered w-full"
                {...register("category")}
                required
              >
                <option value="" disabled selected hidden>
                  Select your type product
                </option>
                <option value="Electronic">Electronic</option>
                <option value="Gaming Gear">Gaming Gear</option>
                <option value="Toy">Toy</option>
              </select>
            </div>
            <div className="ml-2 w-full">
              <label className="label">
                <span className="label-text">Price of product</span>
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                required
                {...register("price")}
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Product Detail</span>
            </label>
            <textarea
              type="text"
              className="input input-bordered h-[8rem]"
              required
              {...register("detail")}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image Url</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              required
              {...register("imageURL")}
            />
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="bg-red flex items-center justify-center px-4 py-2 text-white rounded-md"
            >
              Update Item
              <FaSave className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
