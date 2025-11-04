(function () {
  const courseInput = document.querySelector('input[type="text"]');
  const dayChecks = Array.from(document.querySelectorAll('.days input[type="checkbox"]')).slice(0, 5);
  const tbody = document.querySelector('tbody');
  const buttons = document.querySelectorAll('button');
  const addBtn = buttons[0];
  const clearBtn = buttons[1];

  function addRow(e) {
    e.preventDefault();
    const name = courseInput.value.trim() || "New course";

    const tr = document.createElement("tr");

    const cells = [name, ...dayChecks.map(c => c.checked ? "✅" : "❌")];
    cells.forEach(text => {
      const td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  }

  function clearForm(e) {
    e.preventDefault();
    courseInput.value = "";
    dayChecks.forEach(c => c.checked = false);
  }

  addBtn.addEventListener('click', addRow);
  clearBtn.addEventListener('click', clearForm);
})();
