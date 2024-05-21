import React, { useState } from 'react'

const DynamicForm = ({ fields, onSubmit, buttonText, formTitle, formSubtitle }) => {
    const [input, setInput] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    )
    // const handleInput = (e) => {
    //     const { name, value } = e.target
    //     setInput({
    //         ...input,
    //         [name]: value
    //     })
    // }

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(input, () => setInput(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})))
    }

    return (
        <form onSubmit={handleSubmit}>
            { formTitle || formSubtitle ? (
              <>
                <h1>{formTitle}</h1>
                <p>{formSubtitle}</p>
              </>
            ): (
              <></>
            )}
            {fields.map((field, index) => (
                <div key={field}>
                    {field.type === 'textarea' ? (
                        <textarea
                            name={field.name}
                            value={input[field.name]}
                            className={field.className}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            required={field.required}
                        />
                    ) : (
                        <input
                            type={field.type}
                            name={field.name}
                            className={field.className}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            required={field.required}
                        />
                    )}
                </div>
            ))}
            <button type="submit">{buttonText}</button>
        </form>
    )
}

export default DynamicForm
