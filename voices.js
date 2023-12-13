var inC_Synths = ["AM Synth", "FM Synth", "Tone.Synth"];

var polySynth = new Tone.PolySynth(Tone.Synth).toDestination(); // polyphonic container synth

function progChange(prog){
  switch(prog){
    case "AM Synth":
      polySynth = new Tone.PolySynth(Tone.AMSynth).toDestination();
      break;
    case "FM Synth":
      polySynth = new Tone.PolySynth(Tone.FMSynth).toDestination();
      break;
    default:
      polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
  }
}

const synth1 = new Tone.PolySynth(Tone.Synth).toDestination();
let synth1_settings = {
	"volume": 0,
	"detune": 0,
	"portamento": 0.05,
	"envelope": {
		"attack": 0.05,
		"attackCurve": "exponential",
		"decay": 0.2,
		"decayCurve": "exponential",
		"release": 1.5,
		"releaseCurve": "exponential",
		"sustain": 0.2
	},
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "amtriangle",
		"harmonicity": 0.5,
		"modulationType": "sine"
	}
}
synth1.set(synth1_settings);

const synth2 = new Tone.PolySynth(Tone.AMSynth).toDestination();
let synth2_settings = {
	"volume": 0,
	"detune": 0,
	"portamento": 0,
	"harmonicity": 2.5,
	"oscillator": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "fatsawtooth",
		"count": 3,
		"spread": 20
	},
	"envelope": {
		"attack": 0.1,
		"attackCurve": "linear",
		"decay": 0.2,
		"decayCurve": "exponential",
		"release": 0.3,
		"releaseCurve": "exponential",
		"sustain": 0.2
	},
	"modulation": {
		"partialCount": 0,
		"partials": [],
		"phase": 0,
		"type": "square"
	},
	"modulationEnvelope": {
		"attack": 0.5,
		"attackCurve": "linear",
		"decay": 0.01,
		"decayCurve": "exponential",
		"release": 0.5,
		"releaseCurve": "exponential",
		"sustain": 1
	}
}
synth2.set(synth2_settings);