import About from "@/components/AboutComponent";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import Projects from "@/components/ProjectsComponent";
import Skills from "@/components/Skills";
import { getAboutData, getExperiencData, getHeroData, getProjectsData, getSkillsData } from "@/sanity/sanity-utils";
import { ExperienceType, SkillType } from "@/types";
import { AboutType } from "@/types/AboutType";
import { HeroType } from "@/types/HeroType";
import { ProjectType } from "@/types/ProjectType";

export default async function Home() {
  const heroData: HeroType = await getHeroData()
  
  const skillData: SkillType[] = await getSkillsData()
  const experienceData: ExperienceType[] = await getExperiencData()

  return (
    <main>
      <div className="overflow-y-scroll snap-y snap-mandatory scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary">

          <Hero heroData={heroData} />

        {/* 

        

        <section id="skills" className="h-screen snap-start">
          <Skills skillData={skillData} />
        </section>

        <section id="experience" className="h-screen snap-start">
          <Experience experienceData={experienceData} />
        </section>

        <section id="contact" className="h-screen snap-start">
          <Contact />
        </section> */}
        
      </div>
    </main>
  );
}


