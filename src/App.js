import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  const nameRef = useRef()
  const emailRef = useRef()

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const newUser = { name: name, email: email }


    // Send data to Server
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'

      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        const addedUser = data
        const newUsers = [...users, addedUser]
        setUsers(newUsers)
      })

    e.preventDefault()

  }
  return (
    <div className="App">
      <h2>Tottal users= {users.length}</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" ref={nameRef} name="" id="" placeholder='your name' />
        <input type="email" ref={emailRef} name="" id="" placeholder='your email' />

        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id} > {user.id}: {user.name} {user.email} </li>)
        }
      </ul>
    </div >
  );
}

export default App;
