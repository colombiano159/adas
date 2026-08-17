/* UltraWrap Studio — multi-step quote experience */
(function () {
  'use strict';

  var form = document.querySelector('[data-quote-form]');
  if (!form) return;

  var steps = Array.prototype.slice.call(form.querySelectorAll('.quote-step'));
  var stepper = form.querySelectorAll('[data-stepper] li');
  var prevBtn = form.querySelector('[data-prev]');
  var nextBtn = form.querySelector('[data-next]');
  var submitBtn = form.querySelector('[data-submit]');
  var counter = form.querySelector('[data-step-count]');
  var errorMsg = form.querySelector('[data-form-error]');
  var current = 0;

  function render() {
    steps.forEach(function (s, i) { s.classList.toggle('is-active', i === current); });
    stepper.forEach(function (li, i) {
      li.classList.toggle('is-done', i < current);
      li.classList.toggle('is-active', i === current);
    });
    prevBtn.hidden = current === 0;
    var last = current === steps.length - 1;
    nextBtn.hidden = last;
    submitBtn.hidden = !last;
    counter.textContent = 'Step ' + (current + 1) + ' of ' + steps.length;
    errorMsg.classList.remove('is-visible');
  }

  function stepValid() {
    var fields = steps[current].querySelectorAll('input, select, textarea');
    var ok = true;
    fields.forEach(function (f) {
      // Radios: required is satisfied if any in the group is checked
      if (f.type === 'radio') {
        if (f.required) {
          var group = steps[current].querySelectorAll('input[name="' + f.name + '"]');
          var any = Array.prototype.some.call(group, function (r) { return r.checked; });
          if (!any) ok = false;
        }
        return;
      }
      if (!f.checkValidity()) {
        ok = false;
        f.setAttribute('aria-invalid', 'true');
      } else {
        f.removeAttribute('aria-invalid');
      }
    });
    return ok;
  }

  nextBtn.addEventListener('click', function () {
    if (!stepValid()) {
      errorMsg.classList.add('is-visible');
      var bad = steps[current].querySelector('[aria-invalid], input:invalid, select:invalid');
      if (bad) bad.focus();
      return;
    }
    if (current < steps.length - 1) {
      current++;
      render();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  prevBtn.addEventListener('click', function () {
    if (current > 0) {
      current--;
      render();
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  // Radio tiles: advance affordance — mark tile checked class for browsers without :has()
  form.addEventListener('change', function (e) {
    if (e.target.type === 'radio') {
      var group = form.querySelectorAll('input[name="' + e.target.name + '"]');
      group.forEach(function (r) {
        var tile = r.closest('.tile');
        if (tile) tile.classList.toggle('is-checked', r.checked);
      });
    }
  });

  // File drop areas: show chosen file names
  form.querySelectorAll('[data-drop]').forEach(function (drop) {
    var input = drop.querySelector('input[type="file"]');
    var list = drop.querySelector('[data-drop-list]');
    function refresh(files) {
      list.innerHTML = '';
      Array.prototype.forEach.call(files, function (f) {
        var li = document.createElement('li');
        li.textContent = f.name;
        list.appendChild(li);
      });
    }
    input.addEventListener('change', function () { refresh(input.files); });
    ['dragenter', 'dragover'].forEach(function (evt) {
      drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.add('is-drag'); });
    });
    ['dragleave', 'drop'].forEach(function (evt) {
      drop.addEventListener(evt, function (e) { e.preventDefault(); drop.classList.remove('is-drag'); });
    });
    drop.addEventListener('drop', function (e) {
      if (e.dataTransfer && e.dataTransfer.files.length) {
        input.files = e.dataTransfer.files;
        refresh(input.files);
      }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!stepValid()) {
      errorMsg.classList.add('is-visible');
      return;
    }
    // Demo mode: no backend connected yet. Wire [FORM_ENDPOINT] here (e.g. fetch POST
    // with FormData) before launch; the success panel below is shown either way.
    form.hidden = true;
    var ok = document.querySelector('[data-form-success]');
    if (ok) {
      ok.hidden = false;
      ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  render();
})();
