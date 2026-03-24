
import Image from "next/image"

export default function NewsLetter(){

    return(
        <div className="relative h-100">
            <Image
                src="/NL_Background_Desktop.avif"
                alt="NL_Background_Desktop"
                fill
                className="object-cover rounded-2xl"
            />
            <div className="absolute right-0 z-10 h-full w-1/2 space-y-8 pr-5 text-white flex flex-col justify-end ">
                <div className="space-y-5">
                    <h2 className="text-4xl font-light" >Never miss an offer</h2>
                    <h3>Subscribe and be the first to receive our exclusive offers.</h3>
                </div>

                <div className="w-full">
                    <div className="flex w-full">
                        <input
                            className="flex-1 h-10 bg-white rounded-l-md border border-zinc-600 border-r-0 px-3"
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            className="flex-1 h-10 bg-white rounded-r-md border border-zinc-600 px-3"
                            type="text"
                            placeholder="Airport"
                        />
                    </div>

                    <div className="flex w-full mt-1 text-sm text-red-500">
                        <h5 className="flex-1">Please provide a valid email address.</h5>
                        <h5 className="flex-1">Please select the preferred departure airport.</h5>
                    </div>
                </div>

                <div className="flex items-start">
                    <input className="w-15" type="checkbox" name="" id="" />
                    <h4>I’d like to receive offers and news. I understand the Privacy Notice and acknowledge that I can unsubscribe anytime using the link at the bottom of each message.</h4>
                </div>

                <div>
                    <button className="border border-white rounded-4xl px-12 py-4 cursor-pointer">Subscribe</button>
                </div>
            </div>
        </div>
    )
}