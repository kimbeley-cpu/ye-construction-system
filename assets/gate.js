/* YE Construction sign-in gate.
   Loaded first on every staff system page. Nothing on the page is shown or usable until a
   company account is signed in and is on the right list:
     data-need="manager" -> office list (ye_members) only
     data-need="staff"   -> staff list (ye_staff) or office list
   The session lives in localStorage 'ye_ts_ses' and is shared by all three systems, so one
   sign-in opens all of them. Company data itself is protected on the server by its own rules;
   this gate keeps the tools themselves closed to people who are not signed in. */
(function(){
  var URL_='https://fkyuhthxfzhqmlikbrfg.supabase.co',KEY='sb_publishable_zbPzA78u7V3htYulP1b9_w_53KQFKHn';
  var SES='ye_ts_ses',OK='ye_gate_ok',RECHECK=6*3600*1000;
  var me=document.currentScript,need=(me&&me.getAttribute('data-need'))||'staff',app=(me&&me.getAttribute('data-app'))||'this system';
  var base=me?me.src.replace(/assets\/gate\.js.*$/,''):'/';
  var root=document.documentElement,locked=false,box=null,pending=null;
  function get(k){try{return JSON.parse(localStorage.getItem(k)||'null')}catch(e){return null}}
  function set(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
  function allowed(role){return role==='manager'||(need==='staff'&&role==='staff')}
  function jwt(t){try{return JSON.parse(decodeURIComponent(escape(atob(t.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')))))}catch(e){return{}}}

  var css=document.createElement('style');
  css.textContent='html.ye-locked,html.ye-locked body{overflow:hidden!important}html.ye-locked body>*:not(#yeGate){visibility:hidden!important}'
   +'#yeGate{position:fixed;inset:0;z-index:2147483000;background:#f4f7fb;overflow:auto;display:flex;flex-direction:column;align-items:center;font-family:Arial,"Noto Sans SC","PingFang SC","Microsoft YaHei",sans-serif;color:#172033;visibility:visible}'
   +'#yeGate *{box-sizing:border-box}#yeGate .yg-top{align-self:stretch;flex:none;height:6px;background:linear-gradient(90deg,#24477f 0 34%,#356db7 34% 67%,#62a0db 67%)}'
   +'#yeGate .yg-card{width:calc(100% - 32px);max-width:400px;margin:clamp(24px,9vh,90px) 16px 24px;background:#fff;border:1px solid #d8dee9;border-radius:14px;padding:26px 24px 22px}'
   +'#yeGate img{display:block;width:100%;max-width:280px;height:auto;margin:0 auto 14px}'
   +'#yeGate h1{font-size:19px;margin:0 0 4px;color:#24477f;text-align:center}#yeGate .yg-sub{font-size:13px;color:#5d6b82;text-align:center;margin:0 0 18px;line-height:1.5}'
   +'#yeGate label{display:block;font-size:12px;font-weight:700;color:#5d6b82;margin:12px 0 5px}'
   +'#yeGate input{width:100%;font:inherit;font-size:16px;padding:11px 12px;border:1px solid #c5cfdd;border-radius:8px;background:#fff;color:#172033}'
   +'#yeGate input:focus{outline:none;border-color:#356db7;box-shadow:0 0 0 3px rgba(53,109,183,.22)}'
   +'#yeGate button{width:100%;font:inherit;font-size:16px;font-weight:700;margin-top:18px;padding:12px;border:0;border-radius:8px;background:#356db7;color:#fff;cursor:pointer}'
   +'#yeGate button:disabled{opacity:.6;cursor:default}#yeGate button.yg-alt{background:#e8eef7;color:#24477f;margin-top:10px}'
   +'#yeGate .yg-msg{min-height:20px;margin:12px 0 0;font-size:13px;line-height:1.5;color:#b3261e;text-align:center}#yeGate .yg-msg.ok{color:#5d6b82}'
   +'#yeGate .yg-foot{font-size:12px;color:#5d6b82;text-align:center;margin:16px 0 0;line-height:1.6}#yeGate a{color:#356db7}'
   +'@media print{html.ye-locked body{display:none!important}}';
  (document.head||root).appendChild(css);

  function lock(){locked=true;root.classList.add('ye-locked')}
  function unlock(){locked=false;root.classList.remove('ye-locked');if(box){box.remove();box=null}}
  function whenBody(fn){if(document.body)fn();else document.addEventListener('DOMContentLoaded',fn)}
  function show(view,msg){lock();pending={view:view,msg:msg};whenBody(render)}
  function render(){
    if(!locked||!pending)return;var v=pending.view,msg=pending.msg||'';
    if(!box){box=document.createElement('div');box.id='yeGate';document.body.appendChild(box)}
    var head='<div class="yg-top"></div><div class="yg-card"><img src="'+base+'assets/logo.png" alt="YE Construction" width="1612" height="540">';
    var foot='<p class="yg-foot"><a href="'+base+'">← yeconstruction.co.nz</a></p></div>';
    if(v==='wait'){box.innerHTML=head+'<p class="yg-msg ok" role="status">Checking your sign-in… 正在确认登录…</p>'+foot;return}
    if(v==='denied'){
      box.innerHTML=head+'<h1>No access · 无权限</h1><p class="yg-msg" role="alert">'+msg+'</p><button type="button" class="yg-alt" id="ygOther">Sign in with another account · 换一个账号登录</button>'+foot;
      document.getElementById('ygOther').onclick=function(){set(SES,null);set(OK,null);show('login')};return}
    box.innerHTML=head+'<h1>Staff sign-in · 员工登录</h1><p class="yg-sub">Sign in with your company account to open '+app+'.<br>请用公司账号登录后使用。</p>'
      +'<form id="ygForm" novalidate><label for="ygE">Email · 邮箱</label><input type="email" id="ygE" autocomplete="username" autocapitalize="none" spellcheck="false" required>'
      +'<label for="ygP">Password · 密码</label><input type="password" id="ygP" autocomplete="current-password" required>'
      +'<button type="submit" id="ygGo">Sign in · 登录</button></form><p class="yg-msg" id="ygMsg" role="alert">'+msg+'</p>'
      +'<p class="yg-foot">No account, or forgot your password? Ask the office.<br>没有账号或忘记密码，请联系办公室。</p>'+foot;
    var f=document.getElementById('ygForm');
    f.onsubmit=function(e){e.preventDefault();signIn()};
    try{document.getElementById('ygE').focus({preventScroll:true})}catch(e){}
  }
  function say(t,ok){var m=document.getElementById('ygMsg');if(m){m.textContent=t;m.className='yg-msg'+(ok?' ok':'')}}

  function api(path,token,opt){opt=opt||{};opt.headers=Object.assign({apikey:KEY,'Content-Type':'application/json'},token?{Authorization:'Bearer '+token}:{},opt.headers||{});return fetch(URL_+path,opt)}
  /* -> 'manager' | 'staff' | 'none'; throws {auth:true} when the token is rejected, TypeError when offline */
  async function roleOf(s){
    var r=await api('/rest/v1/ye_members?select=email',s.access_token);
    if(r.status===401||r.status===403)throw {auth:true};
    if(!r.ok)throw new Error('Server error ('+r.status+')');
    if((await r.json()).length)return 'manager';
    r=await api('/rest/v1/ye_staff?select=email&email=ilike.'+encodeURIComponent(s.email),s.access_token);
    if(r.status===401||r.status===403)throw {auth:true};
    if(!r.ok)throw new Error('Server error ('+r.status+')');
    return (await r.json()).length?'staff':'none'}
  function toSes(j,email,old){return{access_token:j.access_token,refresh_token:j.refresh_token,exp:Date.now()+(j.expires_in||3600)*1000,email:(j.user&&j.user.email)||email||(old&&old.email)||'',uid:(j.user&&j.user.id)||jwt(j.access_token).sub||(old&&old.uid)||''}}
  var NO_STAFF='This email is not on the staff list yet. Ask the office to add it.<br>这个邮箱还不在员工名单里，请联系办公室添加。';
  var NO_OFFICE='This account can use the Timesheet and QA Inspection, but not '+app+'.<br>这个账号可以用工时表和 QA 表，但没有这个系统的权限。';
  function denyMsg(role){return role==='none'?NO_STAFF:NO_OFFICE}

  async function signIn(){
    var em=document.getElementById('ygE').value.trim(),pw=document.getElementById('ygP').value,go=document.getElementById('ygGo');
    if(!em||!pw){say('Enter your email and password. 请填写邮箱和密码。');return}
    go.disabled=true;say('Please wait… 请稍候…',true);
    try{
      var r=await api('/auth/v1/token?grant_type=password',null,{method:'POST',body:JSON.stringify({email:em,password:pw})});
      if(!r.ok){var t='';try{var j0=await r.json();t=j0.msg||j0.message||j0.error_description||j0.error||''}catch(e){}
        if(/invalid login|invalid_grant|invalid.*credentials/i.test(t)||r.status===400)throw new Error(/not confirmed/i.test(t)?'This email has not been confirmed yet. Open the confirmation email first. 邮箱还没确认，请先点确认邮件里的链接。':'Wrong email or password. 邮箱或密码不对。');
        throw new Error((t||'Sign-in failed')+' ('+r.status+')')}
      var s=toSes(await r.json(),em),role=await roleOf(s);
      if(role==='none'){go.disabled=false;say('');document.getElementById('ygMsg').innerHTML=NO_STAFF;return}
      set(SES,s);set(OK,{email:s.email,role:role,at:Date.now()});
      if(!allowed(role)){show('denied',NO_OFFICE);return}
      location.reload();
    }catch(e){go.disabled=false;say(e instanceof TypeError?'Cannot reach the server. Check your connection. 连不上服务器，请检查网络。':(e&&e.message)||'Sign-in failed. 登录失败。')}
  }

  /* a session is in storage but this device has not confirmed it yet */
  async function confirm_(s){
    show('wait');
    try{
      var wrote=false;
      if(s.exp-Date.now()<60000){
        var r=await api('/auth/v1/token?grant_type=refresh_token',null,{method:'POST',body:JSON.stringify({refresh_token:s.refresh_token})});
        if(!r.ok){if([400,401,403].indexOf(r.status)>=0)throw {auth:true};throw new Error('Server error ('+r.status+')')}
        s=toSes(await r.json(),null,s);set(SES,s);wrote=true}
      var role=await roleOf(s);set(OK,{email:s.email,role:role,at:Date.now()});
      if(!allowed(role)){show('denied',denyMsg(role));return}
      if(wrote)location.reload();else unlock();
    }catch(e){
      if(e&&e.auth){set(SES,null);set(OK,null);show('login','Your sign-in has expired. Please sign in again. 登录已过期，请重新登录。')}
      else show('login',e instanceof TypeError?'Cannot reach the server to confirm your sign-in. Check your connection and try again. 连不上服务器，无法确认登录，请检查网络后重试。':(e&&e.message)||'')}
  }
  /* already confirmed on this device: stay open, quietly re-confirm the staff list now and then */
  async function recheck(s,ok){
    if(Date.now()-ok.at<RECHECK||s.exp-Date.now()<60000||navigator.onLine===false)return;
    try{var role=await roleOf(s);set(OK,{email:s.email,role:role,at:Date.now()});if(!allowed(role))show('denied',denyMsg(role))}catch(e){}
  }

  function check(){
    var s=get(SES),ok=get(OK);
    if(!s||!s.access_token||!s.refresh_token){set(OK,null);show('login');return}
    if(ok&&ok.email&&ok.email===s.email){
      if(!allowed(ok.role)){show('denied',denyMsg(ok.role));return}
      recheck(s,ok);return}
    confirm_(s)}
  check();
  /* signing out inside a system (or in another tab) closes the gate again */
  setInterval(function(){if(!locked&&!get(SES)){set(OK,null);show('login')}},1500);
  window.addEventListener('storage',function(e){if(e.key===SES&&!e.newValue&&!locked){set(OK,null);show('login')}});
})();
