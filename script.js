document.querySelector('button') ?.addEventListener('click', async () => {
  await Tone.start()
  console.log('audio is ready')
})

var phrase = [
  [[0, "C4"], ["0:1:2", "e4"], ["0:2", "g4"], ["0:3", "e4"], ["1:0:0", "C4"]],
  [[0, "C4"],["0:0:2", "e4"]],
  []
]

var seq12 = [{time: "0:0:0", pitch: "f4", dur: "8n"}, {time: "0:0:2", pitch: "g4", dur: "8n"}, {time: "0:1:0", pitch: "b4", dur: "1n"}, {time: "1:1:0", pitch: "c5", dur: "4n"}];

var bpm = 138; // set the global tempo

//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();
const synth3 = new Tone.Synth().toDestination();
const synth4 = new Tone.Synth().toDestination();

const part = new Tone.Part(((time, note) => {
  // the notes given as the second element in the array
  // will be passed in as the second argument
  synth.triggerAttackRelease(note, "8n", time);
}), [[0, "C4"], ["0:2", "e4"], ["0:3", "g4"]]);

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

const chordEvent = new Tone.ToneEvent(((time, chord) => {
  // the chord as well as the exact time of the event
  // are passed in as arguments to the callback function
  synth.triggerAttackRelease(chord, 0.5, time);
}), ["D4", "E4", "F4"]);

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

document.querySelector("button[name='seq1']") ?.addEventListener('click', () => {

  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }

  console.log("position: " + Tone.Transport.position);
  console.log("position (array): " + times);
  console.log("now: " + Tone.Transport.now());
  t = times[0] + ":" + times[1] + ":" + times[2];
  console.log("next sub: " + t);
  sequence1(t);

});

function sequence1(t) {
  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    console.log("note: " + Tone.Transport.position);
    synth1.triggerAttackRelease(note, "8n", time);
  }),
    [[0, "C4"], ["0:0:0.3", "e4"], ["0:1:0", "c4"], ["0:1:0.3", "e4"], ["0:2:0", "C4"], ["0:2:0.3", "e4"]]).start(t);

  //part.loop = 1;
}

document.querySelector("button[name='seq2']") ?.addEventListener('click', () => {

  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }

  console.log("position: " + Tone.Transport.position);
  console.log("position (array): " + times);
  console.log("now: " + Tone.Transport.now());
  t = times[0] + ":" + times[1] + ":" + times[2];
  console.log("next sub: " + t);
  sequence2(t);

});

function sequence2(t) {
  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    console.log("note: " + Tone.Transport.position);
    synth2.triggerAttackRelease(note, "8n", time);
  }),
    [[0, "C4"], ["0:0:0.3", "e4"], ["0:0:2", "f4"], ["0:1:0", "e4"]]).start(t);

  //part.loop = 1;
}

document.querySelector("button[name='seq3']") ?.addEventListener('click', () => {

  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }

  console.log("position: " + Tone.Transport.position);
  console.log("position (array): " + times);
  console.log("now: " + Tone.Transport.now());
  t = times[0] + ":" + times[1] + ":" + times[2];
  console.log("next sub: " + t);
  sequence3(t);

});

function sequence3(t) {
  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
//    console.log("note: " + Tone.Transport.position);
    console.log("note: " + note.pitch + " dur: " + note.dur);
    synth3.triggerAttackRelease(note.pitch, note.dur, time);
  }),[{time: "0:0:2", pitch: "e4", dur: "8n" }, {time: "0:1:0", pitch: "f4", dur: "8n"}, {time: "0:1:2", pitch: "e4", dur: "8n"}]).start(t);
  //part.loop = 1;
}

document.querySelector("button[name='seq4']") ?.addEventListener('click', () => {

  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }

//  console.log("position: " + Tone.Transport.position);
//  console.log("position (array): " + times);
//  console.log("now: " + Tone.Transport.now());
  t = times[0] + ":" + times[1] + ":" + times[2];
  console.log("next sub: " + t);
  sequence4(t);

});

function sequence4(t) {
  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    console.log("note: " + Tone.Transport.position);
    synth4.triggerAttackRelease(note, "8n", time);
  }),
    [["0:0:2", "e4"], ["0:1:0", "f4"], ["0:1:2", "g4"]]).start(t);

  //part.loop = 1;
}

document.querySelector("button[name='seq12']") ?.addEventListener('click', () => {

  let t = Tone.Transport.position;

  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if (times[1] > 3) {
    times[1] = 0;
    times[0] = Number(times[0]) + 1;
  }

//  console.log("position: " + Tone.Transport.position);
//  console.log("position (array): " + times);
//  console.log("now: " + Tone.Transport.now());
  t = times[0] + ":" + times[1] + ":" + times[2];
  console.log("next sub: " + t);
  sequence12(t);

});

function sequence12(t) {
  const part = new Tone.Part(((time, note) => {
    // the notes given as the second element in the array
    // will be passed in as the second argument
    console.log("note: " + Tone.Transport.position);
    synth4.triggerAttackRelease(note.pitch, note.dur, time);
  }),
    seq12).start(t);

  //part.loop = 1;
}
