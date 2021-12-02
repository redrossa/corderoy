import '../../styles/Home/Feed.scss';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {UserSelection} from '../../components/UserSelection';
import {Card, CardImg} from '../../components/Card';
import {Link} from 'react-router-dom';
import axios



export default function Feed(props) {

    
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
    });

    const getPosts = () => {

        

    } 


    return(

        <div classNames=Feed>
            {getPosts()}
        </div>
    )

}

export default Feed