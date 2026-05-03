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

}
