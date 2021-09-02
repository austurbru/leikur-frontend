import { getPlaiceholder } from "plaiceholder";
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

const LessonPage = ({ page, navSlugs }: Props) => {

  const pageKey = page.pageInfo.slug;

  switch (page.__component) {
    case "page-content.instructions-and-text":
      return <InstructionsAndText page={page} navSlugs={navSlugs} key={pageKey} />;
    case "page-content.short-text-with-translation":
      return <ShortTextWithTranslation page={page} navSlugs={navSlugs} key={pageKey} />;
    case "page-content.select-word":
      return <ListenAndSelectWord page={page} navSlugs={navSlugs} key={pageKey} />;
    case "page-content.true-or-false":
      return <TrueOrFalse page={page} navSlugs={navSlugs} key={pageKey} />;
    default:
      return <TemplateMissing />;
  }
};

export default LessonPage;

//Function that creates individual Pages------------------------------------
export async function getStaticProps(context: { params: any; locale: any }) {
  //the props are coming from GetStaticPaths

  const { params } = context;
  const locale = context.locale;

  const lessonKey = params.slug.split("-")[0] + "-" + params.slug.split("-")[1];
  const resLocalizedLessons = await fetch(`${API_URL}/lessons?key=${lessonKey}&_locale=${locale}`);
  const resDefaultLessons = await fetch(`${API_URL}/lessons?key=${lessonKey}`);
  const localizedLessons = await resLocalizedLessons.json();
  const defaultLessons = await resDefaultLessons.json();
  const localizedLesson = localizedLessons[0];
  const defaultLesson = defaultLessons[0];
  
  let page: any = null;
  let previousSlug = "";
  let nextSlug = "";
  let currentSlug = "";

  if (defaultLesson.pages !== undefined){
    for (let j = 0; j < defaultLesson.pages.length ; j++) {
      if (defaultLesson.pages[j].pageInfo.slug === params.slug) {
        page = defaultLesson.pages[j];
        try {
          const localizedPage = localizedLesson.pages[j];
          if (localizedPage?.pageInfo !== null){
            page = localizedPage;
          }
        } catch (error) {
          console.log(`Page: ${defaultLesson.pages[j].pageInfo.slug} is not found localized`)
        }
        if (page.media?.image) {
          const { base64 } = await getPlaiceholder(page.media?.image.url);
          page.blurredImage = base64;
        } else {
          page.blurredImage = "";
        }
  
        currentSlug = defaultLesson.pages[j].pageInfo.slug;
        if (j > 0) {
          previousSlug = `/lessons/${defaultLesson.pages[j - 1].pageInfo.slug}`;
        }
  
        if (j < defaultLesson.pages.length - 1) {
          nextSlug = `/lessons/${defaultLesson.pages[j + 1].pageInfo.slug}`;
        }
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

    const paths = pages.map((page) => ({ params: { slug: page.pageInfo.slug }, locale: `${currentLocale}` }));
    localizedPaths.push(...paths);
  }

  //Returns the pages that found in Strapi
  return {
    paths: localizedPaths,
    fallback: false,
  };
}
