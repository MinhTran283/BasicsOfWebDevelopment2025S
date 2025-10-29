// Author: Minh Tran
// Date: 2025-10-29

(function () {
  const $ = (sel) => document.querySelector(sel);

  const courseInput = $('#course');
  const checks = {
    mon: $('#mon'),
    tue: $('#tue'),
    wed: $('#wed'),
    thu: $('#thu'),
    fri: $('#fri')
  };
  const tbody = $('#table-body');
  const addBtn = $('#add-row');
  const clearBtn = $('#clear');

  const mark = (v) => (v ? '✅' : '❌');

  function addRow() {
    const name = (courseInput.value || 'New course').trim();
    const tr = document.createElement('tr');
    const cells = [
      name,
      mark(checks.mon.checked),
      mark(checks.tue.checked),
      mark(checks.wed.checked),
      mark(checks.thu.checked),
      mark(checks.fri.checked)
    ];
    cells.forEach((txt) => {
      const td = document.createElement('td');
      td.textContent = txt;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }

  function clearForm() {
    courseInput.value = '';
    Object.values(checks).forEach((c) => (c.checked = false));
    courseInput.focus();
  }

  addBtn.addEventListener('click', addRow);
  clearBtn.addEventListener('click', clearForm);
})();
