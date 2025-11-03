import React, { useState } from 'react';
import { Button, Card, Chip, CardContent, CardActions, Typography, IconButton, Tooltip } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Favorite, FavoriteBorder, FileCopy } from '@material-ui/icons';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
    card: {
        marginBottom: 20,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        },
    },
    cardContent: {
        paddingBottom: 5,
    },
    cardActions: {
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    jokeText: {
        marginTop: '12px',
        lineHeight: 1.6,
    },
});

const Category = withStyles({
    root: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 8,
    },
})(Chip);

function JokeCard({ joke, likeJoke, unlikeJoke, index, isLiked }) {
    const classes = useStyles();
    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(joke.joke).then(() => {
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    };

    return (
        <Card className={classes.card} id={`joke-${index}`}>
            <CardContent className={classes.cardContent}>
                {joke.categories && joke.categories.length > 0 ? (
                    joke.categories.map(cat => (
                        <Category label={cat} key={cat} variant="outlined" color="primary" />
                    ))
                ) : (
                    <Category label="Regular" variant="outlined" />
                )}
                <Typography className={classes.jokeText}>{joke.joke}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div>
                    <Tooltip title={isLiked ? "Unlike this joke" : "Like this joke"}>
                        <IconButton 
                            color="secondary" 
                            onClick={() => isLiked ? unlikeJoke(joke.id) : likeJoke(joke.id)}
                            aria-label={isLiked ? "unlike joke" : "like joke"}
                        >
                            {isLiked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                    </Tooltip>
                </div>
                <Tooltip title={copySuccess ? "Copied!" : "Copy to clipboard"}>
                    <IconButton 
                        onClick={handleCopy}
                        aria-label="copy joke to clipboard"
                        color={copySuccess ? "primary" : "default"}
                    >
                        <FileCopy />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
}

export default React.memo(JokeCard);

JokeCard.propTypes = {
    joke: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        joke: PropTypes.string.isRequired,
        categories: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    likeJoke: PropTypes.func.isRequired,
    unlikeJoke: PropTypes.func.isRequired,
    index: PropTypes.number,
    isLiked: PropTypes.bool,
};