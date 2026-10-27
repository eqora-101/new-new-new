(function () {
  // Burger menu
  var btn = document.getElementById('bm'), menu = document.getElementById('menu');
  function toggle(open) {
    menu.classList.toggle('open', open);
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  }
  btn.addEventListener('click', function () { toggle(!menu.classList.contains('open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { toggle(false); }); });

  // Second copy of the logo
  document.querySelectorAll('.logo2').forEach(function (i) { i.src = document.querySelector('.brand img').src; });

  // Lead form: sends to office@bluebarnhomebuyers.com through FormSubmit
  var form = document.getElementById('f'), ok = document.getElementById('ok');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var submit = form.querySelector('.btn');
    submit.disabled = true;
    fetch('https://formsubmit.co/ajax/office@bluebarnhomebuyers.com', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d && (d.success === 'true' || d.success === true)) {
        submit.style.display = 'none'; ok.style.display = 'block'; form.reset();
      } else { throw new Error('send failed'); }
    }).catch(function () {
      form.submit(); // fallback: normal form post
    });
  });
})();
