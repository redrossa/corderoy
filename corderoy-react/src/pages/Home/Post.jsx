import '../../styles/Home/Post.scss';
import classNames from 'classnames';
import React, {useEffect, useState} from 'react';
import {UserSelection} from '../../components/UserSelection';
import Card from "react-bootstrap/Card";
import Vote
import {Link} from 'react-router-dom';



export default function Post(props) {


    const [posts, setPosts] = useState([]);
    const [votes, setVotes] = useState([]);

    
    const upvote = () => {

        setVotes({
            votes: votes + 1
        })
    }

    const downvote = () => {

        setVotes({
            votes: votes - 1
        })
    }
   
    return (
        <Card>
            <Card.Header>
                {props.outfit.title}
            </Card.Header>        
            <ImageGrid data={props.outfit.products}/>
            <Card.Body>
                <Card.Text>
                    {props.outfit.desc}
                </Card.Text>
                <Vote 

                    votes={votes} 
                    increment={upvote}
                    decrement={downvote}
                />
                <Card.Subtitle>
                    {props.outfit.date}
                </Card.Subtitle>
            </Card.Body>
        </Card>
    );
}