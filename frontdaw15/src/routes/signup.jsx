import DefaultLayout from "../layout/DefaultLayout"
import { useState } from 'react'

export default function Signup() {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <DefaultLayout>
            <form >
                <h1>Signup</h1>

                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button>Register</button>
            </form>
        </DefaultLayout>
    )
}