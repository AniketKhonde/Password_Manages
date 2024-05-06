import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
        const passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords));
        }
    }, [])

    const ref = useRef();
    const passwordRef = useRef()
    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            passwordRef.current.type = "text"
            ref.current.src = "icons/eye.png"
        }
        else {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyecross.png"
        }
    }


    const handelChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            console.log(form)
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
        }
        else {
            toast('please enter correct information', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        }

    }

    const deletePassword = (id) => {
        const c = confirm("want to delete password?");
        if (c) {
            console.log("deleting password with id ", id);
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const editPassword = (id) => {
        console.log("editing password with id ", id)
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id));
    }




    const copyText = (text) => {
        toast('copied to clipboard', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            {/* Same as */}
            <ToastContainer />




            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>

                <div className=" p-2 md:mycontainer md:p-0 md:min-h-[71vh] min-h-[78vh]  ">
                    <h1 className='text-4xl text font-bold text-center'>
                        <span className='text-green-500'>&lt;</span>
                        <span>Pass</span><span className='text-green-500'>OP/&gt;</span>
                    </h1>
                    <p className='text-green-900 text-lg text-center'>Your own Password Manager</p>
                    <div className="flex flex-col p-4 md:ml-52 md:mr-52 text-black gap-8 item-center ">

                        <input value={form.site} onChange={handelChange} placeholder='add url' type="text" className="input border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full " name='site' />

                        <div className='flex flex-col md:flex-row w-full  justify-between gap-8'>
                            <input value={form.username} onChange={handelChange} placeholder='add username' type="text" className="input border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" name='username' />

                            <div className="relative">

                                <input ref={passwordRef} value={form.password} onChange={handelChange} placeholder='add password' type="password" className="input border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2  focus:ring-blue-500 w-full " name='password' />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-0 cursor-pointer text-sm text-gray-500" onClick={showPassword}>
                                    <img ref={ref} className='p-5' width={70} src="icons/eyecross.png" alt="eye" />
                                </span>
                            </div>
                        </div>

                        <button className="btn bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" onClick={savePassword}>
                            Save
                        </button>
                    </div>
                    <div className="paswwords mycontainer md:px-52 px-4 py-8">
                        <h2 className='font-bold text-xl py-4'>your passwords</h2>
                        {passwordArray.length === 0 && <div>no passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <table className="table-auto w-full rounded-md overflow-hidden items-center justify-center">
                                <thead className='bg-green-800 text-white' >
                                    <tr>
                                        <th className='py-2'>Site</th>
                                        <th className='py-2'>Usename</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-green-100'>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className=' py-2 text-center  border-white'>
                                                <div className='flex justify-center'>
                                                    <a href={item.site} target='_blank'>
                                                        <span>{item.site}</span></a>
                                                    <div className='size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                                            trigger="hover">
                                                        </lord-icon>

                                                    </div>
                                                </div>

                                            </td>
                                            <td className=' py-2 text-center  border-white'>
                                                <div className='flex justify-center'>
                                                    <span>{item.username}</span>
                                                    <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                                            trigger="hover">


                                                        </lord-icon>
                                                    </div>
                                                </div>

                                            </td>
                                            <td className=' py-2 text-center  border-white'>
                                                <div className='flex justify-center'>
                                                    <span>{item.password}</span>
                                                    <div className='size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                        <lord-icon
                                                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                            src="https://cdn.lordicon.com/xpgofwru.json"
                                                            trigger="hover">


                                                        </lord-icon>
                                                    </div>
                                                </div>

                                            </td>

                                            <td className='justify-center py-2 text-center  border-white'>
                                                <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/ifsxxxte.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>

                                                <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ "width": "25px", "height": "25px" }}>
                                                    </lord-icon>
                                                </span>

                                            </td>


                                        </tr>
                                    })}
                                </tbody>
                            </table>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
