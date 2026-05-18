import { AgentTrace } from "./AgentTrace";
import { cancellationScenario } from "./scenarios";

/**
 * AgentsV4 — Walked-through trace of one real customer message.
 *
 * Now a thin wrapper: AgentTrace does the rendering, scenarios.ts
 * holds the data. This file just picks the cancellation scenario as
 * the canonical V4 example. Other scenarios (sales, renewal, billing)
 * are rendered separately on the preview page using the same
 * AgentTrace component.
 */
export function AgentsV4() {
  return <AgentTrace scenario={cancellationScenario} />;
}
