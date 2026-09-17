# OrbitResilience AI

**AI-powered mission assurance for Europe's sovereign hybrid satellite and 5G networks.**

## Live demo

[Launch OrbitResilience AI](https://orbitresilience-ai.onrender.com)

OrbitResilience AI is a dependency-free web prototype created for the MunichTech EXPO 2026 hackathon. It demonstrates how critical communications can recover from simultaneous satellite, gateway, and terrestrial-network failures while preserving European routing policy and keeping a human accountable for the final action.

## Why it matters

Europe is investing in secure, resilient connectivity across space and terrestrial infrastructure. During a disaster, cyber incident, interference event, or gateway outage, a network operations team may have hundreds of recovery choices. The fastest route may violate sovereignty requirements; the safest may fail a latency target; the highest-capacity path may be compromised.

OrbitResilience AI turns that decision into an explainable, verifiable workflow:

1. Detect and classify correlated infrastructure failures.
2. Enumerate feasible routes through a hybrid LEO/MEO, gateway, fibre, and private-5G graph.
3. Estimate route risk with an interpretable logistic model calibrated for synthetic incident scenarios.
4. Rank alternatives across latency, capacity, risk, and sovereignty.
5. Independently test the recommendation through an assurance gate.
6. Require explicit human authorization before reconfiguration.
7. Preserve an auditable decision receipt.

## Demo scenario

Click **Simulate Crisis** to trigger:

- Frankfurt gateway offline;
- LEO-27 RF interference;
- Munich terrestrial fibre degraded; and
- critical hospital and emergency traffic at risk.

The optimizer evaluates graph paths, rejects unsafe or non-sovereign alternatives, selects an approved route, and checks latency, capacity, risk, and EU-only routing. The route is not activated until the operator clicks **Authorize Recovery**.

## Technical implementation

- **Digital twin:** a client-side graph representing LEO, MEO, gateways, fibre, and 5G access.
- **Graph optimizer:** depth-limited simple-path enumeration followed by multi-objective route scoring.
- **Risk model:** logistic inference over congestion, interference, cyber anomaly, degraded-node, and baseline-risk features.
- **Sovereignty engine:** deterministic policy-as-code requiring every selected node to be approved EU infrastructure.
- **Assurance gate:** independent threshold checks for latency, capacity, predicted risk, and policy compliance.
- **Human decision gate:** no simulated recovery is executed without an explicit authorization action.
- **Explainability:** candidate table, rejection reason, network visualization, and timestamped audit trail.

This MVP uses synthetic topology and telemetry. It requires no API keys, external services, proprietary data, or production network access.

## Run locally

```bash
git clone https://github.com/babifarah9/orbitresilience-ai.git
cd orbitresilience-ai
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Deploy

The repository is deployed as a Render static site with automatic deployment from `main`. It can also run on GitHub Pages, Cloudflare Pages, Netlify, Vercel, or any static web server. No build command is required; the publish directory is the repository root.

## Responsible scope

This is a hackathon proof of concept, not an operational network controller. A production implementation would require validated telemetry adapters, authenticated and authorized control interfaces, adversarial testing, safety cases, policy governance, and operator-specific certification.

OrbitResilience AI is an independent concept and is not affiliated with or endorsed by ESA, the European Union, IRIS², or any satellite operator.

## License

MIT License. See [LICENSE](LICENSE).

## Submission assets

- [Final Devpost copy](DEVPOST.md)
- [Timed demo-video plan](DEMO_VIDEO.md)
- [Narration-only script](VOICEOVER.txt)
