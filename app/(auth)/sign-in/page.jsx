"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css"; 
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const { email, password } = credentials;
  const [toggle, setToggle] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Both fields are required");
    }

    await signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    if (error) {
      if (error.code === "auth/invalid-credential") {
        toast.error("Invalid login credentials");
      } else {
        toast.error(error.message || "Something went wrong");
      }
    }
  }, [error]);

  useEffect(() => {
    const storeToken = async () => {
      if (user?.user) {
        try {
          const token = await user.user.getIdToken();
          localStorage.setItem("token", token);
          toast.success(`${user.user.email} logged in`);
          setCredentials({ email: "", password: "" });
          router.push("/");
        } catch (err) {
          console.error(err);
          toast.error(err.message || "Error retrieving token");
        }
      }
    };

    storeToken();
  }, [user, router]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-slate-100 h-[100vh] w-[100vw]">
      <div className="h-[80vh] flex justify-center items-center flex-col gap-4">
        <p className="text-2xl font-semibold">Sign in</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[350px] gap-2 text-lg relative"
        >
          <input
            className="p-4 rounded"
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter EmailId"
            data-aos="fade-left"
          />
          <input
            className="p-4 rounded"
            type={toggle ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
            data-aos="fade-right"
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="absolute inline-block top-24 right-3 text-xl text-slate-700 cursor-pointer"
          >
            {toggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
          <button
            type="submit"
            data-aos="flip-right"
            className="w-full p-4  cursor-pointer bg-blue-500 hover:bg-blue-400 text-lg text-white font-semibold rounded mt-2"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <div className="flex justify-between">
            <Link
              href="/sign-up"
              className="text-end cursor-pointer mt-2 text-blue-600 hover:underline text-base"
            >
              Create an account ✒️
            </Link>
            <Link
              href="/forget-password"
              className="text-end mt-2 text-blue-600 hover:underline text-base"
            >
              Forget password 👨‍💻
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
