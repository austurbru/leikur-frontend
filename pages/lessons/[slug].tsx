import { PagesEntity, Lesson } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
//import TemplateMissing from "@components/TemplateMissing";
// import TextWithImageAndAudio from "@components/TextWithImageAndAudio";
// import TextWithImageAndVideo from "@components/TextWithImageAndVideo";
import { API_URL } from "@config/index";
import SuperSimplePage from '../../components/SuperSimplePage';

interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const LessonPage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  switch (page.__component) {
    case "page-content.image-with-audioXXX":
      return <SuperSimplePage page={page} navSlugs={navSlugs} />;
    case "page-content.video-textXXX":
      return <SuperSimplePage page={page} navSlugs={navSlugs} />;
    case "page-content.super-simple-page":
      return <SuperSimplePage page={page} navSlugs={navSlugs} />;
    default:
      return <SuperSimplePage page={page} navSlugs={navSlugs} />;
  }
};

export default LessonPage;

//Function that creates individual Pages------------------------------------
export async function getStaticProps(context: { params: any }) {
  const { params } = context;
  const res = await fetch(`${API_URL}/lessons`);
  const lessons: Lesson[] = await res.json();

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

//check the possible pages that exists in Strapi
export async function getStaticPaths() {
  //Get all lessons
  const res = await fetch(`${API_URL}/lessons`);
  const lessons: Lesson[] = await res.json();

  const pages: PagesEntity[] = [];

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
    params: { slug: page.pageInfo.slug },
  }));

  //Returns the pages that found in Strapi
  return {
    paths,
    fallback: false,
  };
}