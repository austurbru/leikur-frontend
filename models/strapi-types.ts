export interface ProviderMetadata {
  public_id: string;
  resource_type: string;
}

export interface Audio {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  url: string;
  provider_metadata: ProviderMetadata;
  provider: string;
  width?: any;
  height?: any;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Thumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Large {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Medium {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Small {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path?: any;
  url: string;
  provider_metadata: ProviderMetadata;
}

export interface Formats {
  thumbnail: Thumbnail;
  large: Large;
  medium: Medium;
  small: Small;
}

export interface Image {
  _id: string;
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  width: number;
  height: number;
  url: string;
  provider_metadata: ProviderMetadata;
  formats: Formats;
  provider: string;
  related: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

export interface Category {
  id: string;
  Title: string;
}

export interface DisplayTemplate {
  _id: string;
  Title: string;
  Description: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  id: string;
}

//lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  lessonNo: number;
  key: string;
  levelNo: number;
  pages: PagesEntity[];
  level: Level;
  image?: Image | null;
  color: string;
}

//pages
export interface PagesEntity {
  __component: string;
  instructions: string;
  pageInfo: PageInfo;
  media?: Media
  //audio: AudioOrVideo;
  category: Category;
  //image: Image;
  id: string;
  content: string;
  //video: AudioOrVideo;
  words?: Word[]
  statement?: string;
  sentence?: string;
  explanation?: string
  isTrue?: boolean
  textAndTranslation?: TextAndTranslation
  // text: string;
  // translation: string;
  audioExample?: AudioExample | null;
  
}

export interface TextAndTranslation {
  id: number
  text: string
  translation: string
}

export interface Word {
  id: number
  word: string
  isCorrect: boolean
}

export interface PageInfo {
  id: string;
  pageNo: number;
  slug: string;
  lessonTotalPageCount: number;
}

export interface AudioExample {
  id: number;
  text: string;
  translation: string;
  audio: AudioOrVideo;
}

export interface Media {
  id: number
  image?: Image
  audio?: AudioOrVideo
  video?: AudioOrVideo
}
export interface AudioOrVideo {
  name: string;
  alternativeText: string;
  caption: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  url: string;
  provider_metadata?: ProviderMetadata;
  provider: string;
  width?: null;
  height?: null;
  related?: null[] | null;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface Level {
  id: string;
  levelNo: number;
  title: string;
  description: string;
  color: string;
  image: Image;
  lessons: Lesson[];
}

export interface RootObject {
  _id: string;
  slug: string;
  pageNo: number;
  title: string;
  content: string;
  published_at: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  audio: Audio;
  image: Image;
  category: Category;
  display_template: DisplayTemplate;
  lesson: Lesson;
  lessonNo: number;
  levelNo: number;
  id: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  currentLesson: Lesson;
  lessonsCompleted: string[];
  currentPageSlug: string;
  preferredLocale: string;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  type: string;
  __v: number;
  id: string;
}
export interface WordCorrect {
  word: string;
  isCorrect: boolean;
}
