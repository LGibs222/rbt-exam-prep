// RBT module enhancements — applied examples, key terms, Quick Checks, and
// Categorize sort games per concept. Concept indices match modules.js.
//
// Quick Check schema:
//   quickCheck: { prompt, answer, hint? }
// Categorize schema:
//   categorize: { title, categories: [{id, label, color}], items: [{text, correct, explanation}] }
// Animated visual: animatedVisual: 'schedule_compare' | 'shaping_graph' | 'extinction_burst'

export const MODULE_ENHANCEMENTS = {

  "Data Collection and Graphing": [
    {
      // concept[0]: Choosing the Right Measurement Procedure
      keyTerms: [
        { term: "Frequency/event recording", def: "Counting each discrete occurrence of behavior with clear onset and offset." },
        { term: "Duration recording", def: "Measuring how long behavior lasts from onset to offset." },
        { term: "Latency", def: "Time from antecedent or instruction to behavior onset." },
        { term: "Inter-response time (IRT)", def: "Time between consecutive instances of the same behavior." },
      ],
      quickCheck: {
        prompt: "An RBT is asked to track how quickly a student starts working after the teacher gives the instruction. Which procedure fits best, and why?",
        answer: "Latency recording. Latency measures the time from a stimulus (the instruction) to the onset of the response (starting the work). Frequency just counts occurrences; duration measures total time engaged.",
        hint: "Look for which procedure measures the time BETWEEN the instruction and the response, not the response itself."
      },
      categorize: {
        title: "Match each scenario to the most appropriate measurement procedure.",
        categories: [
          { id: 'frequency', label: 'Frequency / Event', color: '#16a34a' },
          { id: 'duration',  label: 'Duration',          color: '#2563eb' },
          { id: 'latency',   label: 'Latency',           color: '#7c3aed' },
          { id: 'irt',       label: 'Inter-response Time', color: '#dc2626' },
        ],
        items: [
          {
            text: "Tracking how many times a student calls out during a 30-min class.",
            correct: 'frequency',
            explanation: "Calling out is discrete with clear onset/offset — count occurrences.",
          },
          {
            text: "Measuring how long a tantrum lasts from onset to recovery.",
            correct: 'duration',
            explanation: "Duration captures how long the behavior is occurring — important for variable-length episodes.",
          },
          {
            text: "Measuring the time between when the teacher says 'Begin' and when the student picks up the pencil.",
            correct: 'latency',
            explanation: "Latency = time from a specific antecedent (instruction) to the onset of the target response.",
          },
          {
            text: "Measuring the time between consecutive correct math problems to assess pacing.",
            correct: 'irt',
            explanation: "Inter-response time tracks the gap BETWEEN responses, not from an antecedent.",
          },
          {
            text: "Counting episodes of self-injury during a session.",
            correct: 'frequency',
            explanation: "Discrete behaviors with countable occurrences fit frequency/event recording.",
          },
          {
            text: "Tracking how long a child remains on-task before getting up from their seat.",
            correct: 'duration',
            explanation: "On-task is a continuous state — duration captures total engagement time.",
          },
        ],
      },
    },
    {
      // concept[1]: Discontinuous Measurement: Bias and When to Use Each Method
      keyTerms: [
        { term: "Partial interval", def: "Score interval positive if behavior occurs at ANY point — overestimates." },
        { term: "Whole interval", def: "Score interval positive only if behavior occurs ENTIRE interval — underestimates." },
        { term: "Momentary time sampling (MTS)", def: "Check at the exact moment of each interval cue — least biased." },
      ],
      quickCheck: {
        prompt: "If your data using whole-interval recording shows 40% intervals positive, what should you assume about the TRUE rate of behavior?",
        answer: "The true occurrence is HIGHER than 40%. Whole interval underestimates because it requires the behavior to occur for the entire interval — short or interrupted occurrences score as zero.",
        hint: "Whole interval has a directional bias — does it run high or low compared to true rate?"
      },
      animatedVisual: "extinction_burst",
    },
    {
      // concept[2]: Graphing and Visual Analysis
      keyTerms: [
        { term: "Level", def: "Mean height/value of data within a phase." },
        { term: "Trend", def: "Direction and rate of change in data over time." },
        { term: "Variability", def: "Scatter or spread of data points around the trend line." },
        { term: "Phase change line", def: "Vertical dashed line separating experimental conditions on a graph." },
      ],
      quickCheck: {
        prompt: "After 2 weeks of intervention, the data look about the same as baseline visually. What three properties should an RBT look for to determine if change is occurring?",
        answer: "Level (mean of the data), trend (direction over time), and variability (scatter). Sometimes intervention reduces variability or stabilizes a worsening trend even when the average looks similar — visual analysis catches this.",
        hint: "Three Vs of visual analysis."
      }
    },
    {
      // concept[3]: Data Accuracy and Professional Obligations
      keyTerms: [
        { term: "Data fabrication", def: "Reporting data that wasn't actually collected — ethics violation." },
        { term: "Treatment integrity", def: "Degree to which procedures are implemented as designed." },
      ],
      quickCheck: {
        prompt: "An RBT realizes they forgot to collect data for the second half of a session. What should they do, and what should they NOT do?",
        answer: "DO: document what was actually observed for the part of the session that was tracked, note the gap, and notify the supervisor immediately. DO NOT: estimate, fabricate, or 'fill in' the missing data — that's an ethics violation that can lead to incorrect clinical decisions.",
        hint: "Honesty about a gap is always preferable to plausible-looking fake data."
      }
    },
  ],

  "Behavior Assessment": [
    {
      // concept[0]: Preference Assessments
      keyTerms: [
        { term: "Free operant", def: "Observe approach/engagement with freely available items — no choices forced." },
        { term: "Single stimulus", def: "Present one item at a time and record approach/engagement." },
        { term: "Paired stimulus (forced choice)", def: "Two items at a time; client picks one. Yields ranked hierarchy." },
        { term: "MSWO", def: "Multiple-stimulus-without-replacement: present array, remove selected, re-present remaining." },
      ],
      quickCheck: {
        prompt: "A child consistently selects the iPad in a paired-stimulus assessment. The RBT then uses the iPad as a reinforcer for compliance, but compliance doesn't increase. What's the likely problem and what's the next step?",
        answer: "Preference does NOT equal reinforcing function. The iPad is preferred but isn't currently functioning as a reinforcer — likely because the client has free access to it at home (satiation). Next step: report to the BCBA, who can run a REINFORCER ASSESSMENT (deliver iPad contingent on the target response and check whether response rate increases). If satiated, restrict pre-session access or rotate reinforcers.",
        hint: "Liking it and being motivated to work for it are two different things."
      },
    },
    {
      // concept[1]: Functions of Behavior
      keyTerms: [
        { term: "Attention (positive social)", def: "Behavior maintained by social attention from others." },
        { term: "Escape (negative reinforcement)", def: "Behavior maintained by removal/avoidance of demands or aversive events." },
        { term: "Tangible (positive reinforcement)", def: "Behavior maintained by access to specific items or activities." },
        { term: "Automatic", def: "Behavior maintained by sensory consequences produced by the behavior itself." },
      ],
      quickCheck: {
        prompt: "An RBT observes that a child engages in head-banging at high rates whether peers are present, demands are presented, OR the child is alone. Which function does this pattern most strongly suggest, and what should the RBT do?",
        answer: "AUTOMATIC reinforcement is most likely — the behavior occurs even when no social consequences are available (alone). Social functions (attention/escape/tangible) typically show condition-specific elevation, not equal rates everywhere. RBT action: report observations factually to the BCBA. The RBT does NOT independently conclude 'automatic' or design treatment — that's the BCBA's call. Continue collecting ABC data as directed.",
        hint: "What does behavior occurring during the ALONE condition tell you about who's reinforcing it?"
      },
      categorize: {
        title: "Match each scenario to the behavioral function it most likely demonstrates.",
        categories: [
          { id: 'attn',     label: 'Attention',          color: '#7c3aed' },
          { id: 'escape',   label: 'Escape',             color: '#dc2626' },
          { id: 'tangible', label: 'Tangible',           color: '#16a34a' },
          { id: 'auto',     label: 'Automatic',          color: '#2563eb' },
        ],
        items: [
          { text: "Tantrums begin every time math worksheets are handed out and stop the moment the worksheets are removed.", correct: 'escape', explanation: "Behavior reliably terminates the demand → escape function." },
          { text: "Hand-flapping continues at the same rate whether peers are present or the client is alone in a room.", correct: 'auto', explanation: "Persistence in the alone condition strongly suggests automatic reinforcement." },
          { text: "Disruption increases when the teacher is occupied with another student and stops once the teacher comes over.", correct: 'attn', explanation: "Behavior produces the teacher's attention → social-positive reinforcement (attention)." },
          { text: "Crying begins when the iPad is taken away and stops when the iPad is returned.", correct: 'tangible', explanation: "Behavior produces access to the item → tangible function." },
          { text: "Whining occurs when the parent is on the phone and stops when the parent hangs up to engage with the child.", correct: 'attn', explanation: "Lack of attention evokes; attention reinforces." },
          { text: "The client repeats the same vocalization for hours during free play, even with no one in the room.", correct: 'auto', explanation: "Sensory product of the behavior itself maintains it — automatic reinforcement." },
        ],
      },
    },
    {
      // concept[2]: ABC Data Collection
      keyTerms: [
        { term: "Antecedent", def: "Observable event that occurred immediately BEFORE the behavior." },
        { term: "Consequence", def: "Observable event that occurred immediately AFTER the behavior." },
        { term: "Observable language", def: "Description in terms of physical actions and events, not internal states." },
      ],
      quickCheck: {
        prompt: "An RBT writes 'Antecedent: client was frustrated.' Why is this incorrect, and what would a correct ABC entry look like?",
        answer: "'Frustrated' is an INFERENCE about an internal state — not observable. Correct ABC entries use observable, measurable language. Example: 'Antecedent: math worksheet placed on desk; Behavior: client pushed worksheet off desk and yelled \"no\"; Consequence: worksheet removed by RBT.' The BCBA can analyze function from observable events; they can't analyze 'frustrated.'",
        hint: "Frustration isn't something you can SEE. What was actually visible in the environment?"
      },
    },
    {
      // concept[3]: RBT's Role in Functional Assessment
      keyTerms: [
        { term: "RBT scope (assessment)", def: "Implement assessment procedures as directed; collect data; report observations." },
        { term: "BCBA scope (assessment)", def: "Design assessments, interpret data, draw conclusions about function." },
      ],
      quickCheck: {
        prompt: "An RBT consistently sees that a client's aggression peaks during transitions between activities. What's the appropriate response — and what would be OUT of scope?",
        answer: "APPROPRIATE: report the observation to the BCBA factually ('aggression peaked during 8 of 10 transitions in the last 2 weeks'). Continue collecting ABC data as directed. OUT OF SCOPE: independently concluding 'transition is the trigger,' implementing transition warnings or new antecedent strategies, modifying the BIP. Even when the pattern seems obvious, function determination and treatment design are BCBA responsibilities. RBT role is observation + accurate reporting + faithful implementation.",
        hint: "RBTs can OBSERVE patterns. What's the line they don't cross?"
      },
    },
  ],

  "Behavior Acquisition": [
    {
      // concept[0]: DTT vs Naturalistic Teaching
      keyTerms: [
        { term: "DTT", def: "Discrete Trial Teaching — structured: SD, response, consequence, ITI; massed trials." },
        { term: "NET / Naturalistic", def: "Embedded in natural activities; client motivation drives the trial; reinforcer is naturally related." },
        { term: "Inter-trial interval (ITI)", def: "Brief pause between DTT trials; allows the learner to discriminate one trial from the next." },
      ],
      quickCheck: {
        prompt: "Which teaching format is generally better for built-in generalization, and why?",
        answer: "NATURALISTIC TEACHING (NET / incidental teaching). Because instruction occurs in the natural environment using natural reinforcers, the response is already under stimulus control of real-world cues. DTT requires a separate generalization plan because it trains the response under tightly controlled conditions that may not match daily life. (Note: many programs combine both — DTT for initial acquisition, NET for generalization and fluency.)",
        hint: "Which one is most similar to where the skill needs to live in real life?"
      },
    },
    {
      // concept[1]: Prompt Hierarchies
      keyTerms: [
        { term: "Most-to-least (MTL)", def: "Start with most intrusive prompt (e.g., full physical), fade systematically — errorless." },
        { term: "Least-to-most (LTM)", def: "Start with least intrusive prompt; escalate only when needed — allows errors." },
        { term: "Time delay", def: "Insert a wait period before delivering a prompt — promotes independent responding." },
        { term: "Prompt dependency", def: "Behavior under prompt control rather than the natural SD." },
      ],
      animatedVisual: "shaping_graph",
      quickCheck: {
        prompt: "An RBT has been delivering full-physical prompting for hand-washing for 3 months and the learner still won't initiate without it. What does this likely indicate, and what's the appropriate RBT response?",
        answer: "PROMPT DEPENDENCY — the prompt has become an SD for the behavior, replacing natural cues. RBT response: report to the supervising BCBA. The BCBA may decide to switch to a fading procedure (progressive time delay, prompt fading) or shift hierarchies (MTL → LTM). The RBT does NOT independently change the prompting strategy — that's a treatment modification.",
        hint: "Three months of the same prompt level without independence is a flag. The fix is a clinical decision."
      },
    },
    {
      // concept[2]: Chaining
      keyTerms: [
        { term: "Forward chaining", def: "Teach step 1 first, then step 2, etc.; remaining steps prompted." },
        { term: "Backward chaining", def: "Teach the LAST step first; client always finishes the chain." },
        { term: "Total task", def: "Attempt all steps every session with prompts as needed." },
      ],
      quickCheck: {
        prompt: "A learner gets discouraged easily and gives up partway through complex tasks. Which chaining method is best for this learner profile, and why?",
        answer: "BACKWARD CHAINING. The learner experiences task COMPLETION every session (the last step is the one being taught — they always finish and get the natural reinforcer). Forward chaining would have them stop partway, which works against their motivation profile. Total task could work if prompts are well-managed but doesn't have the same motivational advantage as backward chaining for this learner.",
        hint: "Which method ensures the learner experiences task completion every session?"
      },
    },
    {
      // concept[3]: Verbal Behavior
      keyTerms: [
        { term: "Mand", def: "Request; controlled by an MO; reinforced by the specific item or action requested." },
        { term: "Tact", def: "Label; controlled by a nonverbal stimulus; reinforced by generalized social attention." },
        { term: "Intraverbal", def: "Verbal-to-verbal response that doesn't match the antecedent (e.g., answering a question)." },
        { term: "Echoic", def: "Vocal response with point-to-point correspondence to a verbal model." },
      ],
      quickCheck: {
        prompt: "A child sees a dog and says 'dog.' The teacher says, 'A dog says...?' and the child answers 'Woof.' Identify the verbal operants in each step.",
        answer: "Step 1: 'dog' said in the presence of an actual dog = TACT (controlled by nonverbal stimulus, reinforced by social attention/praise). Step 2: 'Woof' as an answer to a verbal question with no nonverbal stimulus matching the answer = INTRAVERBAL (verbal-verbal, no point-to-point match). Mands would require a motivating operation; echoics require point-to-point match (e.g., teacher says 'dog,' learner says 'dog').",
        hint: "Tact = label something present. Intraverbal = answer a verbal question. The trigger differs."
      },
      categorize: {
        title: "Sort each utterance into the correct verbal operant.",
        categories: [
          { id: 'mand',  label: 'Mand',       color: '#dc2626' },
          { id: 'tact',  label: 'Tact',       color: '#2563eb' },
          { id: 'intra', label: 'Intraverbal', short: 'Intra', color: '#7c3aed' },
          { id: 'echo',  label: 'Echoic',     color: '#16a34a' },
        ],
        items: [
          { text: "Hungry child sees no food and says 'cookie' to a parent.", correct: 'mand', explanation: "MO (hunger) + request for a specific item = mand." },
          { text: "Child sees a fire truck pass and says 'truck.'", correct: 'tact', explanation: "Label of a present nonverbal stimulus → tact." },
          { text: "Teacher asks 'What do you eat for breakfast?' Child says 'Cereal.'", correct: 'intra', explanation: "Verbal-verbal with no point-to-point match = intraverbal." },
          { text: "Adult says 'Say dog.' Child says 'Dog.'", correct: 'echo', explanation: "Point-to-point correspondence with vocal model = echoic." },
          { text: "Child wanting iPad signs ICE-CREAM (despite seeing none) and is given the iPad.", correct: 'mand', explanation: "MO-driven request — even if iconic, it's a mand because it's reinforced by the specific item." },
          { text: "Adult: 'Cats and ___?' Child: 'Dogs.'", correct: 'intra', explanation: "Verbal antecedent, verbal response, no point-to-point match → intraverbal (fill-in)." },
        ],
      },
    },
  ],

  "Behavior Reduction": [
    {
      // concept[0]: Function-Based Behavior Reduction
      keyTerms: [
        { term: "Function-matched", def: "Procedure targets the specific maintaining reinforcer (escape, attention, etc.)." },
        { term: "Function mismatch", def: "Procedure addresses a different reinforcer than the one maintaining the behavior." },
        { term: "Escape extinction", def: "Maintain the demand regardless of problem behavior — for escape-maintained behavior." },
      ],
      quickCheck: {
        prompt: "An RBT is told to use 'planned ignoring' for a child whose tantrums occur during demands. After 2 weeks, tantrums have intensified. What's likely going on?",
        answer: "FUNCTION MISMATCH. Planned ignoring withholds attention — but if the tantrum is maintained by ESCAPE from demands, ignoring doesn't terminate the demand. The behavior may continue producing escape (peer reactions, eventual demand removal), and the lean attention schedule can intensify it. RBT action: report observations to the BCBA. They will likely re-examine function and switch to escape extinction + FCT for break requests.",
        hint: "When ignoring makes things worse, the behavior is usually NOT attention-maintained."
      },
    },
    {
      // concept[1]: Differential Reinforcement
      keyTerms: [
        { term: "DRO", def: "Reinforce ABSENCE of the target behavior during defined intervals." },
        { term: "DRI", def: "Reinforce a behavior physically incompatible with the target." },
        { term: "DRA", def: "Reinforce a functionally equivalent alternative (often FCT)." },
        { term: "DRL", def: "Reinforce target behavior only when rate is at or below criterion." },
      ],
      quickCheck: {
        prompt: "An RBT runs DRO with 5-minute intervals: 'If no aggression occurs in 5 minutes, deliver praise + token.' Aggression occurs at minute 4:50 most intervals — barely any tokens are earned. What's probably wrong, and what would the BCBA likely change?",
        answer: "The DRO interval is too LONG relative to the current rate of behavior. The learner can't access reinforcement before the behavior occurs, so the procedure isn't actually contacting reinforcement. Likely BCBA change: shorten the interval (e.g., 1 min) so the learner can earn reinforcement, then systematically lengthen as the behavior decreases. RBTs implement the change as written — the interval choice is a clinical decision, not an RBT modification.",
        hint: "Look at the math — if behavior occurs every ~5 min and the DRO interval is 5 min, when does reinforcement ever happen?"
      },
    },
    {
      // concept[2]: Extinction
      keyTerms: [
        { term: "Extinction burst", def: "Temporary increase in frequency, intensity, or topography when extinction begins." },
        { term: "Spontaneous recovery", def: "Brief return of extinguished behavior after a period of suppression — does NOT mean treatment failure." },
        { term: "Consistency", def: "Extinction must be implemented uniformly across all people and settings; inconsistent extinction WORSENS resistance." },
      ],
      animatedVisual: "extinction_burst",
      quickCheck: {
        prompt: "Extinction has been in place for 10 days; behavior is near zero. Suddenly today, the behavior recurs at high rate. What's this most likely called, and what should the RBT do?",
        answer: "SPONTANEOUS RECOVERY — a brief return of extinguished behavior that occurs after a period of suppression. It does NOT mean extinction is failing. RBT action: continue extinction (do NOT deliver the reinforcer), document the event, report to the supervising BCBA. Reversing course now would intermittently reinforce the recovered behavior and make extinction much harder.",
        hint: "Two named extinction phenomena: bursts happen at the START, recoveries happen LATER."
      },
    },
    {
      // concept[3]: Crisis Procedures and Safety
      keyTerms: [
        { term: "Trained protocols only", def: "RBTs implement only crisis procedures they have been specifically trained and authorized to use." },
        { term: "Incident report", def: "Documentation completed immediately after any use of crisis procedures or physical management." },
        { term: "Safety priority", def: "Safety overrides clinical procedures during a genuine crisis (e.g., pause extinction)." },
      ],
      quickCheck: {
        prompt: "During an extinction-burst tantrum, the client begins to bite themselves at a rate that draws blood. The BIP doesn't address self-injury. What's the right move?",
        answer: "SAFETY OVERRIDES the clinical procedure. Pause extinction; ensure safety using only TRAINED crisis procedures. Pausing during a genuine safety event is NOT extinction failure. After the event: complete an incident report immediately and notify the supervising BCBA — the BIP needs revision to address self-injury (which is now a clinical priority). RBTs do NOT improvise restraints or implement procedures they weren't trained on.",
        hint: "Two principles compete — what overrides what?"
      },
    },
  ],

  "Documentation and Reporting": [
    {
      // concept[0]: Objective Session Documentation
      keyTerms: [
        { term: "Observable language", def: "Documentation describes physical events and actions, not internal states." },
        { term: "Measurable terms", def: "Include frequency, duration, percent, latency — actual data, not impressions." },
        { term: "Causal attribution", def: "AVOID — 'because she was tired' is interpretation, not observation." },
      ],
      quickCheck: {
        prompt: "Which session-note entry is professionally acceptable, and why? (a) 'Client was frustrated all session.' (b) 'Client engaged in 8 instances of work-refusal during 30-min math block; refused 6 of 10 demand opportunities.'",
        answer: "(b) is acceptable. It's observable, measurable, and includes specific data (8 instances, 30-min duration, 6/10 demand opportunities). (a) is unacceptable — 'frustrated' is an inference about internal state, not observable. It can't be tested or used for clinical decision-making and creates legal/regulatory liability.",
        hint: "If a third party reading the note couldn't reproduce what was seen, the note is too subjective."
      },
      categorize: {
        title: "Sort each session-note phrase into 'professionally acceptable' or 'rewrite needed.'",
        categories: [
          { id: 'ok',  label: 'Acceptable',     short: '✓', color: '#16a34a' },
          { id: 'no',  label: 'Rewrite needed', short: '✗', color: '#dc2626' },
        ],
        items: [
          { text: "'Engaged in 12 instances of hand-flapping over 45 min.'", correct: 'ok', explanation: "Observable, measurable — solid documentation." },
          { text: "'Client was clearly upset throughout the session.'", correct: 'no', explanation: "'Upset' is an inference about internal state. Replace with observable behavior." },
          { text: "'Met criterion on 4 of 5 mand targets, accuracy 80%.'", correct: 'ok', explanation: "Specific data tied to defined criterion — exemplary documentation." },
          { text: "'Implemented escape extinction during 6 demand opportunities; client emitted 3 work-refusals lasting 12, 8, and 5 sec.'", correct: 'ok', explanation: "Names the procedure, counts opportunities, and documents observable durations." },
          { text: "'Had a meltdown because she was tired.'", correct: 'no', explanation: "Diagnostic label + causal attribution — both inferences. Rewrite with observable behavior." },
          { text: "'Did much better than last session.'", correct: 'no', explanation: "No data, comparative interpretation — not professional documentation." },
        ],
      },
    },
    {
      // concept[1]: Reporting to Supervisors
      keyTerms: [
        { term: "Timely reporting", def: "Communicate clinically significant events promptly — not at next scheduled supervision." },
        { term: "Significant events", def: "Includes new behaviors, sudden increases, suspected abuse, medication changes, safety concerns, data inconsistencies." },
      ],
      quickCheck: {
        prompt: "An RBT notices a 3x increase in self-injury starting two weeks ago. Their supervision is biweekly, with the next meeting in 5 days. What's the appropriate timing for reporting?",
        answer: "REPORT IMMEDIATELY — do not wait 5 days for the scheduled meeting. A 3x increase in self-injury is a clinically significant event that may require immediate intervention modification. Sit on it = 5 more sessions of potentially harmful or ineffective treatment without oversight. Send a same-day message/email to the BCBA with the data.",
        hint: "Some events are scheduled-meeting topics. Others are 'pick up the phone now.'"
      },
    },
    {
      // concept[2]: Confidentiality
      keyTerms: [
        { term: "HIPAA", def: "Federal law protecting client health information." },
        { term: "Need-to-know", def: "Share only with treatment team members, only what's necessary for care." },
        { term: "Mandated reporting exception", def: "Suspected abuse/neglect supersedes confidentiality." },
      ],
      quickCheck: {
        prompt: "A previous teacher of the client emails the RBT asking 'How is she doing?' What's the appropriate response?",
        answer: "Don't share clinical information. The previous teacher is no longer on the active treatment team and isn't authorized for client information without a current signed release. Polite, scope-aware response: 'Thank you for checking in. For privacy reasons I can't share clinical information; please reach out to her current school team or family directly.' Then notify the supervising BCBA of the contact attempt.",
        hint: "Authorization > friendliness. Even well-intentioned sharing can violate HIPAA."
      },
    },
    {
      // concept[3]: Scope of Practice in Documentation
      keyTerms: [
        { term: "Document data + observations", def: "Always RBT scope." },
        { term: "Document interpretations", def: "Generally NOT RBT scope — that's BCBA work." },
        { term: "Falsification of records", def: "Signing for sessions you didn't attend; grounds for BACB disciplinary action." },
      ],
      quickCheck: {
        prompt: "A coworker asks the RBT to sign their session note from yesterday because the coworker forgot. The session went fine. Is this acceptable? Why or why not?",
        answer: "ABSOLUTELY NOT. Signing a session note for a session you did not attend is FALSIFICATION OF RECORDS — a clear ethics violation, grounds for BACB disciplinary action, and potentially insurance fraud. 'It went fine' doesn't matter; the certification on the note is that YOU were there and observed what's documented. Refuse the request and report the coworker's request to the supervisor.",
        hint: "This isn't a gray area. There's exactly one right answer."
      },
    },
  ],

  "Ethics": [
    {
      // concept[0]: RBT Scope of Practice
      keyTerms: [
        { term: "Implement, not design", def: "RBTs deliver programs designed by a BCBA; they don't create or modify them." },
        { term: "Faithful implementation", def: "Even when an RBT thinks a procedure is wrong, the obligation is to implement and report — not modify." },
        { term: "Safety override", def: "In an immediate safety crisis, safety protocols override the BIP." },
      ],
      quickCheck: {
        prompt: "An RBT believes the prompting hierarchy in the BIP isn't working and a different approach would be better. What's the appropriate action and what's OUT of scope?",
        answer: "APPROPRIATE: continue implementing the BIP as written, document observations and data carefully, raise the concern in supervision with specific data ('over the last 10 sessions, independent responding has stayed at 0% with the current MTL fade'). The BCBA decides on changes. OUT OF SCOPE: independently switching to a different prompting hierarchy. Even with good intentions, that's program modification, which is BCBA-only.",
        hint: "Disagreement is fine. Independent action is not."
      },
    },
    {
      // concept[1]: Multiple Relationships
      keyTerms: [
        { term: "Multiple relationship", def: "More than one type of relationship with the same person (e.g., professional + friend)." },
        { term: "Boundary impairment", def: "When the secondary relationship distorts professional judgment or harms the client." },
        { term: "Proactive management", def: "Address potential boundary issues IMMEDIATELY with supervisor — don't wait." },
      ],
      quickCheck: {
        prompt: "A client's parent friend-requests the RBT on social media and offers them a babysitting job. What's the appropriate response, and why?",
        answer: "Decline both. Accepting the social-media connection creates a multiple relationship that can blur professional boundaries; accepting paid babysitting layers ANOTHER role on top, with conflicts of interest (e.g., handling problem behaviors outside professional supervision). Politely decline both. Notify the supervising BCBA proactively — they'll document and may help craft language for future similar offers.",
        hint: "There's no 'just this one time' with multiple relationships — the Code asks for proactive management."
      },
      categorize: {
        title: "Sort each situation: clear violation, gray area requiring supervisor consult, or acceptable.",
        categories: [
          { id: 'no',     label: 'Clear violation',           short: '✗', color: '#dc2626' },
          { id: 'gray',   label: 'Gray — consult supervisor', short: '?', color: '#eab308' },
          { id: 'ok',     label: 'Generally acceptable',      short: '✓', color: '#16a34a' },
        ],
        items: [
          { text: "RBT and client's mom become Instagram friends and like each other's posts.", correct: 'no', explanation: "Digital multiple relationship — the BACB Code 2.0 specifically addresses this." },
          { text: "Family invites RBT to client's birthday party at their home.", correct: 'gray', explanation: "Not an automatic violation, but a multiple-relationship risk worth consulting the BCBA before deciding." },
          { text: "RBT briefly attends a public school assembly where the client is performing, alongside other staff.", correct: 'ok', explanation: "Professional/public context, no boundary crossing, no exclusive interaction — generally acceptable." },
          { text: "Family asks RBT to provide paid babysitting on weekends.", correct: 'no', explanation: "New paid role, conflict of interest, role confusion — clear multiple-relationship violation." },
          { text: "RBT learns at lunch that another staff member dates the client's older sibling.", correct: 'gray', explanation: "Not the RBT's relationship, but raises team-level boundary concerns — escalate to supervisor." },
          { text: "Client family offers a $50 gift card at end of services.", correct: 'gray', explanation: "Cultural context matters; consult supervisor and the agency's gift policy before declining or accepting." },
        ],
      },
    },
    {
      // concept[2]: Mandated Reporting
      keyTerms: [
        { term: "Mandated reporter", def: "Legal obligation to report suspected abuse/neglect even without confirmation." },
        { term: "Report suspicion, not investigate", def: "RBTs report — they don't interview the child or investigate themselves." },
        { term: "Supersedes confidentiality", def: "Mandated reporting overrides standard HIPAA/Code confidentiality." },
      ],
      quickCheck: {
        prompt: "An RBT notices unexplained bruises on the client's arms and the client says 'Daddy was angry.' The RBT isn't 100% sure what happened. What is required, and what is OUT of scope?",
        answer: "REQUIRED: file a mandated report to child protective services AND notify the supervising BCBA immediately. Mandated reporters report SUSPICION — not certainty. Failure to report when indicators are present is itself an ethics violation and potentially criminal. OUT OF SCOPE: interviewing the child further about what happened, investigating, or contacting the parent directly — these can compromise the official investigation.",
        hint: "The bar is suspicion, not proof. And there's a clear lane between reporting and investigating."
      },
    },
    {
      // concept[3]: Responding to Supervision
      keyTerms: [
        { term: "Implement and raise", def: "Implement supervisor guidance; raise disagreements through proper channels." },
        { term: "Escalation channels", def: "Supervision meetings → formal feedback → org escalation → BACB reporting." },
        { term: "Client protection clause", def: "If an RBT is asked to do something they believe could harm the client, raise it; if not addressed, escalate." },
      ],
      quickCheck: {
        prompt: "An RBT's supervisor instructs them to use a procedure that wasn't in the BIP and that the RBT thinks could harm the client. What's the order of operations?",
        answer: "(1) Raise the specific concern WITH the supervisor — directly, professionally, with data and reasoning ('I'm concerned because the procedure isn't in the BIP and could increase X.'). (2) If not resolved or if the concern escalates, escalate to the BCBA's supervisor or the org's clinical director. (3) If client harm is imminent and unresolved internally, contact the BACB. Throughout: don't implement procedures you believe could harm the client, and document every step of the conversation.",
        hint: "There's a graduated response. But also a hard limit: never implement what you believe will harm the client."
      },
    },
  ],

}
