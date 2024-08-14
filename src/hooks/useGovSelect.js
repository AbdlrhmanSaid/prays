// import  { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGovSelect = () => {
//   const dispatch = useDispatch();
//   const { governorates, loading, error } = useSelector((state) => state.city);
//   const [governorate, setGovernorate] = useState("");

//   useEffect(() => {
//     const savedGovernorate = localStorage.getItem("selectedGovernorate");
//     if (savedGovernorate) {
//       setGovernorate(savedGovernorate);
//     }

//     dispatch(getGovernorates());
//   }, [dispatch]);

//   useEffect(() => {
//     if (governorate) {
//       dispatch(getPrays(governorate));
//       localStorage.setItem("selectedGovernorate", governorate);
//     }
//   }, [governorate, dispatch]);

//   const handleChange = (event) => {
//     setGovernorate(event.target.value);
//   };

//   return {
//     governorate,
//     handleChange,
//     governorates,
//     loading,
//     error,
//   };
// };

// export default useGovSelect;

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPrays } from "../store/slices/getPraySlice";
import { getGovernorates } from "../store/slices/getCity";

const useGovSelect = () => {
  const dispatch = useDispatch();
  const { governorates, loading, error } = useSelector((state) => state.city);
  const [governorate, setGovernorate] = useState("");

  useEffect(() => {
    const savedGovernorate = localStorage.getItem("selectedGovernorate");
    if (savedGovernorate) {
      setGovernorate(savedGovernorate);
    }

    dispatch(getGovernorates());
  }, [dispatch]);

  useEffect(() => {
    if (governorate) {
      dispatch(getPrays(governorate));
      localStorage.setItem("selectedGovernorate", governorate);
    }
  }, [governorate, dispatch]);

  const handleChange = (event) => {
    setGovernorate(event.target.value);
  };

  return {
    governorate,
    handleChange,
    governorates,
    loading,
    error,
  };
};

export default useGovSelect;
