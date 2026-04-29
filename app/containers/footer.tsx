

export default function Footer(){

    return(
        <div className="h-100 bg-white mt-20 rounded-t-3xl p-10 text-zinc-600">
            <div className="space-y-10">
                <div className="flex justify-between">
                    <div className="grid grid-cols-4 gap-6">
                        <div className="space-y-3">
                            <h3>Company</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4>About-us</h4>
                                <h4>Creers</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Support</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4>Help Center</h4>
                                <h4>Contact</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Policies</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4>Baggage</h4>
                                <h4>Refund</h4>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h3>Contact</h3>
                            <div className="font-medium underline text-[14px] space-y-1">
                                <h4>Email</h4>
                                <h4>Phone</h4>
                            </div>
                        </div>
                    </div>
                    <div className="px-20 mt-10">
                        <h3 className="text-[13px]">Let’s stay connected</h3>
                        <div className="grid grid-cols-5 gap-3.5">
                            <h4>L</h4>
                            <h4>L</h4>
                            <h4>L</h4>
                            <h4>L</h4>
                            <h4>L</h4>
                        </div>
                    </div>
                </div>
                <div className="flex">
                    <div>
                        <h4>L</h4>
                        <h5>World’s Best Airline</h5>
                    </div>
                    <div>
                        <h4>L</h4>
                        <h5>World&apos;s Best Business Class</h5>
                    </div>
                    <div>
                        <h4>L</h4>
                        <h5>World&apos;s Best Business Class Lounge</h5>
                    </div>
                    <div>
                        <h4>L</h4>
                        <h5>Best Airline in the Europe</h5>
                    </div>
                </div>
            </div>

            <div className="h-10 border-t border-t-zinc-300">

            </div>
        </div>
    )
}