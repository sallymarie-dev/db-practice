import { useState } from "react";
import supabase from "./utils/supabase";

export default function PotluckMeals() {
    const [meals, setMeals] = useState([])

    async function handleFetchMeals() {
        console.log("Fetching meals...")
        const result = await supabase.from("potluck_meals").select();
        const data = result.data;
        console.log("Fetched data:", data);
        setMeals(data);
    }

    const mealsDisplay = [];
    for (let i = 0; i < meals.length; i++) {
        mealsDisplay.push(
            <li key={meals[i].id}>
                {meals[i].meal_name} by {meals[i].guest_name} serves {meals[i].serves} ( {meals[i].kind_of_dish} )
            </li>
        );
    }

    async function handleAddMeal(event) {
        event.preventDefault();
        console.log("handle add meal submitted")
        const mealName = event.target.elements.mealName.value
        const guestName = event.target.elements.guestName.value
        const serves = event.target.elements.serves.value
        const kindOfDish = event.target.elements.kindOfDish.value
        console.log(event)

        const newMeal = {
            meal_name: mealName,
            guest_name: guestName,
            serves: parseInt(serves),
            kind_of_dish: kindOfDish
        }

        console.log(newMeal)

        await supabase.from("potluck_meals").insert(newMeal)


        // Refresh the meals list
        const response = await supabase.from("potluck_meals").select()
        const data = response.data
        const error = response.error
        setMeals(data)

        event.target.elements.mealName.value = ""
        event.target.elements.guestName.value = ""
        event.target.elements.serves.value = ""
        event.target.elements.kindOfDish.value = ""
        if (error) {
            console.error('Insert failed:', error);
            // Show user-friendly error message
        } else {
            console.log('Meal added successfully:', data);
            // Update UI to show success
        }
    }

    return (
        <>
            <h1>Potluck meals</h1>
            <ul>
                {mealsDisplay}
                <button onClick={handleFetchMeals}>Meals</button>
            </ul>
            <div>
                <form onSubmit={handleAddMeal}>
                    <label>
                        Meal: <input type="text" name="mealName" />
                    </label>
                    <br />
                    <label>
                        Guest: <input type="text" name="guestName" />
                    </label>
                    <br />
                    <label>
                        Serving Size: <input type="number" name="serves" />
                    </label>
                    <br />
                    <label>
                        Kind of Dish: <select name="kindOfDish" defaultValue="">
                            <option value="" disabled>Select a kind</option>
                            <option value="entree">Entree</option>
                            <option value="side">Dessert</option>
                            <option value="snack">Appetizer</option>
                            <option value="dessert">Seafood</option>
                            <option value="drink">Salads</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Add Meals</button>
                </form>
            </div>
        </>
    );
}