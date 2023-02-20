var path = document.querySelector('svg path');
console.log("svg path " + path.getTotalLength());

document.querySelector('button')?.addEventListener('click', async () => {
  await Tone.start()
  console.log('audio is ready')
})

document.getElementById("about")?.addEventListener('click', () => {
  let x = document.getElementById('aboutInC');
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
document.getElementById("howTo")?.addEventListener('click', () => {
  let x = document.getElementById('InC-howTo');
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});

document.getElementById("credits")?.addEventListener('click', () => {
  let x = document.getElementById('InC-credits');
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
document.getElementById("metronome")?.addEventListener('click', () => {
  let x = document.getElementById('metro');
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
document.getElementById("sounds")?.addEventListener('click', () => {
  let x = document.getElementById('sound-controls');
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
});
document.getElementById("unloop")?.addEventListener('click', () => {
  for(let i = 0; i < 53; i++){
    document.getElementById("loop_" + (i + 1)).checked = false;
    if(parts[i]){
      parts[i].loop = 1;
    }
  }
});


var parts = new Array(53);

var bpm = 138; // set the global tempo
document.getElementById("tempo-box").value = bpm;

//create a synth and connect it to the main output (your speakers)
const synth = new Array(16);
for (let i = 0; i < synth.length; i++) {
  synth[i] = new Tone.Synth().toDestination();
}

// create two monophonic synths
const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
const synthC = new Tone.AMSynth().toDestination();
const synthD = new Tone.AMSynth().toDestination();

//play a note every quarter-note
const loopA = new Tone.Loop(time => {
  synthA.triggerAttackRelease("C5", "16n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop(time => {
  synthB.triggerAttackRelease("C4", "16n", time);
}, "4n").start(0);

const loopC = new Tone.Loop(time => {
  synthC.triggerAttackRelease("C2", "8n", time);
  console.log(Tone.Transport.position);
}, "1m").start(0);

const loopD = new Tone.Loop(time => {
  synthD.triggerAttackRelease("C6", "16n", time);
}, "8n").start(0);
// the loops start when the Transport is started
//Tone.Transport.start()

//Metronome
let metroMute = "on"; // default is muted
synthA.volume.value = -96;
synthB.volume.value = -96;
synthC.volume.value = -96;
synthD.volume.value = -96;
console.log('metro muted')

let metroButton = document.getElementById("pulse");
metroButton.addEventListener('click', () => {
  switch (metroMute){
    case "on" : // unmute if "on"
      synthA.volume.value = 0;
      synthB.volume.value = 0;
      synthC.volume.value = 0;
      synthD.volume.value = 0;
      console.log('metro unmuted');
      metroMute = "off";
      metroButton.style.background = "#4caf50";
      metroButton.innerHTML = "Mute Metronome Pulse"
      break;
    case "off" : // kill if mute is off
      synthA.volume.value = -96;
      synthB.volume.value = -96;
      synthC.volume.value = -96;
      synthD.volume.value = -96;
      console.log('metro muted');
      metroMute = "on"; // flip
      metroButton.style.background = "#a8a8a8";
      metroButton.innerHTML = "Play Metronome Pulse"
          
  }
})


let tButton = document.getElementById("transport");
tButton.addEventListener('click', () => {
  switch(Tone.Transport.state){
    case "stopped" : 
      Tone.Transport.bpm.value = 138;
      Tone.Transport.start();
      console.log('starting transport');
      tButton.style.background='#4caf50';
      tButton.innerHTML = "Stop Transport";
      break;
    case "started" :
      Tone.Transport.stop();
      console.log('stopping transport');
      tButton.style.background='#a8a8a8';
      tButton.innerHTML = "Start Transport";
      break;
    default :
      Tone.Transport.start();
  }
  
})

let sync = "off";
let syncButton = document.getElementById("syncButton");
syncButton.addEventListener('click', () => {
  if (sync == "off"){
    sync = "on"; // turn on sync
    Tone.Transport.bpm.value = bpm * 1.05;
    document.getElementById("tempo-box").value = Tone.Transport.bpm.value;
    syncButton.innerHTML = "Synchronizing (tap when in sync)";
    syncButton.style.background = "#ffa033";
  } else {
    sync = "off";
    Tone.Transport.bpm.value = bpm;
    document.getElementById("tempo-box").value = Tone.Transport.bpm.value;
    syncButton.innerHTML = "Synchronize Metronomes";
    syncButton.style.background = "#a8a8a8";
  }
  
})
/*
let syncStatus = document.querySelector("input[name='sync']"); syncStatus.addEventListener('change', () => {
  if (syncStatus.checked) {
    Tone.Transport.bpm.value = bpm * 1.05;
    document.getElementById("tempo-box").value = Tone.Transport.bpm.value;
  } else {
    Tone.Transport.bpm.value = bpm;
    document.getElementById("tempo-box").value = Tone.Transport.bpm.value;
  }
  console.log(Tone.Transport.bpm.value)
})
*/



for (let i = 0; i < 53; i++) {
  // Find a <table> element with id="myTable":
  var table = document.getElementById("phraseTable");

  // Create an empty <tr> element and add it to the 1st position of the table:
  var row = table.insertRow(i);

  // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
  let cell1 = row.insertCell(0);
  let cell2 = row.insertCell(1);

  let btn = document.createElement('input');
  btn.type = "button";
  btn.id = "up8_" + (i + 1);
  btn.className = "octButton";
  btn.value = "8va";
  cell1.appendChild(btn);
  btn = document.createElement('input');
  btn.type = "button";
  btn.id = "dn8_" + (i + 1);
  btn.className = "octButton";
  btn.value = "8vb";
  cell1.appendChild(btn);
  let loopDiv = document.createElement('div');
  loopDiv.className = "loopDiv";
  loopDiv.style = "display: block;";
  let loopForm = document.createElement('form');
  let loopLabel = document.createElement('label');
  loopLabel.for = "loop_" + (i + 1);
  loopLabel.className = "loopLabel";
  //loopLabel.innerHTML = "Loop #" + (i+1);
  let loopInput = document.createElement('input');
  loopInput.id = "loop_" + (i + 1);
  loopInput.type = "checkbox";
  loopInput.className = "loopInput";
  let loopSpanT = document.getElementById('svgTemplate');
  let loopSpan = loopSpanT.cloneNode(true);
  loopSpan.id = "loopSpan_" + (i + 1);

  loopLabel.appendChild(loopInput);
  loopLabel.appendChild(loopSpan);
  loopForm.appendChild(loopLabel);
  loopDiv.appendChild(loopForm);
  cell1.appendChild(loopDiv);
  // Add score images to cell2:
  let img = document.createElement('img');
  img.src = "/images/Sco" + (i + 1) + ".png";
  img.id = "sco" + (i + 1);
  img.draggable = false;
  cell2.appendChild(img);
}
/** 
var btn = document.createElement('input');
btn.type = "button";
btn.id = "up8_" + (i + 1);
btn.className = "octButton";
btn.value = 8va;
td.appendChild(btn);
      <tr>
        <td>
          <button id="up8_12" class="octButton">8 va</button><br>
          <button id="dn8_12" class="octButton">8 vb</button><br>
        <td><img src="images/Sco12.png" id="sco12" draggable="false">
      </tr>

**/


// Attach actions to buttons
for (let i = 0; i < 53; i++) {
  let loop = document.getElementById("loop_" + (i + 1));
  loop.addEventListener('change', function() {
    if (this.checked) {
      console.log("looping #" + (i + 1));
      if(parts[i]) parts[i].loop = true;
    } else {
      console.log("stopping #" + (i + 1));
      if(parts[i]) parts[i].loop = 1;
    }
  });
  document.getElementById("sco" + (i + 1))?.addEventListener('mousedown', () => {
    if (Tone.Transport.state = "started") {
      if(parts[i]){
        //dispose of the part that's already playing
        parts[i].dispose();
      }
      parts[i] = sequence(i);
      if (parts[i]) parts[i].loop = true;
    } else console.log("start metronome first");
  });
  document.getElementById("sco" + (i + 1))?.addEventListener('mouseup', () => {
    if (loop.checked) { }
    else if (parts[i]) parts[i].loop = 1;
  });
  document.getElementById("sco" + (i + 1))?.addEventListener('mouseleave', () => {
    if (loop.checked) { }
    else if (parts[i]) parts[i].loop = 1;
  });

  document.getElementById("up8_" + (i + 1))?.addEventListener('click', () => {
    if (InC_phrases[i].octave < 3) InC_phrases[i].octave++;
  });

  document.getElementById("dn8_" + (i + 1))?.addEventListener('click', () => {
    if (InC_phrases[i].octave > -3) InC_phrases[i].octave--;
  });
}

function sequence(i) {

  if (Tone.Transport.state == "stopped") {
    console.log("start transport first");
    return;
  }
  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }
  t = times[0] + ":" + times[1] + ":" + times[2];

  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    //synth[i % synth.length].triggerAttackRelease(note.pitch, note.dur, time);
    synth[i % synth.length].triggerAttackRelease(Tone.Frequency(note.pitch).transpose(InC_phrases[i].octave * 12), note.dur, time);
  }), InC_phrases[i].sequence).start(t);
  part.loopEnd = InC_phrases[i].duration;

  return part;

}

