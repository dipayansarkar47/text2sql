import TextForm from "@/components/text_form";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex max-h-screen min-h-screen flex-col items-center justify-center p-10 w-full bg-gray-900">
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {/* <h1 className="text-4xl font-semibold">Text to SQL</h1> */}
        <div className="flex flex-row justify-center items-center gap-8 w-full h-[80vh]">
          <div className="w-1/2 rounded h-full flex flex-col justify-center items-center">
            <TextForm/>
          </div>
          <div className="w-1/2 border-gray-800 border-l-2 h-full flex flex-col justify-center items-center">
            <h1 className="text-gray-600 font-mono text-3xl">SQL Output</h1>
          </div>
        </div>
      </div>
    </main>



  );
}
