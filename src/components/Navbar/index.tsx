import { useContext, useEffect } from "react";
import { MetamaskContext } from "../../context";
import ProfileIcon from "../ProfileIcon";
import ConnectButton from "./ConnectButton";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { metamask, address } = useContext(MetamaskContext)!;

    return (
        <div className="navbar bg-base-100 justify-between">
            <div className="flex-1">
                <Link to="/home" className="btn btn-ghost normal-case text-xl">
                    EE4032 Blockchain Engineering
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
                                    <a>Logout</a>
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
