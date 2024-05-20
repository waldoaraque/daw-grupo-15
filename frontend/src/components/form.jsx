import React, { useState } from 'react'

const DynamicForm = ({ fields, onSubmit, buttonText, formTitle }) => {
    const [input, setInput] = useState({})

    const handleInput = (e) => {
        const { name, value } = e.target
        setInput({
            ...input,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(input)
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{formTitle}</h1>
            {fields.map((field, index) => (
                <div key={index}>
                    <input
                        type={field.type}
                        name={field.name}
                        className={field.className}
                        //pattern={field.pattern}
                        placeholder={field.placeholder}
                        onChange={handleInput}
                        required={field.required}
                    />
                </div>
            ))}
            <button type="submit">{buttonText}</button>
        </form>
    )
}

export default DynamicForm
