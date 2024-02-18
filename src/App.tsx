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
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        let res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users",
          { signal: controller.signal }
        );
        setUsers(res.data);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      }
      setIsLoading(false);
    };
    fetchUsers();
    return () => controller.abort();
  }, []);
  const deleteUser = (user: User) => {
    //optimistic approach
    console.log(user);

    setUsers(users.filter((u) => u.id !== user.id));

    const deleteUserFromServer = async () => {
      let originalUserList = [...users];
      try {
        let res = await axios.delete(
          "https://jsonplaceholder.typicode.com/users/" + user.id
        );
      } catch (error) {
        setError((error as AxiosError).message);
        console.log("logging the error", error);
        setUsers(originalUserList);
      }
    };
    deleteUserFromServer();
  };
  const addUser = () => {
    const newUser = { id: users.length + 1, name: "athreya" }; // realtime is from a form
    setUsers([newUser, ...users]);

    const addUserToServer = async () => {
      const originalUserList = [...users];
      try {
        await axios.post("https://jsonplaceholder.typicode.com/users", newUser);
        //note that adding the new user returns a user with updated id from backend server ,
        // make sure to update that as well
      } catch (error) {
        setError((error as AxiosError).message);
        console.log("logging the error", error);
        setUsers(originalUserList);
      }
    };
    addUserToServer();
  };
  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-5" onClick={addUser}>
        Add User
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.name}{" "}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
