  html, body {
    margin: 0; padding: 0; background: #16302E; min-height: 100%;
  }

  #archive-root {
    --bg: #16302E;
    --bg-deep: #0F2422;
    --paper: #EFE6D2;
    --paper-hi: #F7F1E2;
    --paper-line: rgba(32,40,31,0.16);
    --ink: #20281F;
    --ink-soft: #55614F;
    --cream: #F3EEDF;
    --cream-soft: #C9CFC1;
    --gold: #C89B3C;
    --gold-soft: rgba(200,155,60,0.35);
    --approve: #5C7F5B;
    --approve-deep: #3E5B3E;
    --reject: #B5573F;
    --reject-deep: #8A3F2C;
    --line-dark: rgba(243,238,223,0.14);
    --radius: 4px;
    --font-display: 'Fraunces', ui-serif, Georgia, serif;
    --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif;
    --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace;

    all: initial;
    *, *::before, *::after { box-sizing: border-box; }
    display: block;
    background: var(--bg);
    color: var(--cream);
    font-family: var(--font-body);
    min-height: 100vh;
    width: 100%;
    position: relative;
    -webkit-font-smoothing: antialiased;
  }
  #archive-root button { font-family: inherit; cursor: pointer; }
  #archive-root input, #archive-root select { font-family: inherit; }

  #archive-root .wrap { max-width: 1040px; margin: 0 auto; padding: 24px clamp(16px, 3.5vw, 44px) 56px; }

  #archive-root .header {
    display: flex; align-items: flex-start; justify-content: space-between;
    border-bottom: 1px solid var(--line-dark); padding-bottom: 16px; margin-bottom: 18px;
  }
  #archive-root .header-left { display: flex; align-items: flex-start; gap: 10px; }
  #archive-root .menu-btn {
    background: transparent; border: 1px solid var(--line-dark); color: var(--cream);
    width: 34px; height: 34px; border-radius: 4px; flex-shrink: 0; margin-top: 2px;
    display: flex; align-items: center; justify-content: center; transition: border-color .15s ease, color .15s ease;
  }
  #archive-root .menu-btn svg { width: 18px; height: 18px; }
  #archive-root .menu-btn:hover { border-color: var(--gold); color: var(--gold); }
  #archive-root .header .title-block .eyebrow {
    font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase;
    color: var(--gold); margin: 0 0 4px;
  }
  #archive-root .header h1 {
    font-family: var(--font-display); font-weight: 600; font-size: 28px; margin: 0; color: var(--cream);
    letter-spacing: -0.01em;
  }
  #archive-root .header .sub { font-size: 14px; color: var(--cream-soft); margin-top: 4px; }
  #archive-root .header .counts {
    text-align: right; font-family: var(--font-mono); font-size: 13px; color: var(--cream-soft); line-height: 1.7;
  }
  #archive-root .header .counts b { color: var(--gold); font-weight: 600; }

  /* Drawer tab nav */
  #archive-root .tabs {
    display: flex; gap: 2px; margin-bottom: 26px; border-bottom: 1px solid var(--line-dark);
  }
  #archive-root .tab {
    flex: 1; background: transparent; border: none; padding: 10px 4px 12px;
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: var(--cream-soft); position: relative; transition: color .15s ease;
  }
  #archive-root .tab svg { width: 18px; height: 18px; opacity: .75; }
  #archive-root .tab span { font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; }
  #archive-root .tab.active { color: var(--gold); }
  #archive-root .tab.active svg { opacity: 1; }
  #archive-root .tab.active::after {
    content: ''; position: absolute; bottom: -1px; left: 12%; right: 12%; height: 2px; background: var(--gold);
  }
  #archive-root .tab:hover:not(.active) { color: var(--paper-hi); }

  /* Hamburger drawer menu */
  #archive-root .menu-overlay {
    position: fixed; inset: 0; background: rgba(15,36,34,0.6); z-index: 60;
  }
  #archive-root .menu-drawer {
    position: fixed; top: 0; left: 0; bottom: 0; width: 272px; max-width: 82vw;
    background: var(--bg-deep); z-index: 61; box-shadow: 10px 0 36px rgba(0,0,0,0.55);
    overflow-y: auto; padding: 0 0 18px; display: flex; flex-direction: column;
  }
  #archive-root .menu-drawer-head {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 10px 14px 18px; border-bottom: 1px solid var(--line-dark); margin-bottom: 6px;
  }
  #archive-root .menu-drawer-title {
    font-family: var(--font-display); font-size: 18px; color: var(--cream);
  }
  #archive-root .menu-close-btn { background: transparent; border: none; color: var(--cream-soft); padding: 6px; }
  #archive-root .menu-close-btn svg { width: 18px; height: 18px; }
  #archive-root .menu-item {
    display: flex; align-items: center; gap: 11px; width: 100%; background: transparent; border: none;
    color: var(--cream-soft); padding: 12px 18px; font-size: 16px; text-align: left;
  }
  #archive-root .menu-item svg { width: 18px; height: 18px; opacity: .75; flex-shrink: 0; }
  #archive-root .menu-item.active { color: var(--gold); }
  #archive-root .menu-item.active svg { opacity: 1; }
  #archive-root .menu-item:hover:not(.active) { background: rgba(255,255,255,0.04); color: var(--paper-hi); }
  #archive-root .menu-cat-btn {
    display: flex; align-items: center; justify-content: space-between; width: 100%;
    background: transparent; border: none; color: var(--cream-soft); padding: 12px 18px; font-size: 16px;
  }
  #archive-root .menu-cat-left { display: flex; align-items: center; gap: 11px; }
  #archive-root .menu-cat-btn svg.icon { width: 18px; height: 18px; opacity: .75; }
  #archive-root .menu-cat-btn svg.chev { width: 14px; height: 14px; opacity: .6; transition: transform .15s ease; }
  #archive-root .menu-cat-btn.open svg.chev { transform: rotate(180deg); }
  #archive-root .menu-cat-btn.has-active { color: var(--gold); }
  #archive-root .menu-cat-btn.has-active svg.icon { opacity: 1; }
  #archive-root .menu-cat-btn:hover { background: rgba(255,255,255,0.04); }
  #archive-root .menu-sub-list .menu-item { padding-left: 46px; font-size: 15px; }

  /* Opinions (issue / stance collection) */
  #archive-root .opn-card {
    border: 1px solid var(--line-dark); border-radius: 4px; padding: 14px 16px; margin-bottom: 10px;
    background: transparent; width: 100%; text-align: left; display: block; color: var(--cream);
  }
  #archive-root .opn-card:hover { border-color: var(--gold-soft); }
  #archive-root .opn-card h4 { font-family: var(--font-display); font-size: 18px; margin: 0 0 4px; }
  #archive-root .opn-card .opn-card-meta { font-family: var(--font-mono); font-size: 12px; color: var(--cream-soft); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 8px; }
  #archive-root .opn-mini-bar { display: flex; height: 7px; border-radius: 4px; overflow: hidden; background: rgba(255,255,255,0.08); }
  #archive-root .opn-mini-bar span { height: 100%; }
  #archive-root .opn-back {
    display: inline-flex; align-items: center; gap: 6px; background: transparent; border: none;
    color: var(--cream-soft); font-family: var(--font-mono); font-size: 13px; text-transform: uppercase;
    letter-spacing: 0.04em; padding: 0; margin-bottom: 14px;
  }
  #archive-root .opn-back:hover { color: var(--gold); }
  #archive-root .opn-issue-title { font-family: var(--font-display); font-size: 24px; margin: 0 0 4px; }
  #archive-root .opn-issue-context { font-size: 14.5px; color: var(--cream-soft); margin: 0 0 20px; line-height: 1.6; }
  #archive-root .opn-badge {
    font-family: var(--font-mono); font-size: 11.5px; text-transform: uppercase; letter-spacing: 0.04em;
    padding: 2px 7px; border-radius: 10px; border: 1px solid var(--line-dark); color: var(--cream-soft);
    margin-left: 8px; white-space: nowrap;
  }
  #archive-root .opn-item {
    border: 1px solid var(--line-dark); border-radius: 4px; padding: 11px 14px; margin-bottom: 8px;
    display: flex; justify-content: space-between; gap: 10px; align-items: flex-start;
  }
  #archive-root .opn-item-body { flex: 1; min-width: 0; }
  #archive-root .opn-text { font-size: 15px; line-height: 1.55; margin: 0 0 4px; }
  #archive-root .opn-meta { font-family: var(--font-mono); font-size: 12px; color: var(--cream-soft); display: flex; align-items: center; flex-wrap: wrap; }
  #archive-root .opn-meta a { color: var(--gold); text-decoration: none; margin-left: 8px; }
  #archive-root .opn-del-btn { background: transparent; border: none; color: var(--cream-soft); padding: 2px 4px; flex-shrink: 0; }
  #archive-root .opn-del-btn:hover { color: var(--reject); }
  #archive-root .opn-group { margin-bottom: 22px; }
  #archive-root .opn-group-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px; }
  #archive-root .opn-group-label { font-family: var(--font-display); font-size: 17px; color: var(--cream); display: inline-flex; align-items: center; gap: 9px; }
  #archive-root .opn-group-label i { display: inline-block; width: 11px; height: 11px; border-radius: 3px; flex-shrink: 0; }
  #archive-root .opn-group-pct { font-family: var(--font-mono); font-size: 14px; color: var(--gold); }
  #archive-root .opn-bar-bg { height: 9px; border-radius: 4px; background: rgba(255,255,255,0.08); overflow: hidden; margin-bottom: 10px; }
  #archive-root .opn-bar { height: 100%; }

  /* Card */
  #archive-root .deck { position: relative; height: 580px; max-width: 640px; margin: 0 auto 22px; }
  #archive-root .card {
    position: absolute; inset: 0; background: var(--paper); color: var(--ink); border-radius: var(--radius);
    box-shadow: 0 18px 40px -12px rgba(0,0,0,0.5); padding: 0; overflow: hidden;
    display: flex; flex-direction: column; user-select: none; touch-action: none;
  }
  #archive-root .card.behind { transform: scale(0.96) translateY(10px); box-shadow: 0 8px 20px -10px rgba(0,0,0,0.4); z-index: 1; }
  #archive-root .card.top { z-index: 2; cursor: grab; }
  #archive-root .card-tab {
    position: absolute; top: 0; left: 22px; background: var(--gold); color: var(--bg-deep);
    font-family: var(--font-mono); font-size: 13px; font-weight: 600; letter-spacing: 0.05em;
    padding: 5px 12px 6px; border-radius: 0 0 4px 4px; text-transform: uppercase;
  }
  #archive-root .card-perf {
    height: 10px; margin-top: 26px;
    background-image: radial-gradient(circle, var(--bg) 1.6px, transparent 1.7px);
    background-size: 14px 10px; background-position: 4px center; opacity: 0.35;
  }
  #archive-root .card-body { padding: 20px 26px 10px; flex: 1; display: flex; flex-direction: column; overflow: hidden; }
  #archive-root .card-title {
    font-family: var(--font-display); font-size: 24px; font-weight: 600; line-height: 1.25; margin: 6px 0 4px;
  }
  #archive-root .card-meta {
    font-family: var(--font-mono); font-size: 13px; color: var(--ink-soft); text-transform: uppercase;
    letter-spacing: 0.04em; margin-bottom: 2px;
  }
  #archive-root .more-link {
    font-family: var(--font-mono); font-size: 13px; color: var(--gold); text-decoration: none; letter-spacing: 0.03em;
    border-bottom: 1px solid var(--gold-soft); padding-bottom: 1px; touch-action: manipulation;
  }
  #archive-root .more-link:hover { border-color: var(--gold); }
  #archive-root .no-link {
    font-family: var(--font-mono); font-size: 13px; color: var(--paper-line); font-style: italic;
  }
  #archive-root .card-more { margin-bottom: 14px; }
  #archive-root .card-more.inline-more { margin: 6px 0 0; }
  #archive-root .match-note {
    font-size: 13px; color: var(--bg-deep); background: rgba(200,155,60,0.28); border-left: 2px solid var(--gold);
    padding: 6px 10px; margin-bottom: 12px; font-style: italic; border-radius: 0 3px 3px 0;
  }
  #archive-root .ai-summary { margin-bottom: 12px; }
  #archive-root .ai-summary-label {
    font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em;
    color: var(--ink-soft); margin-bottom: 4px;
  }
  #archive-root .ai-summary-text {
    font-size: 14.5px; line-height: 1.55; color: var(--ink); background: rgba(32,40,31,0.05);
    border-radius: 3px; padding: 8px 10px; margin: 0 0 6px;
  }
  #archive-root .ai-summary-status { font-size: 13px; color: var(--ink-soft); font-style: italic; }
  #archive-root .ai-summary-error { font-size: 13px; color: var(--reject); margin: 4px 0 0; }
  #archive-root .card .btn.ghost { color: var(--ink); border-color: rgba(32,40,31,0.35); }
  #archive-root .card .btn.ghost:hover { color: var(--bg); border-color: var(--bg); background: rgba(32,40,31,0.06); }
  #archive-root .btn.locked { opacity: 0.5; }
  #archive-root .btn.locked:hover { border-color: var(--reject); color: var(--reject); }
  #archive-root .card-scores { border-top: 1px dashed var(--paper-line); padding-top: 10px; margin-top: auto; }
  #archive-root .score-row {
    display: flex; align-items: baseline; justify-content: space-between; font-family: var(--font-mono);
    font-size: 14px; padding: 3px 0; color: var(--ink);
  }
  #archive-root .score-row .dots { flex: 1; overflow: hidden; white-space: nowrap; color: var(--paper-line); margin: 0 6px; }
  #archive-root .score-row b { color: var(--ink); font-weight: 600; min-width: 26px; text-align: right; }
  #archive-root .stamp {
    position: absolute; top: 40%; left: 50%; font-family: var(--font-display); font-weight: 700; font-size: 42px;
    border: 5px solid currentColor; border-radius: 10px; padding: 6px 18px; pointer-events: none;
    transform: translate(-50%,-50%) rotate(-18deg); opacity: 0; letter-spacing: 0.05em;
  }
  #archive-root .stamp.approve { color: var(--approve-deep); }
  #archive-root .stamp.reject { color: var(--reject-deep); }

  #archive-root .swipe-buttons { display: flex; justify-content: center; gap: 22px; }
  #archive-root .stamp-btn {
    width: 60px; height: 60px; border-radius: 50%; border: 2px solid; background: var(--bg);
    display: flex; align-items: center; justify-content: center; transition: transform .12s ease;
  }
  #archive-root .stamp-btn:hover { transform: scale(1.08); }
  #archive-root .stamp-btn.reject { border-color: var(--reject); color: var(--reject); }
  #archive-root .stamp-btn.approve { border-color: var(--approve); color: var(--approve); }
  #archive-root .stamp-btn svg { width: 24px; height: 24px; }

  #archive-root .empty {
    min-height: 480px; display: flex; flex-direction: column; align-items: center; justify-content: center;
    border: 1px dashed var(--line-dark); border-radius: var(--radius); text-align: center; padding: 20px; gap: 10px;
  }
  #archive-root .empty h3 { font-family: var(--font-display); font-size: 22px; margin: 0; }
  #archive-root .empty p { font-size: 15px; color: var(--cream-soft); max-width: 480px; margin: 0; line-height: 1.6; }
  #archive-root .empty button { margin-top: 6px; }

  #archive-root .btn {
    background: var(--gold); color: var(--bg-deep); border: none; padding: 10px 18px; border-radius: 3px;
    font-family: var(--font-mono); font-size: 14px; font-weight: 600; letter-spacing: 0.03em; text-transform: uppercase;
  }
  #archive-root .btn:hover { background: #d8ab4d; }
  #archive-root .btn.ghost { background: transparent; border: 1px solid var(--line-dark); color: var(--cream); }
  #archive-root .btn.ghost:hover { border-color: var(--gold); color: var(--gold); }
  #archive-root .btn.small { padding: 6px 12px; font-size: 13px; }
  #archive-root .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  #archive-root .section-title {
    font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--gold); margin: 0 0 12px; display: flex; align-items: center; gap: 8px;
  }
  #archive-root .section-title::after { content: ''; flex: 1; height: 1px; background: var(--line-dark); }
  #archive-root .section-title:not(:first-child) { margin-top: 30px; }

  /* Form */
  #archive-root .field { margin-bottom: 16px; }
  #archive-root .field label {
    display: block; font-family: var(--font-mono); font-size: 13px; text-transform: uppercase;
    letter-spacing: 0.05em; color: var(--cream-soft); margin-bottom: 6px;
  }
  #archive-root .field input[type=text], #archive-root .field select, #archive-root .field textarea {
    width: 100%; background: var(--paper); color: var(--ink); border: none; border-radius: 3px;
    padding: 10px 12px; font-size: 16px; resize: vertical;
  }
  #archive-root .field textarea { font-family: var(--font-mono); font-size: 14.5px; line-height: 1.6; }
  #archive-root .bulk-note { font-size: 14px; color: var(--cream-soft); margin-bottom: 18px; line-height: 1.6; border-left: 2px solid var(--gold-soft); padding-left: 12px; }
  #archive-root .field-row { display: flex; gap: 12px; }
  #archive-root .field-row .field { flex: 1; }
  #archive-root .toggle-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; font-size: 15px; color: var(--cream-soft); }
  #archive-root .slider-grid { display: grid; grid-template-columns: 1fr; gap: 10px; margin-bottom: 16px; }
  #archive-root .slider-row { display: flex; align-items: center; gap: 10px; }
  #archive-root .slider-row label { width: 110px; font-size: 14px; color: var(--cream-soft); flex-shrink: 0; }
  #archive-root .slider-row input[type=range] { flex: 1; accent-color: var(--gold); }
  #archive-root .slider-row .val { font-family: var(--font-mono); width: 28px; text-align: right; color: var(--gold); font-size: 14px; }

  /* Rejected list */
  #archive-root .rej-chips { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 18px; }
  #archive-root .chip {
    font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em;
    padding: 5px 10px; border-radius: 20px; border: 1px solid var(--line-dark); color: var(--cream-soft);
  }
  #archive-root .chip b { color: var(--gold); margin-left: 4px; }
  #archive-root .rej-item {
    border: 1px solid var(--line-dark); border-radius: 4px; padding: 14px 16px; margin-bottom: 10px;
    display: flex; justify-content: space-between; align-items: flex-start; gap: 10px;
  }
  #archive-root .rej-item .info h4 { font-family: var(--font-display); font-size: 18px; margin: 0 0 4px; }
  #archive-root .rej-item .info .tag { font-family: var(--font-mono); font-size: 12px; color: var(--reject); text-transform: uppercase; }
  #archive-root .rej-item .info .meta2 { font-size: 13px; color: var(--cream-soft); margin-top: 4px; }

  /* Approved vault */
  #archive-root .apv-controls { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; align-items: center; }
  #archive-root .apv-controls .field { margin: 0; }
  #archive-root .apv-controls input[type=text] { min-width: 220px; }
  #archive-root .apv-count { font-family: var(--font-mono); font-size: 13px; color: var(--cream-soft); margin: -6px 0 14px; }
  #archive-root .apv-item { border: 1px solid var(--line-dark); border-radius: 4px; padding: 16px 18px; margin-bottom: 12px; }
  #archive-root .apv-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
  #archive-root .apv-top h4 { font-family: var(--font-display); font-size: 19px; margin: 0 0 4px; line-height: 1.4; }
  #archive-root .apv-top .tag { font-family: var(--font-mono); font-size: 12px; color: var(--gold); text-transform: uppercase; }
  #archive-root .apv-top .meta2 { font-size: 13px; color: var(--cream-soft); margin-top: 4px; }
  #archive-root .apv-badges { display: flex; gap: 14px; flex-shrink: 0; text-align: center; }
  #archive-root .apv-badge .n { font-family: var(--font-display); font-size: 24px; color: var(--gold); line-height: 1.1; }
  #archive-root .apv-badge .l { font-family: var(--font-mono); font-size: 11.5px; color: var(--cream-soft); }
  #archive-root .apv-bars { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px 14px; margin: 12px 0 4px; }
  #archive-root .apv-bar { font-size: 12px; color: var(--cream-soft); }
  #archive-root .apv-bar .track { height: 4px; background: var(--line-dark); border-radius: 2px; margin-top: 3px; overflow: hidden; }
  #archive-root .apv-bar .track i { display: block; height: 100%; background: var(--sage, #6f8f6a); }
  #archive-root .apv-note { width: 100%; box-sizing: border-box; margin-top: 12px; min-height: 44px; resize: vertical; background: transparent; color: var(--cream); border: 1px dashed var(--line-dark); border-radius: 3px; padding: 8px 10px; font: inherit; font-size: 14px; }
  #archive-root .apv-note:focus { outline: none; border-color: var(--gold); border-style: solid; }
  #archive-root .apv-actions { display: flex; justify-content: flex-end; margin-top: 10px; }
  @media (max-width: 600px) {
    #archive-root .apv-top { flex-direction: column; }
    #archive-root .apv-bars { grid-template-columns: repeat(2, 1fr); }
    #archive-root .apv-controls input[type=text] { min-width: 0; width: 100%; }
  }

  /* Accuracy */
  #archive-root .acc-bars { display: flex; align-items: flex-end; gap: 10px; margin: 4px 0 8px; overflow-x: auto; padding-bottom: 4px; }
  #archive-root .acc-col { display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-width: 38px; font-family: var(--font-mono); font-size: 11.5px; color: var(--cream-soft); }
  #archive-root .acc-bar { width: 22px; background: var(--approve); border-radius: 3px 3px 0 0; margin-bottom: 3px; }
  #archive-root .acc-col em { font-style: normal; font-size: 10.5px; opacity: .75; }

  /* Sharing / groups */
  #archive-root .sel-bar { display: flex; align-items: center; flex-wrap: wrap; gap: 10px 14px; padding: 10px 14px; margin: 0 0 14px; border: 1px solid var(--line-dark); border-radius: 4px; background: rgba(243,238,223,0.03); }
  #archive-root .sel-bar label { display: flex; align-items: center; gap: 8px; font-size: 14.5px; color: var(--cream-soft); cursor: pointer; }
  #archive-root .sel-bar .cnt { font-family: var(--font-mono); font-size: 13px; color: var(--gold); }
  #archive-root .sel-bar .grow { flex: 1; }
  #archive-root .sel-bar input[type=checkbox], #archive-root .sel-box input, #archive-root .sm-pick input, #archive-root .toggle-row input[type=checkbox] { width: 18px; height: 18px; accent-color: var(--gold); margin: 0; }
  #archive-root .sel-box { position: absolute; left: 14px; top: 16px; display: block; cursor: pointer; padding: 2px; }
  #archive-root .apv-item.sel, #archive-root .rej-item.sel { position: relative; padding-left: 46px; }
  #archive-root .apv-item.picked, #archive-root .rej-item.picked { border-color: var(--gold); background: rgba(200,155,60,0.06); }
  #archive-root .rej-item .info { flex: 1; min-width: 0; }
  #archive-root .pill { font-family: var(--font-mono); font-size: 12px; padding: 2px 8px; border-radius: 10px; border: 1px solid currentColor; margin-left: 4px; white-space: nowrap; }
  #archive-root .pill.ok { color: var(--approve); }
  #archive-root .pill.no { color: var(--reject); }
  #archive-root .apv-top h4 a { color: inherit; text-decoration: underline; text-decoration-color: var(--line-dark); text-underline-offset: 3px; }
  #archive-root .apv-top h4 a:hover { color: var(--gold); }
  #archive-root .sh-sum, #archive-root .sh-note { margin: 10px 0 0; font-size: 14px; line-height: 1.65; color: var(--cream-soft); }
  #archive-root .sh-sum b, #archive-root .sh-note b { color: var(--gold); font-weight: 500; margin-right: 4px; }
  #archive-root .apv-actions { gap: 8px; flex-wrap: wrap; }
  #archive-root .modal.share-modal { background: var(--bg); color: var(--cream); border: 1px solid var(--line-dark); max-width: 520px; max-height: 90vh; overflow: auto; }
  #archive-root .modal.share-modal .sub2 { color: var(--cream-soft); line-height: 1.6; }
  #archive-root .modal.share-modal .sub2 b { color: var(--cream); }
  #archive-root .sm-actions { display: flex; gap: 8px; flex-wrap: wrap; margin: 14px 0 6px; align-items: center; }
  #archive-root .sm-hint { font-size: 13.5px; line-height: 1.6; color: var(--cream-soft); margin: 4px 0 8px; }
  #archive-root .sm-hint b { color: var(--cream); }
  #archive-root .sm-picks { display: flex; flex-direction: column; gap: 8px; }
  #archive-root .sm-pick { display: flex; align-items: center; gap: 10px; padding: 9px 12px; border: 1px solid var(--line-dark); border-radius: 4px; font-size: 15px; cursor: pointer; }
  #archive-root .sm-pick span { margin-left: auto; font-family: var(--font-mono); font-size: 12.5px; color: var(--cream-soft); }
  #archive-root .btn-link { display: inline-block; text-decoration: none; text-align: center; }
  #archive-root .grp-card { display: block; width: 100%; text-align: left; background: transparent; color: var(--cream); border: 1px solid var(--line-dark); border-radius: 4px; padding: 14px 16px; margin-bottom: 10px; }
  #archive-root .grp-card:hover { border-color: var(--gold); }
  #archive-root .grp-card h4 { font-family: var(--font-display); font-size: 19px; margin: 0 0 4px; }
  #archive-root .grp-card .meta2 { font-size: 13px; color: var(--cream-soft); }
  #archive-root .viewer-brand { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold); margin: 6px 0 14px; }
  #archive-root .viewer-title { font-family: var(--font-display); font-size: 30px; line-height: 1.3; margin: 0 0 6px; font-weight: 500; word-break: keep-all; }
  #archive-root .viewer-meta { font-size: 14px; color: var(--cream-soft); margin-bottom: 18px; }

  /* Compare */
  #archive-root .compare-controls { display: flex; gap: 10px; margin-bottom: 18px; align-items: center; flex-wrap: wrap; }
  #archive-root .mode-toggle { display: flex; border: 1px solid var(--line-dark); border-radius: 20px; overflow: hidden; }
  #archive-root .mode-toggle button {
    background: transparent; border: none; color: var(--cream-soft); padding: 7px 16px; font-size: 14px; font-family: var(--font-mono);
  }
  #archive-root .mode-toggle button.active { background: var(--gold); color: var(--bg-deep); }
  #archive-root .mode-toggle button.locked { color: var(--paper-line); }
  #archive-root .mode-toggle button.locked:hover { color: var(--reject); }
  #archive-root .compare-pair { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
  #archive-root .compare-card {
    background: var(--paper); color: var(--ink); border-radius: 4px; padding: 16px; position: relative;
  }
  #archive-root .compare-card .letter {
    position: absolute; top: -10px; left: 12px; background: var(--bg-deep); color: var(--gold);
    font-family: var(--font-mono); font-size: 13px; padding: 2px 8px; border-radius: 10px;
  }
  #archive-root .compare-card h4 { font-family: var(--font-display); font-size: 18px; margin: 6px 0 4px; }
  #archive-root .compare-card .meta2 { font-family: var(--font-mono); font-size: 12px; color: var(--ink-soft); text-transform: uppercase; }
  #archive-root .crit-row { border: 1px solid var(--line-dark); border-radius: 4px; padding: 10px 14px; margin-bottom: 8px; }
  #archive-root .crit-row .crit-label { font-size: 14px; color: var(--cream-soft); margin-bottom: 8px; font-family: var(--font-mono); text-transform: uppercase; letter-spacing: 0.03em; }
  #archive-root .crit-choices { display: grid; grid-template-columns: 1fr auto 1fr; gap: 6px; align-items: center; }
  #archive-root .crit-choices button {
    background: transparent; border: 1px solid var(--line-dark); color: var(--cream); padding: 7px 6px; border-radius: 3px; font-size: 14px;
  }
  #archive-root .crit-choices button.picked { background: var(--gold); color: var(--bg-deep); border-color: var(--gold); }
  #archive-root .crit-choices .tie-btn { font-family: var(--font-mono); font-size: 12px; color: var(--cream-soft); border: none; background: transparent; }
  #archive-root .overall-box { border: 1px solid var(--gold-soft); border-radius: 4px; padding: 14px; margin: 18px 0; }
  #archive-root .overall-box .q { font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--gold); margin-bottom: 10px; }
  #archive-root .overall-choices { display: flex; gap: 10px; }
  #archive-root .overall-choices button {
    flex: 1; background: transparent; border: 1px solid var(--line-dark); color: var(--cream); padding: 10px; border-radius: 3px; font-size: 15px;
  }
  #archive-root .overall-choices button.picked { background: var(--approve); border-color: var(--approve); color: #fff; }

  /* Profile */
  #archive-root .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 10px; margin-bottom: 26px; }
  #archive-root .stat-box { border: 1px solid var(--line-dark); border-radius: 4px; padding: 12px; text-align: center; }
  #archive-root .stat-box .n { font-family: var(--font-display); font-size: 26px; color: var(--gold); }
  #archive-root .stat-box .l { font-family: var(--font-mono); font-size: 12px; color: var(--cream-soft); text-transform: uppercase; margin-top: 2px; }
  #archive-root .weight-row { margin-bottom: 10px; }
  #archive-root .weight-row .wl { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 4px; }
  #archive-root .weight-row .wl b { font-family: var(--font-mono); color: var(--gold); }
  #archive-root .weight-bar-bg { height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
  #archive-root .weight-bar { height: 100%; border-radius: 4px; }
  #archive-root .rec-item {
    display: flex; justify-content: space-between; align-items: center; padding: 10px 14px;
    border: 1px solid var(--line-dark); border-radius: 4px; margin-bottom: 8px;
  }
  #archive-root .rec-item .t { font-size: 15px; }
  #archive-root .rec-item .t .f { display: block; font-family: var(--font-mono); font-size: 12px; color: var(--cream-soft); text-transform: uppercase; margin-top: 2px; }
  #archive-root .rec-item .pct { font-family: var(--font-mono); color: var(--gold); font-weight: 600; }
  #archive-root .dist-row { display: flex; justify-content: space-between; font-size: 14px; padding: 6px 0; border-bottom: 1px solid var(--line-dark); }
  #archive-root .acct-block { border: 1px solid var(--line-dark); border-radius: 4px; padding: 16px; margin-bottom: 14px; }
  #archive-root .acct-block.acct-danger { border-color: rgba(181,87,63,0.4); }
  #archive-root .acct-label { font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--gold); margin-bottom: 12px; }
  #archive-root .acct-msg { font-size: 14px; margin: -4px 0 12px; }
  #archive-root .acct-msg.ok { color: var(--approve); }
  #archive-root .acct-msg.err { color: var(--reject); }
  #archive-root .model-list {
    max-height: 240px; overflow-y: auto; border: 1px solid var(--line-dark); border-radius: 4px; margin-bottom: 14px;
  }
  #archive-root .model-list-item {
    display: flex; align-items: baseline; gap: 10px; width: 100%; text-align: left; background: transparent;
    border: none; border-bottom: 1px solid var(--line-dark); color: var(--cream); padding: 10px 12px; font-size: 14.5px;
  }
  #archive-root .model-list-item:last-child { border-bottom: none; }
  #archive-root .model-list-item:hover { background: rgba(200,155,60,0.08); }
  #archive-root .model-list-item.active { background: rgba(200,155,60,0.18); }
  #archive-root .model-list-item .mn { font-family: var(--font-mono); color: var(--gold); }
  #archive-root .model-list-item .md { color: var(--cream-soft); font-size: 13.5px; }
  #archive-root .model-list-item .mc { margin-left: auto; font-family: var(--font-mono); font-size: 12px; color: var(--approve); white-space: nowrap; }

  #archive-root .toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: var(--paper); color: var(--ink);
    padding: 10px 20px; border-radius: 20px; font-size: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.4); z-index: 50;
  }
  #archive-root .modal-overlay {
    position: fixed; inset: 0; background: rgba(15,36,34,0.75); display: flex; align-items: center; justify-content: center;
    z-index: 40; padding: 20px;
  }
  #archive-root .modal {
    background: var(--paper); color: var(--ink); border-radius: 6px; padding: 28px; max-width: 460px; width: 100%;
  }
  #archive-root .modal h3 { font-family: var(--font-display); font-size: 21px; margin: 0 0 4px; }
  #archive-root .modal .sub2 { font-size: 14px; color: var(--ink-soft); margin-bottom: 16px; }
  #archive-root .reason-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 14px; }
  #archive-root .reason-grid button {
    background: var(--bg); color: var(--cream); border: 1px solid transparent; padding: 10px 8px; border-radius: 4px; font-size: 14px;
  }
  #archive-root .reason-grid button:hover { border-color: var(--gold); }
  #archive-root .modal .cancel { width: 100%; background: transparent; border: 1px solid var(--paper-line); color: var(--ink-soft); padding: 8px; border-radius: 4px; font-size: 14px; }

  /* Help tab + first-run tutorial */
  #archive-root .help-lead, #archive-root .help-step p, #archive-root .help-acc .help-body, #archive-root .help-note,
  #archive-root .help-crit div, #archive-root .tut-body, #archive-root .tut-modal h3 { word-break: keep-all; overflow-wrap: break-word; }
  #archive-root .help-lead { font-size: 17px; line-height: 1.75; color: var(--cream); margin: 0 0 22px; max-width: 820px; }
  #archive-root .help-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 26px; }
  #archive-root .help-step { border: 1px solid var(--line-dark); border-radius: 4px; padding: 16px 16px 18px; background: rgba(243,238,223,0.03); }
  #archive-root .help-step .no { font-family: var(--font-mono); font-size: 13px; color: var(--gold); }
  #archive-root .help-step h4 { font-family: var(--font-display); font-size: 19px; margin: 6px 0 6px; }
  #archive-root .help-step p { margin: 0; font-size: 14.5px; line-height: 1.6; color: var(--cream-soft); }
  #archive-root .help-acc { border-top: 1px solid var(--line-dark); }
  #archive-root .help-acc:last-of-type { border-bottom: 1px solid var(--line-dark); }
  #archive-root .help-acc summary { cursor: pointer; padding: 14px 4px; font-size: 16.5px; color: var(--cream); list-style: none; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
  #archive-root .help-acc summary::-webkit-details-marker { display: none; }
  #archive-root .help-acc summary::after { content: '+'; font-family: var(--font-mono); color: var(--gold); font-size: 20px; line-height: 1; }
  #archive-root .help-acc[open] summary::after { content: '–'; }
  #archive-root .help-acc .help-body { padding: 0 4px 16px; font-size: 15px; line-height: 1.7; color: var(--cream-soft); }
  #archive-root .help-acc .help-body b { color: var(--cream); }
  #archive-root .help-crit { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px 22px; margin-bottom: 8px; }
  #archive-root .help-crit div { font-size: 14.5px; line-height: 1.55; color: var(--cream-soft); }
  #archive-root .help-crit b { color: var(--gold); font-weight: 600; margin-right: 6px; }
  #archive-root .help-note { border: 1px dashed var(--line-dark); border-radius: 4px; padding: 14px 16px; font-size: 14.5px; line-height: 1.7; color: var(--cream-soft); margin: 0 0 8px; }
  #archive-root .help-note b { color: var(--cream); }
  #archive-root .modal.tut-modal { max-width: 560px; padding: 30px 32px 24px; position: relative; }
  #archive-root .tut-count { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink-soft); letter-spacing: 0.08em; }
  #archive-root .tut-close { position: absolute; top: 14px; right: 14px; background: transparent; border: none; color: var(--ink-soft); width: 32px; height: 32px; padding: 6px; }
  #archive-root .tut-close svg { width: 100%; height: 100%; }
  #archive-root .tut-icon { width: 60px; height: 60px; border-radius: 50%; background: var(--bg); color: var(--gold); display: flex; align-items: center; justify-content: center; margin: 14px 0 14px; }
  #archive-root .tut-icon svg { width: 30px; height: 30px; }
  #archive-root .tut-modal h3 { font-size: 25px; margin: 0 0 10px; line-height: 1.35; }
  #archive-root .tut-body { font-size: 16.5px; line-height: 1.75; color: var(--ink); min-height: 150px; }
  #archive-root .tut-body p { margin: 0 0 10px; }
  #archive-root .tut-body ul { margin: 0 0 10px; padding-left: 20px; }
  #archive-root .tut-body li { margin-bottom: 6px; }
  #archive-root .tut-body .tut-hint { font-size: 14.5px; color: var(--ink-soft); }
  #archive-root .tut-dots { display: flex; gap: 8px; justify-content: center; margin: 14px 0 18px; }
  #archive-root .tut-dots button { width: 9px; height: 9px; padding: 0; border-radius: 50%; border: none; background: var(--paper-line); }
  #archive-root .tut-dots button.on { background: var(--gold); width: 22px; border-radius: 5px; }
  #archive-root .tut-actions { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  #archive-root .tut-actions .tut-skip { background: transparent; border: none; color: var(--ink-soft); font-size: 14.5px; padding: 8px 4px; text-decoration: underline; }
  #archive-root .tut-actions .right { display: flex; gap: 8px; }
  @media (max-width: 800px) {
    #archive-root .help-steps { grid-template-columns: repeat(2, 1fr); }
    #archive-root .help-crit { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 480px) {
    #archive-root .help-steps, #archive-root .help-crit { grid-template-columns: 1fr; }
    #archive-root .modal.tut-modal { padding: 26px 22px 20px; }
  }

  @media (max-width: 600px) {
    #archive-root .header { flex-wrap: wrap; row-gap: 12px; }
    #archive-root .header .counts { width: 100%; display: flex; gap: 18px; text-align: left; line-height: 1.4; }
    #archive-root .header .counts br { display: none; }
    #archive-root .header .title-block .eyebrow { letter-spacing: 0.1em; }
  }
  @media (max-width: 480px) {
    #archive-root .stat-grid { grid-template-columns: repeat(2,1fr); }
    #archive-root .compare-pair { grid-template-columns: 1fr; }
    #archive-root .crit-choices { grid-template-columns: 1fr 1fr; }
    #archive-root .card-title { font-size: 20px; }
  }

  /* per-field taste tag */
  #archive-root .taste-tag { font-style: normal; font-family: var(--font-mono); font-size: 10.5px; color: var(--gold); border: 1px solid var(--line-dark); border-radius: 8px; padding: 1px 6px; margin-left: 6px; vertical-align: 1px; }
