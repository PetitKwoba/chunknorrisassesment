import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Badge,
    Container,
    CircularProgress,
    Tab,
    Tabs,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles} from '@material-ui/core/styles';
import  JokeCard  from './JokeCard';

const useStyles = makeStyles({

});

function Spinner(){
    return(
        <div style={{textAlign: 'center', padding: '2rem' }}>
            <CircularProgress/>
        </div>
    )}
    

const likeJoke = (id) => {
    console.log("uliking joke, " + id);
};


const unlikeJoke = (id) => {
    console.log("unliking joke, " + id);
};

function App() {

    const [jokes, setJokes] = useState([]);
    const [jokesToShow, setJokesToShow] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);

    const [likedJokes, setLikedJokes] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);

    const [firstName, setFirstName] = useState([]);
    const [lastName, setlastName] = useState([]);

    const[loading, setLoading] = useState([false]);

    const classes = useStyles();


    useEffect(() => {
        setLoading(true)
        fetchAndSetJokes ()
        fetch('http://api.icndb.com/categories')
        .then(res => res.json())
        .then(res => {
            setCategories(res.value);
            setFilterCategories(res.value)
        })
        
        .catch(err => console.log(err))
    }, []);

    const fetchAndSetJokes = () => {
        fetch('https://api.icndb.com/jokes')
        .then(res => res.json())
        .then(res => {
            console.log(res);
            setJokes(res.value)
            setJokesToShow(res.value.slice(0, 10))
        })
        .catch((err) => console.log(err));
    }

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


    const addMoreJokes = () => {
        setLoading(true)
        setTimeout(() => {
        setJokesToShow(jokes.slice(0, jokesToShow.length + 10));
        setLoading(false) 
        }, 400);
    };

   const observeElement = (bottomJoke) => {
       if (!bottomJoke) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting === true) {
        addMoreJokes();
        observer.unobserve(bottomJoke);
        }
    },{
        threshold: 1,
    } );
    observer.observe(bottomJoke);
   };

   useEffect(() => {
    const bottomJokeE1 = document.getElementById(
        `joke-${jokesToShow.length -1}`    
    );
    observeElement(bottomJokeE1);
}, [jokesToShow]);
  
const toggleCategory = (event, value) => {
    const category = event.target.name

    if(filterCategories.includes(category)){
        {/*if category found then remove else*/}
        const filterCategoriesCopy = [...filterCategories];
        const categoryIndex = filterCategoriesCopy.indexOf(category);
        filterCategoriesCopy.splice(categoryIndex, 1);
        setFilterCategories(filterCategoriesCopy);
        {/**Add it */}
    } else{
        setFilterCategories([...filterCategories, category])
    }
};

const categoryMatch = (jokeCategories) =>{
    for(let i = 0; i < jokeCategories.length; i++){
        if(filterCategories.includes(jokeCategories[i])) return true
    }
    return false
};

const changeName = () => {
    if(firstName === '' || lastName ==='') return
    
} 
    return ( 
        <div className = "App" >
        <CssBaseline />
        <Container>
            <Typography variant = "h3" align = "center" > Chuck Norris jokes </Typography>

            <AppBar style={{marginBottom: 20}} position="sticky" >
            <Tabs value={currentTab} onChange={changeTab} centered>
                <Tab label= "Home" id="home-tab" arial-controls="home-panel"/>
                <Tab label= {
                    <Badge
                        color="secondary"
                        badgeContent={
                            likedJokes.length > 0 ? likedJokes.length : null
                        }>
                            Likes
                        </Badge>
                } id="like-tab" arial-controls="likes-panel"/>    
            </Tabs> 
            </AppBar>

            <div role="tabpanel" hidden={currentTab !== 0}>
                <form onSubmit={changeName} noValidate>
                    <TextField 
                        id="FirstName"
                        label="First Name"
                        value={firstName}
                        onChange={ e => setFirstName(e.target.value)}
                    />

                    <TextField 
                        id="lastName"
                        label="Last Name"
                        value={lastName}
                        onChange={ e => setlastName(e.target.value)}
                    />
                </form>
                {/*Category filters */}
                {categories.map((category) => (
                    <FormControlLabel
                        key={category}
                            control ={ 
                                <Checkbox name={category} 
                                color="primary" 
                                checked={filterCategories.includes}
                                onChange={toggleCategory}/> }
                                label={category}
                    />
                ))}
                {/*Joke Cards*/}
                { jokesToShow.map((joke, index)=> {
                    if (joke.categories.length === 0 || 
                        categoryMatch(joke.categories)) {
                        
                return(
                    <JokeCard key={joke.id}
                     joke={joke}
                     likeJoke={likeJoke}
                     unlikeJoke={unlikeJoke}
                     index={index}/>
                );
                }})}
                {loading && Spinner}
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