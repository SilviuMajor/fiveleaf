import { AgentTraceCondensed } from "./agents-variants/AgentTraceCondensed";

/**
 * AgentsExplainer — "AI agents in plain English" section on the
 * homepage. Now wraps the V7 condensed variant: one chat-style panel
 * with the 4-stage trace inline as dashed-outline cards, plus an
 * outcomes block + paragraph + CTA below.
 *
 * The five categories (Sales / Retentions / Renewal / Billing /
 * Support) and their scenario data live in
 * `agents-variants/scenarios.ts`. The selector pills, chat panel,
 * stage cards, and cross-fade swap all live in
 * `AgentTraceCondensed`. This file is just configuration.
 */
export function AgentsExplainer() {
  return <AgentTraceCondensed sectionId="agents-explainer" />;
}
