import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    CardActions,
    Chip,
    Container,
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
    console.log("liking joke, " + id);
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

    const [jokes, setJokes] = useState([])

    const classes = useStyles();
    useEffect(() => {
        fetch('https://api.icndb.com/jokes')
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setJokes(res.value)
            })
            .catch((err) => console.log(err));
    }, []);

    return ( <
            div className = "App" >
            <
            CssBaseline / >
            <
            Container >
            <
            Typography variant = "h1"
            align = "center" >
            Chuck Norris jokes <
            /Typography>  {
            jokes.map(joke => ( <
                Card key = { joke.id }
                className = { classes.card } > <
                CardContent className = { classes.CardContent } >

                {
                    joke.categories.length > 0 ? (
                        joke.categories.map(cat => ( <
                            Category label = { cat }
                            key = { cat }
                            variant = "outlined"

                            /
                            >
                        ))
                    ) : < Category label = "Not Categorized"
                    variant = "outlined"

                    /
                    >
                }

                <
                Typography > { joke.joke } < /Typography> < /
                CardContent >
                <
                CardActions className = { classes.CardActions } >

                <
                Button variant = "contained"
                color = "primary"
                onClick = {
                    () => likeJoke(joke.id)
                } >
                like <
                /Button> 

                <
                Button variant = "contained"
                color = "default"
                onClick = {
                    () => unlikeJoke(joke.id)
                } >
                unlike <
                /Button> < /
                CardActions > <
                /Card>
            ))
        } <
        /
    Container > <
        /
    div >
);
}

export default App;