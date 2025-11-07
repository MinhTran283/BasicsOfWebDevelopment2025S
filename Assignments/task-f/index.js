document.addEventListener("DOMContentLoaded", () => {
  const CHECK = "✅";
  const CROSS = "❌";
  const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const form = document.getElementById("addCourseForm");
  const tbody = document.getElementById("timetable").querySelector("tbody");
  const courseInput = document.getElementById("courseName");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const courseName = courseInput.value.trim();
    if (!courseName) return;

    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked')).map(cb => cb.value)
    );

    const tr = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = courseName;
    tr.appendChild(nameTd);

    dayOrder.forEach((day) => {
      const td = document.createElement("td");
      td.textContent = checkedDays.has(day) ? CHECK : CROSS;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    form.reset();
    courseInput.focus();
  });
});
