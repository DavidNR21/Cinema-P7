import './Container.css'


// eslint-disable-next-line react/prop-types
function Container({ children }){
    return (
        <section className="container">
            {children}
        </section>
    )
}



export default Container
