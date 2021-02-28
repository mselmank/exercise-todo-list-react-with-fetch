import './App.css';
import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'


const App = () => {
  const [task, setTask] = useState({ label: '', done: false, id: '' });
  const [list, setList] = useState([]);
  // list : es una variable
  // setList : funcion que modifica la variable list.

  //GET ALL
  const getAll = () => {

    fetch("https://assets.breatheco.de/apis/fake/todos/user/matias", {
      method: "GET",
      headers: { "ContentType": "application/json" }

    })

      .then(response => {

        return response.json();
      })

      .then(json => {


        return (json.msg ? createUser() : setList(json));

      })

  }



  //CREATE USER
  const createUser = async () => {


    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([])

    };
    const response = await fetch(

      "https://assets.breatheco.de/apis/fake/todos/user/matias", settings

    )

  }
  // ADD TASK
  const addTask = async (element) => {
    element.preventDefault();

    const newList = [...list, task];
    setList(newList)
    try {
      const settings = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newList)

      };

      const response = await fetch(

        "https://assets.breatheco.de/apis/fake/todos/user/matias", settings

      )

      const json = await response.json();
      console.log(json);
    }

    catch (error) {

      console.log(error)

    }

    setTask({ label: '' })
  }


  const deleteTask = async (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);

    const settings = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const request = await fetch(

      "https://assets.breatheco.de/apis/fake/todos/user/matias", settings

    )
    const json = await request.json();

    console.log(json);

  }

  const deleteAllTask = () => {
    setList([])
    fetch("https://assets.breatheco.de/apis/fake/todos/user/matias", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))

  }

  useEffect(() => {

    createUser()
    getAll()

  }, []
  )

  return (
    <>
      <div className="container w-50" >
        <form onSubmit={addTask}>
          <div className='form-row center'>
            <div className='col-10 mb-5 mt-5'>
              <h1 className="text-center"  >What do you want to do today?</h1>
              <input  type="text" className="form-control my-2"id="task"
                value={task.label}
                onChange={element => setTask({ label: element.target.value, done: false, id: nanoid() })}
                placeholder="Insert Task"
              />
              <button type='submit' className='btn btn-primary btn-lg btn-block'>Add Task</button>
            </div>
          </div>
        </form>

        <div className="row">
          <span>{JSON.stringify(list)}</span>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="check-list">
              {!!list &&
                list.length > 0 ?
                list.map((task, index) => {
                  console.log('task', task);
                  return (
                    <li key={index} href="/#" className="list-group-item list-group-item-action">
                      {task.label}
                      <i className="fas fa-trash float-right" onClick={() => deleteTask(index)}></i>
                    </li>
                  )
                }) : (
                  <a className="list-group-item list-group-item-action">Empty List</a>
                )
              }
              <button type="button" className="btn btn-primary btn-lg btn-block"
                onClick={() => deleteAllTask()}>Delete all tasks</button>
              <small className="text-sm-left">Numbers of tasks ({!!list ? list.length : 0})</small>
            </ul>
          </div>
        </div>
      </div>

    </>
  )
}

export default App;


