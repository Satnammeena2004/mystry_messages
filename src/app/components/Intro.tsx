import Image from "next/image";
import React from "react";
import Logo from "@/../public/logo.jpg";
const Intro = () => {
  return (
    <>
      <Image
        src={Logo}
        width={100}
        className="mb-2 mx-auto  mx-a
          uto rounded-lg"
        height={100}
        alt="logo"
      />
      <div className="mb-4 dark:text-white">
        <h1 className="text-4xl font-semibold text-center ">
          Join <span className="text-blue-500">Anonify</span>
        </h1>
        <p className="text-xs my-2 text-center dark:text-white">
          Sign up to start anonymous journy
        </p>
      </div>
    </>
  );
};

export default Intro;
