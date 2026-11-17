/* ============================================================
   MOKAYA PRO — DATA SCIENCE ACADEMY  •  App Logic
   ============================================================ */
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const TOTAL_TOPICS = UNITS.reduce((a,u)=>a+u.topics.length,0);

let progress = JSON.parse(localStorage.getItem('mokaya_progress') || '{}');
let quizBest = JSON.parse(localStorage.getItem('mokaya_quiz_best') || 'null');
let capChecklist = JSON.parse(localStorage.getItem('mokaya_capstone') || '{}');
let charts = {};
let pyodideReady = null;
let currentLang = 'python';
let courseFilter = 'all';
let projectFilter = 'all';

function saveProgress(){ localStorage.setItem('mokaya_progress', JSON.stringify(progress)); updateTopProgress(); }
function doneCount(){ return Object.values(progress).filter(Boolean).length; }
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.remove('hidden'); setTimeout(()=>t.classList.add('hidden'),2600); }
function updateTopProgress(){
  const n = doneCount(), pct = Math.round(n/TOTAL_TOPICS*100);
  $('#topProgressText').textContent = `${n} / ${TOTAL_TOPICS} topics`;
  const ring = $('#topProgressRing');
  ring.style.background = `conic-gradient(var(--primary) ${pct}%, var(--line) ${pct}%)`;
  ring.innerHTML = `<span>${pct}%</span>`;
}
function findTopic(id){ for(const u of UNITS){ const t=u.topics.find(t=>t.id===id); if(t) return {unit:u, topic:t}; } return null; }
function destroyCharts(){ Object.values(charts).forEach(c=>{ try{c.destroy()}catch(e){} }); charts={}; }

/* ================= ROUTER ================= */
function router(){
  const hash = location.hash.replace('#/','') || 'dashboard';
  const [page, param] = hash.split('/');
  $$('#sideNav a').forEach(a=>a.classList.toggle('active', a.dataset.route===page || (page==='course'&&a.dataset.route==='course')));
  $('#sidebar').classList.remove('open');
  destroyCharts();
  const main = $('#main');
  window.scrollTo({top:0});
  if(page==='dashboard') main.innerHTML = viewDashboard();
  else if(page==='course') main.innerHTML = viewCourse();
  else if(page==='playground') { main.innerHTML = viewPlayground(); initPlayground(); }
  else if(page==='projects') main.innerHTML = viewProjects();
  else if(page==='final-project') { main.innerHTML = viewFinalProject(); initFinalProject(); }
  else if(page==='resources') main.innerHTML = viewResources();
  else if(page==='quiz') main.innerHTML = viewQuiz();
  else if(page==='teacher') main.innerHTML = viewTeacher();
  else main.innerHTML = viewDashboard();
  afterRender(page, param);
}
function afterRender(page, param){
  if(page==='course' && param){ const el=document.getElementById(param); if(el){ el.classList.add('open'); el.scrollIntoView({behavior:'smooth'}); } }
  if(page==='dashboard') initDashboardCharts();
}
window.addEventListener('hashchange', router);

/* ================= DASHBOARD ================= */
function viewDashboard(){
  const n = doneCount(), pct = Math.round(n/TOTAL_TOPICS*100);
  const next = nextTopic();
  return `
  <section class="hero">
    <div class="badge" style="background:rgba(255,255,255,.15);color:#fff">🎓 DS 301 • ${COURSE_META.semester} • ${COURSE_META.credits} Credits</div>
    <h1>Karibu! Your Data Science Journey Starts Here 🚀</h1>
    <p>${COURSE_META.title} — a complete school course in one web app. ${UNITS.length} units, ${TOTAL_TOPICS} topics, live coding playground, 12 mini projects and a full capstone final project. Taught by ${COURSE_META.lecturer}.</p>
    <div class="hero-actions">
      <a class="btn btn-primary" href="#/course">📚 Continue Learning</a>
      <a class="btn btn-outline" href="#/playground">💻 Open Playground</a>
      <a class="btn btn-outline" href="#/final-project">🎓 See Final Project</a>
    </div>
  </section>

  <div class="stats-grid">
    <div class="stat"><div class="num">${UNITS.length}</div><div class="lbl">Units</div></div>
    <div class="stat"><div class="num">${TOTAL_TOPICS}</div><div class="lbl">Topics</div></div>
    <div class="stat"><div class="num">${UNITS.reduce((a,u)=>a+u.hours,0)}h</div><div class="lbl">Contact Hours</div></div>
    <div class="stat"><div class="num">${MINI_PROJECTS.length}</div><div class="lbl">Mini Projects</div></div>
    <div class="stat"><div class="num">${QUIZ.length}</div><div class="lbl">Quiz Questions</div></div>
    <div class="stat"><div class="num">${RESOURCES.length}</div><div class="lbl">References</div></div>
  </div>

  <div class="grid-2">
    <div class="card">
      <h3>📈 Your Progress — ${pct}% Complete</h3>
      <div class="progress-track" style="margin:12px 0"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p style="color:var(--muted);font-size:14px">${n} of ${TOTAL_TOPICS} topics completed.${quizBest!==null?` Best quiz score: <strong>${quizBest}%</strong>.`:''}</p>
      ${UNITS.map(u=>{
        const d=u.topics.filter(t=>progress[t.id]).length;
        return `<div style="margin-top:10px"><div style="display:flex;justify-content:space-between;font-size:13px;font-weight:600"><span>${u.icon} Unit ${u.number}: ${esc(u.title)}</span><span>${d}/${u.topics.length}</span></div><div class="progress-track" style="height:7px;margin-top:4px"><div class="progress-fill" style="width:${d/u.topics.length*100}%"></div></div></div>`;
      }).join('')}
    </div>
    <div class="card">
      <h3>▶️ ${next ? 'Up Next for You' : '🎉 Course Complete!'}</h3>
      ${next ? `
        <p style="color:var(--muted);font-size:13px;margin:6px 0">Unit ${next.unit.number} • ${next.unit.weeks} • ${next.topic.duration}</p>
        <h4 style="font-size:18px;margin-bottom:6px">${esc(next.topic.title)}</h4>
        <p style="color:var(--muted);font-size:14px;margin-bottom:14px">${esc(next.topic.preview)}</p>
        <button class="btn btn-primary" onclick="openTopic('${next.topic.id}')">Start Topic →</button>
      ` : `<p style="color:var(--muted);margin:10px 0">Hongera! You finished all topics. Head to the <a href="#/final-project">Final Project</a> to graduate 🎓</p>`}
      <h4 style="margin:18px 0 8px">📊 Class Snapshot (Sample Data)</h4>
      <div class="chart-box-sm"><canvas id="dashChart"></canvas></div>
    </div>
  </div>

  <h2 class="section-title">🗺️ Course Roadmap — 10 Units</h2>
  <p class="section-sub">Click any unit to expand its topics, previews and tutorial links.</p>
  <div class="grid-3">
    ${UNITS.map(u=>`
      <div class="card project-card">
        <div style="display:flex;gap:10px;align-items:center">
          <span class="unit-icon" style="background:${u.color};width:44px;height:44px;font-size:22px">${u.icon}</span>
          <div><small style="color:var(--muted);font-weight:700">UNIT ${u.number} • ${u.weeks}</small><h3>${esc(u.title)}</h3></div>
        </div>
        <p>${esc(u.preview)}</p>
        <div class="skill-row">${u.subjects.map(s=>`<span class="skill">${esc(s)}</span>`).join('')}</div>
        <div class="project-links"><a class="btn btn-outline btn-sm" href="#/course/${u.id}">View ${u.topics.length} topics →</a></div>
      </div>`).join('')}
  </div>

  <h2 class="section-title">🛠️ Featured Mini Projects</h2>
  <p class="section-sub">Small projects that prove each subtopic — each with a live Vercel demo link.</p>
  <div class="grid-3">
    ${MINI_PROJECTS.slice(0,6).map(projectCard).join('')}
  </div>
  <div style="text-align:center;margin-top:16px"><a class="btn btn-outline" href="#/projects">View all ${MINI_PROJECTS.length} mini projects →</a></div>

  <div class="footer">Mokaya Pro • Data Science Academy • Lecturer: ${COURSE_META.lecturer} • Meru, Kenya 🇰🇪 • Deployed on Vercel 🚀</div>`;
}
function nextTopic(){ for(const u of UNITS){ for(const t of u.topics){ if(!progress[t.id]) return {unit:u, topic:t}; } } return null; }
function initDashboardCharts(){
  const ctx = $('#dashChart'); if(!ctx || typeof Chart==='undefined') return;
  const bins = [0,0,0,0,0,0,0,0,0,0];
  SAMPLE_STUDENTS.forEach(s=>{ bins[Math.min(9, Math.floor(s.score/10))]++; });
  charts.dash = new Chart(ctx, { type:'bar', data:{ labels:['0s','10s','20s','30s','40s','50s','60s','70s','80s','90s'], datasets:[{label:'Students', data:bins, backgroundColor:'#2563eb', borderRadius:6}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}} } });
}

/* ================= COURSE ================= */
function viewCourse(){
  return `
  <h2 class="section-title">📚 My Course — All Units, Topics & Previews</h2>
  <p class="section-sub">${COURSE_META.title} • ${COURSE_META.duration} • ${COURSE_META.prerequisites}</p>
  <div class="filter-bar">
    <button class="chip ${courseFilter==='all'?'active':''}" onclick="setCourseFilter('all')">All Languages</button>
    <button class="chip ${courseFilter==='Python'?'active':''}" onclick="setCourseFilter('Python')">🐍 Python</button>
    <button class="chip ${courseFilter==='SQL'?'active':''}" onclick="setCourseFilter('SQL')">🗄️ SQL</button>
    <button class="chip ${courseFilter==='JavaScript'?'active':''}" onclick="setCourseFilter('JavaScript')">⚡ JavaScript</button>
    <span style="margin-left:auto;font-size:13px;color:var(--muted)">${doneCount()}/${TOTAL_TOPICS} completed</span>
  </div>
  ${UNITS.map(u=>unitBlock(u)).join('')}
  <div class="footer">Tip: click a topic title to open its full preview, tutorial links, code example and project task.</div>`;
}
function unitBlock(u){
  const d = u.topics.filter(t=>progress[t.id]).length;
  const topics = u.topics.filter(t=>courseFilter==='all'||t.language===courseFilter);
  if(courseFilter!=='all' && topics.length===0) return '';
  return `
  <div class="unit" id="${u.id}">
    <div class="unit-head" onclick="this.parentElement.classList.toggle('open')">
      <span class="unit-icon" style="background:${u.color}">${u.icon}</span>
      <div><h3>Unit ${u.number}: ${esc(u.title)}</h3><p>${u.weeks} • ${u.hours} hrs • ${d}/${u.topics.length} done</p></div>
      <span class="chev">⌄</span>
    </div>
    <div class="unit-body">
      <p style="color:var(--muted);margin-bottom:10px">${esc(u.preview)}</p>
      <div class="unit-meta">
        ${u.subjects.map(s=>`<span class="badge badge-lang">${esc(s)}</span>`).join('')}
      </div>
      <div class="callout"><strong>🎯 Learning outcomes:</strong> ${u.outcomes.map(esc).join(' • ')}</div>
      ${topics.map((t,i)=>`
        <div class="topic-row ${progress[t.id]?'done':''}">
          <span class="t-num">${progress[t.id]?'✓':u.number+'.'+(i+1)}</span>
          <div style="min-width:0"><h4>${esc(t.title)}</h4><p>${esc(t.preview.slice(0,110))}… • ${t.duration}</p></div>
          <div class="actions">
            <span class="badge ${t.difficulty==='Beginner'?'badge-beginner':t.difficulty==='Intermediate'?'badge-intermediate':'badge-advanced'}">${t.difficulty}</span>
            <span class="badge ${t.language==='SQL'?'badge-sql':t.language==='JavaScript'?'badge-js':'badge-lang'}">${t.language}</span>
            <button class="btn btn-primary btn-sm" onclick="openTopic('${t.id}')">Open</button>
          </div>
        </div>`).join('')}
    </div>
  </div>`;
}
function setCourseFilter(f){ courseFilter=f; router(); }

/* ================= TOPIC MODAL ================= */
function openTopic(id){
  const found = findTopic(id); if(!found) return;
  const {unit, topic} = found;
  const done = !!progress[id];
  $('#topicModalBody').innerHTML = `
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">
      <span class="badge badge-lang">Unit ${unit.number} • ${esc(unit.title)}</span>
      <span class="badge ${topic.difficulty==='Beginner'?'badge-beginner':topic.difficulty==='Intermediate'?'badge-intermediate':'badge-advanced'}">${topic.difficulty}</span>
      <span class="badge badge-lang">${topic.language}</span>
      <span class="badge badge-todo">⏱ ${topic.duration}</span>
    </div>
    <h2>${esc(topic.title)}</h2>
    <p class="preview">${esc(topic.preview)}</p>
    <h3>🎯 Learning Objectives</h3>
    <ul class="obj-list">${topic.objectives.map(o=>`<li>${esc(o)}</li>`).join('')}</ul>
    <h3>📺 Tutorial Links & References</h3>
    ${topic.tutorials.map(t=>`<a class="tut-link" href="${t.url}" target="_blank" rel="noopener"><span><strong>${esc(t.title)}</strong><br><small>${esc(t.url)}</small></span><span class="badge badge-lang">${esc(t.type)} ↗</span></a>`).join('')}
    <h3>💻 Code Example (${esc(topic.language)})</h3>
    <div class="code-block">${esc(topic.code)}</div>
    <div class="callout green"><strong>🛠️ Small Project Task:</strong> ${esc(topic.task)}</div>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px">
      <button class="btn ${done?'btn-outline':'btn-green'}" onclick="toggleComplete('${id}')">${done?'↩ Mark as Not Done':'✓ Mark as Complete'}</button>
      <a class="btn btn-outline" href="#/playground">💻 Try in Playground</a>
      <a class="btn btn-outline" href="#/projects">🛠️ Mini Projects</a>
    </div>`;
  $('#topicModal').classList.remove('hidden');
}
function closeTopic(){ $('#topicModal').classList.add('hidden'); }
function toggleComplete(id){
  progress[id] = !progress[id];
  saveProgress(); closeTopic(); router();
  toast(progress[id] ? '🎉 Topic completed! Hongera!' : 'Marked as not done');
}
$('#topicModal').addEventListener('click', e=>{ if(e.target.id==='topicModal') closeTopic(); });

/* ================= PLAYGROUND ================= */
function viewPlayground(){
  return `
  <h2 class="section-title">💻 Code Playground — Run Real Code in Your Browser</h2>
  <p class="section-sub">Python runs for real via Pyodide (WebAssembly). JavaScript runs natively. SQL runs against the course sample database. R is a bonus language.</p>
  <div class="tabs">
    <button class="tab ${currentLang==='python'?'active':''}" onclick="setLang('python')">🐍 Python</button>
    <button class="tab ${currentLang==='javascript'?'active':''}" onclick="setLang('javascript')">⚡ JavaScript</button>
    <button class="tab ${currentLang==='sql'?'active':''}" onclick="setLang('sql')">🗄️ SQL</button>
    <button class="tab ${currentLang==='r'?'active':''}" onclick="setLang('r')">📈 R</button>
    <span style="margin-left:auto;display:flex;gap:8px">
      <button class="btn btn-outline btn-sm" onclick="resetCode()">↺ Reset</button>
      <button class="btn btn-primary btn-sm" onclick="runCode()">▶ Run</button>
    </span>
  </div>
  <textarea class="editor" id="codeEditor" spellcheck="false">${esc(PLAYGROUND_SAMPLES[currentLang])}</textarea>
  <h3 style="margin:16px 0 8px">🖥️ Output</h3>
  <div class="console" id="consoleOut">Press RUN to execute your code…</div>
  <div class="grid-2" style="margin-top:16px">
    <div class="card">
      <h3>🌍 Coding Languages in This Course</h3>
      <table style="margin-top:10px">
        <tr><th>Language</th><th>Used For</th><th>Units</th></tr>
        <tr><td><strong>🐍 Python</strong></td><td>ML, DL, NLP, APIs, everything</td><td>1–10 (primary)</td></tr>
        <tr><td><strong>🗄️ SQL</strong></td><td>Databases, business queries</td><td>Unit 8</td></tr>
        <tr><td><strong>⚡ JavaScript</strong></td><td>Web apps, Vercel frontends</td><td>Unit 9 + this app</td></tr>
        <tr><td><strong>📈 R</strong></td><td>Statistics, academia (bonus)</td><td>Unit 4 bonus</td></tr>
      </table>
      <p style="margin-top:10px;font-size:13px;color:var(--muted)">Try R free: <a href="https://posit.cloud/" target="_blank" rel="noopener">Posit Cloud ↗</a> • Python data: <a href="https://colab.research.google.com/" target="_blank" rel="noopener">Google Colab ↗</a></p>
    </div>
    <div class="card">
      <h3>📋 Playground Challenges</h3>
      <ul class="obj-list">
        <li><strong>Python:</strong> compute the mean, median and pass rate of the scores.</li>
        <li><strong>JavaScript:</strong> sort students by score and print the top 2.</li>
        <li><strong>SQL:</strong> write a query for average score per course.</li>
        <li><strong>All:</strong> complete the challenge inside each sample code.</li>
      </ul>
      <div class="callout"><strong>💡 Lecturer tip:</strong> The Python tab loads Pyodide (~10MB) on first run. It is the same Python that powers Jupyter — running entirely in your browser.</div>
    </div>
  </div>`;
}
function initPlayground(){ /* editor already filled */ }
function setLang(l){ currentLang=l; router(); }
function resetCode(){ $('#codeEditor').value = PLAYGROUND_SAMPLES[currentLang]; }
async function runCode(){
  const code = $('#codeEditor').value;
  const out = $('#consoleOut');
  out.textContent = '⏳ Running…';
  if(currentLang==='python'){
    try{
      if(!pyodideReady){
        out.textContent = '⏳ Loading Python (Pyodide) — first run takes ~10 seconds…';
        pyodideReady = loadPyodide({ indexURL:'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/' });
      }
      const pyodide = await pyodideReady;
      pyodide.setStdout({ batched: s=>{ out.textContent += (out.textContent==='⏳ Running…'?'':'\n') + s; } });
      out.textContent = '';
      const result = await pyodide.runPythonAsync(code);
      if(result !== undefined && result !== null) out.textContent += '\n→ ' + String(result);
      if(!out.textContent) out.textContent = '✓ Ran successfully (no output). Add print() statements!';
    }catch(e){ out.innerHTML = '<span class="err">❌ Python error:\n' + esc(e.message) + '</span>'; }
  } else if(currentLang==='javascript'){
    const logs=[]; const fakeConsole={ log:(...a)=>logs.push(a.join(' ')), error:(...a)=>logs.push('ERR: '+a.join(' ')) };
    try{ new Function('console', code)(fakeConsole); out.textContent = logs.join('\n') || '✓ Ran (no console.log output)'; }
    catch(e){ out.innerHTML = '<span class="err">❌ JS error: '+esc(e.message)+'</span>'; }
  } else if(currentLang==='sql'){
    try{ out.innerHTML = runMiniSQL(code); }
    catch(e){ out.innerHTML = '<span class="err">❌ SQL error: '+esc(e.message)+'</span>'; }
  } else {
    out.textContent = '📈 R runs in Posit Cloud (free). Open https://posit.cloud/ and paste this code there.\n\n' + code;
  }
}
/* Tiny SQL subset engine over SAMPLE_STUDENTS */
function runMiniSQL(code){
  const q = code.trim().replace(/;+\s*$/,'');
  const rows = SAMPLE_STUDENTS;
  const avg = arr => arr.reduce((a,b)=>a+b,0)/arr.length;
  // Pattern: SELECT ... FROM students [WHERE score >= N] [GROUP BY course] [ORDER BY score DESC] [LIMIT N]
  const m = q.match(/select\s+(.+?)\s+from\s+students(.*)/is);
  if(!m) throw new Error('Only SELECT … FROM students queries are supported in the Playground. Try the sample queries!');
  const cols = m[1].trim(), rest = m[2] || '';
  let data = [...rows];
  const where = rest.match(/where\s+score\s*(>=|<=|>|<|=)\s*([\d.]+)/i);
  if(where){ const [,op,val]=where; const v=parseFloat(val);
    data = data.filter(r=> op==='>='?r.score>=v:op==='<='?r.score<=v:op==='>'?r.score>v:op==='<'?r.score<v:r.score===v); }
  const groupBy = /group\s+by\s+course/i.test(rest);
  const orderDesc = /order\s+by\s+score\s+desc/i.test(rest);
  const orderAsc = /order\s+by\s+score\s+asc/i.test(rest);
  const limitM = rest.match(/limit\s+(\d+)/i);
  let resultRows, headers;
  if(groupBy){
    const byCourse = {};
    data.forEach(r=>{ (byCourse[r.course]=byCourse[r.course]||[]).push(r.score); });
    resultRows = Object.entries(byCourse).map(([course,scores])=>({ course, avg_score: Math.round(avg(scores)*10)/10, count: scores.length }));
    headers = ['course','avg_score','count'];
  } else if(/count\(\*\)/i.test(q) && /pass_rate/i.test(q)){
    resultRows = [{ pass_rate_pct: Math.round(data.length/rows.length*1000)/10 }];
    headers = ['pass_rate_pct'];
  } else {
    if(orderDesc) data.sort((a,b)=>b.score-a.score);
    if(orderAsc) data.sort((a,b)=>a.score-b.score);
    if(limitM) data = data.slice(0, parseInt(limitM[1]));
    headers = cols.split(',').map(c=>c.trim().replace(/as\s+\w+/i,'').trim());
    resultRows = data.map(r=>{ const o={}; headers.forEach(h=>{ o[h]=r[h]!==undefined?r[h]:''; }); return o; });
  }
  if(!resultRows.length) return 'No rows returned.';
  let html = '<table style="color:#e2e8f0"><tr>' + headers.map(h=>`<th style="color:#94a3b8">${esc(h)}</th>`).join('') + '</tr>';
  resultRows.slice(0,20).forEach(r=>{ html += '<tr>' + headers.map(h=>`<td style="border-color:#1e293b">${esc(r[h])}</td>`).join('') + '</tr>'; });
  html += '</table><div style="margin-top:8px;color:#94a3b8">' + resultRows.length + ' row(s) returned</div>';
  return html;
}

/* ================= MINI PROJECTS ================= */
function projectCard(p){
  return `
  <div class="card project-card">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <span class="badge badge-lang">${esc(p.unit)}</span>
      <span class="badge ${p.difficulty==='Beginner'?'badge-beginner':p.difficulty==='Intermediate'?'badge-intermediate':'badge-advanced'}">${p.difficulty}</span>
    </div>
    <h3>${esc(p.title)}</h3>
    <p>${esc(p.desc)}</p>
    <div class="skill-row">${p.skills.map(s=>`<span class="skill">${esc(s)}</span>`).join('')}</div>
    <div class="project-links">
      <a class="btn btn-primary btn-sm" href="${p.demo}" target="_blank" rel="noopener">▶ Live Demo (Vercel)</a>
      <a class="btn btn-outline btn-sm" href="${p.repo}" target="_blank" rel="noopener">GitHub ↗</a>
      <span class="badge badge-todo">⏱ ${p.time}</span>
    </div>
  </div>`;
}
function viewProjects(){
  const list = MINI_PROJECTS.filter(p=>projectFilter==='all'||p.difficulty===projectFilter);
  return `
  <h2 class="section-title">🛠️ Mini Projects — Prove Every Subtopic</h2>
  <p class="section-sub">${MINI_PROJECTS.length} small projects, one per subtopic. Each has a live Vercel demo link and a GitHub repo. Build them in order — they become your portfolio.</p>
  <div class="filter-bar">
    <button class="chip ${projectFilter==='all'?'active':''}" onclick="setProjectFilter('all')">All</button>
    <button class="chip ${projectFilter==='Beginner'?'active':''}" onclick="setProjectFilter('Beginner')">Beginner</button>
    <button class="chip ${projectFilter==='Intermediate'?'active':''}" onclick="setProjectFilter('Intermediate')">Intermediate</button>
    <button class="chip ${projectFilter==='Advanced'?'active':''}" onclick="setProjectFilter('Advanced')">Advanced</button>
  </div>
  <div class="grid-3">${list.map(projectCard).join('')}</div>
  <div class="callout" style="margin-top:20px"><strong>🚀 How to publish your own demo:</strong> Push code to GitHub → Import repo at <a href="https://vercel.com/new" target="_blank" rel="noopener">vercel.com/new</a> → Live in 60 seconds. This is exactly Unit 9. Replace the demo links above with your own Vercel URLs as you build.</div>`;
}
function setProjectFilter(f){ projectFilter=f; router(); }

/* ================= FINAL PROJECT (CAPSTONE) ================= */
function viewFinalProject(){
  const checklistItems = [
    'Problem statement approved by lecturer (Unit 10.1)',
    'Dataset collected & documented (source, size, ethics)',
    'EDA notebook with 4+ charts (Unit 3)',
    'Cleaned dataset with documented cleaning steps (Unit 2)',
    'Baseline model + improved model compared (Unit 5)',
    'Evaluation report: R², MAE, confusion matrix / F1',
    'Prediction UI working (sliders / form like below)',
    'Deployed live on Vercel with public URL',
    'GitHub repo with professional README',
    '5-slide presentation + 5-min demo to class',
  ];
  return `
  <h2 class="section-title">🎓 Final Project — Capstone: Mokaya Insights</h2>
  <p class="section-sub"><strong>"Student Performance Predictor for Kenyan Universities"</strong> — a complete end-to-end data product built with everything from Units 1–10. This page IS the working demo. Use the sliders, upload your own CSV, and explore the model.</p>

  <div class="grid-2">
    <div class="card">
      <h3>🎛️ Live Prediction — Try It Now</h3>
      <p style="color:var(--muted);font-size:13px;margin:6px 0 14px">Adjust the student profile. The model (multiple linear regression trained live in your browser) predicts the final score instantly.</p>
      <div class="slider-row"><label>📚 Study hours / week</label><input type="range" id="slHours" min="0" max="14" step="0.5" value="6"><span id="vHours">6.0</span></div>
      <div class="slider-row"><label>✅ Attendance %</label><input type="range" id="slAtt" min="40" max="100" step="1" value="85"><span id="vAtt">85</span></div>
      <div class="slider-row"><label>📝 Previous score</label><input type="range" id="slPrev" min="30" max="100" step="1" value="70"><span id="vPrev">70</span></div>
      <div class="kpi-row">
        <div class="kpi"><div class="v" id="predScore">—</div><div class="l">Predicted Score</div></div>
        <div class="kpi"><div class="v" id="predGrade">—</div><div class="l">Grade</div></div>
        <div class="kpi"><div class="v" id="predPass">—</div><div class="l">Pass Probability</div></div>
      </div>
      <div class="callout green" id="predAdvice">Move the sliders to get personalised study advice.</div>
    </div>
    <div class="card">
      <h3>📊 Model Performance (Train/Test Split)</h3>
      <p style="color:var(--muted);font-size:13px;margin:6px 0 12px">Trained on 96 students, tested on 24 unseen students. Honest evaluation — Unit 5 style.</p>
      <div class="kpi-row" id="modelKpis"></div>
      <div class="chart-box-sm"><canvas id="capChart1"></canvas></div>
    </div>
  </div>

  <div class="grid-2" style="margin-top:16px">
    <div class="card">
      <h3>📈 Study Hours vs Score (EDA)</h3>
      <div class="chart-box"><canvas id="capChart2"></canvas></div>
    </div>
    <div class="card">
      <h3>🎓 Average Score by Course</h3>
      <div class="chart-box"><canvas id="capChart3"></canvas></div>
    </div>
  </div>

  <div class="grid-2" style="margin-top:16px">
    <div class="card">
      <h3>📤 Upload Your Own CSV</h3>
      <p style="color:var(--muted);font-size:13px;margin:6px 0 10px">Columns needed: <code>hours, attendance, prev, score</code> (or <code>course</code> too). Parsed entirely in your browser — nothing is uploaded anywhere.</p>
      <input type="file" id="csvUpload" accept=".csv" style="margin-bottom:12px">
      <div id="csvResult"><p style="color:var(--muted);font-size:13px">No file uploaded yet. Try the sample below or upload your Unit 2 dataset.</p></div>
      <button class="btn btn-outline btn-sm" onclick="downloadSampleCSV()">⬇ Download Sample CSV</button>
    </div>
    <div class="card">
      <h3>🧾 Dataset Preview (120 Students)</h3>
      <div class="table-wrap" style="max-height:320px;overflow:auto">
        <table><tr><th>#</th><th>Name</th><th>Course</th><th>Hours</th><th>Att %</th><th>Prev</th><th>Score</th><th>Grade</th></tr>
        ${SAMPLE_STUDENTS.slice(0,15).map(s=>`<tr><td>${s.id}</td><td>${esc(s.name)}</td><td>${esc(s.course)}</td><td>${s.hours}</td><td>${s.attendance}</td><td>${s.prev}</td><td><strong>${s.score}</strong></td><td>${s.grade}</td></tr>`).join('')}
        </table>
      </div>
      <p style="font-size:12px;color:var(--muted);margin-top:8px">Showing 15 of 120 rows. Full data generated deterministically in <code>js/course-data.js</code>.</p>
    </div>
  </div>

  <div class="card" style="margin-top:16px">
    <h3>🏗️ How This Capstone Uses Every Unit</h3>
    <table style="margin-top:10px">
      <tr><th>Unit</th><th>What it contributes here</th><th>Where to see it</th></tr>
      <tr><td>1 Python</td><td>Data loading, scripts</td><td>Playground Python tab</td></tr>
      <tr><td>2 Pandas</td><td>Cleaning & feature engineering</td><td>CSV upload + dataset preview</td></tr>
      <tr><td>3 Visualisation</td><td>EDA charts above</td><td>Scatter + bar charts</td></tr>
      <tr><td>4 Statistics</td><td>Correlation, R² interpretation</td><td>Model performance KPIs</td></tr>
      <tr><td>5 ML</td><td>Linear regression, train/test split</td><td>Live prediction + metrics</td></tr>
      <tr><td>6 Deep Learning</td><td>Extension: neural net version</td><td>Your capstone upgrade path</td></tr>
      <tr><td>7 NLP/LLMs</td><td>Extension: AI tutor for predictions</td><td>Your capstone upgrade path</td></tr>
      <tr><td>8 SQL/DB</td><td>Store predictions in Supabase</td><td>Your capstone upgrade path</td></tr>
      <tr><td>9 MLOps/Vercel</td><td>This page, deployed live</td><td>You are looking at it 🚀</td></tr>
      <tr><td>10 Capstone</td><td>Story, portfolio, presentation</td><td>Checklist below</td></tr>
    </table>
  </div>

  <div class="card" style="margin-top:16px">
    <h3>✅ Capstone Submission Checklist (50% of your grade)</h3>
    <p style="color:var(--muted);font-size:13px;margin:6px 0 10px">Tick items as you complete them. Progress saves automatically on this device.</p>
    <ul class="checklist">
      ${checklistItems.map((c,i)=>`<li><input type="checkbox" ${capChecklist[i]?'checked':''} onchange="capCheck(${i},this.checked)"><span>${esc(c)}</span></li>`).join('')}
    </ul>
    <div class="progress-track" style="margin:14px 0 8px"><div class="progress-fill" id="capProgressFill" style="width:${Object.values(capChecklist).filter(Boolean).length*10}%"></div></div>
    <p style="font-size:13px;color:var(--muted)" id="capProgressText">${Object.values(capChecklist).filter(Boolean).length} / 10 complete</p>
    <div class="callout warn"><strong>⚠️ Academic integrity:</strong> Your capstone must be your own work. Cite datasets and tutorials. The lecturer will ask you to explain any part of your code during the demo.</div>
  </div>`;
}

/* --- Linear regression (OLS) via normal equations --- */
function fitOLS(X, y){
  const n = X.length, p = X[0].length;
  // XtX and XtY
  const XtX = Array.from({length:p},()=>Array(p).fill(0));
  const XtY = Array(p).fill(0);
  for(let i=0;i<n;i++){ for(let a=0;a<p;a++){ XtY[a]+=X[i][a]*y[i]; for(let b=0;b<p;b++) XtX[a][b]+=X[i][a]*X[i][b]; } }
  // Gaussian elimination
  const M = XtX.map((row,i)=>[...row, XtY[i]]);
  for(let col=0; col<p; col++){
    let piv=col; for(let r=col+1;r<p;r++) if(Math.abs(M[r][col])>Math.abs(M[piv][col])) piv=r;
    [M[col],M[piv]]=[M[piv],M[col]];
    const d=M[col][col]||1e-9;
    for(let j=col;j<=p;j++) M[col][j]/=d;
    for(let r=0;r<p;r++){ if(r!==col){ const f=M[r][col]; for(let j=col;j<=p;j++) M[r][j]-=f*M[col][j]; } }
  }
  return M.map(row=>row[p]);
}
function predictOLS(beta, x){ return beta.reduce((s,b,i)=>s+b*x[i],0); }
let capModel = null;
function initFinalProject(){
  // Train/test split (deterministic: every 5th student is test)
  const train = SAMPLE_STUDENTS.filter((_,i)=>i%5!==4);
  const test = SAMPLE_STUDENTS.filter((_,i)=>i%5===4);
  const Xtr = train.map(s=>[1,s.hours,s.attendance,s.prev]), ytr = train.map(s=>s.score);
  const beta = fitOLS(Xtr, ytr);
  capModel = beta;
  // Evaluate
  const preds = test.map(s=>predictOLS(beta,[1,s.hours,s.attendance,s.prev]));
  const yTrue = test.map(s=>s.score);
  const meanY = yTrue.reduce((a,b)=>a+b,0)/yTrue.length;
  const ssRes = yTrue.reduce((a,y,i)=>a+(y-preds[i])**2,0);
  const ssTot = yTrue.reduce((a,y)=>a+(y-meanY)**2,0);
  const r2 = 1 - ssRes/ssTot;
  const mae = yTrue.reduce((a,y,i)=>a+Math.abs(y-preds[i]),0)/yTrue.length;
  const rmse = Math.sqrt(yTrue.reduce((a,y,i)=>a+(y-preds[i])**2,0)/yTrue.length);
  $('#modelKpis').innerHTML = `
    <div class="kpi"><div class="v">${r2.toFixed(3)}</div><div class="l">R² (test)</div></div>
    <div class="kpi"><div class="v">${mae.toFixed(1)}</div><div class="l">MAE</div></div>
    <div class="kpi"><div class="v">${rmse.toFixed(1)}</div><div class="l">RMSE</div></div>
    <div class="kpi"><div class="v">${train.length}/${test.length}</div><div class="l">Train/Test</div></div>`;
  // Charts
  if(typeof Chart!=='undefined'){
    charts.c1 = new Chart($('#capChart1'), { type:'line', data:{ labels:yTrue.map((_,i)=>'S'+(i+1)), datasets:[{label:'Actual', data:yTrue, borderColor:'#2563eb', tension:.3},{label:'Predicted', data:preds.map(v=>Math.round(v*10)/10), borderColor:'#dc2626', borderDash:[5,5], tension:.3}] }, options:{ responsive:true, maintainAspectRatio:false } });
    charts.c2 = new Chart($('#capChart2'), { type:'scatter', data:{ datasets:[{label:'Students', data:SAMPLE_STUDENTS.map(s=>({x:s.hours,y:s.score})), backgroundColor:'rgba(37,99,235,.6)'}] }, options:{ responsive:true, maintainAspectRatio:false, scales:{ x:{title:{display:true,text:'Study hours / week'}}, y:{title:{display:true,text:'Final score'}} } } });
    const courses = [...new Set(SAMPLE_STUDENTS.map(s=>s.course))];
    charts.c3 = new Chart($('#capChart3'), { type:'bar', data:{ labels:courses, datasets:[{label:'Avg score', data:courses.map(c=>{ const a=SAMPLE_STUDENTS.filter(s=>s.course===c); return Math.round(a.reduce((x,s)=>x+s.score,0)/a.length*10)/10; }), backgroundColor:['#2563eb','#7c3aed','#059669','#d97706'], borderRadius:8}] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, scales:{y:{min:0,max:100}} } });
  }
  // Sliders
  const upd = ()=>{
    const h=parseFloat($('#slHours').value), a=parseFloat($('#slAtt').value), p=parseFloat($('#slPrev').value);
    $('#vHours').textContent=h.toFixed(1); $('#vAtt').textContent=a; $('#vPrev').textContent=p;
    const score = Math.max(0, Math.min(100, predictOLS(capModel,[1,h,a,p])));
    $('#predScore').textContent = score.toFixed(1);
    $('#predGrade').textContent = score>=80?'A':score>=65?'B':score>=50?'C':'F';
    const prob = 1/(1+Math.exp(-(score-50)/8));
    $('#predPass').textContent = Math.round(prob*100)+'%';
    $('#predAdvice').innerHTML = score>=80 ? '🌟 <strong>Excellent!</strong> This profile is on track for an A. Keep the routine and help a classmate.'
      : score>=65 ? '👍 <strong>Good.</strong> A little more study time or attendance would push this to an A.'
      : score>=50 ? '📚 <strong>Passing, but tight.</strong> Increase study hours by 2–3/week and attend more classes.'
      : '⚠️ <strong>At risk.</strong> See the lecturer during office hours. Small daily study habits beat cramming — Unit 4 & 5 explain why.';
  };
  ['slHours','slAtt','slPrev'].forEach(id=>$('#'+id).addEventListener('input', upd));
  upd();
  // CSV upload
  $('#csvUpload').addEventListener('change', e=>{
    const file = e.target.files[0]; if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const lines = String(reader.result).trim().split(/\r?\n/);
        const headers = lines[0].split(',').map(h=>h.trim().toLowerCase());
        const rows = lines.slice(1).map(l=>{ const v=l.split(','); const o={}; headers.forEach((h,i)=>o[h]=v[i]); return o; }).filter(r=>r.score!==undefined);
        if(!rows.length) throw new Error('No rows with a "score" column found.');
        const scores = rows.map(r=>parseFloat(r.score)).filter(v=>!isNaN(v));
        const avg = scores.reduce((a,b)=>a+b,0)/scores.length;
        const passRate = scores.filter(s=>s>=50).length/scores.length*100;
        $('#csvResult').innerHTML = `
          <div class="kpi-row">
            <div class="kpi"><div class="v">${rows.length}</div><div class="l">Rows</div></div>
            <div class="kpi"><div class="v">${avg.toFixed(1)}</div><div class="l">Avg Score</div></div>
            <div class="kpi"><div class="v">${passRate.toFixed(0)}%</div><div class="l">Pass Rate</div></div>
            <div class="kpi"><div class="v">${Math.max(...scores)}</div><div class="l">Top Score</div></div>
          </div>
          <div class="table-wrap" style="max-height:200px;overflow:auto"><table>
            <tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr>
            ${rows.slice(0,8).map(r=>`<tr>${headers.map(h=>`<td>${esc(r[h]??'')}</td>`).join('')}</tr>`).join('')}
          </table></div>
          <p style="font-size:12px;color:var(--muted);margin-top:6px">✓ Parsed in-browser. Now clean this data with Pandas (Unit 2) and model it (Unit 5)!</p>`;
      }catch(err){ $('#csvResult').innerHTML = `<div class="callout warn">❌ ${esc(err.message)}</div>`; }
    };
    reader.readAsText(file);
  });
}
function capCheck(i, checked){
  capChecklist[i]=checked;
  localStorage.setItem('mokaya_capstone', JSON.stringify(capChecklist));
  const n = Object.values(capChecklist).filter(Boolean).length;
  $('#capProgressFill').style.width = (n*10)+'%';
  $('#capProgressText').textContent = `${n} / 10 complete`;
  if(n===10) toast('🎓 Capstone complete! Hongera, graduate!');
}
function downloadSampleCSV(){
  const csv = 'name,course,hours,attendance,prev,score\n' + SAMPLE_STUDENTS.map(s=>`${s.name},${s.course},${s.hours},${s.attendance},${s.prev},${s.score}`).join('\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download = 'mokaya_students_sample.csv'; a.click();
}

/* ================= RESOURCES ================= */
function viewResources(){
  const cats = [...new Set(RESOURCES.map(r=>r.cat))];
  return `
  <h2 class="section-title">📖 Library & References</h2>
  <p class="section-sub">Every book, doc, dataset and tool referenced in this course — all free or library-available. Bookmark this page.</p>
  ${cats.map(cat=>`
    <h3 style="margin:22px 0 10px">${{Books:'📚',Docs:'📄',Practice:'🏋️',Datasets:'🗄️',Video:'📺',Tools:'🧰'}[cat]||'📌'} ${cat}</h3>
    <div class="grid-3">
      ${RESOURCES.filter(r=>r.cat===cat).map(r=>`
        <a class="card project-card" href="${r.url}" target="_blank" rel="noopener" style="color:var(--ink)">
          <h3 style="font-size:15px">${esc(r.title)} ↗</h3>
          <p>${esc(r.note)}</p>
          <small style="color:var(--muted)">${esc(r.url)}</small>
        </a>`).join('')}
    </div>`).join('')}
  <div class="callout" style="margin-top:20px"><strong>📚 Citation style:</strong> Harvard. Example: Géron, A. (2022) <em>Hands-On Machine Learning</em>. 3rd edn. O'Reilly. Always cite datasets and tutorials in your capstone.</div>`;
}

/* ================= QUIZ ================= */
let quizAnswers = {};
function viewQuiz(){
  const best = quizBest!==null ? `<div class="callout green">🏆 Your best score so far: <strong>${quizBest}%</strong></div>` : '';
  return `
  <h2 class="section-title">📝 Quiz & Assessment</h2>
  <p class="section-sub">${QUIZ.length} questions covering all 10 units. Worth 10% of your grade. You can retake it — your best score counts.</p>
  ${best}
  <div id="quizBody">
    ${QUIZ.map((q,qi)=>`
      <div class="quiz-q" id="qq${qi}">
        <h4>Q${qi+1}. ${esc(q.q)}</h4>
        ${q.opts.map((o,oi)=>`<button class="opt" data-q="${qi}" data-o="${oi}" onclick="pickOpt(this)">${esc(o)}</button>`).join('')}
        <div class="exp hidden" style="margin-top:8px;font-size:13px;color:var(--muted)"></div>
      </div>`).join('')}
    <button class="btn btn-primary btn-block" onclick="submitQuiz()">Submit Quiz</button>
  </div>
  <div id="quizResult"></div>`;
}
function pickOpt(btn){
  const q = btn.dataset.q;
  $$(`.opt[data-q="${q}"]`).forEach(b=>b.classList.remove('picked'));
  btn.classList.add('picked');
  quizAnswers[q] = parseInt(btn.dataset.o);
}
function submitQuiz(){
  let score = 0;
  QUIZ.forEach((q,qi)=>{
    const picked = quizAnswers[qi];
    $$(`.opt[data-q="${qi}"]`).forEach(b=>{
      const oi = parseInt(b.dataset.o);
      if(oi===q.ans) b.classList.add('correct');
      else if(oi===picked) b.classList.add('wrong');
    });
    if(picked===q.ans) score++;
    const exp = $(`#qq${qi} .exp`);
    exp.classList.remove('hidden');
    exp.innerHTML = (picked===q.ans ? '✅ Correct. ' : '❌ Not quite. ') + esc(q.exp);
  });
  const pct = Math.round(score/QUIZ.length*100);
  if(quizBest===null || pct>quizBest){ quizBest=pct; localStorage.setItem('mokaya_quiz_best', JSON.stringify(pct)); }
  $('#quizResult').innerHTML = `
    <div class="card" style="margin-top:20px;text-align:center">
      <div style="font-size:52px">${pct>=80?'🏆':pct>=60?'👍':'📚'}</div>
      <h2 style="font-size:36px">${pct}%</h2>
      <p style="color:var(--muted)">${score} / ${QUIZ.length} correct • Best score saved: ${quizBest}%</p>
      <p style="margin:10px 0">${pct>=80?'Hongera! You are ready for the capstone.':pct>=60?'Good work — review the topics you missed and retake.':'Review the units and try again. Ask in office hours!'}</p>
      <a class="btn btn-outline" href="#/course">📚 Review Course</a>
      <button class="btn btn-primary" onclick="quizAnswers={};router()">↺ Retake Quiz</button>
    </div>`;
  window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});
}

/* ================= TEACHER ================= */
function viewTeacher(){
  return `
  <h2 class="section-title">👨‍🏫 About Your Lecturer</h2>
  <div class="grid-2">
    <div class="card">
      <div style="display:flex;gap:16px;align-items:center;margin-bottom:14px">
        <div class="avatar" style="width:72px;height:72px;font-size:26px">KB</div>
        <div><h2 style="font-size:24px">${COURSE_META.lecturer}</h2><p style="color:var(--muted)">${COURSE_META.lecturerTitle} • Meru, Kenya 🇰🇪</p></div>
      </div>
      <p>${COURSE_META.lecturerBio}</p>
      <p style="margin-top:10px"><strong>📧 Email:</strong> <a href="mailto:${COURSE_META.email}">${COURSE_META.email}</a><br>
      <strong>📍 Location:</strong> ${COURSE_META.location}<br>
      <strong>🕐 Office hours:</strong> Wednesday 10:00–12:00 EAT (or book by email)</p>
      <div class="callout"><strong>💬 My teaching promise:</strong> No topic without a demo. No demo without code you can run. Every unit ends with a project you can show an employer.</div>
    </div>
    <div class="card">
      <h3>📅 Course Information</h3>
      <table style="margin-top:10px">
        <tr><th>Item</th><th>Details</th></tr>
        <tr><td>Course code</td><td>${COURSE_META.code} — ${COURSE_META.title}</td></tr>
        <tr><td>Semester</td><td>${COURSE_META.semester}</td></tr>
        <tr><td>Credits / Level</td><td>${COURSE_META.credits} credits • ${COURSE_META.level}</td></tr>
        <tr><td>Duration</td><td>${COURSE_META.duration}</td></tr>
        <tr><td>Timetable</td><td>${COURSE_META.timetable}</td></tr>
        <tr><td>Grading</td><td>${COURSE_META.grading}</td></tr>
        <tr><td>Prerequisites</td><td>${COURSE_META.prerequisites}</td></tr>
      </table>
    </div>
  </div>
  <div class="card" style="margin-top:16px">
    <h3>📜 Course Rules & Academic Integrity</h3>
    <ul class="obj-list">
      <li>All coursework must be your own work. You may use tutorials and AI tools, but you must be able to explain every line of your code.</li>
      <li>Cite all datasets, books and tutorials (Harvard style — see Library tab).</li>
      <li>Late submissions lose 10% per day. Extensions only by email before the deadline.</li>
      <li>Respect classmates in labs and forums. Karibu sana — we learn together.</li>
      <li>Your progress in this app (topics completed, quiz best score, capstone checklist) is stored on your device only. Screenshot it for your records.</li>
    </ul>
  </div>
  <div class="card" style="margin-top:16px">
    <h3>🚀 How This App Was Built (Unit 9 in Action)</h3>
    <p style="color:var(--muted);margin-top:8px">This entire course app is a static web app (HTML + CSS + JavaScript) deployed on <strong>Vercel</strong> from GitHub. The Python playground runs real Python via <strong>Pyodide</strong> (WebAssembly) in your browser. The capstone model is a real multiple linear regression trained live with JavaScript. No server needed — which is why it deploys in seconds and costs nothing to host. That is the power of modern web deployment, and it is exactly what you will learn in Unit 9.</p>
    <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:12px">
      <a class="btn btn-primary btn-sm" href="https://vercel.com/new" target="_blank" rel="noopener">Deploy Your Own on Vercel ↗</a>
      <a class="btn btn-outline btn-sm" href="#/course/u9">Study Unit 9 First</a>
    </div>
  </div>`;
}

/* ================= SEARCH ================= */
$('#globalSearch').addEventListener('input', e=>{
  const q = e.target.value.trim().toLowerCase();
  const box = $('#searchResults');
  if(q.length<2){ box.classList.add('hidden'); return; }
  const hits = [];
  UNITS.forEach(u=>{ u.topics.forEach(t=>{ if((t.title+' '+t.preview+' '+t.language).toLowerCase().includes(q)) hits.push({t,u}); }); });
  const projHits = MINI_PROJECTS.filter(p=>(p.title+' '+p.desc+' '+p.skills.join(' ')).toLowerCase().includes(q));
  box.innerHTML = (hits.length? hits.slice(0,6).map(({t,u})=>`<a href="#" onclick="event.preventDefault();document.getElementById('searchResults').classList.add('hidden');openTopic('${t.id}')"><strong>${esc(t.title)}</strong><small>Unit ${u.number} • ${t.language} • ${t.duration}</small></a>`).join('') : '<p style="padding:10px;color:var(--muted);font-size:13px">No topics found.</p>')
    + (projHits.length? `<p style="padding:8px 12px 4px;font-size:12px;font-weight:700;color:var(--muted)">PROJECTS</p>` + projHits.slice(0,3).map(p=>`<a href="#/projects"><strong>${esc(p.title)}</strong><small>${esc(p.unit)}</small></a>`).join('') : '');
  box.classList.remove('hidden');
});
document.addEventListener('click', e=>{ if(!e.target.closest('.topbar-search')) $('#searchResults').classList.add('hidden'); });

/* ================= MISC ================= */
$('#hamburger').addEventListener('click', ()=>$('#sidebar').classList.toggle('open'));
updateTopProgress();
router();
