import React, { useEffect, useRef } from "react";

const App = () => {
  const ref = useRef<HTMLInputElement>(null);
  console.log(ref);

  // also called as after rendering
  useEffect(() => {
    if (ref.current) ref.current.focus();
  });
  // the below line has nothing to do with the dom and is a side effect hence use these in the useEffect hook
  //if (ref.current) ref.current.focus();

  useEffect(() => {
    document.title = "My App";
  });
  return (
    <div>
      <input ref={ref} type="text" className="form-control" />
    </div>
  );
};

export default App;
