import { useState } from "react";
import supabase from "./utils/supabase";

export default function PotluckBeverages() {
    const [beverages, setBeverages] = useState([])

    async function handleFetchBeverages() {
        console.log("Fetching beverages...")
        const result = await supabase.from("potluck_beverages").select();
        const data = result.data;
        console.log("Fetched data:", data);
        setBeverages(data);
    }

    const beveragesDisplay = [];
    for (let i = 0; i < beverages.length; i++) {
        beveragesDisplay.push(
            <li key={beverages[i].id}>
                {beverages[i].beverage_name} by {beverages[i].guest_name} quantity {beverages[i].quantity} ( {beverages[i].type_of_drink} )
            </li>
        );
    }

    async function handleAddBeverages(event) {
        event.preventDefault();
        console.log("handle add beverage submitted")
        const beverageName = event.target.elements.beverageName.value
        const guestName = event.target.elements.guestName.value
        const quantity = event.target.elements.quantity.value
        const typeOfDrink = event.target.elements.typeOfDrink.value
        console.log(event)

        const newBeverage = {
            beverage_name: beverageName,
            guest_name: guestName,
            quantity: parseInt(quantity),
            type_of_drink: typeOfDrink
        }

        console.log(newBeverage)

        await supabase.from("potluck_beverages").insert(newBeverage)


        // Refresh the meals list
        const response = await supabase.from("potluck_beverages").select()
        const data = response.data
        const error = response.error
        setBeverages(data)

        event.target.elements.beverageName.value = ""
        event.target.elements.guestName.value = ""
        event.target.elements.quantity.value = ""
        event.target.elements.typeOfDrink.value = ""
        if (error) {
            console.error('Insert failed:', error);
            // Show user-friendly error message
        } else {
            console.log('Beverages added successfully:', data);
            // Update UI to show success
        }
    }

    return (
        <>
            <h1>Potluck Beverages</h1>
            <ul>
                {beveragesDisplay}
                <button onClick={handleFetchBeverages}>Beverages</button>
            </ul>
            <div>
                <form onSubmit={handleAddBeverages}>
                    <label>
                        Beverages: <input type="text" name="beverageName" />
                    </label>
                    <br />
                    <label>
                        Guest: <input type="text" name="guestName" />
                    </label>
                    <br />
                    <label>
                        Quantity Size: <input type="number" name="quantity" />
                    </label>
                    <br />
                    <label>
                        Type of Drink: <select name="typeOfDrink" defaultValue="">
                            <option value="" disabled>Select a kind</option>
                            <option value="water">Water</option>
                            <option value="tea">Tea</option>
                            <option value="soda">Soda</option>
                            <option value="mocktail">Mocktail</option>
                            <option value="energy">Energy</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Add Beverages</button>
                </form>
            </div>
        </>
    );
}