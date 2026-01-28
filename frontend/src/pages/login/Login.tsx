// src/pages/login/Login.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useNavigate } from "react-router-dom";
import bird from "../../assets/bird.gif";
import { useForm } from "react-hook-form";
import type { ILoginUserInput } from "@/types/authType";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setAccessToken, setUser } from "@/redux/features/auth/authSlice";
import { toast } from "react-toastify";
import Loading from "@/components/shared/Loading";
// import { jwtDecode } from "jwt-decode";
// import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginUserInput>();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  // const [socialLogin, { isLoading: isSocialLoading }] = useSocialLoginMutation();
  
const location = useLocation();
const from = (location.state as any)?.from || "/";
const onSubmit = async (data: ILoginUserInput) => {
  try {
    const response = await loginUser(data).unwrap();
    dispatch(setUser(response.data.user));           
    dispatch(setAccessToken(response.data.accessToken));  
    toast.success(response.message || "Login successful!");
    navigate(from, { replace: true });
  } catch (error: any) {
    toast.error(error?.data?.message || "Login failed!");
  }
};


  // const handleGoogleSuccess = async (credentialResponse: any) => {
  //   try {
  //     const decoded: any = jwtDecode(credentialResponse.credential);

  //     const payload = {
  //       email: decoded.email,
  //       name: decoded.name,
  //       avatar: decoded.picture, 
  //     };

  //     const response = await socialLogin(payload).unwrap();
  //     dispatch(setUser(response.data));
  //     toast.success(response.message || "Login successful!");
  //     navigate("/");
  //   } catch (error: any) {
  //     console.error("Google login error:", error);
  //     toast.error(error?.data?.message || "Google login failed!");
  //   }
  // };

  // const handleGoogleError = () => {
  //   toast.error("Google login failed! Please try again.");
  // };

  if (isLoading ) {
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
                Sign In
              </h1>
              <p className="text-gray-500 mb-8">Login to stay connected.</p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email */}
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("email", { required: "Email is required" })}
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

                {/* Password */}
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder=" "
                    className="peer w-full px-4 py-3 border border-gray-300 rounded-lg bg-transparent 
                              focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent 
                              transition-all placeholder-transparent"
                    {...register("password", {
                      required: "Password is required",
                    })}
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

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full cursor-pointer sm:w-auto px-8 py-3 bg-cyan-400 text-white font-medium rounded-lg hover:bg-cyan-500 transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Sign In
                </button>
              </form>

              {/* Sign Up Link */}
              <p className="mt-6 text-gray-600">
                Don't have an Account?{" "}
                <Link
                  to="/register"
                  className="text-cyan-400 hover:text-cyan-500 font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Google Sign In */}
              {/* <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                />
              </div> */}
            </div>
          </div>

          {/* Bird Section */}
          <div className="absolute lg:static lg:flex lg:w-[40%] top-[68%] right-1 items-center justify-center p-12">
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

export default Login;