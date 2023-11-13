import { Link } from "react-router-dom";

export default function Error() {
    return (
        <main className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
            <div className="alert alert-error w-[320px] rounded-md flex justify-center items-center h-14">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>Error! Metamask not detected!</span>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <Link to="/">
                    <button className="btn btn-warning w-[156px] h-14 rounded-md">Go back to /</button>
                </Link>

                <Link to="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn" target="_blank">
                    <button className="btn btn-info w-[156px] h-14 rounded-md">Install Metamask</button>
                </Link>
            </div>
        </main>
    );
}
