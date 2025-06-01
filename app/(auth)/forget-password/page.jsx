"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
  });
  const { email } = credentials;

  const router = useRouter();

  // !form handleSubmit
  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      return toast.error("Email field can't be empty");
    }

    try {
      const res = await sendPasswordResetEmail(auth, email);
      console.log({ res });
      setCredentials({ email: "" });
      router.push("sign-up");
      toast.success(`Password reset email sent to ${email}`);

    } catch (error) {
      console.log(error);
      toast.error(error.message || "Failed to send password reset email");
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
        <p className="text-xl font-semibold">Forget Password</p>
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

          <button
            data-aos="flip-right"
            className="w-full p-4 cursor-pointer bg-blue-500 hover:bg-blue-400 text-lg text-white font-semibold rounded mt-2"
          >
            {"Forget password"}
          </button>
          <Link
            href="/sign-in"
            className="text-end mt-2 text-blue-600 hover:underline text-base"
          >
            Already have an account 👨‍💻
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
