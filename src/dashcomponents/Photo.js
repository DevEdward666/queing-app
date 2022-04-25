import React from 'react'

const Photo =(props)=>{
    return(
        <section>
            <img src={props.url} alt="logo"/>
        </section>
    )
}
export default Photo;