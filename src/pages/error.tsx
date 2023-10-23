import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError() as { status: string; statusText: string; internal: boolean; data: string; error: {} };

    return (
        <div id="error-page" className="flex flex-col h-screen justify-center items-center gap-8">
            <h1>
                {error.status} {error.statusText}
            </h1>
            <p>{error.data}</p>
            <button>
                <Link to="/">Go back to home</Link>
            </button>
        </div>
    );
}
