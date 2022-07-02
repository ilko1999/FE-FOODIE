import React from "react";
import accessDenied from "../assets/access_denied.svg";

function UnauthorizedPage() {
  return (
    <div class="flex items-center justify-center w-screen h-screen">
      <div class="px-4 lg:py-12">
        <div class="lg:gap-16 lg:flex">
          <div class="flex flex-col items-center justify-center md:py-24 lg:py-32">
            <h1 class="font-bold text-orange-600 text-9xl">401</h1>
            <p class="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
              <span class="text-red-500">Oops!</span> You are unauthorized
            </p>
            <p class="mb-8 text-center text-gray-500 md:text-lg">
              Sorry but you are not authorized to access this page 😭.
            </p>
            <a
              href="/"
              class="px-6 py-2 text-sm font-semibold text-orange-600 bg-orange-100"
            >
              Go home
            </a>
          </div>
          <div class="mt-4">
            <img
              src={accessDenied}
              alt="img"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
