/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 mb-2 text-white">
            {error}
          </div>
        ))}
        <header className="py-2">
          <h1 className="text-2xl font-bold pb-2 text-center">Register</h1>
          <hr />
        </header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="username"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md mb-2"
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && <p className="text-red-500">Required username</p>}

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
            Submit
          </button>
        </form>

        <p className="flex gap-x-2 justify-between mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500">
            Log in!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
