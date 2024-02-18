import React, { useEffect, useRef, useState } from "react";
import ProductList from "./components/ProductList";
const connect = () => console.log("connecting");
const disconnect = () => console.log("disconnecting");
const App = () => {
  // const ref = useRef<HTMLInputElement>(null);
  // console.log(ref);

  // also called as after rendering
  // useEffect(() => {
  //   if (ref.current) ref.current.focus();
  // });
  // the below line has nothing to do with the dom and is a side effect hence use these in the useEffect hook
  //if (ref.current) ref.current.focus();

  // useEffect(() => {
  //   document.title = "My App";
  // });

  // const [category, setCategory] = useState("");

  // Effect Clean up
  useEffect(() => {
    connect(); // if this fetches the data

    return () => disconnect(); // this will abort the fetch
  });
  return (
    <div>
      {/* <input ref={ref} type="text" className="form-control" /> */}
      {/* <select
        className="form-select"
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value=""></option>
        <option value="Clothing">Clothing</option>
        <option value="Houshold">Household</option>
      </select>
      <ProductList category={category} /> */}
    </div>
  );
};

export default App;
