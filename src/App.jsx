/* eslint-disable no-const-assign */
import { useState,useEffect} from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

import './App.css'


function App() {
  const [todo, settodo] = useState([])
  const [info, setinfo] = useState("")
  const [show, setshow] = useState(false)


useEffect(() => {

  let todostring=localStorage.getItem("todo")
  if(todostring!==null){
  // eslint-disable-next-line no-unused-vars
  let todo=JSON.parse(localStorage.getItem("todo"))
  settodo(todo)
  }
},[])

  const SaveToLocalStorage=()=>{
    localStorage.setItem("todo", JSON.stringify(todo));
  }

  const handleinput = (e) => {
    setinfo(e.target.value)
  }

  const handleAdd = () => {
    if (info != "") {
      settodo([...todo, { id: uuidv4(), task: info, isCompleted: false }])
    }
    setinfo("")
    SaveToLocalStorage()
  }

  const handleCheck=(e)=>{
    let uniqueId=e.target.name;
    let index=todo.findIndex(item=>{
      return item.id===uniqueId;
    })
    let newTodo=[...todo];
    newTodo[index].isCompleted=!newTodo[index].isCompleted;
    console.log(newTodo[index].isCompleted)
    settodo(newTodo);
    SaveToLocalStorage()

}


  const handleDelete=(e,id)=>{
    console.log(id)
      let DeletedTodo = todo.filter(item=>{
          return item.id!==id;
        })   
        settodo(DeletedTodo);
        SaveToLocalStorage()
  }
  
  const handleEdit=(e,id,task)=>{
    console.log(id)
    console.log(task)
    let DeletedTodo = todo.filter(item=>{
        return item.id!==id;
      })   
      settodo(DeletedTodo);
      setinfo(task)
      SaveToLocalStorage()
  }

  const handleshow=()=>{
   setshow(!show)
  }

  return (
    <>
      <div className="content container flex overflow-auto  flex-col items-center gap-8  mx-auto my-7 rounded-xl bg-gradient-to-br from-indigo-200  via-blue-200 to-purple-200 h-[93vh] w-[70vw] md:w-[60vw] lg:w-[40vw] ">

        {/* 1 */}   <div className="head lg:text-[35px] md:text-[35px] sm:text-[30px] text-[20px] underline font-bold nerko-one-regular">
          iTask-Manage Your Todos
        </div>

        {/* 2 */}     <div className="addtodo flex flex-col gap-2">
          <p className='font-bold lg:text-[25px] md:text-[25px] sm:text-[20px]'>Add a Todo</p>
          <div className="todoentry flex gap-3">
            <input type="text" name='text' onChange={handleinput} value={info} className='rounded-xl w-[30vw] focus:outline-none pl-2' />
            <button onClick={handleAdd} className='w-[60px] h-[30px] rounded-full font-medium bg-purple-900 text-white active:bg-purple-700 active:scale-90'>Save</button>
          </div>

          <div className="show flex gap-[5px] mt-6 mb-[-15px] ">
            <input type="checkbox" name='text' onChange={handleshow} checked={show} className=' w-[15px] focus:outline-none pl-2' />
            <p className='text-[12px] sm:text-[16px] text-slate-500 font-extrabold'>Show Finished Task</p>
          </div>
        </div>

        {/* 3 */}     <div className="line lg:w-[32vw] md:w-[48vw] w-[60vw] h-[1px] border border-gray-500"></div>

        {/* 4 */} <div className="data w-[50vw] md:w-[45vw] lg:w-[35vw] flex flex-col gap-2">
          <p className='font-bold mt-[-20px] lg:text-[25px] md:text-[25px] sm:text-[20px]'>Your Todos</p>
           {todo.length===0 && <div className='text-5xl border-4 p-4 border-black font-semibold nerko-one-regular text-red-500'> No Todos To Display </div>}
          {
            todo.map((item) => {
              return ( (!show) || (item.isCompleted) ) && <div key={item.id} className="todos flex justify-between items-center">
                <div className="todo flex items-center gap-3">
                  <input type="checkbox" onChange={handleCheck}  checked={item.isCompleted}  name={item.id} className='w-[15px] focus:outline-none pl-2'/>
                  <p className={item.isCompleted?"line-through text-red-700 text-[16px] font-semibold " : "text-[16px] font-semibold"}>{item.task}</p>
                </div>
                <div className="btn flex gap-2">
                  <button   onClick={(e)=>{handleEdit(e,item.id,item.task)}} className='w-[35px] flex justify-center items-center h-[28px] rounded-full font-medium bg-purple-900 text-white active:bg-purple-700 active:scale-90'><FaEdit /></button>

                  <button onClick={(e)=>{handleDelete(e,item.id)}} className='w-[35px] flex justify-center items-center h-[28px] rounded-full font-medium bg-purple-900 text-white active:bg-purple-700 active:scale-90'><MdDelete /></button>
                </div>
              </div>
            })
          }

        </div>


      </div>
    </>
  )
}
export default App
