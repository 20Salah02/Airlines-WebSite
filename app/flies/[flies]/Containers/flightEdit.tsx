


export default function FlightEdit(){

    return(
        <div className="relative bg-zinc-300 h-screen w-1/2">
            <h1>Modify Search</h1>
            <div>
                <div>
                    <div>
                        <input type="radio" name="class" value="Return"/>
                        <label>Return</label>
                    </div>
                    <div>
                        <input type="radio" name="class" value="One way"/>
                        <label>One way</label>
                    </div>
                </div>
                <div>
                    <input type="text" placeholder="from"/>
                    <input type="text" placeholder="to"/>
                </div>
                <div>
                    <div>
                        <p>Departure</p>
                        <p>23 Jan 2026</p>
                    </div>
                    <div>
                        <p>Return</p>
                        <p>30 Jan 2026</p>
                    </div>
                </div>
                <div>
                    <p>Passenger / Class</p>
                    <div>
                        <p>1 Passenger Economy</p>
                    </div>
                </div>
                <div>
                    <p>+ Add Promo Code</p>
                    <button>Seach flight</button>
                </div>
            </div>
        </div>
    )
}