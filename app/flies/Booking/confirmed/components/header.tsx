"use client"


export default function ConfirmedHeader(){


    return(
        <div className="flex flex-col items-center justify-center space-y-5">
            <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 24 24"><path fill="#3ac949" fillRule="evenodd" d="M12 21a9 9 0 1 0 0-18a9 9 0 0 0 0 18m-.232-5.36l5-6l-1.536-1.28l-4.3 5.159l-2.225-2.226l-1.414 1.414l3 3l.774.774z" clipRule="evenodd"></path></svg>
            <h1 className="text-2xl font-medium">Paymment Successful!</h1>
            <h2 className="text-zinc-600">Thank you , your booking has been confirmed.</h2>
        </div>
    )
}