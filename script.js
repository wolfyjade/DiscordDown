var DiscordStatusJSON = 'https://srhpyqt94yxb.statuspage.io/api/v2/incidents/unresolved.json'

function onload() {
  DiscordAPICheck();
  setTimeout(() => DiscordAPICheck(), 120);
}

function DiscordAPICheck() {
  fetch(DiscordStatusJSON, {mode: 'cors'})
  .then(resp=>resp.text())
  .then(text => {
    var json = JSON.parse(text);
    console.debug(json);
    var text = document.getElementById('text');
    var updates = document.getElementById('updates');
    if(json.incidents.length > 0) {
      json.incidents[0].incident_updates.sort(function(a,b){
        return new Date(a.created_at) - new Date(b.created_at);
      });
      text.innerHTML = "Yep, Discord oder ein paar Teile davon sind down.";
      updates.innerHTML = "<h2>Neuigkeiten:</h2>"
      json.incidents[0].incident_updates.forEach(a => {
        updates.innerHTML += `- ${a.body}<br>`;
      });
    } else {
      text.innerHTML = "Das Discord-Team hat noch nichts gemeldet.";
    };
  }).catch((e) => {
    document.getElementById('text').innerHTML = "Wahrscheinlich ist die API down, oder der Code ist mal wieder kaputt gegangen weil nightly. ihn vernachlässigt hat...<hr>Hier ist der Fehler (ist nur zu Debugging-Zwecken dabei):<br>"+e;
  })
}