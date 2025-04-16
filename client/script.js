console.log("Script is loaded and running.");

//store the inputs in variables
const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
// const addedTask = document.getElementById("tasks");
const taskList = document.getElementById("taskItems");
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

      const newTask = document.createElement("li");
      newTask.innerText = data.text;

      console.log("New task text content:", newTask.textContent);

      taskList.appendChild(newTask);

      console.log("task added to list", taskList);

      input.value = ""; //clear input after successful send
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
});

//GET request to retieve data on page reload
async function displayTasks() {
  try {
    const response = await fetch("http://localhost:4000/todos");
    const data = await response.json(); //.json() parses the response from string to object
  } catch (error) {}
}
