import { API_URL } from "@config/index";
import { PagesEntity, Lesson } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import TemplateMissing from "@components/LessonPageTemplates/TemplateMissing";
import InstructionsAndText from "@components/LessonPageTemplates/InstructionsAndText";
import ShortTextWithTranslation from "@components/LessonPageTemplates/ShortTextWithTranslation";
import ListenAndSelectWord from "@components/LessonPageTemplates/ListenAndSelectWord";
import TrueOrFalse from "@components/LessonPageTemplates/TrueOrFalse";


interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const LessonPage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  switch (page.__component) {
    case "page-content.instructions-and-text":
      return <InstructionsAndText page={page} navSlugs={navSlugs} />;
    case "page-content.short-text-with-translation":
      return <ShortTextWithTranslation page={page} navSlugs={navSlugs} />;
    case "page-content.select-word":
      return <ListenAndSelectWord page={page} navSlugs={navSlugs} />;
    case "page-content.true-or-false":
      return <TrueOrFalse page={page} navSlugs={navSlugs} />;
    default:
      return <TemplateMissing />;
  }
};
//page-content.true-or-false
export default LessonPage;

//Function that creates individual Pages------------------------------------
export async function getStaticProps(context: { params: any; locale:any; }) {
  const { params } = context;
  const  locale  = context.locale;

  console.log("Current locale in getStaticProps:")
  console.log(locale)

  let lessons: Lesson[] = []
  const resLocalized = await fetch(`${API_URL}/lessons?_locale=${locale}`);
  
  lessons = await resLocalized.json();
  if (lessons.length === 0) {
    const resDefault = await fetch(`${API_URL}/lessons`);
    lessons = await resDefault.json();
    console.log("Ekkert fannst localized")
  }

  let page: any = null;
  let breakFlag = false;
  let previousSlug = "";
  let nextSlug = "";
  let currentSlug = "";

  //Double loop to find the lesson and the page that match the incoming slug
  for (let i = 0; i < lessons.length && breakFlag === false; i++) {
    for (let j = 0; j < lessons[i].pages.length; j++) {
      if (lessons[i].pages[j].pageInfo.slug === params.slug) {
        page = lessons[i].pages[j];
        currentSlug = lessons[i].pages[j].pageInfo.slug;

        if (j > 0) {
          previousSlug = `/lessons/${lessons[i].pages[j - 1].pageInfo.slug}`;
        }

        if (j < lessons[i].pages.length - 1) {
          nextSlug = `/lessons/${lessons[i].pages[j + 1].pageInfo.slug}`;
        }
        breakFlag = true;
        break;
      }
    }
  }

  //To know wich page we are
  const navSlugs = {
    previousSlug: previousSlug,
    currentSlug: currentSlug,
    nextSlug: nextSlug,
  };

  return {
    props: {
      page: page,
      navSlugs: navSlugs,
    },
    // Next.js will attempt to re-generate the page every 15 minutes
    revalidate: 15 * 60,
  };
}
interface LocaleObject {
  locales: string[];
  defaultLocale: string;
}
//check the possible pages that exists in Strapi
export async function getStaticPaths(locales: LocaleObject) {
  const pages: PagesEntity[] = [];
  
  const localizedPaths: any[] = [];

  for (let index = 0; index < locales.locales.length; index++) {
    const currentLocale = locales.locales[index];
    


 // locales.locales.forEach(async (locale) => {
    //Get all lessons
    const res = await fetch(`${API_URL}/lessons`);
    const lessons: Lesson[] = await res.json();


    //double loop
    //1 loop goes thought all the lessons
    lessons.forEach((lesson) => {
      if (lesson.pages) {
        //2nd loop : if the current lesson has pages, we push it into the the "pages" array
        lesson.pages.forEach((page) => {
          pages.push(page);
        });
      }
    });

    //create a new array called "paths"
    const paths = pages.map((page) => ({
      params: { slug: page.pageInfo.slug, locale: `${currentLocale}`},
    }));

    //console.log(currentLocale)
    localizedPaths.push(...paths);

    //console.log("Logging localizedPaths inside loop:")
    //console.log(localizedPaths)

 // });

}

 // console.log("Logging localizedPaths outside of loop")
  //console.log(localizedPaths)

  //Returns the pages that found in Strapi
  return {

    paths: [
      { params: {slug: '1-1-1'}, locale: 'en' },
/*       { params: {slug: '1-1-2'}, locale: 'en' },
      { params: {slug: '1-1-3'}, locale: 'en' },
      { params: {slug: '1-1-4'}, locale: 'en' },
      { params: {slug: '1-1-5'}, locale: 'en' },
      { params: {slug: '1-1-6'}, locale: 'en' },
      { params: {slug: '1-1-7'}, locale: 'en' },
      { params: {slug: '1-1-8'}, locale: 'en' },
      { params: {slug: '1-1-9'}, locale: 'en' },
      { params: {slug: '1-1-10'}, locale: 'en' },
      { params: {slug: '1-1-1'}, locale: 'is' },
      { params: {slug: '1-1-2'}, locale: 'is' },
      { params: {slug: '1-1-3'}, locale: 'is' },
      { params: {slug: '1-1-4'}, locale: 'is' },
      { params: {slug: '1-1-5'}, locale: 'is' },
      { params: {slug: '1-1-6'}, locale: 'is' },
      { params: {slug: '1-1-7'}, locale: 'is' },
      { params: {slug: '1-1-8'}, locale: 'is' },
      { params: {slug: '1-1-9'}, locale: 'is' },
      { params: {slug: '1-1-10'}, locale: 'is' },
      { params: {slug: '1-1-1'}, locale: 'is' },
      { params: {slug: '1-1-2'}, locale: 'is' },
      { params: {slug: '1-1-3'}, locale: 'is' },
      { params: {slug: '1-1-4'}, locale: 'is' },
      { params: {slug: '1-1-5'}, locale: 'is' },
      { params: {slug: '1-1-6'}, locale: 'is' },
      { params: {slug: '1-1-7'}, locale: 'is' },
      { params: {slug: '1-1-8'}, locale: 'is' },
      { params: {slug: '1-1-9'}, locale: 'is' },
      { params: {slug: '1-1-10'}, locale: 'is' },
      { params: {slug: '1-1-1'}, locale: 'es' },
      { params: {slug: '1-1-2'}, locale: 'es' },
      { params: {slug: '1-1-3'}, locale: 'es' },
      { params: {slug: '1-1-4'}, locale: 'es' },
      { params: {slug: '1-1-5'}, locale: 'es' },
      { params: {slug: '1-1-6'}, locale: 'es' },
      { params: {slug: '1-1-7'}, locale: 'es' },
      { params: {slug: '1-1-8'}, locale: 'es' },
      { params: {slug: '1-1-9'}, locale: 'es' },
      { params: {slug: '1-1-10'}, locale: 'es' },
      { params: {slug: '1-1-1'}, locale: 'es' },
      { params: {slug: '1-1-2'}, locale: 'es' },
      { params: {slug: '1-1-3'}, locale: 'es' },
      { params: {slug: '1-1-4'}, locale: 'es' },
      { params: {slug: '1-1-5'}, locale: 'es' },
      { params: {slug: '1-1-6'}, locale: 'es' },
      { params: {slug: '1-1-7'}, locale: 'es' },
      { params: {slug: '1-1-8'}, locale: 'es' },
      { params: {slug: '1-1-9'}, locale: 'es' },
      { params: {slug: '1-1-10'}, locale: 'es' },
      { params: {slug: '1-1-1'}, locale: 'es' },
      { params: {slug: '1-1-2'}, locale: 'es' },
      { params: {slug: '1-1-3'}, locale: 'es' },
      { params: {slug: '1-1-4'}, locale: 'es' },
      { params: {slug: '1-1-5'}, locale: 'es' },
      { params: {slug: '1-1-6'}, locale: 'es' },
      { params: {slug: '1-1-7'}, locale: 'es' },
      { params: {slug: '1-1-8'}, locale: 'es' },
      { params: {slug: '1-1-9'}, locale: 'es' },
      { params: {slug: '1-1-10'}, locale: 'es' },
      { params: {slug: '1-1-1'}, locale: 'pl' },
      { params: {slug: '1-1-2'}, locale: 'pl' },
      { params: {slug: '1-1-3'}, locale: 'pl' },
      { params: {slug: '1-1-4'}, locale: 'pl' },
      { params: {slug: '1-1-5'}, locale: 'pl' },
      { params: {slug: '1-1-6'}, locale: 'pl' },
      { params: {slug: '1-1-7'}, locale: 'pl' },
      { params: {slug: '1-1-8'}, locale: 'pl' },
      { params: {slug: '1-1-9'}, locale: 'pl' },
      { params: {slug: '1-1-10'}, locale: 'pl' },
      { params: {slug: '1-1-1'}, locale: 'ar' },
      { params: {slug: '1-1-2'}, locale: 'ar' },
      { params: {slug: '1-1-3'}, locale: 'ar' },
      { params: {slug: '1-1-4'}, locale: 'ar' },
      { params: {slug: '1-1-5'}, locale: 'ar' },
      { params: {slug: '1-1-6'}, locale: 'ar' },
      { params: {slug: '1-1-7'}, locale: 'ar' },
      { params: {slug: '1-1-8'}, locale: 'ar' },
      { params: {slug: '1-1-9'}, locale: 'ar' },
      { params: {slug: '1-1-10'}, locale: 'ar' }, */
        ],
    
    
   // localizedPaths,

    fallback: false,
  };
}
