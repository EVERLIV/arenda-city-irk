import type {
  CallResult,
  CallStatus,
  TelephonyProvider,
  WebhookResponse,
} from "../types";

export class MockTelephonyProvider implements TelephonyProvider {
  name = "mock";

  async initiateCallback(
    phone: string,
    metadata?: Record<string, string>,
  ): Promise<CallResult> {
    const callId = `mock-${Date.now()}`;
    console.log("[MockTelephony] Callback initiated:", { phone, metadata, callId });
    return {
      success: true,
      callId,
      message: "Заявка на обратный звонок принята (mock)",
    };
  }

  async handleWebhook(payload: unknown): Promise<WebhookResponse> {
    console.log("[MockTelephony] Webhook received:", payload);
    return {
      action: "play_message",
      message:
        "Здравствуйте! Вы позвонили в агентство Аренда Сити. Наш специалист свяжется с вами. Какая категория недвижимости вас интересует?",
    };
  }

  async getCallStatus(callId: string): Promise<CallStatus> {
    return {
      callId,
      status: "completed",
      duration: 0,
    };
  }
}
