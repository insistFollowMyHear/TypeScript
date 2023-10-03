import fs from 'fs';
import cheerio from 'cheerio';
import moment from 'moment';
import { Analyse } from './crawler';

interface CourseInfo{
  title: string;
  count: number;
}

interface CourseResult {
  time: string;
  data: CourseInfo[];
}

interface Content {
  [propName: string]: CourseInfo[];
}

export default class DellAnalyse implements Analyse {
  private static instance: DellAnalyse
  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new DellAnalyse()
    }
    return this.instance
  }

  private getJsonInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $('.course-item');
    const courseInfos: CourseInfo[] = [];
    courseItems.map((index, elemnet) => {
      const descs = $(elemnet).find('.course-desc');
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split('：')[1], 10);
      courseInfos.push({ title, count });
    })
    const result = {
      time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      data: courseInfos,
    }
    return result;
  }

  private generateJsonContent(courseResult: CourseResult, filePath: string) {
    let fileContent: Content = {};
    if (fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
    fileContent[courseResult.time] = courseResult.data;
    return JSON.stringify(fileContent);
  }

  public analyse(html: string, filePath: string) {
    const course = this.getJsonInfo(html);
    const fileContent = this.generateJsonContent(course, filePath)
    return fileContent
  }
}