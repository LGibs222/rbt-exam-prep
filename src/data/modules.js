export const MODULES = {
  "Data Collection and Graphing": {
    icon: "📊",
    color: "#2c6e49",
    concepts: [
      {
        title: "Choosing the Right Measurement Procedure",
        body: "Measurement procedure selection depends on the behavior's physical characteristics and what information is clinically necessary. Frequency recording is appropriate for discrete behaviors with a clear onset and offset (e.g., hitting, calling out). Duration recording is appropriate when how long behavior occurs matters (e.g., tantrums, on-task behavior). Latency recording captures response time from stimulus to response onset. Inter-response time measures time between consecutive responses. A critical distinction often missed: event recording counts each occurrence; duration recording measures time. Using event recording for a behavior that varies greatly in length (short and long tantrums counted equally) can be misleading."
      },
      {
        title: "Discontinuous Measurement: Bias and When to Use Each Method",
        body: "Partial interval recording scores an interval as positive if the behavior occurs at ANY point during the interval — it systematically OVERESTIMATES true behavior occurrence. Whole interval recording scores an interval only if the behavior occurs for the ENTIRE interval — it systematically UNDERESTIMATES occurrence. Momentary time sampling checks only at the exact moment of each interval cue — it is the least biased and most appropriate for high-rate behaviors or situations where continuous observation is impractical. Common misconception: MTS and partial interval are NOT interchangeable — they measure different things and have opposite directional biases."
      },
      {
        title: "Graphing and Visual Analysis: What RBTs Need to Know",
        body: "Line graphs are the standard display for continuous behavior data in ABA — they allow visual inspection of level (mean height of data), trend (direction of change), and variability (scatter around the trend). The vertical axis (y-axis) represents the dependent variable (behavior); the horizontal axis (x-axis) represents time (sessions, days). Phase change lines (vertical dashed lines) separate experimental conditions. RBTs should update graphs after every session so the BCBA can make timely data-based decisions. An outdated graph is a clinical problem — the BCBA cannot detect meaningful trends or make intervention modifications without current data."
      },
      {
        title: "Data Accuracy and Professional Obligations",
        body: "Accurate data collection is a foundational professional obligation for RBTs — inaccurate data leads to incorrect clinical decisions that can harm clients. When data collection errors occur, the correct response is to document the error with a single line through incorrect entries (not white-out), note the correction, initial and date it, and notify the supervisor. Fabricating or estimating data to fill gaps is an ethics violation. Inconsistent data collection (recording sometimes but not always) creates an unreliable picture of behavior that can mask deterioration or fabricate improvement. If uncertain about a procedure, the RBT should contact the supervisor immediately — not estimate or guess."
      }
    ],
    practice: [
      {
        id: "mod-dc-1",
        stem: "An RBT is working with a client who engages in hand-flapping. The BCBA asks the RBT to record every instance of hand-flapping during a 30-minute session. Which measurement procedure should the RBT use?",
        options: ["Duration recording", "Frequency/event recording", "Whole interval recording", "Momentary time sampling"],
        correct: 1,
        rationale: "Frequency (event) recording involves counting each discrete occurrence of a behavior, which is appropriate when the behavior has a clear beginning and end and when the goal is to count every instance. Duration recording measures how long a behavior lasts. Whole interval recording scores whether the behavior occurred throughout an entire interval. Momentary time sampling only checks whether the behavior is occurring at the end of each interval.",
        domain_name: "Data Collection and Graphing"
      },
      {
        id: "mod-dc-2",
        stem: "An RBT is collecting data on how long a child engages in tantrum behavior from the moment the tantrum starts until it stops. Which type of measurement is the RBT using?",
        options: ["Latency recording", "Frequency recording", "Duration recording", "Partial interval recording"],
        correct: 2,
        rationale: "Duration recording measures the total amount of time a behavior occurs from onset to offset. Latency recording measures the time between a stimulus and the onset of the behavior. Frequency recording counts the number of occurrences. Partial interval recording only notes whether a behavior occurred at any point during an interval.",
        domain_name: "Data Collection and Graphing"
      },
      {
        id: "mod-dc-3",
        stem: "An RBT divides a 30-minute session into 60 thirty-second intervals and marks whether the target behavior occurred at any point during each interval. This is:",
        options: ["Whole interval recording", "Momentary time sampling", "Partial interval recording", "Duration recording"],
        correct: 2,
        rationale: "Partial interval recording scores an interval as positive if the behavior occurs at any point during the interval, regardless of duration or frequency. Whole interval recording requires the behavior throughout the interval. Momentary time sampling checks only at the exact end of each interval.",
        domain_name: "Data Collection and Graphing"
      },
      {
        id: "mod-dc-4",
        stem: "An RBT records 8 correct responses out of 10 trials during a discrete trial session. What is the percentage of correct responses?",
        options: ["70%", "75%", "80%", "85%"],
        correct: 2,
        rationale: "Percentage correct = (8 correct ÷ 10 total) × 100 = 80%. Accurate data entry and calculation are essential for progress monitoring.",
        domain_name: "Data Collection and Graphing"
      },
      {
        id: "mod-dc-5",
        stem: "An RBT reviews a client's graphed frequency data over five consecutive sessions: 15, 12, 9, 7, 5. What trend does this data represent?",
        options: ["An increasing trend", "A decreasing trend", "Variable data with no clear trend", "A stable trend at low levels"],
        correct: 1,
        rationale: "A decreasing trend is evident when data points consistently decline across successive sessions. The sequence 15, 12, 9, 7, 5 shows a clear and consistent decrease from session to session.",
        domain_name: "Data Collection and Graphing"
      }
    ]
  },

  "Behavior Assessment": {
    icon: "🔍",
    color: "#1d4ed8",
    concepts: [
      {
        title: "Preference Assessments: Types, Purposes, and Limitations",
        body: "The four main preference assessment methods are: (1) Free operant — observe approach and engagement with freely available items; (2) Single stimulus — present one item at a time and record approach/engagement; (3) Paired stimulus (forced choice) — present two items simultaneously and record selection; (4) Multiple stimulus without replacement (MSWR) — present all items, remove selected item, re-present remaining items. Critical limitation: preference ≠ reinforcing function. A stimulus a client selects frequently may not increase behavior when delivered contingently — especially if the client has free access to it at home. Preference assessments should be conducted regularly as preferences change with satiation and deprivation states."
      },
      {
        title: "Functions of Behavior: The Four-Function Model",
        body: "All operant behavior is maintained by one or more of four functions: positive social reinforcement (attention), negative reinforcement (escape from demands or aversive events), positive reinforcement via tangibles (access to items/activities), and automatic reinforcement (sensory consequences produced by the behavior itself). Key identification rule: behavior maintained by attention increases when attention is withdrawn; escape-maintained behavior increases when demands are presented; tangible-maintained behavior increases when preferred items are removed; automatically reinforced behavior persists even in the alone condition. Function identification is essential because treatments must match the maintaining function to be effective."
      },
      {
        title: "ABC Data Collection: What RBTs Record and Why",
        body: "ABC (Antecedent-Behavior-Consequence) recording is a descriptive assessment tool in which the RBT observes and records what happened before the behavior (antecedent), what the behavior looked like (behavior — in observable terms), and what happened immediately after (consequence). ABC data generate hypotheses about function that inform formal assessment by the BCBA. RBTs must record behavior using observable language — not inferences about internal states. Critical error: recording 'client was frustrated' as the antecedent rather than 'math worksheet was presented.' The former is unobservable; the latter can be tested. Patterns in ABC data point the BCBA toward functional hypotheses."
      },
      {
        title: "RBT's Role in Functional Assessment: Assisting, Not Designing",
        body: "RBTs participate in functional assessment by collecting ABC data as directed, administering preference assessment probes, implementing specific conditions in a functional analysis under the BCBA's direct supervision, and providing anecdotal observations about behavior patterns. RBTs do NOT independently design functional analyses, interpret FA data, or make conclusions about maintaining functions — these are BCBA responsibilities. A critical scope-of-practice point: an RBT who observes that behavior occurs most during math class should report this observation to the BCBA — not conclude the behavior is 'escape-maintained from math' and independently implement function-based interventions."
      }
    ],
    practice: [
      {
        id: "mod-ba-1",
        stem: "An RBT observes that a child consistently tantrums when asked to complete difficult math problems, and the tantrum stops when the math problems are removed. Which function of behavior does this most likely represent?",
        options: ["Access to attention", "Access to tangibles", "Escape/avoidance", "Automatic reinforcement"],
        correct: 2,
        rationale: "When a behavior occurs in the presence of demands and results in the removal of those demands, the behavior is likely maintained by negative reinforcement in the form of escape or avoidance. Attention-maintained behavior typically occurs when attention is diverted. Automatic reinforcement is maintained by internal sensory stimulation.",
        domain_name: "Behavior Assessment"
      },
      {
        id: "mod-ba-2",
        stem: "An RBT notices that a client frequently bites their own hand when alone with no one else present and no demands or tasks have been given. Based on this observation, which function of behavior is most likely?",
        options: ["Access to attention", "Escape from demands", "Access to tangibles", "Automatic reinforcement"],
        correct: 3,
        rationale: "When a behavior occurs even when the individual is alone, with no social consequences (no attention, no escape from demands, no access to tangibles), the behavior is likely maintained by automatic reinforcement — the behavior itself produces sensory stimulation that is reinforcing.",
        domain_name: "Behavior Assessment"
      },
      {
        id: "mod-ba-3",
        stem: "An RBT is helping the BCBA gather information for a functional behavior assessment. The BCBA asks the RBT to complete an ABC data collection form. What does ABC stand for?",
        options: ["Assessment, Behavior, Consequence", "Antecedent, Behavior, Consequence", "Antecedent, Baseline, Condition", "Analysis, Behavior, Contingency"],
        correct: 1,
        rationale: "ABC stands for Antecedent (what happens before the behavior), Behavior (the specific behavior observed), and Consequence (what happens after the behavior). This is a descriptive assessment tool used to identify patterns related to the function of behavior.",
        domain_name: "Behavior Assessment"
      },
      {
        id: "mod-ba-4",
        stem: "A BCBA asks an RBT to conduct a paired stimulus preference assessment with a client. What does this involve?",
        options: ["Presenting all available items at once and recording which one the client selects first", "Presenting two items at a time and recording which item the client selects from each pair", "Asking the client's caregiver to rank the client's preferred items from most to least preferred", "Allowing the client free access to all items and recording how long they engage with each"],
        correct: 1,
        rationale: "A paired stimulus (or forced-choice) preference assessment involves systematically presenting two items at a time and recording which item the client selects from each pair. Presenting all items describes multiple stimulus assessment. Asking caregivers is indirect assessment. Free access describes free operant assessment.",
        domain_name: "Behavior Assessment"
      },
      {
        id: "mod-ba-5",
        stem: "An RBT is assisting a BCBA with an indirect functional assessment. Which of the following is an example of an indirect assessment method?",
        options: ["Conducting an ABC observation during the client's school day", "Interviewing the client's teacher about when the problem behavior occurs", "Systematically manipulating environmental variables to test behavior functions", "Recording antecedents and consequences in real time during a session"],
        correct: 1,
        rationale: "Indirect assessment methods gather information about behavior through interviews, questionnaires, rating scales, and record reviews rather than direct observation. Interviewing the teacher is an indirect method. ABC observation and recording antecedents in real time are direct (descriptive) methods. Systematically manipulating variables describes a functional analysis.",
        domain_name: "Behavior Assessment"
      }
    ]
  },

  "Behavior Acquisition": {
    icon: "🎓",
    color: "#7c3aed",
    concepts: [
      {
        title: "Discrete Trial Teaching vs. Naturalistic Teaching: Key Differences",
        body: "Discrete trial teaching (DTT) uses a controlled, structured format: antecedent (SD), response opportunity, consequence, and inter-trial interval. Trials are massed, pre-determined, and controlled by the instructor. Naturalistic teaching (NET, incidental teaching, milieu teaching) embeds instruction within naturally occurring activities driven by the client's motivation. The reinforcer is naturally related to the response (e.g., the child receives the requested toy, not an unrelated treat). Key advantage of naturalistic teaching: built-in generalization because training occurs in the natural environment with natural reinforcers. Common misconception: DTT and NET are not mutually exclusive — many programs combine both depending on the skill being taught."
      },
      {
        title: "Prompting Hierarchies and Prompt Dependency: Critical Clinical Issues",
        body: "The two primary prompting hierarchies in ABA are most-to-least (MTL) and least-to-most (LTM). MTL begins with the most intrusive prompt (full physical guidance) and systematically fades to less intrusive prompts — it is errorless and appropriate for safety-sensitive skills or clients with error-sensitive behavior. LTM begins with the least intrusive prompt and escalates only when needed — it allows errors but provides diagnostic information about independence level. Prompt dependency occurs when behavior is controlled by the prompt rather than the natural SD. Prevention: fade prompts systematically, reinforce independent responses more richly, and use transfer procedures like time delay to shift stimulus control to natural antecedents."
      },
      {
        title: "Chaining Procedures: Forward, Backward, and Total Task",
        body: "Chaining teaches complex multi-step skills by linking individual behaviors in a sequence. Forward chaining teaches the first step independently while prompting all remaining steps. Backward chaining teaches the last step first — the learner always completes the final step and receives reinforcement, which can maintain motivation for complex skills. Total task chaining requires attempting all steps every session with prompts as needed for unmastered steps — progress on each step is tracked separately. When selecting a chaining procedure, consider: does the client need to experience completion (backward), does the client have difficulty with sequencing (total task), or will the early steps provide the strongest motivation (forward)?"
      },
      {
        title: "Verbal Behavior: Mands, Tacts, Intraverbals, and Echoics",
        body: "The four primary verbal operants are: Mands (requests) — controlled by a motivating operation (MO) and reinforced by the specific item/action requested (e.g., a hungry child saying 'cookie' reinforced by receiving a cookie). Tacts (labels) — controlled by a nonverbal stimulus and reinforced by generalized social attention (e.g., seeing a dog and saying 'dog'). Intraverbals — verbal responses to verbal antecedents where the response does not match the stimulus (e.g., answering 'What animal barks?' with 'dog'). Echoics — vocal repetition of a verbal model with point-to-point correspondence. Critical exam distinction: mands specify their own reinforcer; tacts are controlled by the thing being labeled; intraverbals are verbal-verbal (no nonverbal stimulus)."
      }
    ],
    practice: [
      {
        id: "mod-acq-1",
        stem: "An RBT is conducting a discrete trial with a student. The RBT presents a picture of a dog and says, 'What is this?' The student says 'Dog,' and the RBT provides praise and a small treat. Which component of the discrete trial served as the discriminative stimulus (SD)?",
        options: ["The praise and treat", "The student's response 'Dog'", "The presentation of the picture and the question 'What is this?'", "The inter-trial interval"],
        correct: 2,
        rationale: "The discriminative stimulus (SD) is the stimulus that signals the availability of reinforcement for a specific response. The picture of the dog combined with the question 'What is this?' serves as the SD. The praise and treat are the consequence. The student's response is the behavior. The inter-trial interval is the pause between trials.",
        domain_name: "Behavior Acquisition"
      },
      {
        id: "mod-acq-2",
        stem: "A BCBA writes a program that involves teaching a child to brush their teeth by first teaching the last step independently (putting the toothbrush away) while providing full assistance for all prior steps. Which procedure is this?",
        options: ["Forward chaining", "Backward chaining", "Total task chaining", "Shaping"],
        correct: 1,
        rationale: "Backward chaining involves teaching the last step of a task analysis first while providing assistance for all preceding steps. Once the last step is mastered, the second-to-last step is taught, and so on. Forward chaining teaches the first step first. Total task chaining involves practicing every step during each session.",
        domain_name: "Behavior Acquisition"
      },
      {
        id: "mod-acq-3",
        stem: "An RBT is teaching a client to identify colors. The RBT places a red card and a blue card on the table and says, 'Touch red.' The client touches the red card and receives praise. What type of training is this?",
        options: ["Tact training", "Mand training", "Listener responding (receptive identification)", "Echoic training"],
        correct: 2,
        rationale: "Listener responding (receptive identification) involves the client responding to a verbal instruction by selecting or identifying the correct item without producing a verbal response. Tact training involves the client labeling stimuli. Mand training involves teaching the client to request items. Echoic training involves repeating what someone else says.",
        domain_name: "Behavior Acquisition"
      },
      {
        id: "mod-acq-4",
        stem: "An RBT is teaching a child to say 'ball' by first reinforcing 'ba,' then 'bal,' and finally 'ball.' Which procedure is the RBT using?",
        options: ["Chaining", "Shaping", "Prompt fading", "Discrimination training"],
        correct: 1,
        rationale: "Shaping involves reinforcing successive approximations toward a target behavior. The RBT starts by reinforcing a response that resembles the target ('ba'), then requires a closer approximation ('bal'), and finally the full target behavior ('ball'). Chaining links together a series of discrete steps. Prompt fading involves reducing prompts. Discrimination training involves responding differently to different stimuli.",
        domain_name: "Behavior Acquisition"
      },
      {
        id: "mod-acq-5",
        stem: "An RBT is teaching a client to answer social questions. The RBT asks, 'What is your name?' and the child responds with their name. This is an example of which verbal operant?",
        options: ["Echoic", "Mand", "Tact", "Intraverbal"],
        correct: 3,
        rationale: "An intraverbal is a verbal response that is controlled by another person's verbal behavior, where the response does not match the verbal stimulus. The child hears a question and responds with different words. An echoic involves repeating the verbal stimulus. A mand is a request driven by motivation. A tact is a label of a nonverbal stimulus.",
        domain_name: "Behavior Acquisition"
      }
    ]
  },

  "Behavior Reduction": {
    icon: "📉",
    color: "#dc2626",
    concepts: [
      {
        title: "Function-Based Behavior Reduction: Matching Intervention to Function",
        body: "Behavior reduction procedures must be matched to the function of the behavior to be effective. For attention-maintained behavior: extinction means withholding attention (not verbal reprimands, which are attention). For escape-maintained behavior: escape extinction means maintaining the demand regardless of behavior (NOT removing tasks). For tangible-maintained behavior: extinction means withholding the tangible item. For automatic reinforcement: social extinction is ineffective because the reinforcer is not social. Critical error: applying escape extinction to attention-maintained behavior or vice versa produces function mismatch and can inadvertently reinforce the problem behavior on an unintended schedule."
      },
      {
        title: "Differential Reinforcement Procedures: DRO, DRI, DRA, DRL",
        body: "DRO (differential reinforcement of OTHER behavior) reinforces the ABSENCE of the target behavior during defined intervals — the client earns reinforcement for NOT engaging in the problem behavior. DRI reinforces a behavior PHYSICALLY INCOMPATIBLE with the target behavior (both cannot occur simultaneously). DRA reinforces an ALTERNATIVE behavior that may serve the same function as the problem behavior (used in FCT). DRL reinforces occurrence of the behavior at or BELOW a criterion rate. Critical distinction: DRO does not teach a replacement behavior — it only reinforces absence. DRA and DRI both involve reinforcing a specific behavior. When behavior is function-maintained, DRA (FCT) is preferred because it addresses the maintaining variable."
      },
      {
        title: "Extinction: Bursts, Spontaneous Recovery, and Consistent Implementation",
        body: "Extinction involves withholding the reinforcer that previously maintained a behavior. Critical side effects RBTs must understand: extinction burst (temporary increase in frequency, intensity, or topography when extinction begins — do not reverse extinction during a burst), aggression (common during extinction bursts), and spontaneous recovery (temporary return of extinguished behavior days or weeks after it has been reduced). Consistent implementation is critical — if extinction is inconsistently applied, the intermittent reinforcement schedule that results makes behavior MORE resistant to extinction than before. Every person in every setting must implement extinction consistently for it to be effective."
      },
      {
        title: "Crisis Procedures and Safety: RBT Obligations",
        body: "Safety is always the first priority in any behavioral crisis. RBTs must be trained in the specific crisis procedures outlined in each client's behavior plan and follow them as written — not improvise. After any use of physical management or crisis procedures, the RBT must immediately complete an incident report and notify the supervising BCBA. Common misconceptions: (1) continuing a regular session after a crisis without documentation is a violation. (2) RBTs should NOT implement physical restraint procedures that were not trained and authorized. (3) Pausing an extinction procedure during a genuine safety crisis is not extinction failure — safety protocols override clinical procedures in the moment."
      }
    ],
    practice: [
      {
        id: "mod-br-1",
        stem: "A BCBA instructs an RBT to reinforce any behavior the client engages in OTHER than self-injurious behavior (SIB) during 3-minute intervals. If no SIB occurs during the interval, the RBT delivers praise. Which procedure is this?",
        options: ["Differential reinforcement of alternative behavior (DRA)", "Differential reinforcement of incompatible behavior (DRI)", "Differential reinforcement of other behavior (DRO)", "Differential reinforcement of low rates (DRL)"],
        correct: 2,
        rationale: "Differential reinforcement of other behavior (DRO) involves delivering reinforcement when the target problem behavior has not occurred for a specified time interval. DRA requires reinforcing a specific alternative behavior. DRI requires reinforcing a behavior physically incompatible with the target. DRL involves reinforcing reduced rates of the behavior.",
        domain_name: "Behavior Reduction"
      },
      {
        id: "mod-br-2",
        stem: "An RBT is implementing extinction for a client whose screaming is maintained by attention. What should the RBT do when the client screams?",
        options: ["Provide a verbal reprimand to the client", "Redirect the client to a different activity", "Withhold attention and do not respond to the screaming", "Remove the client from the environment"],
        correct: 2,
        rationale: "Extinction involves withholding the reinforcer that maintains the behavior. Since screaming is maintained by attention, the RBT should withhold attention. A verbal reprimand provides attention, reinforcing the behavior. Redirecting involves interaction which is attention. Removing the client is time-out, not extinction.",
        domain_name: "Behavior Reduction"
      },
      {
        id: "mod-br-3",
        stem: "After implementing extinction for attention-maintained screaming, the RBT notices that the client's screaming initially increases in frequency and intensity before it begins to decrease. What is this phenomenon called?",
        options: ["Spontaneous recovery", "Extinction burst", "Behavioral contrast", "Response generalization"],
        correct: 1,
        rationale: "An extinction burst is a temporary increase in the frequency, duration, or intensity of the target behavior when reinforcement is first withheld. Spontaneous recovery refers to the reappearance of a previously extinguished behavior after a period of time. Behavioral contrast refers to a change in behavior in one context due to reinforcement changes in another.",
        domain_name: "Behavior Reduction"
      },
      {
        id: "mod-br-4",
        stem: "A client's problem behavior has been on extinction for two weeks and has significantly decreased. One day, the behavior suddenly reappears at a high rate even though the extinction procedure is still in place. What is this most likely an example of?",
        options: ["An extinction burst", "Spontaneous recovery", "Behavioral contrast", "Stimulus generalization"],
        correct: 1,
        rationale: "Spontaneous recovery is the temporary reappearance of a previously extinguished behavior after a period of time during which the behavior had decreased. An extinction burst occurs at the beginning of extinction, not after the behavior has already significantly decreased.",
        domain_name: "Behavior Reduction"
      },
      {
        id: "mod-br-5",
        stem: "An RBT is implementing an antecedent intervention by modifying the environment before a session — removing items that typically trigger problem behavior and arranging the workspace to minimize distractions. What type of intervention is this?",
        options: ["Punishment procedure", "Extinction procedure", "Environmental modification (antecedent manipulation)", "Consequence-based intervention"],
        correct: 2,
        rationale: "Environmental modification is an antecedent-based strategy that involves changing the environment before the behavior occurs to reduce the likelihood of problem behavior. Punishment involves presenting an aversive stimulus or removing a preferred stimulus after a behavior. Extinction involves withholding the reinforcer after behavior occurs. Consequence-based interventions are applied after the behavior.",
        domain_name: "Behavior Reduction"
      }
    ]
  },

  "Documentation and Reporting": {
    icon: "📋",
    color: "#b45309",
    concepts: [
      {
        title: "Objective Session Documentation: What to Include and What to Avoid",
        body: "Session notes must use objective, observable, measurable language. Include: frequency/duration/percentage of target behaviors, procedures implemented (by name), client performance relative to criteria, and any notable events (illness, medication changes, unusual behavior patterns). Avoid: subjective interpretations ('seemed frustrated'), diagnostic labels ('had a meltdown'), causal attributions ('because he was tired'), and comparative language ('did much better than last week' without data). Critical professional standard: if it is not observable and measurable, it should not appear in a session note. Vague or interpretive documentation can lead to incorrect clinical decisions and creates legal and regulatory liability."
      },
      {
        title: "Reporting to Supervisors: Timely, Accurate, and Proactive Communication",
        body: "RBTs have a professional obligation to report clinically significant events to their supervising BCBA in a timely manner — not at the next scheduled supervision. Events requiring immediate reporting include: unexpected significant increases in problem behavior, new behaviors not addressed in the BIP, suspected abuse or neglect, medication changes affecting session performance, equipment or safety concerns, and data inconsistencies that may affect treatment decisions. Common error: waiting until the next supervision meeting to report a trend that emerged 3 sessions ago. By that time, 3 sessions of potentially harmful or ineffective treatment may have continued without clinical oversight."
      },
      {
        title: "Confidentiality and Information Sharing",
        body: "Client information is confidential under both HIPAA and the BACB Ethics Code. RBTs may share client information only with members of the treatment team who are directly involved in the client's care — and only to the extent necessary for treatment. Sharing information with family members beyond what is clinically necessary, discussing cases in public settings, using social media to post about clients (even anonymously), or sharing records with other providers without a signed release of information are all violations. Critical exception: mandated reporting of suspected abuse or neglect supersedes standard confidentiality — RBTs must report even without consent when abuse is suspected."
      },
      {
        title: "Scope of Practice in Documentation: What RBTs Can and Cannot Document",
        body: "RBTs can and should document session data, behavioral observations, procedures implemented, and notable clinical events. RBTs should NOT document clinical interpretations, function-based hypotheses, diagnostic impressions, or modifications to treatment plans — these are BCBA responsibilities. When caregivers or team members ask questions beyond the RBT's scope, the appropriate documentation is 'question was referred to supervising BCBA' — not an independent answer. A critical compliance issue: RBTs must never sign session notes for sessions they did not attend. Doing so constitutes falsification of records and is grounds for disciplinary action by the BACB."
      }
    ],
    practice: [
      {
        id: "mod-doc-1",
        stem: "After completing a therapy session, an RBT needs to write a session note. Which of the following is the MOST appropriate information to include?",
        options: ["The RBT's personal opinions about the client's progress and family dynamics", "Objective descriptions of behaviors observed, data collected, and programs implemented", "A comparison of this client's performance with other clients on the caseload", "Predictions about the client's future outcomes based on the RBT's intuition"],
        correct: 1,
        rationale: "Session notes should contain objective, factual information including what behaviors were observed, what data was collected, which programs were implemented, and any notable events. Personal opinions, comparisons to other clients (a confidentiality breach), and intuition-based predictions do not belong in clinical documentation.",
        domain_name: "Documentation and Reporting"
      },
      {
        id: "mod-doc-2",
        stem: "An RBT realizes that they accidentally recorded data on the wrong data sheet during a session. What is the most appropriate course of action?",
        options: ["Throw away the incorrect data sheet and pretend it did not happen", "Cross out the incorrect entry with a single line, note the correction, and initial it, then record on the correct sheet", "Use white-out to cover the incorrect data and rewrite it on the correct sheet", "Wait until the end of the week to fix all data errors at once"],
        correct: 1,
        rationale: "The appropriate way to handle documentation errors is to draw a single line through the incorrect entry (so it remains legible), write a brief note about the correction, initial and date it, and then record the data on the correct sheet. Destroying data sheets compromises the clinical record. Using white-out obscures the original entry. Data corrections should be made immediately, not delayed.",
        domain_name: "Documentation and Reporting"
      },
      {
        id: "mod-doc-3",
        stem: "An RBT is documenting a client's session and needs to describe a tantrum that occurred. Which of the following is the MOST appropriate way to document the behavior?",
        options: ["'Client had a terrible tantrum and was very upset and angry'", "'Client was being manipulative and threw a tantrum to get attention'", "'Client engaged in tantrum behavior (crying, falling to floor, hitting the table) for approximately 4 minutes following removal of the iPad'", "'Client threw a fit because they did not get what they wanted'"],
        correct: 2,
        rationale: "Documentation should be objective, specific, and measurable. This entry describes exactly what behaviors occurred (crying, falling to floor, hitting the table), the duration (approximately 4 minutes), and the context (following removal of the iPad) without subjective judgments or inferred motivations.",
        domain_name: "Documentation and Reporting"
      },
      {
        id: "mod-doc-4",
        stem: "An RBT has just completed a session in which the client exhibited a significant increase in self-injurious behavior compared to previous sessions. What should the RBT do?",
        options: ["Wait until the next scheduled supervision meeting to mention it", "Modify the behavior intervention plan independently to address the increase", "Document the change in behavior and communicate it to the supervisor promptly", "Only document the increase if it continues for three or more consecutive sessions"],
        correct: 2,
        rationale: "Significant changes in client behavior should be documented and communicated to the supervising BCBA promptly, not delayed. The BCBA needs this information to make informed clinical decisions about the treatment plan. Modifying the BIP is outside the RBT's scope. Waiting for multiple sessions delays necessary clinical oversight.",
        domain_name: "Documentation and Reporting"
      },
      {
        id: "mod-doc-5",
        stem: "An RBT is asked to sign session notes written by another staff member for a session the RBT did not attend. The RBT should:",
        options: ["Sign since it is just an administrative task", "Refuse and report the request to a supervisor, as this constitutes falsification of records", "Sign only if the notes appear accurate", "Ask the client's parent for permission first"],
        correct: 1,
        rationale: "Signing documentation for services not provided constitutes fraud and falsification of records. The RBT must refuse and report this request to a supervisor. This is a serious ethical violation that could result in BACB disciplinary action.",
        domain_name: "Documentation and Reporting"
      }
    ]
  },

  "Ethics": {
    icon: "⚖️",
    color: "#0f766e",
    concepts: [
      {
        title: "RBT Scope of Practice: What RBTs Can and Cannot Do",
        body: "RBTs are trained to implement, not design, ABA services. RBTs implement skill acquisition programs, behavior reduction plans, data collection procedures, and preference assessments as directed by the supervising BCBA. RBTs do NOT independently design behavior plans, conduct functional analyses without direct BCBA supervision, make clinical interpretations, modify programs, or provide services without a qualified BCBA supervisor. A critical ethical gray area: when an RBT believes a procedure is ineffective, their obligation is to implement it faithfully and report observations to the BCBA — not to independently modify it. The only exception is safety: in an immediate safety crisis, safety protocols override the written BIP."
      },
      {
        title: "Multiple Relationships and Professional Boundaries",
        body: "Multiple relationships occur when a professional has more than one type of relationship with a client, client family member, or supervisee simultaneously. Examples include: accepting gifts, becoming social media friends, attending personal events, providing non-professional services, developing romantic relationships, or engaging in business transactions. Multiple relationships are prohibited because they can impair professional objectivity, exploit the therapeutic relationship, and harm clients. The RBT Ethics Code requires proactive management — not waiting for a violation to occur. When boundary issues arise, the RBT should consult their supervisor immediately rather than managing them independently. BACB Ethics Code 2.0 specifically addresses digital multiple relationships."
      },
      {
        title: "Mandated Reporting: Legal and Ethical Obligations",
        body: "RBTs are mandated reporters in most jurisdictions, meaning they have a legal obligation to report suspected child abuse or neglect. This obligation applies even when the RBT is uncertain — mandated reporters report suspicion, not confirmed abuse. The report goes to the appropriate child protective services agency and must also be communicated to the supervising BCBA. Critically, RBTs do NOT investigate abuse or interview the child about it — this could compromise child protective investigations. The mandate to report supersedes client confidentiality. Failure to report suspected abuse when indicators are present is both an ethics violation and potentially a criminal offense."
      },
      {
        title: "Responding to Supervision and Working Within Organizational Systems",
        body: "RBTs must implement their supervisor's clinical directions and accept corrective feedback professionally. When disagreeing with a supervisor's guidance, the appropriate response is to implement the guidance while raising the concern through appropriate channels (supervision meetings, formal feedback processes). RBTs should NOT ignore supervisory direction, implement unauthorized modifications, or escalate to the BCBA's supervisor without first attempting professional direct communication. A nuanced ethics obligation: if an RBT is asked to implement a procedure they believe could harm the client, they must raise this concern with the supervisor — if the concern is not addressed, the organizational escalation process or BACB reporting process should be used. Client protection overrides organizational compliance in extreme cases."
      }
    ],
    practice: [
      {
        id: "mod-eth-1",
        stem: "An RBT receives a friend request on social media from the mother of a current client. What is the MOST appropriate course of action?",
        options: ["Accept the request to maintain a positive relationship with the family", "Accept the request but limit what the parent can see on their profile", "Decline the request to maintain professional boundaries", "Block the parent so they cannot find the RBT's profile"],
        correct: 2,
        rationale: "Accepting a social media friend request from a client's family member creates a dual relationship that crosses professional boundaries. The RBT should decline the request to maintain appropriate boundaries. Blocking is unnecessarily harsh; simply declining is sufficient and professional.",
        domain_name: "Ethics"
      },
      {
        id: "mod-eth-2",
        stem: "A parent offers the RBT a $100 gift card as a thank-you for their work with the child. What should the RBT do?",
        options: ["Accept the gift card since the parent is being generous", "Accept the gift card but report it to the supervisor", "Politely decline the gift and explain that accepting gifts could create a dual relationship, then inform their supervisor", "Accept the gift card but donate it to charity"],
        correct: 2,
        rationale: "RBTs should avoid accepting gifts from clients or their families as it can create a dual relationship or the appearance of a conflict of interest. The appropriate action is to politely decline and explain the professional boundary, then inform the supervisor. Accepting a substantial gift crosses professional boundaries regardless of intentions.",
        domain_name: "Ethics"
      },
      {
        id: "mod-eth-3",
        stem: "Which of the following activities is within the scope of practice for an RBT?",
        options: ["Designing a new behavior intervention plan for a client", "Conducting a functional analysis independently", "Implementing a skill acquisition program as written by the supervising BCBA", "Determining which assessments to administer to a new client"],
        correct: 2,
        rationale: "RBTs are responsible for implementing programs and procedures as designed and directed by the supervising BCBA. Designing BIPs requires the training and credentials of a BCBA. Conducting a functional analysis independently is outside the RBT's scope. Selecting assessments is part of the BCBA's role in treatment planning.",
        domain_name: "Ethics"
      },
      {
        id: "mod-eth-4",
        stem: "An RBT discovers that a colleague has been falsifying client data by recording higher performance scores than what actually occurred during sessions. What should the RBT do?",
        options: ["Confront the colleague and demand they correct the data", "Ignore it since it is not the RBT's client", "Report the concern to the supervisor or through the appropriate reporting channels", "Correct the colleague's data themselves without telling anyone"],
        correct: 2,
        rationale: "Falsifying data is a serious ethical violation that can harm clients by leading to incorrect treatment decisions. The RBT has an ethical obligation to report this concern to their supervisor or through appropriate reporting channels. All professionals have a duty to report ethical violations regardless of whose client is affected.",
        domain_name: "Ethics"
      },
      {
        id: "mod-eth-5",
        stem: "An RBT is asked by a family friend to provide ABA therapy to their child on weekends privately, outside of the RBT's employment with an ABA company. What should the RBT do?",
        options: ["Agree to provide services since it will help the child", "Agree but only if the family pays in cash", "Decline because RBTs must practice under the supervision of a BCBA and within a professional framework", "Agree as long as the family signs a waiver"],
        correct: 2,
        rationale: "RBTs must practice under the close, ongoing supervision of a BCBA. Providing ABA services independently, without proper supervision, is outside the RBT's scope of practice and violates ethical guidelines regardless of the relationship. A waiver does not override the ethical and professional requirement for BCBA supervision.",
        domain_name: "Ethics"
      }
    ]
  }
};
