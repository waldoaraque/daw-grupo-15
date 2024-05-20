import DefaultLayout from "../layout/DefaultLayout"

export default function Post () {

    return (
        <DefaultLayout>
            <div className='post'>
                
                <h2>Titulo post</h2> 
                <h3>Autor</h3>
                <p>Categoria</p>
                <p> // 
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, voluptates. 
                    Laborum non cupiditate veritatis exercitationem quo at doloremque provident nisi laboriosam sequi optio impedit beatae, 
                    vitae blanditiis corporis commodi assumenda.
                </p>
            </div>
        </DefaultLayout>
    )
}
