//store the inputs in variables
const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const addedTask = document.getElementById("tasks");
//add event listeners and functions to send requests
//POST request
form.addEventListener("submit", async (e) => {
  e.preventDefault(); //prevent form refresh
  const task = input.value.trim(); //.trim removes white space
  if (task) {
    try {
      const response = await fetch("http://localhost:4000/post-todos", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: task }),
      });
      const data = await response.json();
      console.log("server response:", data);
      input.value = ""; //clear input after successful send
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
});

//GET request

//figure out how to dynamically display the tasks/update and delete
//figure out how to display responses and have them styled(DOM)
