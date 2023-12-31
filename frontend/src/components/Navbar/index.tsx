import { useContext } from "react";
import { MetamaskContext } from "../../context";
import ProfileIcon from "../ProfileIcon";
import ConnectButton from "./ConnectButton";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { metamask, wallet, setters, balance, refreshBalance } = useContext(MetamaskContext)!;

    return (
        <div className="navbar bg-base-100 justify-between h-16 drop-shadow-md">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    CHAINRITY
                </Link>
            </div>
            <div className="flex-none gap-2">
                {metamask && wallet.accounts.length > 0 ? (
                    <div className="flex justify-center items-center gap-4">
                        <div className="flex flex-col">
                            <p>Welcome, {wallet.accounts[0]}</p>
                            <div className="flex justify-end items-center gap-2">
                                <p>Available balance: {Number(balance).toFixed(4)} ETH </p>
                                <button
                                    className="btn btn-xs btn-ghost justify-center items-center border-neutral-content hover:border-neutral-content"
                                    onClick={async () => await refreshBalance()}
                                >
                                    <svg className="dark:fill-neutral-content" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                        <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle ">
                                <ProfileIcon address={wallet.accounts[0]} />
                            </label>
                        </div>
                    </div>
                ) : (
                    <ConnectButton />
                )}
            </div>
        </div>
    );
}
