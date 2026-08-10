import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";


export default function Dashboard(){

return (

<div className="flex h-screen">

<Sidebar />

<div className="flex-1">

<Header />

<main>
<Outlet />
</main>

</div>

</div>

);

}