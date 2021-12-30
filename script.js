document.querySelector('button')?.addEventListener('click', async () => {
	await Tone.start()
	console.log('audio is ready')
})
//create a synth and connect it to the main output (your speakers)
const synth = new Tone.Synth().toDestination();
const synth1 = new Tone.Synth().toDestination();
const synth2 = new Tone.Synth().toDestination();

//play a middle 'C' for the duration of an 8th note
//synth.triggerAttackRelease("C4", "8n");

//Tone.Transport.loop = true;
//Tone.Transport.loopStart = "0:0:0";
//Tone.Transport.loopEnd = "4:0:0";

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
// ramp up to 800 bpm over 10 seconds
//Tone.Transport.bpm.rampTo(800, 10);
const chordEvent = new Tone.ToneEvent(((time, chord) => {
	// the chord as well as the exact time of the event
	// are passed in as arguments to the callback function
	synth.triggerAttackRelease(chord, 0.5, time);
}), ["D4", "E4", "F4"]);

document.querySelector("button[name='metro']")?.addEventListener('click',  () => {
  Tone.Transport.bpm.value = 132
	Tone.Transport.start()
	console.log('starting transport')
})

document.querySelector("button[name='stop']")?.addEventListener('click',  () => {
	Tone.Transport.stop()
	console.log('stopping transport')
})

document.querySelector("button[name='seq1']")?.addEventListener('click',  () => {
  let t = Tone.Transport.nextSubdivision("4n");

  sequence1();

})

document.querySelector("button[name='seq2']")?.addEventListener('click',  () => {
  let t = Tone.Transport.nextSubdivision("16n");
  console.log("next sub: " + t);

  let seq = new Tone.Sequence((time, note) => {
	  synth2.triggerAttackRelease(note, "8n", time);
	// subdivisions are given as subarrays
  }, ["c4", "c4", "c4", "c4", "c4", ["e4", "c4"], "c4", "c4"]).start();//["e4", "f4", "g4", "c4", "d4", ["e4", "f4"], "g4", "f4"]).start();
  seq.loop = 1;

})


document.querySelector("button[name='sched1']")?.addEventListener('click',  () => 
{
  
  let t = Tone.Transport.position;
  //let t = Tone.Transport.position;
  let times = t.split(':');
  times[2] = 0; // set to downbeat;
  times[1] = Number(times[1]) + 1; // move up to the next downbeat;
  if(times[1] > 3){
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

function sequence1 (t){
  const part = new Tone.Part(((time, note) => {
	  // the notes given as the second element in the array
	  // will be passed in as the second argument
    console.log("note: " + Tone.Transport.position);
	  synth1.triggerAttackRelease(note, "8n", time);
  }), 
  [[0, "C4"], ["0:1:2", "e4"], ["0:2", "g4"], ["0:3", "e4"], ["1:0:0", "C4"]]).start(t);

  part.loop = 1;
}