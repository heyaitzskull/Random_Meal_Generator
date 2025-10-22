import { useState } from 'react';
import './App.css';

function App() {
  const [food, setFood] = useState(null);
  const [banList, setBanList] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await response.json();

      const meal = data.meals[0];
      if (!meal) return;

      if (banList.includes(meal.strCategory) || banList.includes(meal.strArea) ||
          banList.includes(meal.strIngredient1) ||
          banList.includes(meal.strIngredient2) ||
          banList.includes(meal.strIngredient3)) {
        fetchData();
        return;
      }

      setFood(meal);
      console.log(meal);
      setHistoryList(prev => [meal.strMeal, ...prev]);

    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  }

  const addToBanList = (params) => {
    if (!banList.includes(params.target.innerText)) {
      setBanList(prev => [...prev, params.target.innerText]);
    }
  }

  const removeFromBanList = (itemToRemove) => {
    setBanList(prev => prev.filter(item => item !== itemToRemove));
  }

  return (
    <div className="app">
      <h1>Random Meal Generator</h1>

      <div className="app-container">
        <div className="history">
          <h3>History</h3>
          {historyList.length === 0 ? (
            <p>No meals so far...</p>
          ) : (
            <p className="history-meal">
              {historyList.map((item, i) => <p>{item}</p>)}
            </p>
          )}
        </div>

      <div className="meal-container">
        <div className="meal">
          
          {food ? (
            <div>
              <p className="meal-name"><strong>{food.strMeal}</strong></p>
              <img src={food.strMealThumb} alt={food.strMeal} width="200" />
              
              <br/>
              
              Cusine:

              <div className="cusine">
                
                <button className="cusine-btn" onClick = {addToBanList}>
                  {food.strCategory}
                </button>
              
              <button className="cusine-btn" onClick = {addToBanList}>
                {food.strArea}
              </button>
              </div>
              Top 3 ingredients:
            <div className='ingredients'>
              
              <button className="ingred-btn" onClick = {addToBanList}>
                {food.strIngredient1}
              </button>
              <button className="ingred-btn" onClick = {addToBanList}>
                {food.strIngredient2}
              </button>
              <button className="ingred-btn" onClick = {addToBanList}>
                {food.strIngredient3}
              </button>
            </div>
              
            </div>
          ) : (
            <div>
              <p className = "instruction">Click "Generate" to fetch a random meal!</p>
              <p1>Each meal will display Cusine categories and its top 3 ingredients</p1>
              <br/>
           
              <p2>If you see something you don't like, simply click on it to ban. Now, meals consisting of that category won't show up again! </p2>
              <br/>
              <p2>Change of mind? No worries, toggle over to the banned section and click on it agin to undo</p2>
              
            </div>

          )}

          </div>
          
          <button className="generate-btn" onClick={fetchData}>
            Generate
          </button>
        
        </div>

        <div className="banlist">
          <h3>Ban List</h3>
          {banList.length === 0 ?  (
            <p>Nothing banned... yet...</p> 
          ) : (
            
            banList.map((item, i) => (
              <button className="banned" key={i} onClick={() => removeFromBanList(item)}>
                {item}
              </button>
            ))
          )}
        </div>
      </div>
      
      
    </div>
  );
}

export default App;
