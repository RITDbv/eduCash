import { getAuth } from "firebase/auth";

export const getHeader = async () => (
  {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
  }
)