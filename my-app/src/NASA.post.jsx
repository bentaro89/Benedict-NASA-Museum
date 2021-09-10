import React from 'react';
import './Post.scss';

const Post = (props) => {
    return(
        <div>
            <h1>{props.title}</h1>
            <img 
            className='post-img'
            src={props.img} 
            alt={props.explanation}/>
            <p>{props.explanation}</p>
        </div>
    )
    
}

export default Post