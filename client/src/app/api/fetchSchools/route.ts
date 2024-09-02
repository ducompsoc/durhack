import { NextResponse } from 'next/server';
import { getVerifiedSchoolsList } from '@/data/verified-schools';

export async function GET() {
  try {
    const schoolOptions = (await getVerifiedSchoolsList()).map(schoolName => ({
      label: schoolName,
      value: schoolName,
    }));

    return NextResponse.json({ schoolOptions });
  } catch (error) {
    return NextResponse.error();
  }
}