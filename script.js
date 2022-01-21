document.querySelector('button') ?.addEventListener('click', async () => {
  await Tone.start()
  console.log('audio is ready')
})

var phrase = [
  [{ time: 0, pitch: "C4", dur: "32n" }, { time: "0:0:0.3", pitch: "e4", dur: "4n" }, { time: "0:1:0", pitch: "c4", dur: "32n" }, { time: "0:1:0.3", pitch: "e4", dur: "4n" }, { time: "0:2:0", pitch: "C4", dur: "32n" }, { time: "0:2:0.3", pitch: "e4", dur: "4n" }], /** #1 */
  [{ time: 0, pitch: "C4", dur: "32n" }, { time: "0:0:0.3", pitch: "e4", dur: "8n" }, { time: "0:0:2", pitch: "f4", dur: "8n" }, { time: "0:1:0", pitch: "e4", dur: "4n" }], /** #2 */
  [{ time: "0:0:2", pitch: "e4", dur: "8n" }, { time: "0:1:0", pitch: "f4", dur: "8n" }, { time: "0:1:2", pitch: "e4", dur: "8n" }],/** #3 */
  [{ time: "0:0:2", pitch: "e4", dur: "8n" }, { time: "0:1:0", pitch: "f4", dur: "8n" }, { time: "0:1:2", pitch: "g4", dur: "8n" }], /** #4 */
  [{ time: 0, pitch: "e4", dur: "8n" }, { time: "0:0:2", pitch: "f4", dur: "8n" }, { time: "0:1:0", pitch: "g4", dur: "8n" }], /** #5 */
  [{ time: 0, pitch: "c5", dur: "2m" }], /** #6 */
  [{ time: "0:3:2", pitch: "c4", dur: "16n" }, { time: "0:3:3", pitch: "c4", dur: "16n" }, { time: "1:0:0", pitch: "c4", dur: "8n" }], /** #7 */
  [{ time: 0, pitch: "g4", dur: "1n." }, { time: "1:2:0", pitch: "f4", dur: "2m" }], /** #8 */
  [{ time: 0, pitch: "b4", dur: "16n" }, { time: "0:0:1", pitch: "g4", dur: "16n" }], /** #9 */
  [{ time: 0, pitch: "b4", dur: "16n" }, { time: "0:0:1", pitch: "g4", dur: "16n" }], /** #10 */
  [{ time: 0, pitch: "f4", dur: "16n" }, { time: "0:0:1", pitch: "g4", dur: "16n" }, { time: "0:0:2", pitch: "b4", dur: "16n" }, { time: "0:0:3", pitch: "g4", dur: "16n" }, { time: "0:1:0", pitch: "b4", dur: "16n" }, { time: "0:1:1", pitch: "g4", dur: "16n" }], /** #11 */
  [{ time: "0:0:0", pitch: "f4", dur: "8n" }, { time: "0:0:2", pitch: "g4", dur: "8n" }, { time: "0:1:0", pitch: "b4", dur: "1n" }, { time: "1:1:0", pitch: "c5", dur: "4n" }] /** #12 */
];
// durations of each sequence for looping purposes
var durations = ["2n.", "2n", "2n", "2n", "2n", "2m", "2m", "4m", "1m", "8n", "4n.", "1n."];

var octaves = new Array(53).fill(0); // keep track of transpositions

var parts = new Array(53);

var bpm = 138; // set the global tempo

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
let syncStatus = document.querySelector("input[name='sync']"); syncStatus.addEventListener('change', () => {
  if (syncStatus.checked) {
    Tone.Transport.bpm.value = bpm * 1.05;
  } else Tone.Transport.bpm.value = bpm;
  console.log(Tone.Transport.bpm.value)
})
document.querySelector("button[name='mute_metro']") ?.addEventListener('click', () => {
  synthA.volume.value = -96;
  synthB.volume.value = -96;
  synthC.volume.value = -96;
  synthD.volume.value = -96;
  console.log('metro muted')
})

document.querySelector("button[name='unmute_metro']") ?.addEventListener('click', () => {
  synthA.volume.value = 0;
  synthB.volume.value = 0;
  synthC.volume.value = 0;
  synthD.volume.value = 0;
  console.log('metro unmuted')
})

document.querySelector("button[name='metro']") ?.addEventListener('click', () => {
  Tone.Transport.bpm.value = 138
  Tone.Transport.start()
  console.log('starting transport')
})

document.querySelector("button[name='stop']") ?.addEventListener('click', () => {
  Tone.Transport.stop()
  console.log('stopping transport')
})

for (let i = 0; i < 12; i++) {
  document.getElementById("sco" + (i + 1)) ?.addEventListener('mousedown', () => {
    if (Tone.Transport.state = "started") {
      parts[i] = sequence(i);
      if(parts[i]) parts[i].loop = true;
    } else console.log("start metronome first");
  });
  document.getElementById("sco" + (i + 1)) ?.addEventListener('mouseup', () => {
    if (parts[i]) parts[i].loop = 1;
  });
  document.getElementById("sco" + (i + 1)) ?.addEventListener('mouseleave', () => {
    if (parts[i]) parts[i].loop = 1;
  });

  document.getElementById("up8_" + (i + 1)) ?.addEventListener('click', () => {
    if (octaves[i] < 3) octaves[i]++;
  });

  document.getElementById("dn8_" + (i + 1)) ?.addEventListener('click', () => {
    if (octaves[i] > -3) octaves[i]--;
  });
}

function sequence(i) {

  if(Tone.Transport.state == "stopped") {
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
    synth[i % synth.length].triggerAttackRelease(Tone.Frequency(note.pitch).transpose(octaves[i] * 12), note.dur, time);
  }), phrase[i]).start(t);
  part.loopEnd = durations[i];

  return part;

}

