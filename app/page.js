"use client"

import SqlOutput from "@/components/sql_output";
import TextForm from "@/components/text_form";
import Image from "next/image";
import { VscError } from "react-icons/vsc";
import { useState } from "react";

export default function Home() {
  const [generatedSQL, setGeneratedSQL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center p-10 w-full bg-gray-900">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-row justify-center items-center gap-8 w-full h-[80vh]">
          <div className="w-1/2 rounded h-full flex flex-col justify-center items-center">
            <TextForm generatedSQL={generatedSQL} setGeneratedSQL={setGeneratedSQL} loading={loading} setLoading={setLoading} error={error} setError={setError} />
          </div>
          <div className="w-1/2 container mx-auto p-8 border-gray-800 border-l-2 h-full flex flex-col justify-center items-center">
            {generatedSQL ? <SqlOutput generatedSQL={generatedSQL} setGeneratedSQL={setGeneratedSQL} loading={loading} setLoading={setLoading} error={error} setError={setError} />
              : <div>
                {!generatedSQL && !loading && !error && <h1 className="font-mono text-2xl text-gray-400">Your SQL Output Here</h1>}
                {loading && !generatedSQL && !error && <h1 className="font-mono text-2xl text-gray-400">Generating SQL...</h1>}
                {error && !generatedSQL && !loading && <div className="font-mono text-xl bg-red-600 text-red-100 px-3 py-2 rounded flex flex-row justify-center items-center gap-1">
                  <VscError />
                  <h1>Something went wrong</h1>
                </div>}
              </div>
            }
          </div>
        </div>
      </div>
    </main>



  );
}
