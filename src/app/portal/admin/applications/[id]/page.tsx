import { getApplicationRound } from "../actions";





export default async function page({ params }: { params: { id: string } }) {

    const appRound = await getApplicationRound(params.id);

    const isOpen = new Date() >= new Date(appRound.start) && new Date() <= new Date(appRound.end);
    console.log(appRound);

    return (
        <div className="flex flex-col gap-4 flex-1 w-full overflow-hidden">
            <div className="flex p-2 gap-4">
          
            <div className="flex flex-col gap-2 flex-1   p-2">
            <h1 className="flex-1">{appRound.title}</h1>
                <div className="flex items-center gap-2">
                <span className="border border-neutral-700 rounded-full p-1 px-3">{isOpen ? "Form is Open" : "Closed"}</span>
                <span className="border border-neutral-700 rounded-full p-1 px-3">Started on {new Date(appRound.start).toLocaleDateString()}</span>
                <span className="border border-neutral-700 rounded-full p-1 px-3">Ends on {new Date(appRound.end).toLocaleDateString()}</span>
                   
                </div>
            </div>
            <div className="flex flex-col gap-2 border border-neutral-800 flex-shrink-0 w-40 rounded h-36 bg-neutral-800 shadow-sm p-4">
                <div className="flex flex-col flex-1 gap-2">
                <span className="text-5xl flex-1 text-center ">{appRound.submissions.length}</span>
                <span className="text-xl  text-center ">Starts</span> 
                </div>
            </div>
            <div className="flex flex-col gap-2 border w-40 flex-shrink-0 border-neutral-800 rounded h-36 bg-neutral-800 shadow-sm p-4">
                <div className="flex flex-col flex-1 gap-2">
                <span className="text-5xl flex-1 text-center ">{appRound.submissions.filter((submission) => submission.status === "submitted").length}</span>
                <span className="text-xl  text-center ">Submissions</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 border w-40 flex-shrink-0 border-neutral-800 rounded h-36 bg-neutral-800 shadow-sm p-4">
                <div className="flex flex-col flex-1 gap-2">
                <span className="text-5xl flex-1 text-center ">{appRound.submissions.filter((submission) => submission.status === "submitted" && submission.application["role"] === "Designer").length}</span>
                <span className="text-xl  text-center ">Designers</span>
                </div>
            </div>
            <div className="flex flex-col gap-2 border w-40 flex-shrink-0 border-neutral-800 rounded h-36 bg-neutral-800 shadow-sm p-4">
                <div className="flex flex-col flex-1 gap-2">
                <span className="text-5xl flex-1 text-center ">{appRound.submissions.filter((submission) => submission.status === "submitted" && submission.application["role"] === "Developer").length}</span>
                <span className="text-xl  text-center ">Developers</span>
                </div>
            </div>
            </div>


            <div className="flex flex-col gap-2 flex-1  py-8   ">
                <div className="flex flex-col  flex-1 overflow-scroll rounded-sm  bg-neutral-900 border-y border-neutral-800">
                <ul className="flex w-full min-w-fit  ">
                            {Object.entries(appRound.submissions[0].application).map(([key, value]) => (
                                <li key={key} className="flex  p-1 gap-2 min-h-20 bg-neutral-800  items-center justify-center w-44 border-r border-b border-neutral-800  flex-shrink-0">
                                    <span>{key}</span>
                                </li>
                            ))}
                    
                           
                        </ul>
                {appRound.submissions.map((submission) => (
                        <ul className="flex  w-full min-w-fit  " key={submission.id}>
                            {Object.entries(submission.application).map(([key, value]) => (
                                <li key={key} className="flex p-1 gap-2 max-h-28 border-r items-center border-b border-neutral-800 min-h-20 w-44   flex-shrink-0">
                                    <span>{value}</span>
                                </li>
                            ))}
                    
                           
                        </ul>
                ))}
            
                </div>
                </div>
        </div>
    );
    }