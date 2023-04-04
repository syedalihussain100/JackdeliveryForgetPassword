import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { resetPasswordAction } from "../redux/Slices/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const formSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});

const Form = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const { token } = queryString.parse(location.search);

  //formik
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      //dispath the action
      const data = {
        password: values?.password,
        token,
      };
      dispatch(resetPasswordAction(data));
    },
    validationSchema: formSchema,
  });

  const storeData = useSelector((state) => state?.users);
  const { loading, appErr, serverErr, resetPassword } = storeData;

  //Redirect

  useEffect(() => {
    setTimeout(() => {
      if (resetPassword) navigate("/view");
    }, 2000);
  }, [resetPassword]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1
        className="text-3xl text-red-600 mb-6
        "
      >
        Jack Delivery Reset Password
      </h1>

      {/* Err msg */}
      <div className="text-red-500 text-center">
        {appErr || serverErr ? (
          <h3>
            {serverErr?.message} {appErr}
          </h3>
        ) : null}
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col justify-center items-center mt-6">
          <input
            type="password"
            placeholder="******"
            className="w-96 py-2 border placeholder:pl-6 pl-6"
            autoComplete="password"
            value={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
          />

          <div>
            {loading ? (
              <button
                disabled
                className="group relative w-full flex justify-center mt-3 mb-3 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 "
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                Loading please wait...
              </button>
            ) : (
              <button
                type="submit"
                className="mt-14 font-bold text-xl text-red-600 bg-white shadow-lg shadow-slate-300 w-96 py-2 rounded-lg"
              >
                Reset Your Password
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
