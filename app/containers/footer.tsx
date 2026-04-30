"use client"

import Image from "next/image"



const showAlert = () => {
    alert("Demo only")
}

const currentDate = new Date
const currentYear = currentDate.getFullYear()


export default function Footer(){

    return(
        <div className="h-100 bg-white mt-20 rounded-t-3xl p-10 text-zinc-600 cursor-default">
            <div>
                <div className="flex justify-between">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-3">
                            <h3>Company</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4 onClick={showAlert} className="cursor-pointer">About-us</h4>
                                <h4 onClick={showAlert} className="cursor-pointer">Creers</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Support</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4 onClick={showAlert} className="cursor-pointer">Help Center</h4>
                                <h4 onClick={showAlert} className="cursor-pointer">Contact</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Policies</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4 onClick={showAlert} className="cursor-pointer">Baggage</h4>
                                <h4 onClick={showAlert} className="cursor-pointer">Refund</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Contact</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4 onClick={showAlert} className="cursor-pointer">Email</h4>
                                <h4 onClick={showAlert} className="cursor-pointer">Phone</h4>
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col justify-end px-20 space-y-2">
                        <h3 className="text-[13px]">Let’s stay connected</h3>
                        <div className="grid grid-cols-5 gap-3.5">
                            <a href="https://facebook.com" target="_blank" className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4z"></path></svg>
                            </a>
                            <a href="https://instagram.com" target="_blank" className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2m4.6 2.42a7.6 7.6 0 0 0-.46-2.43a4.9 4.9 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.8 4.8 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.8 4.8 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.6 7.6 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12M20.14 16a5.6 5.6 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.2 3.2 0 0 1-1.15.75a5.6 5.6 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.7 5.7 0 0 1-1.94-.3a3.3 3.3 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.5 5.5 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.5 5.5 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.1 3.1 0 0 1 1.1-.8A5.7 5.7 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.6 5.6 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.1 3.1 0 0 1 .75 1.1a5.6 5.6 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4M12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87m0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33"></path></svg>
                            </a>
                            <a href="https://youtube.com" target="_blank" className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 4.15c-1.191 0-2.58.028-3.934.066l-.055.002c-1.378.039-2.49.07-3.366.215c-.913.151-1.671.44-2.277 1.063c-.608.625-.873 1.398-.998 2.323c-.12.89-.12 2.018-.12 3.42v1.524c0 1.4 0 2.528.12 3.419c.124.925.39 1.698.998 2.323c.606.624 1.364.912 2.277 1.063c.876.145 1.988.176 3.366.215l.055.002c1.355.038 2.743.066 3.934.066s2.58-.028 3.934-.066l.055-.002c1.378-.039 2.49-.07 3.366-.215c.913-.151 1.671-.44 2.277-1.063c.608-.625.874-1.398.998-2.323c.12-.89.12-2.018.12-3.42v-1.524c0-1.401 0-2.529-.12-3.419c-.124-.925-.39-1.698-.998-2.323c-.606-.624-1.364-.912-2.277-1.063c-.876-.145-1.988-.176-3.367-.215l-.054-.002A145 145 0 0 0 12 4.15m-1.128 10.501A.75.75 0 0 1 9.75 14v-4a.75.75 0 0 1 1.122-.651l3.5 2a.75.75 0 0 1 0 1.302z" clipRule="evenodd"></path></svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.51 8.796v1.697a3.74 3.74 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766c-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483a1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.6 1.6 0 0 1 1.6 1.606" clipRule="evenodd"></path><path d="M7.2 8.809H4V19.5h3.2z"></path></svg>
                            </a>
                            <a href="https://x.com" target="_blank" className="border rounded-full p-2 cursor-pointer transition-all ease-in-out hover:scale-110 duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"><path fill="currentColor" d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-5 gap-8 py-10">
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/awardsImg/s-skytrax-2025-aoty-logo.svg"
                            width={60}
                            height={60}
                            alt="World’s Best Airline"
                        />
                        <h5>World’s Best Airline</h5>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/awardsImg/s-skytrax-2025-logo.svg"
                            width={60}
                            height={60}
                            alt="World’s Best Airline"
                        />
                        <h5>World&apos;s Best Business Class</h5>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/awardsImg/s-skytrax-2025-logo.svg"
                            width={60}
                            height={60}
                            alt="World’s Best Airline"
                        />
                        <h5>World&apos;s Best Business Class Lounge</h5>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Image
                            src="/awardsImg/s-skytrax-2025-logo.svg"
                            width={60}
                            height={60}
                            alt="World’s Best Airline"
                        />
                        <h5>Best Airline in the Europe</h5>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-end py-10 border-t border-t-zinc-300">
                <div className="space-x-7">
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Terms & conditions
                    </a>
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Cookies policy
                    </a>
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Privacy
                    </a>
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Accessibility
                    </a>
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Passenger rights
                    </a>
                    <a href="#" rel="noopener noreferrer" className="text-[14px]  transition-all ease-in-out duration-200 hover:underline hover:text-black" onClick={(e) => e.preventDefault()}>
                        Service agreement
                    </a>
                </div>
                <div className="text-[14px]">
                    <p>© {currentYear} Salah Airlines · All Rights Reserved.</p>
                </div>
            </div>
        </div>
    )
}