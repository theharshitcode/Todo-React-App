import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import './components/Navbar.css'
function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [todo, setTodo] = useState("")
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")

  }
  const handleEdit = (e, id) => {
    let change = todos.filter(item => {
      return item.id === id
    })
    setTodo(change[0].todo)
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodo)
  }
  const handleDelete = (e, id) => {
    let newTodo = todos.filter(item => {
      return item.id !== id;
    })
    setTodos(newTodo)
  }
  const handleChange = async (e) => {
    setTodo(e.target.value)
  }

  const handleCheck = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    const newTodo = [...todos];
    newTodo[index].isComplete = !newTodo[index].isComplete;
    setTodos(newTodo);
  }



  return (
    <>
      <Navbar />
      <div className="container w-[100%] h-full m-auto  ">
        <div className="main place-self-center w-[50%] h-[85vh] mt-[20px] bg-emerald-200 rounded-[10px] ">
          <h1>Here is your Task's </h1>
          <div className="inp w-[100%]">
            <div className="w-[80%] place-self-center text-center">
              <input onChange={handleChange} value={todo} className="tak w-[80%] rounded-[10px] h-[34px] border-emerald-900 border-2 font-bold hover:bg-emerald-300" type="text" />
              <button onClick={handleAdd} className='w-[15%] rounded-[10px] h-[35px] btn pl-[40px] font-bold hover:bg-emerald-600 hover:border-emerald-900 border-emerald-600 border-2 bg-emerald-800 text-amber-50'>Save</button>
            </div>
            <div className=' w-[80%]  mt-[10px] text-emerald-900 place-self-center font-bold '>
              <input onChange={toggleFinished} className="pup max-w-[20px] align-text-[align-text-[-webkit-left]] align-middle " type="checkbox" checked={showFinished} id="" />Show Finished
            </div>
            <div className=" todos veiwtask overflow-auto  justify-items-center min-h-[60vh] max-h-[60vh] mt-[20px] ">
              {todos.map(item => {

                return ((showFinished || !item.isComplete) &&
                  <div key={item.id} className="todo w-[95%]  box-border justify-evenly items-center text-green-950 hover:transform-[scale(1.05)] bg-emerald-300 min-h-[8vh] rounded-[7px] flex py-[40px]">
                    <div className="check  ml-[5px] w-[30px] ">
                      <input className='align-middle' onChange={handleCheck} type="checkbox" name={item.id} checked={item.isComplete} />
                    </div>
                    <div className={`${item.isComplete ? "line-through decoration-4" : ""} font-bold text w-[60%] wrap-anywhere `}>{item.todo}</div>
                    <div className="buttons p-[20px] w-[29%] flex justify-evenly">
                      <div>
                        <button onClick={(e) => { handleEdit(e, item.id) }} className='font-bold hover:bg-emerald-600 hover:border-emerald-200 bg-emerald-800 text-amber-50'>Edit</button>
                      </div>
                      <div>
                        <button onClick={(e) => { handleDelete(e, item.id) }} className='font-bold hover:bg-emerald-600 hover:border-emerald-200 bg-emerald-800 text-amber-50'>Delete</button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
// className="text w-[70%] font-bold"