"use strict";

const nodes = {
  leo11:{label:"LEO-11",eu:true}, leo17:{label:"LEO-17",eu:true}, leo22:{label:"LEO-22",eu:true}, leo27:{label:"LEO-27",eu:true},
  meo03:{label:"MEO-03",eu:true}, madrid:{label:"Madrid GW",eu:true}, frankfurt:{label:"Frankfurt GW",eu:true}, vienna:{label:"Vienna GW",eu:true},
  external:{label:"External GW",eu:false}, fiber:{label:"Munich Fibre",eu:true}, munich:{label:"Munich 5G",eu:true}
};

const edges = [
  ["madrid","leo11",13,74,.08],["madrid","leo17",16,69,.11],["frankfurt","leo17",12,86,.06],["frankfurt","leo22",13,83,.07],
  ["vienna","leo22",11,81,.06],["vienna","leo27",14,68,.10],["external","leo27",10,91,.07],["leo11","meo03",12,72,.09],
  ["leo17","meo03",10,76,.07],["leo22","meo03",9,79,.06],["leo27","meo03",11,65,.12],["leo11","leo17",6,64,.07],
  ["leo17","leo22",7,71,.06],["leo22","leo27",6,67,.08],["frankfurt","fiber",8,92,.04],["vienna","munich",7,72,.05],
  ["external","meo03",12,74,.09],["external","munich",9,88,.06],["fiber","munich",4,96,.02]
].map(([a,b,latency,capacity,risk])=>({a,b,latency,capacity,risk}));

const state = {crisis:false,restored:false,failed:new Set(),degraded:new Set(),selected:null,candidates:[]};
const $ = id => document.getElementById(id);
const sleep = ms => new Promise(resolve=>setTimeout(resolve,ms));

function nodeCenter(id){
  const el = $("node-"+id), map=$("networkMap");
  const nr=el.getBoundingClientRect(), mr=map.getBoundingClientRect();
  return {x:(nr.left+nr.width/2-mr.left)/mr.width*900,y:(nr.top+nr.height/2-mr.top)/mr.height*490};
}

function edgeKey(a,b){return [a,b].sort().join("|");}

function drawLinks(activePath=[]){
  const svg=$("links"); svg.innerHTML="";
  const activeEdges=new Set(activePath.slice(0,-1).map((n,i)=>edgeKey(n,activePath[i+1])));
  edges.forEach(edge=>{
    const p1=nodeCenter(edge.a),p2=nodeCenter(edge.b),line=document.createElementNS("http://www.w3.org/2000/svg","line");
    line.setAttribute("x1",p1.x);line.setAttribute("y1",p1.y);line.setAttribute("x2",p2.x);line.setAttribute("y2",p2.y);
    let cls="link";
    if(activeEdges.has(edgeKey(edge.a,edge.b))) cls+=" active";
    else if(state.failed.has(edge.a)||state.failed.has(edge.b)) cls+=" failed";
    else if(state.degraded.has(edge.a)||state.degraded.has(edge.b)) cls+=" degraded";
    line.setAttribute("class",cls);svg.appendChild(line);
  });
}

function neighbors(id){
  return edges.flatMap(e=>e.a===id?[{id:e.b,edge:e}]:e.b===id?[{id:e.a,edge:e}]:[]);
}

function enumeratePaths(start,end,maxHops=6){
  const results=[];
  function walk(current,path,usedEdges){
    if(path.length>maxHops+1) return;
    if(current===end){results.push({path:[...path],edges:[...usedEdges]});return;}
    for(const next of neighbors(current)){
      if(path.includes(next.id)||state.failed.has(next.id)) continue;
      walk(next.id,[...path,next.id],[...usedEdges,next.edge]);
    }
  }
  walk(start,[start],[]);return results;
}

// A compact, deterministic logistic-regression risk model. Coefficients are calibrated for
// synthetic scenarios using congestion, interference, cyber anomaly, and node-health features.
function predictEdgeRisk(edge){
  const congestion=Math.max(0,(80-edge.capacity)/80);
  const interference=(edge.a==="leo27"||edge.b==="leo27")&&state.crisis?1:0;
  const cyber=(edge.a==="external"||edge.b==="external")?.55:0;
  const degraded=(state.degraded.has(edge.a)||state.degraded.has(edge.b))?1:0;
  const z=-3.05+2.2*congestion+2.8*interference+1.9*cyber+2.4*degraded+4.1*edge.risk;
  return 1/(1+Math.exp(-z));
}

function scorePaths(){
  const all=enumeratePaths("munich","madrid",6);
  const unique=new Map();
  all.forEach(item=>{
    const key=item.path.join(">");
    const latency=item.edges.reduce((s,e)=>s+e.latency,0);
    const capacity=Math.min(...item.edges.map(e=>e.capacity));
    const risk=1-item.edges.reduce((safe,e)=>safe*(1-predictEdgeRisk(e)),1);
    const sovereign=item.path.every(id=>nodes[id].eu);
    const meetsLatency=latency<=48,meetsCapacity=capacity>=55,meetsRisk=risk<=.36;
    const score=(latency/48)*.35+risk*.4+((100-capacity)/100)*.25+(sovereign?0:1.5);
    unique.set(key,{...item,latency,capacity,risk,sovereign,meetsLatency,meetsCapacity,meetsRisk,score});
  });
  const viable=[...unique.values()].filter(x=>x.sovereign&&x.meetsLatency&&x.meetsCapacity&&x.meetsRisk).sort((a,b)=>a.score-b.score);
  const rejected=[...unique.values()].filter(x=>!viable.includes(x)).sort((a,b)=>a.score-b.score);
  const shortlist=[];
  const add=item=>{if(item&&!shortlist.includes(item))shortlist.push(item);};
  add(viable[0]);
  add(rejected.find(x=>!x.sovereign));
  add(rejected.find(x=>x.sovereign&&!x.meetsLatency));
  add(rejected.find(x=>x.sovereign&&x.meetsLatency&&!x.meetsRisk));
  rejected.forEach(add);
  return shortlist.slice(0,4);
}

function routeReason(r){
  if(!r.sovereign)return "REJECT · POLICY";
  if(!r.meetsLatency)return "REJECT · LATENCY";
  if(!r.meetsRisk)return "REJECT · RISK";
  if(!r.meetsCapacity)return "REJECT · CAPACITY";
  return "SELECT";
}

function formatPath(path){return path.map(id=>nodes[id].label).join(" → ");}
function time(){return new Date().toISOString().slice(11,19);}
function audit(message){
  const li=document.createElement("li");li.innerHTML=`<time>${time()}</time><p>${message}</p>`;$("auditLog").prepend(li);
}

function renderCandidates(){
  $("candidateStamp").textContent="CRISIS ANALYSIS";
  $("candidateRows").innerHTML=state.candidates.map((r,i)=>{
    const decision=routeReason(r),selected=decision==="SELECT";
    return `<tr class="${selected?"selected":""}"><td>Route ${String.fromCharCode(65+i)}</td><td>${formatPath(r.path)}</td><td>${r.latency} ms</td><td>${Math.round(r.risk*100)}%</td><td>${r.capacity}%</td><td><span class="pill ${r.sovereign?"pass":"reject"}">${r.sovereign?"✓ PASS":"✕ FAIL"}</span></td><td><span class="pill ${selected?"selected-pill":"reject"}">${decision}</span></td></tr>`;
  }).join("");
}

function setNodeStates(){
  Object.keys(nodes).forEach(id=>{
    const el=$("node-"+id);el.classList.remove("failed","degraded","active-route");
    if(state.failed.has(id))el.classList.add("failed");
    if(state.degraded.has(id))el.classList.add("degraded");
    if(state.selected?.path.includes(id))el.classList.add("active-route");
  });
}

async function simulate(){
  if(state.crisis)return;
  state.crisis=true;$("crisisBtn").classList.add("running");$("crisisBtn").textContent="Analyzing crisis…";
  state.failed=new Set(["frankfurt","leo27"]);state.degraded=new Set(["fiber"]);
  $("missionStatus").textContent="CRITICAL";$("missionStatus").className="danger";$("missionSub").textContent="Multi-fault event in progress";
  $("activeNodes").textContent="9 / 11";$("criticalTraffic").textContent="41%";$("criticalTraffic").className="warning";
  $("incidentBadge").classList.remove("hidden");setNodeStates();drawLinks();
  $("idleState").classList.add("hidden");$("analysisState").classList.remove("hidden");
  audit("Incident correlation engine opened <b>OR-INC-260917</b> for three simultaneous faults.");
  await sleep(650);$("step2").classList.add("active");
  state.candidates=scorePaths();$("routeCountText").textContent=`${enumeratePaths("munich","madrid",6).length} feasible paths evaluated`;
  audit("Graph optimizer enumerated feasible routes and applied multi-objective scoring.");renderCandidates();
  await sleep(700);$("step3").classList.add("active");audit("Sovereignty engine rejected paths containing non-approved infrastructure.");
  await sleep(700);$("step4").classList.add("active");state.selected=state.candidates.find(r=>routeReason(r)==="SELECT");
  audit(`Independent assurance verified <b>${formatPath(state.selected.path)}</b>.`);setNodeStates();drawLinks(state.selected.path);
  await sleep(600);showRecommendation();
}

function showRecommendation(){
  $("analysisState").classList.add("hidden");$("recommendState").classList.remove("hidden");
  const i=state.candidates.indexOf(state.selected);$("selectedRouteName").textContent=`Route ${String.fromCharCode(65+i)}`;
  $("routeFlow").innerHTML=state.selected.path.map((id,i)=>`<span>${nodes[id].label}</span>${i<state.selected.path.length-1?"<i>→</i>":""}`).join("");
  $("assuranceChecks").innerHTML=[`Latency ${state.selected.latency} ms ≤ 48 ms`,`Capacity ${state.selected.capacity}% ≥ 55%`,`Risk ${Math.round(state.selected.risk*100)}% ≤ 36%`,`EU policy satisfied`].map(x=>`<li>${x}</li>`).join("");
}

function authorize(){
  state.restored=true;$("recommendState").classList.add("hidden");$("restoredState").classList.remove("hidden");
  $("missionStatus").textContent="RESTORED";$("missionStatus").className="ok";$("missionSub").textContent="Protected sovereign route active";
  $("criticalTraffic").textContent="100%";$("criticalTraffic").className="ok";$("incidentBadge").classList.add("hidden");
  const id=`OR-${new Date().toISOString().replace(/\D/g,"").slice(2,14)}`;$("receiptId").textContent=id;
  audit(`Human operator authorized recovery. Immutable decision receipt <b>${id}</b> issued.`);
  $("crisisBtn").textContent="Recovery Active";
}

function reset(){location.reload();}
function clock(){$("utcClock").textContent=new Date().toUTCString().slice(17,25)+" UTC";}

$("crisisBtn").addEventListener("click",simulate);$("resetBtn").addEventListener("click",reset);$("authorizeBtn").addEventListener("click",authorize);
window.addEventListener("resize",()=>drawLinks(state.selected?.path||[]));window.addEventListener("load",()=>drawLinks());
clock();setInterval(clock,1000);

// Expose deterministic internals for lightweight automated verification.
window.OrbitResilience={enumeratePaths,predictEdgeRisk,scorePaths,state};
