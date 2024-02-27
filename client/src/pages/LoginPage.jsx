/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {signinErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 mb-2 text-white text-center">
            {error}
          </div>
        ))}
        <header className="py-2">
          <h1 className="text-2xl font-bold pb-2 text-center">Login</h1>
          <hr />
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500">Required email address</p>
          )}

          <input
            placeholder="password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <p className="text-red-500">Required password</p>}

          <button className="w-full bg-indigo-500 py-2 px-4" type="submit">
            Login
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-3">
          Do not have an account?{" "}
          <Link to="/register" className="text-sky-500">
            Sign up!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
