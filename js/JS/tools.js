// List of available items for suggestions
const items = ["Course Catalog", "Academic Programs", "Library Resources", "Assignments", "Exams", "Student Handbook"];

const searchInput = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const tableRows = document.querySelectorAll("#fileTable tbody tr");

// Function to filter table rows
function filterTable(query) {
  const lowerQuery = query.toLowerCase();
  let found = false;

  tableRows.forEach(row => {
    const itemName = row.querySelector("td:nth-child(2)").innerText.toLowerCase();
    if (itemName.includes(lowerQuery)) {
      row.style.display = "";
      found = true;
    } else {
      row.style.display = "none";
    }
  });

  // If input empty, show all rows
  if (lowerQuery === "") {
    tableRows.forEach(row => row.style.display = "");
  }
}

// Show suggestions while typing
searchInput.addEventListener("input", function () {
  const query = this.value.toLowerCase();
  suggestions.innerHTML = "";

  if (query.length === 0) {
    suggestions.style.display = "none";
    filterTable(""); // Reset table
    return;
  }

  const filtered = items.filter(item => item.toLowerCase().includes(query));

  if (filtered.length === 0) {
    suggestions.style.display = "none";
    filterTable(query);
    return;
  }

  filtered.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    li.addEventListener("click", () => {
      searchInput.value = item;
      suggestions.style.display = "none";
      filterTable(item);
    });
    suggestions.appendChild(li);
  });

  suggestions.style.display = "block";
  filterTable(query);
});

// Hide suggestions if clicked outside
document.addEventListener("click", function (e) {
  if (e.target !== searchInput) {
    suggestions.style.display = "none";
  }
});
