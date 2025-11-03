import React, { useEffect, useState, useCallback, useRef } from 'react';
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
    Checkbox,
    Button,
    Box,
    Snackbar,
    Card,
    CardContent,
    CardActions,
    Fade,
    Paper
} from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import JokeCard from './JokeCard';

const useSkeletonStyles = makeStyles({
    skeleton: {
        backgroundColor: '#e0e0e0',
        animation: '$pulse 1.5s ease-in-out infinite',
        borderRadius: 4,
    },
    '@keyframes pulse': {
        '0%': {
            opacity: 1,
        },
        '50%': {
            opacity: 0.4,
        },
        '100%': {
            opacity: 1,
        },
    },
});

function Spinner() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <CircularProgress />
        </div>
    );
}

// Custom skeleton loader for jokes while loading
function JokeSkeleton() {
    const classes = useSkeletonStyles();
    return (
        <Card style={{ marginBottom: 20 }}>
            <CardContent>
                <div className={classes.skeleton} style={{ width: '30%', height: 24, marginBottom: 10 }} />
                <div className={classes.skeleton} style={{ width: '100%', height: 16, marginBottom: 8 }} />
                <div className={classes.skeleton} style={{ width: '100%', height: 16, marginBottom: 8 }} />
                <div className={classes.skeleton} style={{ width: '80%', height: 16 }} />
            </CardContent>
            <CardActions style={{ padding: 15, display: 'flex', justifyContent: 'space-between' }}>
                <div className={classes.skeleton} style={{ width: 40, height: 40, borderRadius: '50%' }} />
                <div className={classes.skeleton} style={{ width: 40, height: 40, borderRadius: '50%' }} />
            </CardActions>
        </Card>
    );
}

// Helper function to replace Chuck Norris with custom names
function replaceNames(text, firstName, lastName) {
    if (!text) return '';
    let result = text;
    if (firstName && lastName) {
        result = result.replace(/Chuck Norris/gi, `${firstName} ${lastName}`);
        result = result.replace(/\bChuck\b/gi, firstName);
        result = result.replace(/\bNorris\b/gi, lastName);
    } else if (firstName) {
        result = result.replace(/\bChuck\b/gi, firstName);
    } else if (lastName) {
        result = result.replace(/\bNorris\b/gi, lastName);
    }
    return result;
}

function App() {

    const [jokes, setJokes] = useState([]);
    const [jokesToShow, setJokesToShow] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterCategories, setFilterCategories] = useState([]);

    const [likedJokes, setLikedJokes] = useState(() => {
        // Load liked jokes from localStorage on mount
        try {
            const saved = localStorage.getItem('likedJokes');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            return [];
        }
    });
    const [currentTab, setCurrentTab] = useState(0);

    const [firstName, setFirstName] = useState('');
    const [lastName, setlastName] = useState('');

    const [loading, setLoading] = useState(false);
    const mountedRef = useRef(true);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const showSnackbar = (message, severity = 'success') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    // Persist liked jokes to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('likedJokes', JSON.stringify(likedJokes));
        } catch (e) {
            console.error('Failed to save liked jokes:', e);
        }
    }, [likedJokes]);

    // Helper to fetch one random joke (optionally by category)
    const fetchRandomJoke = useCallback(async (category) => {
        const url = category ? `/jokes/random?category=${encodeURIComponent(category)}` : '/jokes/random';
        const res = await fetch(url);
        return res.json();
    }, []);

    // Fetch initial set of jokes (default 10) or more when requested.
    const fetchAndSetJokes = useCallback(async (count = 10, byCategory = null) => {
        try {
            const collected = [];
            const maxAttempts = Math.max(50, count * 10);
            let attempts = 0;

            while (collected.length < count && attempts < maxAttempts) {
                attempts += 1;
                const r = await fetchRandomJoke(byCategory);
                const categoriesForJoke = r && r.categories ? r.categories : [];
                // skip explicit jokes
                if (categoriesForJoke.includes('explicit')) {
                    continue;
                }
                const idx = Date.now() + attempts;
                const replaced = replaceNames(r.value, firstName, lastName);
                collected.push({ id: r.id || `${idx}`, joke: replaced, categories: categoriesForJoke });
            }

            if (!mountedRef.current) return;
            setJokes(prev => [...prev, ...collected]);
            setJokesToShow(prev => [...prev, ...collected].slice(0, (prev.length || 0) + collected.length));
            setLoading(false);
        } catch (err) {
            console.log(err);
            if (mountedRef.current) setLoading(false);
        }
    }, [fetchRandomJoke, firstName, lastName]);

    // when user changes the first/last name, update already-fetched jokes
    useEffect(() => {
        if (!firstName && !lastName) return;
        setJokes(prev => prev.map(j => ({
            ...j,
            joke: replaceNames(j.joke, firstName, lastName)
        })));

        setJokesToShow(prev => prev.map(j => ({
            ...j,
            joke: replaceNames(j.joke, firstName, lastName)
        })));
    }, [firstName, lastName]);

    useEffect(() => {
        mountedRef.current = true;
        setLoading(true);
        fetchAndSetJokes();
        fetch('/jokes/categories')
            .then(res => res.json())
            .then(res => {
                if (!mountedRef.current) return;
                // remove the explicit category from the available categories
                const safeCategories = Array.isArray(res) ? res.filter(c => c !== 'explicit') : [];
                setCategories(safeCategories);
                setFilterCategories(safeCategories);
            })
            .catch(err => console.log(err));

        return () => { mountedRef.current = false; };
    }, [fetchAndSetJokes]);

    const likeJoke = (id) => {
        setLikedJokes(prev => {
            if (prev.find((j) => j.id === id)) return prev;
            const likedJoke = jokes.find((j) => j.id === id) || {};
            showSnackbar('Joke added to favorites! ❤️', 'success');
            return [likedJoke, ...prev];
        });
    };

    const unlikeJoke = (id) => {
        setLikedJokes(prev => {
            const filtered = prev.filter((j) => j.id !== id);
            if (filtered.length !== prev.length) {
                showSnackbar('Joke removed from favorites', 'info');
            }
            return filtered;
        });
    };

    const changeTab = (event, value) => {
        setCurrentTab(value);
    };

    const addMoreJokes = useCallback(async () => {
        setLoading(true);
        // If categories are selected, fetch more by picking a random selected category
        const selectedCategories = filterCategories && filterCategories.length > 0 ? filterCategories : null;
        const byCategory = selectedCategories ? selectedCategories[Math.floor(Math.random() * selectedCategories.length)] : null;
        await fetchAndSetJokes(10, byCategory);
    }, [filterCategories, fetchAndSetJokes]);

    useEffect(() => {
        const bottomJokeE1 = document.getElementById(
            `joke-${jokesToShow.length - 1}`
        );
        if (!bottomJokeE1) return;
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting === true) {
                addMoreJokes();
                observer.unobserve(bottomJokeE1);
            }
        }, {
            threshold: 1,
        });
        observer.observe(bottomJokeE1);

        return () => {
            try { observer.disconnect(); } catch (e) { /* ignore */ }
        };
    }, [jokesToShow, addMoreJokes]);

    const toggleCategory = (event) => {
        const category = event.target.name;

        if (filterCategories.includes(category)) {
            // if category found then remove
            const filterCategoriesCopy = [...filterCategories];
            const categoryIndex = filterCategoriesCopy.indexOf(category);
            filterCategoriesCopy.splice(categoryIndex, 1);
            setFilterCategories(filterCategoriesCopy);
            // refetch jokes for new filter set
            setJokes([]);
            setJokesToShow([]);
            setLoading(true);
            // if there are remaining filters, fetch initial set using a random selected category
            if (filterCategoriesCopy.length > 0) {
                fetchAndSetJokes(10, filterCategoriesCopy[Math.floor(Math.random() * filterCategoriesCopy.length)]);
            } else {
                fetchAndSetJokes(10, null);
            }
        } else {
            // add it
            const newFilters = [...filterCategories, category];
            setFilterCategories(newFilters);
            setJokes([]);
            setJokesToShow([]);
            setLoading(true);
            // fetch initial jokes for the newly added category
            fetchAndSetJokes(10, category);
        }
    };

    const categoryMatch = (jokeCategories) => {
        for (let i = 0; i < jokeCategories.length; i++) {
            if (filterCategories.includes(jokeCategories[i])) return true;
        }
        return false;
    };

    const changeName = (e) => {
        e && e.preventDefault();
        if (firstName === '' || lastName === '') return;
        // placeholder: could re-fetch jokes with name params
    };

    return (
        <div className="App">
            <CssBaseline />
            <Container maxWidth="md" style={{ paddingBottom: '2rem' }}>
                <Typography variant="h3" align="center" style={{ padding: '1.5rem 0', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>
                    Chuck Norris jokes
                </Typography>

                <AppBar style={{ marginBottom: 20 }} position="sticky" >
                    <Tabs value={currentTab} onChange={changeTab} centered>
                        <Tab label="Home" id="home-tab" aria-controls="home-panel" />
                        <Tab label={
                            <Badge
                                color="secondary"
                                badgeContent={
                                    likedJokes.length > 0 ? likedJokes.length : null
                                }>
                                Likes
                            </Badge>
                        } id="like-tab" aria-controls="likes-panel" />
                    </Tabs>
                </AppBar>

                <div role="tabpanel" hidden={currentTab !== 0} aria-labelledby="home-tab" id="home-panel">
                    <Box component="form" onSubmit={changeName} noValidate aria-label="Customize joke names" 
                         sx={{ mb: 2, mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
                        <TextField
                            id="FirstName"
                            label="First Name"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            aria-label="Enter first name to replace Chuck"
                            variant="outlined"
                            size="small"
                            style={{ flex: '1 1 200px', minWidth: '150px' }}
                        />

                        <TextField
                            id="lastName"
                            label="Last Name"
                            value={lastName}
                            onChange={e => setlastName(e.target.value)}
                            aria-label="Enter last name to replace Norris"
                            variant="outlined"
                            size="small"
                            style={{ flex: '1 1 200px', minWidth: '150px' }}
                        />
                        
                        {(firstName || lastName) && (
                            <Button 
                                variant="outlined" 
                                size="small" 
                                onClick={() => { setFirstName(''); setlastName(''); }}
                            >
                                Clear Names
                            </Button>
                        )}
                    </Box>
                    {/* Category filters */}
                    <fieldset style={{ border: 'none', padding: 0, margin: '1rem 0' }} aria-label="Filter jokes by category">
                        {categories.map((category) => (
                            <FormControlLabel
                                key={category}
                                control={
                                    <Checkbox name={category}
                                        color="primary"
                                        checked={filterCategories.includes(category)}
                                        onChange={toggleCategory} 
                                        inputProps={{ 'aria-label': `Filter by ${category} category` }}
                                    />}
                                label={category}
                            />
                        ))}
                    </fieldset>
                    {/* Joke Cards */}
                    {jokesToShow.length === 0 && !loading && (
                        <Typography variant="body1" align="center" style={{ marginTop: '2rem', color: '#666' }}>
                            No jokes to display. Try selecting different categories!
                        </Typography>
                    )}
                    {jokesToShow.map((joke, index) => {
                        // skip any joke that contains the 'explicit' category
                        if (joke.categories && joke.categories.includes('explicit')) {
                            return null;
                        }
                        if (joke.categories.length === 0 || categoryMatch(joke.categories)) {
                            const isLiked = likedJokes.some(j => j.id === joke.id);
                            return (
                                <Fade in={true} timeout={500} key={joke.id}>
                                    <div>
                                        <JokeCard 
                                            joke={joke}
                                            likeJoke={likeJoke}
                                            unlikeJoke={unlikeJoke}
                                            index={index}
                                            isLiked={isLiked} />
                                    </div>
                                </Fade>
                            );
                        }
                        return null;
                    })}
                    {loading && (
                        <>
                            <JokeSkeleton />
                            <JokeSkeleton />
                            <JokeSkeleton />
                        </>
                    )}
                    {!loading && jokesToShow.length > 0 && (
                        <Box textAlign="center" mt={3} mb={3}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={addMoreJokes}
                                size="large"
                            >
                                Load More Jokes
                            </Button>
                        </Box>
                    )}
                </div>

                <div role="tabpanel" hidden={currentTab !== 1} aria-labelledby="like-tab" id="likes-panel">
                    {likedJokes.length === 0 && (
                        <Typography variant="body1" align="center" style={{ marginTop: '2rem', color: '#666' }}>
                            No liked jokes yet. Start liking jokes from the Home tab!
                        </Typography>
                    )}
                    {likedJokes.map((joke, index) => {
                        const isLiked = true;
                        return (
                            <JokeCard 
                                key={joke.id} 
                                joke={joke} 
                                likeJoke={likeJoke} 
                                unlikeJoke={unlikeJoke} 
                                index={index}
                                isLiked={isLiked} 
                            />
                        );
                    })}
                </div>

            </Container>

            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={3000} 
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Paper 
                    elevation={6}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: snackbar.severity === 'success' ? '#4caf50' : '#f44336',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '4px'
                    }}
                >
                    {snackbar.message}
                </Paper>
            </Snackbar>

            {/* Footer */}
            <Box 
                component="footer" 
                sx={{ 
                    mt: 6, 
                    py: 3, 
                    textAlign: 'center',
                    borderTop: '1px solid #e0e0e0'
                }}
            >
                <Typography variant="body2" color="textSecondary">
                    Developed by{' '}
                    <a 
                        href="https://petitportfolio.netlify.app/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                    >
                        Emmanuel P. Kwoba
                    </a>
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: '8px' }}>
                    <a 
                        href="https://github.com/PetitKwoba" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}
                    >
                        GitHub Profile
                    </a>
                </Typography>
            </Box>
        </div>
    );
}

export default App;