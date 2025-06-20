import { somar } from "@/index";

test("Deve somar 2 números", () => {
  expect(somar(1, 2)).toBe(3);
});
