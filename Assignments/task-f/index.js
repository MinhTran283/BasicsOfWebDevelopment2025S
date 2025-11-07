document.addEventListener('DOMContentLoaded', () => {
  const CHECK = '✅';
  const CROSS = '❌';

  const form = document.getElementById('addCourseForm');
  const tbody = document.querySelector('#timetable tbody');
  const courseInput = document.getElementById('courseName');

  const dayOrder = Array.from(
    document.querySelectorAll('#timetable thead th')
  ).slice(1).map(th => th.textContent.trim());

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = courseInput.value.trim();
    if (!name) return;

    const checkedDays = new Set(
      Array.from(form.querySelectorAll('input[name="day"]:checked'))
        .map(cb => cb.value)
    );

    const tr = document.createElement('tr');

    const nameTd = document.createElement('td');
    nameTd.textContent = name;
    tr.appendChild(nameTd);

    dayOrder.forEach(day => {
      const td = document.createElement('td');
      td.textContent = checkedDays.has(day) ? CHECK : CROSS;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
    form.reset();
    courseInput.focus();
  });
});
