// import React, { useEffect, useRef, useState } from "react";
// import ProductList from "./components/ProductList";
// const connect = () => console.log("connecting");
// const disconnect = () => console.log("disconnecting");
// const App = () => {
//   // const ref = useRef<HTMLInputElement>(null);
//   // console.log(ref);

//   // also called as after rendering
//   // useEffect(() => {
//   //   if (ref.current) ref.current.focus();
//   // });
//   // the below line has nothing to do with the dom and is a side effect hence use these in the useEffect hook
//   //if (ref.current) ref.current.focus();

//   // useEffect(() => {
//   //   document.title = "My App";
//   // });

//   // const [category, setCategory] = useState("");

//   // Effect Clean up
//   useEffect(() => {
//     connect(); // if this fetches the data

//     return () => disconnect(); // this will abort the fetch
//   });
//   return (
//     <div>
//       {/* <input ref={ref} type="text" className="form-control" /> */}
//       {/* <select
//         className="form-select"
//         onChange={(event) => setCategory(event.target.value)}
//       >
//         <option value=""></option>
//         <option value="Clothing">Clothing</option>
//         <option value="Houshold">Household</option>
//       </select>
//       <ProductList category={category} /> */}
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useState } from "react";
import axios, { AxiosError, CanceledError } from "axios";
interface User {
  id: number;
  name: string;
}
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        let res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setUsers(res.data);
      } catch (error) {
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      }
    };
    fetchUsers();
    return () => controller.abort();
  }, []);
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
