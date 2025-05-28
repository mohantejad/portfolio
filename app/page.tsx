import Hero from '@/components/Hero';
import { getHeroData } from '@/sanity/sanity-utils';
import { HeroType } from '@/types/HeroType';

export default async function Home() {
  const heroData: HeroType = await getHeroData();

  return <Hero heroData={heroData} />;
}
