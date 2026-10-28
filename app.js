(function(){

  var CRITERIA = [
    { key:'trust', label:'신뢰성' },
    { key:'appropriateness', label:'적절성' },
    { key:'recency', label:'최신성' },
    { key:'objectivity', label:'객관성' },
    { key:'expertise', label:'전문성' },
    { key:'depth', label:'정보 충실도' },
    { key:'clarity', label:'이해하기 쉬움' },
    { key:'lowBias', label:'편향성 낮음' },
    { key:'interest', label:'관심도' }
  ];

  var FIELD_TREE = {
    '과학': ['물리','화학','생명과학'],
    '역사': [],
    '경제': [],
    '정치': [],
    '컴퓨터': [],
    '의학': []
  };

  var REJECT_REASONS = ['출처가 불분명','광고성','오래됨','편향됨','AI 생성 의심','관심 없는 분야','너무 어려움','정보가 부족함','수준이 낮음','기타'];

  var ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 3.5v2.5M12 18v2.5M3.5 12h2.5M18 12h2.5" stroke-linecap="round"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/></svg>',
    swipe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="6" y="4" width="12" height="16" rx="1.5"/><rect x="3" y="7" width="12" height="16" rx="1.5" fill="none"/></svg>',
    add: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg>',
    archive: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/><path d="M10 13h4"/></svg>',
    compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M7 3v14M17 21V7" stroke-linecap="round"/><path d="M3 8l4-5 4 5M20 16l-4 5-4-5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    profile: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 19l4-11 4 11M6 15h4"/><path d="M15 10l2-5 2 5M14.5 13h5"/></svg>',
    bulk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 6h11M4 12h7M4 18h7" stroke-linecap="round"/><path d="M17 14v6M14 17h6" stroke-linecap="round"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3.9a7.6 7.6 0 0 0-1.7-1l-.3-2.5H9.9l-.3 2.5a7.6 7.6 0 0 0-1.7 1l-2.3-.9-2 3.4L5.6 11a7.6 7.6 0 0 0 0 2l-2 1.5 2 3.4 2.3-.9a7.6 7.6 0 0 0 1.7 1l.3 2.5h4.2l.3-2.5a7.6 7.6 0 0 0 1.7-1l2.3.9 2-3.4z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16" stroke-linecap="round"/></svg>',
    chevDown: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    opinions: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 5h16v10H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z" stroke-linejoin="round"/><path d="M10 20a2 2 0 0 0 4 0" stroke-linecap="round"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M9.4 9.3a2.7 2.7 0 1 1 3.9 2.4c-.9.5-1.3 1-1.3 2" stroke-linecap="round"/><circle cx="12" cy="17" r="0.9" fill="currentColor" stroke="none"/></svg>'
  };

  // Left-drawer menu structure. Items with "children" render as a collapsible
  // category; items without render as a single clickable row. "opinions" is a
  // placeholder tab (content TBD) grouped under 자료 so it's visible now even
  // though the feature itself isn't built yet.
  var MENU = [
    { id:'home', label:'메인화면', icon: ICONS.home },
    { id:'swipe', label:'카드 평가', icon: ICONS.swipe },
    { key:'material', label:'자료', icon: ICONS.add, children: [
        { id:'add', label:'자료 추가' },
        { id:'bulk', label:'대량 추가' },
        { id:'opinions', label:'의견 수집' }
    ]},
    { key:'vault', label:'자료함', icon: ICONS.archive, children: [
        { id:'approved', label:'승인 자료함' },
        { id:'rejected', label:'반려 자료함' },
        { id:'share', label:'공유 · 그룹' },
        { id:'compare', label:'상대 비교' },
        { id:'profile', label:'성향 분석' }
    ]},
    { id:'settings', label:'설정', icon: ICONS.settings },
    { id:'updates', label:'업데이트 기록', icon: ICONS.bell },
    { id:'help', label:'도움말', icon: ICONS.help }
  ];

  // ---- 업데이트 기록 ----
  // Newest first. When shipping a change: add an entry at the TOP and bump
  // APP_VERSION to its v. Users who have not seen it get a popup on next load.
  var APP_VERSION = '1.13';
  var CHANGELOG = [
    { v: '1.13', date: '2026-10-28', title: 'AI 설정은 관리자가 · 사용량 그래프',
      items: [
        '<b>AI 모델·키 설정이 관리자에게로</b> 옮겨갔어요. 이제 사용자는 모델을 고르거나 설정할 필요가 없어요. 설정 → AI 사용량에서 남은 횟수만 보면 돼요.',
        '관리자 화면에 <b>AI·검색(Tavily) 사용량과 남은 한도</b>, <b>사용자별 사용량 그래프</b>, 최근 7일 추이가 생겼어요.',
        '검색(Tavily) 사용량도 기록하고, 관리자가 사용자별·전체 하루 한도를 정할 수 있어요.'
      ] },
    { v: '1.12', title: '긴급 공지',
      items: ['관리자가 <b>긴급 공지</b>를 올리면 지금 접속해 있는 사람에게도 새로고침 없이 바로 팝업이 떠요.'] },
    { v: '1.11', title: '관리자 모드 · 공지 · AI 사용 한도',
      items: [
        '<b>공지</b>: 관리자가 올린 공지가 접속할 때 팝업으로 떠요.',
        '<b>AI 사용 한도</b>: 관리자가 하루 AI 사용 횟수를 정해 둘 수 있어요. 한도에 닿으면 AI 기능이 그날은 멈추고, 설정 → AI 사용량에서 남은 횟수를 볼 수 있어요.',
        '<b>개인정보 안내</b>: 서비스 운영과 문제 해결을 위해 관리자는 사용 현황(자료 수, AI 사용량, 마지막 접속)을 볼 수 있고, 꼭 필요할 때는 자료·평가 기록도 열람할 수 있어요. 이메일은 관리자 화면에도 나오지 않아요.'
      ] },
    { v: '1.10', title: '새 버전 자동 새로고침',
      items: [
        '새 버전이 올라오면 <b>알림이 뜨고, 하던 일이 끝난 뒤 자동으로 새로고침</b>돼요. 새로고침을 직접 하지 않아도 최신 버전을 쓸 수 있어요.',
        'AI가 일하는 중이거나 입력 중일 때는 기다렸다가 바꿔요. 새로고침 전에 저장도 마쳐요.'
      ] },
    { v: '1.9', title: '점수 다시 매기기 · 업데이트 기록',
      items: [
        '<b>점수 다시 매기기</b>: 예전 채점 기준으로 높게 매겨진 자료를 지금 기준으로 AI가 다시 채점해요 (설정 → 데이터 관리). 대상과 예상 토큰을 보고 고를 수 있어요.',
        '<b>내 기준 다시 학습</b>: 지금까지의 승인·반려 기록을 새 점수로 처음부터 다시 배워요. 토큰이 들지 않아요.',
        '<b>업데이트 기록</b>: 새 버전이 나오면 접속할 때 변경 내용을 알려주고, 메뉴에서 지난 기록도 볼 수 있어요.'
      ] },
    { v: '1.8', title: '분야별 취향 학습',
      items: [
        '분야마다 내 취향을 따로 배워요. 과학은 어려운 자료도 좋아하고 사회는 쉬운 자료를 좋아하는 식으로, <b>한 분야의 평가가 다른 분야의 추천을 망치지 않아요.</b>',
        '성향 분석에서 분야를 골라 그 분야의 내 기준을 따로 볼 수 있어요.'
      ] },
    { v: '1.7', title: 'AI 예측 적중률 · 토큰 절약',
      items: [
        '성향 분석에 <b>AI 예측 적중률</b>이 생겼어요. 프로그램이 예측한 값과 내 실제 결정이 얼마나 맞았는지 보여줘요.',
        'AI에는 짧은 요약만 보내고 점수는 숫자로만 받아서 <b>토큰 사용량이 크게 줄었어요.</b> 설정에서 오늘/누적 사용량을 볼 수 있어요.',
        '자주 반려한 출처는 AI에 묻지 않고 먼저 제외해요.'
      ] },
    { v: '1.6', title: '저장 용량 제한 해제',
      items: ['자료가 많아져도 저장이 막히지 않도록 자료를 여러 쪽으로 나눠 저장해요. 설정에서 저장 용량을 볼 수 있어요.'] },
    { v: '1.5', title: '공유 링크 · 그룹',
      items: [
        '승인·반려 자료함에서 자료를 골라 <b>공유 링크</b>(로그인 없이 읽기 전용)를 만들 수 있어요.',
        '학급·동아리용 <b>그룹</b>을 만들고 코드로 참여해 자료를 모을 수 있어요. 친구가 넣은 자료는 <b>내 서고에 담기</b>로 가져와 직접 평가해요.'
      ] },
    { v: '1.0', title: '기본 기능',
      items: [
        '카드 평가(오른쪽 적절 · 왼쪽 반려), 자료 추가, 대량 추가(URL 목록 · 무분별 수집 · 분별 수집), 의견 수집',
        '승인·반려 자료함, 상대 비교, 성향 분석과 성향 공유',
        '9가지 평가 기준, 처음 안내(튜토리얼)와 도움말'
      ] }
  ];
  function changelogIndex(v){
    for (var i = 0; i < CHANGELOG.length; i++) if (CHANGELOG[i].v === v) return i;
    return -1;
  }
  // entries the user has not seen yet (newest first); unknown/missing => latest 3
  function unseenChangelog(seen){
    var idx = changelogIndex(seen);
    if (idx === 0) return [];
    if (idx > 0) return CHANGELOG.slice(0, idx);
    return CHANGELOG.slice(0, 3);
  }
  function changelogEntryHtml(e, open, isNew){
    return '<details class="help-acc"' + (open ? ' open' : '') + '><summary>v' + e.v + ' · ' + e.title +
      (isNew ? ' <b style="color:var(--gold);font-size:12.5px;margin-left:6px;">NEW</b>' : '') +
      (e.date ? ' <span style="color:var(--cream-soft);font-size:13px;margin-left:6px;">' + e.date + '</span>' : '') + '</summary>' +
      '<div class="help-body"><ul style="margin:0;padding-left:20px;">' + e.items.map(function(t){ return '<li style="margin-bottom:6px;">' + t + '</li>'; }).join('') + '</ul></div></details>';
  }
  function updatesTabHtml(){
    var newCount = unseenChangelog(state.seenVersion).length;
    return '<p class="section-title">업데이트 기록</p>' +
      '<p class="help-lead">현재 버전은 <b>v' + APP_VERSION + '</b>이에요. 새 기능이 생기거나 고쳐지면 여기에 기록돼요.</p>' +
      annBoxHtml() +
      '<div style="margin-bottom:28px;">' + CHANGELOG.map(function(e, i){ return changelogEntryHtml(e, i === 0, state.updateNew && state.updateNew.indexOf(e.v) !== -1); }).join('') + '</div>';
  }
  function updatePopupHtml(){
    var list = state.updatePopup || [];
    return '<div class="modal-overlay" id="upd-overlay" style="z-index:60;"><div class="modal tut-modal" role="dialog" aria-modal="true">' +
      '<button type="button" class="tut-close" id="upd-close-x" aria-label="닫기">' + ICONS.x + '</button>' +
      '<div class="tut-count">UPDATE · v' + APP_VERSION + '</div>' +
      '<h3 style="margin-top:12px;">새로 바뀐 점</h3>' +
      '<div class="tut-body" style="min-height:0;max-height:55vh;overflow-y:auto;">' +
        list.map(function(e){
          return '<p style="margin:14px 0 6px;"><b>v' + e.v + ' · ' + e.title + '</b>' + (e.date ? ' <span class="tut-hint">' + e.date + '</span>' : '') + '</p>' +
            '<ul>' + e.items.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>';
        }).join('') +
      '</div>' +
      '<div class="tut-actions" style="margin-top:18px;"><button type="button" class="tut-skip" id="upd-all">지난 기록 모두 보기</button>' +
      '<div class="right"><button type="button" class="btn small" id="upd-ok">확인</button></div></div>' +
      '</div></div>';
  }
  function dismissUpdatePopup(goAll){
    state.updatePopup = null;
    state.seenVersion = APP_VERSION;
    persistAppData();
    if (goAll) goTab('updates'); else render();
  }

  function uid(){ return 'm' + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }

  // Tavily search goes through a small Cloudflare Worker so the Tavily key
  // stays on the server and never reaches the browser. The worker checks
  // the caller's Firebase ID token against Google first, so only
  // signed-in users of THIS app can use it.
  //
  // IMPORTANT: replace this with your own deployed Worker's URL after
  // running `npx wrangler deploy` in the cf-proxy folder (see its README).
  var PROXY_BASE_URL = 'https://archive-desk-proxy.sunbear1004.workers.dev';

  function callFn(name, data){
    if (!state.user || !fbAuth.currentUser) return Promise.reject(new Error('로그인이 필요해요'));
    return fbAuth.currentUser.getIdToken().then(function(idToken){
      return fetch(PROXY_BASE_URL + '/' + name, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + idToken },
        body: JSON.stringify(data || {})
      });
    }).then(function(res){
      return res.json().catch(function(){ return {}; }).then(function(body){
        if (!res.ok){
          throw new Error((body && body.error) ? body.error : ('프록시 서버 요청이 실패했어요 (' + res.status + ')'));
        }
        return body;
      });
    });
  }

  // Gemini is called DIRECTLY from the browser instead of through the
  // Cloudflare Worker — Google blocks Cloudflare's server IPs for the
  // Gemini API ("User location is not supported"), but works fine from a
  // real visitor's browser. To keep the key from being freely reusable on
  // other sites, restrict it to this app's domain(s) under Google Cloud
  // Console → APIs & Services → Credentials → this key → "Application
  // restrictions" → "Websites" (HTTP referrers), e.g. your-username.github.io/*
  //
  // IMPORTANT: put your own Gemini key here after setting that restriction.
  var GEMINI_API_KEY = 'AQ.Ab8RN6LhnJbgtMkgITrAFGHNSt_rvq6pOcp2R3oUUkkIQ-IxwQ';

  // Token savers: (1) "thinking" is switched off for the short classification
  // jobs this app does (thinking tokens are billed as output), (2) every call's
  // real token count is tallied so the 설정 tab can show usage.
  var noThinkCfg = {};   // model -> true once the model rejected a thinking config
  var usageTimer = null;
  function todayKey(){
    var d = new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }
  // One rolling record per account: today, this month, all time, plus the last 7 days
  // (hist) so the admin can chart trends without a separate log.
  function rollUsage(){
    var day = todayKey(), mon = day.slice(0, 7);
    var u = state.aiUsage;
    if (!u || typeof u !== 'object') u = state.aiUsage = { day: day, calls: 0, tokens: 0, totalCalls: 0, totalTokens: 0 };
    if (u.day !== day){
      if (u.day && (u.calls || u.tcalls)){
        u.hist = (Array.isArray(u.hist) ? u.hist : []).concat([{ d: u.day, c: u.calls || 0, k: u.tokens || 0, t: u.tcalls || 0 }]).slice(-7);
      }
      u.day = day; u.calls = 0; u.tokens = 0; u.tcalls = 0; u.q = 0;
    }
    if (u.mon !== mon){ u.mon = mon; u.mc = 0; u.mk = 0; u.mt = 0; }
    u.totalCalls = u.totalCalls || 0; u.totalTokens = u.totalTokens || 0; u.totalT = u.totalT || 0;
    return u;
  }
  function queueUsageSave(){
    if (usageTimer) clearTimeout(usageTimer);
    usageTimer = setTimeout(function(){ usageTimer = null; persistAppData(); }, 4000);
  }
  function trackUsage(um){
    var u = rollUsage();
    var t = (um && Number(um.totalTokenCount)) || 0;
    u.calls++; u.totalCalls++; u.mc = (u.mc || 0) + 1; u.tokens += t; u.totalTokens += t; u.mk = (u.mk || 0) + t;
    queueUsageSave();
  }
  function trackTavily(){
    var u = rollUsage();
    u.tcalls = (u.tcalls || 0) + 1; u.totalT++; u.mt = (u.mt || 0) + 1;
    queueUsageSave();
  }
  function trackQuotaErr(){
    var u = rollUsage();
    u.q = (u.q || 0) + 1;
    queueUsageSave();
  }

  // Admin-managed AI settings (config/ai): model, API key, and the limits the admin reads off
  // AI Studio / Tavily so the dashboard can show what is left. Falls back to the built-in key.
  function aiKey(){ return (state.aiConfig && state.aiConfig.apiKey) ? state.aiConfig.apiKey : GEMINI_API_KEY; }
  function aiModelOverride(){ return (state.aiConfig && state.aiConfig.model) ? state.aiConfig.model : null; }

  function geminiFetch(prompt, model, jsonMode, allowThinking){
    var limitMsg = aiLimitReason();
    if (limitMsg) return Promise.reject(new Error(limitMsg));
    model = aiModelOverride() || model;
    var useThinkCfg = !allowThinking && !noThinkCfg[model];
    var body = { contents: [{ parts: [{ text: prompt }] }] };
    var gc = {};
    if (jsonMode) gc.responseMimeType = 'application/json';
    if (useThinkCfg) gc.thinkingConfig = { thinkingBudget: 0 };
    if (jsonMode || useThinkCfg) body.generationConfig = gc;
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' +
      encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(aiKey());
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function(res){
      return res.json().then(function(data){
        if (data.error){
          // a model that can't turn thinking off answers 400: retry once without the setting
          if (useThinkCfg && (data.error.code === 400 || res.status === 400)){
            noThinkCfg[model] = true;
            return geminiFetch(prompt, model, jsonMode, allowThinking);
          }
          if (data.error.code === 429 || res.status === 429 || /quota|RESOURCE_EXHAUSTED/i.test(String(data.error.status || '') + String(data.error.message || ''))) trackQuotaErr();
          throw new Error(data.error.message || 'Gemini API 오류');
        }
        var text;
        try {
          text = data.candidates[0].content.parts.map(function(p){ return p.text || ''; }).join('\n').trim();
        } catch(e){
          throw new Error('예상치 못한 Gemini 응답 형식이에요.');
        }
        trackUsage(data.usageMetadata);
        return { text: text };
      });
    });
  }

  function geminiListModelsDirect(keyOverride){
    var url = 'https://generativelanguage.googleapis.com/v1beta/models?key=' + encodeURIComponent(keyOverride || aiKey());
    return fetch(url).then(function(res){ return res.json(); }).then(function(data){
      if (data.error) throw new Error(data.error.message || 'Gemini API 오류');
      if (!data.models) throw new Error('모델 목록을 받지 못했어요.');
      return data.models
        .filter(function(m){ return (m.supportedGenerationMethods || []).indexOf('generateContent') !== -1; })
        .map(function(m){ return { name: (m.name || '').replace(/^models\//, ''), displayName: m.displayName || m.name }; });
    });
  }

  // ---------- Firebase (auth + per-user Firestore storage) ----------
  var firebaseConfig = {
    apiKey: "AIzaSyBNfW3wwTqpuWn4_oXGoll3BKlgwnn6G0I",
    authDomain: "material-archive-439b5.firebaseapp.com",
    databaseURL: "https://material-archive-439b5-default-rtdb.firebaseio.com",
    projectId: "material-archive-439b5",
    storageBucket: "material-archive-439b5.firebasestorage.app",
    messagingSenderId: "757680195894",
    appId: "1:757680195894:web:7b26d0d3a1e479e4cb4b97",
    measurementId: "G-DK8N23R79X"
  };
  var fbAuth = null, fbDb = null, FIREBASE_READY = false;

  function mapAuthError(err){
    var code = err && err.code;
    var map = {
      'auth/user-not-found': '등록되지 않은 이메일이에요',
      'auth/wrong-password': '비밀번호가 올바르지 않아요',
      'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않아요',
      'auth/email-already-in-use': '이미 사용 중인 이메일이에요',
      'auth/weak-password': '비밀번호는 6자 이상이어야 해요',
      'auth/invalid-email': '이메일 형식이 올바르지 않아요',
      'auth/network-request-failed': '네트워크 요청이 막혔어요. GitHub Pages 등 외부 호스팅에서 다시 시도해주세요.',
      'auth/requires-recent-login': '보안을 위해 현재 비밀번호 확인이 필요해요',
      'auth/too-many-requests': '시도가 너무 많아요. 잠시 후 다시 시도해주세요.'
    };
    return map[code] || (err && err.message) || '알 수 없는 오류가 발생했어요';
  }

  // per-user Firestore storage: everything lives in ONE document so a login
  // only ever needs a single read round-trip instead of several.
  function appDataDocRef(uidOverride){
    return fbDb.collection('users').doc(uidOverride || state.user.uid).collection('store').doc('app-data');
  }
  // ---- paged storage (no more 1MB single-document ceiling) ----
  // materials and issues live in "pages" (docs under users/{uid}/store, each
  // kept under ~300KB). A save only rewrites pages whose content changed, and
  // the small app-data doc is committed in the SAME batch, so a crash can
  // never leave the pages and the marker out of step.
  var PAGE_BYTES = 300000;
  var pageCache = {};   // col -> JSON strings of the pages as last written/loaded
  var enc = (typeof TextEncoder !== 'undefined') ? new TextEncoder() : null;
  function byteLen(str){ return enc ? enc.encode(str).length : str.length * 3; }
  function packPages(items){
    var pages = [], cur = [], size = 0;
    (items || []).forEach(function(it){
      var b = byteLen(JSON.stringify(it)) + 8;
      if (cur.length && size + b > PAGE_BYTES){ pages.push(cur); cur = []; size = 0; }
      cur.push(it); size += b;
    });
    if (cur.length || !pages.length) pages.push(cur);
    return pages;
  }
  function pageRef(uid0, col, i){
    return fbDb.collection('users').doc(uid0).collection('store').doc(col + '-p' + ('000' + i).slice(-3));
  }
  // queue the changed pages of one collection into a batch; returns {count, jsons}
  function queuePages(batch, uid0, col, items){
    var pages = packPages(items);
    var jsons = pages.map(function(pg){ return JSON.stringify(pg); });
    var last = pageCache[col] || [];
    jsons.forEach(function(j, i){
      if (last[i] !== j) batch.set(pageRef(uid0, col, i), { idx: i, items: pages[i], updatedAt: Date.now() });
    });
    for (var i = jsons.length; i < last.length; i++) batch.delete(pageRef(uid0, col, i));
    return { count: jsons.length, jsons: jsons };
  }
  function loadPages(uid0, col, n){
    var jobs = [];
    for (var i = 0; i < n; i++) jobs.push(pageRef(uid0, col, i).get());
    return Promise.all(jobs).then(function(snaps){
      var out = [];
      snaps.forEach(function(sn){
        if (!sn.exists) throw new Error('저장된 데이터 일부를 찾지 못했어요. 잠시 후 다시 시도해주세요.');
        out = out.concat(sn.data().items || []);
      });
      return out;
    });
  }
  function primePageCache(col, items, realCount){
    var jsons = packPages(items).map(function(pg){ return JSON.stringify(pg); });
    while (jsons.length < realCount) jsons.push(null);   // stale extra pages get deleted on the next save
    pageCache[col] = jsons;
  }
  function storageStats(){
    var bytes = 0;
    state.materials.forEach(function(m){ bytes += byteLen(JSON.stringify(m)); });
    var ib = 0;
    state.issues.forEach(function(x){ ib += byteLen(JSON.stringify(x)); });
    return { materials: state.materials.length, matBytes: bytes, issues: state.issues.length, issueBytes: ib,
             pages: packPages(state.materials).length + packPages(state.issues).length };
  }

  // Coalescing save: if a write is already in flight when another change
  // comes in, we don't queue a second full round-trip — we just flag
  // "there's newer state" and, once the in-flight write finishes, send ONE
  // follow-up write with whatever is current. This keeps logout's wait time
  // bounded to ~1 write no matter how many swipes happened right before it,
  // while still guaranteeing the latest state actually reaches the server
  // before the session switches (so a just-classified card can't silently
  // revert once the auth token changes).
  var savingInFlight = false;
  var saveDirty = false;
  var currentSavePromise = Promise.resolve();

  // Resolves with 'done' when the given promise settles, or 'timeout' after
  // ms milliseconds — whichever comes first. Used so logout never has to
  // wait indefinitely on a slow save.
  function withTimeout(promise, ms){
    return new Promise(function(resolve){
      var settled = false;
      var timer = setTimeout(function(){
        if (!settled){ settled = true; resolve('timeout'); }
      }, ms);
      Promise.resolve(promise).then(function(){
        if (!settled){ settled = true; clearTimeout(timer); resolve('done'); }
      }, function(){
        if (!settled){ settled = true; clearTimeout(timer); resolve('done'); }
      });
    });
  }

  function persistAppData(){
    if (!state.user || !state.loaded) return Promise.resolve();
    saveDirty = true;
    if (savingInFlight) return currentSavePromise;
    return runSave();
  }

  function runSave(){
    savingInFlight = true;
    saveDirty = false;
    var uidAtCallTime = state.user.uid;
    var batch = fbDb.batch();
    var mq = queuePages(batch, uidAtCallTime, 'materials', state.materials);
    var iq = queuePages(batch, uidAtCallTime, 'issues', state.issues);
    var payload = {
      paged: { v: 2, materials: mq.count, issues: iq.count },
      weights: state.weights,
      bias: state.bias,
      trained: state.trained,
      geminiSettings: state.geminiSettings,
      sharing: state.sharing,
      importedProfiles: state.importedProfiles,
      tutorialDone: state.tutorialDone,
      seenVersion: state.seenVersion,
      seenAnnouncement: state.seenAnnouncement,
      sharedLinks: state.sharedLinks,
      displayName: state.displayName,
      aiUsage: state.aiUsage,
      fieldModel: state.fieldModel,
      updatedAt: Date.now()
    };
    // keep the published share snapshot in step with what was just saved
    publishSharedProfile().catch(function(){});
    batch.set(appDataDocRef(uidAtCallTime), payload);
    currentSavePromise = batch.commit()
      .then(function(){ pageCache.materials = mq.jsons; pageCache.issues = iq.jsons; touchUserIndex(false); })
      .catch(function(e){ showToast('저장에 실패했어요. 네트워크 연결을 확인해주세요.'); })
      .then(function(){
        savingInFlight = false;
        if (saveDirty) return runSave();
      });
    return currentSavePromise;
  }


  function seedMaterials(){
    var now = Date.now();
    return [
      { id: uid(), title:'양자컴퓨팅, 5년 내 상용화 가능할까', field:'과학', subfield:'물리', source:'MIT Technology Review', url:'https://www.technologyreview.com/',
        scores:{trust:82,appropriateness:75,recency:88,objectivity:70,expertise:90,clarity:52,lowBias:65,interest:80}, status:'pending', rejectReason:null, createdAt: now-9000 },
      { id: uid(), title:'조선 후기 실학자들의 토지 개혁론 재조명', field:'역사', subfield:null, source:'한국사연구', url:null,
        scores:{trust:88,appropriateness:80,recency:40,objectivity:85,expertise:92,clarity:60,lowBias:80,interest:55}, status:'pending', rejectReason:null, createdAt: now-8000 },
      { id: uid(), title:'금리 인상이 부동산 시장에 미치는 영향', field:'경제', subfield:null, source:'한국경제신문', url:'https://www.hankyung.com/',
        scores:{trust:70,appropriateness:78,recency:95,objectivity:60,expertise:68,clarity:82,lowBias:55,interest:85}, status:'pending', rejectReason:null, createdAt: now-7000 },
      { id: uid(), title:'이번 개헌 논의, 무엇이 쟁점인가', field:'정치', subfield:null, source:'익명 블로그', url:null,
        scores:{trust:35,appropriateness:40,recency:90,objectivity:30,expertise:25,clarity:70,lowBias:20,interest:60}, status:'pending', rejectReason:null, createdAt: now-6000 },
      { id: uid(), title:'대규모 언어모델의 추론 능력, 어디까지 왔나', field:'컴퓨터', subfield:null, source:'arXiv 프리프린트', url:'https://arxiv.org/',
        scores:{trust:80,appropriateness:85,recency:97,objectivity:75,expertise:95,clarity:45,lowBias:70,interest:92}, status:'pending', rejectReason:null, createdAt: now-5000 },
      { id: uid(), title:'수면 부족이 면역력에 미치는 영향 총정리', field:'의학', subfield:null, source:'대한의학회지', url:null,
        scores:{trust:90,appropriateness:88,recency:75,objectivity:88,expertise:93,clarity:65,lowBias:82,interest:70}, status:'pending', rejectReason:null, createdAt: now-4000 },
      { id: uid(), title:'생명과학으로 본 노화의 비밀, 신약이 답이다?', field:'과학', subfield:'생명과학', source:'제약회사 후원 기사', url:null,
        scores:{trust:45,appropriateness:50,recency:80,objectivity:35,expertise:60,clarity:75,lowBias:30,interest:78}, status:'pending', rejectReason:null, createdAt: now-3000 },
      { id: uid(), title:'화학비료 없이 짓는 농업, 정말 가능한가', field:'과학', subfield:'화학', source:'환경 전문지', url:null,
        scores:{trust:75,appropriateness:82,recency:65,objectivity:78,expertise:80,clarity:70,lowBias:74,interest:66}, status:'pending', rejectReason:null, createdAt: now-2000 }
    ];
  }

  var state = {
    authChecked: false,
    user: null,
    authView: 'login',
    authError: null,
    authLoading: false,
    loaded: false, loadError: null,
    materials: [],
    weights: {},
    bias: 0,
    trained: 0,
    tab: 'home',
    menuOpen: false,
    menuExpanded: { material: true, vault: true },
    pendingReject: null,
    toast: null,
    compare: { mode:'free', field:'all', a:null, b:null, critAnswers:{}, overall:null },
    bulk: { mode: 'urls', sel: { source: 'self', sharedCache: {}, field: '', keyword: '', count: 10, strict: 'normal', loading: false, statusMsg: null, lastAdded: [], lastFits: {} } },
    sharing: { code: null, nickname: '', includeTitles: true },
    importedProfiles: [],
    shareUi: { loading: false, msg: null, importLoading: false, importMsg: null },
    home: { engine: 'tavily', field: '', keyword: '', count: 5, loading: false, statusMsg: null, lastAdded: [] },
    geminiSettings: { model: 'gemini-2.5-flash' },
    geminiMsg: null,
    geminiModelList: null,
    geminiModelListLoading: false,
    geminiTestLoading: false,
    summaryLoading: false,
    summaryError: null,
    summaryTargetId: null,
    rejFilter: 'all',
    tutorialOpen: false, tutorialStep: 0, tutorialDone: false,
    apv: { q: '', field: 'all', sort: 'recent' },
    fieldModel: {}, profileField: 'all',
    seenVersion: null, updatePopup: null, updateNew: null,
    aiConfig: null, isAdmin: false, announcement: null, annPopup: null, seenAnnouncement: null, limits: { def: null, mine: null },
    admin: { sub: 'stats', users: null, userLimits: {}, loadingUsers: false, userErr: null, detail: null, groups: null, links: null, loadingGl: false, glErr: null, msg: null, annTitle: '', annBody: '', annUrgent: false, busy: false, period: 'today', aiForm: null, aiTestBusy: false, aiModels: null },
    retrainMsg: null,
    rescore: { scope: 'old', retrain: true, busy: false, done: 0, total: 0, msg: null },
    sel: {}, selVisible: [], shareModal: null,
    sharedLinks: [], displayName: '', viewer: null, aiUsage: null,
    groups: { list: null, loading: false, busy: false, err: null, msg: null, active: null, items: null, itemsLoading: false, itemsErr: null, filter: 'all', newName: '', joinCode: '' },
    acctEmailMsg: null, acctEmailLoading: false,
    acctPwMsg: null, acctPwLoading: false,
    acctDeleteMsg: null, acctDeleteLoading: false,
    issues: [],
    opinionsView: {
      mode: 'list', activeIssueId: null,
      newTitle: '', newContext: '',
      collectTopic: '', collectCount: 6, collectLoading: false, collectMsg: null,
      manualText: '', manualSource: '', manualUrl: '',
      clusterLoading: false, clusterMsg: null
    }
  };

  function zeroWeights(){
    var w = {};
    CRITERIA.forEach(function(c){ w[c.key] = 0; });
    return w;
  }

  // Criteria added after an account was created (e.g. 정보 충실도) are missing
  // from its stored materials/weights: give them a neutral 50 / 0 so old data
  // keeps working without distorting the learned weights.
  function normalizeCriteriaData(){
    state.materials.forEach(function(m){
      if (!m.scores) m.scores = {};
      CRITERIA.forEach(function(c){ if (typeof m.scores[c.key] !== 'number') m.scores[c.key] = 50; });
    });
    state.weights = state.weights || {};
    CRITERIA.forEach(function(c){ if (typeof state.weights[c.key] !== 'number') state.weights[c.key] = 0; });
    if (state.fieldModel && typeof state.fieldModel === 'object'){
      Object.keys(state.fieldModel).forEach(function(f){
        var fm = state.fieldModel[f];
        if (!fm || typeof fm !== 'object'){ delete state.fieldModel[f]; return; }
        fm.d = fm.d || {};
        TASTE_KEYS.forEach(function(k){ if (typeof fm.d[k] !== 'number') fm.d[k] = 0; });
        if (typeof fm.b !== 'number') fm.b = 0;
        if (typeof fm.n !== 'number') fm.n = 0;
      });
    }
  }

  async function loadState(isNewUser){
    if (isNewUser){
      // brand-new account: nothing exists in Firestore yet, so skip the read
      // round-trip (and its failure/catch delay) entirely and start from seed data.
      state.materials = seedMaterials();
      state.weights = zeroWeights(); state.bias = 0; state.trained = 0;
      state.geminiSettings = { model: 'gemini-2.5-flash' };
      state.issues = [];
      state.sharing = { code: null, nickname: '', includeTitles: true };
      state.importedProfiles = [];
      state.sharedLinks = []; state.displayName = ''; state.aiUsage = null; state.fieldModel = {};
      normalizeCriteriaData();
      state.tutorialDone = false; state.tutorialOpen = true; state.tutorialStep = 0;
      state.seenVersion = APP_VERSION;   // nothing is "new" to a brand-new account
      state.loaded = true;
      render();
      persistAppData(); // background save, no need to make the user wait
      afterLoadHooks();
      return;
    }

    pageCache = {};
    state.loadError = null;
    var data = null;
    try {
      var uidAtLoad = state.user.uid;
      var snap = await appDataDocRef().get();
      if (snap.exists){
        data = snap.data();
        if (data.paged && data.paged.v === 2){
          // new layout: materials/issues live in pages
          var mats = await loadPages(uidAtLoad, 'materials', data.paged.materials || 0);
          var iss = await loadPages(uidAtLoad, 'issues', data.paged.issues || 0);
          data.materials = mats; data.issues = iss;
          primePageCache('materials', mats, data.paged.materials || 0);
          primePageCache('issues', iss, data.paged.issues || 0);
        }
        // legacy layout (materials inline) falls through; the next save migrates it to pages
      }
    } catch(e){
      // A failed READ must never be treated as "no data": saving seed data now
      // would overwrite the user's real materials. Show a retry screen instead.
      if (!state.user) return;
      state.loadError = (e && e.message) ? e.message : '알 수 없는 오류';
      state.loaded = false;
      render();
      return;
    }
    if (data){
      state.materials = data.materials || seedMaterials();
      state.weights = data.weights || zeroWeights();
      state.bias = typeof data.bias === 'number' ? data.bias : 0;
      state.trained = data.trained || 0;
      state.geminiSettings = data.geminiSettings || { model: 'gemini-2.5-flash' };
      state.issues = data.issues || [];
      state.sharing = data.sharing || { code: null, nickname: '', includeTitles: true };
      state.importedProfiles = data.importedProfiles || [];
      state.tutorialDone = data.tutorialDone === true;
      state.seenVersion = typeof data.seenVersion === 'string' ? data.seenVersion : null;
      state.seenAnnouncement = typeof data.seenAnnouncement === 'string' ? data.seenAnnouncement : null;
      state.sharedLinks = Array.isArray(data.sharedLinks) ? data.sharedLinks : [];
      state.displayName = typeof data.displayName === 'string' ? data.displayName : '';
      state.aiUsage = (data.aiUsage && typeof data.aiUsage === 'object') ? data.aiUsage : null;
      state.fieldModel = (data.fieldModel && typeof data.fieldModel === 'object') ? data.fieldModel : null;
    } else {
      // account exists but has never saved anything: start from seed data
      state.materials = seedMaterials();
      state.weights = zeroWeights(); state.bias = 0; state.trained = 0;
      state.geminiSettings = { model: 'gemini-2.5-flash' };
      state.issues = [];
      state.sharing = { code: null, nickname: '', includeTitles: true };
      state.importedProfiles = [];
      state.sharedLinks = []; state.displayName = ''; state.aiUsage = null; state.fieldModel = {};
      state.tutorialDone = false; state.seenVersion = APP_VERSION;
      state.loaded = true;
      persistAppData();
    }

    normalizeCriteriaData();
    var rebuilt = false;
    if (!state.fieldModel) rebuilt = rebuildFieldModel();   // older account: derive field offsets from past decisions
    state.profileField = 'all';
    state.tutorialOpen = !state.tutorialDone; state.tutorialStep = 0;
    // first load after a new deploy: tell the user what changed (not while the first-run tutorial is showing)
    var unseen = unseenChangelog(state.seenVersion);
    state.updateNew = unseen.map(function(e){ return e.v; });
    if (state.tutorialDone && unseen.length) state.updatePopup = unseen;
    else if (!state.tutorialDone) state.seenVersion = APP_VERSION;
    state.loaded = true;
    render();
    if (rebuilt) persistAppData();
    if (data && !(data.paged && data.paged.v === 2)) persistAppData();   // one-time move to the paged layout
    afterLoadHooks();
  }

  async function saveMaterials(){ return persistAppData(); }
  async function saveModel(){ return persistAppData(); }
  async function saveGeminiSettings(){ return persistAppData(); }
  async function saveIssues(){ return persistAppData(); }

  function sigmoid(z){ return 1/(1+Math.exp(-z)); }

  // ---- per-field taste model ----
  // Quality criteria (trust, objectivity, lowBias, recency) mean the same thing
  // in every subject, so they keep ONE global weight. Taste/level criteria
  // (appropriateness, clarity, interest, plus expertise and depth, which decide
  // how advanced a source is) are personal and differ by subject: a strong
  // science student may want expert, deep papers in science but plain
  // explanations in social studies. Each field therefore learns its own small
  // offset on top of the global weight (simulation: ~0.72 accuracy after 56
  // cards vs ~0.45 for a single global model). state.fieldModel[field] = { d:{taste weight offsets}, b:bias offset, n:count }.
  var TASTE_KEYS = ['appropriateness', 'clarity', 'interest', 'expertise', 'depth'];
  function isTaste(k){ return TASTE_KEYS.indexOf(k) !== -1; }
  function fieldEntry(field, create){
    if (!field) return null;
    var fm = state.fieldModel[field];
    if (!fm && create){
      fm = state.fieldModel[field] = { d: {}, b: 0, n: 0 };
      TASTE_KEYS.forEach(function(k){ fm.d[k] = 0; });
    }
    return fm || null;
  }
  function weightsFor(field){
    var fm = fieldEntry(field, false), w = {};
    CRITERIA.forEach(function(c){
      w[c.key] = (state.weights[c.key] || 0) + ((fm && isTaste(c.key)) ? (fm.d[c.key] || 0) : 0);
    });
    return w;
  }
  function biasFor(field){
    var fm = fieldEntry(field, false);
    return state.bias + (fm ? (fm.b || 0) : 0);
  }
  function fieldDecisionCount(field){
    var fm = fieldEntry(field, false);
    return fm ? fm.n : 0;
  }

  // field: the subject of the card(s) being learned from. diffMode: vec is an
  // A-minus-B difference (상대 비교), where an intercept makes no sense.
  function trainStep(vec, label, field, diffMode){
    var lr = 0.15, dlr = 0.5, shrink = 0.02;
    var w = weightsFor(field);
    var z = biasFor(field);
    CRITERIA.forEach(function(c){ z += w[c.key] * (vec[c.key] || 0); });
    var err = label - sigmoid(z);
    var newW = {};
    CRITERIA.forEach(function(c){ newW[c.key] = (state.weights[c.key] || 0) + lr * err * (vec[c.key] || 0); });
    state.weights = newW;
    state.bias = state.bias + lr * err;
    var fm = fieldEntry(field, true);
    if (fm){
      TASTE_KEYS.forEach(function(k){ fm.d[k] = fm.d[k] * (1 - shrink) + dlr * err * (vec[k] || 0); });
      if (!diffMode) fm.b = fm.b * (1 - shrink) + 0.1 * err;
      fm.n += 1;
    }
    state.trained += 1;
  }

  // One-time: accounts created before per-field learning have decisions but no
  // field offsets. Fit the offsets on top of the (already trained) global weights
  // by replaying past decisions; the global weights are left untouched.
  function rebuildFieldModel(){
    state.fieldModel = {};
    var rows = state.materials.filter(function(m){
      return (m.status === 'approved' || m.status === 'rejected') && m.field;
    }).sort(function(a, b){ return (a.decidedAt || a.createdAt || 0) - (b.decidedAt || b.createdAt || 0); });
    if (!rows.length) return false;
    var dlr = 0.5, shrink = 0.02;
    for (var ep = 0; ep < 3; ep++){
      rows.forEach(function(m){
        var fm = fieldEntry(m.field, true);
        var vec = scoreVec(m), w = weightsFor(m.field);
        var z = biasFor(m.field);
        CRITERIA.forEach(function(c){ z += w[c.key] * vec[c.key]; });
        var err = (m.status === 'approved' ? 1 : 0) - sigmoid(z);
        TASTE_KEYS.forEach(function(k){ fm.d[k] = fm.d[k] * (1 - shrink) + dlr * err * vec[k]; });
        fm.b = fm.b * (1 - shrink) + 0.1 * err;
        if (ep === 0) fm.n += 1;
      });
    }
    return true;
  }

  function scoreVec(material){
    var v = {};
    CRITERIA.forEach(function(c){ v[c.key] = (material.scores[c.key]||0)/100; });
    return v;
  }

  function predictFit(material){
    var w = weightsFor(material.field);
    var z = biasFor(material.field);
    CRITERIA.forEach(function(c){ z += w[c.key] * ((material.scores[c.key]||0)/100); });
    return sigmoid(z);
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>"']/g, function(c){
      return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c];
    });
  }

  function showToast(msg){
    state.toast = msg;
    render();
    var duration = Math.max(1800, Math.min(6000, msg.length * 60));
    setTimeout(function(){ state.toast = null; renderToastOnly(); }, duration);
  }

  function renderToastOnly(){
    var el = document.getElementById('toast-el');
    if (el) el.remove();
  }

  // ---------- decisions ----------
  function decideSwipe(material, approve, reason){
    material.status = approve ? 'approved' : 'rejected';
    material.rejectReason = approve ? null : (reason || '기타');
    material.decidedAt = Date.now();
    // remember what the learned model predicted BEFORE it learns from this decision
    material.predFit = Math.round(predictFit(material) * 100) / 100;
    material.predN = state.trained;
    trainStep(scoreVec(material), approve ? 1 : 0, material.field);
    saveMaterials(); saveModel();
    state.pendingReject = null;
    state.summaryLoading = false; state.summaryError = null; state.summaryTargetId = null;
    render();
  }

  function restoreToPending(material){
    material.status = 'pending';
    material.rejectReason = null;
    saveMaterials();
    render();
  }

  // ---------- rendering ----------
  function loadingHtml(msg){
    return '<div style="padding:80px 0;text-align:center;font-family:var(--font-mono);font-size:14px;color:var(--cream-soft);">' + escapeHtml(msg) + '</div>';
  }

  function firebaseErrorHtml(){
    return '<div class="empty" style="height:auto;padding:40px 20px;">' +
      '<h3>로그인 시스템을 불러오지 못했어요</h3>' +
      '<p>Firebase 연결이 차단된 것 같아요. Claude 미리보기 화면에서는 외부 인증 서버 요청이 막혀 있을 수 있습니다. 이 파일을 GitHub Pages 등 외부 호스팅에 올린 뒤 다시 열어보세요.</p>' +
      '</div>';
  }

  function authScreenHtml(){
    var mode = state.authView;
    var err = state.authError;
    return '' +
      '<div style="max-width:340px;margin:50px auto 0;">' +
        '<div style="text-align:center;margin-bottom:26px;">' +
          '<p class="eyebrow" style="color:var(--gold);font-family:var(--font-mono);font-size:13px;letter-spacing:0.18em;text-transform:uppercase;margin:0 0 6px;">개인 자료 서고</p>' +
          '<h1 style="font-family:var(--font-display);font-size:28px;margin:0;color:var(--cream);">' + (mode==='login' ? '로그인' : '회원가입') + '</h1>' +
          '<div style="font-size:14px;color:var(--cream-soft);margin-top:6px;">계정마다 자신만의 평가 기록과 성향 분석이 저장돼요</div>' +
        '</div>' +
        '<div class="field"><label>이메일</label><input type="text" id="auth-email" placeholder="you@example.com" /></div>' +
        '<div class="field"><label>비밀번호</label><input type="password" id="auth-pw" placeholder="6자 이상" /></div>' +
        (err ? '<p style="color:var(--reject);font-size:14px;margin:-6px 0 14px;">' + escapeHtml(err) + '</p>' : '') +
        '<button class="btn" id="auth-submit" style="width:100%;margin-bottom:10px;" ' + (state.authLoading?'disabled':'') + '>' + (state.authLoading ? '처리 중...' : (mode==='login' ? '로그인' : '계정 만들기')) + '</button>' +
        '<button class="btn ghost small" id="auth-toggle" style="width:100%;">' + (mode==='login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인') + '</button>' +
      '</div>';
  }

  function attachAuthHandlers(){
    var toggle = document.getElementById('auth-toggle');
    if (toggle) toggle.addEventListener('click', function(){
      state.authView = (state.authView === 'login') ? 'signup' : 'login';
      state.authError = null;
      render();
    });
    var submit = document.getElementById('auth-submit');
    if (submit) submit.addEventListener('click', function(){
      var email = document.getElementById('auth-email').value.trim();
      var pw = document.getElementById('auth-pw').value;
      if (!email || !pw){ state.authError = '이메일과 비밀번호를 입력해주세요'; render(); return; }
      state.authLoading = true; state.authError = null; render();
      var action = (state.authView === 'login')
        ? fbAuth.signInWithEmailAndPassword(email, pw)
        : fbAuth.createUserWithEmailAndPassword(email, pw);
      action.then(function(){
        state.authLoading = false;
        // onAuthStateChanged handles loading data + re-rendering
      }).catch(function(err){
        state.authLoading = false;
        state.authError = mapAuthError(err);
        render();
      });
    });
  }

  function render(){
    var app = document.getElementById('app-mount');
    if (state.viewer){
      app.innerHTML = FIREBASE_READY ? viewerHtml() : firebaseErrorHtml();
      if (FIREBASE_READY) attachViewerHandlers();
      return;
    }
    if (!state.authChecked){
      app.innerHTML = loadingHtml('연결 확인 중...');
      return;
    }
    if (!FIREBASE_READY){
      app.innerHTML = firebaseErrorHtml();
      return;
    }
    if (!state.user){
      app.innerHTML = authScreenHtml();
      attachAuthHandlers();
      return;
    }
    if (!state.loaded){
      if (state.loadError){
        app.innerHTML = '<div class="empty" style="height:auto;padding:40px 20px;"><h3>서고를 불러오지 못했어요</h3>' +
          '<p>' + escapeHtml(state.loadError) + '</p><p>저장된 자료는 그대로 안전해요. 네트워크를 확인하고 다시 시도해주세요.</p>' +
          '<p style="margin-top:14px;"><button class="btn small" id="load-retry">다시 불러오기</button> ' +
          '<button class="btn ghost small" id="load-logout">로그아웃</button></p></div>';
        document.getElementById('load-retry').addEventListener('click', function(){ state.loadError = null; render(); loadState(false); });
        document.getElementById('load-logout').addEventListener('click', function(){ fbAuth.signOut(); });
        return;
      }
      app.innerHTML = loadingHtml('서고를 여는 중...');
      return;
    }
    var approved = state.materials.filter(function(m){ return m.status==='approved'; });
    var rejected = state.materials.filter(function(m){ return m.status==='rejected'; });
    var pending = state.materials.filter(function(m){ return m.status==='pending'; });

    var html = '';
    html += userBarHtml();
    html += headerHtml(approved.length, rejected.length, pending.length);
    html += '<div id="tab-content">';
    if (state.tab === 'home') html += homeTabHtml(approved, rejected, pending);
    else if (state.tab === 'swipe') html += swipeTabHtml(pending);
    else if (state.tab === 'add') html += addTabHtml();
    else if (state.tab === 'bulk') html += bulkTabHtml();
    else if (state.tab === 'opinions') html += opinionsTabHtml();
    else if (state.tab === 'approved') html += approvedTabHtml(approved);
    else if (state.tab === 'rejected') html += rejectedTabHtml(rejected);
    else if (state.tab === 'share') html += shareTabHtml();
    else if (state.tab === 'compare') html += compareTabHtml(approved);
    else if (state.tab === 'profile') html += profileTabHtml(approved, rejected, pending);
    else if (state.tab === 'settings') html += settingsTabHtml();
    else if (state.tab === 'updates') html += updatesTabHtml();
    else if (state.tab === 'admin') html += adminTabHtml();
    else if (state.tab === 'help') html += helpTabHtml();
    html += '</div>';
    if (state.pendingReject) html += reasonModalHtml();
    if (state.shareModal) html += shareModalHtml();
    if (state.menuOpen) html += menuDrawerHtml();
    if (state.annPopup && state.annPopup.level === 'urgent') html += annPopupHtml();
    else if (state.tutorialOpen) html += tutorialHtml();
    else if (state.updatePopup) html += updatePopupHtml();
    else if (state.annPopup) html += annPopupHtml();
    if (state.toast) html += '<div class="toast" id="toast-el">' + escapeHtml(state.toast) + '</div>';

    app.innerHTML = html;
    attachHandlers(pending, approved, rejected);
    var logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', function(){
      logoutBtn.disabled = true;
      logoutBtn.textContent = '저장 확인 중...';
      var waitForSave = Promise.resolve(currentSavePromise).then(function(){
        // if a save became dirty again right as we were about to leave, wait once more
        return saveDirty ? currentSavePromise : null;
      });
      // Don't let logout hang forever on a slow connection — give the save
      // a few seconds to finish, then log out anyway rather than stall the UI.
      withTimeout(waitForSave, 3000).then(function(result){
        if (result === 'timeout'){
          showToast('저장이 지연되고 있어 우선 로그아웃했어요. 방금 변경사항은 다시 로그인 후 확인해주세요.');
        }
        return fbAuth.signOut();
      }).catch(function(){
        return fbAuth.signOut();
      });
    });
  }

  function userBarHtml(){
    return '<div style="display:flex;justify-content:flex-end;align-items:center;gap:10px;margin-bottom:8px;font-family:var(--font-mono);font-size:13px;color:var(--cream-soft);">' +
      escapeHtml(state.user.email) +
      '<button id="logout-btn" class="btn ghost small" style="padding:4px 10px;">로그아웃</button>' +
    '</div>';
  }

  function headerHtml(a,r,p){
    return '' +
      '<div class="header">' +
        '<div class="header-left">' +
          '<button type="button" class="menu-btn" id="menu-toggle-btn" aria-label="메뉴">' + ICONS.menu + '</button>' +
          '<div class="title-block">' +
            '<p class="eyebrow">개인 자료 서고 · Personal Curation Desk</p>' +
            '<h1>자료 평가 서고</h1>' +
            '<div class="sub">당신의 판단 기준을 배우는 자료 큐레이터</div>' +
          '</div>' +
        '</div>' +
        '<div class="counts">승인 <b>' + a + '</b><br/>반려 <b>' + r + '</b><br/>대기 <b>' + p + '</b></div>' +
      '</div>';
  }

  function menuDrawerHtml(){
    var html = '<div class="menu-overlay" id="menu-overlay"></div>' +
      '<div class="menu-drawer">' +
        '<div class="menu-drawer-head">' +
          '<span class="menu-drawer-title">메뉴</span>' +
          '<button type="button" class="menu-close-btn" id="menu-close-btn">' + ICONS.x + '</button>' +
        '</div>';
    MENU.concat(state.isAdmin ? [{ id:'admin', label:'관리자', icon: ICONS.settings }] : []).forEach(function(entry){
      if (entry.children){
        var hasActive = entry.children.some(function(c){ return c.id === state.tab; });
        var open = state.menuExpanded[entry.key] !== false;
        html += '<button type="button" class="menu-cat-btn' + (open?' open':'') + (hasActive?' has-active':'') + '" data-menu-cat="' + entry.key + '">' +
          '<span class="menu-cat-left">' + entry.icon.replace('<svg ', '<svg class="icon" ') + '<span>' + entry.label + '</span></span>' +
          ICONS.chevDown +
        '</button>';
        if (open){
          html += '<div class="menu-sub-list">';
          entry.children.forEach(function(c){
            html += '<button type="button" class="menu-item' + (state.tab===c.id?' active':'') + '" data-menu-tab="' + c.id + '"><span>' + c.label + '</span></button>';
          });
          html += '</div>';
        }
      } else {
        html += '<button type="button" class="menu-item' + (state.tab===entry.id?' active':'') + '" data-menu-tab="' + entry.id + '">' + entry.icon + '<span>' + entry.label + '</span></button>';
      }
    });
    html += '</div>';
    return html;
  }

  // ---- Swipe tab ----
  function scoreRowsHtml(material){
    var html = '<div class="card-scores">';
    CRITERIA.forEach(function(c){
      var v = material.scores[c.key] != null ? material.scores[c.key] : '-';
      html += '<div class="score-row"><span>' + c.label + '</span><span class="dots">' + '.'.repeat(40) + '</span><b>' + v + '</b></div>';
    });
    html += '</div>';
    return html;
  }

  function fieldLabel(m){
    return m.field + (m.subfield ? ' · ' + m.subfield : '');
  }

  function moreLinkHtml(material, extraClass){
    if (material.url){
      return '<div class="card-more ' + (extraClass||'') + '"><a class="more-link" href="' + escapeHtml(material.url) + '" target="_blank" rel="noopener noreferrer" data-nodrag="1">원문 보기 →</a></div>';
    }
    return '<div class="card-more ' + (extraClass||'') + '"><span class="no-link">원문 URL 없음</span></div>';
  }

  function summaryBlockHtml(material){
    var isLoading = state.summaryLoading && state.summaryTargetId === material.id;
    var errMsg = (!isLoading && state.summaryTargetId === material.id) ? state.summaryError : null;

    var html = '<div class="ai-summary">';
    if (material.summary){
      html += '<div class="ai-summary-label">✦ AI 요약 (제목·출처 기반 추정)</div><p class="ai-summary-text">' + escapeHtml(material.summary) + '</p>';
      if (isLoading){
        html += '<div class="ai-summary-status">다시 만드는 중...</div>';
      } else {
        html += '<button type="button" class="btn ghost small" id="summary-generate" data-material-id="' + material.id + '" data-nodrag="1">다시 생성</button>';
      }
    } else if (isLoading){
      html += '<div class="ai-summary-status">AI가 요약을 만들고 있어요...</div>';
    } else {
      html += '<button type="button" class="btn ghost small" id="summary-generate" data-material-id="' + material.id + '" data-nodrag="1">AI 요약 보기</button>';
      if (errMsg) html += '<p class="ai-summary-error">' + escapeHtml(errMsg) + '</p>';
    }
    html += '</div>';
    return html;
  }

  function cardHtml(material, cls){
    return '' +
      '<div class="card ' + cls + '" ' + (cls==='top' ? 'id="top-card" data-id="'+material.id+'"' : '') + '>' +
        '<div class="card-tab">' + escapeHtml(fieldLabel(material)) + '</div>' +
        '<div class="card-perf"></div>' +
        '<div class="card-body">' +
          '<div class="card-title">' + escapeHtml(material.title) + '</div>' +
          '<div class="card-meta">출처 · ' + escapeHtml(material.source || '미상') + '</div>' +
          moreLinkHtml(material) +
          (cls==='top' ? summaryBlockHtml(material) : '') +
          (material.matchReason ? '<div class="match-note">✦ ' + escapeHtml(material.matchReason) + '</div>' : '') +
          scoreRowsHtml(material) +
        '</div>' +
        (cls==='top' ? '<div class="stamp approve" id="stamp-approve">적절</div><div class="stamp reject" id="stamp-reject">반려</div>' : '') +
      '</div>';
  }

  function homeTabHtml(approved, rejected, pending){
    var h = state.home;
    var fieldOptions = '<option value="" ' + (h.field ? '' : 'selected') + '>자동 (학습된 선호 분야 사용)</option>' +
      Object.keys(FIELD_TREE).map(function(f){ return '<option value="'+f+'" '+(h.field===f?'selected':'')+'>'+f+'</option>'; }).join('');
    var hasProfile = state.trained > 0 && approved.length > 0;
    var brief = buildProfileBrief(approved, h.field);

    var html = '<div style="text-align:center;margin-bottom:22px;">' +
      '<p class="eyebrow" style="font-family:var(--font-mono);font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:var(--gold);margin:0 0 6px;">메인화면</p>' +
      '<h2 style="font-family:var(--font-display);font-size:24px;margin:0;color:var(--cream);">당신의 성향에 맞는 자료 찾기</h2>' +
    '</div>';

    if (hasProfile){
      var criteriaChips = brief.criteria.length
        ? brief.criteria.map(function(c){ return '<span class="chip">' + c.label + '</span>'; }).join('')
        : '<span class="no-link">아직 뚜렷한 기준이 없어요</span>';
      html += '<div class="acct-block"><div class="acct-label">지금까지 학습된 프로필</div>' +
        '<div style="font-size:15px;margin-bottom:10px;">선호 분야 · <b style="color:var(--gold);">' + escapeHtml(brief.field || '아직 없음') + '</b></div>' +
        '<div class="rej-chips" style="margin-bottom:0;">' + criteriaChips + '</div>' +
        '</div>';
    } else {
      html += '<div class="empty" style="height:auto;padding:24px 20px;margin-bottom:18px;">' +
        '<h3>아직 학습된 성향이 없어요</h3>' +
        '<p>카드 평가를 몇 개 진행하면 여기서 그 성향에 맞춰 자료를 자동으로 찾아드려요. 지금은 아래에서 키워드나 분야를 직접 정해서 시작할 수 있어요.</p>' +
        '<button class="btn" data-goto="swipe">카드 평가하러 가기</button>' +
        '</div>';
    }

    html += '<div class="field-row">' +
      '<div class="field"><label>키워드 (선택)</label><input type="text" id="home-keyword" placeholder="예: 양자컴퓨팅, 금리 인상" value="' + escapeHtml(h.keyword||'') + '" /></div>' +
      '<div class="field"><label>분야</label><select id="home-field">' + fieldOptions + '</select></div>' +
    '</div>' +
    '<p style="font-size:14px;color:var(--cream-soft);margin:-8px 0 16px;">키워드를 비워두면 학습된 성향만으로, 입력하면 그 키워드를 성향과 함께 반영해서 찾아요.</p>';

    html += '<div class="field" style="max-width:200px;"><label>수집 개수 (최대 50)</label><input type="text" id="home-count" value="' + h.count + '" /></div>';
    html += '<div class="toggle-row"><input type="checkbox" id="home-ai-score" checked /><label for="home-ai-score" style="margin:0;">등록할 때 AI가 9개 요소 점수를 자동으로 매기기</label></div>' +
      '<div class="field" style="max-width:220px;"><label>채점 엔진</label><select id="home-ai-engine">' +
        '<option value="gemini" selected>Gemini</option>' +
      '</select></div>';
    html += '<button class="btn" id="home-collect" ' + (h.loading?'disabled':'') + '>' + (h.loading ? '찾는 중...' : '내 성향에 맞는 자료 찾기') + '</button>';
    if (h.statusMsg) html += '<p style="margin-top:10px;font-size:14px;color:var(--cream-soft);">' + escapeHtml(h.statusMsg) + '</p>';

    if (h.lastAdded.length){
      html += '<p class="section-title" style="margin-top:26px;">방금 찾은 자료 (' + h.lastAdded.length + '개)</p>';
      h.lastAdded.forEach(function(m){
        html += '<div class="rec-item"><div class="t">' + escapeHtml(m.title) + '<span class="f">' + escapeHtml(m.field) + (m.matchReason ? ' · ' + escapeHtml(m.matchReason) : '') + '</span></div></div>';
      });
      html += '<button class="btn ghost small" style="margin-top:10px;" data-goto="swipe">카드 평가에서 확인하기</button>';
    }

    return html;
  }

  function swipeTabHtml(pending){
    if (pending.length === 0){
      return '<div class="empty"><h3>평가할 자료가 없습니다</h3><p>새 자료를 추가하면 여기서 카드로 평가할 수 있어요. 오른쪽으로 넘기면 적절, 왼쪽으로 넘기면 반려로 분류됩니다.</p><button class="btn" data-goto="add">자료 추가하러 가기</button></div>';
    }
    var html = '<div class="deck">';
    if (pending.length > 1) html += cardHtml(pending[1], 'behind');
    html += cardHtml(pending[0], 'top');
    html += '</div>';
    html += '<div class="swipe-buttons">' +
      '<button class="stamp-btn reject" id="btn-reject">' + ICONS.x + '</button>' +
      '<button class="stamp-btn approve" id="btn-approve">' + ICONS.heart + '</button>' +
    '</div>';
    return html;
  }

  function reasonModalHtml(){
    var html = '<div class="modal-overlay" id="reason-overlay"><div class="modal">' +
      '<h3>왜 부적절한가요?</h3>' +
      '<div class="sub2">선택한 이유는 이후 추천 학습에 사용됩니다.</div>' +
      '<div class="reason-grid">';
    REJECT_REASONS.forEach(function(r){
      html += '<button data-reason="' + escapeHtml(r) + '">' + escapeHtml(r) + '</button>';
    });
    html += '</div><button class="cancel" id="reason-cancel">취소하고 되돌리기</button></div></div>';
    return html;
  }

  // ---- Add tab ----
  function addTabHtml(){
    var fieldOptions = Object.keys(FIELD_TREE).map(function(f){ return '<option value="'+f+'">'+f+'</option>'; }).join('');
    var sliders = CRITERIA.map(function(c){
      return '<div class="slider-row"><label>' + c.label + '</label><input type="range" min="0" max="100" value="60" data-slider="' + c.key + '"/><span class="val" data-val="' + c.key + '">60</span></div>';
    }).join('');
    return '' +
      '<p class="section-title">새 자료 등록</p>' +
      '<div class="field"><label>제목</label><input type="text" id="f-title" placeholder="예: OO 현상에 대한 최신 연구 결과" /></div>' +
      '<div class="field-row">' +
        '<div class="field"><label>분야</label><select id="f-field">' + fieldOptions + '</select></div>' +
        '<div class="field"><label>세부 분야 (선택)</label><select id="f-subfield"><option value="">해당 없음</option></select></div>' +
      '</div>' +
      '<div class="field"><label>출처</label><input type="text" id="f-source" placeholder="예: OO 저널, OO 신문, 개인 블로그 등" /></div>' +
      '<div class="field"><label>원문 URL (선택)</label><input type="text" id="f-url" placeholder="https://..." /></div>' +
      '<div class="field"><label>평가 점수(신뢰성·객관성·정보 충실도 등 9개) 입력 방식</label>' +
        '<select id="f-score-mode">' +
          '<option value="default">기본값 사용 (전부 60점)</option>' +
          '<option value="manual">직접 입력 (슬라이더)</option>' +
          '<option value="ai">AI가 출처·내용을 보고 자동 판단</option>' +
        '</select></div>' +
      '<div id="slider-wrap" style="display:none;" class="slider-grid">' + sliders + '</div>' +
      '<div id="ai-score-wrap" style="display:none;">' +
        '<div class="field" style="max-width:220px;"><label>채점 엔진</label><select id="f-score-engine">' +
          '<option value="gemini" selected>Gemini</option>' +
        '</select></div>' +
        '<p id="ai-score-note" style="font-size:14px;color:var(--cream-soft);margin:-8px 0 16px;">제목·출처·URL을 바탕으로 AI가 9개 요소 점수를 추정해요.</p>' +
      '</div>' +
      '<button class="btn" id="btn-add-material">자료 추가하기</button>' +
      '<div id="add-status" style="margin-top:10px;font-size:14px;color:var(--cream-soft);"></div>';
  }

  // ---- Bulk add tab ----
  function bulkTabHtml(){
    var b = state.bulk;
    var fieldOptions = Object.keys(FIELD_TREE).map(function(f){ return '<option value="'+f+'">'+f+'</option>'; }).join('');
    var html = '<p class="section-title">자료 대량 추가</p>' +
      '<p class="bulk-note">이 앱은 브라우저에서만 동작하기 때문에 웹사이트를 자동으로 크롤링해서 내용을 가져올 수는 없어요. 대신 URL 목록을 한 번에 붙여넣어 여러 자료를 빠르게 등록하거나, 테스트용 샘플 자료를 자동 생성할 수 있습니다. 이렇게 등록된 자료는 카드 평가에서 똑같이 스와이프하며 평가할 수 있어요.</p>' +
      '<div class="compare-controls"><div class="mode-toggle">' +
        '<button data-bulkmode="urls" class="' + (b.mode==='urls'?'active':'') + '">URL 목록으로 추가</button>' +
        '<button data-bulkmode="generate" class="' + (b.mode==='generate'?'active':'') + '">샘플 자동 생성</button>' +
        '<button data-bulkmode="tavily" class="' + (b.mode==='tavily'?'active':'') + '">무분별 수집</button>' +
        '<button data-bulkmode="selective" class="' + (b.mode==='selective'?'active':'') + '">분별 수집</button>' +
      '</div></div>';

    if (b.mode === 'urls'){
      html += '<div class="field"><label>적용할 분야 (전체 목록 동일 적용)</label><select id="bulk-field">' + fieldOptions + '</select></div>' +
        '<div class="field"><label>자료 목록 — 한 줄에 하나씩</label>' +
        '<textarea id="bulk-text" rows="8" placeholder="형식: 제목 | 출처 | URL' +
        String.fromCharCode(10) + '예) AI 규제 최신 동향 | 조선일보 | https://example.com/a' +
        String.fromCharCode(10) + 'URL만 입력해도 됩니다: https://example.com/b' +
        String.fromCharCode(10) + '제목만 입력해도 됩니다 (출처·URL 없이 등록)"></textarea></div>' +
        '<div class="toggle-row"><input type="checkbox" id="bulk-ai-score" checked /><label for="bulk-ai-score" style="margin:0;">등록할 때 AI가 9개 요소 점수를 자동으로 매기기</label></div>' +
        '<div class="field" style="max-width:220px;"><label>채점 엔진</label><select id="bulk-ai-engine">' +
          '<option value="gemini" selected>Gemini</option>' +
        '</select></div>' +
        '<button class="btn" id="bulk-add-urls">목록 추가하기</button>' +
        '<div id="bulk-urls-status" style="margin-top:10px;font-size:14px;color:var(--cream-soft);"></div>';
    } else if (b.mode === 'generate') {
      html += '<div class="field-row">' +
          '<div class="field"><label>분야</label><select id="bulk-gen-field"><option value="random">무작위</option>' + fieldOptions + '</select></div>' +
          '<div class="field"><label>개수 (최대 100)</label><input type="text" id="bulk-gen-count" value="5" /></div>' +
        '</div>' +
        '<p style="font-size:14px;color:var(--cream-soft);margin-bottom:14px;">평가 요소 점수가 무작위로 채워진 샘플 자료를 생성합니다. 카드 평가·상대 비교 기능을 테스트하거나 학습 데이터를 빠르게 늘리고 싶을 때 사용하세요.</p>' +
        '<button class="btn" id="bulk-generate">샘플 자동 생성하기</button>';
    } else if (b.mode === 'selective') {
      html += selectiveCollectHtml(fieldOptions);
    } else {
      html += '<p class="bulk-note" style="border-color:var(--gold-soft);"><b>무분별 수집</b> — 분야와 키워드에 맞는 검색 결과를 걸러내지 않고 그대로 가져옵니다. (Tavily 검색 사용) 내 성향에 맞는 것만 골라 담고 싶다면 "분별 수집"을 쓰세요.</p>' +
        '<div class="field"><label>적용할 분야</label><select id="tavily-field">' + fieldOptions + '</select></div>' +
        '<div class="field"><label>검색 키워드</label><input type="text" id="tavily-kw" placeholder="예: 양자컴퓨팅 상용화" /></div>' +
        '<div class="field"><label>수집 개수 (최대 50)</label><input type="text" id="tavily-count" value="5" /></div>' +
        '<div class="toggle-row"><input type="checkbox" id="tavily-ai-score" checked /><label for="tavily-ai-score" style="margin:0;">등록할 때 AI가 9개 요소 점수를 자동으로 매기기</label></div>' +
        '<div class="field" style="max-width:220px;"><label>채점 엔진</label><select id="tavily-ai-engine">' +
          '<option value="gemini" selected>Gemini</option>' +
        '</select></div>' +
        '<button class="btn" id="tavily-collect">Tavily로 검색하기</button>' +
        '<div id="tavily-status" style="margin-top:10px;font-size:14px;color:var(--cream-soft);"></div>';
    }
    return html;
  }

  // ---- 분별 수집: collect only what fits the signed-in user's learned profile ----
  var STRICT_LEVELS = {
    loose:  { label: '느슨하게',  hint: '조금이라도 관심 가질 만하면 통과시켜요.' },
    normal: { label: '보통',      hint: '프로필과 대체로 맞으면 통과시키고, 명백히 안 맞는 것만 걸러요.' },
    strict: { label: '엄격하게',  hint: '프로필과 확실히 맞고 반려 이유에 해당하지 않는 것만 통과시켜요.' }
  };

  // ---- profile objects: same shape whether it's my own or a shared one ----
  // All 8 criteria ranked by the learned weight (no cutoff). The weights are
  // small in absolute terms early on, so what matters is their relative order.
  function profileWeightRanking(weights){
    weights = weights || {};
    return CRITERIA.map(function(c){ return { key: c.key, label: c.label, w: weights[c.key] || 0 }; })
      .sort(function(a, b){ return b.w - a.w; });
  }
  function fmtWeight(w){ return (w >= 0 ? '+' : '') + w.toFixed(2); }

  // Reject reasons with counts, biggest first (same data as the 성향 분석 tab).
  function rejectReasonStats(field){
    var counts = {}, total = 0;
    var inField = field ? state.materials.filter(function(m){ return m.status === 'rejected' && m.field === field; }).length : 0;
    state.materials.forEach(function(m){
      if (field && inField >= 3 && m.field !== field) return;   // enough in this field: use only its reasons
      if (m.status === 'rejected' && m.rejectReason){ counts[m.rejectReason] = (counts[m.rejectReason]||0) + 1; total++; }
    });
    var list = Object.keys(counts).sort(function(a, b){ return counts[b] - counts[a]; })
      .map(function(k){ return { reason: k, count: counts[k] }; });
    return { list: list, total: total };
  }

  // fieldOverride: judge by the taste learned for that subject (분별 수집 of one field).
  function ownProfile(fieldOverride){
    var approved = state.materials.filter(function(m){ return m.status==='approved'; });
    var rejected = state.materials.filter(function(m){ return m.status==='rejected'; });
    var brief = buildProfileBrief(approved, fieldOverride || '');
    var rejInField = rejected.filter(function(m){ return m.field === brief.field; });
    if (rejInField.length) rejected = rejInField;
    return {
      source: 'self', label: '내 성향', field: brief.field,
      weights: weightsFor(brief.field), bias: biasFor(brief.field), trained: state.trained,
      rejStats: rejectReasonStats(brief.field),
      sampleTitles: brief.sampleTitles,
      rejectExamples: rejected.slice(-5).map(function(m){ return '"' + m.title + '" (' + (m.rejectReason || '기타') + ')'; }),
      hasData: state.trained > 0 && approved.length > 0
    };
  }

  function profileFromShared(doc, label){
    var list = (doc.rejectStats || []).map(function(r){ return { reason: r.reason, count: r.count || 0 }; });
    var total = list.reduce(function(a, r){ return a + r.count; }, 0);
    return {
      source: 'shared', label: label || '공유받은 성향', field: doc.field || null,
      weights: doc.weights || {}, bias: typeof doc.bias === 'number' ? doc.bias : 0, trained: doc.trained || 0,
      rejStats: { list: list, total: total },
      sampleTitles: doc.sampleTitles || [], rejectExamples: doc.rejectExamples || [],
      hasData: (doc.trained || 0) > 0
    };
  }

  function profileFit(profile, material){
    var z = profile.bias;
    CRITERIA.forEach(function(c){ z += (profile.weights[c.key] || 0) * ((material.scores[c.key] || 0) / 100); });
    return sigmoid(z);
  }

  function profileSearchBrief(profile, fieldOverride){
    return {
      field: fieldOverride || profile.field,
      criteria: profileWeightRanking(profile.weights).filter(function(c){ return c.w > 0.02; }).slice(0, 3),
      sampleTitles: profile.sampleTitles || []
    };
  }

  // Which profile 분별 수집 should use right now: my own, or a shared one
  // (shared ones are fetched on demand and cached in state.bulk.sel.sharedCache).
  function selectedProfileInfo(){
    var s = state.bulk.sel;
    if (!s.source || s.source === 'self') return { profile: ownProfile(s.field) };
    var cached = s.sharedCache[s.source];
    if (!cached) return { pending: true };
    if (cached.error) return { error: cached.error };
    var imp = state.importedProfiles.filter(function(p){ return p.code === s.source; })[0];
    return { profile: profileFromShared(cached.doc, imp ? imp.label : (cached.doc.nickname || '')) };
  }

  function selectiveCollectHtml(){
    var s = state.bulk.sel;
    var ui = state.shareUi;
    var html = '<p class="bulk-note" style="border-color:var(--gold-soft);"><b>분별 수집</b> — 선택한 성향(이 계정의 성향 또는 공유받은 성향)의 선호 분야, 기준별 가중치, 반려 이유를 기준으로 검색 결과를 AI가 하나씩 걸러서, 목표 수량만큼 채울 때까지 검색을 반복하며 담아요.</p>';

    var sourceOptions = '<option value="self"' + (s.source === 'self' ? ' selected' : '') + '>내 성향 (이 계정)</option>' +
      state.importedProfiles.map(function(p){
        return '<option value="' + p.code + '"' + (s.source === p.code ? ' selected' : '') + '>공유받음 · ' + escapeHtml(p.label) + ' (' + p.code.slice(0, 4) + '…)</option>';
      }).join('');
    html += '<div class="acct-block"><div class="acct-label">어떤 성향으로 걸러낼까요</div>' +
      '<div class="field"><label>성향 기준</label><select id="sel-source">' + sourceOptions + '</select></div>' +
      (s.source !== 'self' ? '<button type="button" class="btn ghost small" id="sel-remove-import" style="margin-bottom:14px;">이 공유 성향을 목록에서 지우기</button>' : '') +
      '<div class="field"><label>공유 코드로 다른 사람의 성향 추가</label><input type="text" id="sel-import-code" placeholder="예: ABCD-EFGH-JKLM" /></div>' +
      '<button type="button" class="btn ghost small" id="sel-import-btn" ' + (ui.importLoading ? 'disabled' : '') + '>' + (ui.importLoading ? '확인 중...' : '코드로 추가하기') + '</button>' +
      (ui.importMsg ? '<p class="acct-msg ' + ui.importMsg.type + '" style="margin:10px 0 0;">' + escapeHtml(ui.importMsg.text) + '</p>' : '') +
      '</div>';

    var info = selectedProfileInfo();
    if (info.pending){
      return html + '<p style="font-size:14px;color:var(--cream-soft);">공유된 성향을 불러오는 중...</p>';
    }
    if (info.error){
      return html + '<div class="empty" style="height:auto;padding:24px 20px;"><h3>성향을 불러오지 못했어요</h3><p>' + escapeHtml(info.error) + '</p></div>';
    }
    var profile = info.profile;
    if (!profile.hasData){
      if (profile.source === 'self'){
        return html + '<div class="empty" style="height:auto;padding:24px 20px;">' +
          '<h3>아직 학습된 성향이 없어요</h3>' +
          '<p>분별 수집은 성향 분석을 기준으로 걸러내기 때문에, 카드 평가를 몇 개 진행해서 "적절"로 승인한 자료가 있어야 해요. 그 전에는 "무분별 수집"을 쓰거나 위에서 공유받은 성향을 고를 수 있어요.</p>' +
          '<button class="btn" data-goto="swipe">카드 평가하러 가기</button></div>';
      }
      return html + '<div class="empty" style="height:auto;padding:24px 20px;"><h3>학습 데이터가 없는 성향이에요</h3><p>공유한 사람이 아직 카드 평가를 하지 않아서 걸러낼 기준이 없어요.</p></div>';
    }

    var chips = profileWeightRanking(profile.weights).map(function(c){
      return '<span class="chip">' + c.label + '<b>' + fmtWeight(c.w) + '</b></span>';
    }).join('');
    var rejChips = profile.rejStats.list.length
      ? profile.rejStats.list.map(function(r){ return '<span class="chip">' + escapeHtml(r.reason) + '<b>' + r.count + '건</b></span>'; }).join('')
      : '<span class="no-link">반려 기록이 아직 없어요</span>';
    var fieldOptions = '<option value="" ' + (s.field ? '' : 'selected') + '>자동 (선택한 성향의 선호 분야 사용)</option>' +
      Object.keys(FIELD_TREE).map(function(f){ return '<option value="'+f+'" '+(s.field===f?'selected':'')+'>'+f+'</option>'; }).join('');
    var strictOptions = Object.keys(STRICT_LEVELS).map(function(k){
      return '<option value="'+k+'" '+(s.strict===k?'selected':'')+'>'+STRICT_LEVELS[k].label+'</option>';
    }).join('');

    html += '<div class="acct-block"><div class="acct-label">' + (profile.source === 'self' ? '필터링에 쓰일 내 프로필' : '필터링에 쓰일 공유받은 프로필 · ' + escapeHtml(profile.label)) + '</div>' +
      '<div style="font-size:15px;margin-bottom:10px;">선호 분야 · <b style="color:var(--gold);">' + escapeHtml(profile.field || '아직 없음') + '</b> · 학습 ' + profile.trained + '회</div>' +
      '<div style="font-size:13px;color:var(--cream-soft);margin-bottom:6px;">중요하게 여기는 기준 (가중치 높은 순)</div>' +
      '<div class="rej-chips" style="margin-bottom:12px;">' + chips + '</div>' +
      '<div style="font-size:13px;color:var(--cream-soft);margin-bottom:6px;">반려 이유 분포</div>' +
      '<div class="rej-chips" style="margin-bottom:0;">' + rejChips + '</div></div>';

    html += '<div class="field-row">' +
        '<div class="field"><label>키워드 (선택)</label><input type="text" id="sel-kw" placeholder="비워두면 프로필만으로 찾아요" value="' + escapeHtml(s.keyword||'') + '" /></div>' +
        '<div class="field"><label>분야</label><select id="sel-field">' + fieldOptions + '</select></div>' +
      '</div>' +
      '<div class="field-row">' +
        '<div class="field"><label>목표 수량 (최대 50)</label><input type="text" id="sel-count" value="' + s.count + '" /></div>' +
        '<div class="field"><label>AI 필터 엄격도</label><select id="sel-strict">' + strictOptions + '</select></div>' +
      '</div>' +
      '<p style="font-size:14px;color:var(--cream-soft);margin:-8px 0 16px;">' + escapeHtml((STRICT_LEVELS[s.strict] || STRICT_LEVELS.normal).hint) + ' 통과한 자료는 AI가 매긴 9개 요소 점수와 통과 이유가 함께 등록돼요.' + (profile.source === 'shared' ? ' 공유받은 성향은 수집할 때마다 공유한 사람의 최신 상태로 다시 불러와요.' : '') + '</p>' +
      '<button class="btn" id="sel-collect" ' + (s.loading?'disabled':'') + '>' + (s.loading ? '고르는 중...' : '분별해서 수집하기') + '</button>';
    if (s.statusMsg) html += '<p style="margin-top:10px;font-size:14px;color:var(--cream-soft);">' + escapeHtml(s.statusMsg) + '</p>';

    if (s.lastAdded.length){
      html += '<p class="section-title" style="margin-top:26px;">방금 골라 담은 자료 (' + s.lastAdded.length + '개)</p>';
      s.lastAdded.forEach(function(m){
        var fit = (s.lastFits && typeof s.lastFits[m.id] === 'number') ? s.lastFits[m.id] : predictFit(m);
        html += '<div class="rec-item"><div class="t">' + escapeHtml(m.title) + '<span class="f">' + escapeHtml(m.field) + (m.matchReason ? ' · ' + escapeHtml(m.matchReason) : '') + '</span></div><div class="pct">' + Math.round(fit*100) + '%</div></div>';
      });
      html += '<button class="btn ghost small" style="margin-top:10px;" data-goto="swipe">카드 평가에서 확인하기</button>';
    }
    return html;
  }

  // One Gemini call judges a whole batch of candidates against the chosen
  // profile: keep/drop, a one-line reason, and the 8 criterion scores.
  async function filterCandidatesGemini(items, profile, field, strict){
    var gs = state.geminiSettings || {};
    var model = gs.model || 'gemini-2.5-flash';

    var rejStats = profile.rejStats;
    var ranking = profileWeightRanking(profile.weights).slice(0, 5);
    var level = STRICT_LEVELS[strict] || STRICT_LEVELS.normal;
    var n = CRITERIA.length;
    var clip = function(t, k){ return String(t).slice(0, k); };

    var profileText =
      '- 선호 분야: ' + (field || '없음') + '\n' +
      '- 중시하는 기준(높은 순, 값이 작아도 순서가 의미 있음): ' +
        ranking.map(function(c){ return c.label + ' ' + fmtWeight(c.w); }).join(', ') + '\n' +
      '- 반려 이유: ' + (rejStats.list.length
        ? rejStats.list.slice(0, 4).map(function(r){ return r.reason + ' ' + r.count + '건'; }).join(', ') + ' (비중 큰 이유는 특히 엄격히)'
        : '없음') + '\n' +
      '- 승인 예시: ' + (profile.sampleTitles.length ? profile.sampleTitles.slice(0, 3).map(function(t){ return '"' + clip(t, 40) + '"'; }).join(', ') : '없음') + '\n' +
      '- 반려 예시: ' + (profile.rejectExamples.length ? profile.rejectExamples.slice(-3).map(function(t){ return clip(t, 50); }).join(', ') : '없음') + '\n' +
      '- 엄격도: ' + level.label + ' — ' + level.hint;

    var listText = items.map(function(it, i){ return aiItemText(it, i, false); }).join('\n\n');

    var prompt = '너는 한 사용자의 취향을 학습한 자료 큐레이터야. 프로필을 보고 후보 자료가 이 사용자가 "적절"로 승인할 만한지 판단하고, 평가 요소 ' + n + '개(순서: ' + scoreOrderText() + ')를 0~100점으로 추정해. ' +
      '요약이 있으면 그걸 근거로, 없으면 제목·URL로 합리적으로 추정해.\n\n' +
      '[사용자 프로필]\n' + profileText + '\n\n[후보 자료]\n' + listText + '\n\n' +
      SCORE_RUBRIC + '\n\n' +
      '후보마다 [번호, keep(1=승인할 만함/0=아님), "이유 20자 이내", 점수 ' + n + '개]를 담은 JSON 배열로만 응답해(설명 금지). 예: [[1,1,"공신력 있는 최신 자료",70,55,40,60,35,50,65,45,60],[2,0,"광고성",...]]';

    var data = await geminiFetch(prompt, model, true);
    var byIndex = {};
    parseAiArray(data.text).forEach(function(r){
      if (Array.isArray(r)){
        var idx = Number(r[0]);
        if (idx && r.length >= 3 + n) byIndex[idx] = { keep: r[1] === 1 || r[1] === true || r[1] === '1', reason: String(r[2] || ''), scores: numsToScores(r.slice(3)) };
      } else if (r && r.index){
        byIndex[r.index] = { keep: r.keep === true, reason: String(r.reason || ''), scores: objToScores(r.scores) };
      }
    });
    var judged = items.map(function(it, i){
      var r = byIndex[i + 1];
      if (!r) return null;
      return { keep: r.keep, reason: r.reason.slice(0, 80), scores: r.scores };
    });
    spreadScores(judged.map(function(j){ return j && j.scores; }));
    return judged;
  }

  // Searches in rounds (a different angle each round, since Tavily has no
  // pagination), has the AI filter each round's fresh results, and stops once
  // enough have passed or the angles run out. Survivors are ranked by the
  // chosen profile's learned fit so the best matches win if more passed than needed.
  // Zero-token pre-filter: skip candidates from sites this user keeps rejecting
  // (3+ rejections and at least 4x as many rejections as approvals), so the AI
  // is only asked about candidates that still have a chance.
  function domainOf(url){
    try { return new URL(url).hostname.replace(/^www\./, ''); } catch(e){ return ''; }
  }
  function domainRecord(){
    var rec = {};
    state.materials.forEach(function(m){
      if (m.status !== 'approved' && m.status !== 'rejected') return;
      var d = domainOf(m.url); if (!d) return;
      var r = rec[d] || (rec[d] = { a: 0, r: 0 });
      if (m.status === 'approved') r.a++; else r.r++;
    });
    return rec;
  }
  function localPrefilter(items){
    var rec = domainRecord(), kept = [], skipped = 0;
    items.forEach(function(it){
      var r = rec[domainOf(it.url)];
      if (r && r.r >= 3 && r.r >= r.a * 4){ skipped++; return; }
      kept.push(it);
    });
    return { kept: kept, skipped: skipped };
  }

  async function selectiveCollect(profile, s, onProgress){
    var seen = existingUrlSet();
    var suffixes = ['', ' 분석', ' 전문가 의견', ' 최신 동향', ' 연구', ' 사례', ' 현황', ' 전망'];
    var brief = profileSearchBrief(profile, s.field);
    var baseQuery = buildTavilyQuery(brief, s.keyword);
    var windowSize = Math.min(20, Math.max(6, s.count * 2));
    var kept = [], scanned = 0, dropped = 0, rounds = 0, filterFailed = null, localSkipped = 0;
    var fallbackField = s.field || profile.field || Object.keys(FIELD_TREE)[0];

    for (var r = 0; r < suffixes.length && kept.length < s.count; r++){
      rounds++;
      if (onProgress) onProgress(r + 1, kept.length, scanned);
      var items;
      try {
        items = await tavilySearch(baseQuery + suffixes[r], windowSize);
      } catch(e){
        if (r === 0) throw e;
        continue;
      }
      var fresh = dedupeAgainstSeen(items, seen).kept;
      var pre = localPrefilter(fresh);
      localSkipped += pre.skipped;
      fresh = pre.kept;
      if (!fresh.length) continue;
      scanned += fresh.length;

      var verdicts;
      try {
        verdicts = await filterCandidatesGemini(fresh, profile, brief.field, s.strict);
      } catch(e){
        if (kept.length === 0) throw e;
        filterFailed = e;
        break;
      }
      fresh.forEach(function(it, i){
        var v = verdicts[i];
        if (!v || !v.keep){ dropped++; return; }
        var host = null;
        try { host = new URL(it.url).hostname.replace(/^www\./,''); } catch(e){ host = null; }
        kept.push({
          id: uid(), title: it.title || baseQuery, field: fallbackField, subfield: null,
          source: host || '미상', url: it.url || null, matchReason: v.reason || null,
          scores: v.scores, sv: SCORE_VER, status: 'pending', rejectReason: null, createdAt: Date.now()
        });
      });
    }

    var fits = {};
    kept.forEach(function(m){ fits[m.id] = profileFit(profile, m); });
    kept.sort(function(a, b){ return fits[b.id] - fits[a.id]; });
    return { materials: kept.slice(0, s.count), fits: fits, extra: Math.max(0, kept.length - s.count), scanned: scanned, dropped: dropped, rounds: rounds, filterFailed: filterFailed, localSkipped: localSkipped };
  }

  // ---- 성향 공유: publish a snapshot under a share code; others read it by code ----
  var SHARE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  function genShareCode(){
    var buf = new Uint8Array(12);
    crypto.getRandomValues(buf);
    var out = '';
    for (var i = 0; i < buf.length; i++) out += SHARE_ALPHABET.charAt(buf[i] % 32);
    return out;
  }
  function fmtShareCode(c){ return c.replace(/(.{4})(?=.)/g, '$1-'); }
  function normShareCode(raw){ return String(raw || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

  function shareErrMsg(err){
    if (err && err.code === 'permission-denied') return 'Firestore 보안 규칙에 성향 공유 설정이 아직 없어요. 안내된 규칙을 추가한 뒤 다시 시도해주세요.';
    return (err && err.message) ? err.message : '알 수 없는 오류';
  }

  function shareSnapshot(){
    var p = ownProfile();
    var sh = state.sharing;
    return {
      ownerUid: state.user.uid,
      nickname: sh.nickname || '',
      includeTitles: !!sh.includeTitles,
      updatedAt: Date.now(),
      field: p.field || null,
      weights: p.weights,
      bias: p.bias,
      trained: p.trained,
      rejectStats: p.rejStats.list.map(function(r){ return { reason: r.reason, count: r.count }; }),
      sampleTitles: sh.includeTitles ? p.sampleTitles.map(function(t){ return String(t).slice(0, 120); }) : [],
      rejectExamples: sh.includeTitles ? p.rejectExamples.map(function(t){ return String(t).slice(0, 140); }) : []
    };
  }

  function publishSharedProfile(){
    if (!state.user || !state.sharing || !state.sharing.code) return Promise.resolve();
    return fbDb.collection('shared_profiles').doc(state.sharing.code).set(shareSnapshot());
  }

  function fetchSharedProfile(code){
    return fbDb.collection('shared_profiles').doc(code).get().then(function(snap){
      if (!snap.exists) throw new Error('공유가 중단되었거나 잘못된 코드예요.');
      return snap.data();
    });
  }

  function shareBlockHtml(){
    var sh = state.sharing, ui = state.shareUi;
    var html = '<p class="section-title" style="margin-top:30px;">내 성향 공유하기</p>' +
      '<p style="font-size:14px;color:var(--cream-soft);margin:-4px 0 14px;line-height:1.6;">공유 코드를 만들면, 그 코드를 아는 다른 사용자가 "분별 수집"에서 내 성향(기준별 가중치, 반려 이유 분포, 선호 분야)으로 자료를 걸러 모을 수 있어요. 내 이메일이나 계정 정보는 공유되지 않고, 카드 평가를 할 때마다 공유된 내용도 자동으로 최신이 돼요.</p>' +
      '<div class="acct-block">';
    if (!sh.code){
      html += '<div class="field"><label>표시될 이름 (선택)</label><input type="text" id="share-nickname" placeholder="예: 민수의 성향" value="' + escapeHtml(sh.nickname || '') + '" /></div>' +
        '<div class="toggle-row"><input type="checkbox" id="share-titles" ' + (sh.includeTitles ? 'checked' : '') + ' /><label for="share-titles" style="margin:0;">승인·반려한 자료 제목 몇 개도 예시로 함께 공유</label></div>' +
        '<button class="btn" id="share-create" ' + (ui.loading ? 'disabled' : '') + '>' + (ui.loading ? '만드는 중...' : '공유 코드 만들기') + '</button>';
    } else {
      html += '<div class="acct-label">공유 중인 코드</div>' +
        '<div style="font-family:var(--font-mono);font-size:24px;letter-spacing:0.12em;color:var(--gold);margin-bottom:12px;">' + fmtShareCode(sh.code) + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:16px;"><button class="btn ghost small" id="share-copy">코드 복사</button></div>' +
        '<div class="field"><label>표시될 이름</label><input type="text" id="share-nickname" value="' + escapeHtml(sh.nickname || '') + '" /></div>' +
        '<div class="toggle-row"><input type="checkbox" id="share-titles" ' + (sh.includeTitles ? 'checked' : '') + ' /><label for="share-titles" style="margin:0;">승인·반려한 자료 제목 몇 개도 예시로 함께 공유</label></div>' +
        '<div style="display:flex;gap:8px;flex-wrap:wrap;">' +
          '<button class="btn ghost small" id="share-update" ' + (ui.loading ? 'disabled' : '') + '>설정 저장하고 지금 갱신</button>' +
          '<button class="btn ghost small" id="share-stop" style="border-color:var(--reject);color:var(--reject);" ' + (ui.loading ? 'disabled' : '') + '>공유 중단하기</button>' +
        '</div>';
    }
    if (ui.msg) html += '<p class="acct-msg ' + ui.msg.type + '" style="margin:12px 0 0;">' + escapeHtml(ui.msg.text) + '</p>';
    html += '</div>';
    return html;
  }

  // ---- Opinions tab: collect subjective takes on an issue and cluster them by stance ----
  var OPN_COLORS = ['#C89B3C','#5C7F5B','#B5573F','#6B8CA6','#9B6FA6','#A68A4A','#4F8F8A','#A65C6B'];
  function opinionColorForIndex(i){ return OPN_COLORS[i % OPN_COLORS.length]; }

  function findIssue(id){
    return state.issues.filter(function(x){ return x.id === id; })[0] || null;
  }

  function opinionsTabHtml(){
    var ov = state.opinionsView;
    if (ov.mode === 'detail'){
      var issue = findIssue(ov.activeIssueId);
      if (!issue){ ov.mode = 'list'; ov.activeIssueId = null; return opinionsListHtml(); }
      return opinionsDetailHtml(issue);
    }
    return opinionsListHtml();
  }

  function opinionsListHtml(){
    var html = '<p class="section-title">의견 수집</p>' +
      '<p style="font-size:14.5px;color:var(--cream-soft);margin:-10px 0 20px;line-height:1.6;">사회 이슈나 정책을 하나 등록하면, 그에 대한 여러 사람·전문가의 의견을 AI로 자동 수집하거나 직접 입력해서 모을 수 있어요. 어느 정도 모이면 AI가 비슷한 입장끼리 자동으로 묶어서 비율로 보여줘요.</p>';

    html += '<div class="acct-block">' +
      '<div class="acct-label">새 이슈 등록</div>' +
      '<div class="field"><label>이슈 제목</label><input type="text" id="opn-new-title" placeholder="예: 주 4일제 도입, 최저임금 인상" value="' + escapeHtml(state.opinionsView.newTitle||'') + '" /></div>' +
      '<div class="field"><label>배경 설명 (선택)</label><textarea id="opn-new-context" rows="2" placeholder="이 이슈에 대해 알아두면 좋은 맥락을 짧게 적어주세요">' + escapeHtml(state.opinionsView.newContext||'') + '</textarea></div>' +
      '<button class="btn" id="opn-create-issue">이슈 만들기</button>' +
      '</div>';

    if (state.issues.length === 0){
      html += '<div class="empty" style="height:auto;padding:30px 20px;"><h3>아직 등록된 이슈가 없어요</h3><p>위에서 이슈를 하나 만들면 의견을 모으기 시작할 수 있어요.</p></div>';
      return html;
    }

    html += '<p class="section-title">등록된 이슈 (' + state.issues.length + '개)</p>';
    state.issues.slice().sort(function(a,b){ return b.createdAt - a.createdAt; }).forEach(function(issue){
      var total = issue.opinions.length;
      var groups = issue.groups || [];
      var miniBar = '';
      if (groups.length && total){
        miniBar = '<div class="opn-mini-bar">' + groups.map(function(g, i){
          var pct = Math.round((g.opinionIds.length/total)*1000)/10;
          return '<span style="width:' + pct + '%;background:' + opinionColorForIndex(i) + ';"></span>';
        }).join('') + '</div>';
      }
      html += '<button type="button" class="opn-card" data-opn-issue="' + issue.id + '">' +
        '<h4>' + escapeHtml(issue.title) + '</h4>' +
        '<div class="opn-card-meta">의견 ' + total + '개' + (groups.length ? ' · 입장 ' + groups.length + '개로 분류됨' : ' · 아직 분류 안 됨') + '</div>' +
        miniBar +
      '</button>';
    });
    return html;
  }

  function opinionsDetailHtml(issue){
    var ov = state.opinionsView;
    var html = '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<button type="button" class="opn-back" id="opn-back">← 이슈 목록으로</button>' +
      '<button type="button" class="btn ghost small" data-opn-delete-issue="' + issue.id + '">이슈 삭제</button>' +
    '</div>';
    html += '<h2 class="opn-issue-title">' + escapeHtml(issue.title) + '</h2>';
    if (issue.context) html += '<p class="opn-issue-context">' + escapeHtml(issue.context) + '</p>';

    // --- collection controls ---
    html += '<div class="acct-block">' +
      '<div class="acct-label">AI로 의견 자동 수집</div>' +
      '<p style="font-size:14px;color:var(--cream-soft);margin:0 0 12px;">아래 주제로 웹에서 찬성·반대·전문가 분석 등 다양한 시각의 글을 찾아서, AI가 각 출처의 입장을 한두 문장으로 요약해 가져와요.</p>' +
      '<div class="field"><label>검색 주제</label><input type="text" id="opn-collect-topic" value="' + escapeHtml(ov.collectTopic || issue.title) + '" /></div>' +
      '<div class="field" style="max-width:160px;"><label>수집 개수 (최대 50)</label><input type="text" id="opn-collect-count" value="' + (ov.collectCount||6) + '" /></div>' +
      '<button class="btn" id="opn-collect-btn" ' + (ov.collectLoading?'disabled':'') + '>' + (ov.collectLoading ? '수집하는 중...' : 'AI로 의견 찾기') + '</button>' +
      (ov.collectMsg ? '<p style="margin-top:10px;font-size:14px;color:var(--cream-soft);">' + escapeHtml(ov.collectMsg) + '</p>' : '') +
      '</div>';

    html += '<div class="acct-block">' +
      '<div class="acct-label">직접 의견 추가</div>' +
      '<div class="field"><label>의견 내용</label><textarea id="opn-manual-text" rows="3" placeholder="예: 생산성 저하 우려 없이 노동시간을 줄일 수 있다는 연구 결과가 많다">' + escapeHtml(ov.manualText||'') + '</textarea></div>' +
      '<div class="field-row">' +
        '<div class="field"><label>출처 / 작성자</label><input type="text" id="opn-manual-source" placeholder="예: OO 교수, OO 신문 사설" value="' + escapeHtml(ov.manualSource||'') + '" /></div>' +
        '<div class="field"><label>원문 URL (선택)</label><input type="text" id="opn-manual-url" placeholder="https://..." value="' + escapeHtml(ov.manualUrl||'') + '" /></div>' +
      '</div>' +
      '<button class="btn ghost" id="opn-manual-add-btn">의견 추가하기</button>' +
      '</div>';

    // --- clustering control ---
    if (issue.opinions.length >= 2){
      html += '<button class="btn" id="opn-cluster-btn" style="margin-bottom:8px;" ' + (ov.clusterLoading?'disabled':'') + '>' +
        (ov.clusterLoading ? '입장 분류하는 중...' : (issue.groups && issue.groups.length ? '다시 분류하기' : '입장별로 자동 분류하기')) +
      '</button>';
      if (ov.clusterMsg) html += '<p style="font-size:14px;color:var(--cream-soft);margin:0 0 16px;">' + escapeHtml(ov.clusterMsg) + '</p>';
    }

    // --- visualization (grouped) or flat list ---
    if (issue.groups && issue.groups.length){
      html += '<p class="section-title" style="margin-top:30px;">입장별 분포</p>';
      var total = issue.opinions.length;
      var byId = {};
      issue.opinions.forEach(function(o){ byId[o.id] = o; });
      issue.groups.slice().sort(function(a,b){ return b.opinionIds.length - a.opinionIds.length; }).forEach(function(g, i){
        var pct = total ? Math.round((g.opinionIds.length/total)*1000)/10 : 0;
        var color = opinionColorForIndex(i);
        html += '<div class="opn-group">' +
          '<div class="opn-group-head"><span class="opn-group-label"><i style="background:' + color + ';"></i>' + escapeHtml(g.label) + '</span><span class="opn-group-pct">' + pct + '% · ' + g.opinionIds.length + '개</span></div>' +
          '<div class="opn-bar-bg"><div class="opn-bar" style="width:' + pct + '%;background:' + color + ';"></div></div>';
        g.opinionIds.forEach(function(oid){
          var o = byId[oid];
          if (!o) return;
          html += opinionItemHtml(o);
        });
        html += '</div>';
      });
    } else if (issue.opinions.length){
      html += '<p class="section-title">모은 의견 (' + issue.opinions.length + '개)</p>';
      issue.opinions.slice().sort(function(a,b){ return b.createdAt-a.createdAt; }).forEach(function(o){
        html += opinionItemHtml(o);
      });
    }

    return html;
  }

  function opinionItemHtml(o){
    return '<div class="opn-item">' +
      '<div class="opn-item-body">' +
        '<p class="opn-text">' + escapeHtml(o.text) + '</p>' +
        '<div class="opn-meta">출처: ' + escapeHtml(o.source || '미상') +
          (o.url ? '<a href="' + escapeHtml(o.url) + '" target="_blank" rel="noopener noreferrer">원문 →</a>' : '') +
          '<span class="opn-badge">' + (o.via === 'ai' ? 'AI 수집' : '직접 입력') + '</span>' +
        '</div>' +
      '</div>' +
      '<button type="button" class="opn-del-btn" data-opn-del-opinion="' + o.id + '">' + ICONS.x + '</button>' +
    '</div>';
  }

  // Judges from title/url/snippet what stance or claim each search result
  // represents, in reported-speech ("~라고 주장한다"), plus a short source label.
  async function extractOpinionsGemini(items, issueTitle){
    var gs = state.geminiSettings || {};
    var model = gs.model || 'gemini-2.5-flash';
    var listText = items.map(function(it, i){
      return '[' + (i+1) + '] 제목: ' + (it.title||'') + '\nURL: ' + (it.url||'') +
        (it.content ? '\n내용: ' + it.content.slice(0,300) : '');
    }).join('\n\n');
    var prompt = '다음은 "' + issueTitle + '"라는 사회적 이슈/정책에 대한 웹 검색 결과 목록이야. ' +
      '각 항목의 출처가 이 이슈에 대해 실제로 어떤 입장이나 주장을 펼치는지 한두 문장으로 요약해줘. ' +
      '"~라고 본다", "~을 주장한다"처럼 보도체로 써줘. 출처 이름(언론사·기관·저자 등)도 짧게 뽑아줘. ' +
      '단순 사실 나열이라 뚜렷한 입장이 없으면 핵심 내용을 그대로 요약해도 돼.\n\n' +
      listText + '\n\n' +
      '아래 JSON 배열로만 응답해:\n' +
      '[{"index":1,"opinion":"요약된 의견/주장","source":"출처 이름"}]';
    var data = await geminiFetch(prompt, model, true);
    var clean = (data.text||'').replace(/```json/gi,'').replace(/```/g,'').trim();
    var arr = JSON.parse(clean);
    if (!Array.isArray(arr)) throw new Error('invalid response shape');
    var byIndex = {};
    arr.forEach(function(r){ if (r && r.index) byIndex[r.index] = r; });
    return items.map(function(it, i){
      var r = byIndex[i+1];
      var host = null;
      try { host = new URL(it.url).hostname.replace(/^www\./,''); } catch(e){ host = null; }
      return {
        id: uid(),
        text: (r && r.opinion) ? r.opinion : (it.content ? it.content.slice(0,200) : (it.title || '')),
        source: (r && r.source) ? r.source : (host || '출처 미상'),
        url: it.url || null,
        via: 'ai',
        createdAt: Date.now()
      };
    });
  }

  // Fires several angled Tavily searches (찬성/반대/전문가 분석/비판 등) so the
  // collected set actually spans different stances instead of one search's
  // worth of similar top results, then has Gemini turn each raw result into
  // a short opinion statement. Dedupes against the issue's existing opinion URLs.
  async function collectDiverseOpinions(issue, topic, targetCount, onProgress){
    var angles = ['찬성', '반대', '전문가 분석', '비판적 시각', '관련 보도'];
    var seen = {};
    issue.opinions.forEach(function(o){ var n = normalizeUrl(o.url); if (n) seen[n] = true; });
    var collected = [];
    for (var i=0; i<angles.length && collected.length < targetCount; i++){
      if (onProgress) onProgress(angles[i], collected.length);
      var results;
      try {
        results = await tavilySearch(topic + ' ' + angles[i], Math.min(20, Math.max(2, Math.ceil(targetCount/2))));
      } catch(e){ continue; }
      results.forEach(function(r){
        if (collected.length >= targetCount) return;
        var n = normalizeUrl(r.url);
        if (n && seen[n]) return;
        if (n) seen[n] = true;
        collected.push(r);
      });
    }
    if (collected.length === 0) return [];
    var picked = collected.slice(0, targetCount), out = [];
    for (var c = 0; c < picked.length; c += 20){
      out = out.concat(await extractOpinionsGemini(picked.slice(c, c + 20), issue.title));
    }
    return out;
  }

  // Groups the issue's opinions into a small number of stance clusters with
  // AI-chosen labels. Any opinion the model doesn't place anywhere falls back
  // into a catch-all "기타" group so percentages always add up to 100%.
  async function clusterOpinionsGemini(issue){
    var gs = state.geminiSettings || {};
    var model = gs.model || 'gemini-2.5-flash';
    var listText = issue.opinions.map(function(o, i){
      return '[' + (i+1) + '] ' + String(o.text || '').slice(0, 160) + ' (' + (o.source||'미상') + ')';
    }).join('\n');
    var prompt = '다음은 "' + issue.title + '" 이슈에 대해 수집된 의견 목록이야. ' +
      '이 의견들을 입장이 비슷한 것끼리 자연스럽게 몇 개의 그룹으로 묶어줘(보통 2~5개 그룹이 적당해). ' +
      '각 그룹에는 그 입장을 한눈에 알 수 있는 짧은 이름(5~12자 정도)을 붙이고, 그 그룹에 속하는 의견들의 번호를 모두 나열해줘. ' +
      '모든 의견은 반드시 하나의 그룹에 속해야 하고, 그룹을 너무 잘게 쪼개지 마.\n\n' +
      listText + '\n\n' +
      '아래 JSON으로만 응답해:\n' +
      '{"groups":[{"label":"그룹 이름","indexes":[1,3,5]}]}';
    var data = await geminiFetch(prompt, model, true);
    var clean = (data.text||'').replace(/```json/gi,'').replace(/```/g,'').trim();
    var parsed = JSON.parse(clean);
    if (!parsed || !Array.isArray(parsed.groups)) throw new Error('invalid response shape');
    var groups = parsed.groups.map(function(g){
      var opinionIds = (g.indexes||[]).map(function(idx){
        var o = issue.opinions[idx-1];
        return o ? o.id : null;
      }).filter(Boolean);
      return { id: uid(), label: g.label || '분류 안 됨', opinionIds: opinionIds };
    }).filter(function(g){ return g.opinionIds.length > 0; });
    var covered = {};
    groups.forEach(function(g){ g.opinionIds.forEach(function(id){ covered[id]=true; }); });
    var leftover = issue.opinions.filter(function(o){ return !covered[o.id]; }).map(function(o){ return o.id; });
    if (leftover.length) groups.push({ id: uid(), label: '기타', opinionIds: leftover });
    return groups;
  }

  function parseBulkUrls(text, field){
    var lines = text.split('\n').map(function(l){ return l.trim(); }).filter(Boolean);
    var created = [];
    lines.forEach(function(line){
      var parts = line.split('|').map(function(p){ return p.trim(); }).filter(function(p){ return p.length>0; });
      var title = null, source = null, url = null;
      if (parts.length >= 3){
        title = parts[0]; source = parts[1]; url = parts[2];
      } else if (parts.length === 2){
        if (/^https?:\/\//i.test(parts[1])){ title = parts[0]; url = parts[1]; }
        else { title = parts[0]; source = parts[1]; }
      } else if (parts.length === 1){
        var token = parts[0];
        if (/^https?:\/\//i.test(token)){
          url = token;
          try { var host = new URL(token).hostname.replace(/^www\./,''); source = host; title = host; } catch(e){ title = token; }
        } else {
          title = token;
        }
      }
      if (!title) return;
      var scores = {};
      CRITERIA.forEach(function(c){ scores[c.key] = 60; });
      created.push({ id: uid(), title: title, field: field, subfield: null, source: source || '미상', url: url || null, scores: scores, status:'pending', rejectReason:null, createdAt: Date.now() });
    });
    return created;
  }

  function generateSampleMaterials(count, field){
    var fields = field === 'random' ? Object.keys(FIELD_TREE) : [field];
    var out = [];
    for (var i=0;i<count;i++){
      var f = fields[Math.floor(Math.random()*fields.length)];
      var subs = FIELD_TREE[f] || [];
      var sub = (subs.length && Math.random() < 0.4) ? subs[Math.floor(Math.random()*subs.length)] : null;
      var scores = {};
      CRITERIA.forEach(function(c){ scores[c.key] = Math.floor(40 + Math.random()*56); });
      out.push({ id: uid(), title: '자동 생성 샘플 #' + (i+1) + ' · ' + f + (sub? ' · '+sub : ''), field: f, subfield: sub, source:'자동 생성 샘플', url:null, scores: scores, status:'pending', rejectReason:null, createdAt: Date.now() });
    }
    return out;
  }


  function normalizeUrl(u){
    if (!u) return '';
    return u.trim().toLowerCase().replace(/\/+$/, '').replace(/^https?:\/\//, '').replace(/^www\./, '');
  }

  function existingUrlSet(){
    var set = {};
    state.materials.forEach(function(m){
      var n = normalizeUrl(m.url);
      if (n) set[n] = true;
    });
    return set;
  }

  // Filters items against a running "seen" set, marking kept URLs as seen
  // too so repeated items within the same batch (or across backfill retries)
  // don't get double-counted.
  function dedupeAgainstSeen(items, seen){
    var kept = [], skipped = 0;
    items.forEach(function(it){
      var n = normalizeUrl(it.url);
      if (n && seen[n]){ skipped++; return; }
      if (n) seen[n] = true;
      kept.push(it);
    });
    return { kept: kept, skipped: skipped };
  }

  async function tavilySearch(query, count){
    var tl = tavilyLimitReason();
    if (tl) throw new Error(tl);
    trackTavily();
    var data = await callFn('tavilySearch', { query: query, maxResults: count });
    if (!data.results) throw new Error('예상치 못한 응답 형식이에요');
    return data.results;
  }

  // Keeps asking Tavily for a wider result window until it has `targetCount`
  // genuinely-new (not-already-imported) items, since Tavily has no
  // pagination/offset — the only lever is requesting more results per call.
  // Gives up after a few tries so a thin topic can't loop forever.
  async function tavilyCollectWithBackfill(query, targetCount, onProgress){
    var seen = existingUrlSet();
    var collected = [];
    var totalSkipped = 0;
    var attempts = 0;
    var maxWindow = 20; // Tavily's practical ceiling for max_results per call
    // Beyond one window the same query just returns the same top results, so
    // once the window is maxed out, keep going with a different angle each time.
    var angles = ['', ' 분석', ' 최신 동향', ' 전문가 의견', ' 연구', ' 사례', ' 현황', ' 전망'];
    var angleIdx = 0;
    var maxAttempts = Math.min(angles.length + 1, Math.max(4, Math.ceil(targetCount / 8) + 2));
    var requestSize = Math.min(maxWindow, targetCount);

    while (collected.length < targetCount && attempts < maxAttempts){
      attempts++;
      if (onProgress) onProgress(attempts, collected.length);
      var items = await tavilySearch(query + angles[angleIdx], requestSize);
      var res = dedupeAgainstSeen(items, seen);
      totalSkipped += res.skipped;
      var needed = targetCount - collected.length;
      collected = collected.concat(res.kept.slice(0, needed));
      if (requestSize < maxWindow){
        requestSize = Math.min(maxWindow, requestSize + targetCount); // widen the window first
      } else {
        angleIdx++;
        if (angleIdx >= angles.length) break; // out of new angles
      }
    }

    return { items: collected, skipped: totalSkipped, attempts: attempts, shortBy: Math.max(0, targetCount - collected.length) };
  }

  // ---------- Personalization: turn the learned model into a search brief ----------
  function topFieldByApproval(approved){
    if (!approved.length) return null;
    var counts = {};
    approved.forEach(function(m){ counts[m.field] = (counts[m.field]||0) + 1; });
    var best = null, bestN = -1;
    Object.keys(counts).forEach(function(f){ if (counts[f] > bestN){ bestN = counts[f]; best = f; } });
    return best;
  }

  function topCriteriaByWeight(n, field){
    var w = weightsFor(field);
    return CRITERIA.slice()
      .filter(function(c){ return (w[c.key]||0) > 0.02; })
      .sort(function(a,b){ return (w[b.key]||0) - (w[a.key]||0); })
      .slice(0, n);
  }

  function extractKeywords(title, n){
    var stop = ['그리고','에서','으로','하는','있다','없다','것','수','를','을','이','가','은','는','와','과','의','에','도','만','로','최근','최신'];
    var words = title.split(/\s+/).map(function(w){ return w.replace(/[^\uAC00-\uD7A3a-zA-Z0-9]/g,''); })
      .filter(function(w){ return w.length >= 2 && stop.indexOf(w) === -1; });
    return words.slice(0, n);
  }

  // Builds a human-readable brief of the user's learned profile, used both to
  // drive the search itself and to show the person what's being used.
  function buildProfileBrief(approved, manualField){
    var field = manualField || topFieldByApproval(approved);
    var criteria = topCriteriaByWeight(3, field);
    var inField = approved.filter(function(m){ return m.field === field; });
    var topFitTitles = (inField.length ? inField : approved).slice()
      .sort(function(a,b){ return predictFit(b) - predictFit(a); })
      .slice(0, 3)
      .map(function(m){ return m.title; });
    return { field: field, criteria: criteria, sampleTitles: topFitTitles };
  }

  function buildTavilyQuery(brief, keyword){
    if (keyword) {
      var kwParts = [keyword];
      if (brief.field) kwParts.push(brief.field);
      return kwParts.join(' ');
    }
    var parts = [];
    if (brief.field) parts.push(brief.field);
    if (brief.sampleTitles.length) parts = parts.concat(extractKeywords(brief.sampleTitles[0], 3));
    if (brief.criteria.length) parts.push(brief.criteria[0].label);
    if (!parts.length) parts.push('최신 이슈');
    return parts.join(' ');
  }

  // Batch-scores materials that came in without AI-estimated scores (URL list, Tavily).
  // Uses any snippet text already on hand; falls back to web search per item when needed.
  // Gemini Developer API — generateContent with responseMimeType:'application/json'
  // for reliable structured output. Judges from title/source/any snippet on hand
  // (no live web search — that needs a separate grounding tool most free keys don't have).
  // Model names/availability vary by key, so instead of guessing, let the
  // person pull the real list for their own key and pick one that works.
  // Fires one minimal generateContent call to confirm the key+model combo
  // actually works, surfacing a 404 (wrong model) vs other errors clearly.
  async function testGeminiConnection(model){
    await geminiFetch('ping', model);
    return true;
  }

  async function listGeminiModels(keyOverride){
    return geminiListModelsDirect(keyOverride);
  }

  // Shared scoring rubric. Without anchors the model drifts to a "safe" 60-80
  // for everything, which makes the 8 scores (and the learned weights built on
  // them) nearly indistinguishable between materials.
  // Materials scored under the current rubric carry sv === SCORE_VER; anything
  // without it was scored under an older (more generous) rubric.
  var SCORE_VER = 2;

  var SCORE_RUBRIC =
    '[채점] 0~100점. 50=검색하면 흔히 나오는 평범한 웹 자료. 후하게 주지 말고 전체 범위를 써.\n' +
    '신뢰성: 90+=정부·학술지·공신력 기관 원문, 70=주요 언론, 50=출처 불분명·개인 블로그, 20-=광고·루머\n' +
    '적절성: 90+=주제를 직접·핵심적으로 다룸, 50=일부 관련, 20-=거의 무관\n' +
    '최신성: 90+=1년 이내, 70=1~3년, 50=3~5년, 20-=5년 이상\n' +
    '객관성: 90+=데이터·근거·인용 중심, 50=사실·의견 혼합, 20-=주장·감정 중심\n' +
    '전문성: 90+=전문가·기관 작성, 50=일반 기자 해설, 20-=비전문가 후기\n' +
    '정보 충실도: 90+=풍부하고 깊이 있음(수치·사례·근거), 50=핵심만, 20-=정보량 적고 피상적·수준 낮음\n' +
    '이해하기 쉬움: 90+=비전문가도 바로 이해, 50=보통, 20-=전문용어·논문체\n' +
    '편향성 낮음(높을수록 균형): 90+=여러 시각을 균형 있게, 50=약간 치우침, 20-=선전·일방 주장\n' +
    '관심도: 90+=관심 큰 주제, 50=보통, 20-=드묾\n' +
    '같은 목록 안에서 요소마다 최고·최저가 30점 이상 벌어지게 하고, 정보가 부족하면 50 근처로 줘. 한 자료의 요소를 비슷한 값으로 채우지 말고 강점·약점을 구분해.';

  // ---- compact AI I/O: numbers in a fixed order instead of keyed JSON objects ----
  function scoreOrderText(){ return CRITERIA.map(function(c){ return c.label; }).join(','); }
  function shortUrl(u){
    return String(u || '').replace(/^https?:\/\//i, '').replace(/^www\./, '').slice(0, 90);
  }
  function aiItemText(it, i, withSource){
    return '[' + (i + 1) + '] 제목: ' + String(it.title || '').slice(0, 120) +
      (it.url ? '\nURL: ' + shortUrl(it.url) : (withSource && it.source ? '\n출처: ' + it.source : '')) +
      (it.content ? '\n요약: ' + String(it.content).slice(0, 260) : '');
  }
  function parseAiArray(text){
    var clean = String(text || '').replace(/```json/gi, '').replace(/```/g, '').trim();
    var arr = JSON.parse(clean);
    if (!Array.isArray(arr)) throw new Error('invalid response shape');
    return arr;
  }
  function numsToScores(nums){
    var sc = {};
    CRITERIA.forEach(function(c, i){
      var v = Number(nums[i]);
      if (!isFinite(v)) v = 50;
      sc[c.key] = Math.max(0, Math.min(100, Math.round(v)));
    });
    return sc;
  }
  function objToScores(o){
    var sc = {};
    CRITERIA.forEach(function(c){
      var v = o && typeof o[c.key] === 'number' ? o[c.key] : 50;
      sc[c.key] = Math.max(0, Math.min(100, Math.round(v)));
    });
    return sc;
  }

  // Safety net on top of the rubric: if a batch still comes back bunched
  // together (std < 14) or inflated (mean > 62), widen the spread around the
  // batch mean and pull the mean down a bit. Needs 4+ items to be meaningful.
  function spreadScores(list){
    var ok = list.filter(function(x){ return x; });
    if (ok.length < 4) return list;
    CRITERIA.forEach(function(c){
      var vals = ok.map(function(sc){ return sc[c.key]; });
      var mean = vals.reduce(function(a, b){ return a + b; }, 0) / vals.length;
      var sd = Math.sqrt(vals.reduce(function(a, b){ return a + (b - mean) * (b - mean); }, 0) / vals.length);
      var factor = (sd >= 14 || sd < 1) ? 1 : Math.min(3, 16 / sd);
      var newMean = mean > 62 ? 62 + (mean - 62) * 0.4 : mean;
      ok.forEach(function(sc){
        sc[c.key] = Math.max(3, Math.min(97, Math.round(newMean + (sc[c.key] - mean) * factor)));
      });
    });
    return list;
  }

  // Big batches are scored in chunks so one prompt/response never gets huge;
  // the spread safety net then runs over the whole batch together.
  async function estimateScoresBatchGemini(items){
    var CHUNK = 20, out = [], firstErr = null;
    for (var i = 0; i < items.length; i += CHUNK){
      try {
        out = out.concat(await estimateScoresChunkGemini(items.slice(i, i + CHUNK)));
      } catch(e){
        if (!out.length && i === 0) throw e;
        firstErr = firstErr || e;
        out = out.concat(items.slice(i, i + CHUNK).map(function(){ return null; }));
      }
    }
    return spreadScores(out);
  }

  async function estimateScoresChunkGemini(items){
    var gs = state.geminiSettings || {};
    var model = gs.model || 'gemini-2.5-flash';
    var n = CRITERIA.length;

    var listText = items.map(function(it, i){ return aiItemText(it, i, true); }).join('\n\n');

    var prompt = '자료 목록의 각 자료를 평가 요소 ' + n + '개(순서: ' + scoreOrderText() + ')로 0~100점 추정해. ' +
      '요약이 있으면 그걸 근거로, 없으면 제목·출처·URL로 합리적으로 추정해.\n\n' +
      SCORE_RUBRIC + '\n\n[후보 자료]\n' + listText + '\n\n' +
      '자료마다 [번호, 점수 ' + n + '개]를 이 순서로 담은 JSON 배열로만 응답해(설명 금지). 예: [[1,70,55,40,60,35,50,65,45,60],[2,...]]';

    var data = await geminiFetch(prompt, model, true);
    var byIndex = {};
    parseAiArray(data.text).forEach(function(r){
      if (Array.isArray(r)){
        var idx = Number(r[0]);
        if (idx && r.length >= 1 + n) byIndex[idx] = numsToScores(r.slice(1));
      } else if (r && r.index && r.scores){
        byIndex[r.index] = objToScores(r.scores);
      }
    });
    return items.map(function(it, i){ return byIndex[i + 1] || null; });
  }

  function estimateScoresBatch(items, engine){
    return estimateScoresBatchGemini(items);
  }

  // Card-level summary. No live browsing available, so this is explicitly
  // framed to the model (and to the person, in the UI) as an estimate from
  // title/source/field alone, not a read of the actual page content.
  async function generateSummaryGemini(model, material){
    var prompt = '다음 자료가 어떤 내용을 다룰지 2~3문장으로 짧게 요약해줘. ' +
      '실제 본문을 읽은 게 아니라 제목·출처·분야만 보고 추정하는 것이므로, 단정적으로 말하지 말고 "~일 것으로 보인다", "~에 관한 내용으로 추정된다" 같은 어조를 써줘.\n\n' +
      '제목: ' + material.title + '\n' +
      '출처: ' + (material.source || '미상') + '\n' +
      '분야: ' + material.field + (material.subfield ? ' · ' + material.subfield : '') + '\n' +
      (material.url ? 'URL: ' + material.url + '\n' : '') +
      '\n요약 텍스트만 출력해. 따옴표나 다른 설명 없이.';

    var data = await geminiFetch(prompt, model);
    var text = (data.text || '').trim();
    if (!text) throw new Error('빈 응답을 받았어요');
    return text;
  }

  // Applies AI-returned scores onto materials and returns a short status
  // suffix so the success toast can honestly say whether scoring actually happened.
  function applyAiScores(created, scoresList){
    var applied = 0;
    created.forEach(function(m, i){ if (scoresList[i]){ m.scores = scoresList[i]; m.sv = SCORE_VER; applied++; } });
    if (applied === created.length) return ' (AI 채점 완료)';
    if (applied > 0) return ' (' + applied + '/' + created.length + '개만 AI 채점됨, 나머지는 기본 점수)';
    return ' (AI 응답을 적용하지 못해 기본 점수로 등록됨)';
  }

  function rejectedTabHtml(rejected){
    if (rejected.length === 0){
      return '<div class="empty"><h3>반려 자료함이 비어있어요</h3><p>카드 평가에서 왼쪽으로 넘긴 자료가 이유와 함께 여기 보관됩니다.</p></div>';
    }
    var counts = {};
    rejected.forEach(function(m){ counts[m.rejectReason] = (counts[m.rejectReason]||0)+1; });
    var chips = Object.keys(counts).map(function(k){ return '<span class="chip">' + escapeHtml(k) + '<b>' + counts[k] + '</b></span>'; }).join('');
    var filterOptions = '<option value="all">전체 이유</option>' + Object.keys(counts).map(function(k){ return '<option value="'+escapeHtml(k)+'" '+(state.rejFilter===k?'selected':'')+'>'+escapeHtml(k)+'</option>'; }).join('');
    var list = rejected.filter(function(m){ return state.rejFilter==='all' || m.rejectReason===state.rejFilter; });
    var items = list.map(function(m){
      return '<div class="rej-item sel' + (state.sel[m.id] ? ' picked' : '') + '">' + selBoxHtml(m) + '<div class="info"><h4>' + escapeHtml(m.title) + '</h4>' +
        '<span class="tag">' + escapeHtml(m.rejectReason) + '</span>' +
        '<div class="meta2">' + escapeHtml(fieldLabel(m)) + ' · ' + escapeHtml(m.source||'미상') + '</div>' +
        moreLinkHtml(m, 'inline-more') +
        '</div>' +
        '<button class="btn ghost small" data-restore="' + m.id + '">되돌리기</button></div>';
    }).join('');
    return '<p class="section-title">반려 자료함</p>' +
      '<div class="rej-chips">' + chips + '</div>' +
      '<div class="field" style="max-width:220px;"><select id="rej-filter">' + filterOptions + '</select></div>' +
      selBarHtml(list.map(function(m){ return m.id; })) +
      items;
  }

  // ---- Help tab + first-run tutorial ----
  var TUTORIAL_STEPS = [
    { icon: 'home', title: '자료평가서고에 오신 걸 환영해요',
      body: '<p>탐구 보고서나 수행평가에 쓸 자료를 <b>모으고</b>, 그 자료가 <b>믿을 만한지 평가</b>하는 걸 도와주는 프로그램이에요.</p>' +
            '<p>과제를 대신 써 주는 도구가 아니에요. 자료를 찾고 판단하는 연습과 정리를 돕는 도구예요.</p>' +
            '<p class="tut-hint">1분이면 사용법을 다 볼 수 있어요.</p>' },
    { icon: 'add', title: '1. 자료를 모아요',
      body: '<p>왼쪽 위 <b>☰ 메뉴 → 자료</b>에서 평가할 자료를 쌓아요.</p>' +
            '<ul><li><b>자료 추가</b>: 자료 하나를 직접 등록해요.</li>' +
            '<li><b>대량 추가</b>: URL 목록을 붙여넣거나, 키워드로 웹에서 찾아와요.</li>' +
            '<li><b>의견 수집</b>: 사회 이슈에 대한 여러 의견을 모아 입장별로 정리해 줘요.</li></ul>' },
    { icon: 'swipe', title: '2. 카드로 평가해요',
      body: '<p><b>카드 평가</b>에서 자료를 한 장씩 보고 판단해요.</p>' +
            '<ul><li><b>오른쪽</b>으로 넘기면 <b>적절</b>, <b>왼쪽</b>은 <b>반려</b>예요. 반려할 땐 이유를 골라요.</li>' +
            '<li>"AI 요약 보기"와 "원문 보기"로 내용을 확인하고 정해요.</li></ul>' +
            '<p class="tut-hint">적절·반려 기록은 각각 승인 자료함, 반려 자료함에 쌓여요.</p>' },
    { icon: 'profile', title: '3. 점수는 참고용이에요',
      body: '<p>카드의 9가지 점수(신뢰성, 최신성, 정보 충실도 등)는 AI가 제목과 출처, 요약만 보고 <b>추정한 값</b>이에요.</p>' +
            '<p>틀릴 수 있으니 보고서에 쓸 자료는 꼭 <b>원문을 직접 열어 확인</b>하고, 출처를 밝혀서 인용하세요.</p>' },
    { icon: 'archive', title: '4. 내 기준을 배워요',
      body: '<p>카드를 평가할수록 <b>성향 분석</b>에 "내가 중요하게 여기는 기준"이 쌓여요.</p>' +
            '<ul><li><b>분별 수집</b>: 내 기준에 맞는 자료만 AI가 골라서 모아 줘요.</li>' +
            '<li><b>성향 공유</b>: 공유 코드로 모둠원과 같은 기준을 쓸 수 있어요.</li></ul>' +
            '<p class="tut-hint">처음에는 점수 차이가 작을 수 있어요. 카드를 여러 장 평가해 보세요.</p>' },
    { icon: 'help', title: '준비 끝! 시작해 볼까요?',
      body: '<p>카드 평가나 자료 추가부터 시작해 보세요.</p>' +
            '<p>막히면 언제든 <b>☰ 메뉴 → 도움말</b>에서 기능 설명과 자주 묻는 질문을 볼 수 있어요. 이 안내도 도움말에서 다시 볼 수 있어요.</p>' }
  ];

  function tutorialHtml(){
    var i = Math.max(0, Math.min(TUTORIAL_STEPS.length - 1, state.tutorialStep));
    var st = TUTORIAL_STEPS[i];
    var last = i === TUTORIAL_STEPS.length - 1;
    var dots = TUTORIAL_STEPS.map(function(x, k){
      return '<button type="button" class="' + (k === i ? 'on' : '') + '" data-tut-step="' + k + '" aria-label="' + (k + 1) + '단계로 이동"></button>';
    }).join('');
    return '<div class="modal-overlay" id="tut-overlay" style="z-index:60;"><div class="modal tut-modal" role="dialog" aria-modal="true">' +
      '<button type="button" class="tut-close" id="tut-skip-x" aria-label="닫기">' + ICONS.x + '</button>' +
      '<div class="tut-count">' + (i + 1) + ' / ' + TUTORIAL_STEPS.length + '</div>' +
      '<div class="tut-icon">' + ICONS[st.icon] + '</div>' +
      '<h3>' + st.title + '</h3>' +
      '<div class="tut-body">' + st.body + '</div>' +
      '<div class="tut-dots">' + dots + '</div>' +
      '<div class="tut-actions">' +
        (last ? '<span></span>' : '<button type="button" class="tut-skip" id="tut-skip">건너뛰기</button>') +
        '<div class="right">' +
          (i > 0 ? '<button type="button" class="btn ghost small" id="tut-prev" style="color:var(--ink);border-color:rgba(32,40,31,0.35);">이전</button>' : '') +
          '<button type="button" class="btn small" id="tut-next">' + (last ? '시작하기' : '다음') + '</button>' +
        '</div>' +
      '</div></div></div>';
  }

  function helpTabHtml(){
    var steps = [
      ['1', '자료 모으기', '자료 추가, 대량 추가, 의견 수집으로 평가할 자료를 쌓아요.'],
      ['2', '카드로 평가하기', '카드 평가에서 오른쪽(적절)·왼쪽(반려)으로 넘기며 판단해요.'],
      ['3', '내 기준 확인하기', '성향 분석에서 내가 중요하게 여기는 기준과 반려 이유를 봐요.'],
      ['4', '골라서 더 모으기', '분별 수집으로 내 기준에 맞는 자료만 AI가 골라 모아 줘요.']
    ];
    var stepsHtml = steps.map(function(x){
      return '<div class="help-step"><span class="no">STEP ' + x[0] + '</span><h4>' + x[1] + '</h4><p>' + x[2] + '</p></div>';
    }).join('');

    var guide = [
      ['메인화면', '학습 현황, 내가 중요하게 여기는 기준, 지금 눈여겨볼 대기 자료를 한눈에 봐요. "내 성향에 맞는 자료 찾기"로 바로 수집할 수도 있어요.'],
      ['카드 평가', '자료를 카드 한 장씩 보고 <b>오른쪽으로 넘기면 적절</b>, <b>왼쪽으로 넘기면 반려</b>예요. 반려하면 이유를 고르고, 이 기록이 내 기준을 학습하는 데 쓰여요. "AI 요약 보기"는 내용을 추정한 요약이고, "원문 보기"로 직접 확인할 수 있어요.'],
      ['자료 추가', '제목, 출처, URL을 입력해 자료 하나를 등록해요. 9가지 점수는 AI가 추정하게 하거나 직접 입력할 수 있어요.'],
      ['대량 추가', '<b>URL 목록으로 추가</b>(여러 개를 붙여넣기), <b>샘플 자동 생성</b>(연습용), <b>무분별 수집</b>(키워드로 웹에서 찾은 자료를 그대로 가져오기), <b>분별 수집</b>(내 성향 또는 공유받은 성향에 맞는 자료만 AI가 걸러서 가져오기)가 있어요.'],
      ['의견 수집', '사회 이슈를 등록하면 웹에서 의견을 찾아오거나 직접 입력할 수 있어요. AI가 비슷한 입장끼리 묶고 비율을 막대로 보여줘요. 찬반이 나뉘는 주제의 탐구나 토론 준비에 유용해요.'],
      ['승인 자료함', '적절로 넘긴 자료를 모아 두는 곳이에요. 검색, 분야 필터, 정렬, 메모, "대기로 되돌리기"를 쓸 수 있어요.'],
      ['반려 자료함', '반려한 자료와 그 이유를 볼 수 있어요. 이유별로 거르거나, 마음이 바뀌면 되돌릴 수 있어요.'],
      ['공유 · 그룹', '승인·반려 자료함에서 자료를 체크하면 <b>공유 링크</b>를 만들거나 <b>그룹</b>에 넣을 수 있어요. 링크는 로그인 없이 읽기 전용으로 열려요. 그룹은 학급·동아리처럼 코드를 아는 사람끼리 쓰는 공간이고, 친구가 넣은 자료는 "내 서고에 담기"로 내 대기 목록에 가져와 직접 평가할 수 있어요.'],
      ['상대 비교', '승인한 자료 두 개를 기준별로 맞대어 비교해요. 비교할수록 점수가 더 정교해져요.'],
      ['성향 분석', '분야를 고르면 그 분야에서의 내 기준을 따로 볼 수 있어요(예: 과학은 어려운 자료도 OK, 사회는 쉬운 게 좋아요). <b>AI 예측 적중률</b>(프로그램이 예측한 값과 내 실제 결정이 얼마나 맞았는지), 내가 중요하게 여기는 기준과 반려 이유 분포를 볼 수 있어요. 맨 아래 <b>내 성향 공유하기</b>에서 공유 코드를 만들면, 다른 사람이 분별 수집에서 내 기준을 쓸 수 있어요. 모둠 과제에서 선별 기준을 맞출 때 쓸 수 있어요.'],
      ['설정', 'AI 사용량 확인, 점수 다시 매기기, 데이터 초기화, 계정 관리를 할 수 있어요. AI 모델과 연결은 관리자가 관리해요.']
    ];
    var guideHtml = guide.map(function(g){
      return '<details class="help-acc"><summary>' + g[0] + '</summary><div class="help-body">' + g[1] + '</div></details>';
    }).join('');

    var critDesc = {
      trust: '출처가 믿을 만한가', appropriateness: '내 주제와 관련이 있는가', recency: '얼마나 최근 정보인가',
      objectivity: '근거와 데이터 중심인가', expertise: '전문가·기관이 쓴 내용인가', depth: '정보가 충분하고 깊이 있는가',
      clarity: '내 수준에서 이해되는가', lowBias: '한쪽으로 치우치지 않았는가', interest: '흥미로운 주제인가'
    };
    var critHtml = '<div class="help-crit">' + CRITERIA.map(function(c){
      return '<div><b>' + c.label + '</b>' + (critDesc[c.key] || '') + '</div>';
    }).join('') + '</div>';

    var faq = [
      ['카드 평가에 카드가 없다고 나와요', '평가할 자료가 없는 상태예요. <b>자료 추가</b>나 <b>대량 추가</b>에서 자료를 먼저 등록해 주세요.'],
      ['성향 분석이 비어 있어요', '카드를 평가해야 내 기준이 쌓여요. 처음에는 점수 차이가 작을 수 있으니 카드를 여러 장(10장 이상) 평가해 보세요.'],
      ['수집이나 AI 점수 매기기가 안 돼요', '하루에 쓸 수 있는 AI·검색 횟수에는 한도가 있어요. 한도 오류라면 시간이 지난 뒤 다시 하거나 관리자에게 알려주세요. <b>설정</b>의 AI 사용량에서 오늘 남은 횟수를 볼 수 있어요.'],
      ['내 자료를 다른 사람이 볼 수 있나요?', '다른 사용자는 내가 직접 공유하기 전에는 볼 수 없어요. 공유 링크나 그룹에 넣은 자료, 성향 공유로 내보낸 내용만 상대가 볼 수 있고, 이메일은 어디에도 공유되지 않아요. 공유 링크는 "공유 · 그룹" 메뉴에서 언제든 중단할 수 있어요. 다만 <b>서비스를 운영하고 문제를 해결하기 위해 관리자는</b> 사용 현황(자료 수, AI 사용량, 마지막 접속)을 볼 수 있고, 꼭 필요할 때는 자료·평가 기록도 열람할 수 있어요.']
    ];
    var faqHtml = faq.map(function(g){
      return '<details class="help-acc"><summary>' + g[0] + '</summary><div class="help-body">' + g[1] + '</div></details>';
    }).join('');

    return '<p class="section-title">도움말</p>' +
      '<p class="help-lead"><b>자료평가서고</b>는 탐구 보고서나 수행평가에 쓸 자료를 모으고, 그 자료가 믿을 만한지 판단하는 걸 도와주는 프로그램이에요. ' +
        '과제를 대신 써 주는 도구가 아니라, 자료를 찾고 평가하는 연습과 정리를 돕는 도구예요. ' +
        '카드를 넘기며 평가하다 보면 "내가 중요하게 보는 기준"을 프로그램이 배워서, 비슷한 자료를 골라 줘요.</p>' +
      '<div style="margin-bottom:26px;"><button class="btn small" id="help-replay">처음 안내(튜토리얼) 다시 보기</button></div>' +
      '<p class="section-title">기본 사용 순서</p><div class="help-steps">' + stepsHtml + '</div>' +
      '<p class="section-title">메뉴별 기능</p><div style="margin-bottom:28px;">' + guideHtml + '</div>' +
      '<p class="section-title">9가지 평가 기준</p>' + critHtml +
      '<p class="help-note" style="margin-top:14px;margin-bottom:28px;"><b>점수는 참고용이에요.</b> AI가 제목·출처·요약만 보고 추정한 값이라 틀릴 수 있어요. 보고서에 쓸 자료는 꼭 원문을 직접 확인하고, 출처를 밝혀서 인용하세요.</p>' +
      '<p class="section-title">자주 묻는 질문</p><div style="margin-bottom:20px;">' + faqHtml + '</div>';
  }

  // ---- Approved vault ----
  function avgScore(m){
    var t = 0; CRITERIA.forEach(function(c){ t += (m.scores && m.scores[c.key]) || 0; });
    return Math.round(t / CRITERIA.length);
  }
  function fmtDecided(m){
    var t = m.decidedAt; if (!t) return '';
    var d = new Date(t);
    return (d.getMonth()+1) + '월 ' + d.getDate() + '일 승인';
  }
  function approvedTabHtml(approved){
    if (approved.length === 0){
      return '<div class="empty"><h3>승인 자료함이 비어있어요</h3><p>카드 평가에서 오른쪽으로 넘긴(적절) 자료가 여기 보관됩니다.</p></div>';
    }
    var a = state.apv;
    var fieldsPresent = {};
    approved.forEach(function(m){ fieldsPresent[m.field] = (fieldsPresent[m.field]||0) + 1; });
    if (a.field !== 'all' && !fieldsPresent[a.field]) a.field = 'all';
    var chips = Object.keys(fieldsPresent).map(function(k){ return '<span class="chip">' + escapeHtml(k) + '<b>' + fieldsPresent[k] + '</b></span>'; }).join('');
    var fieldOptions = '<option value="all">전체 분야</option>' + Object.keys(fieldsPresent).map(function(k){ return '<option value="'+escapeHtml(k)+'" '+(a.field===k?'selected':'')+'>'+escapeHtml(k)+'</option>'; }).join('');
    var sortOptions = [['recent','최근 승인순'],['score','평균 점수 높은순'],['fit','내 성향 일치도순'],['title','제목순']].map(function(o){ return '<option value="'+o[0]+'" '+(a.sort===o[0]?'selected':'')+'>'+o[1]+'</option>'; }).join('');

    var q = a.q.trim().toLowerCase();
    var list = approved.filter(function(m){
      if (a.field !== 'all' && m.field !== a.field) return false;
      if (!q) return true;
      return ((m.title||'') + ' ' + (m.source||'') + ' ' + (m.note||'') + ' ' + fieldLabel(m)).toLowerCase().indexOf(q) !== -1;
    });
    var fitOf = function(m){ return predictFit(m); };
    list = list.slice().sort(function(x, y){
      if (a.sort === 'score') return avgScore(y) - avgScore(x);
      if (a.sort === 'fit') return fitOf(y) - fitOf(x);
      if (a.sort === 'title') return (x.title||'').localeCompare(y.title||'', 'ko');
      return (y.decidedAt || y.createdAt || 0) - (x.decidedAt || x.createdAt || 0);
    });

    var items = list.map(function(m){
      var bars = CRITERIA.map(function(c){
        var v = (m.scores && m.scores[c.key]) || 0;
        return '<div class="apv-bar">' + escapeHtml(c.label) + ' ' + v + '<div class="track"><i style="width:' + Math.max(0, Math.min(100, v)) + '%"></i></div></div>';
      }).join('');
      var decided = fmtDecided(m);
      return '<div class="apv-item sel' + (state.sel[m.id] ? ' picked' : '') + '">' + selBoxHtml(m) + '<div class="apv-top"><div class="info">' +
          '<h4>' + escapeHtml(m.title) + '</h4>' +
          '<span class="tag">' + escapeHtml(fieldLabel(m)) + '</span>' +
          '<div class="meta2">' + escapeHtml(m.source||'미상') + (decided ? ' · ' + decided : '') + '</div>' +
          moreLinkHtml(m, 'inline-more') +
        '</div><div class="apv-badges">' +
          '<div class="apv-badge"><div class="n">' + avgScore(m) + '</div><div class="l">평균 점수</div></div>' +
          '<div class="apv-badge"><div class="n">' + Math.round(fitOf(m)*100) + '%</div><div class="l">성향 일치</div></div>' +
        '</div></div>' +
        '<div class="apv-bars">' + bars + '</div>' +
        '<textarea class="apv-note" data-apv-note="' + m.id + '" placeholder="이 자료에 대한 메모 (자동 저장)">' + escapeHtml(m.note || '') + '</textarea>' +
        '<div class="apv-actions"><button class="btn ghost small" data-apv-unapprove="' + m.id + '">대기로 되돌리기</button></div>' +
      '</div>';
    }).join('');
    if (!items) items = '<div class="empty" style="min-height:160px;"><p>조건에 맞는 승인 자료가 없어요.</p></div>';

    return '<p class="section-title">승인 자료함</p>' +
      '<div class="rej-chips">' + chips + '</div>' +
      '<div class="apv-controls">' +
        '<div class="field"><input type="text" id="apv-q" placeholder="제목·출처·메모 검색" value="' + escapeHtml(a.q) + '"></div>' +
        '<div class="field"><select id="apv-field">' + fieldOptions + '</select></div>' +
        '<div class="field"><select id="apv-sort">' + sortOptions + '</select></div>' +
      '</div>' +
      '<div class="apv-count">' + list.length + '개 표시 (전체 ' + approved.length + '개)</div>' +
      selBarHtml(list.map(function(m){ return m.id; })) +
      items;
  }

  // ---- 공유 · 스크랩 · 그룹 ----------------------------------------------
  // 1) 공유 링크: 선택한 자료의 스냅샷을 shared_collections/{코드}에 저장하고,
  //    ?s=코드 주소로 로그인 없이 읽기 전용 페이지를 보여준다.
  // 2) 그룹: groups/{코드} (+ items 하위 컬렉션). 코드를 아는 로그인 사용자가 참여한다.
  // 모든 공유 문서에는 이메일을 넣지 않는다 (uid와 사용자가 정한 이름만).
  var MAX_SHARE_ITEMS = 100;
  var MAX_GROUP_MEMBERS = 60;

  function safeHttpUrl(u){
    u = String(u || '').trim();
    return /^https?:\/\/[^\s"'<>]+$/i.test(u) ? u.slice(0, 500) : null;
  }
  function clamp100(v){
    v = Number(v);
    if (!isFinite(v)) return 50;
    return Math.max(0, Math.min(100, Math.round(v)));
  }
  function avgOfScores(sc){
    var t = 0; CRITERIA.forEach(function(c){ t += clamp100(sc && sc[c.key]); });
    return Math.round(t / CRITERIA.length);
  }
  function fmtDate(ts){
    if (!ts) return '';
    var d = new Date(ts);
    return (d.getMonth() + 1) + '월 ' + d.getDate() + '일';
  }
  function myName(){ return (state.displayName || '').trim().slice(0, 30) || '익명'; }
  function findMaterial(id){ return state.materials.filter(function(m){ return m.id === id; })[0] || null; }
  function shareRulesMsg(err, what){
    if (err && err.code === 'permission-denied') return what + '에 필요한 Firestore 보안 규칙이 아직 없거나, 권한이 없어요. 안내된 규칙을 추가한 뒤 다시 시도해주세요.';
    return (err && err.message) ? err.message : '알 수 없는 오류';
  }
  function shareLinkUrl(code){
    return location.href.split('#')[0].split('?')[0] + '?s=' + code;
  }
  function copyText(text, okMsg){
    if (navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){ showToast(okMsg); }, function(){ showToast('복사하지 못했어요. 직접 선택해서 복사해주세요.'); });
    } else {
      showToast('복사하지 못했어요. 직접 선택해서 복사해주세요.');
    }
  }

  // What leaves the app for one material (no email, no internal ids, no raw page text).
  function itemSnapshot(m, withNote){
    var o = {
      title: String(m.title || '').slice(0, 200),
      source: String(m.source || '').slice(0, 120),
      url: safeHttpUrl(m.url),
      field: String(m.field || '').slice(0, 40),
      subfield: m.subfield ? String(m.subfield).slice(0, 40) : null,
      summary: m.summary ? String(m.summary).slice(0, 600) : null,
      scores: {},
      status: m.status === 'rejected' ? 'rejected' : 'approved',
      rejectReason: m.status === 'rejected' ? String(m.rejectReason || '기타').slice(0, 40) : null,
      decidedAt: m.decidedAt || null
    };
    CRITERIA.forEach(function(c){ o.scores[c.key] = clamp100(m.scores && m.scores[c.key]); });
    if (withNote && m.note) o.note = String(m.note).slice(0, 500);
    return o;
  }

  // Anything read back from a shared doc is untrusted: coerce every field.
  function cleanSharedItem(raw){
    raw = raw || {};
    var sc = {};
    CRITERIA.forEach(function(c){ sc[c.key] = clamp100(raw.scores && raw.scores[c.key]); });
    return {
      title: String(raw.title || '').slice(0, 200) || '(제목 없음)',
      source: String(raw.source || '').slice(0, 120),
      url: safeHttpUrl(raw.url),
      field: String(raw.field || '').slice(0, 40),
      subfield: raw.subfield ? String(raw.subfield).slice(0, 40) : null,
      summary: raw.summary ? String(raw.summary).slice(0, 600) : '',
      scores: sc,
      status: raw.status === 'rejected' ? 'rejected' : 'approved',
      rejectReason: raw.rejectReason ? String(raw.rejectReason).slice(0, 40) : '',
      note: raw.note ? String(raw.note).slice(0, 500) : '',
      decidedAt: Number(raw.decidedAt) || 0
    };
  }

  // ---- selection UI inside the two vaults ----
  function selectedMaterials(){
    var want = state.tab === 'approved' ? 'approved' : 'rejected';
    return state.materials.filter(function(m){ return state.sel[m.id] && m.status === want; });
  }
  function selBoxHtml(m){
    return '<label class="sel-box" title="공유할 자료로 선택"><input type="checkbox" data-sel="' + m.id + '" ' + (state.sel[m.id] ? 'checked' : '') + ' aria-label="이 자료 선택"></label>';
  }
  function selBarHtml(visibleIds){
    state.selVisible = visibleIds;
    var n = selectedMaterials().length;
    var allOn = visibleIds.length > 0 && visibleIds.every(function(id){ return state.sel[id]; });
    var dis = n === 0 ? 'disabled' : '';
    return '<div class="sel-bar">' +
      '<label><input type="checkbox" id="sel-all" ' + (allOn ? 'checked' : '') + '> 표시된 자료 모두 선택</label>' +
      '<span class="cnt">' + n + '개 선택' + (n > MAX_SHARE_ITEMS ? ' (한 번에 최대 ' + MAX_SHARE_ITEMS + '개)' : '') + '</span>' +
      '<span class="grow"></span>' +
      '<button type="button" class="btn small" data-share-open="link" ' + dis + '>공유 링크 만들기</button>' +
      '<button type="button" class="btn ghost small" data-share-open="group" ' + dis + '>그룹에 넣기</button>' +
    '</div>';
  }

  // ---- one shared item card (used by the public viewer and by group pages) ----
  function sharedItemHtml(it, metaExtra, actionsHtml){
    var bars = CRITERIA.map(function(c){
      var v = it.scores[c.key];
      return '<div class="apv-bar">' + escapeHtml(c.label) + ' ' + v + '<div class="track"><i style="width:' + v + '%"></i></div></div>';
    }).join('');
    var pill = it.status === 'rejected'
      ? '<span class="pill no">반려' + (it.rejectReason ? ' · ' + escapeHtml(it.rejectReason) : '') + '</span>'
      : '<span class="pill ok">적절</span>';
    var title = it.url
      ? '<a href="' + escapeHtml(it.url) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(it.title) + '</a>'
      : escapeHtml(it.title);
    var field = it.field ? '<span class="tag">' + escapeHtml(it.field + (it.subfield ? ' · ' + it.subfield : '')) + '</span> ' : '';
    return '<div class="apv-item">' +
      '<div class="apv-top"><div class="info">' +
        '<h4>' + title + '</h4>' + field + pill +
        '<div class="meta2">' + escapeHtml(it.source || '출처 미상') + (metaExtra ? ' · ' + metaExtra : '') + '</div>' +
      '</div><div class="apv-badges"><div class="apv-badge"><div class="n">' + avgOfScores(it.scores) + '</div><div class="l">평균 점수</div></div></div></div>' +
      (it.summary ? '<p class="sh-sum"><b>✦ AI 요약(추정)</b> ' + escapeHtml(it.summary) + '</p>' : '') +
      '<div class="apv-bars">' + bars + '</div>' +
      (it.note ? '<p class="sh-note"><b>메모</b> ' + escapeHtml(it.note) + '</p>' : '') +
      (actionsHtml ? '<div class="apv-actions">' + actionsHtml + '</div>' : '') +
    '</div>';
  }

  function statusFilterHtml(id, cur, items){
    var a = 0, r = 0;
    items.forEach(function(x){ if (x.status === 'rejected') r++; else a++; });
    return '<div class="field" style="max-width:220px;"><select id="' + id + '">' +
      '<option value="all"' + (cur === 'all' ? ' selected' : '') + '>전체 (' + items.length + ')</option>' +
      '<option value="approved"' + (cur === 'approved' ? ' selected' : '') + '>적절 (' + a + ')</option>' +
      '<option value="rejected"' + (cur === 'rejected' ? ' selected' : '') + '>반려 (' + r + ')</option>' +
    '</select></div>';
  }

  // ---- 공유 링크: public read-only viewer (no login) ----
  function loadViewer(){
    var v = state.viewer;
    fbDb.collection('shared_collections').doc(v.code).get().then(function(snap){
      if (!snap.exists) throw new Error('공유가 중단되었거나 잘못된 링크예요.');
      var d = snap.data() || {};
      v.data = {
        title: String(d.title || '공유된 자료 모음').slice(0, 80),
        ownerName: String(d.ownerName || '').slice(0, 30),
        createdAt: Number(d.createdAt) || 0,
        items: (Array.isArray(d.items) ? d.items : []).slice(0, 200).map(cleanSharedItem)
      };
      v.loading = false;
      try { document.title = v.data.title + ' · 자료평가서고'; } catch(e){}
      render();
    }).catch(function(err){
      v.loading = false;
      v.err = (err && err.code === 'permission-denied')
        ? '이 링크를 열 수 있는 권한 설정이 아직 안 되어 있어요. 공유한 사람에게 알려주세요.'
        : ((err && err.message) ? err.message : '불러오지 못했어요.');
      render();
    });
  }

  function viewerHtml(){
    var v = state.viewer;
    var home = location.href.split('#')[0].split('?')[0];
    var html = '<div class="viewer-brand">자료 평가 서고 · 공유된 자료 모음</div>';
    if (v.loading) return html + loadingHtml('불러오는 중...');
    if (v.err) {
      return html + '<div class="empty" style="height:auto;padding:36px 20px;"><h3>자료를 볼 수 없어요</h3><p>' + escapeHtml(v.err) + '</p></div>' +
        '<p style="text-align:center;margin-top:18px;"><a class="btn small btn-link" href="' + escapeHtml(home) + '">자료평가서고 열기</a></p>';
    }
    var d = v.data;
    var a = 0, r = 0;
    d.items.forEach(function(x){ if (x.status === 'rejected') r++; else a++; });
    var list = d.items.filter(function(x){ return v.filter === 'all' || x.status === v.filter; });
    var items = list.map(function(it){ return sharedItemHtml(it, '', ''); }).join('');
    if (!items) items = '<div class="empty" style="min-height:140px;"><p>표시할 자료가 없어요.</p></div>';
    html += '<h1 class="viewer-title">' + escapeHtml(d.title) + '</h1>' +
      '<div class="viewer-meta">' + (d.ownerName ? escapeHtml(d.ownerName) + ' 님이 공유 · ' : '') + (d.createdAt ? fmtDate(d.createdAt) + ' · ' : '') + '적절 ' + a + '개 · 반려 ' + r + '개</div>' +
      '<p class="help-note"><b>읽기 전용 페이지예요.</b> 공유한 사람이 카드 평가로 고른 자료의 모음이고, 점수는 AI가 제목·출처·요약만 보고 추정한 값이라 틀릴 수 있어요. 보고서에 쓰기 전에 원문을 직접 확인하고 출처를 밝혀서 인용하세요.</p>' +
      statusFilterHtml('v-filter', v.filter, d.items) + items +
      '<p style="text-align:center;margin:28px 0 0;"><a class="btn ghost small btn-link" href="' + escapeHtml(home) + '">나도 자료평가서고 써보기</a></p>';
    return html;
  }

  function attachViewerHandlers(){
    var f = document.getElementById('v-filter');
    if (f) f.addEventListener('change', function(){ state.viewer.filter = f.value; render(); });
  }

  // ---- 공유 모달 (공유 링크 / 그룹에 넣기) ----
  function openShareModal(kind){
    var mats = selectedMaterials();
    if (!mats.length) return;
    if (mats.length > MAX_SHARE_ITEMS){ showToast('한 번에 최대 ' + MAX_SHARE_ITEMS + '개까지 공유할 수 있어요. 선택을 줄여주세요.'); return; }
    var d = new Date();
    state.shareModal = {
      kind: kind, ids: mats.map(function(m){ return m.id; }),
      withNote: false,
      title: (state.tab === 'approved' ? '승인 자료 모음' : '반려 자료 모음') + ' (' + (d.getMonth() + 1) + '/' + d.getDate() + ')',
      name: state.displayName || '',
      pick: null, newGroup: '',
      busy: false, msg: null, result: null
    };
    render();
    if (kind === 'group') loadGroups(false);
  }

  function shareModalHtml(){
    var sm = state.shareModal;
    var mats = sm.ids.map(findMaterial).filter(Boolean);
    var a = 0, r = 0, notes = 0;
    mats.forEach(function(m){ if (m.status === 'rejected') r++; else a++; if (m.note) notes++; });
    var counts = '적절 ' + a + '개' + (r ? ' · 반려 ' + r + '개' : '');
    var html = '<div class="modal-overlay" id="sm-overlay"><div class="modal share-modal" role="dialog" aria-modal="true">';
    var msgHtml = sm.msg ? '<p class="acct-msg ' + sm.msg.type + '" style="margin:10px 0 0;">' + escapeHtml(sm.msg.text) + '</p>' : '';

    if (sm.kind === 'link'){
      html += '<h3>공유 링크 만들기</h3>';
      if (sm.result){
        html += '<div class="sub2">링크를 만들었어요. 이 주소를 아는 사람은 누구나 <b>로그인 없이</b> 읽기 전용으로 볼 수 있어요.</div>' +
          '<div class="field"><label>공유 링크</label><input type="text" id="sm-url" readonly value="' + escapeHtml(sm.result) + '"></div>' +
          '<div class="sm-actions"><button type="button" class="btn small" id="sm-copy">링크 복사</button>' +
          '<a class="btn ghost small btn-link" href="' + escapeHtml(sm.result) + '" target="_blank" rel="noopener noreferrer">열어 보기</a>' +
          '<button type="button" class="btn ghost small" id="sm-close">닫기</button></div>' +
          '<p class="sm-hint">링크는 만든 시점의 스냅샷이에요. 이후에 자료를 바꿔도 링크 내용은 그대로예요. 그만 공유하고 싶으면 <b>메뉴 → 공유 · 그룹</b>에서 링크를 중단할 수 있어요.</p>';
        return html + '</div></div>';
      }
      html += '<div class="sub2">선택한 ' + mats.length + '개(' + counts + ')를 읽기 전용 페이지로 공유해요.</div>' +
        '<div class="field"><label>모음 제목</label><input type="text" id="sm-title" maxlength="80" value="' + escapeHtml(sm.title) + '"></div>' +
        '<div class="field"><label>보일 내 이름 (선택)</label><input type="text" id="sm-name" maxlength="30" placeholder="예: 1학년 3반 유선웅" value="' + escapeHtml(sm.name) + '"></div>' +
        (notes ? '<div class="toggle-row"><input type="checkbox" id="sm-note" ' + (sm.withNote ? 'checked' : '') + '><label for="sm-note" style="margin:0;">내가 쓴 메모(' + notes + '개)도 함께 보이기</label></div>' : '') +
        '<p class="sm-hint">공유되는 것: 제목, 출처, 원문 링크, AI 요약, 9가지 점수' + (r ? ', 반려 이유' : '') + '. 이메일과 계정 정보는 공유되지 않아요.</p>' +
        msgHtml +
        '<div class="sm-actions"><button type="button" class="btn small" id="sm-go" ' + (sm.busy ? 'disabled' : '') + '>' + (sm.busy ? '만드는 중...' : '링크 만들기') + '</button>' +
        '<button type="button" class="btn ghost small" id="sm-cancel" ' + (sm.busy ? 'disabled' : '') + '>취소</button></div>';
      return html + '</div></div>';
    }

    // kind === 'group'
    var g = state.groups;
    html += '<h3>그룹에 넣기</h3>';
    if (sm.result){
      html += '<div class="sub2">' + escapeHtml(sm.result.text) + '</div>' +
        '<div class="sm-actions"><button type="button" class="btn small" id="sm-viewgroup">그룹 보기</button>' +
        '<button type="button" class="btn ghost small" id="sm-close">닫기</button></div>';
      return html + '</div></div>';
    }
    html += '<div class="sub2">선택한 ' + mats.length + '개(' + counts + ')를 학급·동아리 그룹에 넣어요. 그룹 사람들은 이 자료를 보고 자기 서고에 담을 수 있어요.</div>';
    if (g.loading && !g.list){
      html += '<p class="sm-hint">그룹을 불러오는 중...</p>';
    } else {
      var list = g.list || [];
      if (g.err) html += '<p class="acct-msg err" style="margin:0 0 10px;">' + escapeHtml(g.err) + '</p>';
      html += '<div class="field"><label>어느 그룹에 넣을까요?</label><div class="sm-picks">';
      list.forEach(function(x){
        html += '<label class="sm-pick"><input type="radio" name="sm-group" value="' + escapeHtml(x.code) + '" ' + (sm.pick === x.code ? 'checked' : '') + '> ' + escapeHtml(x.name) + ' <span>' + (x.memberUids || []).length + '명</span></label>';
      });
      html += '<label class="sm-pick"><input type="radio" name="sm-group" value="__new" ' + (sm.pick === '__new' ? 'checked' : '') + '> + 새 그룹 만들기</label></div></div>';
      if (sm.pick === '__new'){
        html += '<div class="field"><label>새 그룹 이름</label><input type="text" id="sm-newgroup" maxlength="40" placeholder="예: 1학년 3반 탐구반" value="' + escapeHtml(sm.newGroup) + '"></div>';
      }
      html += '<div class="field"><label>그룹에서 보일 내 이름</label><input type="text" id="sm-name" maxlength="30" placeholder="예: 유선웅" value="' + escapeHtml(sm.name) + '"></div>' +
        (notes ? '<div class="toggle-row"><input type="checkbox" id="sm-note" ' + (sm.withNote ? 'checked' : '') + '><label for="sm-note" style="margin:0;">내가 쓴 메모(' + notes + '개)도 함께 보이기</label></div>' : '') +
        '<p class="sm-hint">그룹에 넣은 자료는 그룹 멤버 모두가 볼 수 있어요. 이메일은 공유되지 않고, 내가 넣은 자료는 언제든 내가 지울 수 있어요.</p>';
    }
    html += msgHtml +
      '<div class="sm-actions"><button type="button" class="btn small" id="sm-go" ' + ((sm.busy || !sm.pick) ? 'disabled' : '') + '>' + (sm.busy ? '넣는 중...' : '그룹에 넣기') + '</button>' +
      '<button type="button" class="btn ghost small" id="sm-cancel" ' + (sm.busy ? 'disabled' : '') + '>취소</button></div>';
    return html + '</div></div>';
  }

  function publishLink(){
    var sm = state.shareModal;
    if (!sm || sm.busy) return;
    var mats = sm.ids.map(findMaterial).filter(Boolean);
    if (!mats.length){ sm.msg = { type: 'err', text: '선택한 자료를 찾지 못했어요.' }; render(); return; }
    var name = (sm.name || '').trim().slice(0, 30);
    var code = genShareCode();
    var doc = {
      ownerUid: state.user.uid,
      title: ((sm.title || '').trim() || '공유된 자료 모음').slice(0, 80),
      ownerName: name,
      createdAt: Date.now(),
      items: mats.map(function(m){ return itemSnapshot(m, sm.withNote); })
    };
    sm.busy = true; sm.msg = null; render();
    fbDb.collection('shared_collections').doc(code).set(doc).then(function(){
      var a = 0; doc.items.forEach(function(x){ if (x.status === 'approved') a++; });
      state.sharedLinks.unshift({ code: code, title: doc.title, count: doc.items.length, approved: a, rejected: doc.items.length - a, createdAt: doc.createdAt });
      if (name) state.displayName = name;
      persistAppData();
      sm.busy = false; sm.result = shareLinkUrl(code);
      state.sel = {};
      render();
    }).catch(function(err){
      sm.busy = false; sm.msg = { type: 'err', text: shareRulesMsg(err, '공유 링크') };
      render();
    });
  }

  function addSelectedToGroup(){
    var sm = state.shareModal;
    if (!sm || sm.busy || !sm.pick) return;
    var mats = sm.ids.map(findMaterial).filter(Boolean);
    if (!mats.length){ sm.msg = { type: 'err', text: '선택한 자료를 찾지 못했어요.' }; render(); return; }
    var name = (sm.name || '').trim().slice(0, 30);
    if (name) state.displayName = name;
    var who = myName();
    sm.busy = true; sm.msg = null; render();
    var ready;
    if (sm.pick === '__new'){
      var gname = (sm.newGroup || '').trim();
      if (!gname){ sm.busy = false; sm.msg = { type: 'err', text: '새 그룹 이름을 입력해주세요.' }; render(); return; }
      ready = createGroup(gname, who);
    } else {
      ready = Promise.resolve(groupByCode(sm.pick));
    }
    var target;
    ready.then(function(grp){
      if (!grp) throw new Error('그룹을 찾지 못했어요. 목록을 새로 불러와주세요.');
      target = grp;
      return addItemsToGroup(grp.code, mats, sm.withNote, who);
    }).then(function(){
      persistAppData();
      sm.busy = false;
      sm.result = { code: target.code, text: '"' + target.name + '" 그룹에 ' + mats.length + '개를 넣었어요.' };
      if (state.groups.active === target.code) state.groups.items = null;
      state.sel = {};
      render();
    }).catch(function(err){
      sm.busy = false; sm.msg = { type: 'err', text: shareRulesMsg(err, '그룹') };
      render();
    });
  }

  // ---- 그룹 ----
  function groupByCode(code){
    return (state.groups.list || []).filter(function(g){ return g.code === code; })[0] || null;
  }

  function loadGroups(force){
    var g = state.groups;
    if (g.loading) return;
    if (g.list && !force) return;
    g.loading = true; g.err = null; render();
    fbDb.collection('groups').where('memberUids', 'array-contains', state.user.uid).get().then(function(snap){
      var list = [];
      snap.forEach(function(d){ var x = d.data(); x.code = d.id; list.push(x); });
      list.sort(function(a, b){ return (b.createdAt || 0) - (a.createdAt || 0); });
      g.list = list; g.loading = false; render();
    }).catch(function(err){
      g.loading = false; g.list = g.list || [];
      g.err = shareRulesMsg(err, '그룹');
      render();
    });
  }

  function createGroup(name, who){
    var uid0 = state.user.uid;
    var code = genShareCode();
    var names = {}; names[uid0] = who;
    var data = { name: name.slice(0, 40), ownerUid: uid0, ownerName: who, memberUids: [uid0], memberNames: names, createdAt: Date.now() };
    return fbDb.collection('groups').doc(code).set(data).then(function(){
      data.code = code;
      state.groups.list = [data].concat(state.groups.list || []);
      return data;
    });
  }

  function joinGroup(rawCode){
    var code = normShareCode(rawCode);
    if (code.length !== 12) return Promise.reject(new Error('참여 코드는 12자리예요. 다시 확인해주세요.'));
    var ref = fbDb.collection('groups').doc(code);
    var uid0 = state.user.uid;
    return ref.get().then(function(snap){
      if (!snap.exists) throw new Error('없는 코드이거나 삭제된 그룹이에요.');
      var d = snap.data(); d.code = code;
      if ((d.memberUids || []).indexOf(uid0) !== -1) return d;
      if ((d.memberUids || []).length >= MAX_GROUP_MEMBERS) throw new Error('이 그룹은 인원이 가득 찼어요 (최대 ' + MAX_GROUP_MEMBERS + '명).');
      var upd = { memberUids: firebase.firestore.FieldValue.arrayUnion(uid0) };
      upd['memberNames.' + uid0] = myName();
      return ref.update(upd).then(function(){
        d.memberUids = (d.memberUids || []).concat([uid0]);
        d.memberNames = d.memberNames || {}; d.memberNames[uid0] = myName();
        return d;
      });
    }).then(function(d){
      var list = (state.groups.list || []).filter(function(x){ return x.code !== d.code; });
      state.groups.list = [d].concat(list);
      return d;
    });
  }

  function addItemsToGroup(code, mats, withNote, who){
    var batch = fbDb.batch();
    var col = fbDb.collection('groups').doc(code).collection('items');
    var now = Date.now();
    mats.forEach(function(m){
      var d = itemSnapshot(m, withNote);
      d.addedByUid = state.user.uid; d.addedByName = who; d.addedAt = now;
      batch.set(col.doc(state.user.uid + '_' + m.id), d);
    });
    return batch.commit();
  }

  function openGroup(code){
    var g = state.groups;
    g.active = code; g.items = null; g.itemsErr = null; g.filter = 'all';
    loadGroupItems(code);
  }

  function loadGroupItems(code){
    var g = state.groups;
    g.itemsLoading = true; g.itemsErr = null; render();
    var ref = fbDb.collection('groups').doc(code);
    ref.collection('items').get().then(function(snap){
      var list = [];
      snap.forEach(function(d){
        var x = d.data() || {};
        var it = cleanSharedItem(x);
        it.id = d.id;
        it.addedByUid = String(x.addedByUid || '');
        it.addedByName = String(x.addedByName || '익명').slice(0, 30);
        it.addedAt = Number(x.addedAt) || 0;
        list.push(it);
      });
      list.sort(function(a, b){ return b.addedAt - a.addedAt; });
      if (g.active !== code) return;
      g.items = list;
      return ref.get();
    }).then(function(snap){
      if (g.active !== code) return;
      if (snap && snap.exists){
        var d = snap.data(); d.code = code;
        g.list = [d].concat((g.list || []).filter(function(x){ return x.code !== code; }));
        g.list.sort(function(a, b){ return (b.createdAt || 0) - (a.createdAt || 0); });
      }
      g.itemsLoading = false; render();
    }).catch(function(err){
      if (g.active !== code) return;
      g.itemsLoading = false; g.items = g.items || [];
      g.itemsErr = (err && err.code === 'permission-denied') ? '이 그룹의 자료를 볼 권한이 없어요. 그룹에서 나갔거나 삭제됐을 수 있어요.' : shareRulesMsg(err, '그룹');
      render();
    });
  }

  function scrapItems(items, groupName){
    var have = existingUrlSet();
    var added = 0, dup = 0;
    var firstField = Object.keys(FIELD_TREE)[0];
    items.forEach(function(it){
      var n = normalizeUrl(it.url);
      if (n && have[n]){ dup++; return; }
      if (n) have[n] = true;
      var m = {
        id: uid(), title: it.title, field: it.field || firstField, subfield: it.subfield || null,
        source: it.source || '미상', url: it.url || null,
        scores: JSON.parse(JSON.stringify(it.scores)),
        status: 'pending', rejectReason: null, createdAt: Date.now(), scrappedFrom: groupName || ''
      };
      if (it.summary) m.summary = it.summary;
      state.materials.push(m);
      added++;
    });
    if (added) saveMaterials();
    showToast(added ? added + '개를 내 서고의 대기 목록에 담았어요' + (dup ? ' (이미 있는 ' + dup + '개는 건너뜀)' : '') : (dup ? '이미 내 서고에 있는 자료예요' : '담을 자료가 없어요'));
    render();
  }

  function deleteGroupFully(code){
    var ref = fbDb.collection('groups').doc(code);
    return ref.collection('items').get().then(function(snap){
      var docs = [];
      snap.forEach(function(d){ docs.push(d.ref); });
      var chain = Promise.resolve();
      for (var i = 0; i < docs.length; i += 400){
        (function(chunk){
          chain = chain.then(function(){
            var b = fbDb.batch();
            chunk.forEach(function(r){ b.delete(r); });
            return b.commit();
          });
        })(docs.slice(i, i + 400));
      }
      return chain;
    }).then(function(){ return ref.delete(); });
  }

  // Best-effort: remove public links (and the profile share) before the account goes away.
  function cleanupSharedDocs(){
    var jobs = (state.sharedLinks || []).map(function(l){
      return fbDb.collection('shared_collections').doc(l.code).delete().catch(function(){});
    });
    if (state.sharing && state.sharing.code) jobs.push(fbDb.collection('shared_profiles').doc(state.sharing.code).delete().catch(function(){}));
    return Promise.all(jobs);
  }

  // ---- 공유 · 그룹 tab ----
  function shareTabHtml(){
    var g = state.groups;
    var html = '<p class="section-title">공유 · 그룹</p>';
    if (g.active) return html + groupDetailHtml();

    html += '<p class="help-lead" style="font-size:16px;">승인·반려 자료함에서 자료를 골라 <b>공유 링크</b>를 만들거나 <b>그룹</b>(학급·동아리)에 넣을 수 있어요. 그룹은 코드를 아는 사람끼리만 쓰는 공간이에요.</p>';

    html += '<div class="acct-block"><div class="field" style="margin:0;max-width:340px;"><label>공유할 때 보일 내 이름</label>' +
      '<input type="text" id="share-myname" maxlength="30" placeholder="예: 유선웅" value="' + escapeHtml(state.displayName || '') + '"></div>' +
      '<p class="sm-hint" style="margin:8px 0 0;">그룹과 공유 링크에는 이메일 대신 이 이름만 표시돼요.</p></div>';

    html += '<p class="section-title" style="margin-top:28px;">내 그룹</p>';
    html += '<div class="acct-block"><div class="field-row">' +
      '<div class="field" style="margin:0;"><label>새 그룹 만들기</label><input type="text" id="grp-new-name" maxlength="40" placeholder="예: 1학년 3반 탐구반" value="' + escapeHtml(g.newName || '') + '"></div>' +
      '<div style="align-self:flex-end;"><button type="button" class="btn small" id="grp-create" ' + (g.busy ? 'disabled' : '') + '>만들기</button></div></div>' +
      '<div class="field-row" style="margin-top:14px;">' +
      '<div class="field" style="margin:0;"><label>참여 코드로 들어가기</label><input type="text" id="grp-join-code" placeholder="XXXX-XXXX-XXXX" value="' + escapeHtml(g.joinCode || '') + '"></div>' +
      '<div style="align-self:flex-end;"><button type="button" class="btn ghost small" id="grp-join" ' + (g.busy ? 'disabled' : '') + '>참여하기</button></div></div>' +
      (g.msg ? '<p class="acct-msg ' + g.msg.type + '" style="margin:12px 0 0;">' + escapeHtml(g.msg.text) + '</p>' : '') +
      '</div>';

    if (g.loading && !g.list){
      html += loadingHtml('그룹을 불러오는 중...');
    } else {
      if (g.err) html += '<p class="acct-msg err">' + escapeHtml(g.err) + '</p>';
      var list = g.list || [];
      if (!list.length){
        html += '<div class="empty" style="height:auto;padding:24px 16px;"><p>아직 참여한 그룹이 없어요. 위에서 만들거나, 친구에게 받은 코드로 들어가세요.</p></div>';
      } else {
        list.forEach(function(x){
          html += '<button type="button" class="grp-card" data-grp-open="' + escapeHtml(x.code) + '"><h4>' + escapeHtml(x.name) + '</h4>' +
            '<div class="meta2">멤버 ' + (x.memberUids || []).length + '명' + (x.ownerUid === state.user.uid ? ' · 내가 만든 그룹' : '') + '</div></button>';
        });
      }
      html += '<div style="margin:6px 0 0;"><button type="button" class="btn ghost small" id="grp-refresh">목록 새로고침</button></div>';
    }

    html += '<p class="section-title" style="margin-top:34px;">내 공유 링크 (' + state.sharedLinks.length + '개)</p>';
    if (!state.sharedLinks.length){
      html += '<div class="empty" style="height:auto;padding:24px 16px;"><p>아직 만든 링크가 없어요. 승인·반려 자료함에서 자료를 선택하고 "공유 링크 만들기"를 눌러보세요.</p></div>';
    } else {
      state.sharedLinks.forEach(function(l){
        html += '<div class="acct-block"><div style="font-family:var(--font-display);font-size:18px;margin-bottom:4px;">' + escapeHtml(l.title) + '</div>' +
          '<div class="meta2" style="font-size:13px;color:var(--cream-soft);margin-bottom:10px;">' + fmtDate(l.createdAt) + ' · 적절 ' + (l.approved || 0) + '개' + (l.rejected ? ' · 반려 ' + l.rejected + '개' : '') + '</div>' +
          '<div class="sm-actions" style="margin:0;"><button type="button" class="btn small" data-l-copy="' + escapeHtml(l.code) + '">링크 복사</button>' +
          '<a class="btn ghost small btn-link" href="' + escapeHtml(shareLinkUrl(l.code)) + '" target="_blank" rel="noopener noreferrer">열어 보기</a>' +
          '<button type="button" class="btn ghost small" data-l-del="' + escapeHtml(l.code) + '" style="border-color:var(--reject);color:var(--reject);">공유 중단</button></div></div>';
      });
    }
    return html;
  }

  function groupDetailHtml(){
    var g = state.groups;
    var grp = groupByCode(g.active);
    var html = '<div style="margin-bottom:6px;"><button type="button" class="opn-back" id="grp-back">← 그룹 목록으로</button></div>';
    if (!grp){
      return html + '<div class="empty" style="height:auto;padding:30px 20px;"><h3>그룹을 찾을 수 없어요</h3><p>삭제되었거나 이미 나간 그룹이에요.</p></div>' +
        (g.itemsLoading ? loadingHtml('불러오는 중...') : '');
    }
    var isOwner = grp.ownerUid === state.user.uid;
    var names = grp.memberNames || {};
    var members = (grp.memberUids || []).map(function(u){
      return '<span class="chip">' + escapeHtml(names[u] || '멤버') + (u === grp.ownerUid ? '<b>방장</b>' : '') + '</span>';
    }).join('');
    html += '<h2 class="opn-issue-title">' + escapeHtml(grp.name) + '</h2>' +
      '<div class="acct-block"><div class="acct-label">참여 코드</div>' +
      '<div style="font-family:var(--font-mono);font-size:24px;letter-spacing:0.12em;color:var(--gold);margin-bottom:10px;">' + fmtShareCode(grp.code) + '</div>' +
      '<div class="sm-actions" style="margin:0 0 12px;"><button type="button" class="btn ghost small" id="grp-copy-code">코드 복사</button></div>' +
      '<p class="sm-hint" style="margin:0 0 12px;">이 코드를 아는 로그인 사용자는 누구나 들어올 수 있어요. 같은 반·동아리 사람에게만 알려주세요.</p>' +
      '<div class="rej-chips" style="margin:0;">' + members + '</div></div>';

    html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">' +
      '<button type="button" class="btn ghost small" id="grp-reload">자료 새로고침</button>' +
      (isOwner
        ? '<button type="button" class="btn ghost small" id="grp-delete" style="border-color:var(--reject);color:var(--reject);">그룹 삭제</button>'
        : '<button type="button" class="btn ghost small" id="grp-leave" style="border-color:var(--reject);color:var(--reject);">그룹 나가기</button>') +
      '</div>';

    if (g.msg) html += '<p class="acct-msg ' + g.msg.type + '">' + escapeHtml(g.msg.text) + '</p>';
    if (g.itemsErr) html += '<p class="acct-msg err">' + escapeHtml(g.itemsErr) + '</p>';
    if (g.itemsLoading && !g.items) return html + loadingHtml('자료를 불러오는 중...');

    var all = g.items || [];
    if (!all.length){
      return html + '<div class="empty" style="height:auto;padding:26px 16px;"><h3>아직 넣은 자료가 없어요</h3><p>승인·반려 자료함에서 자료를 선택하고 "그룹에 넣기"를 눌러보세요.</p></div>';
    }
    var list = all.filter(function(x){ return g.filter === 'all' || x.status === g.filter; });
    html += '<div class="apv-controls">' + statusFilterHtml('grp-filter', g.filter, all) +
      '<button type="button" class="btn small" id="grp-scrap-all" ' + (list.length ? '' : 'disabled') + '>표시된 ' + list.length + '개 내 서고에 담기</button></div>';
    html += '<div class="apv-count">담은 자료는 내 서고의 <b>대기 목록</b>으로 들어가요. 내가 직접 카드 평가로 판단해 보세요.</div>';
    html += list.map(function(it){
      var mine = it.addedByUid === state.user.uid;
      var acts = '<button type="button" class="btn ghost small" data-g-scrap="' + escapeHtml(it.id) + '">내 서고에 담기</button>' +
        ((mine || isOwner) ? '<button type="button" class="btn ghost small" data-g-del="' + escapeHtml(it.id) + '">그룹에서 삭제</button>' : '');
      return sharedItemHtml(it, escapeHtml(it.addedByName) + ' 님이 넣음' + (it.addedAt ? ' · ' + fmtDate(it.addedAt) : ''), acts);
    }).join('');
    return html;
  }

  function attachShareHandlers(){
    // --- selection inside the vaults ---
    document.querySelectorAll('[data-sel]').forEach(function(cb){
      cb.addEventListener('change', function(){
        var id = cb.getAttribute('data-sel');
        if (cb.checked) state.sel[id] = true; else delete state.sel[id];
        var y = window.scrollY; render(); window.scrollTo(0, y);
      });
    });
    var selAll = document.getElementById('sel-all');
    if (selAll) selAll.addEventListener('change', function(){
      (state.selVisible || []).forEach(function(id){ if (selAll.checked) state.sel[id] = true; else delete state.sel[id]; });
      var y = window.scrollY; render(); window.scrollTo(0, y);
    });
    document.querySelectorAll('[data-share-open]').forEach(function(btn){
      btn.addEventListener('click', function(){ openShareModal(btn.getAttribute('data-share-open')); });
    });

    // --- share modal ---
    var sm = state.shareModal;
    if (sm){
      var closeModal = function(){ state.shareModal = null; render(); };
      var ov = document.getElementById('sm-overlay');
      if (ov) ov.addEventListener('mousedown', function(e){ if (e.target === ov && !sm.busy) closeModal(); });
      var bind = function(id, key, isCheck){
        var el = document.getElementById(id);
        if (el) el.addEventListener('input', function(){ sm[key] = isCheck ? el.checked : el.value; });
        if (el && isCheck) el.addEventListener('change', function(){ sm[key] = el.checked; });
      };
      bind('sm-title', 'title'); bind('sm-name', 'name'); bind('sm-note', 'withNote', true); bind('sm-newgroup', 'newGroup');
      var cancel = document.getElementById('sm-cancel'); if (cancel) cancel.addEventListener('click', closeModal);
      var close = document.getElementById('sm-close'); if (close) close.addEventListener('click', closeModal);
      var go = document.getElementById('sm-go');
      if (go) go.addEventListener('click', function(){ if (sm.kind === 'link') publishLink(); else addSelectedToGroup(); });
      var copy = document.getElementById('sm-copy');
      if (copy) copy.addEventListener('click', function(){ copyText(sm.result, '공유 링크를 복사했어요'); });
      var urlEl = document.getElementById('sm-url');
      if (urlEl) urlEl.addEventListener('focus', function(){ urlEl.select(); });
      document.querySelectorAll('input[name="sm-group"]').forEach(function(r){
        r.addEventListener('change', function(){ sm.pick = r.value; sm.msg = null; render(); var n = document.getElementById('sm-newgroup'); if (n) n.focus(); });
      });
      var vg = document.getElementById('sm-viewgroup');
      if (vg) vg.addEventListener('click', function(){
        var code = sm.result && sm.result.code;
        state.shareModal = null; state.tab = 'share'; state.sel = {};
        openGroup(code);
      });
    }

    // --- 공유 · 그룹 tab ---
    var g = state.groups;
    var myNameEl = document.getElementById('share-myname');
    if (myNameEl) myNameEl.addEventListener('change', function(){ state.displayName = myNameEl.value.trim().slice(0, 30); persistAppData(); showToast('이름을 저장했어요'); });
    var newName = document.getElementById('grp-new-name');
    if (newName) newName.addEventListener('input', function(){ g.newName = newName.value; });
    var joinCode = document.getElementById('grp-join-code');
    if (joinCode) joinCode.addEventListener('input', function(){ g.joinCode = joinCode.value; });
    var createBtn = document.getElementById('grp-create');
    if (createBtn) createBtn.addEventListener('click', function(){
      var name = (g.newName || '').trim();
      if (!name){ g.msg = { type: 'err', text: '그룹 이름을 입력해주세요.' }; render(); return; }
      g.busy = true; g.msg = null; render();
      createGroup(name, myName()).then(function(grp){
        g.busy = false; g.newName = ''; g.msg = null;
        openGroup(grp.code);
      }).catch(function(err){
        g.busy = false; g.msg = { type: 'err', text: shareRulesMsg(err, '그룹') }; render();
      });
    });
    var joinBtn = document.getElementById('grp-join');
    if (joinBtn) joinBtn.addEventListener('click', function(){
      g.busy = true; g.msg = null; render();
      joinGroup(g.joinCode).then(function(grp){
        g.busy = false; g.joinCode = ''; g.msg = null;
        openGroup(grp.code);
      }).catch(function(err){
        g.busy = false; g.msg = { type: 'err', text: shareRulesMsg(err, '그룹 참여') }; render();
      });
    });
    var refreshBtn = document.getElementById('grp-refresh');
    if (refreshBtn) refreshBtn.addEventListener('click', function(){ loadGroups(true); });
    document.querySelectorAll('[data-grp-open]').forEach(function(b){
      b.addEventListener('click', function(){ g.msg = null; openGroup(b.getAttribute('data-grp-open')); });
    });
    var backBtn = document.getElementById('grp-back');
    if (backBtn) backBtn.addEventListener('click', function(){ g.active = null; g.items = null; g.msg = null; render(); });
    var copyCode = document.getElementById('grp-copy-code');
    if (copyCode) copyCode.addEventListener('click', function(){ copyText(fmtShareCode(g.active), '참여 코드를 복사했어요'); });
    var reload = document.getElementById('grp-reload');
    if (reload) reload.addEventListener('click', function(){ g.msg = null; loadGroupItems(g.active); });
    var gFilter = document.getElementById('grp-filter');
    if (gFilter) gFilter.addEventListener('change', function(){ g.filter = gFilter.value; render(); });

    var leaveBtn = document.getElementById('grp-leave');
    if (leaveBtn) leaveBtn.addEventListener('click', function(){
      var grp = groupByCode(g.active); if (!grp) return;
      if (!confirm('"' + grp.name + '" 그룹에서 나갈까요? 내가 넣은 자료는 그룹에 남아 있어요.')) return;
      var upd = { memberUids: firebase.firestore.FieldValue.arrayRemove(state.user.uid) };
      upd['memberNames.' + state.user.uid] = firebase.firestore.FieldValue.delete();
      fbDb.collection('groups').doc(grp.code).update(upd).then(function(){
        g.list = (g.list || []).filter(function(x){ return x.code !== grp.code; });
        g.active = null; g.items = null; g.msg = { type: 'ok', text: '그룹에서 나갔어요.' };
        render();
      }).catch(function(err){ g.msg = { type: 'err', text: shareRulesMsg(err, '그룹') }; render(); });
    });
    var delBtn = document.getElementById('grp-delete');
    if (delBtn) delBtn.addEventListener('click', function(){
      var grp = groupByCode(g.active); if (!grp) return;
      if (!confirm('"' + grp.name + '" 그룹을 삭제할까요? 그룹에 들어 있는 모든 자료와 멤버 연결이 사라지고 되돌릴 수 없어요.')) return;
      g.msg = { type: 'ok', text: '삭제하는 중...' }; render();
      deleteGroupFully(grp.code).then(function(){
        g.list = (g.list || []).filter(function(x){ return x.code !== grp.code; });
        g.active = null; g.items = null; g.msg = { type: 'ok', text: '그룹을 삭제했어요.' };
        render();
      }).catch(function(err){ g.msg = { type: 'err', text: shareRulesMsg(err, '그룹') }; render(); });
    });
    document.querySelectorAll('[data-g-del]').forEach(function(b){
      b.addEventListener('click', function(){
        var id = b.getAttribute('data-g-del');
        if (!confirm('이 자료를 그룹에서 삭제할까요?')) return;
        fbDb.collection('groups').doc(g.active).collection('items').doc(id).delete().then(function(){
          g.items = (g.items || []).filter(function(x){ return x.id !== id; });
          showToast('그룹에서 삭제했어요');
        }).catch(function(err){ g.msg = { type: 'err', text: shareRulesMsg(err, '그룹') }; render(); });
      });
    });
    document.querySelectorAll('[data-g-scrap]').forEach(function(b){
      b.addEventListener('click', function(){
        var id = b.getAttribute('data-g-scrap');
        var it = (g.items || []).filter(function(x){ return x.id === id; })[0];
        var grp = groupByCode(g.active);
        if (it) scrapItems([it], grp ? grp.name : '');
      });
    });
    var scrapAll = document.getElementById('grp-scrap-all');
    if (scrapAll) scrapAll.addEventListener('click', function(){
      var list = (g.items || []).filter(function(x){ return g.filter === 'all' || x.status === g.filter; });
      var grp = groupByCode(g.active);
      scrapItems(list, grp ? grp.name : '');
    });

    // links
    document.querySelectorAll('[data-l-copy]').forEach(function(b){
      b.addEventListener('click', function(){ copyText(shareLinkUrl(b.getAttribute('data-l-copy')), '공유 링크를 복사했어요'); });
    });
    document.querySelectorAll('[data-l-del]').forEach(function(b){
      b.addEventListener('click', function(){
        var code = b.getAttribute('data-l-del');
        if (!confirm('이 공유 링크를 중단할까요? 링크를 가진 사람은 더 이상 볼 수 없어요.')) return;
        fbDb.collection('shared_collections').doc(code).delete().then(function(){
          state.sharedLinks = state.sharedLinks.filter(function(l){ return l.code !== code; });
          persistAppData();
          showToast('공유를 중단했어요');
          render();
        }).catch(function(err){ showToast('중단하지 못했어요: ' + shareRulesMsg(err, '공유 링크')); });
      });
    });
  }

  // ---- Compare tab ----
  function pickPair(pool){
    if (pool.length < 2) return null;
    var i = Math.floor(Math.random()*pool.length);
    var j;
    do { j = Math.floor(Math.random()*pool.length); } while (j===i);
    return [pool[i], pool[j]];
  }

  function compareTabHtml(approved){
    var c = state.compare;
    var fieldOptions = '<option value="all">전체 분야</option>' + Object.keys(FIELD_TREE).map(function(f){ return '<option value="'+f+'" '+(c.field===f?'selected':'')+'>'+f+'</option>'; }).join('');

    var pool = approved;
    if (c.mode === 'refine' && c.field !== 'all') pool = approved.filter(function(m){ return m.field===c.field; });
    else if (c.mode === 'refine') pool = approved;

    var html = '<p class="section-title">상대 비교 · 반복 정제</p>' +
      '<div class="compare-controls">' +
        '<div class="mode-toggle"><button data-mode="free" class="' + (c.mode==='free'?'active':'') + '">자유 비교</button><button data-mode="refine" class="' + (c.mode==='refine'?'active':'') + '">같은 분야 반복 정제</button></div>' +
        (c.mode==='refine' ? '<select id="cmp-field" class="field-inline" style="background:var(--paper);color:var(--ink);border:none;border-radius:3px;padding:8px 10px;">' + fieldOptions + '</select>' : '') +
        '<button class="btn ghost small" id="new-pair">새 비교 시작</button>' +
      '</div>';

    if (approved.length < 2){
      html += '<div class="empty"><h3>비교할 승인 자료가 부족합니다</h3><p>카드 평가에서 최소 2개 이상 자료를 적절로 분류해야 상대 비교가 가능해요.</p></div>';
      return html;
    }
    if (!c.a || !c.b){
      var pair = pickPair(pool.length>=2 ? pool : approved);
      if (!pair){
        html += '<div class="empty"><h3>선택한 분야에 비교할 자료가 2개 미만입니다</h3><p>다른 분야를 선택하거나 자유 비교를 이용해보세요.</p></div>';
        return html;
      }
      c.a = pair[0].id; c.b = pair[1].id; c.critAnswers = {}; c.overall = null;
    }
    var matA = state.materials.filter(function(m){ return m.id===c.a; })[0];
    var matB = state.materials.filter(function(m){ return m.id===c.b; })[0];
    if (!matA || !matB){ c.a=null; c.b=null; return compareTabHtml(approved); }

    html += '<div class="compare-pair">' +
      '<div class="compare-card"><span class="letter">A</span><h4>' + escapeHtml(matA.title) + '</h4><div class="meta2">' + escapeHtml(fieldLabel(matA)) + ' · ' + escapeHtml(matA.source||'') + '</div>' + moreLinkHtml(matA, 'inline-more') + '</div>' +
      '<div class="compare-card"><span class="letter">B</span><h4>' + escapeHtml(matB.title) + '</h4><div class="meta2">' + escapeHtml(fieldLabel(matB)) + ' · ' + escapeHtml(matB.source||'') + '</div>' + moreLinkHtml(matB, 'inline-more') + '</div>' +
    '</div>';

    CRITERIA.forEach(function(cr){
      var picked = c.critAnswers[cr.key];
      html += '<div class="crit-row"><div class="crit-label">' + cr.label + ' — 어느 자료가 더 높은가요?</div>' +
        '<div class="crit-choices">' +
          '<button data-crit="' + cr.key + '" data-choice="A" class="' + (picked==='A'?'picked':'') + '">A (' + matA.scores[cr.key] + ')</button>' +
          '<button data-crit="' + cr.key + '" data-choice="tie" class="tie-btn ' + (picked==='tie'?'picked':'') + '">비슷함</button>' +
          '<button data-crit="' + cr.key + '" data-choice="B" class="' + (picked==='B'?'picked':'') + '">B (' + matB.scores[cr.key] + ')</button>' +
        '</div></div>';
    });

    html += '<div class="overall-box"><div class="q">종합적으로 더 나은 자료는?</div><div class="overall-choices">' +
      '<button data-overall="A" class="' + (c.overall==='A'?'picked':'') + '">A: ' + escapeHtml(matA.title.slice(0,18)) + (matA.title.length>18?'…':'') + '</button>' +
      '<button data-overall="B" class="' + (c.overall==='B'?'picked':'') + '">B: ' + escapeHtml(matB.title.slice(0,18)) + (matB.title.length>18?'…':'') + '</button>' +
    '</div></div>';

    var answered = CRITERIA.every(function(cr){ return !!c.critAnswers[cr.key]; });
    html += '<button class="btn" id="submit-compare" ' + ((answered && c.overall) ? '' : 'disabled') + '>비교 완료하고 다음으로</button>';
    return html;
  }

  // ---- Profile tab ----
  // How well did the learned model predict the user's own decisions? Uses the
  // prediction stored at decision time (before learning from it), so this is an
  // honest out-of-sample number. Pure local math: no AI tokens.
  function accuracyStats(){
    var rows = state.materials.filter(function(m){
      return (m.status === 'approved' || m.status === 'rejected') && typeof m.predFit === 'number' && m.decidedAt && (m.predN || 0) >= 5;
    }).sort(function(a, b){ return a.decidedAt - b.decidedAt; });
    var n = rows.length;
    var isHit = function(m){ return (m.predFit >= 0.5) === (m.status === 'approved'); };
    var apv = rows.filter(function(m){ return m.status === 'approved'; }).length;
    var out = { n: n, hit: 0, acc: null, baseline: null, auc: null, recent: null, buckets: [], byField: [] };
    if (!n) return out;
    out.hit = rows.filter(isHit).length;
    out.acc = out.hit / n;
    out.baseline = Math.max(apv, n - apv) / n;
    var perField = {};
    rows.forEach(function(m){
      var f = perField[m.field] || (perField[m.field] = { field: m.field, n: 0, hit: 0 });
      f.n++; if (isHit(m)) f.hit++;
    });
    out.byField = Object.keys(perField).map(function(k){ return perField[k]; })
      .filter(function(f){ return f.n >= 5; }).sort(function(a, b){ return b.n - a.n; });
    var tail = rows.slice(-20);
    out.recent = tail.filter(isHit).length / tail.length;
    for (var i = 0; i + 10 <= n; i += 10){
      out.buckets.push(rows.slice(i, i + 10).filter(isHit).length / 10);
    }
    // rank accuracy (AUC): chance that an approved card was ranked above a rejected one
    var pos = rows.filter(function(m){ return m.status === 'approved'; }).slice(-150);
    var neg = rows.filter(function(m){ return m.status === 'rejected'; }).slice(-150);
    if (pos.length && neg.length){
      var win = 0;
      pos.forEach(function(a){ neg.forEach(function(b){ win += a.predFit > b.predFit ? 1 : (a.predFit === b.predFit ? 0.5 : 0); }); });
      out.auc = win / (pos.length * neg.length);
    }
    return out;
  }

  function accuracyBlockHtml(){
    var st = accuracyStats();
    var pct = function(x){ return Math.round(x * 100) + '%'; };
    var html = '<p class="section-title">AI 예측은 얼마나 맞았나</p>';
    if (st.n === 0){
      return html + '<p style="font-size:15px;color:var(--cream-soft);line-height:1.7;margin:0 0 26px;">카드를 평가할 때마다 "프로그램이 먼저 예측한 값"과 "내가 실제로 한 결정"을 비교해서 여기에 쌓아요. 학습이 5번 이상 쌓인 뒤의 카드부터 기록돼요. (AI 호출 없이 계산하니까 토큰이 들지 않아요)</p>';
    }
    html += '<div class="stat-grid">' +
      '<div class="stat-box"><div class="n">' + pct(st.acc) + '</div><div class="l">예측 적중률 (' + st.n + '장)</div></div>' +
      '<div class="stat-box"><div class="n">' + pct(st.baseline) + '</div><div class="l">그냥 다수 쪽 찍기</div></div>' +
      '<div class="stat-box"><div class="n">' + (st.auc === null ? '-' : pct(st.auc)) + '</div><div class="l">순위 적중률 (50%=찍기)</div></div>' +
      '<div class="stat-box"><div class="n">' + pct(st.recent) + '</div><div class="l">최근 ' + Math.min(20, st.n) + '장 적중률</div></div>' +
    '</div>';
    if (st.buckets.length >= 2){
      html += '<div class="acc-bars" aria-label="10장 단위 적중률 추세">' + st.buckets.map(function(v, i){
        return '<div class="acc-col"><div class="acc-bar" style="height:' + Math.max(4, Math.round(v * 56)) + 'px;"></div><span>' + Math.round(v * 100) + '</span><em>' + (i * 10 + 1) + '~' + (i * 10 + 10) + '</em></div>';
      }).join('') + '</div>';
    }
    if (st.byField.length >= 2){
      html += '<div style="margin:6px 0 4px;font-family:var(--font-mono);font-size:12.5px;color:var(--cream-soft);">분야별 적중률 (5장 이상)</div>' +
        st.byField.map(function(f){ return '<div class="dist-row"><span>' + escapeHtml(f.field) + '</span><span>' + pct(f.hit / f.n) + ' (' + f.n + '장)</span></div>'; }).join('');
    }
    var verdict;
    if (st.n < 20) verdict = '아직 ' + st.n + '장이라 표본이 적어요. 20장 이상 쌓이면 더 믿을 만해요.';
    else if (st.auc !== null && st.auc < 0.55) verdict = '아직 내 기준을 잘 못 맞히고 있어요. 점수 자체가 부정확하거나(AI가 제목만 보고 추정), 내 기준이 아직 일정하지 않을 수 있어요.';
    else if (st.acc <= st.baseline + 0.03) verdict = '적중률이 "다수 쪽 찍기"와 비슷해요. 순위 적중률이 50%보다 꽤 높다면 순서는 맞히고 있다는 뜻이에요.';
    else verdict = '다수 쪽으로 찍는 것보다 ' + Math.round((st.acc - st.baseline) * 100) + '%p 더 잘 맞히고 있어요. 분별 수집 결과를 참고할 만해요.';
    return html + '<p class="help-note" style="margin:10px 0 26px;">' + escapeHtml(verdict) + ' 이 값은 AI 점수가 틀린 경우까지 포함한 <b>실제 정확도</b>예요.</p>';
  }

  function profileTabHtml(approved, rejected, pending){
    var html = '<p class="section-title">학습 현황</p>';
    html += '<div class="stat-grid">' +
      '<div class="stat-box"><div class="n">' + state.materials.length + '</div><div class="l">전체 자료</div></div>' +
      '<div class="stat-box"><div class="n">' + approved.length + '</div><div class="l">승인</div></div>' +
      '<div class="stat-box"><div class="n">' + rejected.length + '</div><div class="l">반려</div></div>' +
      '<div class="stat-box"><div class="n">' + state.trained + '</div><div class="l">학습 횟수</div></div>' +
    '</div>';

    html += accuracyBlockHtml();

    html += '<p class="section-title">당신이 중요하게 여기는 기준</p>';
    var decidedByField = {};
    state.materials.forEach(function(m){ if ((m.status === 'approved' || m.status === 'rejected') && m.field) decidedByField[m.field] = (decidedByField[m.field] || 0) + 1; });
    var fieldsHere = Object.keys(decidedByField).sort(function(a, b){ return decidedByField[b] - decidedByField[a]; });
    if (state.profileField !== 'all' && !decidedByField[state.profileField]) state.profileField = 'all';
    var pf = state.profileField === 'all' ? null : state.profileField;
    var shown = pf ? weightsFor(pf) : state.weights;
    if (fieldsHere.length){
      html += '<div class="field" style="max-width:260px;"><select id="prof-field"><option value="all"' + (pf ? '' : ' selected') + '>전체 (모든 분야 합침)</option>' +
        fieldsHere.map(function(f){ return '<option value="' + escapeHtml(f) + '"' + (pf === f ? ' selected' : '') + '>' + escapeHtml(f) + ' (' + decidedByField[f] + '장)</option>'; }).join('') + '</select></div>';
      html += '<p class="sm-hint" style="margin:-6px 0 12px;">' + (pf
        ? '<b>' + escapeHtml(pf) + '</b> 분야에서의 내 기준이에요. <b>분야별</b> 표시가 붙은 기준(적절성·이해하기 쉬움·관심도·전문성·정보 충실도)은 분야마다 따로 배워요.'
        : '모든 분야를 합친 기준이에요. 분야를 고르면, 어려운 자료도 괜찮은 분야와 쉬운 게 좋은 분야처럼 분야마다 다른 취향을 볼 수 있어요.') + '</p>';
    }
    var maxAbs = Math.max.apply(null, CRITERIA.map(function(c){ return Math.abs(shown[c.key]||0); }).concat([0.001]));
    var sorted = CRITERIA.slice().sort(function(a,b){ return (shown[b.key]||0) - (shown[a.key]||0); });
    if (state.trained === 0){
      html += '<p style="font-size:15px;color:var(--cream-soft);">아직 학습된 데이터가 없어요. 카드 평가나 상대 비교를 진행하면 이곳에 당신의 기준이 나타납니다.</p>';
    } else {
      sorted.forEach(function(c){
        var w = shown[c.key]||0;
        var pct = Math.round(Math.abs(w)/maxAbs*100);
        var color = w >= 0 ? 'var(--approve)' : 'var(--reject)';
        html += '<div class="weight-row"><div class="wl"><span>' + c.label + (isTaste(c.key) ? ' <em class="taste-tag">분야별</em>' : '') + '</span><b>' + (w>=0?'+':'') + w.toFixed(2) + '</b></div>' +
          '<div class="weight-bar-bg"><div class="weight-bar" style="width:' + pct + '%;background:' + color + ';"></div></div></div>';
      });
    }

    if (rejected.length > 0){
      html += '<p class="section-title">반려 이유 분포</p>';
      var counts = {};
      rejected.filter(function(m){ return !pf || m.field === pf; }).forEach(function(m){ counts[m.rejectReason] = (counts[m.rejectReason]||0)+1; });
      Object.keys(counts).sort(function(a,b){ return counts[b]-counts[a]; }).forEach(function(k){
        html += '<div class="dist-row"><span>' + escapeHtml(k) + '</span><span>' + counts[k] + '건</span></div>';
      });
    }

    if (pending.length > 0 && state.trained > 0){
      html += '<p class="section-title">지금 눈여겨볼 대기 자료</p>';
      var ranked = pending.map(function(m){ return { m:m, fit: predictFit(m) }; }).sort(function(a,b){ return b.fit-a.fit; }).slice(0,5);
      ranked.forEach(function(r){
        html += '<div class="rec-item"><div class="t">' + escapeHtml(r.m.title) + '<span class="f">' + escapeHtml(fieldLabel(r.m)) + '</span></div><div class="pct">' + Math.round(r.fit*100) + '%</div></div>';
      });
    }

    html += shareBlockHtml();
    return html;
  }

  // ---- 점수 다시 매기기 + 기준 다시 학습 ----
  var MAX_RESCORE = 200;   // per run (10 AI calls): keeps token use and daily quota predictable
  function rescoreTargets(scope){
    var list = state.materials.filter(function(m){
      if (scope === 'old') return m.sv !== SCORE_VER;
      if (scope === 'all') return true;
      return m.status === scope;
    });
    var rank = function(m){ return m.status === 'pending' ? 1 : 0; };   // decided cards first: they feed the learning
    return list.sort(function(a, b){ return rank(a) - rank(b) || (a.createdAt || 0) - (b.createdAt || 0); });
  }
  function rescoreEstimate(n){
    var calls = Math.ceil(n / 20);
    return { calls: calls, tokens: calls * 600 + n * 180 };
  }

  // Replays every decision (oldest first) on a fresh model using the CURRENT scores.
  function retrainFromHistory(){
    var rows = state.materials.filter(function(m){ return m.status === 'approved' || m.status === 'rejected'; })
      .sort(function(a, b){ return (a.decidedAt || a.createdAt || 0) - (b.decidedAt || b.createdAt || 0); });
    state.weights = zeroWeights(); state.bias = 0; state.trained = 0; state.fieldModel = {};
    for (var ep = 0; ep < 2; ep++){
      rows.forEach(function(m){ trainStep(scoreVec(m), m.status === 'approved' ? 1 : 0, m.field); });
    }
    // report real decision counts (not passes)
    state.trained = rows.length;
    var perField = {};
    rows.forEach(function(m){ if (m.field) perField[m.field] = (perField[m.field] || 0) + 1; });
    Object.keys(state.fieldModel).forEach(function(f){ state.fieldModel[f].n = perField[f] || 0; });
    state.profileField = 'all';
    return rows.length;
  }

  async function runRescore(){
    var rs = state.rescore;
    if (rs.busy) return;
    var list = rescoreTargets(rs.scope).slice(0, MAX_RESCORE);
    if (!list.length) return;
    rs.busy = true; rs.done = 0; rs.total = list.length; rs.msg = null; render();
    // chunks of 20; a tiny remainder (<4) joins the previous chunk so the spread check still has enough items
    var chunks = [];
    for (var i = 0; i < list.length; i += 20) chunks.push(list.slice(i, i + 20));
    if (chunks.length > 1 && chunks[chunks.length - 1].length < 4){
      var tail = chunks.pop(); chunks[chunks.length - 1] = chunks[chunks.length - 1].concat(tail);
    }
    var applied = 0, failed = 0, stopErr = null, processed = 0;
    for (var c = 0; c < chunks.length; c++){
      var chunk = chunks[c];
      try {
        var res = await estimateScoresChunkGemini(chunk.map(function(m){ return { title: m.title, source: m.source, url: m.url, content: m.summary || null }; }));
        spreadScores(res);
        res.forEach(function(sc, j){
          if (sc){ chunk[j].scores = sc; chunk[j].sv = SCORE_VER; applied++; } else failed++;
        });
        saveMaterials();
        processed += chunk.length;
        rs.done = processed; render();
      } catch(e){
        stopErr = e; failed += chunk.length;
        for (var k = c + 1; k < chunks.length; k++) failed += chunks[k].length;
        break;
      }
    }
    var msg = applied + '개의 점수를 새로 매겼어요.';
    if (!stopErr && failed === 0 && rs.retrain){
      var n = retrainFromHistory();
      saveMaterials(); saveModel();
      msg += ' 새 점수로 내 기준을 다시 학습했어요 (평가한 ' + n + '장).';
    } else if (rs.retrain && (stopErr || failed)){
      msg += ' 일부만 끝나서 기준 다시 학습은 하지 않았어요. 나머지를 마친 뒤 아래 "내 기준 다시 학습"을 눌러주세요.';
    }
    if (stopErr) msg += ' 중간에 멈췄어요: ' + ((stopErr && stopErr.message) ? stopErr.message : '오류') + ' (한도 오류라면 시간이 지난 뒤 이어서 하면 돼요. 이미 끝난 자료는 다시 하지 않아요.)';
    else if (failed) msg += ' ' + failed + '개는 AI 응답을 받지 못했어요. 다시 실행하면 그 자료만 이어서 해요.';
    var left = rescoreTargets(rs.scope).length;
    if (rs.scope === 'old' && left > 0 && !stopErr && !failed) msg += ' 아직 ' + left + '개가 남았어요. 한 번에 최대 ' + MAX_RESCORE + '개씩 해요.';
    rs.busy = false; rs.msg = { type: (stopErr || failed) ? 'err' : 'ok', text: msg };
    render();
  }

  function rescoreBlockHtml(){
    var rs = state.rescore;
    var counts = {
      old: rescoreTargets('old').length, approved: rescoreTargets('approved').length,
      rejected: rescoreTargets('rejected').length, pending: rescoreTargets('pending').length, all: state.materials.length
    };
    var labels = { old: '예전 기준으로 매긴 자료', approved: '승인 자료 전부', rejected: '반려 자료 전부', pending: '대기 자료 전부', all: '모든 자료' };
    var opts = ['old', 'approved', 'rejected', 'pending', 'all'].map(function(k){
      return '<option value="' + k + '"' + (rs.scope === k ? ' selected' : '') + '>' + labels[k] + ' (' + counts[k] + '개)</option>';
    }).join('');
    var n = Math.min(MAX_RESCORE, counts[rs.scope]);
    var est = rescoreEstimate(n);
    var html = '<div class="acct-block"><div class="acct-label">점수 다시 매기기 (AI 사용)</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 12px;">예전에 높게 매겨졌던 점수를 지금의 채점 기준으로 다시 매겨요. <b style="color:var(--cream);">상대 비교로 조정했던 점수도 새 값으로 바뀌어요.</b></p>' +
      '<div class="field" style="max-width:340px;"><label>대상</label><select id="rs-scope"' + (rs.busy ? ' disabled' : '') + '>' + opts + '</select></div>' +
      '<div class="toggle-row"><input type="checkbox" id="rs-retrain" ' + (rs.retrain ? 'checked' : '') + (rs.busy ? ' disabled' : '') + '><label for="rs-retrain" style="margin:0;">끝나면 내 기준도 새 점수로 다시 학습하기</label></div>' +
      '<p class="sm-hint">' + (n ? n + '개 · AI 호출 약 ' + est.calls + '회 · 약 ' + Math.round(est.tokens / 1000) + '천 토큰' + (counts[rs.scope] > MAX_RESCORE ? ' (한 번에 최대 ' + MAX_RESCORE + '개, 남은 건 다시 실행)' : '') : '다시 매길 자료가 없어요.') + '</p>' +
      '<button class="btn small" id="rs-run" ' + ((rs.busy || !n) ? 'disabled' : '') + '>' + (rs.busy ? '다시 매기는 중... ' + rs.done + ' / ' + rs.total : '점수 다시 매기기') + '</button>' +
      (rs.msg ? '<p class="acct-msg ' + rs.msg.type + '" style="margin:12px 0 0;">' + escapeHtml(rs.msg.text) + '</p>' : '') +
      '</div>';
    html += '<div class="acct-block"><div class="acct-label">내 기준 다시 학습 (AI 사용 안 함)</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 12px;">지금까지 승인·반려한 기록을 처음부터 다시 배워서 내 기준(분야별 기준 포함)을 새로 계산해요. 점수를 직접 고치거나 다시 매긴 뒤에 쓰면 좋아요. 토큰이 들지 않아요. 상대 비교로 배운 부분은 다시 계산되지 않아요.</p>' +
      '<button class="btn ghost small" id="retrain-run">지금 점수로 다시 학습하기</button>' +
      (state.retrainMsg ? '<p class="acct-msg ok" style="margin:12px 0 0;">' + escapeHtml(state.retrainMsg) + '</p>' : '') +
      '</div>';
    return html;
  }

  function settingsTabHtml(){
    var html = '<p class="section-title">AI 연동</p>';
    html += '<div class="acct-block"><div class="acct-label">검색·채점 엔진</div>' +
      '<p style="font-size:14px;color:var(--cream-soft);margin:0 0 12px;">Tavily 검색은 별도 프록시 서버를 거쳐서 동작하고, Gemini 채점·요약은 이 사이트 전용으로 제한된 키를 통해 바로 동작해요. 둘 다 이 계정으로 로그인한 사람이라면 별도 키 등록 없이 바로 "키워드 자동 수집", "AI 자동 채점", "AI 요약"을 쓸 수 있어요.</p></div>';

    var au = (state.aiUsage && state.aiUsage.day === todayKey()) ? state.aiUsage : { calls: 0, tokens: 0, totalCalls: (state.aiUsage && state.aiUsage.totalCalls) || 0, totalTokens: (state.aiUsage && state.aiUsage.totalTokens) || 0 };
    var fmtTok = function(n){ return n >= 10000 ? (n / 1000).toFixed(0) + 'K' : String(n); };
    html += '<div class="acct-block"><div class="acct-label">AI 사용량 (토큰)</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 8px;">오늘 <b style="color:var(--cream);">' + au.calls + '회</b> 호출 · 약 <b style="color:var(--cream);">' + fmtTok(au.tokens) + '</b> 토큰 / 지금까지 ' + au.totalCalls + '회 · ' + fmtTok(au.totalTokens) + ' 토큰</p>' +
      limitLineHtml() +
      '<p class="sm-hint" style="margin:0;">토큰을 아끼도록 AI에는 짧은 요약만 보내고 점수는 숫자로만 받아요. 자주 반려한 출처는 AI에 묻지 않고 먼저 제외하고, 적중률 계산·카드 학습·상대 비교는 AI 없이 처리해요. 수집 개수를 필요한 만큼만 정하면 더 아낄 수 있어요.</p></div>';

    html += '<div class="acct-block"><div class="acct-label">AI 엔진</div><p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0;">사용하는 AI 모델과 연결은 관리자가 관리해요. 따로 설정할 건 없어요.' + (state.aiConfig && state.aiConfig.model ? ' (현재 모델: ' + escapeHtml(state.aiConfig.model) + ')' : '') + '</p></div>';

    var st = storageStats();
    var kb = function(b){ return b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + 'KB' : (b / 1048576).toFixed(1) + 'MB'; };
    html += '<p class="section-title">데이터 관리</p>' +
      '<div class="acct-block"><div class="acct-label">저장 용량</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0;">자료 <b style="color:var(--cream);">' + st.materials + '개</b> (약 ' + kb(st.matBytes) + ') · 의견 이슈 <b style="color:var(--cream);">' + st.issues + '개</b> (약 ' + kb(st.issueBytes) + ')<br>' +
      '데이터는 약 300KB씩 나눠(' + st.pages + '개 묶음) 저장해서, 예전의 "계정당 1MB" 한계 없이 수천 개의 자료를 담을 수 있어요.</p></div>' +
      rescoreBlockHtml() +
      '<button class="btn ghost small" id="reset-all">모든 데이터 초기화</button>';

    html += '<p class="section-title">계정 관리</p>';
    html += '<div style="font-size:14px;color:var(--cream-soft);margin-bottom:14px;">현재 로그인: <b style="color:var(--gold);">' + escapeHtml(state.user ? state.user.email : '') + '</b></div>';

    html += '<div class="acct-block"><div class="acct-label">이메일 변경</div>' +
      '<div class="field"><label>새 이메일</label><input type="text" id="acct-new-email" placeholder="new@example.com" /></div>' +
      '<div class="field"><label>현재 비밀번호 (확인용)</label><input type="password" id="acct-email-pw" /></div>' +
      (state.acctEmailMsg ? '<p class="acct-msg ' + state.acctEmailMsg.type + '">' + escapeHtml(state.acctEmailMsg.text) + '</p>' : '') +
      '<button class="btn ghost small" id="acct-email-submit" ' + (state.acctEmailLoading?'disabled':'') + '>' + (state.acctEmailLoading ? '처리 중...' : '이메일 변경하기') + '</button></div>';

    html += '<div class="acct-block"><div class="acct-label">비밀번호 변경</div>' +
      '<div class="field"><label>현재 비밀번호</label><input type="password" id="acct-cur-pw" /></div>' +
      '<div class="field"><label>새 비밀번호 (6자 이상)</label><input type="password" id="acct-new-pw" /></div>' +
      (state.acctPwMsg ? '<p class="acct-msg ' + state.acctPwMsg.type + '">' + escapeHtml(state.acctPwMsg.text) + '</p>' : '') +
      '<button class="btn ghost small" id="acct-pw-submit" ' + (state.acctPwLoading?'disabled':'') + '>' + (state.acctPwLoading ? '처리 중...' : '비밀번호 변경하기') + '</button></div>';

    html += '<div class="acct-block acct-danger"><div class="acct-label" style="color:var(--reject);">회원 탈퇴</div>' +
      '<p style="font-size:14px;color:var(--cream-soft);margin:0 0 10px;">계정과 함께 저장된 모든 자료·학습 데이터가 영구히 삭제됩니다.</p>' +
      '<div class="field"><label>현재 비밀번호</label><input type="password" id="acct-del-pw" /></div>' +
      (state.acctDeleteMsg ? '<p class="acct-msg ' + state.acctDeleteMsg.type + '">' + escapeHtml(state.acctDeleteMsg.text) + '</p>' : '') +
      '<button class="btn ghost small" id="acct-delete-submit" style="border-color:var(--reject);color:var(--reject);" ' + (state.acctDeleteLoading?'disabled':'') + '>' + (state.acctDeleteLoading ? '처리 중...' : '계정 영구 삭제') + '</button></div>';

    return html;
  }

  // ---------- event wiring ----------
  function goTab(t){
    if (state.tab !== t){ state.sel = {}; state.shareModal = null; }
    if (t === 'share'){ state.groups.active = null; state.groups.msg = null; }
    state.tab = t; state.menuOpen = false;
    render();
    if (t === 'share') loadGroups(false);
    if (t === 'admin' && state.isAdmin) adminEnter();
  }
  function attachHandlers(pending, approved, rejected){
    document.querySelectorAll('[data-goto]').forEach(function(btn){
      btn.addEventListener('click', function(){ goTab(btn.getAttribute('data-goto')); });
    });

    // hamburger drawer menu
    var menuToggleBtn = document.getElementById('menu-toggle-btn');
    if (menuToggleBtn) menuToggleBtn.addEventListener('click', function(){ state.menuOpen = true; render(); });
    var menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) menuOverlay.addEventListener('click', function(){ state.menuOpen = false; render(); });
    var menuCloseBtn = document.getElementById('menu-close-btn');
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', function(){ state.menuOpen = false; render(); });
    document.querySelectorAll('[data-menu-cat]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var key = btn.getAttribute('data-menu-cat');
        var open = state.menuExpanded[key] !== false;
        state.menuExpanded[key] = !open;
        render();
      });
    });
    document.querySelectorAll('[data-menu-tab]').forEach(function(btn){
      btn.addEventListener('click', function(){ goTab(btn.getAttribute('data-menu-tab')); });
    });

    // swipe
    var topCard = document.getElementById('top-card');
    if (topCard){
      var material = pending[0];
      var dragging = false, startX = 0, curX = 0;
      var stampA = document.getElementById('stamp-approve');
      var stampR = document.getElementById('stamp-reject');

      function pointerDown(e){
        if (e.target && e.target.closest && e.target.closest('[data-nodrag]')) return;
        dragging = true; startX = (e.touches? e.touches[0].clientX : e.clientX); curX = 0;
        topCard.style.transition = 'none';
      }
      function pointerMove(e){
        if (!dragging) return;
        var x = (e.touches? e.touches[0].clientX : e.clientX);
        curX = x - startX;
        topCard.style.transform = 'translateX(' + curX + 'px) rotate(' + (curX/18) + 'deg)';
        var prog = Math.min(1, Math.abs(curX)/110);
        if (curX > 0){ stampA.style.opacity = prog; stampR.style.opacity = 0; }
        else { stampR.style.opacity = prog; stampA.style.opacity = 0; }
      }
      function pointerUp(){
        if (!dragging) return;
        dragging = false;
        topCard.style.transition = 'transform .25s ease';
        if (curX > 110){
          topCard.style.transform = 'translateX(600px) rotate(20deg)';
          setTimeout(function(){ decideSwipe(material, true, null); }, 150);
        } else if (curX < -110){
          topCard.style.transform = 'translateX(-600px) rotate(-20deg)';
          setTimeout(function(){ state.pendingReject = material; render(); }, 150);
        } else {
          topCard.style.transform = 'translateX(0) rotate(0)';
          stampA.style.opacity = 0; stampR.style.opacity = 0;
        }
      }
      topCard.addEventListener('pointerdown', pointerDown);
      window.addEventListener('pointermove', pointerMove);
      window.addEventListener('pointerup', pointerUp);
      topCard._cleanup = function(){
        window.removeEventListener('pointermove', pointerMove);
        window.removeEventListener('pointerup', pointerUp);
      };
    }
    var btnApprove = document.getElementById('btn-approve');
    if (btnApprove) btnApprove.addEventListener('click', function(){ decideSwipe(pending[0], true, null); });
    var btnReject = document.getElementById('btn-reject');
    if (btnReject) btnReject.addEventListener('click', function(){ state.pendingReject = pending[0]; render(); });

    var summaryBtn = document.getElementById('summary-generate');
    if (summaryBtn) summaryBtn.addEventListener('click', function(){
      var matId = summaryBtn.getAttribute('data-material-id');
      var mat = pending.filter(function(m){ return m.id === matId; })[0];
      if (!mat) return;
      state.summaryTargetId = mat.id;
      state.summaryLoading = true;
      state.summaryError = null;
      render();
      var gs = state.geminiSettings;
      generateSummaryGemini(gs.model || 'gemini-2.5-flash', mat).then(function(text){
        mat.summary = text;
        saveMaterials();
        state.summaryLoading = false;
        render();
      }).catch(function(err){
        state.summaryLoading = false;
        state.summaryError = (err && err.message) ? err.message : '요약 생성에 실패했어요';
        render();
      });
    });

    // reason modal
    document.querySelectorAll('[data-reason]').forEach(function(btn){
      btn.addEventListener('click', function(){
        decideSwipe(state.pendingReject, false, btn.getAttribute('data-reason'));
      });
    });
    var reasonCancel = document.getElementById('reason-cancel');
    if (reasonCancel) reasonCancel.addEventListener('click', function(){ state.pendingReject = null; render(); });

    // add form
    var fField = document.getElementById('f-field');
    var fSubfield = document.getElementById('f-subfield');
    function refreshSubfields(){
      var subs = FIELD_TREE[fField.value] || [];
      fSubfield.innerHTML = '<option value="">해당 없음</option>' + subs.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join('');
    }
    if (fField){ refreshSubfields(); fField.addEventListener('change', refreshSubfields); }
    var fDetail = document.getElementById('f-score-mode');
    var sliderWrap = document.getElementById('slider-wrap');
    var aiScoreWrap = document.getElementById('ai-score-wrap');
    if (fDetail) fDetail.addEventListener('change', function(){
      sliderWrap.style.display = (fDetail.value === 'manual') ? 'grid' : 'none';
      aiScoreWrap.style.display = (fDetail.value === 'ai') ? 'block' : 'none';
    });
    document.querySelectorAll('[data-slider]').forEach(function(inp){
      inp.addEventListener('input', function(){
        document.querySelector('[data-val="' + inp.getAttribute('data-slider') + '"]').textContent = inp.value;
      });
    });
    var addBtn = document.getElementById('btn-add-material');
    if (addBtn) addBtn.addEventListener('click', function(){
      var title = document.getElementById('f-title').value.trim();
      if (!title){ showToast('제목을 입력해주세요'); return; }
      var field = fField.value;
      var subfield = fSubfield.value || null;
      var source = document.getElementById('f-source').value.trim();
      var urlVal = document.getElementById('f-url').value.trim();
      var mode = document.getElementById('f-score-mode').value;
      var addStatusEl = document.getElementById('add-status');

      function finalizeAdd(scores, suffix){
        var newMat = { id: uid(), title:title, field:field, subfield:subfield, source: source || '미상', url: urlVal || null, scores: scores, status:'pending', rejectReason:null, createdAt: Date.now() };
        if (suffix && suffix.indexOf('AI 채점 완료') !== -1) newMat.sv = SCORE_VER;
        state.materials.push(newMat);
        saveMaterials();
        showToast('자료가 추가되었어요.' + (suffix || '') + ' 카드 평가에서 만나보세요.');
        var titleEl = document.getElementById('f-title');
        if (titleEl){
          titleEl.value=''; document.getElementById('f-source').value=''; document.getElementById('f-url').value='';
        }
      }

      if (mode === 'ai'){
        var addEngine = document.getElementById('f-score-engine') ? document.getElementById('f-score-engine').value : 'gemini';
        addBtn.disabled = true; addBtn.textContent = 'AI가 점수를 매기는 중...';
        if (addStatusEl) addStatusEl.textContent = 'AI가 출처·내용을 바탕으로 점수를 판단하고 있어요...';
        estimateScoresBatch([{ title: title, source: source, url: urlVal }], addEngine).then(function(scoresList){
          var got = scoresList[0];
          var scores = got || (function(){ var s={}; CRITERIA.forEach(function(c){ s[c.key]=60; }); return s; })();
          finalizeAdd(scores, got ? ' (AI 채점 완료)' : ' (AI 응답을 적용하지 못해 기본 점수)');
        }).catch(function(err){
          showToast('AI 채점에 실패해서 기본 점수로 등록했어요: ' + (err && err.message ? err.message : '오류'));
          var scores = {}; CRITERIA.forEach(function(c){ scores[c.key] = 60; });
          finalizeAdd(scores);
        });
        return;
      }

      var scores = {};
      CRITERIA.forEach(function(c){
        var slider = document.querySelector('[data-slider="' + c.key + '"]');
        scores[c.key] = (mode === 'manual' && slider) ? parseInt(slider.value,10) : 60;
      });
      finalizeAdd(scores);
    });

    // home tab
    var homeFieldEl = document.getElementById('home-field');
    if (homeFieldEl) homeFieldEl.addEventListener('change', function(){ state.home.field = homeFieldEl.value; });
    var homeCountEl = document.getElementById('home-count');
    if (homeCountEl) homeCountEl.addEventListener('change', function(){ state.home.count = homeCountEl.value; });
    var homeKeywordEl = document.getElementById('home-keyword');
    if (homeKeywordEl) homeKeywordEl.addEventListener('change', function(){ state.home.keyword = homeKeywordEl.value; });

    var homeCollectBtn = document.getElementById('home-collect');
    if (homeCollectBtn) homeCollectBtn.addEventListener('click', function(){
      var countRaw = parseInt(document.getElementById('home-count').value, 10);
      var count = isNaN(countRaw) ? 5 : Math.max(1, Math.min(50, countRaw));
      var manualField = document.getElementById('home-field') ? document.getElementById('home-field').value : state.home.field;
      var keyword = document.getElementById('home-keyword') ? document.getElementById('home-keyword').value.trim() : (state.home.keyword || '');
      state.home.field = manualField;
      state.home.keyword = keyword;
      var brief = buildProfileBrief(approved, manualField);

      state.home.loading = true;
      state.home.statusMsg = keyword ? ('"' + keyword + '"와(과) 당신의 프로필을 함께 반영해서 찾고 있어요...') : '당신의 프로필에 맞는 자료를 찾고 있어요...';
      render();

      function finishSuccess(created, suffix){
        state.materials = state.materials.concat(created);
        saveMaterials();
        state.home.loading = false;
        state.home.lastAdded = created;
        state.home.statusMsg = created.length + '개 자료를 찾아서 카드 평가 목록에 추가했어요' + (suffix || '');
        render();
      }
      function finishError(err, hint){
        state.home.loading = false;
        state.home.statusMsg = '자료를 찾지 못했어요: ' + (err && err.message ? err.message : '알 수 없는 오류') + (hint ? ' (' + hint + ')' : '');
        render();
      }

      var aiScore = document.getElementById('home-ai-score') ? document.getElementById('home-ai-score').checked : false;
      var aiEngine = document.getElementById('home-ai-engine') ? document.getElementById('home-ai-engine').value : 'gemini';
      var query = buildTavilyQuery(brief, keyword);
      tavilyCollectWithBackfill(query, count, function(attempt){
        if (attempt > 1) state.home.statusMsg = '중복 제외하고 ' + count + '개를 채우기 위해 더 찾는 중... (' + attempt + '차 시도)';
      }).then(function(dedup){
        var created = dedup.items.map(function(it){
          var scores = {};
          CRITERIA.forEach(function(c){ scores[c.key] = 60; });
          var host = null;
          try { host = new URL(it.url).hostname.replace(/^www\./,''); } catch(e){ host = null; }
          return { id: uid(), title: it.title || query, field: brief.field || Object.keys(FIELD_TREE)[0], subfield: null, source: host || '미상', url: it.url || null, content: it.content || null, matchReason: null, scores: scores, status:'pending', rejectReason:null, createdAt: Date.now() };
        });
        if (created.length === 0){
          state.home.loading = false;
          state.home.statusMsg = dedup.skipped > 0 ? ('새로 찾은 자료가 모두 이미 등록된 자료였어요 (' + dedup.skipped + '개 중복 제외)') : '검색 결과가 없어요';
          render();
          return;
        }
        var dedupSuffix = dedup.skipped > 0 ? (' (중복 ' + dedup.skipped + '개 제외' + (dedup.shortBy > 0 ? ', 더 찾지 못해 ' + dedup.shortBy + '개 부족' : '') + ')') : '';
        if (!aiScore){
          created.forEach(function(m){ delete m.content; });
          finishSuccess(created, dedupSuffix);
          return;
        }
        state.home.statusMsg = 'AI가 ' + created.length + '개 자료의 점수를 판단하고 있어요...';
        render();
        estimateScoresBatch(created, aiEngine).then(function(scoresList){
          var suffix = applyAiScores(created, scoresList);
          created.forEach(function(m){ delete m.content; });
          finishSuccess(created, suffix + dedupSuffix);
        }).catch(function(err){
          created.forEach(function(m){ delete m.content; });
          showToast('AI 채점에 실패해서 기본 점수로 등록했어요: ' + (err && err.message ? err.message : '오류'));
          finishSuccess(created, dedupSuffix);
        });
      }).catch(function(err){ finishError(err, '네트워크 또는 키를 확인해주세요'); });
    });

    // bulk add tab
    document.querySelectorAll('[data-bulkmode]').forEach(function(btn){
      btn.addEventListener('click', function(){
        state.bulk.mode = btn.getAttribute('data-bulkmode'); render();
      });
    });
    var bulkAddBtn = document.getElementById('bulk-add-urls');
    if (bulkAddBtn) bulkAddBtn.addEventListener('click', function(){
      var field = document.getElementById('bulk-field').value;
      var text = document.getElementById('bulk-text').value;
      var aiScore = document.getElementById('bulk-ai-score') ? document.getElementById('bulk-ai-score').checked : false;
      var aiEngine = document.getElementById('bulk-ai-engine') ? document.getElementById('bulk-ai-engine').value : 'gemini';
      var created = parseBulkUrls(text, field);
      if (created.length === 0){ showToast('추가할 내용을 입력해주세요'); return; }
      var statusEl = document.getElementById('bulk-urls-status');

      function finalize(list, suffix){
        state.materials = state.materials.concat(list);
        saveMaterials();
        showToast(list.length + '개 자료가 추가되었어요' + (suffix || ''));
        render();
      }

      if (!aiScore){
        finalize(created);
        return;
      }
      bulkAddBtn.disabled = true; bulkAddBtn.textContent = 'AI가 점수를 매기는 중...';
      if (statusEl) statusEl.textContent = created.length + '개 자료의 점수를 AI가 판단하고 있어요...';
      estimateScoresBatch(created, aiEngine).then(function(scoresList){
        var suffix = applyAiScores(created, scoresList);
        finalize(created, suffix);
      }).catch(function(err){
        showToast('AI 채점에 실패해서 기본 점수로 등록했어요: ' + (err && err.message ? err.message : '오류'));
        finalize(created);
      });
    });
    var bulkGenBtn = document.getElementById('bulk-generate');
    if (bulkGenBtn) bulkGenBtn.addEventListener('click', function(){
      var field = document.getElementById('bulk-gen-field').value;
      var countRaw = parseInt(document.getElementById('bulk-gen-count').value, 10);
      var count = isNaN(countRaw) ? 5 : Math.max(1, Math.min(100, countRaw));
      var created = generateSampleMaterials(count, field);
      state.materials = state.materials.concat(created);
      saveMaterials();
      showToast(count + '개 샘플 자료가 생성되었어요');
      render();
    });
    var tavilyBtn = document.getElementById('tavily-collect');
    if (tavilyBtn) tavilyBtn.addEventListener('click', function(){
      var keyword = document.getElementById('tavily-kw').value.trim();
      var field = document.getElementById('tavily-field').value;
      var countRaw = parseInt(document.getElementById('tavily-count').value, 10);
      var count = isNaN(countRaw) ? 5 : Math.max(1, Math.min(50, countRaw));
      var aiScore = document.getElementById('tavily-ai-score') ? document.getElementById('tavily-ai-score').checked : false;
      var aiEngine = document.getElementById('tavily-ai-engine') ? document.getElementById('tavily-ai-engine').value : 'gemini';
      if (!keyword){ showToast('검색 키워드를 입력해주세요'); return; }
      var statusEl = document.getElementById('tavily-status');
      tavilyBtn.disabled = true; tavilyBtn.textContent = '검색 중...';
      if (statusEl) statusEl.textContent = 'Tavily에서 "' + keyword + '" 관련 자료를 찾고 있어요...';
      tavilyCollectWithBackfill(keyword, count, function(attempt){
        if (attempt > 1 && statusEl) statusEl.textContent = '중복 제외하고 ' + count + '개를 채우기 위해 더 찾는 중... (' + attempt + '차 시도)';
      }).then(function(dedup){
        var created = dedup.items.map(function(it){
          var scores = {};
          CRITERIA.forEach(function(c){ scores[c.key] = 60; });
          var host = null;
          try { host = new URL(it.url).hostname.replace(/^www\./,''); } catch(e){ host = null; }
          return { id: uid(), title: it.title || keyword, field: field, subfield: null, source: host || '미상', url: it.url || null, content: it.content || null, scores: scores, status:'pending', rejectReason:null, createdAt: Date.now() };
        });
        if (created.length === 0){
          showToast(dedup.skipped > 0 ? ('새로 찾은 자료가 모두 이미 등록된 자료였어요 (' + dedup.skipped + '개 중복 제외)') : '검색 결과가 없어요');
          render();
          return;
        }
        var dedupSuffix = dedup.skipped > 0 ? (' (중복 ' + dedup.skipped + '개 제외' + (dedup.shortBy > 0 ? ', 더 찾지 못해 ' + dedup.shortBy + '개 부족' : '') + ')') : '';

        function finalize(list, suffix){
          list.forEach(function(m){ delete m.content; });
          state.materials = state.materials.concat(list);
          saveMaterials();
          showToast(list.length + '개 자료를 Tavily로 가져왔어요' + (suffix || '') + dedupSuffix);
          render();
        }

        if (!aiScore){ finalize(created); return; }
        if (statusEl) statusEl.textContent = 'AI가 ' + created.length + '개 자료의 점수를 판단하고 있어요...';
        estimateScoresBatch(created, aiEngine).then(function(scoresList){
          var suffix = applyAiScores(created, scoresList);
          finalize(created, suffix);
        }).catch(function(err){
          showToast('AI 채점에 실패해서 기본 점수로 등록했어요: ' + (err && err.message ? err.message : '오류'));
          finalize(created);
        });
      }).catch(function(err){
        showToast('Tavily 검색에 실패했어요: ' + (err && err.message ? err.message : '네트워크 또는 키를 확인해주세요'));
        render();
      });
    });

    // bulk add tab: 분별 수집 (profile-based, AI-filtered; own or shared profile)
    var selSourceEl = document.getElementById('sel-source');
    if (selSourceEl) selSourceEl.addEventListener('change', function(){
      var s = state.bulk.sel;
      s.source = selSourceEl.value;
      s.statusMsg = null; s.lastAdded = [];
      if (s.source === 'self'){ render(); return; }
      delete s.sharedCache[s.source];
      render();
      var code = s.source;
      fetchSharedProfile(code).then(function(doc){
        s.sharedCache[code] = { doc: doc };
        render();
      }).catch(function(err){
        s.sharedCache[code] = { error: shareErrMsg(err) };
        render();
      });
    });
    var selRemoveBtn = document.getElementById('sel-remove-import');
    if (selRemoveBtn) selRemoveBtn.addEventListener('click', function(){
      var s = state.bulk.sel;
      var code = s.source;
      if (!code || code === 'self') return;
      state.importedProfiles = state.importedProfiles.filter(function(p){ return p.code !== code; });
      delete s.sharedCache[code];
      s.source = 'self';
      saveIssues();
      render();
    });
    var selImportBtn = document.getElementById('sel-import-btn');
    if (selImportBtn) selImportBtn.addEventListener('click', function(){
      var ui = state.shareUi;
      var code = normShareCode(document.getElementById('sel-import-code').value);
      if (code.length !== 12){ ui.importMsg = { type:'err', text:'공유 코드는 12자리예요. 다시 확인해주세요.' }; render(); return; }
      ui.importLoading = true; ui.importMsg = null; render();
      fetchSharedProfile(code).then(function(doc){
        ui.importLoading = false;
        if (doc.ownerUid === state.user.uid){
          ui.importMsg = { type:'err', text:'내가 만든 공유 코드예요. "내 성향 (이 계정)"을 고르면 돼요.' };
          render();
          return;
        }
        var label = doc.nickname || '이름 없는 성향';
        var existing = state.importedProfiles.filter(function(p){ return p.code === code; })[0];
        if (existing) existing.label = label;
        else state.importedProfiles.push({ code: code, label: label, addedAt: Date.now() });
        saveIssues();
        state.bulk.sel.source = code;
        state.bulk.sel.sharedCache[code] = { doc: doc };
        state.bulk.sel.statusMsg = null; state.bulk.sel.lastAdded = [];
        ui.importMsg = { type:'ok', text:'"' + label + '" 성향을 추가했어요. 아래에서 이 성향으로 수집할 수 있어요.' };
        render();
      }).catch(function(err){
        ui.importLoading = false;
        ui.importMsg = { type:'err', text: shareErrMsg(err) };
        render();
      });
    });

    var selCollectBtn = document.getElementById('sel-collect');
    if (selCollectBtn) selCollectBtn.addEventListener('click', function(){
      var s = state.bulk.sel;
      var countRaw = parseInt(document.getElementById('sel-count').value, 10);
      s.count = isNaN(countRaw) ? 10 : Math.max(1, Math.min(50, countRaw));
      s.keyword = document.getElementById('sel-kw').value.trim();
      s.field = document.getElementById('sel-field').value;
      s.strict = document.getElementById('sel-strict').value;

      s.loading = true; s.lastAdded = []; s.lastFits = {};
      s.statusMsg = s.source === 'self' ? '내 프로필에 맞는 자료를 찾고 있어요...' : '공유받은 성향의 최신 상태를 불러오는 중...';
      render();

      function runWith(profile){
        s.statusMsg = '"' + profile.label + '" 기준으로 자료를 찾고 있어요...';
        render();
        return selectiveCollect(profile, s, function(round, got, scanned){
          s.statusMsg = round + '차 검색 중... (지금까지 ' + got + '/' + s.count + '개 통과, 후보 ' + scanned + '개 확인)';
          render();
        }).then(function(res){
          s.loading = false;
          if (res.materials.length === 0){
            s.statusMsg = res.scanned === 0
              ? '새로 찾은 자료가 없어요 (검색 결과가 없거나 모두 이미 등록된 자료예요)'
              : '후보 ' + res.scanned + '개를 확인했지만 기준을 통과한 자료가 없어요. 엄격도를 낮추거나 키워드를 바꿔보세요.';
            render();
            return;
          }
          state.materials = state.materials.concat(res.materials);
          saveMaterials();
          s.lastAdded = res.materials;
          s.lastFits = res.fits;
          var msg = res.materials.length + '개를 골라서 카드 평가 목록에 추가했어요 (후보 ' + res.scanned + '개 중 ' + res.dropped + '개는 기준에 안 맞아 제외, ' + res.rounds + '차 검색' + (res.localSkipped ? ', 자주 반려한 출처 ' + res.localSkipped + '개는 AI 호출 없이 제외' : '') + ')';
          if (res.materials.length < s.count) msg += ' — 목표 ' + s.count + '개에는 ' + (s.count - res.materials.length) + '개 부족해요. 키워드를 바꾸거나 엄격도를 낮춰 다시 시도해보세요.';
          if (res.filterFailed) msg += ' (AI 필터링이 중간에 실패해서 그때까지 통과한 것만 담았어요)';
          s.statusMsg = msg;
          render();
        });
      }

      var start;
      if (s.source === 'self'){
        start = Promise.resolve(ownProfile(s.field));
      } else {
        var code = s.source;
        start = fetchSharedProfile(code).then(function(doc){
          s.sharedCache[code] = { doc: doc };
          var imp = state.importedProfiles.filter(function(p){ return p.code === code; })[0];
          return profileFromShared(doc, imp ? imp.label : doc.nickname);
        });
      }
      start.then(function(profile){
        if (!profile.hasData) throw new Error('이 성향은 아직 학습 데이터가 없어요.');
        return runWith(profile);
      }).catch(function(err){
        s.loading = false;
        s.statusMsg = '수집에 실패했어요: ' + shareErrMsg(err);
        render();
      });
    });

    // profile tab: 내 성향 공유하기
    function readShareInputs(){
      var nick = document.getElementById('share-nickname');
      var titles = document.getElementById('share-titles');
      state.sharing.nickname = nick ? nick.value.trim().slice(0, 30) : state.sharing.nickname;
      state.sharing.includeTitles = titles ? titles.checked : state.sharing.includeTitles;
    }
    var shareCreateBtn = document.getElementById('share-create');
    if (shareCreateBtn) shareCreateBtn.addEventListener('click', function(){
      var ui = state.shareUi;
      readShareInputs();
      state.sharing.code = genShareCode();
      ui.loading = true; ui.msg = null; render();
      publishSharedProfile().then(function(){
        ui.loading = false;
        ui.msg = { type:'ok', text:'공유 코드를 만들었어요. 코드를 알려주면 상대가 분별 수집에서 입력할 수 있어요.' };
        saveIssues();
        render();
      }).catch(function(err){
        state.sharing.code = null;
        ui.loading = false;
        ui.msg = { type:'err', text:'공유를 시작하지 못했어요: ' + shareErrMsg(err) };
        render();
      });
    });
    var shareUpdateBtn = document.getElementById('share-update');
    if (shareUpdateBtn) shareUpdateBtn.addEventListener('click', function(){
      var ui = state.shareUi;
      readShareInputs();
      ui.loading = true; ui.msg = null; render();
      publishSharedProfile().then(function(){
        ui.loading = false;
        ui.msg = { type:'ok', text:'공유 내용을 최신 상태로 갱신했어요.' };
        saveIssues();
        render();
      }).catch(function(err){
        ui.loading = false;
        ui.msg = { type:'err', text:'갱신하지 못했어요: ' + shareErrMsg(err) };
        render();
      });
    });
    var shareStopBtn = document.getElementById('share-stop');
    if (shareStopBtn) shareStopBtn.addEventListener('click', function(){
      if (!confirm('공유를 중단할까요? 이 코드를 가진 사람은 더 이상 내 성향을 쓸 수 없어요.')) return;
      var ui = state.shareUi;
      var code = state.sharing.code;
      ui.loading = true; ui.msg = null; render();
      fbDb.collection('shared_profiles').doc(code).delete().then(function(){
        state.sharing.code = null;
        ui.loading = false;
        ui.msg = { type:'ok', text:'공유를 중단했어요.' };
        saveIssues();
        render();
      }).catch(function(err){
        ui.loading = false;
        ui.msg = { type:'err', text:'공유를 중단하지 못했어요: ' + shareErrMsg(err) };
        render();
      });
    });
    var shareCopyBtn = document.getElementById('share-copy');
    if (shareCopyBtn) shareCopyBtn.addEventListener('click', function(){
      var text = fmtShareCode(state.sharing.code || '');
      if (navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(function(){ showToast('공유 코드를 복사했어요'); }, function(){ showToast('복사하지 못했어요. 코드를 직접 선택해서 복사해주세요.'); });
      } else {
        showToast('복사하지 못했어요. 코드를 직접 선택해서 복사해주세요.');
      }
    });


    // opinions tab
    var opnCreateBtn = document.getElementById('opn-create-issue');
    if (opnCreateBtn) opnCreateBtn.addEventListener('click', function(){
      var title = document.getElementById('opn-new-title').value.trim();
      if (!title){ showToast('이슈 제목을 입력해주세요'); return; }
      var context = document.getElementById('opn-new-context').value.trim();
      var issue = { id: uid(), title: title, context: context || null, createdAt: Date.now(), opinions: [], groups: [] };
      state.issues.push(issue);
      saveIssues();
      state.opinionsView.newTitle = ''; state.opinionsView.newContext = '';
      state.opinionsView.mode = 'detail';
      state.opinionsView.activeIssueId = issue.id;
      state.opinionsView.collectTopic = title;
      state.opinionsView.collectMsg = null;
      state.opinionsView.clusterMsg = null;
      render();
    });
    document.querySelectorAll('[data-opn-issue]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var issue = findIssue(btn.getAttribute('data-opn-issue'));
        if (!issue) return;
        state.opinionsView.mode = 'detail';
        state.opinionsView.activeIssueId = issue.id;
        state.opinionsView.collectTopic = issue.title;
        state.opinionsView.collectMsg = null;
        state.opinionsView.clusterMsg = null;
        render();
      });
    });
    var opnBackBtn = document.getElementById('opn-back');
    if (opnBackBtn) opnBackBtn.addEventListener('click', function(){
      state.opinionsView.mode = 'list';
      state.opinionsView.activeIssueId = null;
      render();
    });
    document.querySelectorAll('[data-opn-delete-issue]').forEach(function(btn){
      btn.addEventListener('click', function(){
        if (!confirm('이 이슈와 모아둔 의견을 전부 삭제할까요? 되돌릴 수 없어요.')) return;
        var id = btn.getAttribute('data-opn-delete-issue');
        state.issues = state.issues.filter(function(x){ return x.id !== id; });
        saveIssues();
        state.opinionsView.mode = 'list';
        state.opinionsView.activeIssueId = null;
        render();
      });
    });
    var opnCollectBtn = document.getElementById('opn-collect-btn');
    if (opnCollectBtn) opnCollectBtn.addEventListener('click', function(){
      var issue = findIssue(state.opinionsView.activeIssueId);
      if (!issue) return;
      var topic = document.getElementById('opn-collect-topic').value.trim() || issue.title;
      var countRaw = parseInt(document.getElementById('opn-collect-count').value, 10);
      var count = isNaN(countRaw) ? 6 : Math.max(2, Math.min(50, countRaw));
      state.opinionsView.collectTopic = topic;
      state.opinionsView.collectCount = count;
      state.opinionsView.collectLoading = true;
      state.opinionsView.collectMsg = '"' + topic + '" 관련 의견을 웹에서 찾고 있어요...';
      render();
      collectDiverseOpinions(issue, topic, count, function(angle){
        state.opinionsView.collectMsg = '"' + angle + '" 관점에서 찾는 중...';
        render();
      }).then(function(newOpinions){
        state.opinionsView.collectLoading = false;
        if (newOpinions.length === 0){
          state.opinionsView.collectMsg = '새로 찾은 의견이 없어요 (이미 모은 출처와 중복이거나 검색 결과가 없어요)';
        } else {
          issue.opinions = issue.opinions.concat(newOpinions);
          saveIssues();
          state.opinionsView.collectMsg = newOpinions.length + '개 의견을 찾아서 추가했어요';
        }
        render();
      }).catch(function(err){
        state.opinionsView.collectLoading = false;
        state.opinionsView.collectMsg = '수집에 실패했어요: ' + (err && err.message ? err.message : '오류');
        render();
      });
    });
    var opnManualAddBtn = document.getElementById('opn-manual-add-btn');
    if (opnManualAddBtn) opnManualAddBtn.addEventListener('click', function(){
      var issue = findIssue(state.opinionsView.activeIssueId);
      if (!issue) return;
      var text = document.getElementById('opn-manual-text').value.trim();
      if (!text){ showToast('의견 내용을 입력해주세요'); return; }
      var source = document.getElementById('opn-manual-source').value.trim() || '미상';
      var url = document.getElementById('opn-manual-url').value.trim() || null;
      issue.opinions.push({ id: uid(), text: text, source: source, url: url, via: 'manual', createdAt: Date.now() });
      saveIssues();
      showToast('의견이 추가되었어요');
      render();
    });
    document.querySelectorAll('[data-opn-del-opinion]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var issue = findIssue(state.opinionsView.activeIssueId);
        if (!issue) return;
        var oid = btn.getAttribute('data-opn-del-opinion');
        issue.opinions = issue.opinions.filter(function(o){ return o.id !== oid; });
        if (issue.groups && issue.groups.length){
          issue.groups = issue.groups.map(function(g){
            return { id: g.id, label: g.label, opinionIds: g.opinionIds.filter(function(id){ return id !== oid; }) };
          }).filter(function(g){ return g.opinionIds.length > 0; });
        }
        saveIssues();
        render();
      });
    });
    var opnClusterBtn = document.getElementById('opn-cluster-btn');
    if (opnClusterBtn) opnClusterBtn.addEventListener('click', function(){
      var issue = findIssue(state.opinionsView.activeIssueId);
      if (!issue) return;
      state.opinionsView.clusterLoading = true;
      state.opinionsView.clusterMsg = 'AI가 의견들을 보고 비슷한 입장끼리 묶는 중...';
      render();
      clusterOpinionsGemini(issue).then(function(groups){
        issue.groups = groups;
        saveIssues();
        state.opinionsView.clusterLoading = false;
        state.opinionsView.clusterMsg = groups.length + '개의 입장으로 분류했어요';
        render();
      }).catch(function(err){
        state.opinionsView.clusterLoading = false;
        state.opinionsView.clusterMsg = '분류에 실패했어요: ' + (err && err.message ? err.message : '오류');
        render();
      });
    });

    // rejected tab
    document.querySelectorAll('[data-restore]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var id = btn.getAttribute('data-restore');
        var mat = state.materials.filter(function(m){ return m.id===id; })[0];
        if (mat) restoreToPending(mat);
      });
    });
    var rejFilterEl = document.getElementById('rej-filter');
    if (rejFilterEl) rejFilterEl.addEventListener('change', function(){ state.rejFilter = rejFilterEl.value; render(); });

    attachShareHandlers();
    attachAdminHandlers();

    // update popup
    var updOk = document.getElementById('upd-ok');
    if (updOk) updOk.addEventListener('click', function(){ dismissUpdatePopup(false); });
    var updX = document.getElementById('upd-close-x');
    if (updX) updX.addEventListener('click', function(){ dismissUpdatePopup(false); });
    var updAll = document.getElementById('upd-all');
    if (updAll) updAll.addEventListener('click', function(){ dismissUpdatePopup(true); });
    if (!window.__updKeysBound){
      window.__updKeysBound = true;
      document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && state.updatePopup && !state.tutorialOpen) dismissUpdatePopup(false); });
    }

    // tutorial + help
    function tutGo(n){ state.tutorialStep = Math.max(0, Math.min(TUTORIAL_STEPS.length - 1, n)); render(); }
    function tutFinish(){
      state.tutorialOpen = false; state.tutorialDone = true; state.tutorialStep = 0;
      persistAppData();
      render();
    }
    var tutNext = document.getElementById('tut-next');
    if (tutNext) tutNext.addEventListener('click', function(){
      if (state.tutorialStep >= TUTORIAL_STEPS.length - 1) tutFinish(); else tutGo(state.tutorialStep + 1);
    });
    var tutPrev = document.getElementById('tut-prev');
    if (tutPrev) tutPrev.addEventListener('click', function(){ tutGo(state.tutorialStep - 1); });
    var tutSkip = document.getElementById('tut-skip');
    if (tutSkip) tutSkip.addEventListener('click', tutFinish);
    var tutSkipX = document.getElementById('tut-skip-x');
    if (tutSkipX) tutSkipX.addEventListener('click', tutFinish);
    document.querySelectorAll('[data-tut-step]').forEach(function(b){
      b.addEventListener('click', function(){ tutGo(parseInt(b.getAttribute('data-tut-step'), 10)); });
    });
    var helpReplay = document.getElementById('help-replay');
    if (helpReplay) helpReplay.addEventListener('click', function(){ state.tutorialStep = 0; state.tutorialOpen = true; render(); });
    if (!window.__tutKeysBound){
      window.__tutKeysBound = true;
      document.addEventListener('keydown', function(e){
        if (!state.tutorialOpen) return;
        if (e.key === 'Escape'){ state.tutorialOpen = false; state.tutorialDone = true; state.tutorialStep = 0; persistAppData(); render(); }
        else if (e.key === 'ArrowRight'){ if (state.tutorialStep < TUTORIAL_STEPS.length - 1){ state.tutorialStep++; render(); } }
        else if (e.key === 'ArrowLeft'){ if (state.tutorialStep > 0){ state.tutorialStep--; render(); } }
      });
    }

    // approved tab
    var apvQ = document.getElementById('apv-q');
    if (apvQ){
      var apvComposing = false;
      var apvApply = function(){
        state.apv.q = apvQ.value;
        var pos = apvQ.selectionStart;
        render();
        var el = document.getElementById('apv-q');
        if (el){ el.focus(); try { el.setSelectionRange(pos, pos); } catch(e){} }
      };
      apvQ.addEventListener('compositionstart', function(){ apvComposing = true; });
      apvQ.addEventListener('compositionend', function(){ apvComposing = false; apvApply(); });
      apvQ.addEventListener('input', function(e){ if (apvComposing || e.isComposing) return; apvApply(); });
    }
    var apvField = document.getElementById('apv-field');
    if (apvField) apvField.addEventListener('change', function(){ state.apv.field = apvField.value; render(); });
    var apvSort = document.getElementById('apv-sort');
    if (apvSort) apvSort.addEventListener('change', function(){ state.apv.sort = apvSort.value; render(); });
    document.querySelectorAll('[data-apv-note]').forEach(function(ta){
      ta.addEventListener('change', function(){
        var id = ta.getAttribute('data-apv-note');
        var mat = state.materials.filter(function(m){ return m.id===id; })[0];
        if (mat){ mat.note = ta.value.trim().slice(0, 1000); saveMaterials(); showToast('메모를 저장했어요'); }
      });
    });
    document.querySelectorAll('[data-apv-unapprove]').forEach(function(btn){
      btn.addEventListener('click', function(){
        var id = btn.getAttribute('data-apv-unapprove');
        var mat = state.materials.filter(function(m){ return m.id===id; })[0];
        if (mat){ restoreToPending(mat); showToast('대기 목록으로 되돌렸어요'); }
      });
    });

    // compare tab
    document.querySelectorAll('[data-mode]').forEach(function(btn){
      btn.addEventListener('click', function(){
        state.compare.mode = btn.getAttribute('data-mode');
        state.compare.a = null; state.compare.b = null;
        render();
      });
    });
    var cmpFieldEl = document.getElementById('cmp-field');
    if (cmpFieldEl) cmpFieldEl.addEventListener('change', function(){
      state.compare.field = cmpFieldEl.value; state.compare.a = null; state.compare.b = null; render();
    });
    var newPairBtn = document.getElementById('new-pair');
    if (newPairBtn) newPairBtn.addEventListener('click', function(){ state.compare.a = null; state.compare.b = null; render(); });
    document.querySelectorAll('[data-crit]').forEach(function(btn){
      btn.addEventListener('click', function(){
        state.compare.critAnswers[btn.getAttribute('data-crit')] = btn.getAttribute('data-choice');
        render();
      });
    });
    document.querySelectorAll('[data-overall]').forEach(function(btn){
      btn.addEventListener('click', function(){ state.compare.overall = btn.getAttribute('data-overall'); render(); });
    });
    var submitCompare = document.getElementById('submit-compare');
    if (submitCompare) submitCompare.addEventListener('click', function(){
      var c = state.compare;
      var matA = state.materials.filter(function(m){ return m.id===c.a; })[0];
      var matB = state.materials.filter(function(m){ return m.id===c.b; })[0];
      if (!matA || !matB) return;
      var diff = {};
      CRITERIA.forEach(function(cr){
        diff[cr.key] = ((matA.scores[cr.key]||0) - (matB.scores[cr.key]||0))/100;
        var choice = c.critAnswers[cr.key];
        if (choice === 'A'){ matA.scores[cr.key] = Math.min(100, matA.scores[cr.key]+4); matB.scores[cr.key] = Math.max(0, matB.scores[cr.key]-4); }
        else if (choice === 'B'){ matB.scores[cr.key] = Math.min(100, matB.scores[cr.key]+4); matA.scores[cr.key] = Math.max(0, matA.scores[cr.key]-4); }
      });
      trainStep(diff, c.overall === 'A' ? 1 : 0, matA.field && matA.field === matB.field ? matA.field : null, true);
      saveMaterials(); saveModel();
      showToast('비교 결과가 반영되었어요');
      c.a = null; c.b = null; c.critAnswers = {}; c.overall = null;
      render();
    });

    var rsScope = document.getElementById('rs-scope');
    if (rsScope) rsScope.addEventListener('change', function(){ state.rescore.scope = rsScope.value; state.rescore.msg = null; render(); });
    var rsRetrain = document.getElementById('rs-retrain');
    if (rsRetrain) rsRetrain.addEventListener('change', function(){ state.rescore.retrain = rsRetrain.checked; });
    var rsRun = document.getElementById('rs-run');
    if (rsRun) rsRun.addEventListener('click', function(){
      var n = Math.min(MAX_RESCORE, rescoreTargets(state.rescore.scope).length);
      var est = rescoreEstimate(n);
      if (!confirm(n + '개 자료의 점수를 AI가 다시 매겨요 (AI 호출 약 ' + est.calls + '회).\n이전 점수(상대 비교로 조정한 값 포함)는 새 값으로 바뀌어요. 계속할까요?')) return;
      runRescore();
    });
    var retrainRun = document.getElementById('retrain-run');
    if (retrainRun) retrainRun.addEventListener('click', function(){
      if (!confirm('내 기준을 지금까지의 승인·반려 기록으로 처음부터 다시 계산할까요? 상대 비교로 배운 부분은 다시 계산되지 않아요.')) return;
      var n = retrainFromHistory();
      saveMaterials(); saveModel();
      state.retrainMsg = '평가한 ' + n + '장으로 내 기준을 다시 학습했어요.';
      render();
    });

    var profField = document.getElementById('prof-field');
    if (profField) profField.addEventListener('change', function(){ state.profileField = profField.value; render(); });

    // profile
    var resetBtn = document.getElementById('reset-all');
    if (resetBtn) resetBtn.addEventListener('click', function(){
      if (!confirm('모든 자료와 학습 데이터를 초기화할까요? 이 작업은 되돌릴 수 없습니다.')) return;
      state.materials = seedMaterials();
      state.weights = zeroWeights(); state.bias = 0; state.trained = 0; state.fieldModel = {};
      state.issues = [];
      state.opinionsView.mode = 'list'; state.opinionsView.activeIssueId = null;
      saveMaterials(); saveModel(); saveIssues();
      state.tab = 'swipe';
      render();
    });

    // account management
    function reauthenticate(currentPassword){
      var cred = firebase.auth.EmailAuthProvider.credential(state.user.email, currentPassword);
      return fbAuth.currentUser.reauthenticateWithCredential(cred);
    }

    var acctEmailBtn = document.getElementById('acct-email-submit');
    if (acctEmailBtn) acctEmailBtn.addEventListener('click', function(){
      var newEmail = document.getElementById('acct-new-email').value.trim();
      var pw = document.getElementById('acct-email-pw').value;
      if (!newEmail || !pw){ state.acctEmailMsg = { type:'err', text:'새 이메일과 현재 비밀번호를 입력해주세요' }; render(); return; }
      state.acctEmailLoading = true; state.acctEmailMsg = null; render();
      reauthenticate(pw).then(function(){
        return fbAuth.currentUser.updateEmail(newEmail);
      }).then(function(){
        state.user.email = newEmail;
        state.acctEmailLoading = false;
        state.acctEmailMsg = { type:'ok', text:'이메일이 변경됐어요' };
        render();
      }).catch(function(err){
        state.acctEmailLoading = false;
        state.acctEmailMsg = { type:'err', text: mapAuthError(err) };
        render();
      });
    });

    var acctPwBtn = document.getElementById('acct-pw-submit');
    if (acctPwBtn) acctPwBtn.addEventListener('click', function(){
      var curPw = document.getElementById('acct-cur-pw').value;
      var newPw = document.getElementById('acct-new-pw').value;
      if (!curPw || !newPw){ state.acctPwMsg = { type:'err', text:'현재 비밀번호와 새 비밀번호를 입력해주세요' }; render(); return; }
      if (newPw.length < 6){ state.acctPwMsg = { type:'err', text:'새 비밀번호는 6자 이상이어야 해요' }; render(); return; }
      state.acctPwLoading = true; state.acctPwMsg = null; render();
      reauthenticate(curPw).then(function(){
        return fbAuth.currentUser.updatePassword(newPw);
      }).then(function(){
        state.acctPwLoading = false;
        state.acctPwMsg = { type:'ok', text:'비밀번호가 변경됐어요' };
        render();
      }).catch(function(err){
        state.acctPwLoading = false;
        state.acctPwMsg = { type:'err', text: mapAuthError(err) };
        render();
      });
    });

    var acctDeleteBtn = document.getElementById('acct-delete-submit');
    if (acctDeleteBtn) acctDeleteBtn.addEventListener('click', function(){
      var pw = document.getElementById('acct-del-pw').value;
      if (!pw){ state.acctDeleteMsg = { type:'err', text:'현재 비밀번호를 입력해주세요' }; render(); return; }
      if (!confirm('정말 계정을 삭제할까요? 저장된 모든 자료와 학습 데이터가 영구히 사라지고 되돌릴 수 없습니다.')) return;
      state.acctDeleteLoading = true; state.acctDeleteMsg = null; render();
      var uidToDelete = state.user.uid;
      reauthenticate(pw).then(function(){
        return cleanupSharedDocs();
      }).then(function(){
        return fbDb.collection('user_index').doc(uidToDelete).delete().catch(function(){});
      }).then(function(){
        return fbDb.collection('users').doc(uidToDelete).collection('store').get();
      }).then(function(snap){
        var batch = fbDb.batch();
        snap.forEach(function(doc){ batch.delete(doc.ref); });
        return batch.commit();
      }).then(function(){
        return fbAuth.currentUser.delete();
      }).then(function(){
        // onAuthStateChanged fires with null user and returns to the login screen
      }).catch(function(err){
        state.acctDeleteLoading = false;
        state.acctDeleteMsg = { type:'err', text: mapAuthError(err) };
        render();
      });
    });
  }

  function bootstrap(){
    if (typeof firebase === 'undefined'){
      FIREBASE_READY = false;
      state.authChecked = true;
      render();
      return;
    }
    try {
      firebase.initializeApp(firebaseConfig);
      fbAuth = firebase.auth();
      fbDb = firebase.firestore();
      FIREBASE_READY = true;
    } catch(e){
      FIREBASE_READY = false;
      state.authChecked = true;
      render();
      return;
    }
    var viewerCode = '';
    try { viewerCode = normShareCode(new URLSearchParams(location.search).get('s')); } catch(e){ viewerCode = ''; }
    if (viewerCode){
      // public read-only page: no login, no auth listener
      state.viewer = { code: viewerCode, loading: true, err: null, data: null, filter: 'all' };
      state.authChecked = true;
      render();
      loadViewer();
      return;
    }
    fbAuth.onAuthStateChanged(function(user){
      state.authChecked = true;
      savingInFlight = false;
      saveDirty = false;
      pageCache = {};
      currentSavePromise = Promise.resolve();
      stopAnnouncementWatch();
      state.aiConfig = null; state.admin.aiForm = null; state.admin.aiModels = null;
      state.isAdmin = false; state.announcement = null; state.annPopup = null; state.limits = { def: null, mine: null };
      state.admin.users = null; state.admin.detail = null; state.admin.groups = null; state.admin.links = null; state.admin.msg = null; state.admin.sub = 'stats';
      if (user){
        state.user = { uid: user.uid, email: user.email };
        state.authError = null;
        var isNewUser = false;
        try {
          isNewUser = !!(user.metadata && user.metadata.creationTime === user.metadata.lastSignInTime);
        } catch(e){ isNewUser = false; }
        loadState(isNewUser);
      } else {
        state.user = null;
        state.loaded = false;
        state.materials = [];
        state.acctEmailMsg = null; state.acctPwMsg = null; state.acctDeleteMsg = null;
        state.acctEmailLoading = false; state.acctPwLoading = false; state.acctDeleteLoading = false;
        render();
      }
    });
  }

  // ---- 관리자 모드 / 공지 / AI 한도 ----
  // Security lives in the Firestore rules (admins/{uid} must exist); the UI here only
  // reflects it. AI limits are enforced in this browser, so they are a soft limit.
  function adminFmt(ts){
    if (!ts) return '-';
    var d = new Date(ts);
    return (d.getMonth() + 1) + '/' + d.getDate() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
  }
  function adminErrMsg(err){
    if (err && err.code === 'permission-denied') return '권한이 없어요. Firestore 규칙과 관리자 등록(admins 문서)을 확인해주세요.';
    return (err && err.message) || '오류가 났어요.';
  }
  function userLabel(u){ return (u.name && String(u.name).trim()) ? String(u.name).trim() : ('이름 없음 · ' + String(u.id || '').slice(0, 6)); }
  function usageToday(u){ var x = u && u.usage; return (x && x.day === todayKey()) ? x : { calls: 0, tokens: 0, t: 0, q: 0 }; }
  function usageMonth(u){ var x = u && u.usage; return (x && x.mon === todayKey().slice(0, 7)) ? x : { mc: 0, mk: 0, mt: 0 }; }
  // one number set per user for the selected period: g = AI calls, t = Tavily calls, k = tokens
  function periodUsage(u, period){
    var x = (u && u.usage) || {};
    if (period === 'month'){ var m = usageMonth(u); return { g: m.mc || 0, t: m.mt || 0, k: m.mk || 0 }; }
    if (period === 'all') return { g: x.totalCalls || 0, t: x.totalT || 0, k: x.totalTokens || 0 };
    var d = usageToday(u); return { g: d.calls || 0, t: d.t || 0, k: d.tokens || 0 };
  }
  var C_G = 'var(--gold)', C_T = '#5FB3A1';
  function barHtml(val, max, color){
    var w = max > 0 ? Math.max(val > 0 ? 2 : 0, Math.round(val / max * 100)) : 0;
    return '<div style="height:10px;background:rgba(243,238,223,0.08);border-radius:3px;overflow:hidden;"><div style="height:100%;width:' + w + '%;background:' + color + ';"></div></div>';
  }
  function remainHtml(label, used, cap, color, note){
    if (!cap) return '<div style="margin-bottom:14px;"><b>' + label + '</b> <span class="sm-hint">' + used + '회 사용 · ' + note + '</span></div>';
    var left = Math.max(0, cap - used), pct = Math.min(100, Math.round(used / cap * 100));
    var warn = pct >= 90 ? 'var(--reject)' : color;
    return '<div style="margin-bottom:16px;"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:5px;"><b>' + label + '</b>' +
      '<span>남은 <b style="color:' + (pct >= 90 ? 'var(--reject)' : 'var(--cream)') + ';">' + left + '회</b> <span style="color:var(--cream-soft);">(' + used + ' / ' + cap + '회, ' + pct + '%)</span></span></div>' +
      '<div style="height:12px;background:rgba(243,238,223,0.08);border-radius:4px;overflow:hidden;"><div style="height:100%;width:' + pct + '%;background:' + warn + ';"></div></div></div>';
  }

  function effectiveDailyLimit(){
    var mine = state.limits.mine || {};
    if (typeof mine.dailyCalls === 'number' && mine.dailyCalls >= 0) return mine.dailyCalls;
    var d = state.limits.def || {};
    return (typeof d.dailyCalls === 'number' && d.dailyCalls > 0) ? d.dailyCalls : null;
  }
  function effectiveDailyTavily(){
    var mine = state.limits.mine || {};
    if (typeof mine.dailyTavily === 'number' && mine.dailyTavily >= 0) return mine.dailyTavily;
    var d = state.limits.def || {};
    return (typeof d.dailyTavily === 'number' && d.dailyTavily > 0) ? d.dailyTavily : null;
  }
  function tavilyLimitReason(){
    if (state.isAdmin) return null;
    var mine = state.limits.mine || {};
    if (mine.blocked) return '관리자가 이 계정의 AI·검색 사용을 잠시 막아 두었어요.';
    var lim = effectiveDailyTavily();
    if (lim === null) return null;
    var u = state.aiUsage;
    var used = (u && u.day === todayKey()) ? (u.tcalls || 0) : 0;
    if (used >= lim) return '오늘 검색 사용 한도(' + lim + '회)에 도달했어요. 내일 다시 쓸 수 있어요.';
    return null;
  }
  function aiLimitReason(){
    if (state.isAdmin) return null;
    var mine = state.limits.mine || {};
    if (mine.blocked) return '관리자가 이 계정의 AI 사용을 잠시 막아 두었어요.';
    var lim = effectiveDailyLimit();
    if (lim === null) return null;
    var u = state.aiUsage;
    var used = (u && u.day === todayKey()) ? u.calls : 0;
    if (used >= lim) return '오늘 AI 사용 한도(' + lim + '회)에 도달했어요. 내일 다시 쓸 수 있어요.';
    return null;
  }
  function limitLineHtml(){
    if (state.isAdmin) return '<p class="sm-hint" style="margin:0 0 8px;">관리자 계정은 AI 사용 한도가 적용되지 않아요.</p>';
    var mine = state.limits.mine || {};
    if (mine.blocked) return '<p class="sm-hint" style="margin:0 0 8px;color:var(--reject);">관리자가 이 계정의 AI 사용을 잠시 막아 두었어요.</p>';
    var lim = effectiveDailyLimit(), tl = effectiveDailyTavily();
    var u = state.aiUsage, today = (u && u.day === todayKey());
    var out = '';
    if (lim !== null) out += '<p class="sm-hint" style="margin:0 0 8px;">관리자가 정한 하루 AI 한도: <b>' + lim + '회</b> · 오늘 남은 횟수 <b>' + Math.max(0, lim - (today ? u.calls : 0)) + '회</b></p>';
    if (tl !== null) out += '<p class="sm-hint" style="margin:0 0 8px;">관리자가 정한 하루 검색 한도: <b>' + tl + '회</b> · 오늘 남은 횟수 <b>' + Math.max(0, tl - (today ? (u.tcalls || 0) : 0)) + '회</b></p>';
    return out;
  }

  var userIndexAt = 0, userIndexTimer = null;
  // Counts only (no titles, no email): lets the admin see who is using the app and how much.
  function touchUserIndex(force){
    if (!state.user || !state.loaded || typeof fbDb === 'undefined' || !fbDb) return;
    var now = Date.now();
    if (!force && now - userIndexAt < 60000){
      if (!userIndexTimer) userIndexTimer = setTimeout(function(){ userIndexTimer = null; touchUserIndex(true); }, 60000 - (now - userIndexAt) + 500);
      return;
    }
    userIndexAt = now;
    var a = 0, r = 0, pn = 0;
    state.materials.forEach(function(m){ if (m.status === 'approved') a++; else if (m.status === 'rejected') r++; else pn++; });
    var u = state.aiUsage || {};
    var doc = {
      name: (state.displayName || '').slice(0, 30),
      counts: { a: a, r: r, p: pn }, total: state.materials.length,
      usage: { day: u.day || null, calls: u.calls || 0, tokens: u.tokens || 0, t: u.tcalls || 0, q: u.q || 0,
               mon: u.mon || null, mc: u.mc || 0, mk: u.mk || 0, mt: u.mt || 0,
               totalCalls: u.totalCalls || 0, totalTokens: u.totalTokens || 0, totalT: u.totalT || 0,
               hist: Array.isArray(u.hist) ? u.hist.slice(-7) : [] },
      links: (state.sharedLinks || []).length, ver: APP_VERSION, lastSeen: now
    };
    try { fbDb.collection('user_index').doc(state.user.uid).set(doc).catch(function(){}); } catch(e){}
  }

  var flagsAt = 0;
  // Live: an urgent announcement pops up right away for people who are already using the app;
  // a normal one just waits for their next visit.
  var annUnsub = null, annFirst = true;
  function stopAnnouncementWatch(){ if (annUnsub){ try { annUnsub(); } catch(e){} annUnsub = null; } annFirst = true; }
  function handleAnnouncement(a, initial){
    state.announcement = a || null;
    var show = !!(a && a.active && a.id && a.id !== state.seenAnnouncement && (initial || a.level === 'urgent'));
    if (show){ state.annPopup = a; render(); }
    else if (!initial && (state.tab === 'updates' || state.tab === 'admin')) render();
  }
  function watchAnnouncement(){
    var ref = fbDb.collection('config').doc('announcement');
    if (typeof ref.onSnapshot !== 'function'){
      return ref.get().then(function(sn){ state.announcement = sn.exists ? sn.data() : null; }).catch(function(){});
    }
    if (annUnsub) return Promise.resolve();
    return new Promise(function(resolve){
      var first = true;
      try {
        annUnsub = ref.onSnapshot(function(sn){
          var init = first; first = false;
          if (init){ state.announcement = sn.exists ? sn.data() : null; resolve(); }
          else handleAnnouncement(sn.exists ? sn.data() : null, false);
        }, function(){ resolve(); });
      } catch(e){ resolve(); }
    });
  }
  function loadAccessFlags(){
    if (!state.user) return Promise.resolve();
    var uid0 = state.user.uid;
    flagsAt = Date.now();
    var jobs = [
      fbDb.collection('admins').doc(uid0).get().then(function(sn){ state.isAdmin = !!sn.exists; }).catch(function(){}),
      watchAnnouncement(),
      fbDb.collection('config').doc('ai').get().then(function(sn){ state.aiConfig = sn.exists ? sn.data() : null; }).catch(function(){}),
      fbDb.collection('config').doc('limits').get().then(function(sn){ state.limits.def = sn.exists ? sn.data() : null; }).catch(function(){}),
      fbDb.collection('user_limits').doc(uid0).get().then(function(sn){ state.limits.mine = sn.exists ? sn.data() : null; }).catch(function(){})
    ];
    return Promise.all(jobs).then(function(){
      if (!state.user || state.user.uid !== uid0) return;
      var a = state.announcement;
      if (a && a.active && a.id && a.id !== state.seenAnnouncement && !state.annPopup) state.annPopup = a;
      render();
    });
  }
  function afterLoadHooks(){
    touchUserIndex(true);
    loadAccessFlags();
  }

  function annTextHtml(t){ return escapeHtml(t || '').replace(/\n/g, '<br>'); }
  function annPopupHtml(){
    var a = state.annPopup || {};
    var urgent = a.level === 'urgent';
    return '<div class="modal-overlay" id="ann-overlay" style="z-index:' + (urgent ? 80 : 60) + ';"><div class="modal tut-modal" role="alertdialog" aria-modal="true"' + (urgent ? ' style="border-top:6px solid #B3402A;"' : '') + '>' +
      '<button type="button" class="tut-close" id="ann-close-x" aria-label="닫기">' + ICONS.x + '</button>' +
      '<div class="tut-count"' + (urgent ? ' style="color:#B3402A;font-weight:700;"' : '') + '>' + (urgent ? '긴급 공지' : '공지') + '</div>' +
      '<h3 style="margin-top:12px;">' + escapeHtml(a.title || '공지') + '</h3>' +
      '<div class="tut-body" style="min-height:0;max-height:55vh;overflow-y:auto;">' + annTextHtml(a.body) + '</div>' +
      '<div class="tut-actions" style="margin-top:18px;"><span></span><div class="right"><button type="button" class="btn small" id="ann-ok">확인</button></div></div>' +
      '</div></div>';
  }
  function annBoxHtml(){
    var a = state.announcement;
    if (!a || !a.active) return '';
    return '<div class="acct-block" style="margin-bottom:18px;"><div class="acct-label">' + (a.level === 'urgent' ? '긴급 ' : '') + '현재 공지 · ' + escapeHtml(a.title || '') + '</div>' +
      '<p style="font-size:15px;line-height:1.7;color:var(--cream);margin:0;">' + annTextHtml(a.body) + '</p></div>';
  }
  function dismissAnn(){
    var a = state.annPopup;
    state.annPopup = null;
    if (a && a.id){ state.seenAnnouncement = a.id; persistAppData(); }
    render();
  }

  // ----- admin data actions -----
  function adminEnter(){
    var ad = state.admin;
    if (!ad.users && !ad.loadingUsers) adminLoadUsers();
  }
  function adminLoadUsers(){
    var ad = state.admin;
    if (ad.loadingUsers) return;
    ad.loadingUsers = true; ad.userErr = null; render();
    Promise.all([fbDb.collection('user_index').get(), fbDb.collection('user_limits').get()]).then(function(res){
      var users = [], lim = {};
      res[0].forEach(function(d){ var x = d.data(); x.id = d.id; users.push(x); });
      res[1].forEach(function(d){ lim[d.id] = d.data(); });
      users.sort(function(a, b){ return (b.lastSeen || 0) - (a.lastSeen || 0); });
      ad.users = users; ad.userLimits = lim; ad.loadingUsers = false; render();
    }).catch(function(err){
      ad.loadingUsers = false; ad.users = ad.users || []; ad.userErr = adminErrMsg(err); render();
    });
  }
  function adminLoadUserData(uid0){
    var ad = state.admin;
    ad.detail = { uid: uid0, loading: true, err: null, mats: null, filter: 'all', msg: null };
    render();
    fbDb.collection('users').doc(uid0).collection('store').doc('app-data').get().then(function(snap){
      if (!snap.exists) return [];
      var d = snap.data();
      if (d.paged && d.paged.v === 2) return loadPages(uid0, 'materials', d.paged.materials || 0);
      return d.materials || [];
    }).then(function(mats){
      if (!ad.detail || ad.detail.uid !== uid0) return;
      ad.detail.mats = mats; ad.detail.loading = false; render();
    }).catch(function(err){
      if (!ad.detail || ad.detail.uid !== uid0) return;
      ad.detail.loading = false; ad.detail.err = adminErrMsg(err); render();
    });
  }
  function adminSaveLimit(uid0){
    var ad = state.admin;
    var callsRaw = (document.getElementById('ad-lim-calls') || {}).value;
    var tavRaw = (document.getElementById('ad-lim-tav') || {}).value;
    var blocked = !!(document.getElementById('ad-lim-block') || {}).checked;
    var data = { blocked: blocked, updatedAt: Date.now() };
    var n = parseInt(callsRaw, 10), nt = parseInt(tavRaw, 10);
    if (callsRaw !== '' && callsRaw != null){
      if (isNaN(n) || n < 0 || n > 100000){ ad.msg = { type: 'err', text: '횟수는 0 이상의 숫자로 적어주세요.' }; render(); return; }
      data.dailyCalls = n;
    }
    if (tavRaw !== '' && tavRaw != null){
      if (isNaN(nt) || nt < 0 || nt > 100000){ ad.msg = { type: 'err', text: '횟수는 0 이상의 숫자로 적어주세요.' }; render(); return; }
      data.dailyTavily = nt;
    }
    var ref = fbDb.collection('user_limits').doc(uid0);
    var job = (!blocked && data.dailyCalls === undefined && data.dailyTavily === undefined) ? ref.delete().then(function(){ delete ad.userLimits[uid0]; }) : ref.set(data).then(function(){ ad.userLimits[uid0] = data; });
    job.then(function(){ ad.msg = { type: 'ok', text: '한도를 저장했어요.' }; render(); })
       .catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }
  function adminSaveDefault(){
    var ad = state.admin;
    var raw = (document.getElementById('ad-def-calls') || {}).value;
    var rawT = (document.getElementById('ad-def-tav') || {}).value;
    var n = parseInt(raw, 10), nt = parseInt(rawT, 10);
    if ((raw !== '' && (isNaN(n) || n < 0 || n > 100000)) || (rawT !== '' && (isNaN(nt) || nt < 0 || nt > 100000))){ ad.msg = { type: 'err', text: '횟수는 숫자로 적어주세요.' }; render(); return; }
    var data = { updatedAt: Date.now(), dailyCalls: (raw === '' || isNaN(n) || n <= 0) ? null : n, dailyTavily: (rawT === '' || isNaN(nt) || nt <= 0) ? null : nt };
    fbDb.collection('config').doc('limits').set(data).then(function(){
      state.limits.def = data; ad.msg = { type: 'ok', text: '기본 한도를 저장했어요 (AI ' + (data.dailyCalls ? '하루 ' + data.dailyCalls + '회' : '제한 없음') + ' · 검색 ' + (data.dailyTavily ? '하루 ' + data.dailyTavily + '회' : '제한 없음') + ').' }; render();
    }).catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }
  function adminPostAnn(){
    var ad = state.admin;
    var title = (document.getElementById('ad-ann-title') || {}).value || '';
    var body = (document.getElementById('ad-ann-body') || {}).value || '';
    title = title.trim().slice(0, 60); body = body.trim().slice(0, 1500);
    if (!title || !body){ ad.msg = { type: 'err', text: '제목과 내용을 모두 적어주세요.' }; render(); return; }
    var urgent = !!(document.getElementById('ad-ann-urgent') || {}).checked;
    if (urgent && !confirm('긴급 공지는 지금 접속 중인 모든 사용자 화면에 바로 팝업으로 떠요. 올릴까요?')) return;
    var data = { id: 'a' + Date.now().toString(36), title: title, body: body, active: true, level: urgent ? 'urgent' : 'normal', createdAt: Date.now() };
    state.seenAnnouncement = data.id;   // set first: the live listener fires for my own write too
    fbDb.collection('config').doc('announcement').set(data).then(function(){
      state.announcement = data; persistAppData();
      ad.annTitle = ''; ad.annBody = ''; ad.annUrgent = false; ad.msg = { type: 'ok', text: urgent ? '긴급 공지를 올렸어요. 접속 중인 사용자에게 바로 떠요.' : '공지를 올렸어요. 사용자는 다음에 접속할 때 보게 돼요.' }; render();
    }).catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }
  function adminClearAnn(){
    var ad = state.admin;
    var a = state.announcement;
    if (!a) return;
    var data = Object.assign({}, a, { active: false });
    fbDb.collection('config').doc('announcement').set(data).then(function(){
      state.announcement = data; ad.msg = { type: 'ok', text: '공지를 내렸어요.' }; render();
    }).catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }
  function adminLoadGl(){
    var ad = state.admin;
    if (ad.loadingGl) return;
    ad.loadingGl = true; ad.glErr = null; render();
    Promise.all([fbDb.collection('groups').get(), fbDb.collection('shared_collections').limit(100).get()]).then(function(res){
      var gs = [], ls = [];
      res[0].forEach(function(d){ var x = d.data(); x.code = d.id; gs.push(x); });
      res[1].forEach(function(d){ var x = d.data(); x.code = d.id; ls.push(x); });
      gs.sort(function(a, b){ return (b.createdAt || 0) - (a.createdAt || 0); });
      ls.sort(function(a, b){ return (b.createdAt || 0) - (a.createdAt || 0); });
      ad.groups = gs; ad.links = ls; ad.loadingGl = false; render();
    }).catch(function(err){
      ad.loadingGl = false; ad.groups = ad.groups || []; ad.links = ad.links || []; ad.glErr = adminErrMsg(err); render();
    });
  }
  function adminDeleteGroup(code){
    var ad = state.admin;
    deleteGroupFully(code).then(function(){
      ad.groups = (ad.groups || []).filter(function(g){ return g.code !== code; });
      ad.msg = { type: 'ok', text: '그룹을 삭제했어요.' }; render();
    }).catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }
  function adminDeleteLink(code){
    var ad = state.admin;
    fbDb.collection('shared_collections').doc(code).delete().then(function(){
      ad.links = (ad.links || []).filter(function(l){ return l.code !== code; });
      ad.msg = { type: 'ok', text: '공유 링크를 중단했어요.' }; render();
    }).catch(function(err){ ad.msg = { type: 'err', text: adminErrMsg(err) }; render(); });
  }

  // ----- admin UI -----
  var AD_ROW = 'display:flex;flex-wrap:wrap;align-items:center;gap:6px 16px;width:100%;text-align:left;margin:0 0 8px;padding:12px 14px;';
  function adminTabHtml(){
    var ad = state.admin;
    if (!state.isAdmin) return '<div class="empty"><h3>관리자만 볼 수 있어요</h3></div>';
    var subs = [['stats', '현황'], ['users', '사용자'], ['ai', 'AI 설정'], ['ann', '공지'], ['groups', '그룹 · 링크']];
    var html = '<p class="section-title">관리자</p>' +
      '<div class="compare-controls"><div class="mode-toggle">' + subs.map(function(x){
        return '<button data-adsub="' + x[0] + '" class="' + (ad.sub === x[0] ? 'active' : '') + '">' + x[1] + '</button>';
      }).join('') + '</div></div>';
    if (ad.msg) html += '<p class="acct-msg ' + ad.msg.type + '" style="margin:0 0 14px;">' + escapeHtml(ad.msg.text) + '</p>';
    if (ad.sub === 'stats') html += adminStatsHtml();
    else if (ad.sub === 'users') html += adminUsersHtml();
    else if (ad.sub === 'ai') html += adminAiHtml();
    else if (ad.sub === 'ann') html += adminAnnHtml();
    else html += adminGlHtml();
    return html;
  }
  function adminLoadingOrErr(){
    var ad = state.admin;
    var h = '';
    if (ad.userErr) h += '<p class="acct-msg err" style="margin:0 0 12px;">' + escapeHtml(ad.userErr) + '</p>';
    if (ad.loadingUsers && !ad.users) h += '<p class="sm-hint">불러오는 중...</p>';
    return h;
  }
  function adminStatsHtml(){
    var ad = state.admin, users = ad.users || [];
    var startToday = new Date(); startToday.setHours(0, 0, 0, 0);
    var activeToday = 0, calls = 0, tokens = 0, tcalls = 0, quota = 0, mT = 0, mats = 0;
    users.forEach(function(u){
      if ((u.lastSeen || 0) >= startToday.getTime()) activeToday++;
      var t = usageToday(u); calls += t.calls || 0; tokens += t.tokens || 0; tcalls += t.t || 0; quota += t.q || 0;
      mT += usageMonth(u).mt || 0; mats += u.total || 0;
    });
    var fmtTok = function(n){ return n >= 10000 ? (n / 1000).toFixed(0) + 'K' : String(n); };
    var card = function(label, val){ return '<div class="help-step"><span class="no">' + label + '</span><h4>' + val + '</h4></div>'; };
    var cfg = state.aiConfig || {};
    var def = state.limits.def || {};
    var periods = [['today', '오늘'], ['month', '이번 달'], ['all', '누적']];
    var P = ad.period || 'today';
    var rows = users.map(function(u){ var x = periodUsage(u, P); return { u: u, g: x.g, t: x.t, k: x.k }; })
      .filter(function(r){ return r.g > 0 || r.t > 0; })
      .sort(function(a, b){ return (b.g + b.t) - (a.g + a.t); });
    var maxV = 0; rows.forEach(function(r){ maxV = Math.max(maxV, r.g, r.t); });
    var chart = '';
    rows.slice(0, 12).forEach(function(r){
      chart += '<div style="display:grid;grid-template-columns:minmax(80px,140px) 1fr;gap:6px 12px;align-items:center;margin-bottom:10px;">' +
        '<div style="font-size:14px;line-height:1.3;word-break:break-all;">' + escapeHtml(userLabel(r.u)) + '</div>' +
        '<div>' + barHtml(r.g, maxV, C_G) + '<div style="height:3px;"></div>' + barHtml(r.t, maxV, C_T) +
        '<div style="font-size:12.5px;color:var(--cream-soft);margin-top:3px;">AI <b style="color:var(--cream);">' + r.g + '회</b> · 검색 <b style="color:var(--cream);">' + r.t + '회</b> · 토큰 ' + fmtTok(r.k) + '</div></div></div>';
    });
    if (!rows.length) chart = '<p class="sm-hint">이 기간에 사용 기록이 없어요.</p>';
    else if (rows.length > 12) chart += '<p class="sm-hint">상위 12명만 표시했어요 (사용한 사람 ' + rows.length + '명).</p>';

    // last 7 days, summed across users
    var days = [];
    for (var i = 6; i >= 0; i--){ var d = new Date(); d.setDate(d.getDate() - i); days.push(d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2)); }
    var sumG = {}, sumT = {};
    users.forEach(function(u){
      var x = u.usage || {};
      var entries = (Array.isArray(x.hist) ? x.hist : []).map(function(h){ return { d: h.d, c: h.c || 0, t: h.t || 0 }; });
      if (x.day) entries.push({ d: x.day, c: x.calls || 0, t: x.t || 0 });
      var seenDay = {};
      entries.forEach(function(e){ if (seenDay[e.d]) return; seenDay[e.d] = true; sumG[e.d] = (sumG[e.d] || 0) + e.c; sumT[e.d] = (sumT[e.d] || 0) + e.t; });
    });
    var maxD = 0; days.forEach(function(d){ maxD = Math.max(maxD, sumG[d] || 0, sumT[d] || 0); });
    var trend = '<div style="display:flex;align-items:flex-end;gap:8px;height:130px;margin:6px 0 4px;">' + days.map(function(d){
      var g = sumG[d] || 0, t = sumT[d] || 0;
      var hg = maxD ? Math.round(g / maxD * 100) : 0, ht = maxD ? Math.round(t / maxD * 100) : 0;
      return '<div style="flex:1;display:flex;flex-direction:column;justify-content:flex-end;height:100%;min-width:0;" title="' + d + ' · AI ' + g + '회 · 검색 ' + t + '회">' +
        '<div style="display:flex;align-items:flex-end;gap:2px;height:100px;"><div style="flex:1;height:' + hg + '%;min-height:' + (g ? 2 : 0) + 'px;background:' + C_G + ';border-radius:2px 2px 0 0;"></div>' +
        '<div style="flex:1;height:' + ht + '%;min-height:' + (t ? 2 : 0) + 'px;background:' + C_T + ';border-radius:2px 2px 0 0;"></div></div>' +
        '<div style="font-size:11.5px;color:var(--cream-soft);text-align:center;margin-top:4px;">' + d.slice(5).replace('-', '/') + '</div>' +
        '<div style="font-size:11.5px;text-align:center;">' + g + '·' + t + '</div></div>';
    }).join('') + '</div>';

    var legend = '<div style="display:flex;gap:16px;font-size:13px;color:var(--cream-soft);margin:0 0 12px;"><span><span style="display:inline-block;width:10px;height:10px;background:' + C_G + ';border-radius:2px;margin-right:5px;"></span>AI(Gemini) 호출</span><span><span style="display:inline-block;width:10px;height:10px;background:' + C_T + ';border-radius:2px;margin-right:5px;"></span>검색(Tavily) 호출</span></div>';

    return adminLoadingOrErr() +
      '<div class="acct-block"><div class="acct-label">남은 한도</div>' +
        remainHtml('AI(Gemini) · 오늘', calls, cfg.geminiDaily || 0, C_G, '프로젝트 하루 한도를 "AI 설정"에서 입력하면 남은 횟수를 보여줘요') +
        remainHtml('검색(Tavily) · 이번 달 크레딧', mT, cfg.tavilyMonthly || 0, C_T, '월 크레딧을 "AI 설정"에서 입력하면 남은 횟수를 보여줘요') +
        '<p class="sm-hint" style="margin:0;">이 앱을 거친 호출만 집계돼요 (사용자가 접속해 저장될 때 갱신, 최대 1~2분 지연). 정확한 잔여량은 Google AI Studio와 Tavily 대시보드에서 확인하세요.' + (quota ? ' <b style="color:var(--reject);">오늘 한도 오류(429) ' + quota + '회</b>가 있었어요.' : '') + '</p></div>' +
      '<div class="help-steps" style="margin:0 0 22px;">' +
        card('사용자', users.length + '명') + card('오늘 접속', activeToday + '명') +
        card('오늘 AI 호출', calls + '회') + card('오늘 검색', tcalls + '회') +
        card('오늘 토큰', fmtTok(tokens)) + card('전체 자료', mats + '개') +
      '</div>' +
      '<div class="acct-block"><div class="acct-label">누가 얼마나 썼나</div>' +
        '<div class="compare-controls" style="margin-bottom:12px;"><div class="mode-toggle">' + periods.map(function(x){
          return '<button data-adperiod="' + x[0] + '" class="' + (P === x[0] ? 'active' : '') + '">' + x[1] + '</button>';
        }).join('') + '</div></div>' + legend + chart + '</div>' +
      '<div class="acct-block"><div class="acct-label">최근 7일 (막대 아래 숫자: AI·검색)</div>' + legend + trend + '</div>' +
      '<p class="sm-hint">목록은 이 업데이트를 받은 뒤 <b>한 번 이상 접속한 사용자</b>부터 보여요. 7일 추이는 이 버전부터 쌓여요.</p>' +
      '<div class="acct-block"><div class="acct-label">모든 사용자의 기본 하루 한도</div>' +
        '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 10px;">비워 두면 한도가 없어요. 사용자마다 따로 정한 값이 있으면 그 값이 우선해요.</p>' +
        '<div class="field-row"><div class="field" style="max-width:220px;"><label>AI 하루 호출 횟수</label><input type="number" min="0" id="ad-def-calls" placeholder="한도 없음" value="' + (typeof def.dailyCalls === 'number' ? def.dailyCalls : '') + '"></div>' +
        '<div class="field" style="max-width:220px;"><label>검색 하루 호출 횟수</label><input type="number" min="0" id="ad-def-tav" placeholder="한도 없음" value="' + (typeof def.dailyTavily === 'number' ? def.dailyTavily : '') + '"></div></div>' +
        '<button class="btn small" id="ad-def-save">저장</button> ' +
        '<button class="btn ghost small" id="ad-refresh">새로고침</button>' +
        '<p class="sm-hint" style="margin-top:10px;">한도는 사용자의 브라우저에서 확인하는 방식이라 일반적인 사용을 조절하는 용도예요. 일부러 우회하는 것까지 막지는 못해요.</p></div>';
  }

  function adminUsersHtml(){
    var ad = state.admin, users = ad.users || [];
    if (ad.detail) return adminUserDetailHtml();
    var html = adminLoadingOrErr() +
      '<p class="sm-hint" style="margin-bottom:12px;">' + users.length + '명 · 최근 접속 순 <button class="btn ghost small" id="ad-refresh" style="margin-left:8px;">새로고침</button></p>';
    users.forEach(function(u){
      var t = usageToday(u), lim = ad.userLimits[u.id];
      html += '<button type="button" class="acct-block" data-aduser="' + escapeHtml(u.id) + '" style="' + AD_ROW + 'cursor:pointer;color:inherit;font:inherit;">' +
        '<b style="min-width:120px;">' + escapeHtml(userLabel(u)) + '</b>' +
        '<span>자료 ' + (u.total || 0) + '개</span><span>오늘 AI ' + (t.calls || 0) + '회 · 검색 ' + (t.t || 0) + '회</span>' +
        '<span style="color:var(--cream-soft);">접속 ' + adminFmt(u.lastSeen) + '</span>' +
        (lim ? '<span style="color:var(--gold);">' + (lim.blocked ? '차단됨' : ('한도 ' + [typeof lim.dailyCalls === 'number' ? 'AI ' + lim.dailyCalls : '', typeof lim.dailyTavily === 'number' ? '검색 ' + lim.dailyTavily : ''].filter(Boolean).join(' · '))) + '</span>' : '') +
      '</button>';
    });
    if (!users.length && !ad.loadingUsers) html += '<p class="sm-hint">아직 목록에 사용자가 없어요.</p>';
    return html;
  }
  function adminUserDetailHtml(){
    var ad = state.admin, d = ad.detail;
    var u = (ad.users || []).filter(function(x){ return x.id === d.uid; })[0] || { id: d.uid };
    var lim = ad.userLimits[d.uid] || {};
    var t = usageToday(u), uu = u.usage || {};
    var c = u.counts || {};
    var html = '<p><button class="btn ghost small" id="ad-back">← 사용자 목록</button></p>' +
      '<div class="acct-block"><div class="acct-label">' + escapeHtml(userLabel(u)) + '</div>' +
      '<p style="font-size:14.5px;line-height:1.8;color:var(--cream-soft);margin:0;">' +
        '자료 ' + (u.total || 0) + '개 (승인 ' + (c.a || 0) + ' · 반려 ' + (c.r || 0) + ' · 대기 ' + (c.p || 0) + ')<br>' +
        '오늘 AI ' + (t.calls || 0) + '회 · 검색 ' + (t.t || 0) + '회 · 누적 AI ' + (uu.totalCalls || 0) + '회 / ' + (uu.totalTokens || 0) + ' 토큰 / 검색 ' + (uu.totalT || 0) + '회<br>' +
        '공유 링크 ' + (u.links || 0) + '개 · 앱 버전 ' + escapeHtml(u.ver || '-') + ' · 마지막 접속 ' + adminFmt(u.lastSeen) + '<br>' +
        '<span style="font-size:12.5px;">계정 ID ' + escapeHtml(d.uid) + '</span></p></div>' +
      '<div class="acct-block"><div class="acct-label">이 사용자의 AI 한도</div>' +
        '<div class="field" style="max-width:220px;"><label>하루 호출 횟수 (비우면 기본값)</label><input type="number" min="0" id="ad-lim-calls" value="' + (typeof lim.dailyCalls === 'number' ? lim.dailyCalls : '') + '"></div>' +
        '<div class="field" style="max-width:220px;"><label>검색 하루 호출 횟수 (비우면 기본값)</label><input type="number" min="0" id="ad-lim-tav" value="' + (typeof lim.dailyTavily === 'number' ? lim.dailyTavily : '') + '"></div>' +
        '<div class="toggle-row"><input type="checkbox" id="ad-lim-block" ' + (lim.blocked ? 'checked' : '') + '><label for="ad-lim-block" style="margin:0;">AI·검색 사용 완전히 막기</label></div>' +
        '<button class="btn small" id="ad-lim-save" data-uid="' + escapeHtml(d.uid) + '">저장</button></div>';
    html += '<div class="acct-block"><div class="acct-label">자료·평가 기록 (읽기 전용)</div>' +
      '<p class="sm-hint" style="margin:0 0 10px;">서비스 운영과 문제 해결에 필요할 때만 열람해주세요. 수정·삭제는 할 수 없어요.</p>';
    if (d.loading) html += '<p class="sm-hint">불러오는 중...</p>';
    else if (d.err) html += '<p class="acct-msg err" style="margin:0;">' + escapeHtml(d.err) + '</p>';
    else if (!d.mats) html += '<button class="btn small" id="ad-load-mats" data-uid="' + escapeHtml(d.uid) + '">자료 불러오기</button>';
    else {
      var opts = [['all', '전체'], ['approved', '승인'], ['rejected', '반려'], ['pending', '대기']].map(function(x){
        return '<option value="' + x[0] + '"' + (d.filter === x[0] ? ' selected' : '') + '>' + x[1] + '</option>';
      }).join('');
      var list = d.mats.filter(function(m){ return d.filter === 'all' || m.status === d.filter; });
      var lbl = { approved: '승인', rejected: '반려', pending: '대기' };
      html += '<div class="field" style="max-width:200px;"><label>보기</label><select id="ad-mat-filter">' + opts + '</select></div>' +
        '<p class="sm-hint">' + list.length + '개' + (list.length > 200 ? ' (앞의 200개만 표시)' : '') + '</p>';
      list.slice(0, 200).forEach(function(m){
        html += '<div style="padding:8px 0;border-top:1px solid var(--line-dark);font-size:14.5px;line-height:1.5;">' +
          '<b>' + escapeHtml(m.title || '(제목 없음)') + '</b><br><span style="color:var(--cream-soft);font-size:13px;">' +
          (lbl[m.status] || '') + (m.rejectReason ? ' · ' + escapeHtml(m.rejectReason) : '') + ' · ' + escapeHtml(m.field || '') + ' · ' + escapeHtml(m.source || '') + ' · 평균 ' + avgScore(m) + '점</span></div>';
      });
    }
    return html + '</div>';
  }
  function maskKey(k){ return k ? ('…' + String(k).slice(-4)) : ''; }
  function adminAiHtml(){
    var ad = state.admin, cfg = state.aiConfig || {};
    var f = ad.aiForm || (ad.aiForm = { model: cfg.model || '', key: '', geminiDaily: cfg.geminiDaily || '', tavilyMonthly: cfg.tavilyMonthly || '' });
    var html = '<div class="acct-block"><div class="acct-label">Gemini (AI 채점·요약)</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 12px;">여기서 정한 모델과 키가 <b style="color:var(--cream);">모든 사용자에게</b> 적용돼요. 사용자는 설정할 필요가 없어요. 저장하기 전에 연결을 먼저 확인해요.</p>' +
      '<div class="field"><label>모델명</label><input type="text" id="ad-ai-model" placeholder="예: gemini-3.1-flash-lite" value="' + escapeHtml(f.model) + '"></div>' +
      '<div style="margin-bottom:12px;"><button class="btn ghost small" id="ad-ai-list" ' + (ad.aiTestBusy ? 'disabled' : '') + '>사용 가능한 모델 확인</button></div>';
    if (ad.aiModels){
      html += ad.aiModels.length ? '<div class="model-list" style="margin-bottom:12px;">' + ad.aiModels.map(function(m){
        return '<button type="button" class="model-list-item' + (f.model === m.name ? ' active' : '') + '" data-ad-model="' + escapeHtml(m.name) + '"><span class="mn">' + escapeHtml(m.name) + '</span>' + (m.displayName && m.displayName !== m.name ? '<span class="md">' + escapeHtml(m.displayName) + '</span>' : '') + '</button>';
      }).join('') + '</div>' : '<p class="sm-hint">사용 가능한 모델이 없어요.</p>';
    }
    html += '<div class="field"><label>Gemini API 키</label><input type="password" id="ad-ai-key" autocomplete="off" placeholder="' + (cfg.apiKey ? ('저장된 키 ' + maskKey(cfg.apiKey) + ' · 바꿀 때만 입력') : '비워 두면 코드에 들어 있는 기본 키를 써요') + '" value="' + escapeHtml(f.key) + '"></div>' +
      '<p class="sm-hint">이 키는 사용자 브라우저에서 직접 쓰이는 키라, 접속한 사람이 개발자 도구로 볼 수 있어요. 지금도 코드에 들어 있는 것과 같은 수준이에요. Google Cloud에서 <b>이 사이트 주소(HTTP 리퍼러)로만 쓰도록 제한</b>하고 예산 알림을 걸어 두세요.</p>' +
      '<div class="field-row"><div class="field" style="max-width:240px;"><label>프로젝트 하루 호출 한도</label><input type="number" min="0" id="ad-ai-gdaily" placeholder="AI Studio에서 확인한 값" value="' + escapeHtml(String(f.geminiDaily)) + '"></div>' +
      '<div class="field" style="max-width:240px;"><label>Tavily 월 크레딧</label><input type="number" min="0" id="ad-ai-tmonth" placeholder="무료는 1000" value="' + escapeHtml(String(f.tavilyMonthly)) + '"></div></div>' +
      '<p class="sm-hint">두 숫자는 "현황" 화면에서 남은 횟수를 계산하는 데만 쓰여요 (Google·Tavily는 남은 양을 직접 알려주지 않아서 직접 입력해요).</p>' +
      '<button class="btn small" id="ad-ai-save" ' + (ad.aiTestBusy ? 'disabled' : '') + '>' + (ad.aiTestBusy ? '확인하는 중...' : '연결 확인 후 저장') + '</button></div>' +
      '<div class="acct-block"><div class="acct-label">Tavily (웹 검색)</div>' +
      '<p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0;">검색 키는 Cloudflare Worker 안에 보관돼 있어서 여기서 바꿀 수 없어요. 바꾸려면 Cloudflare 대시보드에서 Worker의 <b>TAVILY_API_KEY</b>를 수정하세요. 사용량은 위 현황에서 볼 수 있어요.</p></div>';
    return html;
  }
  function readAiForm(){
    var f = state.admin.aiForm || (state.admin.aiForm = {});
    var g = function(id){ var el = document.getElementById(id); return el ? el.value : null; };
    var m = g('ad-ai-model'); if (m !== null) f.model = m.trim();
    var k = g('ad-ai-key'); if (k !== null) f.key = k.trim();
    var d = g('ad-ai-gdaily'); if (d !== null) f.geminiDaily = d.trim();
    var t = g('ad-ai-tmonth'); if (t !== null) f.tavilyMonthly = t.trim();
    return f;
  }
  // direct ping with a candidate model/key (not counted in usage)
  function geminiPing(model, key){
    var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(model) + ':generateContent?key=' + encodeURIComponent(key);
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ contents: [{ parts: [{ text: 'ping' }] }], generationConfig: { maxOutputTokens: 8 } }) })
      .then(function(res){ return res.json().then(function(d){ if (d.error){ var e = new Error(d.error.message || 'Gemini API 오류'); e.status = d.error.code || res.status; throw e; } return true; }); });
  }
  function adminSaveAi(){
    var ad = state.admin, f = readAiForm(), cfg = state.aiConfig || {};
    var model = f.model || cfg.model || '';
    var key = f.key || cfg.apiKey || GEMINI_API_KEY;
    var gd = f.geminiDaily === '' ? null : parseInt(f.geminiDaily, 10);
    var tm = f.tavilyMonthly === '' ? null : parseInt(f.tavilyMonthly, 10);
    if ((gd !== null && (isNaN(gd) || gd < 0)) || (tm !== null && (isNaN(tm) || tm < 0))){ ad.msg = { type: 'err', text: '한도는 0 이상의 숫자로 적어주세요.' }; render(); return; }
    if (!model){ ad.msg = { type: 'err', text: '모델명을 입력해주세요. "사용 가능한 모델 확인"으로 골라도 돼요.' }; render(); return; }
    ad.aiTestBusy = true; ad.msg = null; render();
    geminiPing(model, key).then(function(){ return null; }, function(err){
      if (err && err.status === 429) return '연결은 되지만 지금 한도 오류(429)가 나고 있어요. 그래도 저장했어요.';
      throw err;
    }).then(function(warn){
      var data = { model: model, apiKey: f.key || cfg.apiKey || null, geminiDaily: gd, tavilyMonthly: tm, updatedAt: Date.now() };
      return fbDb.collection('config').doc('ai').set(data).then(function(){
        state.aiConfig = data; ad.aiForm = null; ad.aiTestBusy = false;
        ad.msg = { type: warn ? 'err' : 'ok', text: warn || ('저장했어요. "' + model + '" 모델이 정상 동작해요. 사용자는 새로고침 없이 다음 요청부터 이 설정을 써요.') }; render();
      });
    }).catch(function(err){
      ad.aiTestBusy = false;
      var hint = err && err.status === 404 ? ' 아래 목록에서 실제 사용 가능한 모델을 골라주세요.' : '';
      ad.msg = { type: 'err', text: '저장하지 않았어요. 연결 확인에 실패했어요 (' + ((err && err.message) || adminErrMsg(err)) + ').' + hint }; render();
    });
  }
  function adminListModels(){
    var ad = state.admin, f = readAiForm();
    ad.aiTestBusy = true; ad.msg = null; render();
    listGeminiModels(f.key || ((state.aiConfig && state.aiConfig.apiKey) || '')).then(function(models){
      ad.aiModels = models; ad.aiTestBusy = false; ad.msg = { type: 'ok', text: models.length + '개 모델을 찾았어요. 눌러서 고르세요.' }; render();
    }).catch(function(err){
      ad.aiTestBusy = false; ad.msg = { type: 'err', text: '모델 목록을 불러오지 못했어요: ' + ((err && err.message) || '오류') }; render();
    });
  }
  function adminAnnHtml(){
    var ad = state.admin, a = state.announcement;
    var html = '';
    if (a && a.active){
      html += '<div class="acct-block"><div class="acct-label">' + (a.level === 'urgent' ? '긴급 ' : '') + '지금 올라가 있는 공지 · ' + adminFmt(a.createdAt) + '</div>' +
        '<p style="margin:0 0 6px;"><b>' + escapeHtml(a.title) + '</b></p><p style="font-size:14.5px;line-height:1.7;color:var(--cream-soft);margin:0 0 12px;">' + annTextHtml(a.body) + '</p>' +
        '<button class="btn ghost small" id="ad-ann-clear">공지 내리기</button></div>';
    } else html += '<p class="sm-hint">지금 올라가 있는 공지가 없어요.</p>';
    html += '<div class="acct-block"><div class="acct-label">새 공지 올리기</div>' +
      '<div class="field"><label>제목</label><input type="text" id="ad-ann-title" maxlength="60" value="' + escapeHtml(ad.annTitle) + '"></div>' +
      '<div class="field"><label>내용</label><textarea id="ad-ann-body" rows="5" maxlength="1500" style="width:100%;">' + escapeHtml(ad.annBody) + '</textarea></div>' +
      '<div class="toggle-row"><input type="checkbox" id="ad-ann-urgent" ' + (ad.annUrgent ? 'checked' : '') + '><label for="ad-ann-urgent" style="margin:0;"><b>긴급 공지</b> · 지금 접속 중인 사용자에게도 바로 띄우기</label></div>' +
      '<button class="btn small" id="ad-ann-post">올리기</button>' +
      '<p class="sm-hint" style="margin-top:10px;">새 공지를 올리면 이전 공지는 바뀌어요. 일반 공지는 사용자가 다음에 접속할 때 팝업으로 한 번 보게 되고, 긴급 공지는 접속 중인 사람에게 즉시 떠요.</p></div>';
    return html;
  }
  function adminGlHtml(){
    var ad = state.admin;
    if (!ad.groups && !ad.loadingGl) { setTimeout(adminLoadGl, 0); }
    var html = '';
    if (ad.glErr) html += '<p class="acct-msg err" style="margin:0 0 12px;">' + escapeHtml(ad.glErr) + '</p>';
    if (ad.loadingGl && !ad.groups) return html + '<p class="sm-hint">불러오는 중...</p>';
    html += '<p class="sm-hint" style="margin-bottom:12px;"><button class="btn ghost small" id="ad-gl-refresh">새로고침</button></p>';
    html += '<p class="section-title" style="font-size:19px;">그룹 (' + (ad.groups || []).length + '개)</p>';
    (ad.groups || []).forEach(function(g){
      html += '<div class="acct-block" style="' + AD_ROW + '"><b style="min-width:140px;">' + escapeHtml(g.name || '') + '</b><span>' + (g.memberUids || []).length + '명</span>' +
        '<span style="color:var(--cream-soft);">만든 이 ' + escapeHtml(g.ownerName || '') + ' · ' + adminFmt(g.createdAt) + ' · 코드 ' + escapeHtml(g.code) + '</span>' +
        '<button class="btn ghost small" data-addelgroup="' + escapeHtml(g.code) + '" style="margin-left:auto;">삭제</button></div>';
    });
    if (!(ad.groups || []).length) html += '<p class="sm-hint">그룹이 없어요.</p>';
    html += '<p class="section-title" style="font-size:19px;margin-top:22px;">공유 링크 (' + (ad.links || []).length + '개, 최근 100개)</p>';
    (ad.links || []).forEach(function(l){
      html += '<div class="acct-block" style="' + AD_ROW + '"><b style="min-width:140px;">' + escapeHtml(l.title || '') + '</b><span>' + (l.items || []).length + '개 자료</span>' +
        '<span style="color:var(--cream-soft);">만든 이 ' + escapeHtml(l.ownerName || '') + ' · ' + adminFmt(l.createdAt) + ' · 코드 ' + escapeHtml(l.code) + '</span>' +
        '<button class="btn ghost small" data-addellink="' + escapeHtml(l.code) + '" style="margin-left:auto;">중단</button></div>';
    });
    if (!(ad.links || []).length) html += '<p class="sm-hint">공유 링크가 없어요.</p>';
    return html;
  }
  function attachAdminHandlers(){
    var ad = state.admin;
    var $ = function(id){ return document.getElementById(id); };
    var annOk = $('ann-ok'); if (annOk) annOk.addEventListener('click', dismissAnn);
    var annX = $('ann-close-x'); if (annX) annX.addEventListener('click', dismissAnn);
    if (state.tab !== 'admin' || !state.isAdmin) return;
    document.querySelectorAll('[data-adsub]').forEach(function(b){
      b.addEventListener('click', function(){ ad.sub = b.getAttribute('data-adsub'); ad.msg = null; if (ad.sub !== 'users') ad.detail = null; render(); });
    });
    document.querySelectorAll('[data-aduser]').forEach(function(b){
      b.addEventListener('click', function(){ ad.msg = null; ad.detail = { uid: b.getAttribute('data-aduser'), loading: false, err: null, mats: null, filter: 'all' }; render(); });
    });
    var back = $('ad-back'); if (back) back.addEventListener('click', function(){ ad.detail = null; ad.msg = null; render(); });
    var ref = $('ad-refresh'); if (ref) ref.addEventListener('click', adminLoadUsers);
    var glr = $('ad-gl-refresh'); if (glr) glr.addEventListener('click', adminLoadGl);
    var defSave = $('ad-def-save'); if (defSave) defSave.addEventListener('click', adminSaveDefault);
    document.querySelectorAll('[data-adperiod]').forEach(function(b){ b.addEventListener('click', function(){ ad.period = b.getAttribute('data-adperiod'); render(); }); });
    var aiSave = $('ad-ai-save'); if (aiSave) aiSave.addEventListener('click', adminSaveAi);
    var aiList = $('ad-ai-list'); if (aiList) aiList.addEventListener('click', adminListModels);
    document.querySelectorAll('[data-ad-model]').forEach(function(b){ b.addEventListener('click', function(){ readAiForm(); ad.aiForm.model = b.getAttribute('data-ad-model'); render(); }); });
    ['ad-ai-model', 'ad-ai-key', 'ad-ai-gdaily', 'ad-ai-tmonth'].forEach(function(id){ var el = $(id); if (el) el.addEventListener('input', readAiForm); });
    var limSave = $('ad-lim-save'); if (limSave) limSave.addEventListener('click', function(){ adminSaveLimit(limSave.getAttribute('data-uid')); });
    var lm = $('ad-load-mats'); if (lm) lm.addEventListener('click', function(){ adminLoadUserData(lm.getAttribute('data-uid')); });
    var mf = $('ad-mat-filter'); if (mf) mf.addEventListener('change', function(){ ad.detail.filter = mf.value; render(); });
    var at = $('ad-ann-title'); if (at) at.addEventListener('input', function(){ ad.annTitle = at.value; });
    var ab = $('ad-ann-body'); if (ab) ab.addEventListener('input', function(){ ad.annBody = ab.value; });
    var au = $('ad-ann-urgent'); if (au) au.addEventListener('change', function(){ ad.annUrgent = au.checked; });
    var ap = $('ad-ann-post'); if (ap) ap.addEventListener('click', adminPostAnn);
    var ac = $('ad-ann-clear'); if (ac) ac.addEventListener('click', function(){ if (confirm('올라가 있는 공지를 내릴까요?')) adminClearAnn(); });
    document.querySelectorAll('[data-addelgroup]').forEach(function(b){
      b.addEventListener('click', function(){ if (confirm('이 그룹과 그룹에 담긴 자료를 모두 삭제할까요? 되돌릴 수 없어요.')) adminDeleteGroup(b.getAttribute('data-addelgroup')); });
    });
    document.querySelectorAll('[data-addellink]').forEach(function(b){
      b.addEventListener('click', function(){ if (confirm('이 공유 링크를 중단할까요? 링크를 가진 사람은 더 이상 볼 수 없어요.')) adminDeleteLink(b.getAttribute('data-addellink')); });
    });
  }

  // ---- 새 버전 감지 + 자동 새로고침 ----
  // Re-fetches this very script (revalidating, so a 304 is cheap and the HTTP cache gets
  // the new copy) and compares its APP_VERSION. If newer: banner, then reload once the
  // user is idle (no AI call running, nothing being typed) and the save has been flushed.
  var updateFound = null, updateChecking = false, updateTimer = null;
  var netInFlight = 0, lastActive = Date.now();
  var rawFetch = window.fetch ? window.fetch.bind(window) : null;
  if (rawFetch){
    // count AI / proxy requests so a reload never cuts one off
    window.fetch = function(input){
      var url = (typeof input === 'string') ? input : ((input && input.url) || '');
      var tracked = url.indexOf('generativelanguage.googleapis.com') !== -1 || url.indexOf(PROXY_BASE_URL) === 0;
      var p = rawFetch.apply(null, arguments);
      if (tracked){
        netInFlight++;
        var done = function(){ netInFlight--; lastActive = Date.now(); };
        p.then(done, done);
      }
      return p;
    };
  }
  ['click', 'keydown', 'touchstart', 'input'].forEach(function(ev){
    document.addEventListener(ev, function(){ lastActive = Date.now(); }, true);
  });

  function appScriptUrl(){
    var els = document.getElementsByTagName('script');
    for (var i = 0; i < els.length; i++){
      var src = els[i].src || '';
      if (/\/app\.js(\?|$)/.test(src)) return src;
    }
    return null;
  }
  function userIsTyping(){
    var a = document.activeElement;
    if (!a) return false;
    var tag = (a.tagName || '').toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || a.isContentEditable === true;
  }
  function reloadForUpdate(){
    // never reload twice for the same version within 10 minutes (guards a loop if a stale copy keeps coming back)
    try {
      var k = JSON.parse(sessionStorage.getItem('archiveUpdateTry') || 'null');
      if (k && k.v === updateFound && Date.now() - k.t < 600000) return false;
      sessionStorage.setItem('archiveUpdateTry', JSON.stringify({ v: updateFound, t: Date.now() }));
    } catch(e){}
    if (usageTimer){ clearTimeout(usageTimer); usageTimer = null; persistAppData(); }
    var flush = Promise.resolve(currentSavePromise).then(function(){ return saveDirty ? currentSavePromise : null; });
    withTimeout(flush, 4000).then(function(){ location.reload(); }, function(){ location.reload(); });
    return true;
  }
  function updateSafeToReload(){
    return netInFlight === 0 && !(state.rescore && state.rescore.busy) && !userIsTyping() && !state.pendingReject;
  }
  function showUpdateBanner(){
    if (document.getElementById('update-banner')) return;
    var b = document.createElement('div');
    b.id = 'update-banner';
    b.setAttribute('role', 'status');
    b.style.cssText = 'position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:200;max-width:calc(100vw - 24px);' +
      'background:#F3EEDF;color:#20281F;border:1px solid #C89B3C;border-radius:6px;padding:12px 16px;box-shadow:0 8px 28px rgba(0,0,0,.4);' +
      'display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:15px;line-height:1.5;';
    b.innerHTML = '<span><b>새 버전(v' + escapeHtml(updateFound) + ')</b>이 나왔어요. 하던 일이 끝나면 자동으로 새로고침돼요.</span>' +
      '<button type="button" id="update-now" style="background:#C89B3C;color:#16302E;border:none;border-radius:4px;padding:8px 14px;font-weight:700;font-size:14px;cursor:pointer;">지금 새로고침</button>';
    document.body.appendChild(b);
    document.getElementById('update-now').addEventListener('click', function(){
      var btn = document.getElementById('update-now'); btn.disabled = true; btn.textContent = '저장 후 새로고침...';
      try { sessionStorage.removeItem('archiveUpdateTry'); } catch(e){}
      reloadForUpdate();
    });
    if (!updateTimer){
      updateTimer = setInterval(function(){
        var idle = Date.now() - lastActive > 45000;
        if (updateSafeToReload() && (idle || document.hidden)) reloadForUpdate();
      }, 5000);
    }
  }
  function checkForUpdate(){
    if (updateFound || updateChecking || !rawFetch) return;
    var src = appScriptUrl();
    if (!src) return;
    updateChecking = true;
    rawFetch(src, { cache: 'no-cache' }).then(function(r){ return r.ok ? r.text() : ''; }).then(function(t){
      var m = /var APP_VERSION = '([^']+)'/.exec(t || '');
      if (m && m[1] !== APP_VERSION){ updateFound = m[1]; showUpdateBanner(); }
    }).catch(function(){}).then(function(){ updateChecking = false; });
  }
  function startUpdateWatcher(){
    setTimeout(checkForUpdate, 20000);
    setInterval(checkForUpdate, 300000);
    document.addEventListener('visibilitychange', function(){
      if (document.hidden) return;
      checkForUpdate();
      if (state.user && state.loaded && Date.now() - flagsAt > 300000) loadAccessFlags();
    });
  }

  bootstrap();
  startUpdateWatcher();
})();
