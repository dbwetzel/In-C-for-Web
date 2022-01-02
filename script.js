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

document.querySelector("button[name='seq1']") ?.addEventListener('mousedown', () => {
  parts[0] = sequence(0);
  parts[0].loop = true;
});
document.querySelector("button[name='seq1']") ?.addEventListener('mouseup', () => {
  parts[0].loop = 1;
});
document.querySelector("button[name='seq1']") ?.addEventListener('mouseleave', () => {
  if (parts[0])
    parts[0].loop = 1;
});

document.querySelector("button[name='seq2']") ?.addEventListener('mousedown', () => {
  parts[1] = sequence(1);
  parts[1].loop = true;
});
document.querySelector("button[name='seq2']") ?.addEventListener('mouseup', () => {
  parts[1].loop = false;
});

document.querySelector("button[name='seq3']") ?.addEventListener('mousedown', () => {
  parts[2] = sequence(2); // play sequence 3
  parts[2].loop = true;
});
document.querySelector("button[name='seq3']") ?.addEventListener('mouseup', () => {
  parts[2].loop = false;
});

document.querySelector("button[name='seq4']") ?.addEventListener('mousedown', () => {
  parts[3] = sequence(3);
  parts[3].loop = true;
});
document.querySelector("button[name='seq4']") ?.addEventListener('mouseup', () => {
  parts[3].loop = false;
});

document.querySelector("button[name='seq5']") ?.addEventListener('mousedown', () => {
  parts[4] = sequence(4);
  parts[4].loop = true;
});
document.querySelector("button[name='seq5']") ?.addEventListener('mouseup', () => {
  parts[4].loop = false;
});

document.querySelector("button[name='seq6']") ?.addEventListener('mousedown', () => {
  parts[5] = sequence(5);
  parts[5].loop = true;
});
document.querySelector("button[name='seq6']") ?.addEventListener('mouseup', () => {
  parts[5].loop = false;
});

document.querySelector("button[name='seq7']") ?.addEventListener('mousedown', () => {
  parts[6] = sequence(6);
  parts[6].loop = true;
});
document.querySelector("button[name='seq7']") ?.addEventListener('mouseup', () => {
  parts[6].loop = false;
});

document.querySelector("button[name='seq8']") ?.addEventListener('mousedown', () => {
  parts[7] = sequence(7);
  parts[7].loop = true;
});
document.querySelector("button[name='seq8']") ?.addEventListener('mouseup', () => {
  parts[7].loop = false;
});

document.querySelector("button[name='seq9']") ?.addEventListener('mousedown', () => {
  parts[8] = sequence(8);
  parts[8].loop = true;
});
document.querySelector("button[name='seq9']") ?.addEventListener('mouseup', () => {
  parts[8].loop = false;
});

document.querySelector("button[name='seq10']") ?.addEventListener('mousedown', () => {
  parts[9] = sequence(9);
  parts[9].loop = true;
});
document.querySelector("button[name='seq10']") ?.addEventListener('mouseup', () => {
  parts[9].loop = false;
});

document.querySelector("button[name='seq11']") ?.addEventListener('mousedown', () => {
  parts[10] = sequence(10);
  parts[10].loop = true;
});
document.querySelector("button[name='seq11']") ?.addEventListener('mouseup', () => {
  parts[10].loop = false;
});

document.querySelector("button[name='seq12']") ?.addEventListener('mousedown', () => {
  parts[11] = sequence(11);
  parts[11].loop = true;
});
document.querySelector("button[name='seq12']") ?.addEventListener('mouseup', () => {
  parts[11].loop = false;
});

function sequence(i) {

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
    synth[i % synth.length].triggerAttackRelease(note.pitch, note.dur, time);
  }), phrase[i]).start(t);
  part.loopEnd = durations[i];

  return part;

}

