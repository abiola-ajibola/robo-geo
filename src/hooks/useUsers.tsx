import { useEffect, useState } from "react";
import { User } from "../types";

const API_BASE_URL: string = "https://jsonplaceholder.typicode.com/";
const IMAGE_BASE_URL: string = "https://robohash.org/";
export default function useUsers(): User[] {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_BASE_URL + "users");
      const data: User[] = await response.json();
      setUsers(data);
    };
    fetchData();
  }, []);
  return users.map((user) => {
    user.image_url = `${IMAGE_BASE_URL + user.name}?size=64x64&set=set3`;
    return user;
  });
}
