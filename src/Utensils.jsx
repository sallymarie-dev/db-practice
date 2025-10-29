import { useState } from "react";
import supabase from "./utils/supabase";

export default function PotluckUtensils() {
    const [utensils, setUtensils] = useState([])

    async function handleFetchUtensils() {
        console.log("Fetching Utensils...")
        const result = await supabase.from("potluck_utensils").select();
        const data = result.data;
        console.log("Fetched data:", data);
        setUtensils(data);
    }

    const utensilsDisplay = [];
    for (let i = 0; i < utensils.length; i++) {
        utensilsDisplay.push(
            <li key={utensils[i].id}>
                {utensils[i].utensil_name} by {utensils[i].guest_name} quantity {utensils[i].quantity} ( {utensils[i].item_type} )
            </li>
        );
    }

    async function handleAddUtensils(event) {
        event.preventDefault();
        console.log("handle add beverage submitted")
        const beverageName = event.target.elements.beverageName.value
        const guestName = event.target.elements.guestName.value
        const quantity = event.target.elements.quantity.value
        const typeOfDrink = event.target.elements.itemType.value
        console.log(event)

        const newUtensil = {
            beverage_name: beverageName,
            guest_name: guestName,
            quantity: parseInt(quantity),
            item_Type: itemType
        }

        console.log(newUtensil)

        await supabase.from("potluck_utensils").insert(newUtensil)


        // Refresh the meals list
        const response = await supabase.from("potluck_utensils").select()
        const data = response.data
        const error = response.error
        setUtensils(data)

        event.target.elements.utensilName.value = ""
        event.target.elements.guestName.value = ""
        event.target.elements.quantity.value = ""
        event.target.elements.itemType.value = ""
        if (error) {
            console.error('Insert failed:', error);
            // Show user-friendly error message
        } else {
            console.log('Utensils added successfully:', data);
            // Update UI to show success
        }
    }

    return (
        <>
            <h1>Potluck Utensils</h1>
            <ul>
                {utensilsDisplay}
                <button onClick={handleFetchUtensils}>Utensils</button>
            </ul>
            <div>
                <form onSubmit={handleAddUtensils}>
                    <label>
                        Utensils: <input type="text" name="UtensilName" />
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
                        Item Type: <select name="itemType" defaultValue="">
                            <option value="" disabled>Select a kind</option>
                            <option value="fork">Fork</option>
                            <option value="spoon">Spoon</option>
                            <option value="dessert">Dessert </option>
                            <option value="steak">Steak Knife</option>
                            <option value="spork">Spork</option>
                        </select>
                    </label>
                    <br />
                    <button type="submit">Add Utensils</button>
                </form>
            </div>
        </>
    );
}