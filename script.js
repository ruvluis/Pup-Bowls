
const BASE_URL = "https://fsa-puppy-bowl.herokuapp.com";
const COHORT_NAME = "2302-acc-pt-web-pt-e";
const list = document.getElementById("puppies-list");
const addPuppyForm = document.getElementById("add-puppy-form");


async function getData() {
    try {
        const rawData = await fetch(`${BASE_URL}/api/${COHORT_NAME}/players`);
        const resultData = await rawData.json();
        return resultData.data.players;
    } catch (error) {
        console.error(error);
    }
}


async function displayPreloadedPuppies() {
    const puppies = await getData();

    // Loop through the pre-loaded puppies and display them
    puppies.forEach((puppy) => {
        const listItem = createPuppyListItem(puppy);
        list.appendChild(listItem);
    });
}

function createPuppyListItem(puppy) {
    const listItem = document.createElement("div");
    listItem.classList.add("puppy-item");


    const nameElement = document.createElement("h3");
    nameElement.textContent = `Name: ${puppy.name}`;

    const breedElement = document.createElement("p");
    breedElement.textContent = `Breed: ${puppy.breed}`;

    const imageElement = document.createElement("img");
    imageElement.src = puppy.imageUrl;
    imageElement.alt = puppy.name;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-button");

    // Append elements to the list item in the desired order
    listItem.appendChild(nameElement);
    listItem.appendChild(breedElement);
    listItem.appendChild(imageElement);
    listItem.appendChild(removeButton); // Add the "Remove" button at the bottom

    return listItem;
}


addPuppyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get user input from the form
    const name = document.getElementById("puppy-name").value;
    const breed = document.getElementById("puppy-breed").value;
    const imageUrl = document.getElementById("puppy-image-url").value;

    // Create a new puppy object with the user's input
    const newPuppy = {
        name,
        breed,
        imageUrl,
    };

 
    const listItem = createPuppyListItem(newPuppy);
    list.appendChild(listItem);

   
    addPuppyForm.reset();
});


displayPreloadedPuppies();


document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        // Find and remove the parent .puppy-item element
        const puppyItem = event.target.closest(".puppy-item");
        if (puppyItem) {
            puppyItem.remove();
        }
    }
});
