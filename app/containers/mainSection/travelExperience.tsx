
import Image from "next/image"

export default function TravelExp(){

    return(
        <div className="mt-15">
            <div className="space-y-6">
                <h2 className="text-4xl font-light text-gray-600">Elevate Your Journey</h2>
                <h3 className="text-gray-600">Experience world-class service and unparalleled comfort on every flight.</h3>
            </div>

            <div className="grid gap-10 grid-cols-3 w-full">
                <div className="cursor-default">
                    <div className="relative py-5 mt-4  h-50">
                        <Image
                            src="/LuxuryCabine.avif"
                            alt="LuxuryCabine"
                            fill
                            className="object-cover rounded-t-2xl"
                        />
                        
                    </div>
                        <div className=" w-full z-80 bg-white  rounded-b-2xl px-4">
                            <h3 className="text-xl font-[350] border-b border-b-zinc-300 py-4">Luxury Cabins</h3>
                            <h4 className="text-zinc-600 py-4">Ultimate privacy and comfort.</h4>
                        </div>
                </div>
                <div className="cursor-default">
                    <div className="relative py-5 mt-4  h-50">
                        <Image
                            src="/GourmetDining.avif"
                            alt="GourmetDining"
                            fill
                            className="object-cover rounded-t-2xl"
                        />
                        
                    </div>
                        <div className=" w-full z-80 bg-white  rounded-b-2xl px-4">
                            <h3 className="text-xl font-[350] border-b border-b-zinc-300 py-4">Gourmet Dining</h3>
                            <h4 className="text-zinc-600 py-4">Exquisite menus by top chefs.</h4>
                        </div>
                </div>
                <div className="cursor-default">
                    <div className="relative py-5 mt-4  h-50">
                        <Image
                            src="/seatScreen.avif"
                            alt="seatScreen"
                            fill
                            className="object-cover rounded-t-2xl"
                        />
                        
                    </div>
                        <div className=" w-full z-80 bg-white  rounded-b-2xl px-4">
                            <h3 className="text-xl font-[350] border-b border-b-zinc-300 py-4">Infinite Entertainment</h3>
                            <h4 className="text-zinc-600 py-4">A world of movies and games.</h4>
                        </div>
                </div>

            </div>
        </div>
    )
}