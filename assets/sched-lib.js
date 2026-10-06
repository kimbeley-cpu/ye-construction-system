/* YE Construction: shared helpers for the Schedule page and the Business System.
   Turns a confirmed (Signed / Paid) quote into one row of ye_sched_jobs (no prices) and keeps that table in step. */
(function(){
  var PLACE=/^(n\/?a|tbc|tbd|project location|client name|client address|project name|estimated timeline|待定|无)$/i;
  var MON={jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12};
  function p2(n){return n<10?'0'+n:''+n}
  function plain(h){var e=document.createElement('div');e.innerHTML=String(h||'').replace(/<br\s*\/?>/gi,' ').replace(/<\/(div|p)>/gi,' ');return e.textContent.replace(/\s+/g,' ').trim()}
  function clean(h){var s=plain(h);return PLACE.test(s)?'':s}
  function validISO(y,m,d){if(m<1||m>12||d<1||d>31)return'';var x=new Date(Date.UTC(y,m-1,d));return x.getUTCMonth()===m-1?y+'-'+p2(m)+'-'+p2(d):''}
  /* Ranges where one side leaves out the month or year ("10-14 Nov 2026", "3 Nov - 7 Nov 2026", "10/11 - 14/11/2026",
     "2026年11月10日-14日") are rewritten so that both sides are full dates before the dates are read. */
  var SEP='\\s*(?:-|–|—|~|to|until|至|到)\\s*',MN='\\b(jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec)[a-z]*\\.?',ORD='(?:st|nd|rd|th)?',PRE='(^|[^\\d/.:-])';
  function mi(x){return MON[String(x).toLowerCase()]}
  function fillRanges(s){
    s=s.replace(new RegExp('(\\d{4})\\s*年\\s*(\\d{1,2})\\s*月\\s*(\\d{1,2})\\s*[日号]?'+SEP+'(?:(\\d{1,2})\\s*月\\s*)?(\\d{1,2})\\s*[日号]?(?!\\d|\\s*[年月/.:点]|\\s*(?:am|pm))','gi'),
      function(_,y,m1,d1,m2,d2){m2=m2||m1;return y+'年'+m1+'月'+d1+'日 - '+(+m2<+m1?+y+1:y)+'年'+m2+'月'+d2+'日 '});
    s=s.replace(new RegExp(PRE+'(\\d{1,2})[/.](\\d{1,2})'+SEP+'(\\d{1,2})[/.](\\d{1,2})[/.](\\d{4}|\\d{2})(?!\\d)','g'),
      function(_,p,d1,m1,d2,m2,y){var Y=+y<100?2000+ +y:+y;return p+d1+'/'+m1+'/'+(+m1>+m2?Y-1:Y)+' - '+d2+'/'+m2+'/'+Y});
    s=s.replace(new RegExp(PRE+'(\\d{1,2})'+SEP+'(\\d{1,2})[/.](\\d{1,2})[/.](\\d{4}|\\d{2})(?!\\d)','g'),
      function(_,p,d1,d2,m2,y){var Y=+y<100?2000+ +y:+y;return p+d1+'/'+m2+'/'+Y+' - '+d2+'/'+m2+'/'+Y});
    s=s.replace(new RegExp(PRE+'(\\d{1,2})'+ORD+SEP+'(\\d{1,2})'+ORD+'\\s+'+MN+',?\\s+(\\d{4})','gi'),
      function(_,p,d1,d2,mo,y){return p+d1+' '+mo+' '+y+' - '+d2+' '+mo+' '+y});
    s=s.replace(new RegExp(PRE+'(\\d{1,2})'+ORD+'\\s+'+MN+SEP+'(\\d{1,2})'+ORD+'\\s+'+MN+',?\\s+(\\d{4})','gi'),
      function(_,p,d1,m1,d2,m2,y){return p+d1+' '+m1+' '+(mi(m1)>mi(m2)?y-1:y)+' - '+d2+' '+m2+' '+y});
    s=s.replace(new RegExp(MN+'\\s+(\\d{1,2})'+ORD+SEP+'(\\d{1,2})'+ORD+',?\\s+(\\d{4})','gi'),
      function(_,mo,d1,d2,y){return d1+' '+mo+' '+y+' - '+d2+' '+mo+' '+y});
    s=s.replace(new RegExp(MN+'\\s+(\\d{1,2})'+ORD+SEP+MN+'\\s+(\\d{1,2})'+ORD+',?\\s+(\\d{4})','gi'),
      function(_,m1,d1,m2,d2,y){return d1+' '+m1+' '+(mi(m1)>mi(m2)?y-1:y)+' - '+d2+' '+m2+' '+y});
    return s}
  /* free text -> {start,end,st,en}; dates are read NZ style (day/month/year) */
  function parseTimeline(txt){
    var s=fillRanges(' '+(txt||'')+' '),dates=[],m,re;
    function yr(v){v=+v;return v<100?2000+v:v}
    re=/(\d{4})-(\d{1,2})-(\d{1,2})/g;while((m=re.exec(s))){var a=validISO(+m[1],+m[2],+m[3]);if(a)dates.push(a)}s=s.replace(re,' ');
    re=/(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})/g;while((m=re.exec(s))){var b=validISO(yr(m[3]),+m[2],+m[1]);if(b)dates.push(b)}s=s.replace(re,' ');
    re=/(\d{1,2})(?:st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec)[a-z]*\.?,?\s+(\d{4})/gi;while((m=re.exec(s))){var c=validISO(+m[3],MON[m[2].toLowerCase()],+m[1]);if(c)dates.push(c)}s=s.replace(re,' ');
    re=/(jan|feb|mar|apr|may|jun|jul|aug|sept|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/gi;while((m=re.exec(s))){var d=validISO(+m[3],MON[m[1].toLowerCase()],+m[2]);if(d)dates.push(d)}s=s.replace(re,' ');
    re=/(\d{4})\s*年\s*(\d{1,2})\s*月\s*(\d{1,2})/g;while((m=re.exec(s))){var f=validISO(+m[1],+m[2],+m[3]);if(f)dates.push(f)}s=s.replace(re,' ');
    dates.sort();
    var st='',en='';
    var tr=/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\s*(?:-|–|—|to|至|~)\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/i.exec(s);
    function hm(h,mi,ap){h=+h;mi=+(mi||0);if(ap){ap=ap.toLowerCase();if(ap==='pm'&&h<12)h+=12;if(ap==='am'&&h===12)h=0}return h<24&&mi<60?p2(h)+':'+p2(mi):''}
    if(tr&&(tr[2]||tr[5]||tr[3]||tr[6])){var a2=tr[3]||tr[6],b2=tr[6]||tr[3];st=hm(tr[1],tr[2],tr[3]||(a2&&+tr[1]<=+tr[4]?a2:''));en=hm(tr[4],tr[5],b2);if(!st||!en){st='';en=''}}
    return{start:dates[0]||'',end:dates.length?dates[dates.length-1]:'',st:st,en:en}}
  /* Which job does a site address belong to? Whole words must match ("12 Smith St" is not "112 Smith St");
     an exact address wins over a longer one that only contains it. */
  function toks(x){return String(x||'').toLowerCase().split(/[^a-z0-9\u4e00-\u9fff]+/).filter(Boolean)}
  function within(x,y){if(x.length<2||x.length>y.length)return false;for(var i=0;i+x.length<=y.length;i++){for(var k=0;k<x.length&&x[k]===y[i+k];)k++;if(k===x.length)return true}return false}
  function matchJob(jobs,loc){
    var a=toks(loc),na=a.join(''),best=null,bs=0;if(na.length<6)return null;
    (jobs||[]).forEach(function(j){var b=toks(j.address),nb=b.join(''),sc=0;if(nb.length<6)return;
      if(na===nb)sc=3;else if(within(a,b)||within(b,a))sc=2;
      else if(/[\u4e00-\u9fff]/.test(na+nb)&&(na.indexOf(nb)>=0||nb.indexOf(na)>=0))sc=1;
      if(sc>bs){bs=sc;best=j}});
    return best}
  function confirmed(type,status){return type==='quote'&&(status==='signed'||status==='paid')}
  /* p: {id,status,no,client,project,name,pn,loc,addr,tl,assignees,casuals} (text fields may still hold HTML) */
  function rowFrom(p){
    var pr=parseTimeline(plain(p.tl));
    return{job_id:p.id,doc_no:clean(p.no),client:clean(p.client),project:clean(p.pn)||clean(p.project)||clean(p.name),address:clean(p.loc)||clean(p.addr),timeline:clean(p.tl),
      start_date:pr.start||null,end_date:pr.end||null,start_time:pr.st,end_time:pr.en,
      assignees:(Array.isArray(p.assignees)?p.assignees:[]).map(function(x){return String(x).trim().toLowerCase()}).filter(Boolean),
      casuals:(Array.isArray(p.casuals)?p.casuals:[]).map(function(x){return String(x).trim()}).filter(Boolean),
      status:p.status||'',synced_at:new Date().toISOString()}}
  /* upsert `rows`, then (unless allIds is null) drop every ye_sched_jobs row whose id is not in `allIds`. call(path,{method,body,prefer}) must throw on failure. */
  async function push(rows,allIds,call){
    for(var i=0;i<rows.length;i+=100)await call('/rest/v1/ye_sched_jobs?on_conflict=job_id',{method:'POST',body:JSON.stringify(rows.slice(i,i+100)),prefer:'resolution=merge-duplicates,return=minimal'});
    if(!allIds)return;
    var keep=allIds.map(function(x){return'"'+String(x).replace(/"/g,'')+'"'}).join(',');
    await call('/rest/v1/ye_sched_jobs?'+(allIds.length?'job_id=not.in.('+encodeURIComponent(keep)+')':'job_id=not.is.null'),{method:'DELETE'})}
  async function remove(ids,call){for(var i=0;i<ids.length;i++)await call('/rest/v1/ye_sched_jobs?job_id=eq.'+encodeURIComponent(ids[i]),{method:'DELETE'})}
  window.YESched={matchJob:matchJob,remove:remove,plain:plain,clean:clean,parseTimeline:parseTimeline,confirmed:confirmed,rowFrom:rowFrom,push:push};
})();
