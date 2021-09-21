import React, { useState } from 'react';
import Thumbs from '../Assets/thumbs.png'
import Thumbs2 from '../Assets/thumbs2.png'
import Tack from '../Assets/tack.png'

import './stylesheets/Post.scss';

const Post = (props) => {
    const [clicked, setClick] = useState(false);
    const [liked, setLike] = useState(false);

    return(
        <div className='post-container'>
            <img
            className='tack'
            src={Tack} 
            alt='tack'
            />

            <p className='post-title'>{props.title}</p>
            <img 
            className='post-img'
            src={props.img} 
            alt={props.explanation}/>
            <p className='post-date'>
                    {props.date}
            </p>

            <img
            className='thumbs-up'
            src={liked ? Thumbs2 : Thumbs} 
            alt='thumbs up'
            onClick={() =>setLike(!liked)}/>
                
            
        

            {clicked ?
            <p className='post-explanation'>
                {props.explanation}
            </p>
            :
            <p className = 'learn-more' onClick={() =>setClick(!clicked)}>
                Learn More {'>'}
            </p>
            }
        </div>
    )
    
}

export default Post