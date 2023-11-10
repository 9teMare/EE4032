import Navbar from "../components/Navbar";

export default function Layout({ children }: { children: JSX.Element | JSX.Element[] }) {
    return (
        <div className="w-screen">
            <Navbar />
            <div className="w-full flex flex-col justify-center items-center">{children}</div>
        </div>
    );
}
