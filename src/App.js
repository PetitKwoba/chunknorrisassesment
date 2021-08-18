import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Container,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles} from '@material-ui/core/styles';
import  JokeCard  from './JokeCard';

const useStyles = makeStyles({

})


const likeJoke = (id) => {
    console.log("uliking joke, " + id);
}


const unlikeJoke = (id) => {
    console.log("unliking joke, " + id);
}

function App() {

    const [jokes, setJokes] = useState([]);
    const [jokesToShow, setJokesToShow] = useState([]);

    const [likedJokes, setLikedJokes] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

    const classes = useStyles();


    useEffect(() => {
        fetch('https://api.icndb.com/jokes')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setJokes(res.value)
                setJokesToShow(res.value.slice(0, 10))
                observeElement()
            })
            .catch((err) => console.log(err));
    }, []);

    const likeJoke = (id) => {
        if (likedJokes.find((j) => j.id === id)) return;
        const likedJoke = jokes.find((j) => j.id === id);
        setLikedJokes([likedJoke, ...likedJokes])
    };

    const unlikeJoke = (id) => {
        const newLikedJokes =  likedJokes.filter((j) => j.id !== id);
        setLikedJokes(newLikedJokes);
    };

    const changeTab = (event, value) => {
        setCurrentTab(value)
    };

   const observeElement = () => {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true) {
            console.log("Reached bottom of Code")
        }
    },{
        threshold: 1
    } )

    const bottomJokeId = `joke-${jokesToShow.length -1}`
    const bottomJokeE1 = document.getElementById(bottomJokeId);
    console.log(bottomJokeE1)
    observer.observe(bottomJokeE1)
   };

    return ( 
        <div className = "App" >
        <CssBaseline />
        <Container>
            <Typography variant = "h1" align = "center" > Chuck Norris jokes </Typography>

            <AppBar style={{marginBottom: 20}} position="sticky" >
            <Tabs value={currentTab} onChange={changeTab} centered>
                <Tab label= "Home" id="home-tab" arial-controls="home-panel"/>
                <Tab label= "Likes" id="like-tab" arial-controls="likes-panel"/>    
            </Tabs> 
            </AppBar>

            <div role="tabpanel" hidden={currentTab !==0}>
                { jokesToShow.map((joke, index)=> {
                return(
                    <JokeCard key={joke.id}
                     joke={joke}
                     likeJoke={likeJoke}
                     unlikeJoke={unlikeJoke}
                     index={index}/>
                )})}
            </div>
                 

            <div role="tabpanel" hidden={currentTab !== 1}>
            { likedJokes.map((joke) => ( 
                <JokeCard key={joke.id} joke={joke} likeJoke={likeJoke} unlikeJoke={unlikeJoke}/> 
            ))}       
            </div>
             
        </Container> 
        </div>
);
}

export default App;