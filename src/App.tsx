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

import apiClient, { AxiosError, CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // for fethching all the users
  useEffect(() => {
    // const controller = new AbortController();
    // const fetchUsers = async () => {
    //   setIsLoading(true);
    //   try {
    //     let res = await apiClient.get<User[]>("/users", {
    //       signal: controller.signal,
    //     });
    //     setUsers(res.data);
    //   } catch (error) {
    //     setIsLoading(false);
    //     if (error instanceof CanceledError) return;
    //     setError((error as AxiosError).message);
    //   }
    //   setIsLoading(false);
    // };
    // fetchUsers();
    // return () => controller.abort();
    (async function iife() {
      try {
        setIsLoading(true);
        let res = await userService.getAll<User>().fetch();
        setUsers(res.data);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof CanceledError) return;
        setError((error as AxiosError).message);
      }
      setIsLoading(false);
    })();
    return () => userService.getAll<User>().controller.abort(); // returns a function doesnot calls it
  }, []);
  const deleteUser = (user: User) => {
    //optimistic approach
    console.log(user);

    setUsers(users.filter((u) => u.id !== user.id));

    // const deleteUserFromServer = async () => {
    //   let originalUserList = [...users];
    //   try {
    //     let res = await apiClient.delete("/users/" + user.id);
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //     console.log("logging the error", error);
    //     setUsers(originalUserList);
    //   }
    // };

    (async function iife() {
      let originalUserList = [...users];
      try {
        let res = await userService.delete(user);
      } catch (error) {
        setError((error as AxiosError).message);
        setUsers(originalUserList);
      }
    })();
  };
  const addUser = () => {
    const newUser = { id: users.length + 1, name: "athreya" }; // realtime is from a form
    setUsers([newUser, ...users]);

    // const addUserToServer = async () => {
    //   const originalUserList = [...users];
    //   try {
    //     await apiClient.post("/users", newUser);
    //     //note that adding the new user returns a user with updated id from backend server ,
    //     // make sure to update that as well
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //     console.log("logging the error", error);
    //     setUsers(originalUserList);
    //   }
    // };
    // addUserToServer();

    (async function iife() {
      let originalUserList = [...users];
      try {
        await userService.add(newUser);
      } catch (error) {
        setError((error as AxiosError).message);
        setUsers(originalUserList);
      }
    })();
  };
  const updateUser = (user: User) => {
    const updatedUser = { ...user, name: user.name + "!!!!!!" };
    setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));

    // const updateUserToServer = async () => {
    //   const originalUserList = [...users];
    //   try {
    //     await apiClient.patch("/users/" + user.id, updatedUser);
    //   } catch (error) {
    //     setError((error as AxiosError).message);
    //     console.log("logging the error", error);
    //     setUsers(originalUserList);
    //   }
    // };
    // updateUserToServer();
    (async function iife() {
      const originalUserList = [...users];
      try {
        await userService.update(user, updatedUser);
      } catch (error) {
        setError((error as AxiosError).message);
        setUsers(originalUserList);
      }
    })();
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
            <div className="pd-2 d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary m-2"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger m-2"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
