/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import bird from "../../assets/bird.gif";
import google from "../../assets/google.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterSchemaType  } from "@/validations/auth.validation";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchemaType>({ resolver: zodResolver(registerSchema) });

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  
  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await registerUser(data).unwrap();
      navigate("/activation", { state: { email: data.email } });
      toast.success("Check your email for activation link.");
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed!");
    }
  };
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl border">
        <div className="flex flex-col lg:flex-row">
          {/* Form Section */}
          <div className="w-full lg:w-[60%] p-6 sm:p-8 lg:p-12 relative">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-2">
                Sign UP
              </h1>
              <p className="text-gray-500 mb-8">SignUp to be connected.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Full name */}
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("name")}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 top-3 text-gray-400 bg-white px-1 
                                transition-all duration-200
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-placeholder-shown:text-base
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-500
                                peer-not-placeholder-shown:-top-2
                                peer-not-placeholder-shown:text-sm
                                peer-not-placeholder-shown:text-cyan-500"
                  >
                    Full Name
                  </label>

                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("email")}
                  />

                  <label
                    htmlFor="email"
                    className="absolute left-4 top-3 text-gray-400 bg-white px-1 
                                transition-all duration-200
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-placeholder-shown:text-base
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-500
                                peer-not-placeholder-shown:-top-2
                                peer-not-placeholder-shown:text-sm
                                peer-not-placeholder-shown:text-cyan-500"
                  >
                    Email
                  </label>

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="relative">
                  <input
                    type="tel"
                    id="phone"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("phone")}
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-4 top-3 text-gray-400 bg-white px-1 
                                transition-all duration-200
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-placeholder-shown:text-base
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-500
                                peer-not-placeholder-shown:-top-2
                                peer-not-placeholder-shown:text-sm
                                peer-not-placeholder-shown:text-cyan-500"
                  >
                    Phone Number
                  </label>

                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("password")}
                  />
                  <label
                    htmlFor="password"
                    className="absolute left-4 top-3 text-gray-400 bg-white px-1 
                                transition-all duration-200
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-placeholder-shown:text-base
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-500
                                peer-not-placeholder-shown:-top-2
                                peer-not-placeholder-shown:text-sm
                                peer-not-placeholder-shown:text-cyan-500"
                  >
                    Password
                  </label>

                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("confirmPassword")}
                  />
                  <label
                    htmlFor="confirmPassword"
                    className="absolute left-4 top-3 text-gray-400 bg-white px-1 
                                transition-all duration-200
                                peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 
                                peer-placeholder-shown:text-base
                                peer-focus:-top-2 peer-focus:text-sm peer-focus:text-cyan-500
                                peer-not-placeholder-shown:-top-2
                                peer-not-placeholder-shown:text-sm
                                peer-not-placeholder-shown:text-cyan-500"
                  >
                    Confirm Password
                  </label>

                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer sm:w-auto px-8 py-3 bg-cyan-400 text-white font-medium rounded-lg hover:bg-cyan-500 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </form>

              {/* Sign In Link */}
              <p className="mt-6 text-gray-600">
                Already have an Account?{" "}
                <Link
                  to="/login"
                  className="text-cyan-400 hover:text-cyan-500 font-medium transition-colors"
                >
                  Sign In
                </Link>
              </p>

              {/* Google Sign In */}
              <button className="mt-6 w-full sm:w-auto flex items-center hover:border-green-700 hover:bg-green-600 cursor-pointer justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg transition-colors duration-200">
                <img src={google} alt="Google" className="w-6 h-6" />
                <span className="text-gray-600 font-medium">
                  Connect with Google
                </span>
              </button>
            </div>
          </div>

          {/* Bird Section */}
          <div className="absolute lg:static lg:flex lg:w-[40%] top-[78%] right-1 items-center justify-center p-12">
            <div className="relative">
              <img
                src={bird}
                alt="birdImage"
                className="transform -scale-x-100 w-24 lg:w-80 h-24 lg:h-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;