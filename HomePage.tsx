import { Hero } from '@/sections/Hero';
import { UrgentProjects } from '@/sections/UrgentProjects';
import { About } from '@/sections/About';
import { Ministries } from '@/sections/Ministries';
import { EducationProject } from '@/sections/EducationProject';
import { FarmProject } from '@/sections/FarmProject';
import { Beneficiaries } from '@/sections/Beneficiaries';
import { Donations } from '@/sections/Donations';
import { SpiritualSection } from '@/sections/SpiritualSection';
import { Store } from '@/sections/Store';
import { Blog } from '@/sections/Blog';
import { Contact } from '@/sections/Contact';

export function HomePage() {
  return (
    <>
      <Hero />
      <UrgentProjects />
      <About />
      <Ministries />
      <EducationProject />
      <FarmProject />
      <Beneficiaries />
      <Donations />
      <SpiritualSection />
      <Store />
      <Blog />
      <Contact />
    </>
  );
}
