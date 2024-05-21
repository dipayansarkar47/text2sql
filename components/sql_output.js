"use client"
import React, { useState } from 'react';
import { IoMdCopy } from "react-icons/io";

const SqlOutput = ({generatedSQL, setGeneratedSQL}) => {
    const [sqlQuery, setSqlQuery] = useState(``);

    const copySqlQuery = () => {
        navigator.clipboard.writeText(sqlQuery);
    };

    const runSqlQuery = () => {
        console.log("Running SQL query:", sqlQuery);
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center bg-gray-800 rounded-xl">
            <div className="w-full h-full  rounded-xl flex flex-col justify-between">
                <div className="flex justify-between items-center p-2">
                    <h1>SQL Query</h1>
                    <button
                        className="flex items-center gap-2 px-4 py-2 text-gray-100 bg-gray-600 hover:bg-gray-700 rounded"
                        onClick={copySqlQuery}
                    >
                        
                        <IoMdCopy className='text-2xl' />
                        Copy SQL
                    </button>


                </div>
                <div className="h-full overflow-hidden" style={{ scrollbarWidth: 'thin', scrollbarColor: 'gray darkgray' }}>
                    <textarea
                        className="w-full h-full p-3 text-gray-200 font-mono resize-none bg-gray-950"
                        value={generatedSQL}
                        onChange={(e) => setSqlQuery(e.target.value)}
                        style={{
                            overflowY: 'scroll',
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'gray darkgray'
                        }}
                    />
                </div>



                <div className="flex justify-end p-2">
                    <button
                        className="px-4 py-2 text-gray-100 bg-blue-600 hover:bg-blue-700 rounded"
                        onClick={runSqlQuery}
                    >
                        Run
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SqlOutput;

