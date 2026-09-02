import type { TelephonyProvider } from "../types";

function createStubProvider(name: string): TelephonyProvider {
  return {
    name,
    async initiateCallback(phone, metadata) {
      console.log(`[${name}] Stub callback:`, { phone, metadata });
      return {
        success: false,
        message: `Адаптер ${name} не настроен. Укажите API-ключи провайдера.`,
      };
    },
    async handleWebhook(payload) {
      console.log(`[${name}] Stub webhook:`, payload);
      return { action: "hangup" };
    },
    async getCallStatus(callId) {
      return { callId, status: "failed" };
    },
  };
}

export const mangoProvider = createStubProvider("mango");
export const uisProvider = createStubProvider("uis");
export const zadarmaProvider = createStubProvider("zadarma");
export const asteriskProvider = createStubProvider("asterisk");
