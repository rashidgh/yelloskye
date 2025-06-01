"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = credentials;
  const [toggle, setToggle] = useState(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();
  // !form handleSubmit
  const handleSubmit = async e => {
    e.preventDefault();
    if (!email && !password) {
      return toast.error("Credentials can't be empty");
    }
    if (!email) {
      return toast.error("Email field can't be empty");
    }
    if (!password) {
      return toast.error("Password can't be empty");
    }
    console.log(credentials);
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      setCredentials({ email: "", password: "" });
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error("Unauthorized Credentials");
    }
  };

  // !form handleChange
  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div className="bg-slate-100 h-[100vh] w-[100vw]">
      <div className="h-[80vh] flex justify-center items-center flex-col gap-4">
        <p className="text-2xl font-semibold">Sign up</p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-[350px] gap-2 text-lg relative"
        >
          <input
            className="p-4 rounded"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Enter user name"
            data-aos="fade-left"
          />
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
            type={!toggle ? "password" : "text"}
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
            data-aos="fade-right"
          />
          <span
            onClick={() => setToggle(!toggle)}
            className="absolute inline-block top-40 right-3 text-xl text-slate-700 cursor-pointer	"
          >
            {toggle ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </span>
          <button
            data-aos="flip-right"
            className="w-full p-4 bg-blue-500 hover:bg-blue-400 text-lg text-white font-semibold cursor-pointer rounded mt-2"
          >
            {"Sign up"}
          </button>
          <Link
            href="/sign-in"
            className="text-end mt-2 text-blue-600 hover:underline text-base "
          >
            Already have an account? Log in 👨‍💻
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
