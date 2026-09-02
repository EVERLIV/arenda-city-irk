export interface CallResult {
  success: boolean;
  callId?: string;
  message?: string;
}

export interface CallStatus {
  callId: string;
  status: "pending" | "ringing" | "answered" | "completed" | "failed";
  duration?: number;
}

export interface WebhookResponse {
  action: "answer" | "hangup" | "transfer" | "play_message";
  message?: string;
  transferTo?: string;
}

export interface TelephonyProvider {
  name: string;
  initiateCallback(
    phone: string,
    metadata?: Record<string, string>,
  ): Promise<CallResult>;
  handleWebhook(payload: unknown): Promise<WebhookResponse>;
  getCallStatus(callId: string): Promise<CallStatus>;
}
