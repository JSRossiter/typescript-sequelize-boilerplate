declare module 'node-pagerduty' {
  export type PDSeverity = 'critical' | 'error' | 'warning' | 'info';
  interface EventTriggerPayload {
    routing_key: string;
    event_action: 'trigger' | 'acknowledge' | 'resolve';
    dedup_key?: string;
    payload: {
      summary: string;
      source: string;
      severity: PDSeverity;
      custom_details?: unknown;
      timestamp?: string;
      component?: string;
      group?: string;
    };
  }
  interface EventResolvePayload {
    routing_key: string;
    event_action: 'acknowledge' | 'resolve';
    dedup_key: string;
  }
  interface EventResponse {
    status: 'success';
    message: 'Event processed';
    dedup_key: string;
  }
  declare class PagerDutyClient {
    constructor(key: string);
    events: {
      sendEvent: (
        payload: EventTriggerPayload | EventResolvePayload,
      ) => Promise<EventResponse>;
    };
  }
  export { PagerDutyClient as default };
}
