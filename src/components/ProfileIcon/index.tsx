import { MetaMaskAvatar } from "react-metamask-avatar";

export default function ProfileIcon({ address }: { address: string }) {
    return (
        <div className="avatar">
            <div className="rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <MetaMaskAvatar address={address} size={40} />
            </div>
        </div>
    );
}
