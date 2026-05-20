/**
 * HandoverDashboard — verbatim drop-in of Silv's TotalDash mock
 * (https://www.total-dash.com/scale.html). Self-contained: one
 * <style> block + one <section class="tds-section">. All class
 * names are tds-* prefixed so they don't collide with the rest of
 * the site, and the CSS variables defined on :root in that file
 * only apply via those prefixed selectors.
 *
 * Notes on the verbatim port:
 *  - The Google Fonts <link> for Inter is dropped: Inter is already
 *    loaded site-wide via next/font/google in app/layout.tsx, and the
 *    CSS font stack starts with "Inter", so the same family resolves.
 *  - id="handover" + scroll-mt-24 added on the <section> so the
 *    existing nav anchor still works; these don't change rendering.
 *  - The CSS is injected via <style dangerouslySetInnerHTML> because
 *    React's <style> element strips child text nodes.
 *  - SVG attribute names converted to camelCase (strokeWidth etc.);
 *    class -> className. Nothing else changed.
 */

const TDS_STYLES = `
  /* ============================================================
     TotalDash drop-in section — Conversations mockup.
     Middle: live thread (AI intro, handover line, sender icons,
     AI-enhanced composer). Right: handover card, customer
     details, AI summary. No browser chrome, no nav rail.
     Handoff: copy this <style> once + the <section>.
     ============================================================ */
  :root{
    --tds-blue:#2563EB; --tds-blue-600:#1d4ed8; --tds-blue-50:#eef3ff;
    --tds-ink:#0a0a0a; --tds-ink-2:oklch(38% 0.005 80);
    --tds-body:#3f3f46; --tds-muted:#71717a;
    --tds-line:oklch(93% 0.005 80); --tds-line-2:oklch(88% 0.005 80);
    --tds-bg:#FAFAFA; --tds-surface:#FFFFFF;
    --tds-surface-2:oklch(97% 0.003 80);
  }
  .tds-section,.tds-section *{box-sizing:border-box;margin:0;padding:0}
  .tds-section{font-family:"Inter",system-ui,-apple-system,Segoe UI,Roboto,
    sans-serif;background:var(--tds-bg);color:var(--tds-body);
    -webkit-font-smoothing:antialiased}
  .tds-wrap{max-width:1140px;margin:0 auto;padding:84px 24px}
  @media(max-width:640px){.tds-wrap{padding:54px 16px}}
  .tds-eyebrow{font-size:11px;font-weight:600;letter-spacing:.13em;
    text-transform:uppercase;color:var(--tds-blue)}
  .tds-h2{margin-top:14px;font-size:clamp(27px,4vw,40px);font-weight:700;
    letter-spacing:-.022em;line-height:1.1;color:var(--tds-ink);max-width:18ch}
  .tds-sub{margin-top:15px;font-size:16.5px;line-height:1.6;
    color:var(--tds-muted);max-width:56ch}
  .tds-stage{margin-top:42px}

  /* department pills (exact pastel oklch families) ------------- */
  .tds-dept{display:inline-flex;align-items:center;gap:5px;border-radius:999px;
    padding:2px 9px;font-size:10px;font-weight:600;border:1px solid;
    white-space:nowrap}
  .tds-dept .pd{width:6px;height:6px;border-radius:50%;background:currentColor}
  .d-sage{background:oklch(94% .04 155);color:oklch(34% .09 155);
    border-color:oklch(34% .09 155 / .26)}

  /* screenshot frame (no chrome, no nav) ---------------------- */
  .tds-shot{border-radius:18px;border:1px solid var(--tds-line);
    background:var(--tds-surface);overflow:hidden;
    box-shadow:0 1px 2px rgba(10,10,10,.04),0 30px 70px -34px rgba(10,10,10,.30)}
  .tds-grid{display:grid;grid-template-columns:1fr 344px}
  @media(max-width:860px){.tds-grid{grid-template-columns:1fr}
    .tds-rp{border-left:0;border-top:1px solid var(--tds-line)}}

  /* transcript ------------------------------------------------ */
  .tds-tx{display:flex;flex-direction:column;min-width:0;
    background:var(--tds-bg)}
  .tds-th{display:flex;align-items:center;gap:11px;padding:14px 18px;
    border-bottom:1px solid var(--tds-line);background:var(--tds-surface)}
  .tds-av{width:32px;height:32px;border-radius:50%;flex:none;color:#fff;
    font-size:12px;font-weight:600;display:flex;align-items:center;
    justify-content:center}
  .tds-nm{font-size:13.5px;font-weight:600;color:var(--tds-ink)}
  .tds-th .st{font-size:11px;color:#15803d;display:flex;align-items:center;
    gap:5px;margin-top:2px}
  .tds-statdot{width:7px;height:7px;border-radius:50%;display:inline-block}
  .tds-msgs{flex:1;padding:18px;display:flex;flex-direction:column;gap:13px;
    overflow:hidden}

  /* message row + little sender icon -------------------------- */
  .tds-m{display:flex;gap:8px;align-items:flex-start;max-width:82%}
  .tds-m.l{align-self:flex-start}
  .tds-m.r{align-self:flex-end;flex-direction:row-reverse}
  .tds-mi{width:22px;height:22px;border-radius:50%;flex:none;display:flex;
    align-items:center;justify-content:center;margin-top:1px}
  .tds-mi svg{width:12px;height:12px}
  .tds-mi.cu{background:var(--tds-surface-2);color:var(--tds-muted);
    border:1px solid var(--tds-line)}
  .tds-mi.agt{background:var(--tds-ink);color:#fff}
  .tds-mi.aii{background:var(--tds-blue-50);color:var(--tds-blue)}
  .tds-b{font-size:12.5px;line-height:1.5;padding:9px 12px;border-radius:12px}
  .tds-b.u{background:var(--tds-surface);border:1px solid var(--tds-line);
    color:var(--tds-body);border-top-right-radius:4px;
    box-shadow:0 1px 2px rgba(10,10,10,.05)}
  .tds-b.ag{background:var(--tds-ink);color:#fff;border-top-left-radius:4px}
  .tds-b.ai{background:var(--tds-blue-50);color:var(--tds-ink);
    border-top-left-radius:4px}
  .tds-bt{font-size:10px;color:var(--tds-muted);margin-top:4px}
  .tds-m.r .tds-bt{text-align:right}
  .tds-sys{display:flex;align-items:center;gap:10px;margin:3px 2px}
  .tds-sys .ln{flex:1;height:1px;background:var(--tds-line)}
  .tds-sys .tx{font-size:10.5px;font-weight:500;color:var(--tds-muted);
    display:flex;align-items:center;gap:6px;white-space:nowrap}
  .tds-sys .tx svg{width:12px;height:12px}

  /* composer (cleaned icons) ---------------------------------- */
  .tds-comp{margin:0 16px 16px;border:1px solid var(--tds-line);
    border-radius:11px;background:var(--tds-surface);padding:9px 11px;
    display:flex;align-items:center;gap:6px}
  .tds-ci{width:30px;height:30px;border-radius:8px;display:flex;
    align-items:center;justify-content:center;color:var(--tds-muted);flex:none}
  .tds-ci svg{width:16px;height:16px}
  .tds-ci.sp{color:var(--tds-blue)}
  .tds-cph{flex:1;font-size:12.5px;color:var(--tds-muted);padding-left:4px}
  .tds-send{flex:none;background:var(--tds-blue);color:#fff;font-size:12px;
    font-weight:600;border-radius:8px;padding:7px 14px;display:flex;
    align-items:center;gap:6px}
  .tds-send svg{width:13px;height:13px}

  /* right panel ----------------------------------------------- */
  .tds-rp{border-left:1px solid var(--tds-line);background:var(--tds-surface);
    padding:16px;display:flex;flex-direction:column;gap:15px}
  .tds-hc{border:1px solid oklch(34% .10 220 / .42);
    background:oklch(95% .04 220 / .55);border-radius:14px;padding:15px}
  .tds-hc-t{display:flex;align-items:center;gap:8px}
  .tds-hc-t b{font-size:13px;color:var(--tds-ink);font-weight:700}
  .tds-hc-t .clk{margin-left:auto;font-size:11.5px;color:var(--tds-ink-2);
    display:flex;align-items:center;gap:5px;font-variant-numeric:tabular-nums}
  .tds-hc-t .clk svg{width:13px;height:13px}
  .tds-hc-m{margin-top:13px;display:flex;flex-direction:column;gap:10px;
    font-size:12px}
  .tds-hc-m .row{display:flex;justify-content:space-between;align-items:center}
  .tds-hc-m .row>span{color:var(--tds-muted)}
  .tds-hc-m .row b{color:var(--tds-ink);font-weight:600}
  .tds-hc-btns{margin-top:15px;display:flex;gap:8px}
  .tds-bo{flex:1;text-align:center;font-size:12px;font-weight:600;
    border:1px solid var(--tds-line-2);border-radius:9px;padding:8px;
    color:var(--tds-ink);background:var(--tds-surface)}
  .tds-bp{flex:1;text-align:center;font-size:12px;font-weight:600;
    border-radius:9px;padding:8px;color:#fff;background:var(--tds-ink)}

  .tds-panel{border:1px solid var(--tds-line);border-radius:14px;
    background:var(--tds-surface);overflow:hidden}
  .tds-tabs{display:flex;gap:18px;padding:13px 16px 0;
    border-bottom:1px solid var(--tds-line)}
  .tds-tabs .t{font-size:12px;font-weight:600;color:var(--tds-muted);
    padding-bottom:11px}
  .tds-tabs .t.on{color:var(--tds-ink);box-shadow:inset 0 -2px 0 var(--tds-blue)}
  .tds-kv{display:flex;flex-direction:column;gap:11px;padding:14px 16px}
  .tds-kv .row{display:flex;justify-content:space-between;font-size:12px}
  .tds-kv .row span{color:var(--tds-muted)}
  .tds-kv .row b{color:var(--tds-ink);font-weight:600}

  .tds-sum-h{display:flex;align-items:center;gap:8px;padding:12px 15px;
    border-top:1px solid var(--tds-line);background:var(--tds-surface-2)}
  .tds-sum-h .lab{font-size:10px;font-weight:700;letter-spacing:.15em;
    text-transform:uppercase;color:var(--tds-muted);display:flex;
    align-items:center;gap:7px}
  .tds-sum-h .lab svg{width:14px;height:14px;color:var(--tds-blue)}
  .tds-sum-h .rt{margin-left:auto;display:flex;align-items:center;gap:8px;
    font-size:10px;color:var(--tds-muted)}
  .tds-sum-h .rt svg{width:13px;height:13px}
  .tds-sum-b{padding:13px 15px;font-size:12.5px;line-height:1.62;
    color:var(--tds-body)}
  .tds-sum-b b{color:var(--tds-ink);font-weight:600}

`;

export function HandoverDashboard() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: TDS_STYLES }} />
      <section id="handover" className="tds-section scroll-mt-24">
        <div className="tds-wrap">
          <div className="tds-eyebrow">Customer operations at scale</div>
          <h2 className="tds-h2">Pick up any conversation, fully briefed.</h2>
          <p className="tds-sub">
            Every thread carries a live AI summary, the customer&rsquo;s full
            context and one-click handover, so anyone on the team can step in
            and resolve it fast.
          </p>

          <div className="tds-stage">
            <div className="tds-shot">
              <div className="tds-grid">
                {/* middle: thread */}
                <div className="tds-tx">
                  <div className="tds-th">
                    <div className="tds-av" style={{ background: "#15803d" }}>
                      SK
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="tds-nm">Sara Khan</div>
                      <div className="st">
                        <span
                          className="tds-statdot"
                          style={{ background: "#22c55e" }}
                        />{" "}
                        Active now &middot; Web
                      </div>
                    </div>
                    <span className="tds-dept d-sage">
                      <span className="pd" />
                      Sales
                    </span>
                  </div>

                  <div className="tds-msgs">
                    {/* customer (right) */}
                    <div className="tds-m r">
                      <span className="tds-mi cu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b u">Hi, can I switch my plan to annual billing and still keep my 15% loyalty discount?</div>
                        <div className="tds-bt">14:06</div>
                      </div>
                    </div>

                    {/* AI agent (left) */}
                    <div className="tds-m l">
                      <span className="tds-mi aii">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b ai">Of course. I&rsquo;m just going to pass you through to someone on the team now.</div>
                        <div className="tds-bt">14:06 &middot; AI agent</div>
                      </div>
                    </div>

                    <div className="tds-sys">
                      <span className="ln" />
                      <span className="tx">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M16 3l4 4-4 4M20 7H4M8 21l-4-4 4-4M4 17h16" />
                        </svg>{" "}
                        Handed over to Sales &middot; Aisha joined
                      </span>
                      <span className="ln" />
                    </div>

                    {/* human agent (left) */}
                    <div className="tds-m l">
                      <span className="tds-mi agt">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 13a8 8 0 0 1 16 0" />
                          <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1zM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1z" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b ag">Hi Sara. Moving to annual keeps your 15%, and it stacks with the current seasonal 10% for the first year.</div>
                        <div className="tds-bt">14:08 &middot; Aisha</div>
                      </div>
                    </div>

                    {/* customer (right) */}
                    <div className="tds-m r">
                      <span className="tds-mi cu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b u">Amazing. Go ahead and switch me to annual please.</div>
                        <div className="tds-bt">14:09</div>
                      </div>
                    </div>

                    {/* human agent (left) */}
                    <div className="tds-m l">
                      <span className="tds-mi agt">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 13a8 8 0 0 1 16 0" />
                          <path d="M4 13v3a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 1zM20 13v3a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 1z" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b ag">All done. Your plan is annual from today and the updated invoice is on its way.</div>
                        <div className="tds-bt">14:10 &middot; Aisha</div>
                      </div>
                    </div>

                    {/* customer (right) */}
                    <div className="tds-m r">
                      <span className="tds-mi cu">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="8" r="3.5" />
                          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
                        </svg>
                      </span>
                      <div>
                        <div className="tds-b u">Perfect, thank you so much.</div>
                        <div className="tds-bt">14:10</div>
                      </div>
                    </div>
                  </div>

                  <div className="tds-comp">
                    <div className="tds-ci" title="Canned responses">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        <path d="M8 9h8M8 13h5" />
                      </svg>
                    </div>
                    <div className="tds-ci sp" title="AI Enhance">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
                        <path d="M19 4v3M20.5 5.5h-3" />
                      </svg>
                    </div>
                    <div className="tds-ci" title="Attach">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                      </svg>
                    </div>
                    <div className="tds-cph">Reply to Sara</div>
                    <div className="tds-send">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                      </svg>{" "}
                      Send
                    </div>
                  </div>
                </div>

                {/* right: handover + details + summary */}
                <div className="tds-rp">
                  <div className="tds-hc">
                    <div className="tds-hc-t">
                      <span className="tds-statdot" style={{ background: "oklch(34% .10 220)" }} />
                      <b>Handover &middot; Aisha Karim</b>
                      <span className="clk">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="9" />
                          <path d="M12 7v5l3 2" />
                        </svg>{" "}
                        02:14
                      </span>
                    </div>
                    <div className="tds-hc-m">
                      <div className="row">
                        <span>Department</span>
                        <span className="tds-dept d-sage">
                          <span className="pd" />
                          Sales
                        </span>
                      </div>
                      <div className="row">
                        <span>Assigned</span>
                        <b>Aisha Karim</b>
                      </div>
                      <div className="row">
                        <span>Channel</span>
                        <b>Web</b>
                      </div>
                    </div>
                    <div className="tds-hc-btns">
                      <div className="tds-bo">Transfer</div>
                      <div className="tds-bp">End handover</div>
                    </div>
                  </div>

                  <div className="tds-panel">
                    <div className="tds-tabs">
                      <span className="t on">Details</span>
                      <span className="t">History</span>
                    </div>
                    <div className="tds-kv">
                      <div className="row"><span>Customer</span><b>Sara Khan</b></div>
                      <div className="row"><span>Company</span><b>Brightfold Ltd</b></div>
                      <div className="row"><span>Lifetime value</span><b>£6,140</b></div>
                      <div className="row"><span>Conversations</span><b>19</b></div>
                      <div className="row"><span>Customer since</span><b>2022</b></div>
                    </div>
                    <div className="tds-sum-h">
                      <span className="lab">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
                        </svg>{" "}
                        AI Summary
                      </span>
                      <span className="rt">
                        Updated 14:09{" "}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M23 4v6h-6M1 20v-6h6" />
                          <path d="M3.5 9a9 9 0 0 1 14.8-3.4L23 10M1 14l4.7 4.4A9 9 0 0 0 20.5 15" />
                        </svg>
                      </span>
                    </div>
                    <div className="tds-sum-b">
                      Sara is on the <b>Pro plan</b> and asked to move to <b>annual billing</b> while keeping her 15% loyalty discount. Eligibility confirmed, and the discount stacks with the current seasonal promo. Plan switched to annual, updated invoice sent. Sentiment positive, no open issues.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
