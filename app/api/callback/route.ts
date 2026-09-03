import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { getTelephonyProvider } from "@/lib/telephony";

const requestSchema = z.object({
  type: z.enum(["callback", "contact", "advertising", "manage"]),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().optional(),
  adType: z.string().optional(),
  area: z.string().optional(),
  objectType: z.string().optional(),
  address: z.string().optional(),
});

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

async function saveLead(data: Record<string, unknown>) {
  try {
    await fs.mkdir(path.dirname(LEADS_FILE), { recursive: true });
    let leads: Record<string, unknown>[] = [];
    try {
      const content = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(content) as Record<string, unknown>[];
    } catch {
      leads = [];
    }
    leads.push({ ...data, createdAt: new Date().toISOString() });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
  } catch (error) {
    console.error("Failed to save lead:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = requestSchema.parse(body);

    await saveLead(data);

    const provider = getTelephonyProvider();
    const result = await provider.initiateCallback(data.phone, {
      type: data.type,
      name: data.name,
    });

    return Response.json({
      success: true,
      message: result.message ?? "Заявка принята! Мы свяжемся с вами.",
      callId: result.callId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Некорректные данные" }, { status: 400 });
    }
    console.error("Callback error:", error);
    return Response.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
