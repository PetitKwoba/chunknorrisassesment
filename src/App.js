import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    Container,
    Tab,
    Tabs,
    Typography,
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        marginBottom: 20,
    },
    CardContent: {
        paddingBottom: '5'
    },
    CardActions: {
        padding: '15px'
    }
})

const likeJoke = (id) => {
    console.log("uliking joke, " + id);
}

const unlikeJoke = (id) => {
    console.log("uliking joke, " + id);
}

const Category = withStyles({
    root: {
        marginTop: 10,
        marginBottom: 10
    }
})(Chip)

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
                { jokesToShow.map(joke => ( 
                        < Card key = { joke.id } className = { classes.card } > 
                            <CardContent className = { classes.CardContent } >
                                {joke.categories.length > 0 ? (
                                    joke.categories.map(cat => ( 
                                    < Category label = { cat } key = { cat } variant = "outlined" /> ))
                                        ) : 
                                        < Category label = "Regular" variant = "outlined"/>
                                    }
                        
                                < Typography > { joke.joke } </Typography> 

                            </CardContent >
                                <CardActions className = { classes.CardActions } >
                                    <Button variant = "contained" color = "primary"onClick = {() => likeJoke(joke.id)}>
                                        like 
                                    </Button> 

                                    <Button variant = "contained" color = "default" onClick = {() => unlikeJoke(joke.id)} >
                                        unlike 
                                    </Button> 
                                </CardActions> 
                        </Card>
                    ))}
            </div>

            <div role="tabpanel" hidden={currentTab !== 1}>
            { likedJokes.map(joke => ( 
                        < Card key = { joke.id } className = { classes.card } > 
                            <CardContent className = { classes.CardContent } >
                                {joke.categories.length > 0 ? (
                                    joke.categories.map(cat => ( 
                                    < Category label = { cat } key = { cat } variant = "outlined" /> ))
                                        ) : 
                                    < Category label = "Regular" variant = "outlined"/>
                                    }
                            < Typography > { joke.joke } </Typography> 

                            </CardContent >
                                <CardActions className = { classes.CardActions } >
                                    <Button variant = "contained" color = "primary"onClick = {() => likeJoke(joke.id)}>
                                        like 
                                    </Button> 

                                    <Button variant = "contained" color = "default" onClick = {() => unlikeJoke(joke.id)} >
                                        unlike 
                                    </Button> 
                                </CardActions> 
                        </Card>
                    ))
                    }       
            </div>
             
        </Container> 
        </div>
);
}

export default App;