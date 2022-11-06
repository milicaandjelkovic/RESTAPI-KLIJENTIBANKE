function getClient() {
  let ID = document.getElementById("id_klijenta").value;
  let ime = document.getElementById("ime").value;
  let prezime = document.getElementById("prezime").value;
  let JMBG = document.getElementById("jmbg").value;
  let adresa = document.getElementById("adresa").value;
  let broj_telefona = document.getElementById("broj_telefona").value;
  let e_mail = document.getElementById("e_mail").value;
  let broj_racuna = document.getElementById("broj_racuna").value;
  let zaposlen = document.getElementById("zaposlen").value;
  let mobilna_app = document.getElementById("mobilna_app").value;
  let sms_usluga = document.getElementById("sms_usluga").value;
  let kategorija = document.getElementById("kategorija").value;
  let paket_racun = document.getElementById("paket_racun").value;

  return (client = {
    id_klijenta: ID,
    ime,
    prezime,
    JMBG,
    adresa,
    broj_telefona,
    e_mail,
    broj_racuna,
    zaposlen,
    mobilna_app,
    sms_usluga,
    kategorija,
    paket_racun,
  });
}

function formatRow(row) {
  let {
    _id,
    id_klijenta,
    ime,
    prezime,
    JMBG,
    adresa,
    broj_telefona,
    e_mail,
    broj_racuna,
    zaposlen,
    mobilna_app,
    sms_usluga,
    kategorija,
    paket_racun,
  } = row;
  return `
        <tr>
        <td id="id_klijenta${_id}">${id_klijenta}</td>
        <td id="ime${_id}">${ime}</td>
        <td id="prezime${_id}">${prezime}</td>
        <td id="jmbg${_id}">${JMBG}</td>
        <td id="adresa${_id}">${adresa}</td>
        <td id="broj_telefona${_id}">${broj_telefona}</td>
        <td id="e_mail${_id}">${e_mail}</td>
        <td id="broj_racuna${_id}">${broj_racuna}</td>
        <td id="zaposlen${_id}">${zaposlen}</td>
        <td id="mobilna_app${_id}">${mobilna_app}</td>
        <td id="sms_usluga${_id}">${sms_usluga}</td>
        <td id="kategorija${_id}">${kategorija}</td>
        <td id="paket_racun${_id}">${paket_racun}</td>
        <tr>
         `;
}

function post_create() {
  const client = getClient();

  fetch("http://127.0.0.1:3000/api/model", {
    method: "POST",
    body: JSON.stringify(client),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => alert(JSON.stringify(data)))
    .catch((err) => alert(err));
}

function get_all() {
  fetch("http://127.0.0.1:3000/api/model", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let tableBodyData = "";
      data.forEach((row) => {
        tableBodyData += formatRow(row);
      });

      document.getElementById("tblper").innerHTML = tableBodyData;

      const clientTable = document.getElementById("client_table");
      window.scrollTo(clientTable.offsetLeft, clientTable.offsetTop);
    })
    .catch((err) => alert(err));
}

function get_by_id() {
  let form_ID = document.getElementById("id_klijenta");
  let form_ime = document.getElementById("ime");
  let form_prezime = document.getElementById("prezime");
  let form_JMBG = document.getElementById("jmbg");
  let form_adresa = document.getElementById("adresa");
  let form_broj_telefona = document.getElementById("broj_telefona");
  let form_e_mail = document.getElementById("e_mail");
  let form_broj_racuna = document.getElementById("broj_racuna");
  let form_zaposlen = document.getElementById("zaposlen");
  let form_mobilna_app = document.getElementById("mobilna_app");
  let form_sms_usluga = document.getElementById("sms_usluga");
  let form_kategorija = document.getElementById("kategorija");
  let form_paket_racun = document.getElementById("paket_racun");

  fetch(`http://127.0.0.1:3000/api/model/${form_ID.value}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((err) => Promise.reject(err));
      }
    })
    .then((data) => {
      console.log(data);

      let {
        ime,
        prezime,
        JMBG,
        adresa,
        broj_telefona,
        e_mail,
        broj_racuna,
        zaposlen,
        mobilna_app,
        sms_usluga,
        kategorija,
        paket_racun,
      } = data[0];

      form_ime.value = ime;
      form_prezime.value = prezime;
      form_JMBG.value = JMBG;
      form_adresa.value = adresa;
      form_broj_telefona.value = broj_telefona;
      form_e_mail.value = e_mail;
      form_broj_racuna.value = broj_racuna;
      form_zaposlen.value = zaposlen;
      form_mobilna_app.value = mobilna_app;
      form_sms_usluga.value = sms_usluga;
      form_kategorija.value = kategorija;
      form_paket_racun.value = paket_racun;

      const infoHr = document.getElementById("info_hr");
      window.scrollTo(infoHr.offsetLeft, infoHr.offsetTop);
    })
    .catch((err) => alert(err.poruka));
}

function update_client() {
  let form_ID = document.getElementById("id_klijenta");
  const client = getClient();

  fetch(`http://127.0.0.1:3000/api/model/${form_ID.value}`, {
    method: "PUT",
    body: JSON.stringify(client),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => alert(data.poruka))
    .catch((err) => alert(err.poruka));
}

function delete_client() {
    let form_ID = document.getElementById("id_klijenta");
    const client = getClient();
  
    fetch(`http://127.0.0.1:3000/api/model/${form_ID.value}`, {
      method: "DELETE",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => alert(data.poruka))
      .catch((err) => alert(err.poruka));
}
