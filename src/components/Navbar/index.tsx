import { useContext, useEffect } from "react";
import { MetamaskContext } from "../../context";
import ProfileIcon from "../ProfileIcon";
import ConnectButton from "./ConnectButton";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { metamask, address, setters } = useContext(MetamaskContext)!;
    const { setIsConnected } = setters;
    const handleLogout = () => {
        if (metamask) {
            metamask
                .disconnect()
                .then(() => {
                    console.log("User is logged out");
                    // Perform any additional actions after logout, if necessary
                    setIsConnected(false);
                })
                .catch((error: any) => {
                    console.error("Error while logging out:", error);
                });
        }
    };

    return (
        <div className="navbar bg-base-100 justify-between">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    EE4032 Blockchain Engineering
                </Link>
                <Link className="flex justify-center" to="/AboutUsPage" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    ABOUT US     
                </Link>
                <Link className="flex justify-center" to="/MissionPage" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    MISSION PAGE
                </Link>
                <Link className="flex justify-center" to="/Approach" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                    APPROACH TEST
                </Link>
            </div>
            <div className="flex-none gap-2">
                {metamask && address ? (
                    <div className="flex justify-center items-center gap-4">
                        Welcome, {address}
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <ProfileIcon address={address!} />
                            </label>

                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-24">
                                <li>
                                    <Link className="justify-between" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                            
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <ConnectButton />
                )}
            </div>
        </div>
    );
}
