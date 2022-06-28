function Alert({ errorData }) {
  return (
    <div
      className={`p-2 mt-4 ${
        errorData.status !== 200 ? "bg-red-500" : "bg-orange-500"
      } items-center text-white leading-none rounded-md flex lg:inline-flex`}
      role="alert"
    >
      <span
        className={`flex rounded-full ${
          errorData.status !== 200 ? "bg-red-300" : "bg-orange-300"
        }  uppercase px-2 py-1 text-sm font-bold mr-3 text-white`}
      >
        {errorData.status}
      </span>
      <span className={`font-semibold mr-2 text-left flex-auto`}>
        {errorData.message}
      </span>
    </div>
  );
}

export default Alert;
