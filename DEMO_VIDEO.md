# OrbitResilience AI — 2:35 Demo Video Plan

## Recording setup

- Record at 1080p or higher in Chrome.
- Use the live build: <https://orbitresilience-ai.onrender.com>
- Hide bookmarks, unrelated tabs, notifications, and the mouse pointer when it is not demonstrating an action.
- Set browser zoom to 80–90% so the topology and decision engine remain visible together.
- Begin from a fresh page load showing the healthy baseline.
- Speak naturally at approximately 140 words per minute. Target runtime: 2 minutes 30–40 seconds.

## Timed shot list and narration

| Time | On-screen action | Narration |
|---|---|---|
| 0:00–0:12 | Show the hero title and healthy status cards. | **This is OrbitResilience AI: mission assurance for Europe's sovereign hybrid satellite and 5G networks.** |
| 0:12–0:31 | Keep the topology and Recovery Orchestrator visible. | **When a gateway, satellite link, and terrestrial network fail together, an operations team may face many recovery choices. The fastest route may violate sovereignty requirements, while the safest route may miss the mission's latency target.** |
| 0:31–0:48 | Point to HEALTHY, 11/11, 100%, and ENFORCED. | **The digital twin begins in a healthy state. Eleven nodes are active, Munich's emergency network has full service, and European routing policy is enforced. The topology combines LEO and MEO assets, European gateways, fibre, and private 5G.** |
| 0:48–0:52 | Click **Simulate Crisis**. | **Now I will trigger a multi-fault crisis.** |
| 0:52–1:15 | Let the four analysis steps animate without clicking anything. | **Frankfurt goes offline, LEO-27 experiences interference, and Munich fibre degrades. Critical traffic falls to forty-one percent. The engine correlates the incidents, enumerates feasible graph paths, applies sovereignty policy, and independently verifies the recommendation.** |
| 1:15–1:40 | Show the highlighted cyan route and assurance box. | **The selected route carries traffic from Munich 5G through Vienna, LEO-22, LEO-17, and the Madrid gateway. It delivers forty-one millisecond latency, sixty-nine percent residual capacity, and twenty-six percent modeled risk. All four assurance conditions pass.** |
| 1:40–2:03 | Scroll to the candidate table. Pause over Routes B and C. | **The decision is explainable. Route B is rejected because it crosses a non-European gateway, even though its raw performance is competitive. Routes C and D remain sovereign, but exceed the forty-eight millisecond latency limit. OrbitResilience therefore does not simply choose the shortest or highest-capacity path.** |
| 2:03–2:18 | Return to the decision panel and point to **Authorize Recovery**. | **Passing the assurance gate creates a recommendation, not an automatic command. A human operator remains accountable for the final reconfiguration.** |
| 2:18–2:22 | Click **Authorize Recovery**. | **I will authorize recovery now.** |
| 2:22–2:37 | Show **RESTORED**, 100%, Service restored, and the receipt. | **Critical service returns to one hundred percent, the sovereign path stays highlighted, and the system issues a timestamped decision receipt for audit and review.** |
| 2:37–2:45 | End on the topology and project title. | **OrbitResilience AI helps Europe keep critical connectivity operating when infrastructure fails—through interpretable AI, policy-as-code, independent assurance, and human control.** |

## Recording checklist

- The video shows the working application, not presentation slides.
- The crisis animation is allowed to complete before scrolling.
- Route A, Route B's policy rejection, and Route C's latency rejection are readable.
- The **Authorize Recovery** click is visible.
- The restored state and decision receipt remain on screen for at least three seconds.
- The final export is 1080p, 30 fps, with clear narration and no background music competing with the voice.

## Suggested video title

**OrbitResilience AI — Sovereign Space + 5G Mission Assurance | MunichTech EXPO 2026**

## Suggested video description

OrbitResilience AI is an explainable decision and assurance platform for Europe's hybrid satellite and 5G infrastructure. This working prototype simulates simultaneous gateway, interference, and terrestrial-network failures; evaluates sovereign recovery routes; verifies mission constraints; and requires human authorization before restoring critical service.

Live demo: https://orbitresilience-ai.onrender.com

Source code: https://github.com/babifarah9/orbitresilience-ai

Built for the MunichTech EXPO 2026 hackathon. Independent concept; not affiliated with or endorsed by ESA, the EU, IRIS², or any satellite operator.
