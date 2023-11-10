import Layout from "../layout";
import { AnimatePresence, motion } from "framer-motion";
//@ts-ignore
import { gradient } from "../components/gradient";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    useEffect(() => {
        gradient.initGradient("#gradient-canvas");
    }, []);

    return (
        <AnimatePresence>
            <div className="min-h-[100vh] sm:min-h-full w-screen flex flex-col relative bg-[#F2F3F5] font-inter overflow-hidden">
                <svg style={{ filter: "contrast(125%) brightness(110%)" }} className="fixed z-[1] w-full h-full opacity-[35%]">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" stitchTiles="stitch"></feTurbulence>
                        <feColorMatrix type="saturate" values="0"></feColorMatrix>
                    </filter>
                </svg>
                <main className="flex flex-col justify-center h-[100%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="tracking-widest relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[50px] font-inter light:text-[#1E2B3A] leading-[0.9] z-[100]"
                    >
                        CHAINRITY <br />
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[110px] font-inter light:text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]"
                    >
                        Your kindness <br />
                        <span className=" text-[#407BBF]">transcended</span>
                        <span className="font-inter text-[#407BBF]">.</span>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: 0.15,
                            duration: 0.95,
                            ease: [0.165, 0.84, 0.44, 1],
                        }}
                        className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8"
                    >
                        <div className="card backdrop-blur-sm shadow-md w-1/2">
                            <div className="card-body">
                                <h2 className="card-title flex items-center font-semibold text-[1em] light:text-[#1a2b3b]">
                                    Blockchain
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="#fff">
                                        <path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z" />
                                    </svg>
                                </h2>
                                <p className="text-[14px] leading-[20px] light:text-[#1a2b3b] font-normal">
                                    Fully decentralized, secure, and transparent. Powered by the Ethereum blockchain and smart contract.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        className="badge badge-outline"
                                        to="https://sepolia.etherscan.io/address/0x829C3CB74C867aA96a3932A7bCD0906D1D44BA41#code"
                                        target="_blank"
                                    >
                                        Etherscan
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="card backdrop-blur-sm shadow-md w-1/2">
                            <div className="card-body">
                                <h2 className="card-title flex items-center font-semibold text-[1em] light:text-[#1a2b3b]">A NUS Project</h2>
                                <p className="text-[14px] leading-[20px] light:text-[#1a2b3b] font-normal">
                                    This project is created under the NUS module EE4032 Blockchain Engineering.
                                </p>
                                <div className="card-actions justify-end">
                                    <Link
                                        className="badge badge-outline"
                                        to="https://nusmods.com/courses/EE4032/blockchain-engineering"
                                        target="_blank"
                                    >
                                        Read on NUSMODS
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <div className="flex gap-[15px] mt-8 md:mt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.55,
                                duration: 0.55,
                                ease: [0.075, 0.82, 0.965, 1],
                            }}
                        >
                            <Link
                                to="https://github.com/9teMare/EE4032"
                                target="_blank"
                                className="group rounded-full pl-[8px] min-w-[180px] pr-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#1E2B3A] text-white hover:[linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), #0D2247] no-underline flex gap-x-2  active:scale-95 scale-100 duration-75"
                                style={{
                                    boxShadow:
                                        "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                                }}
                            >
                                <span className="w-5 h-5 rounded-full bg-[#407BBF] flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" fill="#fff">
                                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                                    </svg>
                                </span>
                                Visit on Github
                            </Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.65,
                                duration: 0.55,
                                ease: [0.075, 0.82, 0.965, 1],
                            }}
                        >
                            <Link
                                to="/dashboard"
                                className="group rounded-full px-4 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                                style={{
                                    boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                                }}
                            >
                                <span className="mr-2">Gateway to Web3.0 philanthropy</span>
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.75 6.75L19.25 12L13.75 17.25"
                                        stroke="#1E2B3A"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path d="M19 12H4.75" stroke="#1E2B3A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </motion.div>
                    </div>
                </main>

                <div
                    className="fixed top-0 right-0 w-[80%] md:w-1/2  bg-[#1F2B3A]/20 z-0"
                    style={{
                        clipPath: "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
                    }}
                ></div>

                <motion.canvas
                    initial={{
                        filter: "blur(20px)",
                    }}
                    animate={{
                        filter: "blur(0px)",
                    }}
                    transition={{
                        duration: 1,
                        ease: [0.075, 0.82, 0.965, 1],
                    }}
                    style={{
                        clipPath: "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
                    }}
                    id="gradient-canvas"
                    data-transition-in
                    className="z-50 fixed top-0 right-[-2px] w-[80%] md:w-1/2 h-screen bg-[#c3e4ff]"
                ></motion.canvas>
            </div>
        </AnimatePresence>
    );
}
