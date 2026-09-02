import { MockTelephonyProvider } from "./adapters/mock";
import {
  asteriskProvider,
  mangoProvider,
  uisProvider,
  zadarmaProvider,
} from "./adapters/stubs";
import type { TelephonyProvider } from "./types";

const providers: Record<string, TelephonyProvider> = {
  mock: new MockTelephonyProvider(),
  mango: mangoProvider,
  uis: uisProvider,
  zadarma: zadarmaProvider,
  asterisk: asteriskProvider,
};

export function getTelephonyProvider(): TelephonyProvider {
  const name = process.env.TELEPHONY_PROVIDER ?? "mock";
  return providers[name] ?? providers.mock;
}
