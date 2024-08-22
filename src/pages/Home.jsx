import { Link } from 'react-router-dom';
import { BsWechat, BsChat } from "react-icons/bs";
import { CgProfile, CgArrowsExpandUpRight } from "react-icons/cg";
import { IoIosNotificationsOutline } from "react-icons/io";
import { LuFileQuestion } from "react-icons/lu";
import React, { useCallback, useEffect, useState } from 'react';
import { ReactFlow, MiniMap, Controls, Background, useNodesState, useEdgesState, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
    {
        id: "1",
        type: "default",
        position: { x: 100, y: 100 },
        data: {
            label: (
                <div className=''>
                    <h1 className='text-red-500'>Send Message</h1>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Message</button>
                        <button className='border p-2 border-green-500 mr-2'>Image</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Video</button>
                        <button className='border p-2 border-green-500 mr-2'>Audio</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Document</button>
                    </div>
                </div>
            ),
        }
    },
    {
        id: "2",
        type: "default",
        position: { x: 300, y: 100 },
        data: {
            label: (
                <div className=''>
                    <h1 className='text-red-500'>Send Message</h1>

                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Message</button>
                        <button className='border p-2 border-green-500 mr-2'>Image</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Video</button>
                        <button className='border p-2 border-green-500 mr-2'>Audio</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Document</button>
                    </div>
                </div>
            )
        }
    },
    {
        id: "3",
        type: "default",
        position: { x: 200, y: 300 },
        data: {
            label: (
                <div className=''>
                    <h1 className='text-red-500'>Send Message</h1>

                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Message</button>
                        <button className='border p-2 border-green-500 mr-2'>Image</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Video</button>
                        <button className='border p-2 border-green-500 mr-2'>Audio</button>
                    </div>
                    <div className='flex mt-2'>
                        <button className='border p-2 border-green-500 mr-2'>Document</button>
                    </div>
                </div>
            )
        }
    }
];

const initialEdges = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        animated: true,
    },
    {
        id: "e2-3",
        source: "2",
        target: "3",
        animated: true,
    },
    {
        id: "e3-1",
        source: "3",
        target: "1",
        animated: true,
    }
];

const Home = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [activeNodeId, setActiveNodeId] = useState(null);
    const [activeInput, setActiveInput] = useState(null);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const handleSendMessage = () => {
        const newNodeId = `${nodes.length + 1}`;
        setNodes((nds) => [
            ...nds,
            {
                id: newNodeId,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: {
                    label: (
                        <div className=''>
                            <h1 className='text-red-500'>Send Message</h1>
                            <div className='flex mt-2'>
                                <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(newNodeId, 'message')}>Message</button>
                                <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(newNodeId, 'image')}>Image</button>
                            </div>
                            <div className='flex mt-2'>
                                <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(newNodeId, 'video')}>Video</button>
                                <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(newNodeId, 'audio')}>Audio</button>
                            </div>
                            <div className='flex mt-2'>
                                <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(newNodeId, 'document')}>Document</button>
                            </div>
                            <div className='mt-2'>
                                {activeNodeId === newNodeId && (
                                    <>
                                        {activeInput === 'message' && <input className='border p-2 border-green-500 w-full' placeholder='Enter your message' />}
                                        {activeInput === 'image' && <input type='file' accept='image/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'video' && <input type='file' accept='video/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'audio' && <input type='file' accept='audio/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'document' && <input type='file' className='border p-2 border-green-500 w-full' />}
                                    </>
                                )}
                            </div>
                        </div>
                    ),
                },
            },
        ]);
        setActiveNodeId(newNodeId);
        setActiveInput(null);
    };

    const handleInputChange = (nodeId, inputType) => {
        setActiveNodeId(nodeId);
        setActiveInput(inputType);
        setNodes((nds) =>
            nds.map((node) =>
                node.id === nodeId
                    ? {
                        ...node,
                        data: {
                            ...node.data,
                            label: (
                                <div className='p-4'>
                                    <div className='flex mt-2'>
                                        <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(nodeId, 'message')}>Message</button>
                                        <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(nodeId, 'image')}>Image</button>
                                    </div>
                                    <div className='flex mt-2'>
                                        <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(nodeId, 'video')}>Video</button>
                                        <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(nodeId, 'audio')}>Audio</button>
                                    </div>
                                    <div className='flex mt-2'>
                                        <button className='border p-2 border-green-500 mr-2' onClick={() => handleInputChange(nodeId, 'document')}>Document</button>
                                    </div>
                                    <div className='mt-2'>
                                        {activeInput === 'message' && <input className='border p-2 border-green-500 w-full' placeholder='Enter your message' />}
                                        {activeInput === 'image' && <input type='file' accept='image/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'video' && <input type='file' accept='video/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'audio' && <input type='file' accept='audio/*' className='border p-2 border-green-500 w-full' />}
                                        {activeInput === 'document' && <input type='file' className='border p-2 border-green-500 w-full' />}
                                    </div>
                                </div>
                            ),
                        },
                    }
                    : node
            )
        );
    };


    const handleAskQuestion = () => {
        const newNodeId = `${nodes.length + 1}`;
        setNodes((nds) => [
            ...nds,
            {
                id: newNodeId,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: {
                    label: (
                        <div className=''>
                            <h1 className='text-yellow-500'>Ask Question</h1>
                            Questions?
                        </div>
                    ),
                },
            },
        ]);
        setActiveNodeId(newNodeId);
        setActiveInput(null);
    };

    const handleSetCondition = () => {
        const newNodeId = `${nodes.length + 1}`;
        setNodes((nds) => [
            ...nds,
            {
                id: newNodeId,
                position: { x: Math.random() * 400, y: Math.random() * 400 },
                data: {
                    label: (
                        <div className=''>
                            <h1 className='text-blue-500'>Set Conditions</h1>
                            This is Conditions.
                        </div>
                    ),
                },
            },
        ]);
        setActiveNodeId(newNodeId);
        setActiveInput(null);
    };


    return (
        <div className="flex flex-col">
            <header className="flex items-center justify-between h-16 px-4 border-b">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <BsWechat className="text-4xl text-green-600" />
                        <span className="text-2xl font-bold">ChatSenes</span>
                    </div>
                    <nav className="flex items-center space-x-6">
                        <Link className="text-sm" to="#">Team Inbox</Link>
                        <Link className="text-sm" to="#">Broadcast</Link>
                        <Link className="text-md font-bold text-green-600" to="#">Chatbots</Link>
                        <Link className="text-sm" to="#">Contacts</Link>
                        <Link className="text-sm" to="#">Automations</Link>
                        <Link className="text-sm" to="#">More</Link>
                    </nav>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input border-lime-600 bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-sm text-lime-600">Book a demo</button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm">
                        <IoIosNotificationsOutline className="text-3xl bg-gray-300 rounded-full" />
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 text-sm">
                        <CgProfile className="text-3xl bg-gray-300 rounded-full" />
                    </button>
                </div>
            </header>
            <main className="flex flex-1">
                <div className="w-60 p-4 bg-gray-100 border-r">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-red-500 text-white hover:bg-primary/90 h-20 px-4 py-2 w-full"
                                onClick={handleSendMessage}
                            >
                                <BsChat className="text-2xl mr-2" /> Send a Message <br/>With no response<br/>required from visitor
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-yellow-500 text-white hover:bg-primary/90 h-20 px-4 py-2 w-full"
                                onClick={handleAskQuestion}
                            >
                                <LuFileQuestion className="text-2xl mr-2" /> Ask a Question <br/>Ask question and store<br/> user input in variable
                            </button>
                            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-primary/90 h-20 px-4 py-2 w-full"
                                onClick={handleSetCondition}
                            >
                                <CgArrowsExpandUpRight className="text-2xl mr-2" /> Set a Condition <br/> send message(s) <br/> logical condition(s)
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-semibold">Restaurant</h1>
                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-green-500 text-white h-10 px-4 py-2 text-sm">Save Chatbot</button>
                    </div>
                    <div className="relative w-full h-full bg-gray-50 border rounded-md">
                        <div style={{ width: '75vw', height: '80vh' }}>
                            <ReactFlow
                                nodes={nodes}
                                edges={edges}
                                onNodesChange={onNodesChange}
                                onEdgesChange={onEdgesChange}
                                onConnect={onConnect}
                            >
                                <Controls />
                                <MiniMap />
                                <Background variant="dots" gap={12} size={1} />
                            </ReactFlow>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
