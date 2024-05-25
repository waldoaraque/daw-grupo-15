import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faAdd } from '@fortawesome/free-solid-svg-icons'

const DynamicForm = ({ fields, buttonAdd, onSubmit, buttonText, formTitle, formSubtitle }) => {
    const [input, setInput] = useState(
        fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
    );
    const [optionalFields, setOptionalFields] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(input, () => setInput(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})));
    };

    const addOptionalField = () => {
        setOptionalFields([...optionalFields, { id: optionalFields.length, name: `question_${optionalFields.length + 1}`, placeholder: 'Ingresa pregunta del quest', required: true }]);
    };

    const removeOptionalField = (id) => {
        setOptionalFields(optionalFields.filter(field => field.id !== id));
        setInput(Object.keys(input).reduce((acc, key) => {
            if (!key.startsWith(`question_${id + 1}`)) {
                acc[key] = input[key];
            }
            return acc;
        }, {}));
    };

    return (
        <div className="center-container">
            <form onSubmit={handleSubmit}>
                {formTitle || formSubtitle ? (
                    <>
                        <h1>{formTitle}</h1>
                        <p>{formSubtitle}</p>
                    </>
                ) : null}

                {fields.map((field, index) => (
                    <div key={field.id_field || index}>
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
                                value={input[field.name]}
                                className={field.className}
                                placeholder={field.placeholder}
                                onChange={handleChange}
                                required={field.required}
                            />
                        )}
                    </div>
                ))}

                {buttonAdd && 
                    <> 
                    <FontAwesomeIcon 
                        icon={faAdd} 
                        className="" 
                        onClick={addOptionalField} 
                    />
                    </>
                }

                {optionalFields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor="">{field.label}</label>
                        <input
                            type="text"
                            name={field.name}
                            value={input[field.name] || ''}
                            className={field.className}
                            placeholder={field.placeholder}
                            onChange={handleChange}
                            required={field.required}
                        />
                        <FontAwesomeIcon 
                            icon={faTrash}
                            className="" 
                            onClick={() => removeOptionalField(field.id)} 
                        />
                    </div>
                ))}

                <button type="submit">{buttonText}</button>
            </form>
        </div>
    );
};

export default DynamicForm;
