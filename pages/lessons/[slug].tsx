import { PagesEntity, Lesson } from "@models/strapi-types";
import NavSlugs from "@models/nav-slugs";
import TemplateMissing from "@components/TemplateMissing";
import TextWithImageAndAudio from "@components/TextWithImageAndAudio";
import TextWithImageAndVideo from "@components/TextWithImageAndVideo";
import { API_URL } from "@config/index";


interface Props {
  page: PagesEntity;
  navSlugs: NavSlugs;
}

const LessonPage: React.FC<Props> = ({ page, navSlugs }: Props) => {
  switch (page.__component) {
    case "page-content.image-with-audio":
      return <TextWithImageAndAudio page={page} navSlugs={navSlugs}/>;
    case "page-content.video-text":
      return <TextWithImageAndVideo page={page} navSlugs={navSlugs} />;
    default:
      return <TemplateMissing />;
  }
};

export default LessonPage;

//Function that creates individual Pages
export async function getStaticProps(context: { params: any }) {
  const { params } = context;
  const res = await fetch(`${API_URL}/lessons`);
  const lessons: Lesson[] = await res.json();

  let page: any = null;
  let breakFlag = false;
  let previousSlug = "";
  let nextSlug = "";

  for (let i = 0; i < lessons.length && breakFlag===false; i++) {
    for (let j = 0; j < lessons[i].pages.length; j++) {
      if(lessons[i].pages[j].pageInfo.slug === params.slug){
        page = lessons[i].pages[j];

        if(j > 0){
          previousSlug = `/lessons/${lessons[i].pages[j-1].pageInfo.slug}`;
        }

        if(j < (lessons[i].pages.length - 1)){
          nextSlug = `/lessons/${lessons[i].pages[j+1].pageInfo.slug}`;
        }
        breakFlag = true;
        break;
      }
    }
  }

  //To know wich page we are
  const navSlugs = {
    previousSlug: previousSlug,
    nextSlug: nextSlug
  };

  return {
    props: {
      page: page,
      navSlugs: navSlugs,
    },
  };
}

//check the possible pages that exists in Strapi
export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/lessons`);
  const lessons: Lesson[] = await res.json();

  const pages: PagesEntity[] = [];

  lessons.forEach(lesson => {
    if(lesson.pages){
      lesson.pages.forEach(page => {
        pages.push(page)
      });
    }
  });

  const paths = pages.map((page) => ({
    params: { slug: page.pageInfo.slug },
  }));

  //Returns the pages that found in Strapi
  return {
    paths,
    fallback: false,
  };
}
