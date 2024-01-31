import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Oval
        visible={true}
        height="20"
        width="20"
        color="#fff"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
