import PotluckBeverages from './Beverages'
import PotluckMeals from './PotluckMeals'
import PotluckUtensils from './Utensils'
import './App.css';

function App() {
  return (<>
    <PotluckMeals />
    <PotluckBeverages />
    <PotluckUtensils />

  </>)
}

export default App