# MunichTech EXPO — Final Devpost Copy

## Project name

OrbitResilience AI

## Try it

<https://orbitresilience-ai.onrender.com>

## Source code

<https://github.com/babifarah9/orbitresilience-ai>

## Tagline

AI-powered mission assurance for Europe's sovereign hybrid space and terrestrial networks.

## Short description

OrbitResilience AI finds, verifies, and explains sovereign recovery routes across hybrid satellite and 5G infrastructure—then requires human authorization before service restoration.

## Recommended award categories

- Grand Challenge Award
- Best Applied AI
- Best Industry & Enterprise Use Case

## Submission status

Newly created during the MunichTech EXPO 2026 hackathon period. The repository, simulation, decision engine, interface, documentation, and submission assets were created for this challenge.

## Inspiration

Europe's critical services increasingly depend on both terrestrial and space infrastructure. A flood, cyber incident, fibre cut, gateway outage, or interference event can create a multi-domain failure that is too complex for a human operator to resolve quickly by inspecting dashboards one at a time. Europe needs connectivity that is not only available, but sovereign, explainable, and resilient under pressure.

OrbitResilience AI was inspired by practical challenges at the intersection of satellite communications, 5G/6G, network architecture, AI, and the European space ecosystem.

## What it does

OrbitResilience AI is a digital twin and decision system for a hybrid LEO/MEO, gateway, fibre, and private-5G network. In the demonstration, a Frankfurt gateway outage, RF interference affecting LEO-27, and degraded Munich fibre threaten emergency communications simultaneously.

The system detects the correlated incident, enumerates feasible recovery paths, estimates link risk, and ranks routes by latency, capacity, security risk, and European sovereignty policy. An independent assurance gate then verifies the selected route against hard requirements. Only after the route passes does the interface ask a human operator to authorize recovery. Every important step is written to an explainable audit trail.

## How we built it

The working prototype is implemented in dependency-free HTML, CSS, and JavaScript so it can run locally, offline, or on any static host without cloud cost.

The digital twin is a graph whose nodes represent satellites, secure relays, European gateways, terrestrial access, and an emergency 5G network. A path-enumeration engine generates feasible routes around failed nodes. An interpretable logistic model, calibrated for synthetic scenarios, estimates link risk from congestion, interference, cyber anomaly, degraded infrastructure, and baseline risk. A multi-objective function weighs risk, latency, capacity, and sovereignty. Policy-as-code rejects any route containing infrastructure outside the approved jurisdiction.

The assurance layer is intentionally separate from route selection. It checks four hard conditions: latency at or below the mission threshold, sufficient residual capacity, predicted risk below the limit, and full sovereignty compliance. Passing the assurance gate creates a recommendation, not an automatic action: the operator must authorize it.

## Challenges we ran into

The main design challenge was avoiding a black-box "AI chooses a route" demonstration. A critical-infrastructure system must explain rejected alternatives, distinguish optimization from assurance, and preserve human accountability. We therefore combined a statistical risk estimate with deterministic graph and policy checks and exposed every decision in the UI.

Another challenge was balancing technical depth with a clear two-minute demonstration. The final scenario reduces a complex multi-domain recovery problem to a visible sequence: crisis, alternatives, policy rejection, assurance, authorization, and restored service.

## Accomplishments that we're proud of

- A functioning hybrid space/terrestrial digital twin rather than a slide mock-up.
- Real graph path enumeration and multi-objective scoring in the browser.
- An explainable risk model whose features and coefficients are visible in source.
- Deterministic sovereignty policy and independent assurance checks.
- Human authorization and a timestamped audit receipt.
- A zero-cost, no-login design that can be demonstrated reliably.

## What we learned

Resilience is not equivalent to choosing the shortest backup route. A credible recovery decision must combine probabilistic risk, hard policy, mission thresholds, and accountable authorization. We also learned that an assurance gate becomes far more useful when it explains both why the winning route passed and why competing routes failed.

## What's next

Next steps include ingesting public orbital elements and live network telemetry, using time-expanded routing for moving constellations, adding anti-jamming and cyber-anomaly models, formalizing policy packs for different European missions, replaying incidents, and connecting the simulator to standards-based network and satellite testbeds. A production version could support operators, governments, emergency networks, transportation systems, and critical-infrastructure providers.

## Built with

HTML5, CSS3, JavaScript, graph optimization, logistic regression, policy-as-code, digital-twin simulation, human-in-the-loop mission assurance.

## Testing instructions

1. Open <https://orbitresilience-ai.onrender.com> in a desktop browser.
2. Confirm the baseline shows **HEALTHY**, **11 / 11** active nodes, **100%** critical traffic, and sovereignty **ENFORCED**.
3. Click **Simulate Crisis** and wait approximately five seconds for the decision sequence to finish.
4. Review the highlighted recovery path and the assurance gate. The selected path should be **Munich 5G → Vienna Gateway → LEO-22 → LEO-17 → Madrid Gateway**.
5. Scroll to the candidate table to see the selected 41 ms route and rejected alternatives, including a non-European route rejected by policy and longer routes rejected by latency.
6. Click **Authorize Recovery**. The mission status changes to **RESTORED**, critical traffic returns to **100%**, and a timestamped decision receipt is created.

No account, API key, installation, or proprietary data is required.

## Demo video

The final video URL will be added here after the narrated recording is uploaded. The timed script and shot plan are available in [DEMO_VIDEO.md](DEMO_VIDEO.md).

## Disclosure

This project uses synthetic topology and telemetry and does not control operational infrastructure. It is an independent concept and is not affiliated with or endorsed by ESA, the EU, IRIS², or any satellite operator.
