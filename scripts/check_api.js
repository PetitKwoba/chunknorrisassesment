(async function(){
  try{
    const categoriesRes = await fetch('https://api.chucknorris.io/jokes/categories');
    const categories = await categoriesRes.json();
    console.log('CATEGORIES:', JSON.stringify(categories));

    const randomRes = await fetch('https://api.chucknorris.io/jokes/random');
    const random = await randomRes.json();
    console.log('RANDOM:', JSON.stringify({id: random.id, value: random.value, categories: random.categories}));

    if(Array.isArray(categories) && categories.length > 0){
      const first = categories[0];
      const randByCatRes = await fetch('https://api.chucknorris.io/jokes/random?category=' + encodeURIComponent(first));
      const randByCat = await randByCatRes.json();
      console.log('RANDOM_BY_CATEGORY('+first+'):', JSON.stringify({id: randByCat.id, value: randByCat.value, categories: randByCat.categories}));
    } else {
      console.log('No categories returned');
    }
  }catch(err){
    console.error('ERROR:', err && (err.stack || err.message || err));
    process.exitCode = 2;
  }
})();
