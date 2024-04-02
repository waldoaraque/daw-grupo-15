import DefaultLayout from "../layout/DefaultLayout";
import { useForm } from "react-hook-form";

export default function Contact () {
    const {register, formState:{errors}, handleSubmit} = useForm();
    

    function insertar (data) {
        // Aquí se enviará los datos al backend
    }
    return (
        <DefaultLayout>
            <form className="form" onSubmit={handleSubmit(insertar)}>
                <h1>Contáctanos</h1>
                <label>Name</label>
                <input type="text" {...register("userName",
                {required:true, maxLength:20})}/>
                    {
                        errors.userName?.type === "required" && (
                            <P className="msg-error">Error: Necesitas ingresar un nombre</P>
                        )
                    }
                    {
                        errors.userName?.type === "maxLength" && (
                            <p className="msg-error">Error: El nombre no puede contener más de 20 caracteres</p>
                        )
                    }

                <label>Email</label>
                <input type="email" {...register("userEmail",
                {required:true, pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                }})}/>
                    {
                        errors.userEmail?.type === "required" && (
                            <P className="msg-error">Error: Necesitas ingresar un email</P>
                        )
                    }
                    {
                        errors.userEmail?.type === "pattern" && (
                            <p className="msg-error">Error: Formato de email no valido</p>
                        )
                    }

                <label>Mensaje</label>
                <input type="text" className="textBox"
                {...register("descipcion",
                    {required:true, minLength:5, maxLength:1500
                })}/>
                {
                    errors.descripcion?.type === "required" && (
                        <P className="msg-error">Error: Ingrese una descripción</P>
                    )
                }
                {
                    errors.userEmail?.type === "minLength" && (
                        <p className="msg-error">Error: El mensaje debe contener más de 5 caracteres</p>
                    )
                }    
                {
                    errors.userEmail?.type === "maxLength" && (
                        <p className="msg-error">Error: El mensaje debe contener menos de 1500 caracteres</p>
                    )
                }    
                <button>Enviar</button>
            </form>
        </DefaultLayout>
    )
}