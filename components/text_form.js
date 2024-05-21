"use client"
import { useState } from 'react';
import axios from 'axios';

export default function TextForm({generatedSQL, setGeneratedSQL}) {
    const [tableName, setTableName] = useState('');
    const [fields, setFields] = useState(['']);
    const [chips, setChips] = useState([]);
    const [query, setQuery] = useState('');

    const handleAddField = (value) => {
        if (!value) return;
        setChips([...chips, value]);
        setFields([...fields, '']);
    };

    const handleRemoveChip = (index) => {
        const newChips = [...chips];
        newChips.splice(index, 1);
        setChips(newChips);
    };

    const handleRemoveField = (index) => {
        if (fields.length === 1) return;
        const newFields = [...fields];
        newFields.splice(index, 1);
        setFields(newFields);
    };

    const handleFieldChange = (index, value) => {
        const newFields = [...fields];
        newFields[index] = value.replace(/\s/g, '');
        setFields(newFields);
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddField(fields[index]);
        }
    };

    const handleGenerateSQL = async () => {
        try {
            const response = await axios.post('http://localhost:5000/get_sql_query', {
                table_name: tableName,
                fields: chips,
                query
            });
            const fullResponse = response.data.sql_query;
            const trimmedResponse = fullResponse.match(/```sql\n([\s\S]*?)\n```/);
            console.log(trimmedResponse);

            setGeneratedSQL(trimmedResponse ? trimmedResponse[1] : fullResponse);
        } catch (error) {
            console.error('Error generating SQL:', error);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-4 ">Generate <span className='rounded p-1 border-b-4 border-purple-700'>SQL</span> with AI</h1>

            <div className="mb-8">
                <div className="flex flex-col justify-center items-center w-full gap-4">
                    <div className='w-full'>
                        <label htmlFor="tableName" className="block text-sm font-medium text-gray-200">
                            Table Name
                        </label>
                        <input
                            type="text"
                            id="tableName"
                            placeholder='Enter table name'
                            className="mt-1 block w-full border-2 border-gray-500 bg-gray-800 p-2 text-white rounded-md shadow-sm sm:text-sm"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value.replace(/\s/g, ''))}
                        />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="fields" className="block text-sm font-medium text-gray-200">
                            Fields
                        </label>
                        <input
                            type="text"
                            placeholder="Add a field"
                            className="w-full border-2 border-gray-500 bg-gray-800 p-2 text-white rounded-md shadow-sm sm:text-sm"
                            value={fields[fields.length - 1]}
                            onChange={(e) => handleFieldChange(fields.length - 1, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, fields.length - 1)}
                        />
                        <div className="flex flex-wrap gap-2 pt-2">
                            {chips.map((chip, index) => (
                                <div key={index} className="bg-gray-700 px-2 py-1 rounded-lg flex items-center">
                                    <span className="text-white mr-2">{chip}</span>
                                    <button
                                        className="text-gray-300 hover:text-gray-500 focus:outline-none"
                                        onClick={() => handleRemoveChip(index)}
                                    >
                                        &#x2715;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">SQL Query</h2>
                <div>
                    <textarea
                        id="query"
                        placeholder='Add Query details, be as specific as possible'
                        className="mt-1 block w-full border-2 border-gray-500 bg-gray-800 p-2 text-white rounded-md shadow-sm sm:text-sm"
                        rows="7"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    ></textarea>
                </div>
            </div>

            <div className="text-center">
                <button
                    className="bg-purple-500 hover:bg-purple-600 hover:scale-105 duration-300 text-white font-bold flex justify-center items-center mx-auto py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={handleGenerateSQL}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                        className="h-6 w-6 sm:w-7 sm:h-7 inline mr-2 mb-1"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                        />
                    </svg>
                    <h1>Generate SQL</h1>
                </button>
            </div>
        </div>
    );
}


