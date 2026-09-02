import { getTelephonyProvider } from "@/lib/telephony";

export async function POST(request: Request) {
  const secret = process.env.TELEPHONY_WEBHOOK_SECRET;
  const authHeader = request.headers.get("x-telephony-secret");

  if (secret && authHeader !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const provider = getTelephonyProvider();
    const response = await provider.handleWebhook(payload);

    return Response.json(response);
  } catch (error) {
    console.error("Telephony webhook error:", error);
    return Response.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({
    status: "ok",
    provider: process.env.TELEPHONY_PROVIDER ?? "mock",
    message: "Telephony webhook endpoint is active",
  });
}
