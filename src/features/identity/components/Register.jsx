import React from "react";
import logo from "@assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
const Register = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} alt="logo" style={{ height: "100px" }} />
        <h1 className="h2">پلتفرم آموزش آنلاین</h1>
        <p className="lead">
          جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
        </p>
        <p className="lead">
          قبلا ثبت نام نکرده اید ؟
          <Link to="/login" className="me-2">
            وارید شوید
          </Link>
        </p>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label" htmlFor="mobile">
                  موبایل
                </label>
                <input
                  {...register("mobile", {
                    required: "موبایل الزامی است",
                    minLength: 11,
                    maxLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.mobile?.message}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "minLength" ||
                    (errors.mobile && errors.mobile.type === "maxLength")) && (
                    <p className="text-danger small fw-bolder mt-1">
                      موبایل باید 11 رقم باشد{" "}
                    </p>
                  )}
              </div>
              <div className="mb-3">
                <label className="form-label">رمز عبور</label>
                <input
                  {...register("password", {
                    required: "رمز عبور الزامی است",
                  })}
                  type="password"
                  className={`form-control form-control-lg ${
                    errors.password && "is-invalid"
                  }`}
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">تکرار رمز عبور</label>
                <input
                  {...register("confirmPassword", {
                    required: "تکرار رمز عبور الزامی است",
                    validate: (value) => {
                      if (watch("password") !== value) {
                        return "عدم تطابق با رمز وارد شده";
                      }
                    },
                  })}
                  type="password"
                  className={`form-control form-control-lg mb-2 ${
                    errors.confirmPassword && "is-invalid"
                  }`}
                />
                {errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-lg btn-primary">
                  ثبت نام کنید{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
