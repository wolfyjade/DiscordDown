var DiscordStatusJSON = 'https://srhpyqt94yxb.statuspage.io/api/v2/incidents/unresolved.json'

function onload() {
  DiscordAPICheck();
  setInterval(() => DiscordAPICheck(), 30e3);
}

function DiscordAPICheck() {
  var text          = document.getElementById('text');
  var updates       = document.getElementById('updates');
  var updatestitle  = document.getElementById('newsTitle');
  text.innerHTML = "Warte mal, ich schaue mal kurz nach..."
  updates.innerHTML = "";
  updatestitle.innerHTML = "";
  fetch(DiscordStatusJSON, {mode: 'cors'})
  .then(resp=>resp.text())
  .then(text => {
    var json = JSON.parse(text);
    console.debug(json);
    var text          = document.getElementById('text');
    var updates       = document.getElementById('updates');
    var updatestitle  = document.getElementById('newsTitle');
    if(json.incidents.length > 0) {
      json.incidents[0].incident_updates.sort(function(a,b){
        return new Date(a.created_at) - new Date(b.created_at);
      });
      text.innerHTML = "Yep, Discord ist höchstwahrscheinlich down.";
      updatestitle.innerHTML = "Neuigkeiten";
      json.incidents[0].incident_updates.forEach(a => {
        updates.innerHTML += `- ${a.body}<br>`;
      });
    } else {
      text.innerHTML = "Nope, Discord sollte online sein.";
      updates.innerHTML = "";
      updatestitle.innerHTML = "";
    };
  }).catch((e) => {
    document.getElementById('text').innerHTML = "oopsie poopsie";
    document.getElementById('newsTitle').innerHTML = "Es ist ein Fehler aufgetreten.";
    document.getElementById('updates').innerHTML = `Der Fehler lautet:<br>${e}<br><br>Bitte melde ihn schnellstmöglich als GitHub-Issue auf der <a class="links" href="https://github.com/nightlyyyyy/DiscordDown">GitHub-Seite</a>.`;
  })
}