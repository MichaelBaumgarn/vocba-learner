import Navbar from "../Navbar/Navbar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <>
      <Navbar></Navbar>
      <main>{children}</main>
    </>
  );
}
