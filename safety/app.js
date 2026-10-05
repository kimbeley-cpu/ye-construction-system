'use strict';
const KEY='ye_safety_v1';
const COPY={
zh:{title:'工作安全分析与任务分析',subtitle:'JSA / TA · 员工知情、交底与签字确认书',print:'打印 / 保存 PDF',export:'导出备份',revision:'新建版本',version:'版本',draft:'待现场确认',signed:'已签字 · 内容已锁定',saved:'已保存至当前浏览器。不会自动同步到办公室或其他设备；签字后请导出备份并按公司要求归档。',failed:'浏览器保存失败。请立即导出备份，避免关闭页面后丢失记录。',notice:'这是现场评估模板。开工前须由具备能力的负责人和工人共同审核、补充并实施控制措施。签字是交底与理解的记录，不是免责书，也不能代替许可、资质或现场安全计划。',projectTitle:'01 / 项目与文件信息',scopeTitle:'02 / 工作范围',scopeText:'适用于 YE Construction 参与的建筑与管道安装工作。请选择本次实际作业；额外或高风险工作须补充专项分析。与现场专项安全计划、总包要求、适用许可、制造商说明和实际产品 SDS 一起使用。',scopeNote:'燃气、受限空间、吊装、开挖、热作、石棉及其他未覆盖任务不得仅凭本模板开工。',riskTitle:'03 / 风险评估与控制顺序',riskIntro:'示例 5×5 矩阵供本表一致评分使用；不是 Site Safe 的官方矩阵。现场要求采用其他矩阵时，请先调整评估方法。初始风险为控制前风险，剩余风险为措施实施后的风险。',hierarchy:'先消除风险；不能合理消除时，采用替代、隔离及工程控制，再辅以管理措施和个人防护。剩余风险为高或严重时，本表不开放签字：停止并升级评估。',analysisTitle:'04 / 任务步骤、危险与控制措施',analysisNote:'预填内容只作为讨论起点，可按现场实际修改。现场修改文字将在两个语言页面中保留同一原文，请由交底人解释或填写双语。请为每一步指定负责人，分别评估初始和剩余风险。',addStep:'＋ 添加现场专用步骤',ppeTitle:'05 / 个人防护与危险物质',chemicalTitle:'现场产品与 SDS',chemicalNote:'根据实际产品 SDS 填写产品、危害分类、存储、通风、防护及泄漏处置要求；不同产品不能沿用原件的 UN 编号。PPE 需匹配作业，不替代源头控制。',briefingTitle:'06 / 现场交底与负责人确认',signTitle:'07 / 员工知情与签字确认',declaration:'本人确认：我已参加本版本 JSA / TA 的现场安全交底，以我能够理解的语言了解工作步骤、危险、风险及控制措施；相关许可、SDS 和隔离安排已说明并可查阅。我有机会提出问题，疑问已获得解答。我将遵循本版本及现场安全要求；如发现控制措施缺失、条件变化或不安全情况，我会停止相关作业并向负责人报告。签字不免除公司或其他责任主体的安全义务。',signNotice:'请由每名工人本人填写并签字。签字包含姓名、角色、日期、当前版本及交底确认；不属于经认证的数字签名。',ackText:'我已阅读并理解以上声明，确认是本人签字。',signatureLabel:'手写签名（鼠标、触控笔或手指）',clearSignature:'清除签名',sign:'确认并保存签字',sourcesTitle:'参考与使用说明',sourceNote:'由提供的第三方纸质资料提炼并重新编写，已去除其他公司的标识、人员资料及签名。现场须复核适用性。参考资料核对日期：2026-10-05。',step:'工作步骤',hazard:'危险 / 潜在后果',controls:'控制措施',owner:'措施负责人',initialL:'初始可能性',initialC:'初始后果',residualL:'剩余可能性',residualC:'剩余后果',residual:'剩余风险',initial:'初始风险',choose:'请选择',custom:'现场补充任务',noTasks:'请选择至少一类作业。',noSign:'尚无签字记录。',incomplete:'请完成项目信息、应急信息、负责人确认，以及所有步骤的负责人和风险评分。',highRisk:'剩余风险存在高或严重等级。请停止、升级评估并完善控制措施。',needSig:'请填写姓名与角色、勾选本人确认，并手写签名。',locked:'签字记录已保存，文件内容已锁定。',confirmRevision:'新版本将保留分析内容并清除交底确认及当前签字。请先导出本版本备份。是否继续？',cancel:'取消',revisionCreated:'已创建新版本，请重新评估、交底及签字。',time:'签字时间',language:'交底语言',id:'记录编号',none:'请先选择作业范围。'},
en:{title:'Job Safety & Task Analysis',subtitle:'JSA / TA · Worker briefing and acknowledgement',print:'Print / Save PDF',export:'Export backup',revision:'New revision',version:'Revision',draft:'Site review required',signed:'Signed · Content locked',saved:'Saved in this browser only. Records do not automatically sync to the office or other devices. Export signed records and file them under company procedures.',failed:'Browser storage failed. Export a backup now to avoid losing the record when this page closes.',notice:'Site assessment template. Before work starts, a competent responsible person and workers must review, adapt and implement controls. Signing records briefing and understanding; it is not a liability waiver and does not replace permits, competencies or the site safety plan.',projectTitle:'01 / Project & document details',scopeTitle:'02 / Scope of work',scopeText:'For construction and plumbing work involving YE Construction. Select the actual work for this briefing and add specific analysis for extra or high-risk activities. Read with the SSSP, principal contractor requirements, applicable permits, manufacturer instructions and actual product SDS.',scopeNote:'Gas, confined spaces, lifting, excavation, hot work, asbestos and other uncovered work require further task-specific assessment.',riskTitle:'03 / Risk assessment & control priorities',riskIntro:'This example 5×5 matrix provides consistent scoring for this form; it is not an official Site Safe matrix. Adapt the assessment method first if the site requires a different matrix. Initial risk is before controls; residual risk is after controls are implemented.',hierarchy:'Eliminate risks first. If not reasonably practicable, use substitution, isolation and engineering controls, supported by administration and PPE. High or critical residual risk blocks signing on this form: stop and escalate the assessment.',analysisTitle:'04 / Work steps, hazards & controls',analysisNote:'Suggested content is a starting point for discussion. Site edits appear verbatim in both languages; the briefing leader must explain them or enter bilingual text. Assign a control owner and assess initial and residual risk for every step.',addStep:'+ Add site-specific step',ppeTitle:'05 / PPE & hazardous substances',chemicalTitle:'Site products & SDS',chemicalNote:'Use the actual product SDS to record product, hazard classification, storage, ventilation, PPE and spill response. Do not copy UN numbers from a different product. PPE must suit the task and does not replace source controls.',briefingTitle:'06 / Briefing & responsible person review',signTitle:'07 / Worker acknowledgement & signatures',declaration:'I confirm that I attended the site briefing for this JSA / TA revision and understood the steps, hazards, risks and controls in a language I understand. Relevant permits, SDS and isolation arrangements were explained and are available. I had an opportunity to ask questions and my questions were answered. I will follow this revision and site safety requirements. If controls are missing, conditions change or work is unsafe, I will stop the affected work and report to the responsible person. Signing does not remove the safety duties of the company or other duty holders.',signNotice:'Each worker must complete their own details and signature. The record includes name, role, date, revision and briefing acknowledgement. This is not a certified digital signature.',ackText:'I have read and understood the declaration and confirm this is my own signature.',signatureLabel:'Handwritten signature (mouse, pen or finger)',clearSignature:'Clear signature',sign:'Confirm & save signature',sourcesTitle:'References & use',sourceNote:'Distilled and rewritten from supplied third-party paper documents. Other company branding, personal details and signatures have been removed. Verify suitability on site. References checked: 2026-10-05.',step:'Work step',hazard:'Hazards / potential harm',controls:'Control measures',owner:'Control owner',initialL:'Initial likelihood',initialC:'Initial consequence',residualL:'Residual likelihood',residualC:'Residual consequence',residual:'Residual risk',initial:'Initial risk',choose:'Select',custom:'Site-specific task',noTasks:'Select at least one work group.',noSign:'No signatures yet.',incomplete:'Complete project and emergency details, responsible person review, and owners and risk scores for every step.',highRisk:'High or critical residual risk remains. Stop, escalate the assessment and improve controls.',needSig:'Enter your name and role, confirm the declaration and provide a handwritten signature.',locked:'Signature saved. Document content is now locked.',confirmRevision:'A new revision retains analysis content but clears briefing confirmations and current signatures. Export a backup of this revision first. Continue?',cancel:'Cancel',revisionCreated:'New revision created. Reassess, rebrief and sign again.',time:'Signed at',language:'Briefing language',id:'Record ID',none:'Select the work scope first.'}
};
Object.assign(COPY.zh,{sigStart:'✍ 点此签名',sigUndo:'↶ 撤销',sigDone:'✔ 完成',sigRedo:'✍ 重新签名',sigHint:'请在横线上方签名',sigShort:'签名太短，请写全姓名。',sigNotDone:'请先点“完成”确认签名。',needSig:'请填写姓名与角色、勾选本人确认，并手写签名后点“完成”。'});
Object.assign(COPY.en,{sigStart:'✍ Tap here to sign',sigUndo:'↶ Undo',sigDone:'✔ Done',sigRedo:'✍ Re-sign',sigHint:'Sign above the line',sigShort:'That looks too short to be a signature. Please sign your full name.',sigNotDone:'Tap Done to confirm your signature first.',needSig:'Enter your name and role, confirm the declaration, sign, and tap Done.'});
Object.assign(COPY.zh,{saved:'已自动保存到公司服务器，可在其他设备打开。',failed:'暂时无法保存，请检查网络；联网后会自动重试。可先点“导出备份”。',saving:'正在保存…',notSaved:'保存失败，没有权限或记录已被锁定。',offline:'连不上服务器，请检查网络。',loading:'加载中…',loadFailed:'加载失败：',listTitle:'JSA / TA 记录',listSub:'所有员工共用同一份记录。选择现场记录开始签字，或新建一份。',newRec:'＋ 新建 JSA / TA',refreshList:'刷新',backList:'← 记录列表',untitled:'（未命名项目）',noRecords:'还没有记录。点“新建 JSA / TA”开始。',delRec:'删除',delConfirm:'再点一次确认',roNote:'你不是这份记录的创建人，只能查看内容并在下方签字。',signedCount:'人已签字',earlier:'此前版本的签字',loadRecFailed:'无法打开这份记录。',lockedNow:'这份记录已有人签字，内容已锁定。请新建版本后再修改。'});
Object.assign(COPY.en,{saved:'Saved automatically to the company server and available on other devices.',failed:'Could not save right now. Check your connection; it will retry automatically. You can also Export backup.',saving:'Saving…',notSaved:'Not saved: no permission or the record is locked.',offline:'Can’t reach the server. Check your connection.',loading:'Loading…',loadFailed:'Could not load: ',listTitle:'JSA / TA records',listSub:'All staff share the same records. Open the site record to sign, or create a new one.',newRec:'＋ New JSA / TA',refreshList:'Refresh',backList:'← Records',untitled:'(Untitled project)',noRecords:'No records yet. Tap “New JSA / TA” to start.',delRec:'Delete',delConfirm:'Tap again to confirm',roNote:'You did not create this record. You can read it and sign below.',signedCount:'signed',earlier:'Signatures on earlier revisions',loadRecFailed:'This record could not be opened.',lockedNow:'This record has signatures, so its content is locked. Create a new revision to change it.'});
const PROJECT=[['project','项目名称','Project name',true],['address','现场地址','Site address',true],['principal','总承包 / 现场 PCBU','Principal contractor / site PCBU',true],['supervisor','现场负责人','Site supervisor',true],['prepared','编制人','Prepared by',true],['date','作业 / 交底日期','Work / briefing date',true,'date'],['reviewDate','下次复核日期','Next review date',false,'date'],['scope','具体工作地点与边界','Exact work area & scope',true,'textarea'],['exclusions','不适用项目、额外许可及专项文件编号','Exclusions, additional permits & assessment references',false,'textarea']];
const BRIEF=[['reviewer','审核 / 批准负责人姓名','Responsible reviewer / approver name',true],['briefedBy','交底人','Briefing led by',true],['emergency','紧急电话及现场应急联系人','Emergency number & site contact',true],['assembly','集合点','Assembly point',true],['firstAid','急救人员、联系电话及急救箱位置','First aider, contact & first-aid kit location',true],['isolation','隔离点、许可及 SDS 存放位置','Isolation points, permits & SDS location',true,'textarea'],['changes','现场新增风险、工人意见及处理结果','Additional site hazards, worker feedback & resolutions',false,'textarea']];
const CHEM=[['products','产品名称、SDS 日期、危害及所需防护（不使用填“不适用”）','Products, SDS dates, hazards & required protection (enter N/A if none)',true,'textarea']];
const LEVELS={zh:{likelihood:['罕见','不太可能','可能','很可能','几乎必然'],consequence:['轻微 / 急救','较小 / 医疗处理','中等 / 停工伤害','重大 / 严重永久伤害','灾难 / 死亡'],risk:['低','中等','高','严重']},en:{likelihood:['Rare','Unlikely','Possible','Likely','Almost certain'],consequence:['Insignificant / first aid','Minor / medical treatment','Moderate / lost time','Major / severe permanent harm','Catastrophic / fatality'],risk:['Low','Moderate','High','Critical']}};
const MATRIX=[[0,0,0,1,1],[0,1,1,2,2],[0,1,2,2,3],[1,2,2,3,3],[1,2,3,3,3]], CLASSES=['low','moderate','high','critical'];
const $=id=>document.getElementById(id), tr=k=>COPY[state.lang][k], esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const localDate=()=>new Intl.DateTimeFormat('en-CA',{timeZone:'Pacific/Auckland',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
function fresh(){return {schema:1,id:crypto.randomUUID(),lang:'zh',revision:1,fields:{date:localDate()},tasks:[],ppe:[],checks:[],edits:{zh:{},en:{}},ratings:{},extra:[],signatures:[]};}
let state=fresh(),saveFailed=false,strokes=[],currentStroke=null;
/* records live in Supabase (ye_jsa_records / ye_jsa_signatures); nothing is kept as the single local record any more */
const SB='https://fkyuhthxfzhqmlikbrfg.supabase.co',SBK='sb_publishable_zbPzA78u7V3htYulP1b9_w_53KQFKHn',REC='/rest/v1/ye_jsa_records',SIG='/rest/v1/ye_jsa_signatures',SESKEY='ye_ts_ses';
function lsGet(k){try{return JSON.parse(localStorage.getItem(k)||'null');}catch(e){return null;}}
function lsSet(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v));}catch(e){}}
{const q=new URLSearchParams(location.search).get('lang');state.lang=['zh','en'].includes(q)?q:(['zh','en'].includes(lsGet('ye_safety_lang'))?lsGet('ye_safety_lang'):'zh');}
let ses=null,role='staff',rec=null,canEdit=false,locked=false,dirty=false,pushing=false,saveTimer=0,pollTimer=0,listData=[];
const fmt=iso=>{try{return new Date(iso).toLocaleString(state.lang==='zh'?'zh-CN':'en-NZ',{timeZone:'Pacific/Auckland',dateStyle:'medium',timeStyle:'short'});}catch(e){return String(iso||'');}};
const jwtPart=t=>{try{return JSON.parse(decodeURIComponent(escape(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))));}catch(e){return {};}};
function toSes(j,old){return {access_token:j.access_token,refresh_token:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000,email:(j.user&&j.user.email)||(old&&old.email)||'',uid:(j.user&&j.user.id)||jwtPart(j.access_token).sub||(old&&old.uid)||''};}
async function errOf(r){let t='';try{const j=await r.json();t=j.msg||j.message||j.error_description||j.error||'';}catch(e){}return new Error((t||'Request failed')+' ('+r.status+')');}
async function refreshSes(force){
  const o=lsGet(SESKEY);if(o&&o.refresh_token&&ses&&o.refresh_token!==ses.refresh_token){ses=o;force=false;}
  if(!force&&ses.exp-Date.now()>120000)return;
  const r=await fetch(SB+'/auth/v1/token?grant_type=refresh_token',{method:'POST',headers:{apikey:SBK,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:ses.refresh_token})});
  if(!r.ok){if([400,401,403].includes(r.status)){lsSet(SESKEY,null);throw new Error('Your sign-in has expired. Please sign in again.');}throw await errOf(r);}
  ses=toSes(await r.json(),ses);lsSet(SESKEY,ses);
}
async function sb(path,opt,retried){
  opt=opt||{};await refreshSes();const h={apikey:SBK,Authorization:'Bearer '+ses.access_token};
  if(opt.body)h['Content-Type']='application/json';if(opt.prefer)h.Prefer=opt.prefer;
  const r=await fetch(SB+path,{method:opt.method||'GET',headers:h,body:opt.body,cache:'no-store'});
  if(r.status===401&&!retried){await refreshSes(true);return sb(path,opt,true);}
  if(!r.ok)throw await errOf(r);const txt=await r.text();return txt?JSON.parse(txt):null;
}
const netMsg=e=>e instanceof TypeError?tr('offline'):e.message;
function snap(s){const o=JSON.parse(JSON.stringify(s));delete o.signatures;delete o.lang;delete o.id;return o;}
function setSave(t,bad){const s=$('saveStatus');s.textContent=t;s.style.color=bad?'#a92d2d':'';}
function save(){if(!rec||!canEdit||locked)return;dirty=true;setSave(tr('saving'));clearTimeout(saveTimer);saveTimer=setTimeout(push,1200);}
async function push(){
  clearTimeout(saveTimer);if(!rec||!canEdit||locked)return;
  if(pushing){saveTimer=setTimeout(push,800);return;}
  pushing=true;const body={project:String(state.fields.project||'').trim().slice(0,200),address:String(state.fields.address||'').trim().slice(0,300),revision:state.revision,data:snap(state)};
  try{
    const a=await sb(REC+'?id=eq.'+rec.id+'&select=id',{method:'PATCH',body:JSON.stringify(body),prefer:'return=representation'});
    if(!a||!a.length)throw new Error(tr('notSaved'));
    dirty=false;setSave(tr('saved')+' '+new Date().toLocaleTimeString('en-NZ',{hour:'numeric',minute:'2-digit'}));
  }catch(e){
    if(/already has signatures/i.test(e.message)){dirty=false;openRecord(rec.id).then(()=>setSave(tr('lockedNow'),true)).catch(()=>{});}
    else{setSave(netMsg(e)+' '+tr('failed'),true);clearTimeout(saveTimer);saveTimer=setTimeout(push,10000);}
  }finally{pushing=false;}
}
async function flushSave(){if(dirty&&canEdit&&!locked){await push();}}
function showView(v){$('listMain').hidden=v!=='list';$('editMain').hidden=v!=='edit';document.body.classList.toggle('view-list',v==='list');window.scrollTo(0,0);}
function applyCopy(){document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';for(const key of Object.keys(COPY[state.lang]))if($(key))$(key).textContent=tr(key);$('zh').classList.toggle('active',state.lang==='zh');$('en').classList.toggle('active',state.lang==='en');$('listFilter').placeholder=state.lang==='zh'?'搜索项目、地址或创建人':'Search project, address or creator';}
async function loadSignatures(){
  const a=await sb(SIG+'?record_id=eq.'+rec.id+'&select=id,revision,name,role,licence,language,signed_at,signature&order=signed_at.asc');
  state.signatures=(a||[]).map(s=>({id:s.id,revision:s.revision,name:s.name,role:s.role,licence:s.licence,language:s.language,signedAt:s.signed_at,signature:s.signature}));
  locked=state.signatures.some(s=>s.revision===state.revision);
}
async function openRecord(id){
  const a=await sb(REC+'?id=eq.'+encodeURIComponent(id)+'&select=id,user_id,email,revision,data');
  const r=a&&a[0];if(!r)throw new Error(tr('loadRecFailed'));
  const lang=state.lang;rec=r;state=Object.assign(fresh(),r.data||{},{id:r.id,lang,revision:r.revision,signatures:[]});
  state.edits=state.edits||{zh:{},en:{}};state.edits.zh=state.edits.zh||{};state.edits.en=state.edits.en||{};
  ['tasks','ppe','checks','extra'].forEach(k=>{if(!Array.isArray(state[k]))state[k]=[];});state.ratings=state.ratings||{};state.fields=state.fields||{};
  canEdit=role==='manager'||(ses&&r.user_id===ses.uid);dirty=false;
  await loadSignatures();
  showView('edit');render();setSave(tr('saved'));
  history.replaceState(null,'',location.pathname+'?r='+encodeURIComponent(r.id)+'&lang='+state.lang);
  clearInterval(pollTimer);pollTimer=setInterval(poll,20000);
}
async function poll(){
  if(!rec||document.hidden||pushing||dirty||sigWrap.dataset.state==='signing')return;
  try{
    const a=await sb(REC+'?id=eq.'+rec.id+'&select=revision');if(!a||!a[0])return;
    if(a[0].revision!==state.revision){await openRecord(rec.id);return;}
    const m=await sb(SIG+'?record_id=eq.'+rec.id+'&select=id');
    if(m&&m.length!==state.signatures.length){await loadSignatures();renderWorkers();}
  }catch(e){}
}
async function loadList(){
  $('listStatus').textContent=tr('loading');
  try{
    const [rs,ss]=await Promise.all([sb(REC+'?select=id,user_id,email,project,address,revision,updated_at&order=updated_at.desc&limit=300'),sb(SIG+'?select=record_id,revision&limit=10000')]);
    const n={};(ss||[]).forEach(s=>{const o=n[s.record_id]=n[s.record_id]||{};o[s.revision]=(o[s.revision]||0)+1;});
    listData=(rs||[]).map(r=>({...r,signed:(n[r.id]||{})[r.revision]||0,total:Object.values(n[r.id]||{}).reduce((x,y)=>x+y,0)}));
    $('listStatus').textContent='';
  }catch(e){$('listStatus').textContent=tr('loadFailed')+netMsg(e);}
  drawList();
}
function drawList(){
  const q=$('listFilter').value.trim().toLowerCase(),rows=listData.filter(r=>!q||(r.project+' '+r.address+' '+r.email).toLowerCase().includes(q));
  $('records').innerHTML=rows.length?rows.map(r=>'<div class="rec"><button type="button" class="rec-open" data-open="'+r.id+'"><strong>'+esc(r.project||tr('untitled'))+'</strong><span>'+esc(r.address)+'</span><span class="meta2">'+tr('version')+' '+r.revision+' · '+r.signed+' '+tr('signedCount')+' · '+esc(r.email)+' · '+esc(fmt(r.updated_at))+'</span></button>'+((role==='manager'||(ses&&r.user_id===ses.uid&&r.total===0))?'<button type="button" class="rec-del" data-del="'+r.id+'">'+tr('delRec')+'</button>':'')+'</div>').join(''):'<p class="muted">'+tr('noRecords')+'</p>';
}
async function showList(){
  try{await flushSave();}catch(e){}
  clearInterval(pollTimer);rec=null;canEdit=false;locked=false;state.signatures=[];
  showView('list');applyCopy();history.replaceState(null,'',location.pathname+'?lang='+state.lang);await loadList();
}
async function newRecord(){
  const b=$('newRec');b.disabled=true;
  try{
    const f=fresh(),a=await sb(REC+'?select=id',{method:'POST',body:JSON.stringify({project:'',address:'',revision:1,data:snap(f)}),prefer:'return=representation'});
    if(!a||!a[0])throw new Error(tr('notSaved'));await openRecord(a[0].id);
  }catch(e){$('listStatus').textContent=tr('loadFailed')+netMsg(e);}finally{b.disabled=false;}
}
$('newRec').onclick=newRecord;$('refreshList').onclick=loadList;$('backList').onclick=showList;$('listFilter').oninput=drawList;
$('records').addEventListener('click',async e=>{
  const o=e.target.closest('[data-open]'),d=e.target.closest('[data-del]');
  if(o){try{await openRecord(o.dataset.open);}catch(err){$('listStatus').textContent=tr('loadFailed')+netMsg(err);}return;}
  if(d){
    if(!d.dataset.armed){d.dataset.armed='1';d.textContent=tr('delConfirm');setTimeout(()=>{if(d.isConnected){delete d.dataset.armed;d.textContent=tr('delRec');}},4000);return;}
    try{const a=await sb(REC+'?id=eq.'+d.dataset.del,{method:'DELETE',prefer:'return=representation'});if(!a||!a.length)throw new Error(tr('notSaved'));await loadList();}catch(err){$('listStatus').textContent=tr('loadFailed')+netMsg(err);}
  }
});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&dirty)push();});
let reopen=[];
window.addEventListener('beforeprint',()=>{reopen=[...document.querySelectorAll('details:not([open])')];reopen.forEach(d=>d.open=true);});
window.addEventListener('afterprint',()=>{reopen.forEach(d=>d.open=false);reopen=[];});
function waitGate(){return new Promise(res=>{let n=0;const t=setInterval(()=>{const ok=lsGet('ye_gate_ok');if((ok&&ses&&ok.email===ses.email)||++n>60){clearInterval(t);res();}},100);});}
async function boot(){
  applyCopy();
  ses=lsGet(SESKEY);if(!ses||!ses.access_token)return; /* the sign-in gate is showing */
  await waitGate();const ok=lsGet('ye_gate_ok');role=ok&&ses&&ok.email===ses.email&&ok.role==='manager'?'manager':'staff';
  const id=new URLSearchParams(location.search).get('r');
  if(id){try{await openRecord(id);return;}catch(e){}}
  await showList();
}
function fields(list,parent){$(parent).innerHTML=list.map(([key,zh,en,required,type])=>`<div class="${type==='textarea'?'full':''}"><label for="f-${key}">${esc(state.lang==='zh'?zh:en)}${required?' *':''}</label>${type==='textarea'?`<textarea id="f-${key}" data-field="${key}" ${required?'required':''}>${esc(state.fields[key])}</textarea>`:`<input id="f-${key}" data-field="${key}" type="${type||'text'}" value="${esc(state.fields[key])}" ${required?'required':''}>`}</div>`).join('');}
function chips(list,parent,property){$(parent).innerHTML=list.map(([id,zh,en])=>`<label><input type="checkbox" data-list="${property}" value="${id}" ${state[property].includes(id)?'checked':''}><span>${esc(state.lang==='zh'?zh:en)}</span></label>`).join('');}
function activeSteps(){return [...SAFETY.steps.map((row,i)=>({id:'s'+i,row})).filter(x=>state.tasks.includes(x.row[0])),...state.extra.map((row,i)=>({id:'x'+i,row}))];}
function stepText(item,col){const edits=state.edits[state.lang][item.id];return edits&&edits[col]!==undefined?edits[col]:item.row[(state.lang==='zh'?1:4)+col];}
function score(r,prefix){const l=Number(r[prefix+'L']),c=Number(r[prefix+'C']);return l>=1&&l<=5&&c>=1&&c<=5?MATRIX[l-1][c-1]:null;}
function riskSelect(id,key,kind,value){return `<label>${esc(tr(key))}<select data-rating="${id}" data-key="${key}" required><option value="">${tr('choose')}</option>${LEVELS[state.lang][kind].map((s,i)=>`<option value="${i+1}" ${String(i+1)===String(value)?'selected':''}>${i+1} · ${esc(s)}</option>`).join('')}</select></label>`;}
function ratingHtml(r,prefix){const v=score(r,prefix);return `<span class="${v===null?'':CLASSES[v]}">${tr(prefix==='initial'?'initial':'residual')}: ${v===null?'—':LEVELS[state.lang].risk[v]}</span>`;}
function renderSteps(){const items=activeSteps();$('analysis').innerHTML=items.length?items.map((item,i)=>{const r=state.ratings[item.id]||{};return `<div class="step"><h4>${String(i+1).padStart(2,'0')} / ${esc(item.row[0]==='custom'?tr('custom'):SAFETY.tasks.find(t=>t[0]===item.row[0])?.[state.lang==='zh'?1:2])}</h4>${['step','hazard','controls'].map((key,col)=>`<label>${tr(key)}<textarea data-step="${item.id}" data-col="${col}" required>${esc(stepText(item,col))}</textarea></label>`).join('')}<div class="risk-fields"><label>${tr('owner')}<input data-rating="${item.id}" data-key="owner" value="${esc(r.owner)}" required></label>${riskSelect(item.id,'initialL','likelihood',r.initialL)}${riskSelect(item.id,'initialC','consequence',r.initialC)}${riskSelect(item.id,'residualL','likelihood',r.residualL)}${riskSelect(item.id,'residualC','consequence',r.residualC)}<div class="rating" data-result="${item.id}">${ratingHtml(r,'initial')}<br>${ratingHtml(r,'residual')}</div></div></div>`;}).join(''):`<p class="muted">${tr('none')}</p>`;resizeTextareas();}
function renderMatrix(){$('matrix').innerHTML=`<table><caption>${state.lang==='zh'?'可能性 × 后果 · 现场评估示例':'Likelihood × consequence · site assessment example'}</caption><thead><tr><th>${state.lang==='zh'?'可能性 / 后果':'Likelihood / consequence'}</th>${LEVELS[state.lang].consequence.map((s,i)=>`<th>${i+1} · ${s}</th>`).join('')}</tr></thead><tbody>${[4,3,2,1,0].map(l=>`<tr><th>${l+1} · ${LEVELS[state.lang].likelihood[l]}</th>${MATRIX[l].map(r=>`<td class="${CLASSES[r]}">${LEVELS[state.lang].risk[r]}</td>`).join('')}</tr>`).join('')}</tbody></table>`;}
function renderWorkers(){
  const cur=state.signatures.filter(s=>s.revision===state.revision),old=state.signatures.filter(s=>s.revision!==state.revision);
  const item=s=>'<details class="worker"><summary><strong>'+esc(s.name)+'</strong> · '+esc(s.role)+'<span class="when">'+esc(fmt(s.signedAt))+'</span></summary><div class="wbody"><p>'+esc(s.licence||'')+'</p><p>'+tr('version')+' '+s.revision+' · '+tr('language')+': '+esc(s.language)+' · '+tr('id')+': '+esc(s.id)+'</p><img src="'+esc(s.signature)+'" alt="'+esc(s.name)+' signature"></div></details>';
  $('signedWorkers').innerHTML=(cur.length?'<p class="muted">'+cur.length+' '+tr('signedCount')+'</p>'+cur.map(item).join(''):'<p class="muted">'+tr('noSign')+'</p>')+(old.length?'<details class="olds"><summary>'+tr('earlier')+' ('+old.length+')</summary>'+old.map(item).join('')+'</details>':'');
  $('documentFields').disabled=!canEdit||locked;$('status').textContent=tr(locked?'signed':'draft');$('roNote').hidden=canEdit;$('revision').disabled=!canEdit;
}
function render(){document.documentElement.lang=state.lang==='zh'?'zh-CN':'en';for(const key of Object.keys(COPY[state.lang]))if($(key))$(key).textContent=tr(key);$('version').textContent=tr('version')+' '+state.revision;$('footerRevision').textContent=' / '+tr('version')+' '+state.revision;$('zh').classList.toggle('active',state.lang==='zh');$('en').classList.toggle('active',state.lang==='en');fields(PROJECT,'projectFields');fields(BRIEF,'briefFields');fields(CHEM,'chemicals');chips(SAFETY.tasks,'tasks','tasks');chips(SAFETY.ppe,'ppe','ppe');$('checks').innerHTML=SAFETY.checks.map(([id,zh,en])=>`<label class="check"><input type="checkbox" data-list="checks" value="${id}" ${state.checks.includes(id)?'checked':''}><span>${esc(state.lang==='zh'?zh:en)}</span></label>`).join('');renderMatrix();renderSteps();$('workerFields').innerHTML=`<div><label for="workerName">${state.lang==='zh'?'员工姓名':'Worker name'} *</label><input id="workerName" required autocomplete="name"></div><div><label for="workerRole">${state.lang==='zh'?'角色 / 公司':'Role / employer'} *</label><input id="workerRole" required></div><div><label for="workerLicence">${state.lang==='zh'?'适用执照、入场及培训编号':'Applicable licence, induction & training references'}</label><input id="workerLicence"></div><div><label for="workerLanguage">${state.lang==='zh'?'实际交底语言 / 翻译人':'Actual briefing language / interpreter'} *</label><input id="workerLanguage" value="${state.lang==='zh'?'中文':'English'}" required></div>`;renderWorkers();$('saveStatus').textContent=tr(saveFailed?'failed':'saved');$('signError').textContent='';clearSig();}
function resizeTextareas(){document.querySelectorAll('textarea').forEach(t=>{t.style.height='auto';t.style.height=Math.max(86,t.scrollHeight+3)+'px';});}
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.field){state.fields[t.dataset.field]=t.value;save();}if(t.dataset.step){state.edits[state.lang][t.dataset.step]??={};state.edits[state.lang][t.dataset.step][t.dataset.col]=t.value;const other=state.lang==='zh'?'en':'zh';state.edits[other][t.dataset.step]??={};state.edits[other][t.dataset.step][t.dataset.col]=t.value;save();}if(t.dataset.rating){state.ratings[t.dataset.rating]??={};state.ratings[t.dataset.rating][t.dataset.key]=t.value;const result=document.querySelector(`[data-result="${t.dataset.rating}"]`);result.innerHTML=ratingHtml(state.ratings[t.dataset.rating],'initial')+'<br>'+ratingHtml(state.ratings[t.dataset.rating],'residual');save();}if(t.tagName==='TEXTAREA'){t.style.height='auto';t.style.height=Math.max(86,t.scrollHeight+3)+'px';}});
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.list){const prop=t.dataset.list;state[prop]=t.checked?[...new Set([...state[prop],t.value])]:state[prop].filter(x=>x!==t.value);if(prop==='tasks')renderSteps();save();}});
['zh','en'].forEach(lang=>$(lang).onclick=()=>{if(state.lang===lang)return;state.lang=lang;lsSet('ye_safety_lang',lang);if(rec){render();history.replaceState(null,'',location.pathname+'?r='+encodeURIComponent(rec.id)+'&lang='+lang);}else{applyCopy();drawList();}});
$('addStep').onclick=()=>{state.extra.push(['custom','','','','','','']);renderSteps();save();};
$('print').onclick=()=>{resizeTextareas();window.print();};
function download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),5000);}
$('export').onclick=()=>download('YE-JSA-TA-'+state.id+'-R'+state.revision+'.json',JSON.stringify({...state,resolvedAnalysis:activeSteps().map(item=>({id:item.id,group:item.row[0],zh:[0,1,2].map(c=>state.edits.zh[item.id]?.[c]??item.row[1+c]),en:[0,1,2].map(c=>state.edits.en[item.id]?.[c]??item.row[4+c]),risk:state.ratings[item.id]||{}})),matrix:MATRIX,exportedAt:new Date().toISOString(),declarations:COPY.zh.declaration+'\n\n'+COPY.en.declaration},null,2),'application/json');
$('revision').onclick=async()=>{
  if(!canEdit||!confirm(tr('confirmRevision')))return;
  if(locked)$('export').onclick();
  state.revision++;state.checks=[];state.fields.date=localDate();locked=false;dirty=true;await push();
  if(dirty)return;render();$('signError').textContent=tr('revisionCreated');
};
const canvas=$('signature'),ctx=canvas.getContext('2d'),sigWrap=$('sigWrap'),sigImg=$('sigImg');
let sigData='';
/* Signature pad: the page scrolls normally over it until "Tap here to sign" is pressed; Done locks the result (same pattern as the Timesheet) */
function sigSet(s){sigWrap.dataset.state=s;const g=s==='signing';$('sigStart').hidden=s!=='idle';$('sigHint').hidden=!g;canvas.hidden=!g;sigImg.hidden=s!=='done';$('sigUndo').hidden=$('clearSignature').hidden=$('sigDone').hidden=!g;$('sigRedo').hidden=s!=='done';}
function paint(c,W,H,cssW){c.clearRect(0,0,W,H);const lw=Math.min(2.6,Math.max(2,cssW*.006))*(W/cssW);c.lineCap=c.lineJoin='round';c.lineWidth=lw;c.strokeStyle=c.fillStyle='#172033';strokes.forEach(s=>{c.beginPath();if(s.length===1){c.arc(s[0].x*W,s[0].y*H,lw/2,0,Math.PI*2);c.fill();return;}c.moveTo(s[0].x*W,s[0].y*H);for(let i=1;i<s.length;i++){const p=s[i-1],q=s[i];c.quadraticCurveTo(p.x*W,p.y*H,(p.x+q.x)/2*W,(p.y+q.y)/2*H);}const z=s[s.length-1];c.lineTo(z.x*W,z.y*H);c.stroke();});}
function sizePad(){const r=canvas.getBoundingClientRect(),d=window.devicePixelRatio||1;if(!r.width)return;canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);paint(ctx,canvas.width,canvas.height,r.width);}
function repaint(){const r=canvas.getBoundingClientRect();if(r.width)paint(ctx,canvas.width,canvas.height,r.width);}
function point(e){const b=canvas.getBoundingClientRect();return {x:Math.min(1,Math.max(0,(e.clientX-b.left)/b.width)),y:Math.min(1,Math.max(0,(e.clientY-b.top)/b.height))};}
function inkLength(){const r=canvas.getBoundingClientRect(),ar=r.height/r.width;let t=0;strokes.forEach(s=>{for(let i=1;i<s.length;i++)t+=Math.hypot(s[i].x-s[i-1].x,(s[i].y-s[i-1].y)*ar);});return t;}
function clearSig(){strokes=[];currentStroke=null;sigData='';sigImg.removeAttribute('src');sigSet('idle');}
function startSig(){strokes=[];currentStroke=null;sigSet('signing');sizePad();$('signError').textContent='';}
function doneSig(){if(!strokes.length){if(sigData)sigSet('done');else clearSig();return;}if(!(inkLength()>=.2)){$('signError').textContent=tr('sigShort');return;}const r=canvas.getBoundingClientRect(),W=900,H=Math.round(900*r.height/r.width),o=document.createElement('canvas');o.width=W;o.height=H;paint(o.getContext('2d'),W,H,r.width);sigData=o.toDataURL('image/png');sigImg.src=sigData;strokes=[];sigSet('done');$('signError').textContent='';}
canvas.addEventListener('pointerdown',e=>{if(sigWrap.dataset.state!=='signing'||currentStroke)return;if(e.pointerType==='mouse'&&e.button!==0)return;e.preventDefault();try{canvas.setPointerCapture(e.pointerId);}catch(_){}currentStroke=[point(e)];currentStroke.id=e.pointerId;strokes.push(currentStroke);repaint();});
canvas.addEventListener('pointermove',e=>{if(!currentStroke||e.pointerId!==currentStroke.id)return;e.preventDefault();currentStroke.push(point(e));repaint();});
const endStroke=e=>{if(currentStroke&&e.pointerId===currentStroke.id)currentStroke=null;};
canvas.addEventListener('pointerup',endStroke);canvas.addEventListener('pointercancel',endStroke);
['touchstart','touchmove'].forEach(t=>canvas.addEventListener(t,e=>{if(sigWrap.dataset.state==='signing')e.preventDefault();},{passive:false}));
window.addEventListener('resize',()=>{if(sigWrap.dataset.state==='signing')sizePad();});
$('sigStart').onclick=$('sigRedo').onclick=startSig;
$('sigUndo').onclick=()=>{strokes.pop();repaint();};
$('clearSignature').onclick=()=>{strokes=[];repaint();};
$('sigDone').onclick=doneSig;
function validateDocument(){if(!state.tasks.length&&!state.extra.length)return 'noTasks';if([...PROJECT,...BRIEF,...CHEM].some(([k,z,en,req])=>req&&!state.fields[k]?.trim()))return 'incomplete';if(state.checks.length!==SAFETY.checks.length)return 'incomplete';for(const item of activeSteps()){const r=state.ratings[item.id]||{};if(!r.owner?.trim()||score(r,'initial')===null||score(r,'residual')===null||[0,1,2].some(c=>!stepText(item,c).trim()))return 'incomplete';if(score(r,'residual')>=2)return 'highRisk';}return null;}
$('signForm').onsubmit=async e=>{
  e.preventDefault();if(!rec)return;const issue=validateDocument();if(issue){$('signError').textContent=tr(issue);return;}
  if(sigWrap.dataset.state==='signing'){$('signError').textContent=tr('sigNotDone');return;}
  if(!$('ack').checked||!$('workerName').value.trim()||!$('workerRole').value.trim()||!$('workerLanguage').value.trim()||!sigData){$('signError').textContent=tr('needSig');return;}
  const btn=$('sign');btn.disabled=true;$('signError').textContent=tr('saving');
  try{
    await flushSave();
    await sb(SIG,{method:'POST',body:JSON.stringify({record_id:rec.id,revision:state.revision,name:$('workerName').value.trim(),role:$('workerRole').value.trim(),licence:$('workerLicence').value.trim(),language:$('workerLanguage').value.trim(),declaration:COPY[state.lang].declaration,signature:sigData}),prefer:'return=minimal'});
    await loadSignatures();renderWorkers();
    $('workerName').value='';$('workerRole').value='';$('workerLicence').value='';$('ack').checked=false;clearSig();$('signError').textContent=tr('locked');
  }catch(err){$('signError').textContent=netMsg(err);}finally{btn.disabled=false;}
};
window.addEventListener('beforeprint',resizeTextareas);
boot();
