import React from 'react'
import {Button, Card, Chip, CardContent, CardActions, Typography,} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        marginBottom: 20,
    },
    CardContent: {
        paddingBottom: '5',
    },
    CardActions: {
        padding: '15px',
    },
 })

const Category = withStyles({
    root: {
        marginTop: 10,
        marginBottom: 10
    },
})(Chip);


function JokeCard({joke, likeJoke, unlikeJoke} ) {

    const classes = useStyles();

    const Category = withStyles({
        root: {
            marginTop:10,
            marginBottom: 10,
        },
    })(Chip);

    return (
    
             < Card className = { classes.card } > 
                <CardContent className = { classes.CardContent } >
                    {joke.categories.length > 0 ? (joke.categories.map(cat => ( 
                        < Category label = { cat } key = { cat } variant = "outlined" /> ))
                            ) : 
                        < Category label = "Regular" variant = "outlined"/>}
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
    )
};

export default JokeCard;