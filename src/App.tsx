import { useEffect, useState } from "react";
import { AxiosError, CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";
const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // for fethching all the users
  useEffect(() => {
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
    (async function iife() {
      let originalUserList = [...users];
      try {
        await userService.delete(user);
      } catch (error) {
        setError((error as AxiosError).message);
        setUsers(originalUserList);
      }
    })();
  };
  const addUser = () => {
    const newUser = { id: users.length + 1, name: "athreya" }; // realtime is from a form
    setUsers([newUser, ...users]);
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
