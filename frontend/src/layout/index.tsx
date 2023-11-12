import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <div className="w-screen h-screen flex flex-col">
            <Navbar />
            <div className="w-full h-full flex flex-col ">{children}</div>
        </div>
    );
}
