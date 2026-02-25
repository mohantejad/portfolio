import { NextResponse } from "next/server";
import { getHeroData } from "@/sanity/sanity-utils";

export async function GET() {
  try {
    const hero = await getHeroData();
    return NextResponse.json({ resume: hero.resume || "/Mohanteja_Resume.pdf" });
  } catch {
    return NextResponse.json({ resume: "/Mohanteja_Resume.pdf" });
  }
}
