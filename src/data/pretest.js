export const PRETEST_QUESTIONS = [
  {
    id: "rbt-pre-1",
    stem: "An RBT has been collecting frequency data on a client's calling-out behavior for 4 sessions at 30 minutes each. Session data: Session 1 = 18, Session 2 = 12, Session 3 = 9, Session 4 = 5. The supervising BCBA asks the RBT to calculate the rate per minute for Session 3 and describe the overall trend. What is the rate for Session 3, and what does the trend indicate?",
    options: [
      "0.3 responses/min; increasing trend",
      "0.3 responses/min; decreasing trend indicating the intervention may be working",
      "3.0 responses/min; decreasing trend",
      "0.3 responses/min; stable trend"
    ],
    correct: 1,
    rationale: "Rate = 9 responses ÷ 30 minutes = 0.3 responses/minute. The consistent decline across sessions (18, 12, 9, 5) represents a clear decreasing trend, which is the desired direction for a problem behavior. Calculating rate rather than frequency allows for comparison across sessions of different lengths.",
    domain_name: "Data Collection and Graphing"
  },
  {
    id: "rbt-pre-2",
    stem: "An RBT is using partial interval recording during a 10-minute session with 20 thirty-second intervals. The target behavior is stereotypic rocking. The RBT scores 14 intervals as positive. The BCBA later tells the RBT the actual duration of rocking was only 4 minutes total. What does this discrepancy most likely indicate?",
    options: [
      "The RBT's IOA was poor and the data are invalid",
      "Partial interval recording overestimated true behavior occurrence because any rocking during an interval, even for 1 second, was scored as positive",
      "The BCBA's duration data are incorrect because rocking could not have occurred in only 4 minutes",
      "The measurement procedures captured equivalent information through different methods"
    ],
    correct: 1,
    rationale: "Partial interval recording scores an interval as positive if the behavior occurs AT ANY POINT during that interval — even briefly. This systematically overestimates true behavior occurrence compared to duration or continuous measures. 14/20 intervals = 70% scored positive, while actual duration data indicate only 40% of the session involved rocking. This is a known bias of partial interval recording.",
    domain_name: "Data Collection and Graphing"
  },
  {
    id: "rbt-pre-3",
    stem: "An RBT has been collecting data on a client's on-task behavior using momentary time sampling every 30 seconds for 5 sessions. Data show 75%, 80%, 72%, 78%, and 76%. The RBT updates the graph and notices these points form a flat, stable pattern at approximately 76%. The BCBA asks the RBT what this pattern means. The best answer is:",
    options: [
      "The client's on-task behavior is improving",
      "The data show high variability requiring intervention modification",
      "The data show a stable level, which is appropriate for a baseline phase before intervention",
      "The data are too variable to interpret — 72% to 80% is high variability"
    ],
    correct: 2,
    rationale: "Data ranging from 72% to 80% with a mean around 76% and no systematic trend represents stable baseline data. Stability (consistent level without systematic trend) is actually desirable for a baseline phase — it indicates the behavior is not changing on its own and provides a clean comparison phase for evaluating intervention effects. The 8% range is low variability for behavior data.",
    domain_name: "Data Collection and Graphing"
  },
  {
    id: "rbt-pre-4",
    stem: "During a preference assessment, the RBT presents two items at a time across 15 pairings. Item A (iPad) was available in 8 pairings and was selected 7 times. Item B (bubbles) was available in 8 pairings and was selected 6 times. Item C (music) was available in 8 pairings and was selected 3 times. Based on these data, which item is most preferred and should be tested as the primary reinforcer for this client?",
    options: [
      "Item B, because it was selected most consistently",
      "Item A (iPad), with 87.5% selection rate, indicating highest preference",
      "Item C because it was selected least and therefore has the highest deprivation value",
      "All items are roughly equivalent and should be used interchangeably"
    ],
    correct: 1,
    rationale: "In a paired stimulus preference assessment, percentage of selection across all pairings identifies preference hierarchy. Item A (iPad) = 7/8 = 87.5%; Item B (bubbles) = 6/8 = 75%; Item C (music) = 3/8 = 37.5%. Item A is highest-preference and should be prioritized as the primary reinforcer candidate — though reinforcer efficacy should still be tested empirically.",
    domain_name: "Behavior Assessment"
  },
  {
    id: "rbt-pre-5",
    stem: "During an ABC data collection period, an RBT records that a client's aggression consistently occurs after extended periods of independent work (30+ minutes) and is followed by the RBT redirecting to a break activity. On three separate occasions when the RBT prompted a break at 25 minutes (before aggression occurred), aggression did not occur. This observation pattern most strongly suggests:",
    options: [
      "Aggression is automatically reinforced because it occurs during independent work",
      "Aggression is maintained by escape and the antecedent condition of extended work duration is an establishing operation",
      "The RBT's break prompts are accidentally reinforcing the aggression",
      "The behavior is attention-maintained because the RBT redirects after aggression"
    ],
    correct: 1,
    rationale: "Extended non-preferred work functions as a motivating operation (establishing operation) that increases the aversiveness of demands and evokes escape behavior. The fact that aggression is prevented by proactive breaks confirms an escape function — the break removes the aversive condition. This is clinically significant because it suggests antecedent manipulation (proactive breaks) can prevent the behavior, and FCT (break requesting) is an appropriate function-based intervention.",
    domain_name: "Behavior Assessment"
  },
  {
    id: "rbt-pre-6",
    stem: "An RBT is assisting with a functional analysis. The BCBA assigns the RBT to the demand condition. During the condition, the client engages in moderate aggression. The RBT, feeling uncomfortable, lowers the difficulty of the task to reduce the client's distress. What is the clinical problem with this action?",
    options: [
      "The RBT interrupted a formal assessment procedure, potentially invalidating the demand condition results by providing unprogrammed escape",
      "The RBT acted appropriately because client welfare overrides data quality",
      "The RBT should have removed the task entirely and moved to the play condition instead",
      "There is no clinical problem — adapting to client distress is good RBT practice"
    ],
    correct: 0,
    rationale: "In the demand condition, escape from demands is the programmed consequence for problem behavior — this IS the test condition. By spontaneously lowering task difficulty, the RBT provided unprogrammed partial escape, contaminating the condition. The data from this condition would incorrectly suggest the behavior did not respond to the demand contingency. All modifications to FA conditions must come from the supervising BCBA, not the RBT independently.",
    domain_name: "Behavior Assessment"
  },
  {
    id: "rbt-pre-7",
    stem: "An RBT has been using most-to-least prompting for a client learning to wash hands. After 3 weeks, the client requires full physical guidance on all 12 steps despite daily practice. A colleague suggests switching to least-to-most to 'let the client try on their own.' Before making any change, the most appropriate RBT action is:",
    options: [
      "Switch to least-to-most immediately since the client is not progressing",
      "Continue most-to-least and increase the number of trials per session",
      "Report the lack of progress to the supervising BCBA, who will determine whether to modify the procedure",
      "Alternate between most-to-least and least-to-most on different days to find what works"
    ],
    correct: 2,
    rationale: "Changes to teaching procedures — including the prompting hierarchy — are clinical decisions that must be made by the supervising BCBA, not the RBT independently. The RBT's role is to implement procedures faithfully, collect accurate data, and communicate observations and concerns to the supervisor. Independently modifying the program, even with good intentions, violates scope of practice.",
    domain_name: "Behavior Acquisition"
  },
  {
    id: "rbt-pre-8",
    stem: "During discrete trial teaching for color identification, the RBT presents 'Touch red' with red and blue cards. The client touches blue (incorrect). Using standard error correction, the correct sequence is:",
    options: [
      "Say 'no,' remove both cards, and re-present the trial",
      "Say 'no,' point to the red card (model), prompt the client to touch red, reinforce the prompted correct response, then re-present the original trial to test independence",
      "Wait 5 seconds, then prompt the correct response without feedback on the error",
      "Reinforce the blue-touch to avoid frustration and re-present red on the next trial"
    ],
    correct: 1,
    rationale: "Standard DTT error correction: (1) deliver a correction cue (e.g., 'no'), (2) model the correct response, (3) prompt the client to produce the correct response, (4) reinforce the prompted correct response at a lower magnitude, (5) re-present the original trial to test whether the client can now respond independently. This sequence prevents reinforcing errors, provides corrective information, and includes a transfer trial.",
    domain_name: "Behavior Acquisition"
  },
  {
    id: "rbt-pre-9",
    stem: "An RBT is teaching a client to independently make a sandwich using total task chaining. The task analysis has 15 steps. After 10 sessions, the client consistently completes steps 3–7 independently but requires prompts for all other steps. What does this pattern indicate and what should the RBT do?",
    options: [
      "The client is making normal progress and the RBT should continue without changes",
      "The client has mastered the middle steps and the RBT should shift to forward chaining to focus on step 1",
      "The RBT should document which steps are mastered and which require prompts and report the data pattern to the BCBA",
      "The RBT should remove the mastered steps from the task analysis"
    ],
    correct: 2,
    rationale: "In total task chaining, data should document performance on each step across sessions. The pattern of mastered middle steps with prompted beginning and ending steps is meaningful clinical information for the BCBA to interpret and potentially modify the teaching approach. The RBT should document accurately and report to the supervisor — not independently modify the task analysis or shift chaining strategies.",
    domain_name: "Behavior Acquisition"
  },
  {
    id: "rbt-pre-10",
    stem: "An RBT has successfully taught a client to say 'I want (item)' to request 10 different food items in the therapy room. At snack time at home, the parent reports the client never uses these phrases and instead grabs food. The most likely reason for this failure and the appropriate action is:",
    options: [
      "The client does not generalize because they have an intellectual disability that prevents transfer",
      "The phrases were taught without programming for generalization across settings and people; the RBT should report this observation to the BCBA so a generalization plan can be implemented",
      "The client should be re-taught from the beginning in the home setting",
      "The parent is not reinforcing the phrases, so the RBT should implement a punishment procedure for grabbing"
    ],
    correct: 1,
    rationale: "Skill acquisition in one setting does not automatically generalize to other settings — generalization must be programmed. The failure to request at home likely reflects that the skill has clinic-specific stimulus control. The appropriate RBT action is to document the observation and report it to the BCBA, who can implement generalization programming (e.g., training across settings, involving caregivers, using varied stimuli). The RBT should not independently design or implement a generalization plan.",
    domain_name: "Behavior Acquisition"
  },
  {
    id: "rbt-pre-11",
    stem: "An RBT is implementing extinction for a client's attention-maintained screaming. After 2 days of consistent implementation in the clinic, screaming has increased significantly in both frequency and intensity. The parent calls to report that screaming has 'gotten so much worse' and wonders if the treatment is working. The most accurate explanation for the RBT to relay (after consulting the BCBA) is:",
    options: [
      "The screaming increased because the function was misidentified and the BCBA should conduct a new FBA",
      "This is an extinction burst — a predictable, temporary increase in behavior frequency and intensity when reinforcement is first withheld, which is expected and should reduce over time with consistent implementation",
      "Extinction should be stopped immediately because worsening behavior indicates the procedure is harmful",
      "The parent should begin ignoring screaming at home too, without a new plan from the BCBA"
    ],
    correct: 1,
    rationale: "An extinction burst is the expected, temporary escalation of behavior when extinction is first implemented. It does NOT indicate the function was misidentified or that the treatment is failing — it is a normal and predictable side effect. Consistent implementation across all environments and people is critical during an extinction burst. Stopping extinction during a burst reinforces the intensified behavior on an intermittent schedule, making future extinction even more difficult.",
    domain_name: "Behavior Reduction"
  },
  {
    id: "rbt-pre-12",
    stem: "A client's BIP specifies DRO with a 3-minute interval for problem behavior. The RBT has been delivering reinforcement correctly. After 6 weeks, problem behavior remains at 80% of baseline. The RBT reviews the data and notices the client's mean inter-response time (IRT) for the behavior is only 90 seconds. What does this data pattern suggest?",
    options: [
      "The DRO is working slowly and the RBT should continue without changes",
      "The 3-minute DRO interval exceeds the client's current IRT, meaning the client almost never earns reinforcement, making the procedure ineffective",
      "The reinforcer used in DRO is not motivating enough and should be changed",
      "The problem behavior is too severe for DRO and a punishment procedure should be added"
    ],
    correct: 1,
    rationale: "DRO is effective only when the interval is set at or below the client's current mean IRT — otherwise the client almost never earns reinforcement and the contingency has no practical effect. If the mean IRT is 90 seconds, a 3-minute DRO interval is approximately double the IRT, resulting in very few reinforcement deliveries. The RBT should report this analysis to the BCBA, who should reduce the interval (e.g., to 60-90 seconds initially) to make reinforcement achievable.",
    domain_name: "Behavior Reduction"
  },
  {
    id: "rbt-pre-13",
    stem: "An RBT is implementing escape extinction (continuing demands during aggression) as specified in the BIP. During a session, the client escalates to throwing a chair. According to the RBT's responsibilities in this situation, the correct immediate action is:",
    options: [
      "Continue the demand as written in the escape extinction plan — maintaining the plan is the top priority",
      "Ensure the safety of the client and others first; follow the crisis protocol as directed by the BCBA, which supersedes the standard BIP during crisis",
      "Call the BCBA immediately before taking any action",
      "End the session and document the incident"
    ],
    correct: 1,
    rationale: "Safety ALWAYS supersedes specific intervention protocols. When a client's behavior poses an immediate safety risk (chair throwing could cause injury), the RBT must ensure safety first — which may mean pausing the escape extinction procedure temporarily. This is not reinforcing escape; it is a safety override. The crisis protocol (separate from the BIP) provides specific guidance for escalated behavior. After the crisis is managed, the RBT documents and notifies the BCBA.",
    domain_name: "Behavior Reduction"
  },
  {
    id: "rbt-pre-14",
    stem: "An RBT is completing a session note after a session in which a client had a significant increase in self-injurious behavior (10 head hits compared to a typical 2-3 per session). The RBT writes: 'Client seemed really stressed today — probably due to the schedule change — and was hitting their head a lot, which was concerning.' What is wrong with this note and how should it be corrected?",
    options: [
      "The note is too short and needs more detail about the intervention",
      "The note contains subjective interpretations ('seemed really stressed,' 'probably due to schedule change') and vague language ('a lot'). It should read: 'Client engaged in 10 instances of head hitting (head to table/fist) during the 60-minute session. This is elevated compared to the previous 5-session mean of 2.4. A schedule change occurred today. BCBA was notified.'",
      "The note is appropriate because it captures the RBT's clinical observations",
      "The note should be rewritten to omit the schedule change information to protect confidentiality"
    ],
    correct: 1,
    rationale: "Session notes must use objective, observable, measurable language. The original note has multiple problems: 'seemed really stressed' is inference; 'probably due to schedule change' is speculation (not observed cause); 'a lot' is vague. The corrected note specifies frequency, topography, a comparison to baseline, and an observed contextual variable — without causally attributing the increase to the schedule change.",
    domain_name: "Documentation and Reporting"
  },
  {
    id: "rbt-pre-15",
    stem: "An RBT arrives at a client's home and notices the client has several bruises on their arms and legs. The caregiver explains the child fell while playing outside. However, the RBT notices one bruise appears to be in the pattern of finger marks. What should the RBT do?",
    options: [
      "Accept the caregiver's explanation and continue the session, documenting the bruises only if they worsen",
      "Document the observations objectively and immediately report to the supervising BCBA using the organization's mandated reporter protocol — do not investigate independently or confront the caregiver",
      "Photograph the bruises and share with colleagues to get their opinion",
      "Wait until the next supervision meeting to discuss the observation with the BCBA"
    ],
    correct: 1,
    rationale: "RBTs are mandated reporters in most jurisdictions and have a legal and ethical obligation to report suspected child abuse. The key is to report observations — not to investigate or make a diagnosis of abuse. The RBT should document objectively and immediately report to the supervising BCBA who will initiate formal reporting. Confronting the caregiver could compromise the child's safety.",
    domain_name: "Documentation and Reporting"
  },
  {
    id: "rbt-pre-16",
    stem: "An RBT works with a client whose family is deeply religious and opposes any behavior plan involving withholding of preferred items as a 'punishing approach.' The family wants a purely positive approach. The BCBA has designed a plan that includes both positive reinforcement of appropriate behavior and extinction (not giving in to tantrums). The parent is asking the RBT directly to 'just give him what he wants when he cries.' What is the most ethical response?",
    options: [
      "Comply with the parent's request since they have legal authority over the child's treatment",
      "Explain that you understand their preference and concerns, but that clinical decisions about the treatment plan are made by the BCBA, and offer to connect the parent with the BCBA to discuss their concerns and the plan rationale",
      "Implement the parent's request during home visits only, where the BCBA cannot observe",
      "Refuse to serve the family because their cultural values are incompatible with ABA"
    ],
    correct: 1,
    rationale: "The RBT is not authorized to modify the treatment plan. The appropriate response acknowledges the family's concerns (cultural responsiveness), explains the RBT's role (implementing plans as written), and facilitates communication with the BCBA (who has the authority to discuss and potentially modify the plan). Complying with unauthorized modifications harms the client by providing intermittent reinforcement for tantrums. Refusing to serve the family is discriminatory.",
    domain_name: "Ethics"
  },
  {
    id: "rbt-pre-17",
    stem: "An RBT has been working with a client for 18 months and has developed a close relationship with the family. The mother regularly shares personal problems with the RBT during sessions, and the RBT has begun offering emotional support and life advice. Recently, the mother asked the RBT to help her write a letter to her landlord about a dispute unrelated to her child's services. According to the BACB RBT Ethics Code, this situation:",
    options: [
      "Is acceptable because maintaining a warm relationship supports the therapeutic alliance",
      "Represents a multiple relationship that blurs professional boundaries and must be addressed — the RBT should not provide personal counseling or assistance with non-ABA matters, and should consult the supervising BCBA",
      "Is only problematic if the RBT charges the family for the extra assistance",
      "Is the RBT's personal decision since it occurs outside of formal session time"
    ],
    correct: 1,
    rationale: "The RBT Ethics Code prohibits multiple relationships that could impair professional objectivity or exploit the therapeutic relationship. Providing emotional counseling, personal advice, and non-ABA assistance transforms the professional relationship into something personal that creates dual relationship risks. This affects the RBT's ability to implement the BIP objectively and may lead to boundary violations. The RBT must consult the BCBA and professionally redirect the relationship back to professional boundaries.",
    domain_name: "Ethics"
  },
  {
    id: "rbt-pre-18",
    stem: "An RBT is about to implement a behavior reduction procedure in a school cafeteria where the client's peers can observe. The procedure involves blocking a repetitive hand movement and redirecting to a competing activity. The RBT's ethical obligation regarding client dignity in this situation requires:",
    options: [
      "Implementing the procedure exactly as written regardless of setting since procedural fidelity is paramount",
      "Consulting the BCBA about how to implement the procedure in a way that minimizes peer observation and preserves the client's dignity, while maintaining effectiveness",
      "Waiting until the client is alone to implement the procedure",
      "Notifying the school principal before implementing any behavior procedures in the cafeteria"
    ],
    correct: 1,
    rationale: "The RBT Ethics Code requires maintaining client dignity in all settings, including public ones. Implementing behavior procedures in ways that draw attention, cause embarrassment, or expose the client to peer ridicule violates this obligation even if the procedure is technically correct. The RBT should proactively consult the BCBA about adapting implementation for public settings. This is not optional — dignity preservation is an ethical requirement, not a preference.",
    domain_name: "Ethics"
  },
  {
    id: "rbt-pre-19",
    stem: "During a session, a new RBT correctly blocks a client's SIB (as specified in the BIP) but then says to the client: 'Stop it! You know better than that — it's bad behavior!' Which two ethical concerns does this statement raise?",
    options: [
      "None — the RBT correctly implemented response blocking and verbal feedback is helpful",
      "The verbal statement is not in the BIP (unauthorized procedure) and uses language that is judgmental and inconsistent with maintaining client dignity",
      "The verbal statement is problematic only because it may provide attention that reinforces SIB",
      "The RBT should not be speaking during crisis procedures"
    ],
    correct: 1,
    rationale: "Two distinct concerns arise: (1) Procedural integrity — the verbal reprimand was not written in the BIP. RBTs may only implement procedures as specified in the plan. (2) Client dignity — 'Stop it,' 'you know better,' and 'bad behavior' are judgmental, shaming statements that are inconsistent with the requirement to maintain client dignity and use respectful language. These concerns exist independently of whether the statement reinforces SIB.",
    domain_name: "Ethics"
  },
  {
    id: "rbt-pre-20",
    stem: "An RBT's supervising BCBA has recently reduced the frequency of supervision from weekly to monthly, citing the RBT's 'demonstrated competence.' The RBT notices that without weekly support, they are encountering clinical situations they are unsure how to handle. According to the RBT Ethics Code, the RBT's obligation in this situation is:",
    options: [
      "Accept the reduced supervision since the BCBA is the qualified clinical authority",
      "Make independent clinical decisions in supervision gaps since this demonstrates competence",
      "Communicate to the supervising BCBA that clinical situations are arising that require more frequent guidance, as RBTs must work under ongoing supervision and must seek clarification when needed",
      "Find a second BCBA to provide informal supervision"
    ],
    correct: 2,
    rationale: "The RBT Ethics Code requires RBTs to work under ongoing, direct supervision from a qualified BCBA and to seek guidance proactively when encountering situations beyond their capacity. The BACB requires a minimum supervision level (currently 5% of service hours monthly) but the RBT has a professional obligation to communicate when supervision is insufficient for the complexity of clinical situations encountered. This is not insubordination — it is ethical self-advocacy protecting client welfare.",
    domain_name: "Ethics"
  },
  {
    id: "rbt-pre-21",
    stem: "An RBT has been working with a client on mand training for 3 months. The client now spontaneously requests 25 preferred items using two-word phrases in the clinic. The BCBA asks the RBT to probe manding at the client's home and at school during the next home visit. During the home visit, the client does not produce a single mand across a 30-minute observation despite access to preferred items. The RBT should:",
    options: [
      "Re-start mand training from the beginning in the home setting as if the skill were brand new",
      "Document the probe results accurately (0 mands in 30 minutes at home) and report the generalization failure to the BCBA immediately",
      "Prompt mands during the home visit to demonstrate the skill for the parents",
      "Conclude the mand training was ineffective since skills did not generalize"
    ],
    correct: 1,
    rationale: "Accurate documentation and timely reporting are the RBT's primary obligations. The absence of manding at home is important clinical data that the BCBA needs to design generalization programming. The RBT should NOT prompt mands during a generalization probe (this contaminated the probe) and should NOT conclude the training was ineffective — lack of generalization is common and expected without explicit generalization programming. Reporting this to the BCBA is the critical next step.",
    domain_name: "Data Collection and Graphing"
  },
  {
    id: "rbt-pre-22",
    stem: "An RBT implements a DRI procedure for a client who bites their hand (hand biting is automatically reinforced). The replacement behavior being reinforced is 'holding a fidget cube.' After 4 weeks, hand biting has not decreased. A colleague suggests the DRI is failing. The most likely clinical explanation is:",
    options: [
      "DRI never works for automatically reinforced behavior",
      "Holding a fidget cube is not physically incompatible with hand biting — the client can hold the fidget cube and still bite their hand",
      "The fidget cube is not preferred enough to be a reinforcer",
      "DRI should have been paired with punishment from the start"
    ],
    correct: 1,
    rationale: "For DRI to work, the reinforced behavior must be PHYSICALLY INCOMPATIBLE with the problem behavior — meaning the client cannot do both simultaneously. Holding a fidget cube in one hand does not prevent hand biting with that hand or the other hand. A truly incompatible behavior for hand biting would be 'hands flat on thighs,' 'hands clasped together,' or 'hands occupied with a bilateral task.' This is a clinically important distinction between DRI and DRA.",
    domain_name: "Behavior Reduction"
  },
  {
    id: "rbt-pre-23",
    stem: "An RBT is conducting a session and the client's parent calls requesting a detailed update on the client's progress and asks the RBT to explain why the behavior plan includes extinction. The most appropriate response to both requests is:",
    options: [
      "Provide a full progress update and explain the extinction procedure in clinical detail since the parent has the right to know",
      "Provide brief, supportive information to address the parent's concerns, clarify that detailed clinical questions about the plan's rationale should be directed to the supervising BCBA, and offer to facilitate that conversation",
      "Decline to discuss any clinical information with the parent since all communication must go through the BCBA",
      "Tell the parent to read the behavior plan document independently"
    ],
    correct: 1,
    rationale: "RBTs can share general, supportive information with caregivers but should not provide detailed clinical interpretations, rationale for specific procedures, or progress analysis — these are the BCBA's responsibilities. The appropriate response acknowledges the parent's needs, provides appropriate general information, and facilitates connection with the BCBA for clinical discussion. Refusing all communication is too restrictive; providing full clinical interpretation exceeds scope.",
    domain_name: "Documentation and Reporting"
  },
  {
    id: "rbt-pre-24",
    stem: "An RBT is running a session when the supervising BCBA makes an unannounced observation and sees that the RBT is not following the written prompting hierarchy — the RBT is using physical prompts immediately rather than providing the specified 3-second time delay first. After the session, the BCBA provides corrective feedback. The RBT says they felt the time delay was 'frustrating the client.' What should the RBT do?",
    options: [
      "Explain the clinical rationale for the change and continue using the modified approach",
      "Thank the BCBA for the feedback, implement the written procedure as specified in the next session, and raise their observation about client frustration as a clinical question at the next supervision meeting",
      "Ask another RBT whether the time delay is appropriate before changing back",
      "Document their clinical reasoning in the session notes to protect against the BCBA's feedback"
    ],
    correct: 1,
    rationale: "RBTs must implement procedures as written by the BCBA. The appropriate response to corrective supervision feedback is to accept it professionally, implement the correction immediately, and raise clinical observations through appropriate channels (supervision meetings) rather than as a justification for unauthorized deviations during sessions.",
    domain_name: "Ethics"
  }
];
