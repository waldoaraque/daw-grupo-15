import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'

const DynamicForm = ({ fields, buttonAdd, onSubmit, buttonText, formTitle, formSubtitle }) => {
    
    if (!fields) {
        fields = [] 
    }

    const [input, setInput] = useState(
        fields
            .reduce((acc, field) => (
                { 
                    ...acc, 
                    [field.name]: field.type === 'file' ? null : '' 
                }), 
            {})
    )
    const [optionalFields, setOptionalFields] = useState([])

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (e.target.type === 'file') {
            setInput({ ...input, [name]: files[0] })
        } else {
            setInput({ ...input, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(input, () => {
            setInput(
                fields
                    .reduce((acc, field) => (
                        { 
                            ...acc, 
                            [field.name]: field.type === 'file' ? null : '' 
                        }), 
                    {})
            )
        })
    }

    const addOptionalField = () => {
        setOptionalFields([
            ...optionalFields, 
            { 
                id: optionalFields.length, 
                name: `question_${optionalFields.length + 1}`, 
                placeholder: 'Ingresa pregunta del quest', 
                required: true 
            }
        ])
    }

    const removeOptionalField = (id) => {
        setOptionalFields(optionalFields.filter(field => field.id !== id))
        setInput(Object.keys(input).reduce((acc, key) => {
            if (!key.startsWith(`question_${id + 1}`)) {
                acc[key] = input[key];
            }
            return acc
        }, {}))
    }

    return (
        <div className="center-container">
            <form onSubmit={handleSubmit}>
                {formTitle || formSubtitle ? (
                    <>
                        <h1>{formTitle}</h1>
                        <p>{formSubtitle}</p>
                    </>
                ) : null}
                {fields ? (
                    fields.map((field, index) => (
                        <div key={field.id_field || index}>
                            {field.type === 'textarea' ? (
                                <>
                                    <label htmlFor="">{field.label}</label>
                                    <textarea
                                        name={field.name}
                                        value={input[field.name]}
                                        className= 'input-login-text'
                                        pattern={field.pattern}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        required={field.required}
                                    />
                                </>
                            ) : (
                                <>
                                    <label htmlFor="">{field.label}</label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        value={field.type === 'file' ? undefined : input[field.name]}
                                        className= 'input-login-text'
                                        pattern={field.pattern}
                                        placeholder={field.placeholder}
                                        onChange={handleChange}
                                        required={field.required}
                                        accept={field.accept}
                                    />
                                </>
                            )}
                        </div>
                    ))
                ) :(
                    <></>
                )}
                {buttonAdd && 
                    <> 
                    <label htmlFor="">Agregar Input</label>
                    <FontAwesomeIcon 
                        icon={faAdd} 
                        className="" 
                        onClick={addOptionalField} 
                    />
                    <br />
                    </>
                    
                }

                {optionalFields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor="">{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            value={input[field.name] || ''}
                            className= 'input-login-text'
                            pattern={field.pattern}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            required={field.required}
                        />
                        <FontAwesomeIcon 
                            icon={faTrash}
                            className="foro-icon-edit" 
                            onClick={() => removeOptionalField(field.id)} 
                        />
                    </div>
                ))}

                <button type="submit">{buttonText}</button>
            </form>
        </div>
    )
}

export default DynamicForm
